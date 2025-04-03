interface FormStateOptions {
    form: HTMLFormElement;
    button: HTMLButtonElement;
    spinner: HTMLElement;
    action: () => Promise<void>;
  }
  
  export const handleFormState = async ({ 
    form, 
    button, 
    spinner, 
    action 
  }: FormStateOptions) => {
    try {
      // Deshabilitar formulario y mostrar spinner
      button.disabled = true;
      spinner.classList.remove('hidden');
  
      await action();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      // Restaurar estado del formulario
      button.disabled = false;
      spinner.classList.add('hidden');
    }
  };