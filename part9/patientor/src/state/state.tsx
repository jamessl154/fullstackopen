import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  diagnoses: { [code: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  diagnoses: {}
};

// When the app starts, the context is initialized with these values. state is just the initialState and
// dispatch is just a function that returns the initial state
export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

// StateProvider takes props reducer and children. props.children is automatically created with the JSX:
//   <StateProvider>
//     {children}
//   </StateProvider>
// https://reactjs.org/docs/jsx-in-depth.html#children-in-jsx
export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // when the value of the context changes, the provider's descendants are re-rendered https://reactjs.org/docs/context.html#contextprovider
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
// when we call useStateValue() we get the current [state, dispatch] from the StateContext.Provider
// this allows deeply nested components to dispatch actions to the reducer to change state (value of the Context.provider)
// and trigger re-renders with the new state
