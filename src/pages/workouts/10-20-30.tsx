import Timer from '../../components/timer';

export default function TenTwentyThirty() {
  return (
    <Timer
      timer={{
        name: '10-20-30',
        begin: 180,
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Medium', time: 30, color: 0xffe400 },
              { name: 'Hard', time: 20, color: 0xff5d00 },
              { name: 'Extreme', time: 10, color: 0xff0000 },
              { name: 'Light', time: 120, color: 0x00ff00 },
            ],
            repeat: 4,
          },
        ],
      }}
    />
  );
}
