import { JSX } from 'solid-js';
import Timer from '../../components/timer';

export default function Midwestern(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Midwestern',
        begin: 180,
        rounds: [
          {
            name: 'Warm up',
            chronos: [
              { name: 'Cool', time: 30, color: 0x00ff00 },
              { name: 'Hard !', time: 30, color: 0xff0000 },
            ],
            repeat: 20,
          },
        ],
        end: 180,
      }}
    />
  );
}
