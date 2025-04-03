import React from 'react';

const AuthLinks = ({ links }) => {
  return (
    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
      {links.map((link, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-2">|</span>}
          {link.text}{' '}
          <a 
            href={link.href} 
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            {link.linkText}
          </a>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AuthLinks;