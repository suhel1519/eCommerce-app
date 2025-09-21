// Animation utilities for consistent microinteractions
export const animations = {
  // Hover effects
  hover: {
    scale: 'hover:scale-[1.02] active:scale-[0.98]',
    lift: 'hover:shadow-lg hover:-translate-y-1',
    glow: 'hover:shadow-md hover:shadow-blue-500/25',
    brightness: 'hover:brightness-110',
  },
  
  // Transitions
  transition: {
    smooth: 'transition-all duration-200 ease-out',
    fast: 'transition-all duration-150 ease-out',
    slow: 'transition-all duration-300 ease-out',
    bounce: 'transition-all duration-200 ease-bounce',
  },
  
  // Loading states
  loading: {
    pulse: 'animate-pulse',
    spin: 'animate-spin',
    bounce: 'animate-bounce',
  },
  
  // Entrance animations
  entrance: {
    fadeIn: 'animate-in fade-in duration-300',
    slideUp: 'animate-in slide-in-from-bottom-4 duration-300',
    slideDown: 'animate-in slide-in-from-top-4 duration-300',
    slideLeft: 'animate-in slide-in-from-right-4 duration-300',
    slideRight: 'animate-in slide-in-from-left-4 duration-300',
    scaleIn: 'animate-in zoom-in-95 duration-200',
  },
  
  // Focus states
  focus: {
    ring: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    outline: 'focus:outline-none focus:ring-2 focus:ring-blue-500',
  },
  
  // Interactive states
  interactive: {
    button: 'hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150',
    card: 'hover:shadow-lg hover:-translate-y-1 transition-all duration-200',
    row: 'hover:bg-gray-50 transition-colors duration-150',
  }
};

// Stagger animation delays for lists
export const staggerDelays = [
  'animation-delay-0',
  'animation-delay-75',
  'animation-delay-150',
  'animation-delay-300',
  'animation-delay-500',
];

// Custom keyframes for advanced animations
export const keyframes = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;