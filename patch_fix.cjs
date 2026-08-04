const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', 'utf-8');

const regex = /\{msg\.content\.split\([\s\S]*?\}\)/;

const replacement = `{msg.content.split(/(\\/api\\/ai\\/(?:image|video)\\?prompt=[^\\s]+)/).map((part, i) => {
                    if (part.startsWith('/api/ai/image?')) {
                      return <img key={i} src={part} alt="Generated" className="mt-2 rounded-xl max-w-full shadow-lg border border-slate-700" />;
                    } else if (part.startsWith('/api/ai/video?')) {
                      return <video key={i} src={part} controls autoPlay loop className="mt-2 rounded-xl max-w-full shadow-lg border border-slate-700" />;
                    }
                    return <span key={i}>{part}</span>;
                  })}`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', content);
  console.log("Patched ChatEngineDashboard for media rendering fix.");
} else {
  console.log("Could not find the target code.");
}
