import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTaskByProjectId, createTask, updateTask, deleteTask as apiDeleteTask } from "../api/taskApi";

export const fetchTasks = createAsyncThunk(
  "tasks/fetch",
  async (projectId, thunkAPI) => {
    if (!projectId) {
      return [];
    }
    const res = await getTaskByProjectId(projectId);
    if (Array.isArray(res.data)) return res.data;
    if (res.data && Array.isArray(res.data.data)) return res.data.data;
    return [];
  }
);

export const addTask = createAsyncThunk("tasks/add", async ({ projectId, data }) => {
  const res = await createTask(projectId, data);
  if (res.data && res.data.data) return res.data.data;
  return res.data;
});

export const moveTask = createAsyncThunk("tasks/move", async ({ id, data }) => {
  const res = await updateTask(id, data);
  return res.data.data || res.data;
});

export const removeTask = createAsyncThunk("tasks/remove", async ({ id }) => {
  await apiDeleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: { data: [], loading: false },
  reducers: {
    moveTaskLocally: (state, action) => {
      const { id, status } = action.payload;
      const idx = state.data.findIndex((t) => t._id === id);
      if (idx !== -1) {
        state.data[idx].status = status;
      }
    },
    removeTaskLocally: (state, action) => {
      const { id } = action.payload;
      state.data = state.data.filter((t) => t._id !== id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          if (Array.isArray(action.payload)) {
            action.payload.forEach(t => state.data.push(t));
          } else {
            state.data.push(action.payload);
          }
        } else {
          state.data = action.payload && !Array.isArray(action.payload) ? [action.payload] : (action.payload || []);
        }
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const taskData = action.payload;
        const idx = state.data.findIndex((t) => t._id === taskData._id);
        if (idx !== -1) {
          state.data[idx] = taskData;
        } else {
          state.data.push(taskData);
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.data = state.data.filter((t) => t._id !== action.payload);
      });
  },
});

export const { moveTaskLocally, removeTaskLocally } = taskSlice.actions;
export default taskSlice.reducer;
