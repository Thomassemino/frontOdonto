import React from 'react';
import NavBar from '../common/NavBar';
import SideBar from '../common/SideBar';
import { useAuth } from '../../auth/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const SidebarLayout = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner visible={true} size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <div className="flex flex-1 pt-16">
        <SideBar />
        <div className="md:ml-64 flex-1 p-4">
          <main className="max-w-screen-xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;