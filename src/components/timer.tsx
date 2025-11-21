import { A } from '@solidjs/router';
import { JSX } from 'solid-js';
import { createStore } from 'solid-js/store';
import { initTimerDefaultValues } from '../data/timer.data';
import { Timer as TimerT } from '../data/timer.types';
import { useTimerExecution } from '../hooks/useTimerExecusion';
import TimerDisplay from './timer-display';
import TimerSettings from './timer-settings';
import './timer.scss';

export default function Timer(props: { timer: TimerT }): JSX.Element {
  const [timer, setTimer] = createStore(initTimerDefaultValues(props.timer));

  const { execution, ms, state, start, stop, reset } = useTimerExecution(timer);

  return (
    <div class="timer">
      <A href="/" class="m-4 top-0 left-0 fixed button-back">
        ←
      </A>
      <TimerDisplay
        execution={execution}
        state={state}
        ms={ms}
        start={start}
        stop={stop}
        reset={reset}
      />
      <TimerSettings timer={timer} setTimer={setTimer} />
    </div>
  );
}
