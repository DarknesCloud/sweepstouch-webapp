'use client';
import { useState, useEffect } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';

// Mock data for charts
const weeklyData = [
  { day: 'Lun', horas: 4, ganancias: 125 },
  { day: 'Mar', horas: 0, ganancias: 0 },
  { day: 'Mié', horas: 4, ganancias: 125 },
  { day: 'Jue', horas: 0, ganancias: 0 },
  { day: 'Vie', horas: 4, ganancias: 125 },
  { day: 'Sáb', horas: 0, ganancias: 0 },
  { day: 'Dom', horas: 0, ganancias: 0 },
];

const monthlyData = [
  { mes: 'Ene', turnos: 3, ganancias: 375 },
  { mes: 'Feb', turnos: 2, ganancias: 250 },
  { mes: 'Mar', turnos: 4, ganancias: 500 },
  { mes: 'Abr', turnos: 3, ganancias: 375 },
  { mes: 'May', turnos: 2, ganancias: 250 },
  { mes: 'Jun', turnos: 1, ganancias: 125 },
];

export default function PerformancePage() {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = {
    totalShifts: user?.totalShifts || 15,
    completedShifts: user?.completedShifts || 12,
    upcomingShifts: user?.upcomingShifts || 2,
    totalEarnings: user?.totalEarnings || 1875,
    averageRating: 4.8,
    completionRate: 95,
    hoursWorked: 48,
    thisWeekEarnings: 375,
  };

  return (
    <ProtectedRoute requireAuth={true}>
      <AppLayout currentPage="performance">
        <div className="mobile-container">
          <div className="performance-container">
            {/* Header con hamburger menu */}
            <div className="performance-header">
              
              <h1 className="performance-title">Mi Rendimiento</h1>
            </div>

            <p className="performance-subtitle">
              Revisa tu progreso y estadísticas de trabajo.
            </p>

            {/* Period Selector */}
            <div className="period-selector">
              <button 
                className={`period-button ${selectedPeriod === 'week' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('week')}
              >
                Semanal
              </button>
              <button 
                className={`period-button ${selectedPeriod === 'month' ? 'active' : ''}`}
                onClick={() => setSelectedPeriod('month')}
              >
                Mensual
              </button>
            </div>

            {/* Charts Section */}
            {selectedPeriod === 'week' ? (
              <div className="chart-container">
                <h3 className="chart-title">Rendimiento Semanal</h3>
                <div className="chart-content">
                  <div className="chart-bars">
                    {weeklyData.map((data, index) => (
                      <div key={data.day} className="chart-bar-group">
                        <div className="chart-bar-container">
                          <div 
                            className="chart-bar hours"
                            style={{ height: `${(data.horas / 4) * 100}%` }}
                          ></div>
                        </div>
                        <div className="chart-label">{data.day}</div>
                        <div className="chart-value">{data.horas}h</div>
                      </div>
                    ))}
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color hours"></div>
                      <span>Horas trabajadas</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="chart-container">
                <h3 className="chart-title">Ganancias Mensuales</h3>
                <div className="chart-content">
                  <div className="line-chart">
                    <svg viewBox="0 0 300 150" className="chart-svg">
                      {/* Grid lines */}
                      <defs>
                        <pattern id="grid" width="50" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 50 0 L 0 0 0 30" fill="none" stroke="#e0e0e0" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="300" height="150" fill="url(#grid)" />
                      
                      {/* Line chart */}
                      <polyline
                        fill="none"
                        stroke="#e91e63"
                        strokeWidth="3"
                        points={monthlyData.map((data, index) => 
                          `${50 + index * 40},${150 - (data.ganancias / 500) * 120}`
                        ).join(' ')}
                      />
                      
                      {/* Data points */}
                      {monthlyData.map((data, index) => (
                        <circle
                          key={data.mes}
                          cx={50 + index * 40}
                          cy={150 - (data.ganancias / 500) * 120}
                          r="4"
                          fill="#e91e63"
                        />
                      ))}
                    </svg>
                    <div className="chart-x-labels">
                      {monthlyData.map((data) => (
                        <div key={data.mes} className="chart-x-label">{data.mes}</div>
                      ))}
                    </div>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <div className="legend-color earnings"></div>
                      <span>Ganancias ($)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Summary */}
            <div className="stats-summary">
              <div className="summary-card">
                <div className="summary-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4caf50">
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                </div>
                <div className="summary-content">
                  <div className="summary-value">{stats.completionRate}%</div>
                  <div className="summary-label">Tasa de Finalización</div>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff9800">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div className="summary-content">
                  <div className="summary-value">{stats.averageRating}</div>
                  <div className="summary-label">Calificación Promedio</div>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#2196f3">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div className="summary-content">
                  <div className="summary-value">{stats.hoursWorked}h</div>
                  <div className="summary-label">Horas Trabajadas</div>
                </div>
              </div>

              <div className="summary-card">
                <div className="summary-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#4caf50">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                  </svg>
                </div>
                <div className="summary-content">
                  <div className="summary-value">${stats.totalEarnings}</div>
                  <div className="summary-label">Ganancias Totales</div>
                </div>
              </div>
            </div>

            {/* Performance Insights */}
            <div className="insights-section">
              <h3 className="insights-title">Insights de Rendimiento</h3>
              <div className="insights-list">
                <div className="insight-item">
                  <div className="insight-icon success">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                    </svg>
                  </div>
                  <span>Has completado el 95% de tus turnos asignados</span>
                </div>
                <div className="insight-item">
                  <div className="insight-icon primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                    </svg>
                  </div>
                  <span>Ganancias promedio: $125 por turno</span>
                </div>
                <div className="insight-item">
                  <div className="insight-icon info">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
                      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <span>Promedio de 4 horas por turno</span>
                </div>
                <div className="insight-item">
                  <div className="insight-icon warning">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span>Calificación promedio: 4.8/5 estrellas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </ProtectedRoute>
  );
}

