import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import AddMember from 'src/views/member/addMember/AddMember'
import AddJobs from 'src/views/jobs/addJobs/AddJobs'
import Profile from 'src/views/profile/Profile'
import AddRole from 'src/views/role/addRole/AddRole'
import UpdateRole from 'src/views/role/updateRole/UpdateRole'
import AddProject from 'src/views/projects/addProject/AddProject'
import UpdateProject from 'src/views/projects/updateProject/UpdateProject'
import UpdateJobs from 'src/views/jobs/updateJobs/UpdateJobs'
import UpdateMember from 'src/views/member/updateMember/UpdateMember'
import { AuthUser } from 'src/services/AuthUser'

const checkRole = (allowedRoles, userRole) => {
  return allowedRoles.includes(userRole);
};

const AppContent = () => {

  const { role } = AuthUser();

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            if (!route.allowedRoles || checkRole(route.allowedRoles, role)) {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            }
            return null;
          })}
          {/* <Route path="/" element={<Navigate to="dashboard" replace />} /> */}
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/members/update/:id" element={<UpdateMember />} />
          <Route path="/jobs/add" element={<AddJobs />} />
          <Route path="/jobs/update/:id" element={<UpdateJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/roles/add" element={<AddRole />} />
          <Route path="/roles/update/:id" element={<UpdateRole />} />
          <Route path="/projects/add" element={<AddProject />} />
          <Route path="/projects/update/:id" element={<UpdateProject />} />

        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
