import Timer from '../../components/timer';

export default function Beginner() {
  return (
    <Timer
      timer={{
        name: 'Beginner',
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Cool', time: 180, color: 0x00ff00 },
              {
                name: 'Hard',
                time: 180,
                color: 0xff0000,
              },
            ],
            repeat: 5,
          },
        ],
      }}
    />
  );
}
