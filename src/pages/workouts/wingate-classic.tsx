import { JSX } from 'solid-js';
import Timer from '../../components/timer';

export default function WingateClassic(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Wingate Classic',
        begin: 180,
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Hard', time: 30, color: 0xff0000 },
              { name: 'Low', time: 270, color: 0xffe400 },
            ],
            repeat: 5,
          },
        ],
        end: 120,
      }}
    />
  );
}
