import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function FatBurner(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Fat Burner',
        begin: 180,
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Extreme', time: 8, color: Colors.Red },
              { name: 'Low', time: 12, color: Colors.Yellow },
            ],
            repeat: 60,
          },
        ],
        end: 120,
      }}
    />
  );
}
