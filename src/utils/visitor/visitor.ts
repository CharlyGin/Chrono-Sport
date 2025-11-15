import { Chrono, Round, Timer } from '../../data/timer.types';

export interface TimerVisitor {
  visitTimer(t: Timer): void;
  visitRound(r: Round): void;
  visitChrono(c: Chrono): void;
}

export interface Visitable {
  accept(v: TimerVisitor);
}
