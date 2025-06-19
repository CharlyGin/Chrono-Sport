import { createSignal, onCleanup } from 'solid-js';
import './chronometer.scss';
import { A } from '@solidjs/router';

export default function Clock() {
  const [ms, setMs] = createSignal(0);

  let startBtn: HTMLButtonElement | undefined;
  let stopBtn: HTMLButtonElement | undefined;
  let resetBtn: HTMLButtonElement | undefined;

  // Update time every second
  let timer: number | undefined = undefined;

  // Cleanup interval when component is unmounted
  onCleanup(() => {
    if (timer) clearInterval(timer);
  });

  return (
    <div class="chronometer">
      <div class="chronometer-header">
        <A href="/" class="chronometer-button-back">
          ←
        </A>
      </div>
      <div class="chronometer-time">
        {Math.floor((ms() / (1000 * 60 * 60)) % 60)
          .toString()
          .padStart(2, '0')}
        :
        {Math.floor((ms() / (1000 * 60)) % 60)
          .toString()
          .padStart(2, '0')}
        :
        {Math.floor((ms() / 1000) % 60)
          .toString()
          .padStart(2, '0')}
        :
        {Math.floor(ms() % 1000)
          .toString()
          .padStart(3, '0')}
      </div>

      <div class="chronometer-buttons">
        <button
          class="chronometer-button-start"
          ref={startBtn}
          on:click={() => {
            startBtn.disabled = true;
            stopBtn.disabled = false;
            resetBtn.disabled = false;

            timer = setInterval(() => {
              setMs(prev => prev + 10);
            }, 10);
          }}
        >
          Start
        </button>
        <button
          class="chronometer-button-stop"
          on:click={() => {
            startBtn.disabled = false;
            stopBtn.disabled = true;
            resetBtn.disabled = true;

            if (timer) clearInterval(timer);
          }}
          ref={stopBtn}
          disabled
        >
          Stop
        </button>
        <button
          class="chronometer-button-reset"
          on:click={() => {
            startBtn.disabled = false;
            stopBtn.disabled = true;
            resetBtn.disabled = true;

            setMs(0);
            if (timer) clearInterval(timer);
          }}
          ref={resetBtn}
          disabled
        >
          Reset
        </button>
      </div>
    </div>
  );
}
