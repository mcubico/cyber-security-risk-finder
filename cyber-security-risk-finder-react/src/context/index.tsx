import { ReactNode, createContext, useContext, useReducer } from "react";
import IUserModel from "../models/user.model";

type State = { authUser: IUserModel | null }

type Action = {
  type: string,
  payload: IUserModel | null
}

type Dispatch = (action: Action) => void

type StateContextProviderProps = {children: ReactNode }

type CustomContext = {
  state: State,
  dispatch: Dispatch
}

const initialState: State = { authUser: null }

const StateContext = createContext<CustomContext | undefined>(undefined)

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload
      }
    }
    default: {
      throw new Error('Unhandled action type')
    }
  }
}

const StateContextProvider = ({ children }: StateContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);
  const value = { state, dispatch };
  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  )
}

const useStateContext = () => {
  const context = useContext(StateContext);

  if (context)
    return context

  throw new Error(`useStateContext must be used within a StateContextProvider`);
}


// eslint-disable-next-line react-refresh/only-export-components
export { StateContextProvider, useStateContext }
