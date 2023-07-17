import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "Peter Doe",
		email: "peter@gmail.com",
		github: "peter",
	},
	{
		id: "2",
		name: "angel",
		email: "lean@gmail.com",
		github: "ngelrojas",
	},
	{
		id: "3",
		name: "Phil Less",
		email: "phil@gmail.com",
		github: "phil",
	},
];
export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface userWithId extends User {
	id: UserId;
}

const initialState: userWithId[] = (() => {
	const persistanceState = localStorage.getItem("__redux__state__");
	if (persistanceState) return JSON.parse(persistanceState).users;

	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			// the code below working exactly the same as return code commented.
			state.push({ id, ...action.payload });
			// return [...state, { id, ...action.payload }];
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<userWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				// the code below working exactly the same as return code commented.
				state.push(action.payload);
				// return [...state, action.payload];
			}
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
