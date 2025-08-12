import { JSX } from 'solid-js';
import Timer from '../../components/timer';

export default function Tabata(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Tabata',
        begin: 10,
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Active', time: 20, color: 0xff0000 },
              {
                name: 'Rest',
                time: 10,
                color: 0x00ff00,
              },
            ],
            repeat: 8,
          },
        ],
      }}
    />
  );
}
