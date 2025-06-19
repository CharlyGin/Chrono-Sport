import Timer from '../../components/timer';

export default function Blank() {
  return (
    <Timer
      timer={{
        name: 'Blank',
        rounds: [],
      }}
    />
  );
}
