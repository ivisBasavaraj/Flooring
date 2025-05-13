import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../features/projects/projectSlice';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FolderIcon from '@mui/icons-material/Folder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const DashboardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { projects, loading } = useSelector(state => state.project);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const recentProjects = projects.slice(0, 3);

  // Handle create new event click - direct to planner demo if user is admin or planner
  const handleCreateNewEvent = () => {
    if (user && (user.role === 'admin' || user.role === 'planner')) {
      navigate('/planner-demo');
    } else {
      navigate('/planner/new');
    }
  };

  if (loading && projects.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.name || 'User'}!
        </Typography>
        <Typography variant="body1">
          Manage your events and create amazing celebrations with our interactive event planner.
        </Typography>
      </Paper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" component="h2">
                Recent Events
              </Typography>
              <Button 
                variant="outlined" 
                onClick={() => navigate('/projects')}
                endIcon={<FolderIcon />}
              >
                All Events
              </Button>
            </Box>
            
            {recentProjects.length === 0 ? (
              <Box textAlign="center" py={4}>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  You don't have any events yet.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  startIcon={<AddIcon />}
                  onClick={handleCreateNewEvent}
                  sx={{ mt: 2 }}
                >
                  Create Your First Event
                </Button>
              </Box>
            ) : (
              <Grid container spacing={3}>
                {recentProjects.map(project => (
                  <Grid item xs={12} sm={6} md={4} key={project._id}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        cursor: 'pointer',
                        '&:hover': { boxShadow: 6 }
                      }}
                      onClick={() => navigate(`/projects/${project._id}`)}
                    >
                      {project.thumbnail ? (
                        <Box
                          component="img"
                          sx={{ height: 140, objectFit: 'cover' }}
                          src={project.thumbnail}
                          alt={project.name}
                        />
                      ) : (
                        <Box sx={{ height: 140, bgcolor: 'grey.200', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <CalendarTodayIcon color="disabled" sx={{ fontSize: 40 }} />
                        </Box>
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="h3">
                          {project.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          Last updated: {new Date(project.updatedAt).toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
                <Grid item xs={12} sm={6} md={4}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      p: 3,
                      cursor: 'pointer',
                      border: '2px dashed',
                      borderColor: 'primary.light',
                      bgcolor: 'background.paper',
                      '&:hover': { borderColor: 'primary.main' }
                    }}
                    onClick={handleCreateNewEvent}
                  >
                    <AddIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
                    <Typography variant="h6" component="h3" color="primary" align="center">
                      Create New Event
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              <AccountCircleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Profile
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {user?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Role:</strong> {user?.role === 'admin' ? 'Administrator' : 
                                       user?.role === 'planner' ? 'Event Planner' : 
                                       user?.role === 'vendor' ? 'Event Vendor' : 
                                       user?.role === 'coordinator' ? 'Event Coordinator' : 'Client'}
              </Typography>
              {user?.company && (
                <Typography variant="body1" gutterBottom>
                  <strong>Company:</strong> {user.company}
                </Typography>
              )}
            </Box>
            <Button 
              variant="outlined" 
              color="primary" 
              fullWidth 
              sx={{ mt: 2 }}
              onClick={() => navigate('/profile')}
            >
              Edit Profile
            </Button>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  startIcon={<EventIcon />}
                  onClick={handleCreateNewEvent}
                >
                  New Event
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  fullWidth
                  onClick={() => navigate('/projects')}
                  startIcon={<CelebrationIcon />}
                >
                  Browse Events
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage; 