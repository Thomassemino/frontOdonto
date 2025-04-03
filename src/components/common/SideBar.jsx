import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/AuthContext';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userRole } = useAuth();
  
  // Cierra el sidebar en dispositivos móviles cuando se cambia de página
  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Detecta clics fuera del sidebar para cerrarlo en dispositivos móviles
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const sidebar = document.getElementById('sidebar');
      if (isOpen && sidebar && !sidebar.contains(event.target) && window.innerWidth < 768) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Menú común para todos los roles
  const commonMenu = [
    {
      name: 'Inicio',
      href: '/',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      ),
    },
    {
      name: 'Pacientes',
      href: '/pacientes',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
        </svg>
      ),
    },
    {
      name: 'Consultas',
      href: '/consultas',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
        </svg>
      ),
    },
    {
      name: 'Métricas',
      href: '/metricas',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
          <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
        </svg>
      ),
    },
  ];

  // Menú para administradores
  const adminMenu = [
    {
      name: 'Usuarios',
      href: '/usuarios',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
        </svg>
      ),
    },
  ];

  // Filtrar el menú según el rol
  const menuItems = userRole === 'admin' 
    ? [...commonMenu, ...adminMenu] 
    : commonMenu;

  return (
    <>
      {/* Overlay para dispositivos móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 transform transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Botón toggle para dispositivos móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Abrir menú lateral</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`fixed top-0 left-0 z-30 w-64 h-screen pt-14 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;