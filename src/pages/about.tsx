import { JSX, onMount } from 'solid-js';
import './about.scss';

export default function About(): JSX.Element {
  onMount(() => {
    const sections = document.querySelectorAll('.about-section');
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('disappear');
          } else {
            entry.target.classList.remove('visible');
            entry.target.classList.add('disappear');
          }
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach(section => observer.observe(section));
    return (): void => observer.disconnect();
  });

  return (
    <div class="flex flex-col justify-center items-center gap-4 p-8">
      <div class="bg-base-200 flex flex-col justify-center items-center p-8 w-full sm:w-3/4 rounded-lg shadow-lg">
        <div class="font-bold text-4xl m-4">Pourquoi cette application ?</div>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-10">
          <div class="grow-3 text-justify text-2xl p-4">
            Je suis un grand fan de sport à haute intensité. Après la lecture du livre{' '}
            <a href="https://www.amazon.com/One-Minute-Workout-Science-Smarter-Shorter/dp/0399183663">
              The One Minute Workout
            </a>{' '}
            j'ai eu envie de contribuer à ma manière en créant une application dans laquelle
            n'importe qui peut créer simplement ses propres entraînements.
          </div>
          <div class="grow-1">
            {' '}
            <img
              src="/images/one-minute-workout-cover.jpg"
              alt="Couverture du livre 'The One Minute Workout'"
            />
            <div class="italic text-center">Couverture du livre "The One Minute Workout"</div>
          </div>
        </div>
      </div>
      <div class="bg-base-200 flex flex-col justify-center items-center p-8 w-full sm:w-3/4 rounded-lg shadow-lg">
        <div class="font-bold text-4xl m-4">Comment se structure un entraînement ?</div>
        <div class="about-section-content">
          <div class="flex flex-col sm:flex-row justify-center items-center gap-10">
            <div class="grow-4">
              <img
                width={1000}
                src="/images/theorie.svg"
                alt="Structure théorique d'un entraînement de cardio"
              />
              <div class="italic text-center">Structure théorique d'un entraînement de cardio</div>
            </div>
            <div class="grow-3 text-justify text-2xl p-4">
              <p>
                Contrairement aux entraînements de musculation classique, on ne va pas réaliser une
                découpe en M séries de N répétions mais plutôt avoir un nombre de cycles avec une
                limite de temps.
              </p>
              <br />
              <p>
                Un entraînement se compose d'un début, d'une suite de rounds qui se répètent une ou
                plusieurs fois et d'un fin. Un round se compose de plusieurs chronomètres qui sont
                exécutés séquentiellement.
              </p>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row justify-center items-center">
            <div class="grow-3 text-justify text-2xl p-4">
              Si on prend l'exemple d'un entraînement type Tabata, un seul et même round qui se
              répète au minimum 4 fois. Il se compose d'une phase active de 20s et d'une phase de
              repos de 10s.
            </div>
            <div class="grow-1">
              <img
                width={800}
                src="/images/tabata.svg"
                alt="Structure d'un entraînement type Tabata"
              />
              <div class="italic text-center">Structure d'un entraînement type Tabata</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-base-200 flex flex-col justify-center items-center p-8 w-full sm:w-3/5 rounded-lg shadow-lg">
        <div class="font-bold text-4xl m-4">Vous aimez l'application ?</div>
        <div class="about-section-content">
          <div class="flex flex-row justify-center items-center">
            <div class="left-pan grow">
              <ul>
                <li class="github">
                  <a href="https://github.com/CharlyGin/Chrono-Sport">Sources</a>
                </li>
                <li class="discord">
                  <a href="https://discord.gg/bBNpTXWgF2">Discord</a>
                </li>
              </ul>
              <a href="https://www.buymeacoffee.com/charlyg" target="_blank">
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="Buy Me A Coffee"
                  style="height: 60px !important;width: 217px !important;"
                />
              </a>
            </div>
            <div class="right-pan grow basis-0">
              <img
                class="rounded-full w-full h-auto hidden sm:block"
                src="https://github.com/charlygin.png"
                alt="Moi :-)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
