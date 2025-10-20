import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";
import projectsReducer from "./projectSlice";

const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        projects: projectsReducer,
    },
});

export default store;
export { store };