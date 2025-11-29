export type TimerState = 'ready' | 'running' | 'pause' | 'finished';

export type Chrono = {
  name: string;
  color?: number;
  time: number;
};

export type Round = {
  pre?: number;
  name: string;
  chronos: Chrono[];
  post?: number;
  repeat?: number;
};

export type Timer = {
  name: string;
  begin?: number;
  rounds: Round[];
  end?: number;
};
