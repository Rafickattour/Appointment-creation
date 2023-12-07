import { Outlet } from 'react-router-dom';

import Layout from '../Layout/Layout';

export default function Root() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};