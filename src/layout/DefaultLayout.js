import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { AuthUser } from 'src/services/AuthUser';
import Login from 'src/views/pages/login/Login';

const DefaultLayout = () => {

  const { token } = AuthUser();

  if (!token) return <Login />

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
