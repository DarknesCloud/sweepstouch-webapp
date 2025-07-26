'use client';

import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import AppLayout from '@/components/Layout/AppLayout';

const PerformancePage = () => {
  // Datos para el gráfico
  const chartData = [
    { day: 'Lun', value: 35 },
    { day: 'Mar', value: 60 },
    { day: 'Mié', value: 85 },
    { day: 'Jue', value: 40 },
    { day: 'Vie', value: 95 },
    { day: 'Sáb', value: 70 },
    { day: 'Dom', value: 55 },
  ];

  // Datos para el progreso del objetivo con estrellas
  const progressData = [
    { value: 300 },
    { value: 600 },
    { value: 800 },
    { value: 1000 },
  ];

  // SVG personalizado para check
  const CheckSVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#e91e63" />
      <path
        d="M9 12l2 2 4-4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // SVG personalizado para dinero
  const MoneySVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#e91e63" />
      <path
        d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // SVG personalizado para reloj
  const ClockSVG = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#e91e63" />
      <polyline
        points="12,6 12,12 16,14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // SVG personalizado para ubicación
  const LocationSVG = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#e91e63" />
      <circle cx="12" cy="10" r="3" fill="white" />
    </svg>
  );

  // SVG personalizado para tiempo
  const TimeSVG = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#e91e63" />
      <polyline
        points="12,6 12,12 16,14"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // SVG personalizado para check pequeño
  const SmallCheckSVG = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="#4caf50"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <AppLayout currentPage="performance">
      <Box
        sx={{
          backgroundColor: '',
          minHeight: '100vh',
          padding: 2,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          sx={{
            backgroundColor: '#ededed',
            maxWidth: 360,
            width: '100%',
          }}
        >
          <CardContent sx={{ padding: 3 }}>
            {/* Header */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: '#333',
                fontSize: '18px',
              }}
            >
              Estadísticas Generales
            </Typography>

            {/* Estadísticas principales - Cards grisáceas con números a la derecha */}
            <Box sx={{ mb: 4 }}>
              {/* Total de Turnos */}
              <Card
                sx={{
                  mb: 2,
                  backgroundColor: 'transparent',

                  borderRadius: 2,
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 2.5,
                    px: 2,
                    '&:last-child': { pb: 2.5 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckSVG />
                    <Box sx={{ ml: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '12px',
                          mb: 0.5,
                        }}
                      >
                        Total de Turnos
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '28px',
                      lineHeight: 1,
                      color: '#333',
                    }}
                  >
                    3
                  </Typography>
                </CardContent>
              </Card>

              {/* Comisiones Generadas */}
              <Card
                sx={{
                  mb: 2,
                  backgroundColor: 'transparent',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 2.5,
                    px: 2,
                    '&:last-child': { pb: 2.5 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MoneySVG />
                    <Box sx={{ ml: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '12px',
                          mb: 0.5,
                        }}
                      >
                        Comisiones Generadas
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '28px',
                      lineHeight: 1,
                      color: '#333',
                    }}
                  >
                    $375
                  </Typography>
                </CardContent>
              </Card>

              {/* Promedio por turno */}
              <Card
                sx={{
                  mb: 2,
                  backgroundColor: 'transparent',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                }}
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: 2.5,
                    px: 2,
                    '&:last-child': { pb: 2.5 },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <ClockSVG />
                    <Box sx={{ ml: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: '12px',
                          mb: 0.5,
                        }}
                      >
                        Promedio por turno
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '28px',
                      lineHeight: 1,
                      color: '#333',
                    }}
                  >
                    $75
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            {/* Turno en Curso */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#333',
                fontSize: '16px',
              }}
            >
              Turno en Curso
            </Typography>

            <Box
              sx={{
                mb: 3,
                p: 2.5,
                backgroundColor: '#ffffff',
                borderRadius: 1.5,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                  fontSize: '16px',
                  color: '#333',
                }}
              >
                Chuan Supermarket
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <LocationSVG />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '13px',
                    lineHeight: 1.4,
                    ml: 1.5,
                  }}
                >
                  Maple St, Berri Av, Apt. 3, 2nd Floor, Montreal, QC H2X 1Y4,
                  Canada
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <TimeSVG />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    fontSize: '13px',
                    ml: 1.5,
                  }}
                >
                  8:00 AM - 6:00 PM
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SmallCheckSVG />
                <Typography
                  variant="body2"
                  sx={{
                    color: '#4caf50',
                    fontWeight: 'medium',
                    fontSize: '13px',
                    ml: 1.5,
                  }}
                >
                  Turno disponible
                </Typography>
              </Box>
            </Box>

            {/* Botón Iniciar a Prospectar */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#e91e63',
                color: 'white',
                fontWeight: 'bold',
                py: 1.2,
                mb: 4,
                borderRadius: 4,
                textTransform: 'none',
                fontSize: '16px',
                boxShadow: '0 4px 12px rgba(233, 30, 99, 0.3)',
                '&:hover': {
                  backgroundColor: '#c2185b',
                  boxShadow: '0 6px 16px rgba(233, 30, 99, 0.4)',
                },
              }}
            >
              Iniciar a Prospectar
            </Button>

            {/* Progreso del Objetivo */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#333',
                fontSize: '16px',
              }}
            >
              Progreso del Objetivo
            </Typography>

            {/* Barra de progreso en raya diagonal con efecto 3D */}
            <Box sx={{ mb: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  height: 12,
                  backgroundColor: '#f0f0f0',
                  borderRadius: 2,
                  overflow: 'hidden',
                  mb: 3,
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
                  backgroundImage:
                    'repeating-linear-gradient(45deg, #e91e63 0px, #e91e63 8px, #f0f0f0 8px, #f0f0f0 16px)',
                  backgroundSize: '75% 100%',
                  backgroundRepeat: 'no-repeat',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
                    borderRadius: 2,
                  },
                }}
              ></Box>

              {/* Estrellas con numeración - efecto 3D mejorado */}
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}
              >
                {progressData.map((item, index) => (
                  <Box
                    key={index}
                    sx={{ textAlign: 'center', position: 'relative' }}
                  >
                    <Box
                      sx={{
                        display: 'inline-block',
                        borderRadius: 2,
                        p: 0.8,
                        boxShadow:
                          '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                        background:
                          'linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #e8e8e8 100%)',
                        border: '1px solid rgba(0,0,0,0.1)',
                        mb: 0.5,
                        transform: 'translateY(-1px)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow:
                            '0 6px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)',
                        },
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                          fill="#e91e63"
                          stroke="#c2185b"
                          strokeWidth="0.5"
                        />
                      </svg>
                    </Box>
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#e91e63',
                        display: 'block',
                        mt: 0.5,
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Rendimiento Histórico */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                color: '#333',
                fontSize: '16px',
              }}
            >
              Rendimiento Histórico
            </Typography>

            <Box sx={{ height: 160, mb: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                  barCategoryGap="20%"
                >
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#666' }}
                  />
                  <YAxis hide />
                  <Bar
                    dataKey="value"
                    fill="#e91e63"
                    radius={[3, 3, 0, 0]}
                    barSize={24}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </AppLayout>
  );
};

export default PerformancePage;
