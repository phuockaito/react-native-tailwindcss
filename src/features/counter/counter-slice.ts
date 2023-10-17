import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
    value: 0,
};
export const counterSlice = createSlice({
    name: "counter",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        onIncrement: (state, action) => {
            state.value += action.payload;
        },
    },
});

const { reducer, actions } = counterSlice;
export const { onIncrement } = actions;
export default reducer;
