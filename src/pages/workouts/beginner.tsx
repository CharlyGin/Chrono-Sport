import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function Beginner(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Beginner',
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Cool', time: 180, color: Colors.Green },
              {
                name: 'Hard',
                time: 180,
                color: Colors.Red,
              },
            ],
            repeat: 5,
          },
        ],
      }}
    />
  );
}
