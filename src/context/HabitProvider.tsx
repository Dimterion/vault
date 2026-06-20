import { createContext } from "react";

type Context = {
  name: string;
};

const HabitContext = createContext<null | Context>(null);

export function HabitProvider() {
  return <HabitContext value={{ name: "User" }}></HabitContext>;
}
