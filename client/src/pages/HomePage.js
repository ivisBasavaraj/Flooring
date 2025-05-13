import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GroupsIcon from '@mui/icons-material/Groups';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const features = [
  {
    title: 'Event Planning',
    description: 'Create and customize your dream events with our comprehensive planning tools and experienced coordinators.',
    icon: <CelebrationIcon fontSize="large" color="primary" />
  },
  {
    title: 'Catering Services',
    description: 'Delight your guests with exquisite cuisine tailored to your preferences, dietary needs, and event theme.',
    icon: <RestaurantIcon fontSize="large" color="primary" />
  },
  {
    title: 'Guest Management',
    description: 'Easily manage invitations, RSVPs, and seating arrangements with our intuitive guest management system.',
    icon: <GroupsIcon fontSize="large" color="primary" />
  },
  {
    title: 'Entertainment Solutions',
    description: 'From DJs to live bands, performers to activities, we provide complete entertainment packages for your event.',
    icon: <EmojiPeopleIcon fontSize="large" color="primary" />
  }
];

const projects = [
  {
    title: 'Corporate Annual Gala',
    description: 'An elegant evening celebration for 500+ employees with custom staging and gourmet dining.',
    image: 'https://source.unsplash.com/random/400x300?event,gala'
  },
  {
    title: 'Luxury Wedding',
    description: 'A stunning beachfront wedding with personalized decor, live music, and a five-course meal.',
    image: 'https://source.unsplash.com/random/400x300?wedding,celebration'
  },
  {
    title: 'Product Launch Party',
    description: 'Interactive tech product unveiling with custom lighting, branded experiences, and influencer guests.',
    image: 'https://source.unsplash.com/random/400x300?event,launch'
  }
];

const testimonials = [
  {
    quote: "EventElite transformed our vision into reality! Their planning tools made it easy to visualize our wedding day, and their team executed it flawlessly.",
    author: "Sarah Johnson",
    title: "Bride"
  },
  {
    quote: "The collaborative features allowed our corporate team to work efficiently with the event planners. This platform has revolutionized our annual conferences.",
    author: "Michael Chen",
    title: "Marketing Director"
  },
  {
    quote: "As a regular event host, I appreciate the detailed planning capabilities and how seamlessly I can communicate my ideas. Highly recommended!",
    author: "Emma Rodriguez",
    title: "Charity Fundraiser Organizer"
  }
];

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/projects');
    } else {
      navigate('/register');
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          pt: { xs: 8, md: 12 },
          pb: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.2,
            backgroundImage: 'url(https://source.unsplash.com/random?event,celebration)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        />
        <Container sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                fontWeight="bold"
                gutterBottom
              >
                Creating Memorable Events That Last a Lifetime
              </Typography>
              <Typography variant="h5" paragraph>
                Professional event planning and management solutions for your dream celebrations.
              </Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={handleGetStarted}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="/preview.png"
                alt="Event Planning Preview"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 10
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h2" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Bringing together creative design, flawless execution, and personalized service to create extraordinary events.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', textAlign: 'center', p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {feature.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container>
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              How It Works
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              Our streamlined process makes event planning efficient and stress-free.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    1
                  </Box>
                  Plan Your Event
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Use our intuitive planning tools to create detailed event layouts, guest lists, and timelines. Customize themes, seating arrangements, and visualize your perfect event.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    2
                  </Box>
                  Collaborate & Refine
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Share your event plans with family, friends, or our event coordinators. Receive feedback and make refinements in real-time with collaborative tools.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                      fontWeight: 'bold'
                    }}
                  >
                    3
                  </Box>
                  Enjoy Your Celebration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  When your event plan is finalized, our expert team will handle every detail from setup to teardown, allowing you to relax and enjoy your special occasion.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              onClick={handleGetStarted}
            >
              Start Planning Now
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Featured Projects */}
      <Container sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h2" gutterBottom>
            Featured Events
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            Explore some of our exceptional event designs and successful celebrations.
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {projects.map((project, index) => (
            <Grid item key={index} xs={12} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="225"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {project.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button size="small" endIcon={<ArrowForwardIcon />}>
                    View Event
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/projects')}
          >
            View All Events
          </Button>
        </Box>
      </Container>

      {/* Testimonials */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container>
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" component="h2" gutterBottom>
              What Our Clients Say
            </Typography>
            <Divider sx={{ width: 100, mx: 'auto', borderColor: 'white', opacity: 0.5, my: 2 }} />
          </Box>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item key={index} xs={12} md={4}>
                <Paper sx={{ p: 4, height: '100%', bgcolor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(5px)' }}>
                  <Typography variant="body1" paragraph sx={{ fontStyle: 'italic', mb: 3 }}>
                    "{testimonial.quote}"
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{ bgcolor: 'secondary.main', width: 40, height: 40 }}
                    >
                      {testimonial.author[0]}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {testimonial.author}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {testimonial.title}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container sx={{ py: 8 }}>
        <Paper sx={{ p: { xs: 4, md: 6 }, textAlign: 'center', bgcolor: 'secondary.light', color: 'secondary.contrastText' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Plan Your Next Event?
          </Typography>
          <Typography variant="subtitle1" paragraph sx={{ maxWidth: 600, mx: 'auto' }}>
            Begin your event planning journey today with our innovative tools and expert guidance.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleGetStarted}
            >
              Get Started for Free
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage; 