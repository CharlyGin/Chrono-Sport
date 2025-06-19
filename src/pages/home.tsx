import './home.scss';
import { A } from '@solidjs/router';
import { For } from 'solid-js';
import { routes } from '../routes';

export default function Home() {
  const workouts = routes
    .filter(r => r.path.startsWith('/workouts'))
    .map(r => {
      const name: string = r.path.split('/').slice(-1)[0];

      const re = new RegExp('(\-*[a-zA-Z]+)+');
      if (re.exec(name)) {
        return {
          name: name,
          label: name
            .split('-')
            .map(p => p[0].toLocaleUpperCase() + p.slice(1))
            .join(' '),
        };
      }

      return { name, label: name };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div class="menu">
      <div class="menu-section">
        <div class="menu-section-title">classic</div>
        <div class="menu-section-item-list">
          <A href="/clock" class="menu-section-item">
            Clock
          </A>
          <A href="/chronometer" class="menu-section-item">
            Chrono
          </A>
        </div>
      </div>
      <div class="menu-section">
        <div class="menu-section-title">workouts</div>
        <div class="menu-section-item-list">
          <For each={workouts}>
            {workout => (
              <A href={`/workouts/${workout.name}`} class="menu-section-item">
                {workout.label}
              </A>
            )}
          </For>
        </div>
      </div>
      <div class="menu-section">
        <div class="menu-section-title">customs</div>
        <div class="menu-section-item-list">
          <A href="/customs/blank" class="menu-section-item">
            Blank
          </A>
        </div>
      </div>
    </div>
  );
}
