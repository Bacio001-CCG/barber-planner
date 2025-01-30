import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'bg-normal': 'var(--bg-normal)',
                'bg-light': 'var(--bg-light)',
                'bg-extra-light': 'var(--bg-extra-light)',
                hover: 'var(--hover)',
                ring: 'var(--ring)',
                'txt-one': 'var(--txt-one)',
                'txt-two': 'var(--txt-two)',
                border: 'var(--border)',
                accent: 'var(--accent)',
                'bg-hover': 'var(--bg-hover)',
                'border-highlight': 'var(--border-highlight)',
                'bg-highlight': 'var(--bg-highlight)',
                google: {
                    'text-gray': '#3c4043',
                    'button-blue': '#1a73e8',
                    'button-blue-hover': '#5195ee',
                    'button-dark': '#202124',
                    'button-dark-hover': '#555658',
                    'button-border-light': '#dadce0',
                    'logo-blue': '#4285f4',
                    'logo-green': '#34a853',
                    'logo-yellow': '#fbbc05',
                    'logo-red': '#ea4335',
                },
            },
        },
    },

    safelist: [
        'bg-red-500',
        'bg-green-500',
        'grid-cols-1',
        'grid-cols-2',
        'grid-cols-3',
        'grid-cols-4',
        'grid-cols-5',
        'grid-cols-6',
        'grid-cols-7',
        'grid-cols-8',
    ],

    plugins: [forms],
};
