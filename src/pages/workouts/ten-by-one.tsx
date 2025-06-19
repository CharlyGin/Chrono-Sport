import Timer from '../../components/timer';

export default function TenByOne() {
  return (
    <Timer
      timer={{
        name: 'Ten By One',
        begin: 180,
        rounds: [
          {
            name: 'Warm up',
            chronos: [
              { name: 'Cool', time: 60, color: 0x00ff00 },
              { name: 'Hard !', time: 60, color: 0xff0000 },
            ],
            repeat: 10,
          },
        ],
        end: 180,
      }}
    />
  );
}
