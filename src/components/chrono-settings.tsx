import { JSX } from 'solid-js';
import { default_color } from '../data/timer.data';
import { Chrono } from '../data/timer.types';
import { AutoResizableInput } from './auto-resizable-input';

export function ChronoSettings(props: {
  chrono: Chrono;
  destruct: () => void;
  update: (c) => void;
}): JSX.Element {
  const chrono_color = props.chrono.color || default_color;

  return (
    <div class="flex flex-row items-center justify-between w-full bg-base-200 rounded-xl bg-transparent">
      <input
        type="color"
        name="chrono-color"
        class="border-none bg-transparent text-center text-inherit rounded-full w-6 h-6 p-0 cursor-pointer focus:outline-none"
        value={`#${chrono_color.toString(16).padStart(6, '0')}`}
        onChange={e => props.update({ color: parseInt(e.target.value.slice(1), 16) })}
      />
      <div class="flex flex-row items-center justify-between grow-2 ml-4 mr-4">
        <div>
          <AutoResizableInput
            input_type="text"
            default={props.chrono.name}
            onChange={e => {
              props.update({ name: e.target.value });
            }}
          />
        </div>
        <div>
          <AutoResizableInput
            input_type="number"
            default={props.chrono.time.toString()}
            onChange={e => {
              props.update({ time: parseInt(e.target.value) });
            }}
            suffix="sec"
            max="999999"
            min="0"
          />
        </div>
      </div>
      <button class="timer-button-remove" onClick={props.destruct}>
        X
      </button>
    </div>
  );
}
