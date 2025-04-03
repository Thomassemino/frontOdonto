export const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
  
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } transition-opacity duration-300`;
    notification.textContent = message;
  
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => notification.remove(), 3000);
    }, 3000);
  };