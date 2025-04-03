// Este archivo es un punto de entrada para el módulo de autenticación
// Exporta todos los componentes y servicios relacionados con la autenticación

export { default as LoginForm } from '../../components/auth/LoginForm';
export { default as SignupForm } from '../../components/auth/SignupForm';
export { default as PasswordRecoveryForm } from '../../components/auth/PasswordRecoveryForm';
export { default as AuthCard } from '../../components/auth/AuthCard';
export { default as AuthLinks } from '../../components/auth/AuthLinks';
export { default as DynamicFields } from '../../components/auth/DynamicFields';

// Servicios
export * from '../../services/authService';