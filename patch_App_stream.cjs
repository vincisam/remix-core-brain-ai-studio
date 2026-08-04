const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const stateToAdd2 = `  const [streamingText, setStreamingText] = useState("");\n`;
code = code.replace("const [thinkingSteps", stateToAdd2 + "const [thinkingSteps");

// update onChunk
code = code.replace(
  `(chunkText) => {\n         finalReply += chunkText;\n      }`,
  `(chunkText) => {\n         finalReply += chunkText;\n         setStreamingText(finalReply);\n      }`
);

// clear stream on done
code = code.replace(
  `setThinkingSteps([]);`,
  `setThinkingSteps([]);\n         setStreamingText("");`
);

// pass it to BrainChatPanel
code = code.replace(
  /thinkingSteps={thinkingSteps}/g,
  `thinkingSteps={thinkingSteps} streamingText={streamingText}`
);

fs.writeFileSync('src/App.tsx', code);
console.log("Patched App.tsx stream");
