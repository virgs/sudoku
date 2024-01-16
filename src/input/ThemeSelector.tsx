import { useState } from "react"
import { Database } from "../Database"


export const themesMap: {
    [themeName: string]: () => void
} = {
    vapor: async () => await import('bootswatch/dist/vapor/bootstrap.min.css'),
    united: async () => await import('bootswatch/dist/united/bootstrap.min.css'),
    yeti: async () => await import('bootswatch/dist/yeti/bootstrap.min.css'),
    minty: async () => await import('bootswatch/dist/minty/bootstrap.min.css'),
    pulse: async () => await import('bootswatch/dist/pulse/bootstrap.min.css'),
    quartz: async () => await import('bootswatch/dist/quartz/bootstrap.min.css'),
    sandstone: async () => await import('bootswatch/dist/sandstone/bootstrap.min.css'),
    simplex: async () => await import('bootswatch/dist/simplex/bootstrap.min.css'),
    slate: async () => await import('bootswatch/dist/slate/bootstrap.min.css'),
    solar: async () => await import('bootswatch/dist/solar/bootstrap.min.css'),
    cerulean: async () => await import('bootswatch/dist/cerulean/bootstrap.min.css'),
    lux: async () => await import('bootswatch/dist/lux/bootstrap.min.css'),
    cosmo: async () => await import('bootswatch/dist/cosmo/bootstrap.min.css'),
    cyborg: async () => await import('bootswatch/dist/cyborg/bootstrap.min.css'),
    journal: async () => await import('bootswatch/dist/journal/bootstrap.min.css'),
    superhero: async () => await import('bootswatch/dist/superhero/bootstrap.min.css'),
    lumen: async () => await import('bootswatch/dist/lumen/bootstrap.min.css'),
    morph: async () => await import('bootswatch/dist/morph/bootstrap.min.css'),
    litera: async () => await import('bootswatch/dist/litera/bootstrap.min.css'),
    darkly: async () => await import('bootswatch/dist/darkly/bootstrap.min.css'),
    sketchy: async () => await import('bootswatch/dist/sketchy/bootstrap.min.css')
}


const defaultTheme = 'sketchy'
await themesMap[Database.loadThemeOrDefault(defaultTheme) || defaultTheme]!()

export function ThemeSelector() {
    const [currentTheme, setCurrentTheme] = useState<string>(Database.loadThemeOrDefault(defaultTheme))

    return <>
        <nav className="nav nav-pills">
            {Object.keys(themesMap).sort().map(themeKey => {
                const classList = ['nav-link mt-1'];
                if (themeKey === currentTheme) {
                    classList.push('active')
                }
                return <a className={classList.join(' ')}
                    key={themeKey}
                    onPointerDown={() => {
                        themesMap[themeKey]()
                        Database.saveTheme(themeKey)
                        setCurrentTheme(themeKey)
                    }}
                    href="#">{themeKey}</a>
            })
            }
        </nav>
    </>
}