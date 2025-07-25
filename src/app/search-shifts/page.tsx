'use client';
import { useState, useEffect } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { shiftAPI } from '../../services/api';
import { Shift } from '../../types';

export default function SearchShiftsPage() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [showTimeDialog, setShowTimeDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const availableShifts = await shiftAPI.getAvailableShifts();
        setShifts(availableShifts);
      } catch (error) {
        console.error('Error fetching shifts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  const handleRequestShift = (shift: Shift) => {
    setSelectedShift(shift);
    setShowDateDialog(true);
  };

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setShowDateDialog(false);
    setShowTimeDialog(true);
  };

  const handleTimeSelected = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    setShowTimeDialog(false);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedShift(null);
    setSelectedTimeSlot('');
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <AppLayout currentPage="search-shifts">
        <div className="mobile-container">
          <div className="search-shifts-container">
            {/* Header con hamburger menu */}
            <div className="search-header">
              
              <h1 className="search-title">Buscar Turnos</h1>
            </div>

            <p className="search-subtitle">
              Encuentra turnos disponibles en supermercados cercanos.
            </p>

            {/* Map Section */}
            <h3 className="map-section-title">Ubicación de los Turnos</h3>
            <div className="map-container">
              <div className="map-placeholder">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#4caf50">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <p>Mapa de ubicaciones</p>
              </div>
            </div>

            {/* Search Options */}
            <div className="search-options">
              <button className="search-option">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#e91e63" className="search-option-icon">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <span className="search-option-text">Buscar por nombre o ubicación</span>
              </button>
              <button className="search-option">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#e91e63" className="search-option-icon">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <span className="search-option-text">Buscar por zip code</span>
              </button>
              <button className="search-option">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#e91e63" className="search-option-icon">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <span className="search-option-text">Buscar por turno disponible</span>
              </button>
            </div>

            {/* Shifts Header */}
            <div className="shifts-header">
              <h3 className="shifts-title">Turnos</h3>
              <div className="shifts-filter">
                <span>Disponibles (3)</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 10l5 5 5-5z"/>
                </svg>
              </div>
            </div>

            {/* Shifts List */}
            {loading ? (
              <p>Cargando turnos...</p>
            ) : (
              <div>
                {shifts.map((shift) => (
                  <div key={shift.id} className="shift-card">
                    <div className="shift-header">
                      <h4 className="shift-name">{shift.supermarketName}</h4>
                      <span className="shift-distance">{shift.distance} km</span>
                    </div>
                    
                    <div className="shift-address">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#e91e63" className="shift-address-icon">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span className="shift-address-text">{shift.address}</span>
                    </div>

                    <div className="shift-actions">
                      <div className="shift-time-icons">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#e91e63" className="shift-time-icon">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#e91e63" className="shift-time-icon">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                      </div>
                      <button 
                        className="shift-request-button"
                        onClick={() => handleRequestShift(shift)}
                      >
                        Enviar Solicitud
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Date Selection Dialog */}
            {showDateDialog && (
              <div className="date-selector-overlay">
                <div className="date-selector-container">
                  <div className="date-selector-header">
                    <button 
                      onClick={() => setShowDateDialog(false)} 
                      className="date-selector-back"
                    >
                      ← Atrás
                    </button>
                    <h2 className="date-selector-title">Seleccionar Día</h2>
                  </div>

                  <div className="calendar-container">
                    <div className="calendar-header">
                      <h3>Julio 2025</h3>
                    </div>
                    <div className="calendar-grid">
                      <div className="calendar-day-header">Dom</div>
                      <div className="calendar-day-header">Lun</div>
                      <div className="calendar-day-header">Mar</div>
                      <div className="calendar-day-header">Mié</div>
                      <div className="calendar-day-header">Jue</div>
                      <div className="calendar-day-header">Vie</div>
                      <div className="calendar-day-header">Sáb</div>
                      
                      {/* Días del calendario */}
                      {Array.from({ length: 31 }, (_, i) => (
                        <button
                          key={i + 1}
                          className={`calendar-day ${i + 1 === 25 ? 'selected' : ''} ${i + 1 < 25 ? 'disabled' : ''}`}
                          onClick={() => handleDateSelected(new Date(2025, 6, i + 1))}
                          disabled={i + 1 < 25}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Time Selection Dialog */}
            {showTimeDialog && (
              <div className="time-selector-overlay">
                <div className="time-selector-container">
                  <div className="time-selector-header">
                    <button 
                      onClick={() => setShowTimeDialog(false)} 
                      className="time-selector-back"
                    >
                      ← Atrás
                    </button>
                    <h2 className="time-selector-title">Seleccionar Hora</h2>
                  </div>

                  <div className="time-slots-container">
                    <div className="time-slot-section">
                      <h3 className="time-slot-section-title">Mañana</h3>
                      <div className="time-slots">
                        <button className="time-slot" onClick={() => handleTimeSelected('08:00-12:00')}>
                          08:00 - 12:00
                        </button>
                        <button className="time-slot" onClick={() => handleTimeSelected('09:00-13:00')}>
                          09:00 - 13:00
                        </button>
                      </div>
                    </div>

                    <div className="time-slot-section">
                      <h3 className="time-slot-section-title">Tarde</h3>
                      <div className="time-slots">
                        <button className="time-slot" onClick={() => handleTimeSelected('14:00-18:00')}>
                          14:00 - 18:00
                        </button>
                        <button className="time-slot" onClick={() => handleTimeSelected('15:00-19:00')}>
                          15:00 - 19:00
                        </button>
                      </div>
                    </div>

                    <div className="time-slot-section">
                      <h3 className="time-slot-section-title">Noche</h3>
                      <div className="time-slots">
                        <button className="time-slot" onClick={() => handleTimeSelected('18:00-22:00')}>
                          18:00 - 22:00
                        </button>
                        <button className="time-slot" onClick={() => handleTimeSelected('19:00-23:00')}>
                          19:00 - 23:00
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Dialog */}
            {showSuccess && (
              <div className="success-overlay">
                <div className="success-container">
                  <div className="success-content">
                    <div className="success-icon">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="#4caf50">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h2 className="success-title">¡Solicitud Enviada!</h2>
                    <p className="success-message">
                      Tu solicitud ha sido enviada exitosamente.
                    </p>
                    <p className="success-submessage">
                      Te notificaremos cuando sea confirmada.
                    </p>
                    <button 
                      onClick={handleCloseSuccess} 
                      className="success-button"
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

