import { reactive } from "vue";

const bodyElement: HTMLElement | null = document.querySelector('body');

interface ThemeState {
    theme: string;
}

const themeState: ThemeState = reactive({
    theme: localStorage.getItem("theme") || "light-theme",
});

const darkTheme: () => void = () => {
    themeState.theme = "dark-theme";
    localStorage.setItem("theme", "dark-theme");
};

const lightTheme: () => void = () => {
    themeState.theme = "light-theme";
    localStorage.removeItem("theme");
};

export const toggleTheme: () => void = () => {
    if (themeState.theme === 'dark-theme') {
        lightTheme();
        bodyElement?.classList.remove('dark-theme');
    } else {
        darkTheme();
        bodyElement?.classList.add('dark-theme');
    }
}

export const currentTheme: () => void = () => {
    const theme: string | null = localStorage.getItem("theme");
    theme && bodyElement?.classList.add('dark-theme');
}