import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

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
              { name: 'Hard', time: 30, color: Colors.Red },
              { name: 'Low', time: 270, color: Colors.Yellow },
            ],
            repeat: 5,
          },
        ],
        end: 120,
      }}
    />
  );
}
