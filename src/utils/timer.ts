export class Timer {
  private interval: number | undefined;
  private ms: number = 0;

  constructor(
    initial_value: number = 0,
    public precision: number = 10,
    private callback: (ms: number) => void = () => {}
  ) {
    this.ms = initial_value;
  }

  start(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.ms += this.precision;
        this.callback?.(this.ms);
      }, this.precision);
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
