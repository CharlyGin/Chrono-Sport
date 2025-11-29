import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function Basic(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Basic',
        rounds: [
          {
            name: 'Warm up',
            chronos: [{ name: 'Cool', time: 180, color: Colors.Green }],
            repeat: 1,
          },
          {
            name: 'Work',
            chronos: [{ name: 'Hard !', time: 180, color: Colors.Red }],
            post: 180,
            repeat: 5,
          },
        ],
      }}
    />
  );
}
