import { A } from '@solidjs/router';
import { JSX } from 'solid-js';
import './404.scss';

export default function NotFound(): JSX.Element {
  return (
    <div class="error">
      <div class="error-image">
        <img src="/images/chronometer.png" alt="Chronometer" />
        <div class="text">404</div>
      </div>
      <div class="error-message">
        <div>Not Found</div>
        <A href="/" class="btn btn-outline btn-xl w-full sm:w-fit">
          Go Home
        </A>
      </div>
    </div>
  );
}
