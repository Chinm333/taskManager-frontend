import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProjects, createProject, deleteProject } from "../api/projectApi";

export const fetchProjects = createAsyncThunk("projects/fetch", async () => {
  const res = await getProjects();
  if (Array.isArray(res.data)) return res.data;
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  return [];
});

export const addProject = createAsyncThunk("projects/add", async (data) => {
  const res = await createProject(data);
  if (res.data && res.data.data) return res.data.data;
  return res.data;
});

export const removeProject = createAsyncThunk("projects/remove", async (id) => {
  await deleteProject(id);
  return id;
});

const projectSlice = createSlice({
  name: "projects",
  initialState: { data: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(addProject.fulfilled, (state, action) => {
        if (Array.isArray(state.data)) {
          if (Array.isArray(action.payload)) {
            action.payload.forEach(p => state.data.push(p));
          } else {
            state.data.push(action.payload);
          }
        } else {
          state.data = action.payload && !Array.isArray(action.payload) ? [action.payload] : (action.payload || []);
        }
      })
      .addCase(removeProject.fulfilled, (state, action) => {
        state.data = state.data.filter((p) => p._id !== action.payload);
      });
  },
});

export default projectSlice.reducer;
