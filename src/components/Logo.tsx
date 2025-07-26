import React from 'react';
import { Box } from '@mui/material';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'symbol' | 'full';
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', variant = 'full' }) => {
  let width = 120;
  let height = 80;

  switch (size) {
    case 'small':
      width = 80;
      height = 60;
      break;
    case 'medium':
      width = 120;
      height = 80;
      break;
    case 'large':
      width = 160;
      height = 110;
      break;
  }

  if (variant === 'symbol') {
    // Solo el símbolo circular
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <svg width={height * 0.7} height={height * 0.7} viewBox="0 0 70 70" fill="none">
          <circle cx="35" cy="35" r="35" fill="#E91E63"/>
          <path d="M17 25 C17 25, 30 20, 40 25 C50 30, 53 40, 40 45 C30 50, 27 55, 40 60 C53 65, 50 75, 40 80 C30 85, 17 80, 17 80" 
                stroke="white" strokeWidth="6" strokeLinecap="round" fill="none"/>
        </svg>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width={width} height={height} viewBox="0 0 180 120" fill="none">
        <circle cx="90" cy="45" r="35" fill="#E91E63"/>
        <path d="M72 35 C72 35, 85 30, 95 35 C105 40, 108 50, 95 55 C85 60, 82 65, 95 70 C108 75, 105 85, 95 90 C85 95, 72 90, 72 90" 
              stroke="white" strokeWidth="6" strokeLinecap="round" fill="none"/>
        <text x="20" y="100" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="400" fill="#E91E63">sweeps</text>
        <text x="95" y="100" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#E91E63">TOUCH</text>
      </svg>
    </Box>
  );
};

export default Logo;

