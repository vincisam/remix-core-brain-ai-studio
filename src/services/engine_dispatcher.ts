import { RoutingDecision } from './core_brain_router';
import { BaseEngine } from './engines/base_engine';

export class EngineDispatcher {
  private engines: Record<string, BaseEngine> = {
    engine_01: new BaseEngine("engine_01", "You are Engine 01 (Web Search & Real-time Intelligence). Provide factual, up-to-date information."),
    engine_03: new BaseEngine("engine_03", "You are Engine 03 (Code & Systems). Write strictly valid code without markdown wrappers if requested, or provide technical explanations."),
    engine_05: new BaseEngine("engine_05", "You are Engine 05 (Multimodal). Describe vivid imagery or video concepts as requested."),
    engine_09: new BaseEngine("engine_09", "You are Engine 09 (Creative Writing). Write compelling narratives or creative content.")
  };

  async dispatch(decisions: RoutingDecision[]) {
    const results = await Promise.all(decisions.map(async (decision) => {
      // Engine 05 (Multimodal): return a real generated image instead of a text
      // description. This points at the existing /api/ai/image endpoint, which
      // calls Gemini's image model server-side and streams back real JPEG bytes —
      // no need to also burn a text-generation call describing what an image
      // "would" look like.
      if (decision.engine_id === "engine_05") {
        const encodedPrompt = encodeURIComponent(decision.refined_prompt);
        return {
          engine: decision.engine_id,
          data: `![${decision.refined_prompt}](/api/ai/image?prompt=${encodedPrompt})`,
          type: "image",
        };
      }

      const engine = this.engines[decision.engine_id];
      if (!engine) {
        return { engine: decision.engine_id, data: `Engine ${decision.engine_id} not available.`, type: "text" };
      }
      
      const output = await engine.execute(decision.refined_prompt);
      let type = "text";
      if (decision.engine_id === "engine_03") type = "code";
      
      return { engine: decision.engine_id, data: output, type };
    }));

    return results;
  }
}

export const engineDispatcher = new EngineDispatcher();