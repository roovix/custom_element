// First, add the CSS styles directly to the document head
function addPopupStyles() {
  const style = document.createElement("style");
  style.textContent = `
      :root {
        --bg-color: #0d1117;
        --card-bg: #161b22;
        --sidebar-bg: #161b22;
        --text-primary: #c9d1d9;
        --text-secondary: #8b949e;
        --accent-blue: #58a6ff;
        --accent-blue-glow: rgba(56, 139, 253, 0.3);
        --accent-green: #3fb950;
        --accent-red: #f85149;
        --accent-orange: #d29922;
        --accent-teal: #39c5cf;
        --border-color: #30363d;
        --card-hover: #21262d;
        --chart-grid: #30363d;
      }
  
      .popup-container {
        width: 100%;
        max-width: 400px;
        background-color: var(--card-bg);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        overflow: hidden;
        position: relative;
      }
  
      .popup-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 16px;
      }
  
      .popup-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
  
      .popup-icon.warning {
        background-color: rgba(248, 81, 73, 0.1);
        color: var(--accent-red);
      }
  
      .popup-icon.success {
        background-color: rgba(63, 185, 80, 0.1);
        color: var(--accent-green);
      }
  
      .popup-icon.info {
        background-color: rgba(88, 166, 255, 0.1);
        color: var(--accent-blue);
      }
  
      .popup-close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-secondary);
        font-size: 18px;
        padding: 4px;
      }
  
      .popup-close svg {
          fill: var(--text-secondary);
      }
  
      .popup-content {
        padding: 0 16px 16px;
        color: #333;
      }
  
      .popup-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--text-primary);
      }
  
      .popup-description {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 16px;
      }
  
      .popup-actions {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        padding: 16px;
        border-top: 1px solid var(--border-color);
      }
  
      .btn {
        padding: 6px 16px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 80px;
        border: 1px solid transparent;
      }
  
      .btn-cancel {
        background-color: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-secondary);
        transition: background-color .3s ease;
      }
  
      .btn-cancel:hover {
        background-color: var(--bg-color);
      }
  
      .btn-delete {
        background-color: var(--accent-red);
        color: white;
        transition: background-color .3s ease;
      }
  
      .btn-delete:hover {
        background-color: #cf222e;
      }
  
      .btn-confirm-purple {
        background-color: var(--accent-green);
        opacity: .8;
        color: white;
        transition: opacity .3s ease;
      }
  
      .btn-confirm-purple:hover {
        opacity: 1;
      }
  
      .btn-icon {
        margin-right: 6px;
        font-size: 16px;
      }
  
      /* Responsive adjustments */
      @media (max-width: 480px) {
        .popup-container {
          max-width: 100%;
        }
        
        .popup-actions {
          flex-direction: column-reverse;
        }
        
        .btn {
          width: 100%;
          padding: 8px 16px;
        }
      }
    `;
  document.head.appendChild(style);
}

/**
 * Creates a delete confirmation popup
 * @param {string} title - Popup title
 * @param {string} description - Popup description
 * @param {function} onConfirm - Callback when delete is confirmed
 * @param {function} onCancel - Callback when cancelled
 * @returns {HTMLElement} The popup element
 */
function deletePopup(
  title = "You are about to delete task",
  description = "Are you sure you want to delete? This action cannot be undone.",
  onConfirm,
  onCancel,
  container = document.body
) {
  const popup = document.createElement("div");
  popup.className = "popup-container";

  popup.innerHTML = `
        <div class="popup-header">
        <div class="popup-icon warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        </div>
        <button class="popup-close">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        </button>
        </div>
        <div class="popup-content">
        <h3 class="popup-title">${title}</h3>
        <p class="popup-description">${description}</p>
        </div>
        <div class="popup-actions">
        <button class="btn btn-cancel cancel-btn">Cancel</button>
        <button class="btn btn-delete delete-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
            Delete
        </button>
        </div>
    `;

  // Add event listeners
  const closeBtn = popup.querySelector(".popup-close");
  const cancelBtn = popup.querySelector(".cancel-btn");
  const deleteBtn = popup.querySelector(".delete-btn");

  function closePopup() {
    container.removeChild(popup);
  }

  closeBtn.addEventListener("click", () => {
    closePopup();
    if (onCancel) onCancel();
  });

  cancelBtn.addEventListener("click", () => {
    closePopup();
    if (onCancel) onCancel();
  });

  deleteBtn.addEventListener("click", () => {
    closePopup();
    if (onConfirm) onConfirm();
  });

  return popup;
}

