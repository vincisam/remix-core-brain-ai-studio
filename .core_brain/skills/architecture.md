# Architecture Overview

This project follows the Multi-Agent architecture:
- Each agent must have a defined `SKILL.md` equivalent.
- Interactions are scored by `scorer.ts`.
- Sub-agents maintain their own memory context.

## Design Patterns
- Strategy Pattern for Engine swapping.
- Chain of Responsibility for Middlewares.
- Sandbox Pattern for execution.
