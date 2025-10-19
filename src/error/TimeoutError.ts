export class TimeoutError extends Error {
  constructor(
    operation: string,
    { startTime, timeout }: { startTime: number; timeout: number }
  ) {
    super(
      `${operation} timed out after ${timeout.toString()}ms (started at ${new Date(startTime).toISOString()}, now: ${new Date().toISOString()})`
    );
    this.name = 'TimeoutError';
  }
}
