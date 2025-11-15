import { Timer } from './timer.types';

export const initTimerDefaultValues: (timer: Timer) => Timer = (timer: Timer) => {
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

export const default_color = 0xffffff;
