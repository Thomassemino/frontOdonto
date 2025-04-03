import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';
import ColorModeSwitcher from '../ColorModeSwitcher.astro';

const NavBar = () => {
  const { isAuthenticated, userRole, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/auth/login';
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed w-full z-20 top-0 left-0">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center justify-start">
          {isAuthenticated && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <span className="sr-only">Abrir menú lateral</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>
          )}
          
          <a href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              OdontoCare
            </span>
          </a>
        </div>
        
        <div className="flex items-center lg:order-2">
          <ColorModeSwitcher />
          
          {isAuthenticated ? (
            <div className="flex items-center ml-3">
              <div>
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="sr-only">Abrir menú de usuario</span>
                  <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                </button>
              </div>
              
              {isOpen && (
                <div
                  className="absolute top-10 right-0 z-50 mt-2 w-48 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm font-medium text-gray-900 dark:text-white">
                      {userRole === 'secretaria' ? 'Secretaria' : 'Odontólogo'}
                    </span>
                  </div>
                  <ul className="py-1" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="/mi-perfil"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Mi perfil
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <a
              href="/auth/login"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Iniciar sesión
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;