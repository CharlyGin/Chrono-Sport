export type TimerState = 'ready' | 'running' | 'pause';

export type ChronoType = {
  name: string;
  color?: number;
  time: number;
};

export type RoundType = {
  pre?: number;
  name: string;
  chronos: ChronoType[];
  post?: number;
  repeat?: number;
};

export type TimerType = {
  name: string;
  begin?: number;
  rounds: RoundType[];
  end?: number;
};

export const initTimerDefaultValues: (timer: TimerType) => TimerType = (timer: TimerType) => {
  return {
    name: timer.name,
    begin: timer.begin || 0,
    rounds: timer.rounds.map(round => ({
      name: round.name,
      repeat: round.repeat || 1,
      pre: round.pre || 0,
      chronos: round.chronos.map(chrono => ({
        name: chrono.name,
        time: chrono.time || 10,
        color: chrono.color || 0x000000,
      })),
      post: round.post || 0,
    })),
    end: timer.end || 0,
  };
};
