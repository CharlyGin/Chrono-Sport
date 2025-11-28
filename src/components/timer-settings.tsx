import { For, JSX } from 'solid-js';
import { SetStoreFunction, produce } from 'solid-js/store';
import { Timer } from '../data/timer.types';
import { AutoResizableInput } from './auto-resizable-input';
import { RoundSettings } from './round-settings';

export default function TimerSettings(props: {
  timer: Timer;
  setTimer: SetStoreFunction<Timer>;
}): JSX.Element {
  const { timer, setTimer } = props;

  const updateRound = (
    index: number,
    new_round: { name?: string; pre?: number; post?: number; repeat?: number }
  ): void => {
    setTimer(
      'rounds',
      index,
      produce(round => {
        Object.assign(round, new_round);
      })
    );
  };

  const addRound = (): void => {
    setTimer('rounds', [
      ...timer.rounds,
      { name: 'New Round', pre: 0, chronos: [], post: 0, repeat: 1 },
    ]);
  };

  const deleteRound = (index: number): void => {
    setTimer(
      'rounds',
      timer.rounds.filter((_, i) => i !== index)
    );
  };

  return (
    <div class="flex flex-col  items-center justify-evenly w-screen h-screen">
      <div class="text-4xl flex items-center justify-center font-bold grow-1 m-2">{timer.name}</div>
      <div class="flex flex-col items-center justify-center w-9/10 md:w-1/2 gap-4 grow-8 text-2xl">
        <div class="flex flex-row items-center justify-between w-full bg-base-200 rounded-xl p-4">
          <label for="begin">Begin</label>
          <AutoResizableInput
            input_type="number"
            default={(timer.begin || 0).toString()}
            onChange={e => setTimer('begin', parseInt(e.target.value))}
            suffix="sec"
            max="999999"
            min="0"
          />
        </div>
        <div class="flex flex-col gap-4 w-full">
          <For each={timer.rounds}>
            {(round, index) => (
              <RoundSettings
                round={round}
                index={index}
                update={r => updateRound(index(), r)}
                destruct={() => deleteRound(index())}
              />
            )}
          </For>
        </div>
        <button class="timer-button-add" onClick={addRound}>
          +
        </button>
        <div class="flex flex-row items-center justify-between w-full bg-base-200 rounded-xl p-4">
          <label for="end">End</label>
          <AutoResizableInput
            input_type="number"
            default={(timer.end || 0).toString()}
            onChange={e => setTimer('end', parseInt(e.target.value))}
            suffix="sec"
            max="999999"
            min="0"
          />
        </div>
      </div>
    </div>
  );
}
