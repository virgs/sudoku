import { useState } from 'react'
import { Database } from '../Database'

export const themesMap: {
    [themeName: string]: () => void
} = {
    darkly: async () => await import('bootswatch/dist/darkly/bootstrap.min.css'),
    sketchy: async () => await import('bootswatch/dist/sketchy/bootstrap.min.css'),
    journal: async () => await import('bootswatch/dist/journal/bootstrap.min.css'),
    cosmo: async () => await import('bootswatch/dist/cosmo/bootstrap.min.css')
}

const defaultTheme = 'sketchy'
const initialTheme = themesMap[Database.loadThemeOrDefault(defaultTheme) || defaultTheme] ?? themesMap[defaultTheme]
await initialTheme()

export function ThemeSelector() {
    const [currentTheme, setCurrentTheme] = useState<string>(Database.loadThemeOrDefault(defaultTheme))

    return (
        <>
            <nav className="nav nav-pills">
                {Object.keys(themesMap)
                    .sort()
                    .map((themeKey) => {
                        const classList = ['nav-link mt-1']
                        if (themeKey === currentTheme) {
                            classList.push('active')
                        }
                        return (
                            <a
                                className={classList.join(' ')}
                                key={themeKey}
                                onPointerDown={() => {
                                    themesMap[themeKey]()
                                    Database.saveTheme(themeKey)
                                    setCurrentTheme(themeKey)
                                }}
                                href="#"
                            >
                                {themeKey}
                            </a>
                        )
                    })}
            </nav>
        </>
    )
}
