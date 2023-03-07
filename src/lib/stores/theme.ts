import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { getCookieValue } from "$lib/utils";

const themeCookieAttributes = 'SameSite=Strict;max-age=31536000;path=/';
const themeCookieName = "app-theme";
export enum Theme {
  Dark = "dark",
  Light = "light",
}

function createStore() {
  let initialTheme = Theme.Light;
  if (browser) {
    const storedTheme = getCookieValue(themeCookieName, document.cookie);
    if (storedTheme) {
      initialTheme = storedTheme as Theme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      initialTheme = Theme.Dark;
    }
    updateDocumentTheme(initialTheme);
  }
  const { subscribe, set, update } = writable<Theme>(initialTheme);

  return {
    subscribe,
    set: (theme: Theme) => {
      updateDocumentTheme(theme);
      set(theme);
    },
    toggle: () =>
      update((v) =>
        updateDocumentTheme(v === Theme.Dark ? Theme.Light : Theme.Dark)
      ),
  };
}

function updateDocumentTheme(theme: Theme) {
  if (!browser) return theme;
  document.documentElement.dataset.theme = theme;
  document.cookie = `${themeCookieName}=${theme};${themeCookieAttributes}`;
  return theme;
}

// const storedTheme = localStorage.getItem(themeCookieName);
// const storedTheme = document.documentElement.dataset.theme;
// theme.subscribe((v) => browser && localStorage.setItem('app-theme', v));

export const theme = createStore();
