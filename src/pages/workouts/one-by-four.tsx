import Timer from '../../components/timer';

export default function OneByFour() {
  return (
    <Timer
      timer={{
        name: 'One By Four',
        begin: 180, // 3 minutes
        rounds: [
          {
            name: 'Round',
            chronos: [{ name: 'Active', time: 240, color: 0xff0000 }], // 4 minutes
            repeat: 1,
          },
        ],
        end: 120,
      }}
    />
  );
}
