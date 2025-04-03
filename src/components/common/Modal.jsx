import React from 'react';

const Modal = ({ id, title, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div id={id} className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-2xl mx-auto mt-20">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button 
            type="button" 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;