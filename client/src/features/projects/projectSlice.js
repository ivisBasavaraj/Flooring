import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from '../alert/alertSlice';

// Get all projects
export const getProjects = createAsyncThunk(
  'project/getProjects',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/projects');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

// Get project by ID
export const getProjectById = createAsyncThunk(
  'project/getProjectById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/projects/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

// Create new project
export const createProject = createAsyncThunk(
  'project/createProject',
  async (projectData, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post('/api/projects', projectData);
      
      dispatch(setAlert({ message: 'Project created successfully', type: 'success' }));
      
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => 
          dispatch(setAlert({ message: error.msg, type: 'error' }))
        );
      }

      return rejectWithValue(errors);
    }
  }
);

// Update project
export const updateProject = createAsyncThunk(
  'project/updateProject',
  async ({ id, projectData }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.put(`/api/projects/${id}`, projectData);
      
      dispatch(setAlert({ message: 'Project updated successfully', type: 'success' }));
      
      return res.data;
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error => 
          dispatch(setAlert({ message: error.msg, type: 'error' }))
        );
      }

      return rejectWithValue(errors);
    }
  }
);

// Delete project
export const deleteProject = createAsyncThunk(
  'project/deleteProject',
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete(`/api/projects/${id}`);
      
      dispatch(setAlert({ message: 'Project deleted successfully', type: 'success' }));
      
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data.msg);
    }
  }
);

// Add collaborator to project
export const addCollaborator = createAsyncThunk(
  'project/addCollaborator',
  async ({ id, email, role }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`/api/projects/${id}/collaborators`, { email, role });
      
      dispatch(setAlert({ message: 'Collaborator added successfully', type: 'success' }));
      
      return res.data;
    } catch (err) {
      dispatch(setAlert({ message: err.response.data.msg, type: 'error' }));
      return rejectWithValue(err.response.data.msg);
    }
  }
);

// Remove collaborator from project
export const removeCollaborator = createAsyncThunk(
  'project/removeCollaborator',
  async ({ projectId, userId }, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.delete(`/api/projects/${projectId}/collaborators/${userId}`);
      
      dispatch(setAlert({ message: 'Collaborator removed successfully', type: 'success' }));
      
      return res.data;
    } catch (err) {
      dispatch(setAlert({ message: err.response.data.msg, type: 'error' }));
      return rejectWithValue(err.response.data.msg);
    }
  }
);

// Add a new saveProject action that handles both create and update operations
export const saveProject = createAsyncThunk(
  'projects/saveProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = projectData.id
        ? await axios.put(`/api/projects/${projectData.id}`, projectData)
        : await axios.post('/api/projects', projectData);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to save project'
      );
    }
  }
);

const initialState = {
  projects: [],
  project: null,
  loading: false,
  error: null
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    clearProject: (state) => {
      state.project = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
        state.error = null;
      })
      .addCase(getProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProjectById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
        state.error = null;
      })
      .addCase(getProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = [action.payload, ...state.projects];
        state.error = null;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.map(project =>
          project._id === action.payload._id ? action.payload : project
        );
        state.project = action.payload;
        state.error = null;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          project => project._id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCollaborator.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCollaborator.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
        state.error = null;
      })
      .addCase(addCollaborator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeCollaborator.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCollaborator.fulfilled, (state, action) => {
        state.loading = false;
        state.project = action.payload;
        state.error = null;
      })
      .addCase(removeCollaborator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle saveProject
      .addCase(saveProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveProject.fulfilled, (state, action) => {
        state.loading = false;
        // Update or add the saved project in the projects array
        const index = state.projects.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        } else {
          state.projects.push(action.payload);
        }
        state.project = action.payload;
      })
      .addCase(saveProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearProject } = projectSlice.actions;

export default projectSlice.reducer; 