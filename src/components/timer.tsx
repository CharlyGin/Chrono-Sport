import { createSignal, For, onCleanup } from 'solid-js';
import { initTimerDefaultValues, RoundType, TimerType, ChronoType, TimerState } from './timer.data';
import './timer.scss';
import { createStore, produce } from 'solid-js/store';
import { A } from '@solidjs/router';
import { Execution, ExecutionVisitor } from '../utils/visitor/execution_visitor';
import { Queue } from '../utils/queue';

function Chrono(props: { chrono: ChronoType; destruct: () => void; update: (c) => void }) {
  return (
    <div class="timer-round-chrono">
      <div class="timer-round-chrono-color">
        <input
          type="color"
          name="chrono-color"
          value={`#${props.chrono.color.toString(16).padStart(6, '0')}`}
          onChange={e => props.update({ color: parseInt(e.target.value.slice(1), 16) })}
        />
      </div>
      <div class="timer-round-chrono-name">
        <input
          type="text"
          name="chrono-name"
          value={props.chrono.name}
          onChange={e => props.update({ name: e.target.value })}
        />
      </div>
      <div class="timer-round-chrono-time">
        <div class="input-wrapper">
          <input
            type="number"
            name="chrono-time"
            value={props.chrono.time}
            onChange={e => props.update({ time: parseInt(e.target.value) })}
          />
          <span class="suffix">sec</span>
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
}) {
  const [chronos, setChronos] = createStore(props.round.chronos);

  const addChrono = () => {
    setChronos(current_chronos => [
      ...current_chronos,
      { name: 'New Chrono', time: 1, color: 0xffffff },
    ]);
  };

  const deleteChrono = (index: () => number) => {
    setChronos(current_chronos => current_chronos.filter((_, i) => i != index()));
  };

  const updateChrono = (index: () => number) => {
    const update = (c: { name?: string; color?: number; time?: number }) => {
      setChronos(index(), c);
    };
    return update;
  };

  return (
    <div class="timer-round">
      <div class="timer-round-name">
        <input
          type="text"
          name="round-name"
          value={props.round.name}
          onChange={e => props.update({ name: e.target.value })}
        />
        <div class="input-wrapper">
          <input
            type="number"
            name="round-time"
            value={props.round.repeat}
            onChange={e => props.update({ repeat: parseInt(e.target.value) })}
          />
          <span class="suffix">times</span>
        </div>
        <button class="timer-button-remove" onClick={props.destruct}>
          X
        </button>
      </div>
      <div class="timer-round-pre">
        <label for="round-pre">Pre</label>
        <div class="input-wrapper">
          <input
            type="number"
            name="round-pre"
            value={props.round.pre}
            onChange={e => props.update({ pre: parseInt(e.target.value) })}
          />
          <span class="suffix">sec</span>
        </div>
      </div>
      <div class="timer-round-chronos">
        <For each={chronos}>
          {(chrono, index) => (
            <Chrono
              chrono={chrono}
              destruct={() => deleteChrono(index)}
              update={updateChrono(index)}
            />
          )}
        </For>
        <button class="timer-button-add" onClick={() => addChrono()}>
          +
        </button>
      </div>
      <div class="timer-round-post">
        <label for="round-post">Post</label>
        <div class="input-wrapper">
          <input type="number" name="round-post" value={props.round.post} />
          <span class="suffix">sec</span>
        </div>
      </div>
    </div>
  );
}

export default function Timer(props: { timer: TimerType }) {
  const [timer, setTimer] = createStore(initTimerDefaultValues(props.timer));
  const [execution, setExecution] = createSignal<Execution | undefined>();
  const [ms, setMs] = createSignal(0);

  let prevState: TimerState | undefined = undefined;
  let state: TimerState = 'ready';

  let startBtn: HTMLButtonElement | undefined;
  let stopBtn: HTMLButtonElement | undefined;
  let resetBtn: HTMLButtonElement | undefined;
  let displayRef: HTMLDivElement | undefined;

  let interval: number | undefined = undefined;

  let execution_queue: Queue<Execution> | undefined;

  const onStart = () => {
    // Update state
    prevState = state;
    state = 'running';
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;

    if (prevState == 'ready') {
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
        setExecution(execution_queue.dequeue());
        displayRef.style['backgroundColor'] = execution().color
          ? `#${execution().color.toString(16).padStart(6, '0')}`
          : 'transparent';
      }

      // Next execution
      if (current_execution && current_execution.time == ms() / 1000) {
        // End of timer
        if (execution_queue.isEmpty()) {
          clearInterval(interval);
          displayRef.style['backgroundColor'] = 'transparent';
          return;
        }

        setExecution(execution_queue.dequeue());
        displayRef.style['backgroundColor'] = execution().color
          ? `#${execution().color.toString(16).padStart(6, '0')}`
          : 'transparent';
        setMs(0);
        return;
      }

      setMs(prev => prev + 10);
    }, 10);
  };

  const onStop = () => {
    // Update state
    prevState = state;
    state = 'pause';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = false;

    if (interval) clearInterval(interval);
  };

  const onReset = () => {
    // Update state
    prevState = state;
    state = 'ready';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;

    setMs(0);
    setExecution(undefined);
    displayRef.style['backgroundColor'] = 'transparent';
    if (interval) clearInterval(interval);
  };

  const updateRound = (
    index: number,
    new_round: { name?: string; pre?: number; post?: number; repeat?: number }
  ) => {
    setTimer(
      'rounds',
      index,
      produce(round => {
        Object.assign(round, new_round);
      })
    );
  };

  const addRound = () => {
    setTimer('rounds', [
      ...timer.rounds,
      { name: 'New Round', pre: 0, chronos: [], post: 0, repeat: 1 },
    ]);
  };

  const deleteRound = (index: number) => {
    setTimer(
      'rounds',
      timer.rounds.filter((_, i) => i != index)
    );
  };

  // Cleanup interval when component is unmounted
  onCleanup(() => {
    if (interval) clearInterval(interval);
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
            {execution() ? execution().round_name : ''}{' '}
            {execution() && execution().roundi && execution().round_repeat
              ? `${execution().roundi}/${execution().round_repeat}`
              : ''}
          </div>
          <div class="timer-display-info-chrono">{execution() ? execution().chrono_name : ''}</div>
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
            <div class="input-wrapper">
              <input
                type="number"
                name="begin"
                value={timer.begin}
                onChange={e => setTimer('begin', parseInt(e.target.value))}
              />
              <span class="suffix">sec</span>
            </div>
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
            <div class="input-wrapper">
              <input
                type="number"
                name="end"
                value={timer.end}
                onChange={e => setTimer('end', parseInt(e.target.value))}
              />
              <span class="suffix">sec</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
