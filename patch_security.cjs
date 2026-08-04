const fs = require('fs');
let content = fs.readFileSync('server.ts', 'utf-8');

if (!content.includes("import helmet from")) {
    content = "import helmet from 'helmet';\nimport rateLimit from 'express-rate-limit';\n" + content;
}

if (!content.includes("app.use(helmet())")) {
    content = content.replace(
        '  app.use(express.json({ limit: "10mb" }));',
        '  app.use(express.json({ limit: "10mb" }));\n\n  // Security Middleware (Strategy 3)\n  app.use(helmet({\n    contentSecurityPolicy: false, // disabled for local dev/vite\n  }));\n\n  // Global Rate Limiter\n  const limiter = rateLimit({\n    windowMs: 15 * 60 * 1000, // 15 minutes\n    max: 100, // Limit each IP to 100 requests per windowMs\n    message: { success: false, error: "Too many requests, please try again later." }\n  });\n  app.use("/api", limiter);\n'
    );
}

fs.writeFileSync('server.ts', content);
