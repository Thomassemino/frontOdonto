import React, { useState, useEffect } from 'react';
import { showNotification } from '../../utils/notifications.ts';
import EditPatientModal from './EditPatientModal.jsx';
import CreatePatientModal from './CreatePatientModal.jsx';
import SearchInput from '../common/SearchInput.jsx';
import TableDesktop from './TableDesktop.jsx';
import CardsMobile from './CardsMobile.jsx';

const PacientesTable = () => {
  const [pacientes, setPacientes] = useState([]);
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const BASE_URL = "http://179.43.118.101:3001/api";

  useEffect(() => {
    actualizarTabla();
  }, []);

  useEffect(() => {
    filtrarPacientes();
  }, [searchTerm, pacientes]);

  const actualizarTabla = async () => {
    try {
      const response = await fetch(`${BASE_URL}/paciente`);
      const data = await response.json();
      setPacientes(data.pacientes);
      setPacientesFiltrados(data.pacientes);
    } catch (error) {
      showNotification("No se pudieron cargar los pacientes", "error");
    }
  };

  const filtrarPacientes = () => {
    if (!searchTerm.trim()) {
      setPacientesFiltrados(pacientes);
      return;
    }

    const filtered = pacientes.filter(
      (paciente) =>
        (paciente.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (paciente.dni?.toString() || "").includes(searchTerm) ||
        (paciente.mail?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    setPacientesFiltrados(filtered);
  };

  const handleDelete = async (dni, nombre) => {
    if (!confirm(`¿Está seguro que desea eliminar al paciente${nombre ? " " + nombre : ""}?`)) {
      return;
    }

    try {
      const findResponse = await fetch(`${BASE_URL}/paciente/findByDni/${dni}`);
      const data = await findResponse.json();
      const pacienteId = data.paciente.id;

      const deleteResponse = await fetch(`${BASE_URL}/paciente/deleteById/${pacienteId}`, {
        method: 'DELETE'
      });

      if (!deleteResponse.ok) throw new Error('Error al eliminar el paciente');

      showNotification("Paciente eliminado correctamente");
      actualizarTabla();
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleEdit = async (patient) => {
    try {
      const findResponse = await fetch(`${BASE_URL}/paciente/findByDni/${selectedPatient.originalDni}`);
      const data = await findResponse.json();
      const id = data.paciente.id;

      const updateResponse = await fetch(`${BASE_URL}/paciente/updateById/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patient)
      });

      if (!updateResponse.ok) throw new Error('Error al actualizar el paciente');

      showNotification("Paciente actualizado correctamente");
      setIsEditModalOpen(false);
      actualizarTabla();
    } catch (error) {
      showNotification(error.message, "error");
    }
  };

  const handleEditClick = (patient) => {
    setSelectedPatient({
      ...patient,
      originalDni: patient.dni
    });
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 p-4 text-slate-800 dark:from-slate-900 dark:to-slate-800 dark:text-slate-100 lg:p-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <h1 className="text-2xl font-bold">Pacientes</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nuevo Paciente
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <SearchInput
            label="Buscar Paciente"
            placeholder="Buscar por nombre, DNI o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table/Cards */}
        <TableDesktop
          pacientes={pacientesFiltrados}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
        <CardsMobile
          pacientes={pacientesFiltrados}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />

        {/* Modals */}
        {isEditModalOpen && (
          <EditPatientModal
            patient={selectedPatient}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleEdit}
          />
        )}
        {isCreateModalOpen && (
          <CreatePatientModal
            onClose={() => setIsCreateModalOpen(false)}
            onSuccess={() => {
              actualizarTabla();
              setIsCreateModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PacientesTable;