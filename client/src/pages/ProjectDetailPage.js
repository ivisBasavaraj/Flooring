import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectById, deleteProject, addCollaborator, removeCollaborator } from '../features/projects/projectSlice';
import { setAlert } from '../features/alert/alertSlice';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';
import EventIcon from '@mui/icons-material/Event';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { project, loading } = useSelector(state => state.project);
  const { user } = useSelector(state => state.auth);
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [collaboratorEmail, setCollaboratorEmail] = useState('');
  const [collaboratorRole, setCollaboratorRole] = useState('viewer');
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [selectedCollaborator, setSelectedCollaborator] = useState(null);

  useEffect(() => {
    dispatch(getProjectById(id));
  }, [dispatch, id]);

  const isOwner = project && user && project.user === user._id;
  const canEdit = isOwner || (project?.collaborators && project.collaborators.some(
    collab => collab.user === user?._id && collab.role === 'editor'
  ));

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteProject(id)).unwrap();
      navigate('/projects');
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
    setDeleteDialogOpen(false);
  };

  const handleShareClick = () => {
    setShareDialogOpen(true);
  };

  const handleAddCollaborator = async () => {
    if (!collaboratorEmail.trim()) {
      dispatch(setAlert({ message: 'Please enter an email address', type: 'error' }));
      return;
    }

    try {
      await dispatch(addCollaborator({
        id,
        email: collaboratorEmail,
        role: collaboratorRole
      })).unwrap();
      
      setCollaboratorEmail('');
      setCollaboratorRole('viewer');
      setShareDialogOpen(false);
    } catch (error) {
      console.error('Failed to add collaborator:', error);
    }
  };

  const handleRemoveCollaboratorClick = (collaborator) => {
    setSelectedCollaborator(collaborator);
    setRemoveDialogOpen(true);
  };

  const handleConfirmRemoveCollaborator = async () => {
    if (!selectedCollaborator) return;

    try {
      await dispatch(removeCollaborator({
        projectId: id,
        userId: selectedCollaborator.user
      })).unwrap();
      
      setRemoveDialogOpen(false);
      setSelectedCollaborator(null);
    } catch (error) {
      console.error('Failed to remove collaborator:', error);
    }
  };

  if (loading || !project) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
          sx={{ mb: 2 }}
        >
          Back to Events
        </Button>
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {project.name}
            </Typography>
            {project.description && (
              <Typography variant="body1" color="textSecondary" paragraph>
                {project.description}
              </Typography>
            )}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {project.isPublic && (
                <Chip size="small" label="Public" color="primary" variant="outlined" />
              )}
              {isOwner && (
                <Chip size="small" label="Owner" color="secondary" variant="outlined" />
              )}
              {project.collaborators && project.collaborators.some(collab => collab.user === user?._id) && (
                <Chip size="small" label="Collaborator" color="info" variant="outlined" />
              )}
              {project.tags && project.tags.map(tag => (
                <Chip key={tag} size="small" label={tag} variant="outlined" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EventIcon />}
              onClick={() => navigate(`/planner/${id}`)}
            >
              {canEdit ? 'Edit Event Plan' : 'View Event Plan'}
            </Button>
            
            {isOwner && (
              <>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={handleShareClick}
                >
                  Share
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={handleDeleteClick}
                >
                  Delete
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Event Layout Preview
            </Typography>
            <Box sx={{ mt: 2, position: 'relative' }}>
              {project.thumbnail ? (
                <img 
                  src={project.thumbnail} 
                  alt="Event Layout" 
                  style={{ width: '100%', borderRadius: 8 }}
                />
              ) : (
                <Box 
                  sx={{ 
                    bgcolor: 'grey.200', 
                    borderRadius: 2, 
                    p: 8, 
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CalendarTodayIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                  <Typography variant="body2" color="textSecondary">
                    No event layout preview available
                  </Typography>
                  {canEdit && (
                    <Button 
                      variant="outlined" 
                      size="small"
                      onClick={() => navigate(`/planner/${id}`)}
                      sx={{ mt: 2 }}
                    >
                      Create Layout
                    </Button>
                  )}
                </Box>
              )}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate(`/planner/${id}`)}
              >
                {canEdit ? 'Edit Event Layout' : 'View Event Layout'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Project Details
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Created
                </Typography>
                <Typography variant="body1">
                  {new Date(project.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Last Modified
                </Typography>
                <Typography variant="body1">
                  {new Date(project.updatedAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Visibility
                </Typography>
                <Typography variant="body1">
                  {project.isPublic ? 'Public' : 'Private'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" color="textSecondary">
                  Tags
                </Typography>
                <Typography variant="body1">
                  {project.tags && project.tags.length > 0 
                    ? project.tags.join(', ') 
                    : 'No tags'}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Owner
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 2 }}>
                {user?.name && user.name[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="subtitle1">
                  {user?.name || 'User'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {isOwner ? 'You' : 'Project Owner'}
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" gutterBottom>
                Collaborators
              </Typography>
              {isOwner && (
                <Button
                  size="small"
                  startIcon={<PersonAddIcon />}
                  onClick={handleShareClick}
                >
                  Add
                </Button>
              )}
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {(!project.collaborators || project.collaborators.length === 0) ? (
              <Typography variant="body2" color="textSecondary" sx={{ py: 2, textAlign: 'center' }}>
                No collaborators yet
                {isOwner && (
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<ShareIcon />} 
                    sx={{ mt: 2 }}
                    onClick={handleShareClick}
                  >
                    Share Project
                  </Button>
                )}
              </Typography>
            ) : (
              <List>
                {project.collaborators.map((collaborator, index) => (
                  <ListItem key={index} disablePadding sx={{ py: 1 }}>
                    <ListItemAvatar>
                      <Avatar>
                        {collaborator.user.toString()[0].toUpperCase()}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={collaborator.user.toString().substring(0, 8) + '...'}
                      secondary={
                        <Chip 
                          size="small" 
                          label={collaborator.role === 'editor' ? 'Can Edit' : 'Can View'} 
                          color={collaborator.role === 'editor' ? 'primary' : 'default'}
                          variant="outlined"
                        />
                      }
                    />
                    {isOwner && (
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="remove"
                          onClick={() => handleRemoveCollaboratorClick(collaborator)}
                        >
                          <PersonRemoveIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the event "{project.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      
      {/* Share Project Dialog */}
      <Dialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
      >
        <DialogTitle>Share Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add team members, vendors, or clients to collaborate on this event.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={collaboratorEmail}
            onChange={(e) => setCollaboratorEmail(e.target.value)}
            sx={{ mb: 2, mt: 1 }}
          />
          <FormControl fullWidth>
            <InputLabel id="role-label">Permission</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              value={collaboratorRole}
              label="Permission"
              onChange={(e) => setCollaboratorRole(e.target.value)}
            >
              <MenuItem value="viewer">Can View</MenuItem>
              <MenuItem value="editor">Can Edit</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddCollaborator} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Remove Collaborator Dialog */}
      <Dialog
        open={removeDialogOpen}
        onClose={() => setRemoveDialogOpen(false)}
      >
        <DialogTitle>Remove Collaborator</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this collaborator from the project?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmRemoveCollaborator} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectDetailPage; 