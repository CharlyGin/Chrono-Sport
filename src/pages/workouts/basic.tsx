import { JSX } from 'solid-js';
import Timer from '../../components/timer';

export default function Basic(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Basic',
        rounds: [
          {
            name: 'Warm up',
            chronos: [{ name: 'Cool', time: 180, color: 0x00ff00 }],
            repeat: 1,
          },
          {
            name: 'Work',
            chronos: [{ name: 'Hard !', time: 180, color: 0xff0000 }],
            post: 180,
            repeat: 5,
          },
        ],
      }}
    />
  );
}