/**
 * Creates a confirmation popup
 * @param {string} title - Popup title
 * @param {string} description - Popup description
 * @param {function} onConfirm - Callback when confirmed
 * @param {function} onCancel - Callback when cancelled
 * @returns {HTMLElement} The popup element
 */
function confirmPopup(
  title = "Confirm action",
  description = "Are you sure you want to proceed with this action?",
  onConfirm,
  onCancel,
  container = document.body
) {
  const popup = document.createElement("div");
  popup.className = "popup-container";

  popup.innerHTML = `
        <div class="popup-header">
        <div class="popup-icon success">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
        </div>
        <button class="popup-close">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        </button>
        </div>
        <div class="popup-content">
        <h3 class="popup-title">${title}</h3>
        <p class="popup-description">${description}</p>
        </div>
        <div class="popup-actions">
        <button class="btn btn-cancel cancel-btn">Cancel</button>
        <button class="btn btn-confirm-purple confirm-btn">Confirm</button>
        </div>
    `;

  // Add event listeners
  const closeBtn = popup.querySelector(".popup-close");
  const cancelBtn = popup.querySelector(".cancel-btn");
  const confirmBtn = popup.querySelector(".confirm-btn");

  function closePopup() {
    container.removeChild(popup);
  }

  closeBtn.addEventListener("click", () => {
    closePopup();
    if (onCancel) onCancel();
  });

  cancelBtn.addEventListener("click", () => {
    closePopup();
    if (onCancel) onCancel();
  });

  confirmBtn.addEventListener("click", () => {
    closePopup();
    if (onConfirm) onConfirm();
  });

  return popup;
}

/**
 * Creates an information/notice popup
 * @param {string} title - Popup title
 * @param {string} description - Popup description
 * @param {function} onConfirm - Callback when confirmed
 * @param {function} onCancel - Callback when cancelled
 * @returns {HTMLElement} The popup element
 */
function noticePopup(
  title = "Notice",
  description = "Please take note of this information.",
  onConfirm,
  onCancel,
  container = document.body
) {
  const popup = document.createElement("div");
  popup.className = "popup-container";

  popup.innerHTML = `
        <div class="popup-header">
        <div class="popup-icon info">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
        </div>
        <button class="popup-close">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        </button>
        </div>
        <div class="popup-content">
        <h3 class="popup-title">${title}</h3>
        <p class="popup-description">${description}</p>
        </div>
        <div class="popup-actions">
        <button class="btn btn-cancel cancel-btn">Cancel</button>
        <button class="btn btn-confirm-purple confirm-btn">OK</button>
        </div>
    `;

  // Add event listeners
  const closeBtn = popup.querySelector(".popup-close");
  const cancelBtn = popup.querySelector(".cancel-btn");
  const confirmBtn = popup.querySelector(".confirm-btn");

  function closePopup() { 
    container.removeChild(popup);
  }

  closeBtn.addEventListener("click", () => {
    closePopup();
    if (onCancel) onCancel();
  });

  cancelBtn.addEventListener("click", () => {
    closePopup();
    if (onCancel) onCancel();
  });

  confirmBtn.addEventListener("click", () => {
    closePopup();
    if (onConfirm) onConfirm();
  });

  return popup;
}

// Export the functions if using modules
export { deletePopup, confirmPopup, noticePopup, addPopupStyles };
