import { ChronoType, RoundType, TimerType } from '../../components/timer.data';

export interface TimerVisitor {
  visitTimer(t: TimerType): void;
  visitRound(r: RoundType): void;
  visitChrono(c: ChronoType): void;
}

export interface Visitable {
  accept(v: TimerVisitor);
}
