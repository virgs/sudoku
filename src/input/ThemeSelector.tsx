import { useEffect, useState } from "react"

const themesMap: {
    [themeName: string]: () => void
} = {
    superhero: async () => await import('bootswatch/dist/superhero/bootstrap.min.css'),
    lumen: async () => await import('bootswatch/dist/lumen/bootstrap.min.css'),
    morph: async () => await import('bootswatch/dist/morph/bootstrap.min.css'),
    litera: async () => await import('bootswatch/dist/litera/bootstrap.min.css'),
    darkly: async () => await import('bootswatch/dist/darkly/bootstrap.min.css'),
    sketchy: async () => await import('bootswatch/dist/sketchy/bootstrap.min.css')
}

import 'bootswatch/dist/sketchy/bootstrap.min.css'

export function ThemeSelector() {
    const [currentTheme, setCurrentTheme] = useState<string>('sketchy')

    return <>
        <nav className="nav nav-pills nav-fill">
            {Object.keys(themesMap).sort().map(themeKey => {
                const classList = ['nav-link'];
                if (themeKey === currentTheme) {
                    classList.push('active')
                }
                return <a className={classList.join(' ')}
                    key={themeKey}
                    onPointerDown={() => {
                        themesMap[themeKey]()
                        setCurrentTheme(themeKey)
                    }}
                    href="#">{themeKey}</a>
            })
            }
        </nav>
    </>
}