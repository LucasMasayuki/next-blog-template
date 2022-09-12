import { Grid, Typography } from '@mui/material';
import React from 'react';

const Banner: React.FC = () => {
  return (
    <Grid
      container
      alignItems="center"
      textAlign="center"
      sx={{ p: 8, height: 'inherit' }}
    >
      <Grid item xs={12}>
        <Typography variant="h2" fontWeight="bold">
          Blog
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          Description
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Banner;
