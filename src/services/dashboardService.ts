import { fetchData } from '../utils/api';

interface DashboardData {
  stats: {
    totalPatients: number;
    monthlyAppointments: number;
    activeTreatments: number;
    monthlyIncome: number;
  };
  appointments: {
    name: string;
    value: number;
  }[];
  patientDistribution: {
    name: string;
    value: number;
  }[];
  recentAppointments: {
    paciente: string;
    fecha: string;
    hora: string;
    medico: string;
    estado: string;
  }[];
}

export const getDashboardData = async (): Promise<void> => {
  try {
    // Fetch all required data in parallel
    const [stats, appointments, distribution, recent] = await Promise.all([
      fetchData('/dashboard/stats'),
      fetchData('/dashboard/appointments'),
      fetchData('/dashboard/patient-distribution'),
      fetchData('/dashboard/recent-appointments')
    ]);

    // Update stats cards
    updateStatsCard('totalPatientsCard', stats.totalPatients);
    updateStatsCard('monthlyAppointmentsCard', stats.monthlyAppointments);
    updateStatsCard('activeTreatmentsCard', stats.activeTreatments);
    updateStatsCard('monthlyIncomeCard', formatCurrency(stats.monthlyIncome));

    // Render charts
    (window as any).renderAppointmentsChart(appointments);
    (window as any).renderPatientDistribution(distribution);

    // Update recent appointments table
    renderRecentAppointments(recent);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

const updateStatsCard = (id: string, value: string | number) => {
  const card = document.getElementById(id);
  if (!card) return;

  // Remove loading state
  card.classList.remove('animate-pulse');

  // Update value
  const valueElement = card.querySelector('p:nth-child(2)');
  if (valueElement) {
    valueElement.textContent = value.toString();
  }
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(value);
};

const getStatusClass = (status: string): string => {
  const classes = {
    pendiente: 'bg-yellow-100 text-yellow-800',
    completada: 'bg-green-100 text-green-800',
    cancelada: 'bg-red-100 text-red-800'
  };
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800';
};

const renderRecentAppointments = (appointments: DashboardData['recentAppointments']) => {
  const tbody = document.getElementById('recentAppointmentsBody');
  if (!tbody) return;

  tbody.innerHTML = appointments.map(app => `
    <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td class="px-6 py-4 whitespace-nowrap">${app.paciente}</td>
      <td class="px-6 py-4 whitespace-nowrap">${app.fecha}</td>
      <td class="px-6 py-4 whitespace-nowrap">${app.hora}</td>
      <td class="px-6 py-4 whitespace-nowrap">${app.medico}</td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(app.estado)}">
          ${app.estado}
        </span>
      </td>
    </tr>
  `).join('');
};