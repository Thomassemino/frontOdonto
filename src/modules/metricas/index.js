// Este archivo es un punto de entrada para el módulo de métricas
// Exporta todos los componentes y servicios relacionados con las métricas

export { default as AppointmentsChart } from '../../components/metricas/AppointmentsChart.astro';
export { default as AppointmentsChartReact } from '../../components/metricas/AppointmentsChartReact';
export { default as PatientDistribution } from '../../components/metricas/PatientDistribution.astro';
export { default as PatientDistributionReact } from '../../components/metricas/PatientDistributionReact';
export { default as RecentAppointments } from '../../components/metricas/RecentAppointments.astro';
export { default as StatCard } from '../../components/metricas/StatCard.astro';
export { default as StatsOverview } from '../../components/metricas/StatsOverview.astro';

// Servicios
export * from '../../services/dashboardService';