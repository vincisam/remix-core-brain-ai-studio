const fs = require('fs');

const appTsxPath = 'src/App.tsx';
let content = fs.readFileSync(appTsxPath, 'utf-8');

const oldOverlay = `{isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}`;
      
const newOverlay = `{isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      )}`;

content = content.replace(oldOverlay, newOverlay);
fs.writeFileSync(appTsxPath, content);
