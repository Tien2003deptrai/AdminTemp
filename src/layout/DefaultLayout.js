import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { AuthUser } from 'src/services/AuthUser';
import Page404 from 'src/views/pages/page404/Page404';

const DefaultLayout = () => {

  const { token } = AuthUser();

  if (!token) return <Page404 />

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
