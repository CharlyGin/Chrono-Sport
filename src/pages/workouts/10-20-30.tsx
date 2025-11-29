import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function TenTwentyThirty(): JSX.Element {
  return (
    <Timer
      timer={{
        name: '10-20-30',
        begin: 180,
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Medium', time: 30, color: Colors.Yellow },
              { name: 'Hard', time: 20, color: Colors.Orange },
              { name: 'Extreme', time: 10, color: Colors.Red },
              { name: 'Light', time: 120, color: Colors.Green },
            ],
            repeat: 4,
          },
        ],
      }}
    />
  );
}
