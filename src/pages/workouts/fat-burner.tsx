import { JSX } from 'solid-js';
import Timer from '../../components/timer';

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
              { name: 'Extreme', time: 8, color: 0xff0000 },
              { name: 'Low', time: 12, color: 0xffe400 },
            ],
            repeat: 60,
          },
        ],
        end: 120,
      }}
    />
  );
}
