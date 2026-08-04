export interface ExecutionResult {
  success: boolean;
  output: string;
  exitCode: number;
  durationMs: number;
}

export const simulatePythonExecution = async (code: string): Promise<ExecutionResult> => {
  return new Promise((resolve) => {
    // Simulate container startup time and execution
    const delay = Math.random() * 1500 + 500;
    
    setTimeout(() => {
      // Basic static analysis simulation
      if (code.includes('syntax error') || code.includes('import non_existent_module')) {
        resolve({
          success: false,
          output: "Traceback (most recent call last):\n  File \"test_script.py\", line 1\nSyntaxError: invalid syntax",
          exitCode: 1,
          durationMs: Math.round(delay),
        });
      } else {
        // Success simulation
        resolve({
          success: true,
          output: "Container initialized.\nRunning test_script.py...\n[PASSED] All tests completed successfully.\nContainer terminated.",
          exitCode: 0,
          durationMs: Math.round(delay),
        });
      }
    }, delay);
  });
};
