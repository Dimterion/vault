import HabitItem from "./HabitItem";

export default function HabitList() {
  const habits = [
    { id: "1", name: "John" },
    { id: "2", name: "Jack" },
    { id: "3", name: "Julie" },
  ];

  if (habits.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">
        No habits yet. Add one to get started.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => {
        return <HabitItem key={habit.id}>{habit.name}</HabitItem>;
      })}
    </div>
  );
}
