// PrestacionesR.jsx
import React, { useState, useEffect } from 'react';
import { showNotification } from '../../../utils/notifications.ts';
import PrestacionModal from './PrestacionModal.jsx';
import EditarPrestacionModal from './EditarPrestacionModal.jsx';
import PagoModal from './PagoModal.jsx';
import HistorialModal from './HistorialModal.jsx';
import TablaPrestaciones from './TablaPrestaciones.jsx';
import TarjetasPrestaciones from './TarjetasPrestaciones.jsx';

const BASE_URL = "http://179.43.118.101:3001/api";

const PrestacionesR = ({ dni }) => {
    // Estados
    const [prestaciones, setPrestaciones] = useState([]);
    const [tratamientos, setTratamientos] = useState([]);
    const [showPrestacionModal, setShowPrestacionModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showPagoModal, setShowPagoModal] = useState(false);
    const [showHistorialModal, setShowHistorialModal] = useState(false);
    const [prestacionSeleccionada, setPrestacionSeleccionada] = useState(null);
    const [pagoSeleccionado, setPagoSeleccionado] = useState(null);
    const [historial, setHistorial] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pacienteId, setPacienteId] = useState('');

    useEffect(() => {
        cargarDatosIniciales();
        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, [dni]);

    const handleOffline = () => showNotification('Se perdió la conexión a internet', 'error');
    const handleOnline = () => {
        showNotification('Se restableció la conexión', 'success');
        cargarDatosIniciales();
    };

    const cargarDatosIniciales = async () => {
        try {
            setIsLoading(true);

            // Obtener paciente y su ID
            const paciente = await obtenerPacientePorDni();
            console.log('Paciente obtenido:', paciente);

            if (!paciente) {
                throw new Error('No se encontró el paciente');
            }

            const id = paciente._id || paciente.id;
            if (!id) {
                throw new Error('El paciente no tiene un ID válido');
            }

            console.log('ID del paciente para cargar datos:', id);
            setPacienteId(id);

            // Cargar datos con el ID confirmado
            await Promise.all([
                cargarTratamientos(),
                cargarPrestaciones(id)
            ]);
        } catch (error) {
            console.error('Error detallado:', error);
            showNotification(error.message || 'Error al cargar los datos', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const obtenerPacientePorDni = async () => {
        try {
            console.log('Buscando paciente con DNI:', dni);
            const response = await fetch(`${BASE_URL}/paciente/findByDni/${dni}`);
            if (!response.ok) throw new Error('Error al obtener datos del paciente');

            const data = await response.json();
            console.log('Datos del paciente recibidos:', data);

            if (!data || !data.paciente) {
                throw new Error('No se encontraron datos del paciente');
            }

            // Manejo más flexible del ID
            const paciente = data.paciente;
            const pacienteId = paciente._id || paciente.id;

            console.log('ID del paciente encontrado:', pacienteId);

            return {
                ...paciente,
                _id: pacienteId // Aseguramos que siempre usamos _id
            };
        } catch (error) {
            console.error('Error al obtener paciente:', error);
            throw new Error(`Error al obtener paciente: ${error.message}`);
        }
    };

    const cargarTratamientos = async () => {
        try {
            const response = await fetch(`${BASE_URL}/tratamientos`);
            if (!response.ok) throw new Error('Error al obtener tratamientos');
            const data = await response.json();
            setTratamientos(data);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const cargarPrestaciones = async (id) => {
        try {
            if (!id) {
                throw new Error('ID de paciente no proporcionado');
            }

            console.log('Intentando cargar prestaciones para paciente ID:', id);
            const response = await fetch(`${BASE_URL}/prestaciones/paciente/${id}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Error al obtener prestaciones');
            }

            const data = await response.json();
            console.log('Prestaciones cargadas:', data);

            // Asegurar que siempre trabajamos con un array
            const prestacionesArray = Array.isArray(data) ? data : [];
            setPrestaciones(prestacionesArray);

            return prestacionesArray;
        } catch (error) {
            console.error('Error en cargarPrestaciones:', error);
            throw error;
        }
    };

    const generarHistorial = (prestaciones) => {
        const historial = [];
        prestaciones.forEach(prestacion => {
            // Registro de creación
            historial.push({
                fecha: prestacion.createdAt,
                tipo: 'Creación',
                tratamiento: prestacion.tratamientoId?.nombre,
                monto: prestacion.precio,
                nombreUsuario: prestacion.nombreCreador || 'Sistema',
                detalles: `Creación de prestación: ${prestacion.tratamientoId?.nombre}`,
                prestacionId: prestacion._id
            });

            // Registros de pagos
            (prestacion.pagos || []).forEach(pago => {
                if (!pago.eliminado) {
                    historial.push({
                        fecha: pago.fecha,
                        tipo: 'Pago',
                        tratamiento: prestacion.tratamientoId?.nombre,
                        monto: pago.monto,
                        nombreUsuario: pago.nombreOdontologo || 'Sistema',
                        detalles: `Pago registrado: $${pago.monto}`,
                        prestacionId: prestacion._id,
                        pagoId: pago._id
                    });
                }

                if (pago.eliminado) {
                    historial.push({
                        fecha: pago.fechaEliminacion,
                        tipo: 'Eliminación de Pago',
                        tratamiento: prestacion.tratamientoId?.nombre,
                        monto: pago.monto,
                        nombreUsuario: pago.nombreEliminador || 'Sistema',
                        detalles: `Pago eliminado: $${pago.monto}`,
                        prestacionId: prestacion._id,
                        pagoId: pago._id
                    });
                }
            });

            // Modificaciones
            if (prestacion.modificadoPor) {
                historial.push({
                    fecha: prestacion.fechaModificacion,
                    tipo: 'Modificación',
                    tratamiento: prestacion.tratamientoId?.nombre,
                    monto: prestacion.precio,
                    nombreUsuario: prestacion.nombreModificador || 'Sistema',
                    detalles: `Prestación modificada`,
                    prestacionId: prestacion._id
                });
            }
        });

        return historial.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    };

    // Handlers
    const handleCrearPrestacion = async (formData) => {
        try {
            const userId = localStorage.getItem('userId') || 'Sistema';
            const prestacionData = {
                pacienteId,
                tratamientoId: formData.tratamiento,
                precio: parseFloat(formData.precio),
                creadoPor: userId
            };

            const response = await fetch(`${BASE_URL}/prestaciones`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prestacionData)
            });

            if (!response.ok) throw new Error('Error al crear la prestación');

            await cargarPrestaciones(pacienteId);
            showNotification('Prestación creada exitosamente');
            setShowPrestacionModal(false);
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error al crear la prestación', 'error');
            throw error;
        }
    };

    const handleEditarPrestacion = async (formData) => {
        try {
            const userId = localStorage.getItem('userId') || 'Sistema';
            const prestacionData = {
                tratamientoId: formData.tratamiento,
                precio: parseFloat(formData.precio),
                modificadoPor: userId
            };

            const response = await fetch(`${BASE_URL}/prestaciones/${prestacionSeleccionada._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prestacionData)
            });

            if (!response.ok) throw new Error('Error al actualizar la prestación');

            await cargarPrestaciones(pacienteId);
            showNotification('Prestación actualizada exitosamente');
            setShowEditModal(false);
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error al actualizar la prestación', 'error');
            throw error;
        }
    };

    const handleEliminarPrestacion = async (id) => {
        if (!confirm('¿Está seguro de eliminar esta prestación?')) return;

        try {
            const userId = localStorage.getItem('userId') || 'Sistema';
            const response = await fetch(`${BASE_URL}/prestaciones/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eliminadoPor: userId })
            });

            if (!response.ok) throw new Error('Error al eliminar la prestación');

            await cargarPrestaciones(pacienteId);
            showNotification('Prestación eliminada exitosamente');
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error al eliminar la prestación', 'error');
        }
    };


    const handleRegistrarPago = async (formData) => {
        try {
            const userId = localStorage.getItem('userId') || 'Sistema';
            const userRole = localStorage.getItem('userRole');

            console.log('Iniciando registro/actualización de pago:', {
                formData,
                userId,
                userRole,
                pagoSeleccionado: pagoSeleccionado?.id
            });

            // Obtener nombre del usuario
            let nombreUsuario;
            try {
                const url = userRole === 'odontologo'
                    ? `${BASE_URL}/medico/findById/${userId}`
                    : `${BASE_URL}/secretaria/buscarId/${userId}`;

                const userResponse = await fetch(url);
                const userData = await userResponse.json();
                nombreUsuario = userRole === 'odontologo'
                    ? userData.medico?.nombre
                    : userData.nombre;
            } catch (error) {
                console.error('Error al obtener nombre de usuario:', error);
                nombreUsuario = 'Sistema';
            }

            const pagoData = {
                monto: parseFloat(formData.montoPago),
                fecha: new Date(formData.fechaPago).toISOString(),
                odontologoId: userId,
                nombreOdontologo: nombreUsuario
            };

            const prestacionId = formData.prestacionSelect || formData.prestacionId;

            console.log('Datos del pago a enviar:', {
                pagoData,
                prestacionId,
                esEdicion: !!pagoSeleccionado
            });

            let response;
            if (pagoSeleccionado) {
                // Actualizar pago existente
                pagoData.editadoPor = userId;
                pagoData.nombreEditor = nombreUsuario;
                pagoData.fechaEdicion = new Date().toISOString();

                response = await fetch(
                    `${BASE_URL}/prestaciones/${prestacionId}/pagos/${pagoSeleccionado._id}`,
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pagoData)
                    }
                );
            } else {
                // Crear nuevo pago
                response = await fetch(
                    `${BASE_URL}/prestaciones/${prestacionId}/pagos`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pagoData)
                    }
                );
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Error en la respuesta del servidor:', errorData);
                throw new Error(errorData.error || 'Error al procesar el pago');
            }

            const responseData = await response.json();
            console.log('Respuesta exitosa:', responseData);

            // Recargar datos
            const prestacionesActualizadas = await cargarPrestaciones(pacienteId);
            if (showHistorialModal) {
                setHistorial(generarHistorial(prestacionesActualizadas));
            }

            showNotification(
                pagoSeleccionado ? 'Pago actualizado exitosamente' : 'Pago registrado exitosamente',
                'success'
            );

            setShowPagoModal(false);
            setPagoSeleccionado(null);
        } catch (error) {
            console.error('Error en handleRegistrarPago:', error);
            showNotification(error.message || 'Error al procesar el pago', 'error');
            throw error;
        }
    };

    const handleEliminarPago = async (prestacionId, pagoId) => {
        if (!confirm('¿Está seguro de eliminar este pago?')) return;

        try {
            const userId = localStorage.getItem('userId') || 'Sistema';
            const response = await fetch(
                `${BASE_URL}/prestaciones/${prestacionId}/pagos/${pagoId}`,
                {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ eliminadoPor: userId })
                }
            );

            if (!response.ok) throw new Error('Error al eliminar el pago');

            const prestacionesActualizadas = await cargarPrestaciones(pacienteId);
            if (showHistorialModal) {
                setHistorial(generarHistorial(prestacionesActualizadas));
            }

            showNotification('Pago eliminado exitosamente');
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error al eliminar el pago', 'error');
        }
    };

    const handleVerHistorial = async () => {
        try {
            const prestacionesActuales = await cargarPrestaciones(pacienteId);
            const historialGenerado = generarHistorial(prestacionesActuales);
            setHistorial(historialGenerado);
            setShowHistorialModal(true);
        } catch (error) {
            console.error('Error:', error);
            showNotification('Error al cargar el historial', 'error');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header con botones principales */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 sm:text-xl">
                    Prestaciones
                </h2>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    <button
                        onClick={handleVerHistorial}
                        className="flex-1 sm:flex-none rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                    >
                        Historial de Prestaciones
                    </button>
                    <button
                        onClick={() => {
                            setPagoSeleccionado(null);
                            setShowPagoModal(true);
                        }}
                        className="flex-1 sm:flex-none rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                    >
                        Agregar Pago
                    </button>
                    <button
                        onClick={() => setShowPrestacionModal(true)}
                        className="flex-1 sm:flex-none rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Nueva Prestación
                    </button>
                </div>
            </div>

            {/* Vista Desktop */}
            <TablaPrestaciones
                prestaciones={prestaciones}
                onEdit={(id) => {
                    const prestacion = prestaciones.find(p => p._id === id);
                    setPrestacionSeleccionada(prestacion);
                    setShowEditModal(true);
                }}
                onDelete={handleEliminarPrestacion}
                onEditPago={(prestacionId, pagoId) => {
                    const prestacion = prestaciones.find(p => p._id === prestacionId);
                    const pago = prestacion.pagos.find(p => p._id === pagoId);
                    setPrestacionSeleccionada(prestacion);
                    setPagoSeleccionado(pago);
                    setShowPagoModal(true);
                }}
                onDeletePago={handleEliminarPago}
            />

            {/* Vista Mobile */}
            <TarjetasPrestaciones
                prestaciones={prestaciones}
                onEdit={(id) => {
                    const prestacion = prestaciones.find(p => p._id === id);
                    setPrestacionSeleccionada(prestacion);
                    setShowEditModal(true);
                }}
                onDelete={handleEliminarPrestacion}
                onEditPago={(prestacionId, pagoId) => {
                    const prestacion = prestaciones.find(p => p._id === prestacionId);
                    const pago = prestacion.pagos.find(p => p._id === pagoId);
                    setPrestacionSeleccionada(prestacion);
                    setPagoSeleccionado(pago);
                    setShowPagoModal(true);
                }}
                onDeletePago={handleEliminarPago}
            />

            {/* Modales */}
            <PrestacionModal
                show={showPrestacionModal}
                onClose={() => setShowPrestacionModal(false)}
                onSubmit={handleCrearPrestacion}
                tratamientos={tratamientos}
            />

            <EditarPrestacionModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setPrestacionSeleccionada(null);
                }}
                onSubmit={handleEditarPrestacion}
                prestacion={prestacionSeleccionada}
                tratamientos={tratamientos}
            />

            <PagoModal
                show={showPagoModal}
                onClose={() => {
                    setShowPagoModal(false);
                    setPrestacionSeleccionada(null);
                    setPagoSeleccionado(null);
                }}
                onSubmit={handleRegistrarPago}
                prestaciones={prestaciones.filter(p => !p.eliminado)}
                pagoSeleccionado={pagoSeleccionado}
                prestacionId={prestacionSeleccionada?._id}
            />

            <HistorialModal
                show={showHistorialModal}
                onClose={() => setShowHistorialModal(false)}
                historial={historial}
                onEditPago={(prestacionId, pagoId) => {
                    const prestacion = prestaciones.find(p => p._id === prestacionId);
                    const pago = prestacion.pagos.find(p => p._id === pagoId);
                    setPrestacionSeleccionada(prestacion);
                    setPagoSeleccionado(pago);
                    setShowPagoModal(true);
                    setShowHistorialModal(false);
                }}
                onDeletePago={(prestacionId, pagoId) => {
                    handleEliminarPago(prestacionId, pagoId);
                }}
            />
        </div>
    );
};

export default PrestacionesR;