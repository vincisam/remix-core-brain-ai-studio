const fs = require('fs');

let content = fs.readFileSync('src/components/Panels/BrainChatPanel.tsx', 'utf-8');

// Find the start of handleDownloadSvg
const startDownloadSvg = content.indexOf('const handleDownloadSvg = (svgString: string) => {');
// Find the end of TypewriterMarkdown
const endTypewriter = content.indexOf('export const BrainChatPanel: React.FC<BrainChatPanelProps> = ({');

if (startDownloadSvg !== -1 && endTypewriter !== -1) {
  content = content.substring(0, startDownloadSvg) + content.substring(endTypewriter);
  content = content.replace(
    'import { ChatMessage, CodeFile } from "../../types";',
    'import { ChatMessage, CodeFile } from "../../types";\nimport { TypewriterMarkdown } from "../Chat/TypewriterMarkdown";\nimport { handleDownloadSvg, handleDownloadPng } from "../Chat/chatUtils";'
  );
  fs.writeFileSync('src/components/Panels/BrainChatPanel.tsx', content);
  console.log("Successfully removed extracted components from BrainChatPanel.tsx");
} else {
  console.log("Could not find boundaries");
}
