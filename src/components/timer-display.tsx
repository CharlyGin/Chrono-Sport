import { createMemo, JSX } from 'solid-js';
import { Execution } from '../utils/visitor/execution_visitor';

export default function TimerDisplay(props: {
  execution: () => Execution | undefined;
  state: () => string;
  ms: () => number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}): JSX.Element {
  const { execution, state, ms, start, stop, reset } = props;

  const exec = createMemo(() => {
    const exec = execution();
    return {
      background:
        exec && exec.color ? `#${exec.color.toString(16).padStart(6, '0')}` : 'transparent',
      round: exec ? exec.round_name : '',
      chrono: exec ? exec.chrono_name : '',
      position:
        exec && exec.roundi && exec.round_repeat ? `${exec.roundi}/${exec.round_repeat}` : '',
    };
  });

  return (
    <div
      class="timer-display"
      style={{
        'background-color': exec().background,
      }}
    >
      <div class="timer-display-info">
        <div class="timer-display-info-round">
          {exec().round} {exec().position}
        </div>
        <div class="timer-display-info-chrono">{exec().chrono}</div>
      </div>
      <div class="timer-display-time">
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
      </div>
      <div class="timer-display-buttons">
        <button class="timer-button-start" onClick={start} disabled={state() === 'running'}>
          Start
        </button>
        <button class="timer-button-stop" onClick={stop} disabled={state() !== 'running'}>
          Stop
        </button>
        <button class="timer-button-reset" onClick={reset} disabled={state() === 'ready'}>
          Reset
        </button>
      </div>
    </div>
  );
}
