import './404.scss';
import { A } from '@solidjs/router';

export default function NotFound() {
  return (
    <div class="error">
      <div class="error-image">
        <img src="/images/chronometer.png" alt="Chronometer" />
        <div class="text">404</div>
      </div>
      <div class="error-message">
        <div>Not Found</div>
        <A href="/" class="button">
          Go Home
        </A>
      </div>
    </div>
  );
}
