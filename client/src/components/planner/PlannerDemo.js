import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

// Import our standalone event planner component
import StandaloneEventPlanner from './StandaloneEventPlanner';

const PlannerDemo = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [plannerData, setPlannerData] = useState(null);
  
  useEffect(() => {
    // Check if user is admin or planner
    if (!user || (user.role !== 'admin' && user.role !== 'planner')) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSaveClick = () => {
    setSaveDialogOpen(true);
  };

  const handleSaveProject = () => {
    if (!projectName.trim()) {
      alert('Please enter a project name');
      return;
    }
    
    // In a real implementation, we would:
    // 1. Get the current planner state
    // 2. Generate a thumbnail
    // 3. Save the project data to the server
    
    alert(`Event plan "${projectName}" saved successfully!`);
    setSaveDialogOpen(false);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    setSaveDialogOpen(false);
  };
  
  const handlePlannerSave = (data) => {
    setPlannerData(data);
    setSaveDialogOpen(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/dashboard')}
            aria-label="back"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Event Planner - New Event
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
      <Dialog open={saveDialogOpen} onClose={handleCancel}>
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
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSaveProject} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PlannerDemo; 