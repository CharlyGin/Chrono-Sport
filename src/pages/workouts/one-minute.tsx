import { JSX } from 'solid-js';
import Timer from '../../components/timer';
import { Colors } from '../../data/color.data';

export default function OneMinute(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'One Minute',
        begin: 180, // 3 minutes
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Active', time: 20, color: Colors.Red }, // 20 seconds
              {
                name: 'Rest',
                time: 120, // 2 minutes
                color: Colors.Green,
              },
            ],
            repeat: 3,
          },
        ],
      }}
    />
  );
}
