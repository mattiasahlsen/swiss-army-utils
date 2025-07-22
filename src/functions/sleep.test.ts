import { sleep } from './sleep.js';

describe('sleep', () => {
  test('resolves after specified milliseconds', async () => {
    const startTime = Date.now();
    await sleep(50);
    const endTime = Date.now();
    const elapsed = endTime - startTime;
    
    // Allow some variance for timing (typically 50ms ± 10ms is reasonable)
    expect(elapsed).toBeGreaterThanOrEqual(45);
    expect(elapsed).toBeLessThan(100);
  });

  test('resolves immediately for 0 milliseconds', async () => {
    const startTime = Date.now();
    await sleep(0);
    const endTime = Date.now();
    const elapsed = endTime - startTime;
    
    // Should be very fast for 0ms
    expect(elapsed).toBeLessThan(20);
  });

  test('returns void', async () => {
    const result = await sleep(1);
    expect(result).toBeUndefined();
  });

  test('can be used with Promise.all', async () => {
    const startTime = Date.now();
    await Promise.all([sleep(30), sleep(30), sleep(30)]);
    const endTime = Date.now();
    const elapsed = endTime - startTime;
    
    // All should run concurrently, so total time should be ~30ms, not 90ms
    expect(elapsed).toBeGreaterThanOrEqual(25);
    expect(elapsed).toBeLessThan(60);
  });
});