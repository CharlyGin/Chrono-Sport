import { A, useLocation } from '@solidjs/router';
import { createMemo, JSX } from 'solid-js';

export function NavBarButton(props: {
  path: string;
  classes?: string;
  children: JSX.Element;
}): JSX.Element {
  const is_selected = createMemo(() => useLocation().pathname === props.path);

  return (
    <A
      class={`${is_selected() ? 'bg-base-200' : ''} ${props.classes ?? ''} transition-colors duration-500 ease-in-out`}
      href={props.path}
    >
      {props.children}
    </A>
  );
}
