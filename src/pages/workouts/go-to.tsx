import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function GoTo(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Go-To',
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Cool', time: 30, color: Colors.Green },
              {
                name: 'Hard',
                time: 30,
                color: Colors.Red,
              },
            ],
            repeat: 10,
          },
        ],
      }}
    />
  );
}
