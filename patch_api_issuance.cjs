const fs = require('fs');
let content = fs.readFileSync('src/components/Dashboards/ApiIssuanceDashboard.tsx', 'utf-8');

if (!content.includes('ApiKeyHealthAudit')) {
    content = content.replace(
        "import React, { useState, useEffect } from 'react';",
        "import React, { useState, useEffect } from 'react';\nimport { ApiKeyHealthAudit } from './ApiKeyHealthAudit';"
    );
}

if (!content.includes('| "audit"')) {
    content = content.replace(
        'useState<"portal" | "keys" | "webhooks" | "sdks" | "openapi">("portal");',
        'useState<"portal" | "keys" | "webhooks" | "sdks" | "openapi" | "audit">("portal");'
    );
}

if (!content.includes('setActiveTab("audit")')) {
    content = content.replace(
        '<div className="flex items-center gap-2"><Key size={16} /> API Key Management</div>\n        </button>',
        '<div className="flex items-center gap-2"><Key size={16} /> API Key Management</div>\n        </button>\n        <button\n          onClick={() => setActiveTab("audit")}\n          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${activeTab === \'audit\' ? \'text-rose-400 border-b-2 border-rose-400\' : \'text-slate-400 hover:text-slate-200\'}`}\n        >\n          <div className="flex items-center gap-2"><Activity size={16} /> Health Audit</div>\n        </button>'
    );
}

if (!content.includes('activeTab === \'audit\' &&')) {
    content = content.replace(
        "{activeTab === 'openapi' && (",
        "{activeTab === 'audit' && (\n          <ApiKeyHealthAudit />\n        )}\n\n        {activeTab === 'openapi' && ("
    );
}

fs.writeFileSync('src/components/Dashboards/ApiIssuanceDashboard.tsx', content);
