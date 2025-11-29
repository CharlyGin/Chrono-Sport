import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function Norwegian(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Norwegian',
        begin: 180,
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Hard', time: 240, color: Colors.Red },
              { name: 'Low', time: 180, color: Colors.Green },
            ],
            repeat: 4,
          },
        ],
      }}
    />
  );
}
