import { JSX, Show } from 'solid-js';
import './input.css';

export type OnChangeCallback = JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
export type InputType = 'number' | 'text';

export function Input(props: {
  input_type: InputType;
  onChange: OnChangeCallback;
  default: string;
  max?: string;
  min?: string;
  prefix?: string;
  suffix?: string;
  inputRef?: (el: HTMLInputElement) => HTMLInputElement;
}): JSX.Element {
  return (
    <div class="input-wrapper">
      <Show when={props.prefix}>
        <span>{props.prefix}</span>
      </Show>
      <input
        class="m-2"
        ref={props.inputRef}
        type={props.input_type}
        value={props.default}
        onChange={e => {
          if (typeof props.onChange === 'function') {
            props.onChange(e); // now safe to call
          }

          if (props.input_type === 'number') {
            const value: number = parseInt(e.target.value);
            if (props.max && value > parseInt(props.max)) {
              e.target.value = props.max;
            }
            if (props.min && value < parseInt(props.min)) {
              e.target.value = props.min;
            }
          }
        }}
        max={props.max}
        min={props.min}
      />
      <Show when={props.suffix}>
        <span>{props.suffix}</span>
      </Show>
    </div>
  );
}
