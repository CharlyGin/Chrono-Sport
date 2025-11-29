import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function TenByOne(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Ten By One',
        begin: 180,
        rounds: [
          {
            name: 'Warm up',
            chronos: [
              { name: 'Cool', time: 60, color: Colors.Green },
              { name: 'Hard !', time: 60, color: Colors.Red },
            ],
            repeat: 10,
          },
        ],
        end: 180,
      }}
    />
  );
}
