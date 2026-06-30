import { useState } from "react";
import { HabitProvider } from "../context/HabitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import HabitTrackerHeader from "../components/HabitTracker/HabitTrackerHeader";
import HabitForm from "../components/HabitTracker/HabitForm";
import HabitList from "../components/HabitTracker/HabitList";

export default function HabitTrackerPage() {
  const [weekOffset, setWeekOffset] = useState(0);

  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col p-4">
      <HabitProvider>
        <HabitTrackerHeader
          visibleDates={visibleDates}
          onNext={() => setWeekOffset((o) => o + 1)}
          onPrev={() => setWeekOffset((o) => o - 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </main>
  );
}
