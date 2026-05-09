import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Color System
      colors: {
        // Primary
        primary: '#2E4BFF',
        'primary-hover': '#1E3AD8',
        'primary-light': '#EBF0FF',
        
        // Secondary
        secondary: '#0F172A',
        'secondary-hover': '#0A0F1A',
        
        // Surface & Background
        surface: '#F8FAFF',
        'surface-secondary': '#F1F5FB',
        
        // Accent
        accent: '#4B6BFF',
        'accent-light': '#F0F4FF',
        
        // Semantic Colors
        success: '#10B981',
        'success-light': '#ECFDF5',
        warning: '#F59E0B',
        'warning-light': '#FFFBEB',
        error: '#EF4444',
        'error-light': '#FEF2F2',
        
        // Neutrals
        neutral: '#64748B',
        'neutral-dark': '#334155',
        'neutral-light': '#E2E8F0',
        'neutral-lighter': '#F1F5F9',
        
        // Text
        'text-primary': '#0F172A',
        'text-secondary': '#475569',
        'text-tertiary': '#64748B',
        
        // Border
        border: '#E2E8F0',
        'border-light': '#F1F5F9',
      },

      // Font Family
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },

      // Font Sizes
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.5rem' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },

      // Font Weight
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },

      // Spacing Scale (8px base)
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '12': '3rem',
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '40': '10rem',
        '44': '11rem',
        '48': '12rem',
        '52': '13rem',
        '56': '14rem',
        '60': '15rem',
        '64': '16rem',
      },

      // Line Height
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
        loose: '2',
      },

      // Border Radius
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },

      // Box Shadow
      boxShadow: {
        'none': 'none',
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'sm': '0 1px 3px 0 rgba(15, 23, 42, 0.1)',
        'md': '0 4px 6px -1px rgba(15, 23, 42, 0.1)',
        'lg': '0 10px 15px -3px rgba(15, 23, 42, 0.1)',
        'xl': '0 20px 25px -5px rgba(15, 23, 42, 0.1)',
        'soft': '0 10px 30px rgba(15, 23, 42, 0.08)',
        'elevated': '0 20px 40px rgba(15, 23, 42, 0.12)',
      },

      // Transitions
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },

      transitionTimingFunction: {
        'ease-smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
