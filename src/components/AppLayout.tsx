import { Outlet } from 'react-router';
import styled from 'styled-components';

import Header from './Header';
import Sidebar from './Sidebar';

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <StyledMain>
        <Outlet />
      </StyledMain>
    </StyledAppLayout>
  );
}
export default AppLayout;
