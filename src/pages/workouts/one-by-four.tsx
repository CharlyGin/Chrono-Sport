import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function OneByFour(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'One By Four',
        begin: 180, // 3 minutes
        rounds: [
          {
            name: 'Round',
            chronos: [{ name: 'Active', time: 240, color: Colors.Red }], // 4 minutes
            repeat: 1,
          },
        ],
        end: 120,
      }}
    />
  );
}
