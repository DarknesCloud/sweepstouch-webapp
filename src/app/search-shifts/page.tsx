'use client';
import { useState, useEffect } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import ProtectedRoute from '../../components/ProtectedRoute';

// Mock data que coincide exactamente con Figma
const shiftsData = [
  {
    id: 1,
    name: 'CTown Supermarket',
    address: 'CTown Supermarket 272 Maple St, Perth Amboy, NJ 08861, USA',
    distance: '4 km',
    date: 'Julio 18, 2025',
    time: '10:00 AM - 14:00 PM',
    status: 'requested'
  },
  {
    id: 2,
    name: 'CTown Supermarket',
    address: 'CTown Supermarket 272 Maple St, Perth Amboy, NJ 08861, USA',
    distance: '4 km',
    date: null,
    time: null,
    status: 'available'
  },
  {
    id: 3,
    name: 'CTown Supermarket',
    address: 'CTown Supermarket 272 Maple St, Perth Amboy, NJ 08861, USA',
    distance: '4 km',
    date: null,
    time: null,
    status: 'available'
  }
];

export default function SearchShiftsPage() {
  const [shifts, setShifts] = useState(shiftsData);
  const [selectedShift, setSelectedShift] = useState<any>(null);
  const [showDateDialog, setShowDateDialog] = useState(false);
  const [showTimeDialog, setShowTimeDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRequestShift = (shift: any) => {
    setSelectedShift(shift);
    setShowDateDialog(true);
  };

  const handleDateSelected = (date: Date) => {
    setShowDateDialog(false);
    setShowTimeDialog(true);
  };

  const handleTimeSelected = (timeSlot: string) => {
    setShowTimeDialog(false);
    setShowSuccess(true);
    
    // Actualizar el turno seleccionado
    setShifts(prev => prev.map(shift => 
      shift.id === selectedShift.id 
        ? { 
            ...shift, 
            status: 'requested',
            date: 'Julio 18, 2025',
            time: timeSlot 
          }
        : shift
    ));
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedShift(null);
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <AppLayout currentPage="search-shifts">
        <div className="mobile-container">
          <div className="search-shifts-container">
            {/* Header */}
            <div className="search-header">
              <h1 className="search-title">Buscar Turnos</h1>
            </div>

            <p className="search-subtitle">
              Encuentra turnos disponibles en supermercados cercanos.
            </p>

            {/* Map Section */}
            <h3 className="map-section-title">Ubicación de los Turnos</h3>
            <div className="map-container">
              <div style={{ 
                width: '100%', 
                height: '100%', 
                background: 'linear-gradient(45deg, #E8F5E8 25%, transparent 25%), linear-gradient(-45deg, #E8F5E8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #E8F5E8 75%), linear-gradient(-45deg, transparent 75%, #E8F5E8 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: '#4CAF50', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <button style={{
                  background: 'white',
                  border: '1px solid #ddd',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  View Larger Map
                </button>
              </div>
            </div>

            {/* Search Options */}
            <div className="search-options">
              <button className="search-option">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E91E63" className="search-option-icon">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <span className="search-option-text">Buscar por nombre o ubicación</span>
              </button>
              <button className="search-option">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E91E63" className="search-option-icon">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                <span className="search-option-text">Buscar por zip code</span>
              </button>
              <button className="search-option">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E91E63" className="search-option-icon">
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
            <div>
              {shifts.map((shift) => (
                <div key={shift.id} className="shift-card">
                  <div className="shift-header">
                    <h4 className="shift-name">{shift.name}</h4>
                    <span className="shift-distance">{shift.distance}</span>
                  </div>
                  
                  <div className="shift-address">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#E91E63" className="shift-address-icon">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span className="shift-address-text">{shift.address}</span>
                  </div>

                  {shift.status === 'requested' && (
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px', 
                      margin: '12px 0',
                      padding: '12px',
                      background: '#F8F9FA',
                      borderRadius: '8px'
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '14px',
                        color: '#E91E63',
                        fontWeight: '600'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#E91E63">
                          <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                        </svg>
                        {shift.date}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        fontSize: '14px',
                        color: '#E91E63',
                        fontWeight: '600'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#E91E63">
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                        </svg>
                        {shift.time}
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#4CAF50',
                        fontWeight: '600',
                        marginTop: '4px'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#4CAF50">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                        Solicitud Enviada
                      </div>
                    </div>
                  )}

                  <div className="shift-actions">
                    <div className="shift-time-icons">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#E91E63" className="shift-time-icon">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                      </svg>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#E91E63" className="shift-time-icon">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                      </svg>
                    </div>
                    {shift.status === 'available' ? (
                      <button 
                        className="shift-request-button"
                        onClick={() => handleRequestShift(shift)}
                      >
                        Enviar Solicitud
                      </button>
                    ) : (
                      <button 
                        className="shift-request-button"
                        style={{ background: '#4CAF50', cursor: 'default' }}
                        disabled
                      >
                        Solicitud Enviada
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Date Selection Dialog */}
            {showDateDialog && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                <div style={{
                  width: '100%',
                  background: 'white',
                  borderRadius: '20px 20px 0 0',
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    borderBottom: '1px solid #eee',
                    gap: '16px'
                  }}>
                    <button 
                      onClick={() => setShowDateDialog(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '16px',
                        color: '#E91E63',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      ← Atrás
                    </button>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#000', margin: 0 }}>
                      Selecciona un Día
                    </h2>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#000', margin: 0 }}>
                        Julio 2025
                      </h3>
                    </div>
                    
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(7, 1fr)',
                      gap: '8px'
                    }}>
                      {['DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'].map(day => (
                        <div key={day} style={{
                          textAlign: 'center',
                          fontSize: '12px',
                          color: '#666',
                          fontWeight: '600',
                          padding: '8px 0'
                        }}>
                          {day}
                        </div>
                      ))}
                      
                      {Array.from({ length: 31 }, (_, i) => (
                        <button
                          key={i + 1}
                          style={{
                            aspectRatio: '1',
                            border: 'none',
                            borderRadius: '8px',
                            background: i + 1 === 25 ? '#E91E63' : i + 1 < 25 ? '#f0f0f0' : '#f5f5f5',
                            color: i + 1 === 25 ? 'white' : i + 1 < 25 ? '#ccc' : '#333',
                            fontSize: '14px',
                            fontWeight: '500',
                            cursor: i + 1 < 25 ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onClick={() => i + 1 >= 25 && handleDateSelected(new Date(2025, 6, i + 1))}
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
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'flex-end'
              }}>
                <div style={{
                  width: '100%',
                  background: 'white',
                  borderRadius: '20px 20px 0 0',
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    borderBottom: '1px solid #eee',
                    gap: '16px'
                  }}>
                    <button 
                      onClick={() => setShowTimeDialog(false)}
                      style={{
                        background: 'none',
                        border: 'none',
                        fontSize: '16px',
                        color: '#E91E63',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      ← Atrás
                    </button>
                    <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#000', margin: 0 }}>
                      Selecciona un Horario
                    </h2>
                  </div>

                  <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#000', marginBottom: '12px' }}>
                        Horarios Disponibles
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {['08:00 AM - 12:00 PM', '09:00 AM - 13:00 PM', '10:00 AM - 14:00 PM', '11:00 AM - 15:00 PM'].map(time => (
                          <button
                            key={time}
                            style={{
                              padding: '16px',
                              background: '#f5f5f5',
                              border: 'none',
                              borderRadius: '12px',
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#333',
                              cursor: 'pointer',
                              textAlign: 'left'
                            }}
                            onClick={() => handleTimeSelected(time)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#E91E63';
                              e.currentTarget.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#f5f5f5';
                              e.currentTarget.style.color = '#333';
                            }}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Success Dialog */}
            {showSuccess && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <div style={{
                  width: '90%',
                  maxWidth: '400px',
                  background: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden'
                }}>
                  <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                    <div style={{ marginBottom: '20px' }}>
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="#4CAF50">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#000', marginBottom: '12px' }}>
                      ¡Solicitud Enviada!
                    </h2>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                      Tu solicitud ha sido enviada exitosamente.
                    </p>
                    <p style={{ fontSize: '14px', color: '#4CAF50', fontWeight: '600', marginBottom: '24px' }}>
                      Te notificaremos cuando sea confirmada.
                    </p>
                    <button 
                      onClick={handleCloseSuccess}
                      style={{
                        width: '100%',
                        padding: '16px',
                        background: '#E91E63',
                        color: 'white',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
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

