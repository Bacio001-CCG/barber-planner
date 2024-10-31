import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

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
                'bg-normal': '#000000',
                'bg-light': '#1a1a1a',
                'bg-extra-light': '#333333',
                'hover': '#ffffff',
                'ring': '#ffffff',
                'txt-one': '#ffffff',
                'txt-two': '#cccccc',
                'border': '#ffffff',
                'accent': '#f97316',
                'bg-hover': '#1a1a1a66',
            },
        },
    },

    safelist: [
        'bg-red-500',
    ],

    plugins: [forms],
};
