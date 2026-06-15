/**
 * Simple token-bucket rate limiter for outbound scraper requests.
 * One instance should be shared per-adapter (or per-host) so all
 * requests through that adapter respect the same budget.
 */
export class RateLimiter {
  private tokens: number;
  private readonly capacity: number;
  private readonly refillPerMs: number;
  private lastRefill: number;

  /**
   * @param capacity max burst size (number of requests)
   * @param refillPerSecond tokens added per second, up to `capacity`
   */
  constructor(capacity: number, refillPerSecond: number) {
    this.capacity = capacity;
    this.tokens = capacity;
    this.refillPerMs = refillPerSecond / 1000;
    this.lastRefill = Date.now();
  }

  private refill() {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.refillPerMs);
    this.lastRefill = now;
  }

  /** Resolves once a token is available, waiting if necessary. */
  async acquire(): Promise<void> {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens -= 1;
      return;
    }

    const waitMs = (1 - this.tokens) / this.refillPerMs;
    await new Promise((resolve) => setTimeout(resolve, waitMs));
    this.refill();
    this.tokens = Math.max(0, this.tokens - 1);
  }
}
