import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import ApartmentIcon from '@mui/icons-material/Apartment';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.grey[100],
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <ApartmentIcon sx={{ mr: 1 }} />
              <Typography variant="h6" color="text.primary">
                ARCHFIRM
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Creating innovative architectural designs with cutting-edge technology.
              Our mission is to transform your vision into reality through our
              advanced planning tools and expert consultation.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Services
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link component={RouterLink} to="/services/design" underline="hover" color="inherit">
                  Design
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/services/planning" underline="hover" color="inherit">
                  Planning
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/services/consultation" underline="hover" color="inherit">
                  Consultation
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/services/renovation" underline="hover" color="inherit">
                  Renovation
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link component={RouterLink} to="/about" underline="hover" color="inherit">
                  About Us
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/team" underline="hover" color="inherit">
                  Our Team
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/careers" underline="hover" color="inherit">
                  Careers
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/contact" underline="hover" color="inherit">
                  Contact
                </Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>
                <Link component={RouterLink} to="/privacy" underline="hover" color="inherit">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/terms" underline="hover" color="inherit">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </Grid>
        </Grid>
        <Box mt={5} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © {year} ARCHFIRM. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 