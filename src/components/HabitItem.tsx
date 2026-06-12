import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import Button from "./Button";

type HabitItemProps = {
  habit: { id: string; name: string };
};

export default function HabitItem({ habit }: HabitItemProps) {
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return (
    <div className="rounded-xl bg-zinc-800 p-4">
      {" "}
      <div className="flex flex-col items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-medium">{habit.name}</span>
          <span className="text-sm text-amber-400">5</span>
        </div>
        <Button disabled>Delete</Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button key={date.toISOString()}>
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
