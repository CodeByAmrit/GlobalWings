/**
 * GlobalWings Viewer Interactivity
 * Handles telemetry, diagnostics, and system connections for the 3D viewer.
 */

document.addEventListener('DOMContentLoaded', () => {
  const modelViewer = document.querySelector('model-viewer');

  // System Connection
  const connectBtn = document.querySelector('.btn-nav-primary');
  if (connectBtn) {
    connectBtn.addEventListener('click', () => {
      alert('Connecting to global telemetry satellite...');
    });
  }

  // Fullscreen Toggle
  const fullscreenBtn = document.querySelector('[title="Fullscreen"]');
  if (fullscreenBtn && modelViewer) {
    fullscreenBtn.addEventListener('click', () => {
      if (modelViewer.present) {
        modelViewer.present();
      } else {
        console.warn(
          'Model viewer present feature not supported in this environment.',
        );
      }
    });
  }

  // Play/Record Toggle
  const recordBtn = document.querySelector('[title="Play Record"]');
  if (recordBtn) {
    recordBtn.addEventListener('click', () => {
      alert('Recording telemetry data...');
    });
  }

  // Diagnostics
  const diagBtn = document.querySelector('[title="Diagnostics"]');
  if (diagBtn) {
    diagBtn.addEventListener('click', () => {
      alert('Engine status: OPTIMAL. Avionics: LOCKED. Payload: READY.');
    });
  }

  // Download Telemetry
  const downloadBtn = document.querySelector('.btn-primary-glow');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      alert('Exporting PDF manifest and flight telemetry data...');
    });
  }

  // Share Link
  const shareBtn = document.querySelector('.btn-secondary-glass');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          alert('Secure telemetry link copied to clipboard.');
        })
        .catch((err) => {
          alert('Generating shareable link...');
        });
    });
  }

  console.log('GlobalWings Telemetry System: ONLINE');
});
