export class Queue<T> {
  private items: T[];

  public constructor() {
    this.items = [];
  }

  public enqueue(element: T): void {
    this.items.push(element);
  }

  public dequeue(): T | undefined {
    return this.isEmpty() ? undefined : this.items.shift();
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  public size(): number {
    return this.items.length;
  }
}
