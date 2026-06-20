import { createContext, type ReactNode } from "react";

type Context = {
  name: string;
};

type HabitProviderProps = {
  children: ReactNode;
};

const HabitContext = createContext<null | Context>(null);

export function HabitProvider({ children }: HabitProviderProps) {
  return <HabitContext value={{ name: "User" }}>{children}</HabitContext>;
}
