import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectById, saveProject } from '../features/projects/projectSlice';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// Material UI Icons
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Import the standalone event planner component
import StandaloneEventPlanner from '../components/planner/StandaloneEventPlanner';

const PlannerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');
  const [plannerData, setPlannerData] = useState(null);
  
  const { project, loading } = useSelector(state => state.project);
  
  // Load project if we have an ID
  useEffect(() => {
    if (id && id !== 'new') {
      dispatch(getProjectById(id));
    }
  }, [dispatch, id]);
  
  // Set project name/description when loaded
  useEffect(() => {
    if (project && id !== 'new') {
      setProjectName(project.name || '');
      setProjectDescription(project.description || '');
      setPlannerData(project.plannerData || null);
    }
  }, [project, id]);
  
  const handleSaveClick = () => {
    if (id === 'new') {
      setSaveDialogOpen(true);
    } else {
      handleSaveProject();
    }
  };
  
  const handlePlannerSave = (data) => {
    setPlannerData(data);
    setSaveDialogOpen(true);
  };
  
  const handleSaveProject = async () => {
    if (!projectName.trim()) {
      showSnackbar('Please enter a project name', 'error');
      return;
    }
    
    try {
      // In a production environment, we would:
      // 1. Get the current planner state from the event planner component
      // 2. Generate a thumbnail from the state
      // 3. Save the project data to the server
      
      const projectData = {
        id: id !== 'new' ? id : undefined,
        name: projectName,
        description: projectDescription,
        plannerData: plannerData,
        // In a real implementation, we would generate a thumbnail
        thumbnail: 'https://via.placeholder.com/300x200?text=Floor+Plan'
      };
      
      await dispatch(saveProject(projectData)).unwrap();
      
      setSaveDialogOpen(false);
      showSnackbar('Project saved successfully!', 'success');
      
      // Redirect to project detail if it's a new project
      if (id === 'new') {
        navigate('/projects');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      showSnackbar('Failed to save project', 'error');
    }
  };
  
  const showSnackbar = (message, severity = 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  if (loading && id !== 'new') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/projects')}
            aria-label="back"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {id === 'new' ? 'Create New Event Plan' : `Edit: ${projectName}`}
          </Typography>
          <Button 
            color="inherit" 
            startIcon={<SaveIcon />}
            onClick={handleSaveClick}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ flexGrow: 1, position: 'relative', p: 2 }}>
        <StandaloneEventPlanner
          width="100%"
          height="100%"
          initialData={plannerData}
          onSave={handlePlannerSave}
        />
      </Box>
      
      {/* Save Dialog */}
      <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
        <DialogTitle>Save Event Plan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter a name and description for your event plan.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            type="text"
            fullWidth
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description (optional)"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveProject} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PlannerPage; 