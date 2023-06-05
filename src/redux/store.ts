import { configureStore } from "@reduxjs/toolkit";
import ContactsSlice from "./reducers/contactSlice";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    contact: ContactsSlice,
  },
});

store.subscribe(() => console.log("subcribe", store.getState()));

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

// Still pass action objects to `dispatch`, but they're created for us
// store.dispatch(incremented());
// {value: 1}
// store.dispatch(incremented());
// {value: 2}
// store.dispatch(decremented());
// {value: 1}
// store.dispatch(incremented());
// {value: 1}
