import Timer from '../../components/timer';

export default function OneMinute() {
  return (
    <Timer
      timer={{
        name: 'One Minute',
        begin: 180, // 3 minutes
        rounds: [
          {
            name: 'Round',
            chronos: [
              { name: 'Active', time: 20, color: 0xff0000 },
              {
                name: 'Rest',
                time: 120, // 2 minutes
                color: 0x00ff00,
              },
            ],
            repeat: 3,
          },
        ],
      }}
    />
  );
}
