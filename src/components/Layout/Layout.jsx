import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import {
  Build as BuildIcon,
  Visibility as PreviewIcon,
  Folder as FolderIcon,
} from '@mui/icons-material';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: 'Create Form', value: '/create', icon: <BuildIcon /> },
    { label: 'Preview', value: '/preview', icon: <PreviewIcon /> },
    { label: 'My Forms', value: '/myforms', icon: <FolderIcon /> },
  ];

  const handleTabChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 ,textAlign :'center'}}>
            Dynamic Form Builder
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
        <Paper elevation={0} sx={{ mb: 3 }}>
          <Tabs
            value={location.pathname}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              '& .MuiTab-root': {
                minHeight: 64,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
              },
            }}
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
                icon={tab.icon}
                iconPosition="start"
              />
            ))}
          </Tabs>
        </Paper>
        
        <Box sx={{ mt: 2 }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;