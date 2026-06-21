import { createContext, type ReactNode } from "react";

type Habit = {
  id: string;
  name: string;
  completions: Date[];
};

type Context = {
  habits: Habit[];
  addHabit: (name: string) => void;
  deleteHabit: (name: string) => void;
  toggleHabit: (name: string, date: Date) => void;
};

type HabitProviderProps = {
  children: ReactNode;
};

const HabitContext = createContext<null | Context>(null);

export function HabitProvider({ children }: HabitProviderProps) {
  return <HabitContext value={{ name: "User" }}>{children}</HabitContext>;
}
