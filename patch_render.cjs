const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', 'utf-8');

const regex = /<div className="whitespace-pre-wrap text-sm leading-relaxed">\{msg\.content\}<\/div>/;

const replacement = `{/* Message Content with Media Rendering */}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content.split(/(\/api\/ai\/(?:image|video)\?prompt=[^ \n\r]+)/).map((part, i) => {
                    if (part.startsWith('/api/ai/image?')) {
                      return <img key={i} src={part} alt="Generated" className="mt-2 rounded-xl max-w-full shadow-lg border border-slate-700" />;
                    } else if (part.startsWith('/api/ai/video?')) {
                      return <video key={i} src={part} controls autoPlay loop className="mt-2 rounded-xl max-w-full shadow-lg border border-slate-700" />;
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>`;

if (content.match(regex)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/Dashboards/ChatEngineDashboard.tsx', content);
  console.log("Patched ChatEngineDashboard for media rendering.");
} else {
  console.log("Could not find the target code.");
}
