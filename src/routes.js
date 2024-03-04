import React from 'react'
// routes.js

import Dashboard from './views/dashboard/Dashboard';
import Members from './views/member/Members';
import Projects from './views/projects/Projects';
import IsRole from './views/role/IsRole';
import Jobs from './views/jobs/Jobs';

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard, allowedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_USER'] },
  { path: '/members', name: 'Members', element: Members, allowedRoles: ['ROLE_ADMIN'] },
  { path: '/projects', name: 'Projects', element: Projects, allowedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER'] },
  { path: '/roles', name: 'Roles', element: IsRole, allowedRoles: ['ROLE_ADMIN'] },
  { path: '/jobs', name: 'Jobs', element: Jobs, allowedRoles: ['ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_USER'] },
];

export default routes;

