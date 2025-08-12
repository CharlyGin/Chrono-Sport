import { A } from '@solidjs/router';
import { For, JSX, onMount } from 'solid-js';
import { routes } from '../routes';
import './menu.scss';

export default function Menu(): JSX.Element {
  const workouts: { name: string; label: string }[] = routes
    .filter(r => typeof r.path === 'string' && r.path.startsWith('/workouts'))
    .map(r => {
      if (typeof r.path !== 'string') {
        throw new Error('Invalid route path type');
      }

      const name: string = r.path.split('/').slice(-1)[0];

      const re = new RegExp('(-*[a-zA-Z]+)+');
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

  let menuRef!: HTMLDivElement;

  onMount(() => {
    let incr: number = 1;
    for (const menu_section of menuRef.querySelectorAll('.menu-section')) {
      const title: HTMLElement | null = menu_section.querySelector('.menu-section-title');
      if (!title) {
        continue;
      }
      title.style.animationDelay = `${incr * 0.1}s`;

      incr++;

      const items = menu_section.querySelectorAll<HTMLElement>(
        '.menu-section-item-list .menu-section-item'
      );
      for (const item of items) {
        item.style.animationDelay = `${incr * 0.1}s`;
        incr++;
      }
    }
  });

  return (
    <div class="menu" ref={menuRef}>
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
