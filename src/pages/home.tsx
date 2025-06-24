import './home.scss';

import { A, useLocation } from '@solidjs/router';

export default function Home(props) {
  const location = useLocation();
  return (
    <>
      <nav class="navbar">
        <A class={`navbar-item${location.pathname === '/' ? ' active' : ''}`} href="/">
          Menu
        </A>
        <A class={`navbar-item${location.pathname === '/about' ? ' active' : ''}`} href="/about">
          About
        </A>
      </nav>
      {props.children}
    </>
  );
}
