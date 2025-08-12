import { A } from '@solidjs/router';
import { createSignal, JSX, onCleanup } from 'solid-js';
import './clock.scss';

export default function Clock(): JSX.Element {
  const [time, setTime] = createSignal(new Date());

  // Update time every second
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // Cleanup interval whens component is unmounted
  onCleanup(() => {
    clearInterval(timer);
  });

  return (
    <div class="clock">
      <div class="clock-header">
        <A href="/" class="clock-button-back">
          ←
        </A>
      </div>
      <div class="time">
        {time().getHours().toString().padStart(2, '0')}:
        {time().getMinutes().toString().padStart(2, '0')}:
        {time().getSeconds().toString().padStart(2, '0')}
      </div>
    </div>
  );
}
