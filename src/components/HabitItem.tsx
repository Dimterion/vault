type HabitItemProps = {
  habit: { id: string; name: string };
};

export default function HabitItem({ habit }: HabitItemProps) {
  return <h1>{habit.name}</h1>;
}
