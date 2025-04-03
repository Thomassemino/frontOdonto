import React from 'react';

const DynamicFields = ({ 
  id, 
  fields, 
  hidden = false,
  values = {},
  onChange
}) => {
  return (
    <div 
      id={id} 
      className={`space-y-6 ${hidden ? 'hidden' : ''}`}
    >
      {fields.map((field, index) => (
        <div key={index}>
          <label 
            htmlFor={field.name} 
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={values[field.name] || ''}
            onChange={onChange}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicFields;