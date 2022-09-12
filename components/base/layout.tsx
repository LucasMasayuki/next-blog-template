import { Toolbar } from '@mui/material';
import Footer from './footer';
import Header from './header';

type Props = {
  children: React.ReactElement;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <Toolbar />
      <main>{children}</main>
      <Toolbar />
      <Footer />
    </div>
  );
};

export default Layout;
