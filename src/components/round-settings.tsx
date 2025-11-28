import { For, JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import { default_color } from '../data/timer.data';
import { Round } from '../data/timer.types';
import { AutoResizableInput } from './auto-resizable-input';
import { ChronoSettings } from './chrono-settings';

export function RoundSettings(props: {
  round: Round;
  index: () => number;
  update: (r) => void;
  destruct: () => void;
}): JSX.Element {
  const round_repeat = props.round.repeat || 1;
  const post_round_time = props.round.post || 0;

  const [chronos, setChronos] = createStore(props.round.chronos);

  const addChrono = (): void => {
    setChronos(current_chronos => [
      ...current_chronos,
      { name: 'New Chrono', time: 1, color: default_color },
    ]);
  };

  const deleteChrono = (index: () => number): void => {
    setChronos(current_chronos => current_chronos.filter((_, i) => i !== index()));
  };

  type ChronoUpdate = { name?: string; color?: number; time?: number };
  const updateChrono = (index: () => number): ((c: ChronoUpdate) => void) => {
    const update = (c: ChronoUpdate): void => {
      setChronos(index(), c);
    };
    return update;
  };

  return (
    <div class="flex flex-col items-center justify-center bg-base-300 rounded-xl w-full p-4">
      <div class="flex flex-row items-center justify-between timer-round-header w-full">
        <AutoResizableInput
          input_type="text"
          default={props.round.name}
          onChange={e => props.update({ name: e.target.value })}
        />
        <AutoResizableInput
          input_type="number"
          default={round_repeat.toString()}
          onChange={e => props.update({ repeat: parseInt(e.target.value) })}
          suffix="times"
          max="999999"
          min="0"
        />
        <button class="timer-button-remove" onClick={props.destruct}>
          X
        </button>
      </div>
      <div class="flex flex-row items-center justify-center w-auto gap-4">
        <label for="round-pre">Pre</label>
        <AutoResizableInput
          input_type="number"
          default={round_repeat.toString()}
          onChange={e => props.update({ pre: parseInt(e.target.value) })}
          suffix="sec"
          max="999999"
          min="0"
        />

        <label for="round-post">Post</label>
        <AutoResizableInput
          input_type="number"
          default={post_round_time.toString()}
          onChange={e => props.update({ post: parseInt(e.target.value) })}
          suffix="sec"
          max="999999"
          min="0"
        />
      </div>
      <div class="flex flex-col items-center w-9/10 gap-1">
        <For each={chronos}>
          {(chrono, index) => (
            <ChronoSettings
              chrono={chrono}
              destruct={() => deleteChrono(index)}
              update={updateChrono(index)}
            />
          )}
        </For>
      </div>
      <button class="timer-button-add" onClick={() => addChrono()}>
        +
      </button>
      <div class="flex flex-row items-center justify-between w-full"></div>
    </div>
  );
}
