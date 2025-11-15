import { A } from '@solidjs/router';
import { createSignal, JSX, onCleanup, onMount } from 'solid-js';
import {
  millisecondsToHours,
  millisecondsToMinutes,
  millisecondsToSeconds,
  Timer,
} from '../../utils/timer';
import './clock.scss';

export default function Clock(): JSX.Element {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(0);
  midnight.setMinutes(0);
  midnight.setSeconds(0);
  midnight.setMilliseconds(0);
  const date = now.getTime() - midnight.getTime();
  const [ms, setMs] = createSignal(date);
  const timer: Timer = new Timer(date, 1000, (ms: number) => {
    setMs(ms);
  });

  onMount(() => {
    timer.start();
  });

  onCleanup(() => {
    timer.stop();
  });

  return (
    <div class="clock">
      <div class="clock-header">
        <A href="/" class="clock-button-back">
          ←
        </A>
      </div>
      <div class="time">
        {millisecondsToHours(ms()).toString().padStart(2, '0')}:
        {millisecondsToMinutes(ms()).toString().padStart(2, '0')}:
        {millisecondsToSeconds(ms()).toString().padStart(2, '0')}
      </div>
    </div>
  );
}
