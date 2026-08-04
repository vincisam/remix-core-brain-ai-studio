export class DynamicOptimizationLoop {
  private engineWeights: Record<string, number> = {};
  public performanceLog: any[] = [];
  private static instance: DynamicOptimizationLoop;

  private constructor() {
    for (let i = 1; i <= 11; i++) {
      const id = i < 10 ? `engine0${i}` : `engine${i}`;
      this.engineWeights[id] = 1.0;
    }
  }

  public static getInstance(): DynamicOptimizationLoop {
    if (!DynamicOptimizationLoop.instance) {
      DynamicOptimizationLoop.instance = new DynamicOptimizationLoop();
    }
    return DynamicOptimizationLoop.instance;
  }

  public applyDynamicWeighting(predictions: Record<string, number>, threshold: number = 0.5): string[] {
    const optimizedTasks: string[] = [];
    for (const [engineId, confidence] of Object.entries(predictions)) {
      const weight = this.engineWeights[engineId] || 1.0;
      const adjustedScore = confidence * weight;
      if (adjustedScore > threshold) {
        optimizedTasks.push(engineId);
      }
    }
    return optimizedTasks.length > 0 ? optimizedTasks : ["engine03"];
  }

  public updateWeights(feedbackLoop: { engineId: string; status: "SUCCESS" | "FAILED" }[]) {
    for (const result of feedbackLoop) {
      if (this.engineWeights[result.engineId] !== undefined) {
        if (result.status === "SUCCESS") {
          this.engineWeights[result.engineId] += 0.05;
        } else {
          this.engineWeights[result.engineId] -= 0.10;
        }
        // Normalize
        if (this.engineWeights[result.engineId] < 0.1) this.engineWeights[result.engineId] = 0.1;
        if (this.engineWeights[result.engineId] > 2.0) this.engineWeights[result.engineId] = 2.0;
      }
      this.performanceLog.push({ ...result, time: new Date().toISOString() });
    }
    if (this.performanceLog.length > 100) this.performanceLog.shift();
  }

  public getWeights() {
    return this.engineWeights;
  }
}

// Inject a simulated endpoint or method to get performance log for UI
export const getDolStatus = () => {
  const dol = DynamicOptimizationLoop.getInstance();
  return {
    weights: dol.getWeights(),
    logs: (dol as any).performanceLog
  };
};
