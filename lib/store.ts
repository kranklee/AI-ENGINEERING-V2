'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { Lang } from './i18n'

type Theme = 'dark' | 'light' | 'color'

interface StoreCtx {
  theme: Theme
  setTheme: (t: Theme) => void
  lang: Lang
  setLang: (l: Lang) => void
}

const Store = createContext<StoreCtx>({} as StoreCtx)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme
    const savedLang = localStorage.getItem('lang') as Lang
    if (saved) setThemeState(saved)
    if (savedLang) setLangState(savedLang)
  }, [])

  function setTheme(t: Theme) {
    setThemeState(t)
    localStorage.setItem('theme', t)
    document.documentElement.setAttribute('data-theme', t)
  }

  function setLang(l: Lang) {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return React.createElement(Store.Provider, { value: { theme, setTheme, lang, setLang } }, children)
}

export const useStore = () => useContext(Store)
