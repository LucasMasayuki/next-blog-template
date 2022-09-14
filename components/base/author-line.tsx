import { Box, Typography } from '@mui/material';
import React from 'react';
import PhotoAvatar from './photo-avatar';

type Props = {
  align?: string;
  name: string;
  picture?: string;
};

const AuthorLine: React.FC<Props> = ({ align, name, picture }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridGap: 4,
        gridTemplateColumns: 'auto auto',
        alignItems: 'center',
        justifyContent: align,
      }}
    >
      <PhotoAvatar name={name} picture={picture} />
      <Typography variant="body2" color="text.secondary">
        {name}
      </Typography>
    </Box>
  );
};

AuthorLine.defaultProps = {
  align: 'center',
};

export default AuthorLine;
