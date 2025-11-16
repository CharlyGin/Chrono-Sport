import { createSignal, onCleanup } from 'solid-js';
import type { TimerState, Timer as TimerT } from '../data/timer.types';
import { Queue } from '../utils/queue';
import type { Execution } from '../utils/visitor/execution_visitor';
import { ExecutionVisitor } from '../utils/visitor/execution_visitor';

export function useTimerExecution(timer: TimerT): {
  execution: () => Execution | undefined;
  ms: () => number;
  state: () => TimerState;
  start: () => void;
  stop: () => void;
  reset: () => void;
} {
  const [execution, setExecution] = createSignal<Execution | undefined>();
  const [ms, setMs] = createSignal(0);
  const [state, setState] = createSignal<TimerState>('ready');

  let interval: number | undefined;
  let queue: Queue<Execution> | undefined;

  const start = (): void => {
    if (state() === 'ready') {
      const visitor = new ExecutionVisitor();
      visitor.visitTimer(timer);
      queue = visitor.execution_queue;
    }

    interval = setInterval(() => {
      const current = execution();
      if (!current && queue) {
        setExecution(queue.dequeue());
      }

      if (current && current.time === ms() / 1000) {
        if (queue && !queue.isEmpty()) {
          setExecution(queue.dequeue());
        } else {
          stop();
        }
        setMs(0);
        return;
      }

      setMs(p => p + 10);
    }, 10);

    setState('running');
  };

  const stop = (): void => {
    setState('pause');
    if (interval) {
      clearInterval(interval);
    }
  };

  const reset = (): void => {
    setState('ready');
    setExecution(undefined);
    setMs(0);
    if (interval) {
      clearInterval(interval);
    }
  };

  onCleanup(() => {
    if (interval) {
      clearInterval(interval);
    }
  });

  return { execution, ms, state, start, stop, reset };
}
