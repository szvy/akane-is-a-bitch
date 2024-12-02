document.addEventListener('DOMContentLoaded', () => {
    const savedFaviconUrl = localStorage.getItem('faviconUrl');
    const savedTitle = localStorage.getItem('pageTitle');
    const savedKeybind = localStorage.getItem('keybind');
    const savedCustomUrl = localStorage.getItem('customUrl');
  
    if (savedFaviconUrl) {
      let link = document.querySelector('link[rel="shortcut icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.href = savedFaviconUrl;
    }
  
    if (savedTitle) {
      document.title = savedTitle;
    }

    if (savedKeybind && savedCustomUrl) {
      document.addEventListener('keydown', (e) => {
        if (e.key === savedKeybind) {
          window.open(savedCustomUrl, '_blank');
        }
      });
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    const gatekeepMode = localStorage.getItem('gatekeepMode') === 'true';

    const gatekeepButton = document.getElementById('gatekeep-button');
    const gatekeepStatus = document.getElementById('gatekeep-status');
    const logo = document.querySelector('.logo');
    const title = document.getElementById('title');

    function updateGatekeepUI() {
        if (gatekeepMode) {
            logo.style.display = 'none';
            title.style.display = 'none';
            gatekeepStatus.textContent = 'Gatekeep Mode is ON';
        } else {
            logo.style.display = 'block';
            title.style.display = 'block';
            gatekeepStatus.textContent = 'Gatekeep Mode is OFF';
        }
    }

    updateGatekeepUI();

    gatekeepButton.addEventListener('click', () => {
        const currentMode = localStorage.getItem('gatekeepMode') === 'true';
        localStorage.setItem('gatekeepMode', !currentMode);
        location.reload();
    });
});
