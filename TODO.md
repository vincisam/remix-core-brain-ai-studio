# Deployment/API Fix TODO

## Goal
Fix the frontend (Vercel static SPA) to point relative `/api/*` calls to the backend (Render) by using the `API_BASE` prefix from `src/utils/api.ts`.

## Tasks
- [x] 1. Complete `src/utils/api.ts` with a robust `apiFetch` helper that prefixes `API_BASE`
- [x] 1a. Add `src/vite-env.d.ts` to fix `import.meta.env` type error
- [x] 2. Update `src/services/apiService.ts` to use `API_BASE`
- [x] 3. Update `src/hooks/useBrain.ts` to use `API_BASE`
- [x] 4. Update `src/context/AuthContext.tsx` to use `API_BASE`
- [x] 5. Update `src/components/Auth/OAuthButtons.tsx` to use `API_BASE`
- [x] 6. Update `src/components/Chat/ChatInterface.tsx` to use `API_BASE`
- [x] 7. Update `src/components/Dashboards/ChatEngineDashboard.tsx` to use `API_BASE`
- [x] 8. Update `src/components/Dashboards/EvolutionDashboard.tsx` to use `API_BASE`
- [x] 9. Update `src/components/Panels/CreativeSynthesisPanel.tsx` to use `API_BASE`
- [x] 10. Update `src/components/Panels/SelfDevelopmentMatrix.tsx` to use `API_BASE`
- [x] 11. Update `src/pages/ChatPage.tsx` to use `API_BASE`
- [x] 12. Verify with `npm run lint` (tsc --noEmit)
- [x] 13. Verify with `npm run build`
