import { format, isToday } from "date-fns";
import { useHabits } from "../context/useHabits";
import Button from "./Button";

type HeaderProps = {
  visibleDates: Date[];
  onPrev: () => void;
  onNext: () => void;
};

export default function Header({ visibleDates, onPrev, onNext }: HeaderProps) {
  const { habits } = useHabits();

  const doneToday = habits.filter((h) =>
    h.completions.some((c) => isToday(c)),
  ).length;
  const dateRange = `${format(visibleDates[0], "MMM d")} - ${format(visibleDates.at(-1)!, "MMM d")}`;

  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Tracker</h1>
        <span className="text-sm text-zinc-400">
          {doneToday} / {habits.length} done today
        </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm text-zinc-400">{dateRange}</span>
        <div className="flex items-center gap-3">
          <Button onClick={onPrev}>Prev</Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    </header>
  );
}
