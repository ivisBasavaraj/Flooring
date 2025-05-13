import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const NotFoundPage = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 8, mb: 8 }}>
      <Paper elevation={3} sx={{ p: 5, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 700, color: 'primary.main' }}>
          404
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph sx={{ maxWidth: 500, mx: 'auto', mb: 4 }}>
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mx: 1 }}
          >
            Go to Homepage
          </Button>
          <Button
            component={RouterLink}
            to="/projects"
            variant="outlined"
            color="primary"
            size="large"
            sx={{ mx: 1, mt: { xs: 2, sm: 0 } }}
          >
            Browse Projects
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default NotFoundPage; 