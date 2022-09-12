import { Brightness4, Brightness7 } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../src/presentation/app/hooks';
import {
  selectColorMode,
  toogleColorMode,
} from '../../src/presentation/stores/color-mode-slice';
import { ColorModes } from '../../src/utils/constants';
import AccountMenu from './menus/account-menu';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { colorMode } = useSelector(selectColorMode);

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: '0 2px 9px rgb(0 0 0 / 5%)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            color="primary"
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
            variant="h6"
            onClick={() => {
              router.push('/', undefined, { shallow: true });
            }}
          >
            LOGO
          </Typography>{' '}
          <Box component="div" sx={{ flexGrow: 1 }} />
          <IconButton
            color="primary"
            sx={{ ml: 1 }}
            onClick={() => dispatch(toogleColorMode(null))}
          >
            {colorMode === ColorModes.DARK ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          <AccountMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
