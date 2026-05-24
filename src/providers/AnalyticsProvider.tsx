import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router';

// Google Analytics 4 Measurement ID
const GA4_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID
// Microsoft Clarity Project ID
const CLARITY_ID = 'XXXXXXXXXX'; // Replace with actual Clarity ID

// Track page view in GA4
function trackPageView(path: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA4_ID, {
      page_path: path,
    });
  }
}

// Track event in GA4
export function trackGA4Event(eventName: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
}

// Track event in Clarity
export function trackClarityEvent(eventName: string) {
  if (typeof window !== 'undefined' && (window as any).clarity) {
    (window as any).clarity('event', eventName);
  }
}

// Initialize GA4
function initGA4() {
  if (typeof window === 'undefined') return;
  
  // Add GA4 script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_ID}', { send_page_view: false });
  `;
  document.head.appendChild(script2);
}

// Initialize Microsoft Clarity
function initClarity() {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_ID}");
  `;
  document.head.appendChild(script);
}

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const location = useLocation();

  useEffect(() => {
    // Initialize analytics on mount
    initGA4();
    initClarity();
  }, []);

  useEffect(() => {
    // Track page views on route change
    const path = location.pathname + location.search;
    trackPageView(path);
    trackClarityEvent(`page_view_${location.pathname}`);
  }, [location]);

  return <>{children}</>;
}
