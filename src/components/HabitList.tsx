import { useHabits } from "../context/useHabits";
import HabitItem from "./HabitItem";

export type Habit = { id: string; name: string; completions: Date[] };

type HabitListProps = { visibleDates: Date[] };

export default function HabitList({ visibleDates }: HabitListProps) {
  const { habits } = useHabits();

  if (habits.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">
        No habits yet. Add one to get started.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} visibleDates={visibleDates} />
      ))}
    </div>
  );
}
