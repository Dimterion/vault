export default function HabitList() {
  const habits = [];

  if (habits.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">
        No habits yet. Add one to get started.
      </p>
    );
  }

  return <>Habits</>;
}
