const fs = require('fs');

function fixImport(file, badImport, goodImport) {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');
        content = content.replace(badImport, goodImport);
        fs.writeFileSync(file, content);
    }
}

fixImport('src/components/UI/Header.tsx', "from '../types'", "from '../../types'");
fixImport('src/components/UI/Sidebar.tsx', "from '../types'", "from '../../types'");
fixImport('src/components/UI/Sidebar.tsx', "from '../utils/mediaExtractor'", "from '../../utils/mediaExtractor'");
fixImport('src/components/UI/Sidebar.tsx', "from './Chat/chatUtils'", "from '../Chat/chatUtils'");
fixImport('src/services/engine_dispatcher.ts', "from '../core_brain_router'", "from '../ai/core_brain_router'");

