'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import AppLayout from '../../components/Layout/AppLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import ProfileSelector from '../../components/ProfileSelector';
import { shiftAPI } from '../../services/api';
import { Shift } from '../../types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [recentShifts, setRecentShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  useEffect(() => {
    // Check if this is the user's first login
    if (user && user.isFirstLogin) {
      setShowProfileSelector(true);
    }
  }, [user]);

  useEffect(() => {
    const fetchRecentShifts = async () => {
      if (user?.id) {
        try {
          const shifts = await shiftAPI.getUserShifts(user.id);
          setRecentShifts(shifts.slice(0, 3));
        } catch (error) {
          console.error('Error fetching shifts:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecentShifts();
  }, [user]);

  const handleProfileSelected = (profileImage: string) => {
    setShowProfileSelector(false);
  };

  const handleCloseProfileSelector = () => {
    setShowProfileSelector(false);
  };

  if (!user) {
    return null;
  }

  return (
    <ProtectedRoute requireAuth={true}>
      <AppLayout currentPage="dashboard">
        <div className="mobile-container">
          <div className="dashboard-container">
            {/* Profile Section */}
            <div className="profile-section">

              <div className="profile-avatar">
  {user.profileImage ? (
    <img
      src={user.profileImage}
      alt="Profile"
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        objectFit: 'cover'
      }}
    />
  ) : (
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        backgroundColor: '#ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#fff'
      }}
    >
      {getInitials(user.name || 'U')}
    </div>
  )}
  <div className="profile-edit-icon">
    {/* ícono de editar, se mantiene igual */}
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#e91e63">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 
      0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 
      3.75 3.75 1.83-1.83z"/>
    </svg>
  </div>
</div>


              <div className="profile-info">
                <h2>¡Hola, {user.name.split(' ')[0]} {user.name.split(' ')[1]}!</h2>
                <p>Bienvenida a tu panel de impulsadora.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                className="action-button search"
                onClick={() => window.location.href = '/search-shifts'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
                Buscar Turnos
              </button>
              <button 
                className="action-button performance"
                onClick={() => window.location.href = '/performance'}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                </svg>
                Mi Rendimiento
              </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-container">
              <div className="stats-card">
                <div className="stats-header">
                  <div className="stats-icons">
                    <div className="stats-icon-small" style={{ backgroundColor: '#e91e63' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="stats-icon-small" style={{ backgroundColor: '#e91e63' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="stats-circle"></div>
                  </div>
                </div>
                <h3 className="stats-title">Total Registros</h3>
                <p className="stats-subtitle">Números registrados en total</p>
                <div className="stats-value">{user.totalShifts}</div>
              </div>

              <div className="stats-card">
                <div className="stats-header">
                  <div className="stats-icons">
                    <div className="stats-icon-small" style={{ backgroundColor: '#4caf50' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div className="stats-icon-small" style={{ backgroundColor: '#4caf50' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    </div>
                    <div className="stats-circle"></div>
                  </div>
                </div>
                <h3 className="stats-title">Turnos Completados</h3>
                <p className="stats-subtitle">Turnos finalizados exitosamente</p>
                <div className="stats-value">{user.completedShifts}</div>
              </div>

              <div className="stats-card">
                <div className="stats-header">
                  <div className="stats-icons">
                    <div className="stats-icon-small" style={{ backgroundColor: '#ff9800' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="stats-icon-small" style={{ backgroundColor: '#ff9800' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <div className="stats-circle"></div>
                  </div>
                </div>
                <h3 className="stats-title">Próximos Turnos</h3>
                <p className="stats-subtitle">Turnos programados</p>
                <div className="stats-value">{user.upcomingShifts}</div>
              </div>

              <div className="stats-card">
                <div className="stats-header">
                  <div className="stats-icons">
                    <div className="stats-icon-small" style={{ backgroundColor: '#e91e63' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    </div>
                    <div className="stats-icon-small" style={{ backgroundColor: '#e91e63' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                      </svg>
                    </div>
                    <div className="stats-circle"></div>
                  </div>
                </div>
                <h3 className="stats-title">Ganancias Totales</h3>
                <p className="stats-subtitle">Ingreso Acumulado</p>
                <div className="stats-value">${user.totalEarnings}</div>
              </div>
            </div>

            {/* History Section */}
            <div className="history-section">
              <h3 className="history-title">Historial Reciente</h3>
              
              {loading ? (
                <p>Cargando...</p>
              ) : recentShifts.length > 0 ? (
                <div>
                  {recentShifts.map((shift) => (
                    <div key={shift.id} className="history-card">
                      <div className="history-item">
                        <div className="history-date-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="#e91e63">
                            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                          </svg>
                        </div>
                        <div className="history-content">
                          <div className="history-date">
                            {new Date(shift.date).toLocaleDateString('es-ES')}
                          </div>
                          <div className="history-time">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#e91e63" style={{ marginRight: '4px' }}>
                              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                            </svg>
                            {shift.startTime} - {shift.endTime}
                          </div>
                          <div className="history-location">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#e91e63" style={{ marginRight: '4px' }}>
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            {shift.supermarketName}
                          </div>
                          <div className="history-address">
                            {shift.address.split(',')[0]}, {shift.address.split(',')[1]}
                          </div>
                          <div className="history-numbers">
                            Números captados: 650
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏪</div>
                  <p>No hay turnos recientes</p>
                  <p style={{ fontSize: '14px', color: '#666' }}>
                    ¡Busca turnos disponibles para comenzar!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Selector Modal */}
        <ProfileSelector
          open={showProfileSelector}
          onClose={handleCloseProfileSelector}
          onProfileSelected={handleProfileSelected}
        />
      </AppLayout>
    </ProtectedRoute>
  );
}

// Helper function to get user initials
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

