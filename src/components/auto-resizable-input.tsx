import { JSX, onMount } from 'solid-js';
import { Input, InputType, OnChangeCallback } from './input';

export function AutoResizableInput(props: {
  input_type: InputType;
  onChange: OnChangeCallback;
  default: string;
  max?: string;
  min?: string;
  prefix?: string;
  suffix?: string;
}): JSX.Element {
  let inputRef!: HTMLInputElement;

  // Update input width based on span width
  const updateWidth = (): void => {
    inputRef.style.width = '1ch'; // reset to minimum
    inputRef.style.width = inputRef.scrollWidth + 'px';
  };

  onMount(() => {
    updateWidth();
    inputRef.onkeydown = (): void => {
      updateWidth();
    };
    inputRef.onkeyup = (): void => {
      updateWidth();
    };
  });

  return (
    <Input
      input_type={props.input_type}
      onChange={props.onChange}
      default={props.default}
      prefix={props.prefix}
      suffix={props.suffix}
      inputRef={el => (inputRef = el)}
      max={props.max}
      min={props.min}
    />
  );
}
