import { isToday } from "date-fns";
import { useHabits } from "../context/useHabits";
import Button from "./Button";

export default function Header() {
  const { habits } = useHabits();

  const doneToday = habits.filter((h) =>
    h.completions.some((c) => isToday(c)),
  ).length;

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Tracker</h1>
        <span className="text-sm text-zinc-400">
          {doneToday} / {habits.length} done today
        </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm text-zinc-400">May 6 - May 16</span>
        <div className="flex items-center gap-3">
          <Button>Prev</Button>
          <Button>Next</Button>
        </div>
      </div>
    </header>
  );
}
