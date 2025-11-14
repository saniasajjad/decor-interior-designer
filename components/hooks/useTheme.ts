import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

// This function is defined outside the hook to avoid being recreated on every render.
const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
};

export const useTheme = (): [Theme, (theme: Theme) => void] => {
    const [theme, setThemeState] = useState<Theme>(() => {
        try {
            const storedTheme = window.localStorage.getItem('decor-theme');
            return (storedTheme as Theme) || 'system';
        } catch {
            return 'system';
        }
    });

    // Apply theme on initial load and when theme state changes
    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleSystemThemeChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, [theme]); // Re-attach listener if theme setting changes to/from 'system'

    const setTheme = useCallback((newTheme: Theme) => {
        try {
            window.localStorage.setItem('decor-theme', newTheme);
        } catch (error) {
            console.error("Could not save theme to local storage", error);
        }
        setThemeState(newTheme);
    }, []);

    return [theme, setTheme];
};
