'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Force scroll to top on every route change, overriding any smooth scroll libraries
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

