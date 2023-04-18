import { FC, PropsWithChildren } from 'react';

import Container from './Container';
import Footer from './Footer';
import Topbar from './Topbar';

const DefaultLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Container>
      <Topbar />

      {children}

      <Footer />
    </Container>
  );
};

export default DefaultLayout;
