import Button from "./Button";

type HabitItemProps = {
  habit: { id: string; name: string };
};

export default function HabitItem({ habit }: HabitItemProps) {
  return (
    <div className="rounded-xl bg-zinc-800 p-4">
      {" "}
      <div className="flex flex-col items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400">5</span>
        </div>
        <Button>Delete</Button>
      </div>
    </div>
  );
}
