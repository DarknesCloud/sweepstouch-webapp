'use client';
import { useState, useEffect } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';

// Mock data for charts
const weeklyData = [
  { day: 'Lun', horas: 4 },
  { day: 'Mar', horas: 6 },
  { day: 'Mié', horas: 8 },
  { day: 'Jue', horas: 5 },
  { day: 'Vie', horas: 7 },
  { day: 'Sáb', horas: 3 },
  { day: 'Dom', horas: 2 },
];

export default function PerformancePage() {
  const { user } = useAuth();

  const stats = {
    totalShifts: 3,
    totalEarnings: 375,
    averagePerShift: 75,
  };

  const currentShift = {
    name: 'CTown Supermarket',
    address: 'CTown Supermarket 272 Maple St, Perth Amboy, NJ 08861, USA',
    time: '8:00 AM - 12:00 PM',
    numbers: 300,
    remaining: '1h 45m'
  };

  const progressData = {
    current: 300,
    goals: [0, 300, 600, 800, 1000]
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <AppLayout currentPage="performance">
        <div className="mobile-container">
          <div className="performance-container">
            {/* Header */}
            <div className="performance-header">
              <h1 className="performance-title">Mi Rendimiento</h1>
            </div>

            <p className="performance-subtitle">
              Revisa tus estadísticas y progreso detallado.
            </p>

            {/* Estadísticas Generales */}
            <div className="general-stats-title">Estadísticas Generales</div>
            
            <div className="general-stats-cards">
              <div className="general-stats-card">
                <div className="general-stats-icon" style={{ background: '#FCE4EC' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E91E63">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <div className="general-stats-content">
                  <div className="general-stats-label">Total de Turnos</div>
                  <div className="general-stats-value">{stats.totalShifts}</div>
                </div>
              </div>

              <div className="general-stats-card">
                <div className="general-stats-icon" style={{ background: '#FCE4EC' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E91E63">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
                <div className="general-stats-content">
                  <div className="general-stats-label">Ganancias Totales</div>
                  <div className="general-stats-value">${stats.totalEarnings}</div>
                </div>
              </div>

              <div className="general-stats-card">
                <div className="general-stats-icon" style={{ background: '#FCE4EC' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#E91E63">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="general-stats-content">
                  <div className="general-stats-label">Promedio por turno</div>
                  <div className="general-stats-value">${stats.averagePerShift}</div>
                </div>
              </div>
            </div>

            {/* Turno en Curso */}
            <div className="current-shift-title">Turno en Curso</div>
            
            <div className="current-shift-card">
              <div className="current-shift-header">
                <div className="current-shift-name">{currentShift.name}</div>
              </div>

              <div className="current-shift-details">
                <div className="current-shift-detail">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>{currentShift.address}</span>
                </div>
              </div>

              <div className="current-shift-time">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>Hora: {currentShift.time}</span>
              </div>

              <div className="current-shift-numbers">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                <span>Números captados: {currentShift.numbers}</span>
              </div>

              <div className="current-shift-remaining">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                </svg>
                <span>Tiempo restante: {currentShift.remaining}</span>
              </div>

              <button className="prospect-button">
                Iniciar a Prospectar
              </button>
            </div>

            {/* Progreso del Objetivo */}
            <div className="progress-section-title">Progreso del Objetivo</div>
            
            <div className="progress-container">
              <div className="progress-bar-container">
                <div className="progress-bar">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${(progressData.current / 1000) * 100}%` }}
                  ></div>
                </div>
                
                <div className="progress-goals">
                  {progressData.goals.map((goal, index) => (
                    <div key={goal} className="progress-goal">
                      <div className="progress-goal-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <div className="progress-goal-number">{goal}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rendimiento Histórico */}
            <div className="history-chart-title">Rendimiento Histórico</div>
            
            <div className="history-chart-container">
              <div className="chart-bars">
                {weeklyData.map((data, index) => (
                  <div key={data.day} className="chart-bar-group">
                    <div 
                      className="chart-bar"
                      style={{ height: `${(data.horas / 8) * 120}px` }}
                    ></div>
                    <div className="chart-label">{data.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

