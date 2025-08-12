import { A } from '@solidjs/router';
import { createSignal, For, JSX, onCleanup } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { TransitionGroup } from 'solid-transition-group';
import { Queue } from '../utils/queue';
import { Execution, ExecutionVisitor } from '../utils/visitor/execution_visitor';
import { AutoResizableInput } from './auto-resizable-input';
import { ChronoType, initTimerDefaultValues, RoundType, TimerState, TimerType } from './timer.data';
import './timer.scss';

type ChronoUpdate = { name?: string; color?: number; time?: number };

const default_color = 0xffffff;

function Chrono(props: {
  chrono: ChronoType;
  destruct: () => void;
  update: (c) => void;
}): JSX.Element {
  const chrono_color = props.chrono.color || default_color;

  return (
    <div class="timer-round-chrono">
      <div class="timer-round-chrono-color">
        <input
          type="color"
          name="chrono-color"
          value={`#${chrono_color.toString(16).padStart(6, '0')}`}
          onChange={e => props.update({ color: parseInt(e.target.value.slice(1), 16) })}
        />
      </div>
      <div class="wrapper">
        <div class="timer-round-chrono-name">
          <AutoResizableInput
            input_type="text"
            default={props.chrono.name}
            onChange={e => props.update({ name: e.target.value })}
          />
        </div>
        <div class="timer-round-chrono-time">
          <AutoResizableInput
            input_type="number"
            default={props.chrono.time.toString()}
            onChange={e => props.update({ time: parseInt(e.target.value) })}
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

function Round(props: {
  round: RoundType;
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

  const updateChrono = (index: () => number): ((c: ChronoUpdate) => void) => {
    const update = (c: ChronoUpdate): void => {
      setChronos(index(), c);
    };
    return update;
  };

  return (
    <div class="timer-round">
      <div class="timer-round-name">
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
      <div class="timer-round-pre">
        <label for="round-pre">Pre</label>
        <AutoResizableInput
          input_type="number"
          default={round_repeat.toString()}
          onChange={e => props.update({ pre: parseInt(e.target.value) })}
          suffix="sec"
          max="999999"
          min="0"
        />
      </div>
      <div class="timer-round-chronos">
        <TransitionGroup name="group-item">
          <For each={chronos}>
            {(chrono, index) => (
              <Chrono
                chrono={chrono}
                destruct={() => deleteChrono(index)}
                update={updateChrono(index)}
              />
            )}
          </For>
        </TransitionGroup>
        <button class="timer-button-add" onClick={() => addChrono()}>
          +
        </button>
      </div>
      <div class="timer-round-post">
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
    </div>
  );
}

export default function Timer(props: { timer: TimerType }): JSX.Element {
  const [timer, setTimer] = createStore(initTimerDefaultValues(props.timer));
  const [execution, setExecution] = createSignal<Execution | undefined>();
  const [ms, setMs] = createSignal(0);

  let prevState: TimerState | undefined = undefined;
  let state: TimerState = 'ready';

  let startBtn!: HTMLButtonElement;
  let stopBtn!: HTMLButtonElement;
  let resetBtn!: HTMLButtonElement;
  let displayRef!: HTMLDivElement;

  let interval: number | undefined = undefined;

  let execution_queue: Queue<Execution> | undefined;

  const onStart = (): void => {
    // Update state
    prevState = state;
    state = 'running';
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;

    if (prevState === 'ready') {
      // Creating execution queue
      const visitor = new ExecutionVisitor();
      visitor.visitTimer(timer);
      execution_queue = visitor.execution_queue;
    }

    // Check current execution status each 10ms
    interval = setInterval(() => {
      const current_execution: Execution | undefined = execution();

      // Start of timer
      if (!current_execution) {
        if (!execution_queue) {
          return;
        }

        setExecution(execution_queue.dequeue());

        const current_execution: Execution | undefined = execution();
        if (!current_execution) {
          displayRef.style['backgroundColor'] = 'transparent';
        } else {
          displayRef.style['backgroundColor'] = displayRef.style['backgroundColor'] =
            current_execution.color
              ? `#${current_execution.color.toString(16).padStart(6, '0')}`
              : 'transparent';
        }
      }

      // Next execution
      if (current_execution && current_execution.time === ms() / 1000) {
        // End of timer
        if (!execution_queue) {
          return;
        }
        if (execution_queue.isEmpty()) {
          clearInterval(interval);
          displayRef.style['backgroundColor'] = 'transparent';
          return;
        }

        setExecution(execution_queue.dequeue());

        const current_execution: Execution | undefined = execution();
        if (!current_execution) {
          displayRef.style['backgroundColor'] = 'transparent';
        } else {
          displayRef.style['backgroundColor'] = displayRef.style['backgroundColor'] =
            current_execution.color
              ? `#${current_execution.color.toString(16).padStart(6, '0')}`
              : 'transparent';
        }

        setMs(0);
        return;
      }

      setMs(prev => prev + 10);
    }, 10);
  };

  const onStop = (): void => {
    // Update state
    prevState = state;
    state = 'pause';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;

    if (interval) {
      clearInterval(interval);
    }
  };

  const onReset = (): void => {
    // Update state
    prevState = state;
    state = 'ready';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;

    setMs(0);
    setExecution(undefined);
    displayRef.style['backgroundColor'] = 'transparent';
    if (interval) {
      clearInterval(interval);
    }
  };

  const updateRound = (
    index: number,
    new_round: { name?: string; pre?: number; post?: number; repeat?: number }
  ): void => {
    setTimer(
      'rounds',
      index,
      produce(round => {
        Object.assign(round, new_round);
      })
    );
  };

  const addRound = (): void => {
    setTimer('rounds', [
      ...timer.rounds,
      { name: 'New Round', pre: 0, chronos: [], post: 0, repeat: 1 },
    ]);
  };

  const deleteRound = (index: number): void => {
    setTimer(
      'rounds',
      timer.rounds.filter((_, i) => i !== index)
    );
  };

  // Cleanup interval when component is unmounted
  onCleanup(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  return (
    <div class="timer">
      <div class="timer-header">
        <A href="/" class="timer-button-back">
          ←
        </A>
      </div>
      <div class="timer-display" ref={displayRef}>
        <div class="timer-display-info">
          <div class="timer-display-info-round">
            {execution() ? (execution() as Execution).round_name : ''}{' '}
            {execution() &&
            (execution() as Execution).roundi &&
            (execution() as Execution).round_repeat
              ? `${(execution() as Execution).roundi}/${(execution() as Execution).round_repeat}`
              : ''}
          </div>
          <div class="timer-display-info-chrono">
            {execution() ? (execution() as Execution).chrono_name : ''}
          </div>
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
          <button class="timer-button-start" onClick={onStart} ref={startBtn}>
            Start
          </button>
          <button class="timer-button-stop" onClick={onStop} ref={stopBtn} disabled>
            Stop
          </button>
          <button class="timer-button-reset" onClick={onReset} ref={resetBtn} disabled>
            Reset
          </button>
        </div>
      </div>
      <div class="timer-settings">
        <div class="timer-name">{timer.name}</div>
        <div class="timer-details">
          <div class="timer-begin">
            <label for="begin">Begin</label>
            <AutoResizableInput
              input_type="number"
              default={(timer.begin || 0).toString()}
              onChange={e => setTimer('begin', parseInt(e.target.value))}
              suffix="sec"
              max="999999"
              min="0"
            />
          </div>
          <div class="timer-rounds">
            <For each={timer.rounds}>
              {(round, index) => (
                <Round
                  round={round}
                  index={index}
                  update={r => updateRound(index(), r)}
                  destruct={() => deleteRound(index())}
                />
              )}
            </For>
          </div>
          <button class="timer-button-add" onClick={addRound}>
            +
          </button>
          <div class="timer-end">
            <label for="end">End</label>
            <AutoResizableInput
              input_type="number"
              default={(timer.end || 0).toString()}
              onChange={e => setTimer('end', parseInt(e.target.value))}
              suffix="sec"
              max="999999"
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
