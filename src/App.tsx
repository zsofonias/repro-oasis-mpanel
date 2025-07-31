import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import {
  accountPath,
  cabinsPath,
  dashboardPath,
  settingsPath,
  loginPath,
  usersPath,
  bookingsPath,
} from './route-paths';

import ReactQueryProvider from './query/ReactQuery';

import AppLayout from './components/AppLayout';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Cabins from './pages/Cabins';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Account from './pages/Account';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Toaster from './components/ui/Toaster';

function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            {/* <Route index element={<Dashboard />} /> */}
            <Route index element={<Navigate to={dashboardPath()} replace />} />
            <Route path={dashboardPath()} element={<Dashboard />} />
            <Route path={bookingsPath()} element={<Bookings />} />
            <Route path={cabinsPath()} element={<Cabins />} />
            <Route path={usersPath()} element={<Users />} />
            <Route path={settingsPath()} element={<Settings />} />
            <Route path={accountPath()} element={<Account />} />
          </Route>
          <Route path={loginPath()} element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ReactQueryProvider>
  );
}
export default App;
