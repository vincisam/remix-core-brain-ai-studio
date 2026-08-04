# Core Brain Project Instructions

## Coding Standards
- Use TypeScript with strict type checking.
- Ensure all modules export clear interfaces in `types.ts`.
- Prefer dependency injection (like passing engines/tools to orchestrator).

## Architecture Decisions
- Multi-Agent system: `core_brain` coordinates 11 sub-engines.
- Orchestrator handles intake, routing, execution, and verification.
- Tools are executed via Model Context Protocol (MCP) standards.

## Key Commands
- Linting: `npm run lint`
- Building: `npm run build`

## What to never do
- Never commit API keys or environment secrets.
- Never bypass the `SecurityGuard` or `FallbackHandler`.
- Never use `any` types; strictly use `unknown` and proper typing interfaces.

## Testing & Deployment
- Run local integration tests before deployment.
- Maintain isolated execution environments for `sandboxes`.

## Team Conventions
- File names should use `snake_case`.
- Classes use `PascalCase`.
- Variables use `camelCase`.
