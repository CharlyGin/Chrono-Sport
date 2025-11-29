import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

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
              { name: 'Cool', time: 30, color: Colors.Green },
              { name: 'Hard !', time: 30, color: Colors.Red },
            ],
            repeat: 20,
          },
        ],
        end: 180,
      }}
    />
  );
}
