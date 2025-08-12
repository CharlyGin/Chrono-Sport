import { JSX } from 'solid-js';
import Timer from '../../components/timer';

export default function Blank(): JSX.Element {
  return (
    <Timer
      timer={{
        name: 'Blank',
        rounds: [],
      }}
    />
  );
}
