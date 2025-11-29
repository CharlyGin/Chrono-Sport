import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

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
              { name: 'Active', time: 20, color: Colors.Red },
              {
                name: 'Rest',
                time: 10,
                color: Colors.Green,
              },
            ],
            repeat: 8,
          },
        ],
      }}
    />
  );
}
