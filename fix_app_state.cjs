const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(
  'const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);',
  'const [isAiProcessing, setIsAiProcessing] = useState<boolean>(false);\n  const [thinkingSteps, setThinkingSteps] = useState<{step: string}[]>([]);\n  const [streamingText, setStreamingText] = useState("");'
);
fs.writeFileSync('src/App.tsx', code);
