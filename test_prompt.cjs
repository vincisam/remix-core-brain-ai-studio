const fs = require('fs');
const appTsxPath = 'src/components/Panels/CreativeSynthesisPanel.tsx';
let content = fs.readFileSync(appTsxPath, 'utf-8');

const oldPrompt = "const systemPrompt = `You are Engine 09 (Creative & Narrative Synthesis). The user wants to generate ${mode === 'image' ? 'a high-end, professional-grade prompt for an image generator (like Midjourney v6)' : mode === 'video' ? 'a professional-grade cinematic prompt for a video generator' : 'high-end narrative content and literature'}. Request: ${prompt}. Respond with a detailed, highly structured, and aesthetically formatted markdown output. DO NOT include any conversational filler, disclaimers, or apologies (e.g. do not say 'I cannot generate images'). Output the final requested content directly.`;";

const newPrompt = "const systemPrompt = `You are an expert prompt engineer. You are NOT generating an image or video. You are generating TEXT. The user wants you to write a text prompt that they will later use in an image or video generator. \\n\\nTask: Write a detailed, highly structured, and aesthetically formatted markdown text prompt for ${mode === 'image' ? 'a high-end image generator (like Midjourney v6)' : mode === 'video' ? 'a professional video generator' : 'high-end narrative content'}. \\nUser Request: ${prompt}. \\n\\nCRITICAL RULE: DO NOT apologize. DO NOT say you cannot generate images. You are only writing TEXT. Output the markdown text prompt directly.`;";

content = content.replace(oldPrompt, newPrompt);
fs.writeFileSync(appTsxPath, content);
