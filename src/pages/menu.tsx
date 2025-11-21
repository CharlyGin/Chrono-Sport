import { createSignal, For, JSX, onMount } from 'solid-js';
import MenuSection from '../components/menu-section';
import { routes } from '../routes';

export default function Menu(): JSX.Element {
  const [visible, setVisible] = createSignal(false);

  onMount(() => {
    // trigger the entrance transition
    requestAnimationFrame(() => setVisible(true));
  });

  const workouts: { name: string; path: string }[] = routes
    .filter(r => typeof r.path === 'string' && r.path.startsWith('/workouts'))
    .map(r => {
      if (typeof r.path !== 'string') {
        throw new Error('Invalid route path type');
      }

      const name: string = r.path.split('/').slice(-1)[0];

      const re = new RegExp('(-*[a-zA-Z0-9-]+)+');
      if (re.exec(name)) {
        return {
          path: `/workouts/${name}`,
          name: name
            .split('-')
            .map(p => p[0].toLocaleUpperCase() + p.slice(1))
            .join(' '),
        };
      }

      return { name, path: name };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const menus = [
    {
      name: 'Classic',
      items: [
        { name: 'Clock', path: '/clock' },
        { name: 'Chrono', path: '/chronometer' },
      ],
    },
    { name: 'Workouts', items: workouts },
    { name: 'Customs', items: [{ name: 'Blank', path: '/customs/blank' }] },
  ];

  return (
    <div
      class={`flex flex-col space-x-4 justify-center items-center m-4 transform transition duration-1000 ease-in-out transition-opacity ${
        visible() ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <For each={menus}>
        {menu => <MenuSection title={menu.name} workouts={menu.items}></MenuSection>}
      </For>
    </div>
  );
}
