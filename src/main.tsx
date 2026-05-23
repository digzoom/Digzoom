import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './App.tsx'

// Error handler
try {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} catch (err: any) {
  console.error('RENDER ERROR:', err);
  document.body.innerHTML = `<div style="color:red;padding:20px;font-family:monospace;">
    <h2>Error: ${err?.message || 'Unknown'}</h2>
    <pre>${err?.stack || ''}</pre>
  </div>`;
}
