import {
  eachDayOfInterval,
  endOfWeek,
  format,
  isFuture,
  isSameDay,
  startOfWeek,
  subDays,
} from "date-fns";
import Button from "./Button";
import { useHabits } from "../context/useHabits";
import type { Habit } from "./HabitList";

type HabitItemProps = {
  habit: Habit;
};

function getStreak(completions: Date[]) {
  let streak = 0;
  let date = new Date();

  while (completions.some((c) => isSameDay(c, date))) {
    streak++;
    date = subDays(date, 1);
  }

  return streak;
}

export default function HabitItem({ habit }: HabitItemProps) {
  const { deleteHabit, toggleHabit } = useHabits();
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }),
    end: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  const streak = getStreak(habit.completions);

  return (
    <div className="rounded-xl bg-zinc-800 p-4">
      {" "}
      <div className="flex flex-col items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-medium">{habit.name}</span>
          {streak !== 0 && (
            <span className="text-sm text-amber-400">{streak}</span>
          )}
        </div>
        <Button
          onClick={() => deleteHabit(habit.id)}
          variant="ghost-destructive"
          className="text-sm"
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-1.5">
        {visibleDates.map((date) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs"
            key={date.toISOString()}
            onClick={() => toggleHabit(habit.id, date)}
            disabled={isFuture(date)}
            variant={
              habit.completions.some((d) => isSameDay(date, d))
                ? "primary"
                : "secondary"
            }
          >
            <span className="font-medium">{format(date, "EEE")}</span>
            <span>{format(date, "d")}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
