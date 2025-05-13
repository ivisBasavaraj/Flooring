import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from '../features/projects/projectSlice';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import EventIcon from '@mui/icons-material/Event';
import CelebrationIcon from '@mui/icons-material/Celebration';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects, loading } = useSelector(state => state.project);
  const { user } = useSelector(state => state.auth);

  const [search, setSearch] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleCreateProject = () => {
    navigate('/planner/new');
  };

  const handleEditProject = (projectId) => {
    navigate(`/planner/${projectId}`);
  };

  const handleViewProject = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (projectToDelete) {
      dispatch(deleteProject(projectToDelete._id));
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter(project => {
    // Filter by search term
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
                          (project.description && project.description.toLowerCase().includes(search.toLowerCase()));
    
    // Filter by tab
    const matchesTab = 
      (tabValue === 0) || // All projects
      (tabValue === 1 && project.user === user?._id) || // My projects
      (tabValue === 2 && project.collaborators && 
       project.collaborators.some(collab => collab.user === user?._id)) || // Shared with me
      (tabValue === 3 && project.isPublic); // Public
    
    return matchesSearch && matchesTab;
  });

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Events
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search events..."
              value={search}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleCreateProject}
            >
              Create New Event
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="All Events" />
              <Tab label="My Events" />
              <Tab label="Shared with Me" />
              <Tab label="Public" />
            </Tabs>
          </Grid>
          <Grid item>
            <Tooltip title={viewMode === 'grid' ? 'List View' : 'Grid View'}>
              <IconButton onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
                {viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress />
        </Box>
      ) : filteredProjects.length === 0 ? (
        <Box textAlign="center" my={8}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No events found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {search ? 'Try a different search term' : 'Create a new event to get started'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreateProject}
            sx={{ mt: 2 }}
          >
            Create New Event
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredProjects.map(project => (
            <Grid item xs={12} sm={viewMode === 'grid' ? 6 : 12} md={viewMode === 'grid' ? 4 : 12} key={project._id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: viewMode === 'grid' ? 'column' : 'row',
                  '&:hover': {
                    boxShadow: 6,
                  }
                }}
              >
                {project.thumbnail ? (
                  <CardMedia
                    component="img"
                    sx={{ 
                      height: viewMode === 'grid' ? 200 : 150,
                      width: viewMode === 'grid' ? '100%' : 200
                    }}
                    image={project.thumbnail}
                    alt={project.name}
                  />
                ) : (
                  <Box
                    sx={{
                      height: viewMode === 'grid' ? 200 : 150,
                      width: viewMode === 'grid' ? '100%' : 200,
                      bgcolor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      No Preview Available
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {project.name}
                    </Typography>
                    {project.description && (
                      <Typography color="textSecondary" paragraph>
                        {project.description.length > 100
                          ? `${project.description.substring(0, 100)}...`
                          : project.description}
                      </Typography>
                    )}
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {project.isPublic && (
                        <Chip size="small" label="Public" color="primary" variant="outlined" />
                      )}
                      {project.user === user?._id && (
                        <Chip size="small" label="Owner" color="secondary" variant="outlined" />
                      )}
                      {project.collaborators && project.collaborators.some(collab => collab.user === user?._id) && (
                        <Chip size="small" label="Collaborator" color="info" variant="outlined" />
                      )}
                      {project.tags && project.tags.map(tag => (
                        <Chip key={tag} size="small" label={tag} variant="outlined" />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleViewProject(project._id)}>
                      View
                    </Button>
                    <Button 
                      size="small" 
                      onClick={() => handleEditProject(project._id)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    {project.user === user?._id && (
                      <Button 
                        size="small" 
                        color="error" 
                        onClick={() => handleDeleteClick(project)}
                        startIcon={<DeleteIcon />}
                      >
                        Delete
                      </Button>
                    )}
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the event "{projectToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectsPage; 