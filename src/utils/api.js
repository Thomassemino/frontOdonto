const BASE_URL = "http://179.43.118.101:3001/api";

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `Error del servidor: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error en fetchData: ${error.message}`);
    throw error;
  }
};