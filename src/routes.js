import React from 'react'
// routes.js

import Dashboard from './views/dashboard/Dashboard';
import Members from './views/member/Members';
import Projects from './views/projects/Projects';
import IsRole from './views/role/IsRole';
import Jobs from './views/jobs/Jobs';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/members', name: 'Members', element: Members },
  { path: '/projects', name: 'Projects', element: Projects },
  { path: '/roles', name: 'Roles', element: IsRole },
  { path: '/jobs', name: 'Jobs', element: Jobs },
];

export default routes;

