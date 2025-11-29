export class Timer {
  private interval: number | undefined;
  private ms: number = 0;
  private last_timestamp: number = 0;

  constructor(
    initial_value: number = 0,
    public refresh_rate: number = 10,
    private callback: (elapse: number) => void = () => {}
  ) {
    this.ms = initial_value;
  }

  start(): void {
    this.last_timestamp = performance.now();
    if (!this.interval) {
      this.interval = setInterval(() => {
        const now = performance.now();
        this.ms += now - this.last_timestamp;
        this.last_timestamp = now;
        this.callback?.(this.ms);
      }, this.refresh_rate);
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  reset(): void {
    this.ms = 0;
    this.callback?.(this.ms);
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = undefined;
    }
  }

  getTime(): number {
    return this.ms;
  }
}

export function millisecondsToHours(ms: number): number {
  return Math.floor((ms / (1000 * 60 * 60)) % 60);
}

export function millisecondsToMinutes(ms: number): number {
  return Math.floor((ms / (1000 * 60)) % 60);
}

export function millisecondsToSeconds(ms: number): number {
  return Math.floor((ms / 1000) % 60);
}
