import { Menu } from '@mui/material';

type Props = {
  anchorEl: null | HTMLElement;
  onClose: () => void;
  children: React.ReactNode;
};

const AppMenu: React.FC<Props> = ({ anchorEl, onClose, children }) => {
  const open = Boolean(anchorEl);

  const handleClose = (): void => {
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          maxHeight: 48 * 4.5,
          overflowY: 'scroll',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {children}
    </Menu>
  );
};

export default AppMenu;
