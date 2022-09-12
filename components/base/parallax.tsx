import { Box } from '@mui/material';

type Props = {
  children: React.ReactElement;
  backgroundImage?: string;
  backgroundColor?: string;
};

const Parallax: React.FC<Props> = ({
  children,
  backgroundImage,
  backgroundColor,
}) => {
  return (
    <div>
      <Box
        sx={{
          backgroundColor: backgroundColor,
          backgroundImage: backgroundImage,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          zIndex: 0,
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default Parallax;
