import { format, isFuture, isSameDay, subDays } from "date-fns";
import { useHabits } from "../../context/useHabits";
import Button from "../Button";
import Modal from "../Modal";
import { useState } from "react";

export type Habit = { id: string; name: string; completions: Date[] };

type HabitItemProps = {
  habit: Habit;
  visibleDates: Date[];
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

export default function HabitItem({ habit, visibleDates }: HabitItemProps) {
  const [modal, setModal] = useState(false);
  const { deleteHabit, toggleHabit } = useHabits();
  const streak = getStreak(habit.completions);

  return (
    <div className="flex flex-col gap-3 rounded-xl bg-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <span className="min-w-0 flex-1 font-medium wrap-anywhere">
            {habit.name}
          </span>
          {streak !== 0 && (
            <span className="shrink-0 text-sm text-amber-400">
              Streak: {streak}
            </span>
          )}
        </div>
        <Button
          onClick={() => setModal(true)}
          variant="ghost-destructive"
          className="ml-2 text-sm"
        >
          Delete
        </Button>
        {modal && (
          <Modal onClose={() => setModal(false)}>
            <div className="text-center">
              <p className="text-lg">Delete this entry?</p>
              <Button
                onClick={() => {
                  deleteHabit(habit.id);
                  setModal(false);
                }}
                className="m-4 w-20 border"
              >
                Yes
              </Button>
              <Button
                onClick={() => setModal(false)}
                className="m-4 w-20 border"
              >
                Cancel
              </Button>
            </div>
          </Modal>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {visibleDates.map((date) => (
          <Button
            className="flex flex-1 flex-col items-center gap-0.5 rounded-lg border text-xs"
            key={date.toISOString()}
            disabled={isFuture(date)}
            onClick={() => toggleHabit(habit.id, date)}
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
