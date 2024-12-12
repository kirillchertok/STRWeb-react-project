import { createContext } from "react";
import Store from "./store";

const store = new Store()
export const Context = createContext({ store })

export default store