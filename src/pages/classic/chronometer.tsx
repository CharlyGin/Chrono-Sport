import { A } from '@solidjs/router';
import { createSignal, JSX, onCleanup } from 'solid-js';
import {
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
  Timer,
} from '../../utils/timer';
import './chronometer.scss';

export default function Clock(): JSX.Element {
  const [ms, setMs] = createSignal(0);
  const timer: Timer = new Timer(0, 10, (ms: number) => {
    setMs(ms);
  });

  let startBtn!: HTMLButtonElement;
  let stopBtn!: HTMLButtonElement;
  let resetBtn!: HTMLButtonElement;

  // Cleanup interval when component is unmounted
  onCleanup(() => {
    timer.stop();
  });

  const start: () => void = () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;

    timer.start();
  };
  const stop: () => void = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;

    timer.stop();
  };
  const reset: () => void = () => {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;

    setMs(0);
    timer.reset();
  };

  return (
    <div class="chronometer">
      <div class="chronometer-header">
        <A href="/" class="chronometer-button-back">
          ←
        </A>
      </div>
      <div class="chronometer-time">
        {millisecondsToHours(ms()).toString().padStart(2, '0')}:
        {millisecondsToMinutes(ms()).toString().padStart(2, '0')}:
        {millisecondsToSeconds(ms()).toString().padStart(2, '0')}:
        {Math.floor(ms() % 1000)
          .toString()
          .padStart(3, '0')}
      </div>

      <div class="chronometer-buttons">
        <button class="chronometer-button-start" ref={startBtn} on:click={start}>
          Start
        </button>
        <button class="chronometer-button-stop" on:click={stop} ref={stopBtn} disabled>
          Stop
        </button>
        <button class="chronometer-button-reset" on:click={reset} ref={resetBtn} disabled>
          Reset
        </button>
      </div>
    </div>
  );
}
