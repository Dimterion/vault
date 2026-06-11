type HabitItemProps = {
  habit: { id: string; name: string };
};

export default function HabitItem({ habit }: HabitItemProps) {
  return (
    <div className="rounded-xl bg-zinc-800 p-4">
      {" "}
      <div className="flex flex-col items-center justify-between gap-3">
        <span className="font-medium">{habit.name}</span>
      </div>
    </div>
  );
}
