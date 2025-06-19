import { TimerType, RoundType, ChronoType } from '../../components/timer.data';
import { Queue } from '../queue';
import { TimerVisitor } from './visitor';

export type Execution = {
  color?: number;
  time: number;
  round_name?: string;
  roundi?: number;
  round_repeat?: number;
  chrono_name: string;
};

export class ExecutionVisitor implements TimerVisitor {
  public execution_queue: Queue<Execution>;

  constructor() {
    this.execution_queue = new Queue();
  }

  public visitTimer(t: TimerType): void {
    if (t.begin) {
      this.execution_queue.enqueue({
        time: t.begin,
        chrono_name: 'begin',
      });
    }

    t.rounds.forEach((round: RoundType) => {
      this._visitRound(round);
    });

    if (t.end) {
      this.execution_queue.enqueue({
        time: t.end,
        chrono_name: 'end',
      });
    }
  }

  public visitRound(r: RoundType): void {
    this._visitRound(r);
  }

  public visitChrono(c: ChronoType): void {
    this._visitChrono(c);
  }

  private _visitRound(r: RoundType): void {
    if (r.pre) {
      this.execution_queue.enqueue({
        time: r.pre,
        round_name: r.name,
        chrono_name: 'pre',
      });
    }

    for (let roundi = 1; roundi <= r.repeat; roundi++) {
      r.chronos.forEach((chrono: ChronoType) => {
        this._visitChrono(chrono, r, roundi);
      });
    }

    if (r.post) {
      this.execution_queue.enqueue({
        time: r.post,
        round_name: r.name,
        chrono_name: 'post',
      });
    }
  }

  private _visitChrono(c: ChronoType, r?: RoundType, ri?: number): void {
    this.execution_queue.enqueue({
      color: c.color,
      time: c.time,
      round_name: r.name,
      roundi: ri,
      round_repeat: r.repeat,
      chrono_name: c.name,
    });
  }
}
