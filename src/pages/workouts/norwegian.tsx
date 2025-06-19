import Timer from '../../components/timer';

export default function Norwegian() {
  return (
    <Timer
      timer={{
        name: 'Norwegian',
        begin: 180,
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Hard', time: 240, color: 0xff0000 },
              { name: 'Low', time: 180, color: 0x00ff00 },
            ],
            repeat: 4,
          },
        ],
      }}
    />
  );
}
