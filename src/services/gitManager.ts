import { Octokit } from "@octokit/rest";

export interface GitCommitParams {
  owner: string;
  repo: string;
  path: string;
  content: string;
  message: string;
  branch?: string;
  token?: string;
}

export const commitToGitHub = async ({
  owner,
  repo,
  path,
  content,
  message,
  branch = "main",
  token,
}: GitCommitParams) => {
  // Allow passing token directly, fallback to Vite env or Node env
  const auth = token || 
    (typeof import.meta !== 'undefined' && (import.meta as any).env ? (import.meta as any).env.VITE_GITHUB_TOKEN : process.env.GITHUB_TOKEN);
  
  if (!auth) {
    throw new Error("GitHub token is required for committing. Please provide one or set VITE_GITHUB_TOKEN/GITHUB_TOKEN.");
  }

  const octokit = new Octokit({ auth });

  try {
    let sha: string | undefined;
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });
      
      if (!Array.isArray(data) && data.type === "file") {
        sha = data.sha;
      }
    } catch (err: any) {
      if (err.status !== 404) {
        throw err;
      }
    }

    // Handle base64 encoding for both Node and Browser environments
    let base64Content = "";
    if (typeof Buffer !== "undefined") {
      base64Content = Buffer.from(content).toString("base64");
    } else {
      // Browser fallback (supports utf-8)
      base64Content = btoa(unescape(encodeURIComponent(content)));
    }

    const result = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: base64Content,
      branch,
      sha,
    });

    return {
      success: true,
      commitUrl: result.data.commit.html_url,
      sha: result.data.commit.sha,
    };
  } catch (error: any) {
    console.error("Error committing to GitHub:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
