import { A } from '@solidjs/router';
import { For, JSX } from 'solid-js';

export default function MenuSection(props: {
  title: string;
  workouts: { name: string; path: string }[];
}): JSX.Element {
  return (
    <div class="flex flex-col justify-center items-center m-4 w-8/10">
      <div class="font-bold text-4xl m-4">{props.title}</div>
      <div class="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 w-full">
        <For each={props.workouts}>
          {workout => (
            <button class="btn btn-outline btn-xl w-full sm:w-fit">
              <A class="" href={workout.path}>
                {workout.name}
              </A>
            </button>
          )}
        </For>
      </div>
    </div>
  );
}
