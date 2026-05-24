import { useState, useCallback } from 'react';

export function useLanguage() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const toggle = useCallback(() => setLang(l => l === 'ar' ? 'en' : 'ar'), []);
  const t = useCallback((ar: string, en?: string) => lang === 'ar' ? ar : (en || ar), [lang]);
  return { lang, toggle, t };
}
