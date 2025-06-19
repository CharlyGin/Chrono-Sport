import Timer from '../../components/timer';

export default function GoTo() {
  return (
    <Timer
      timer={{
        name: 'Go-To',
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Cool', time: 30, color: 0x00ff00 },
              {
                name: 'Hard',
                time: 30,
                color: 0xff0000,
              },
            ],
            repeat: 10,
          },
        ],
      }}
    />
  );
}
