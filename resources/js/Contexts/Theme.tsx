import React from 'react';

interface ThemeContextType {
    theme: 'dark' | 'light';
    setTheme: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

const ThemeContext = React.createContext<ThemeContextType>({
    theme: 'light', // Default to light for less flickering
    setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = React.useState<'dark' | 'light'>(() => {
        return (
            (window.localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
        );
    });

    React.useEffect(() => {
        const storedTheme = window.localStorage.getItem('theme') as
            | 'dark'
            | 'light'
            | null;
        if (storedTheme && storedTheme !== theme) {
            setTheme(storedTheme);
        }
    }, []);

    React.useEffect(() => {
        if (theme) {
            window.localStorage.setItem('theme', theme);
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemes = () => React.useContext(ThemeContext);
