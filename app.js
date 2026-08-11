/**
 * XMB (CrossMediaBar) Portfolio Navigation Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // ICON THEME CONFIGURATION
  // Edit or comment/uncomment one line below to change the theme!
  // ==========================================================================
  // Load data from global object window.XMB_MENU_DATA
  const menuData = window.XMB_MENU_DATA;
  const ICON_THEME = menuData.ICON_THEME;
  const ICON_MAPS = menuData.ICON_MAPS;
  const CUSTOM_FOLDER_ICONS = menuData.CUSTOM_FOLDER_ICONS;
  const FOLDER_ITEMS = menuData.FOLDER_ITEMS;
  const PROFILE_DETAILS = menuData.PROFILE_DETAILS;
  const translations = menuData.TRANSLATIONS;

  const DEFAULT_CATEGORY_SVGs = {
    design: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>`,
    civil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" /><line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /></svg>`,
    electronics: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 18l6-6-6-6M8 6L2 12l6 6" /></svg>`,
    education: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" /></svg>`,
    profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>`
  };

  // Render initial markup from XMB_MENU_DATA
  function buildXMBMarkup() {
    const listData = translations.en; // Default to English for rendering markup classes
    const categoriesKeys = ['design', 'civil', 'electronics', 'education', 'profile'];
    let htmlContent = '';

    categoriesKeys.forEach((catKey, colIdx) => {
      const foldersList = listData.folders[colIdx] || [];
      htmlContent += `
        <section class="xmb-column" data-index="${colIdx}">
          <div class="category-header">
            <div class="category-icon"></div>
            <span class="category-label">${listData.categories[colIdx] || catKey}</span>
          </div>
          <div class="vertical-list">`;

      foldersList.forEach((folderTitle, folderIdx) => {
        htmlContent += `
            <div class="folder-card" data-subindex="${folderIdx}">
              <div class="folder-icon-wrapper"></div>
              <div class="folder-info">
                <h3 class="folder-title">${folderTitle}</h3>
              </div>
            </div>`;
      });

      htmlContent += `
          </div>
        </section>`;
    });

    const horizontalBar = document.getElementById('horizontal-bar');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    while (tempDiv.firstChild) {
      horizontalBar.insertBefore(tempDiv.firstChild, horizontalBar.querySelector('#sub-items-column') || null);
    }
  }

  buildXMBMarkup();

  // Navigation State
  let categoryIndex = 0;
  const totalCategories = translations.en.categories.length;
  const folderIndexes = Array(totalCategories).fill(0);

  // Audio state & Synthesizer
  let audioMuted = false;
  let audioCtx = null;

  // DOM Elements
  const stage = document.getElementById('xmb-stage');
  const horizontalBar = document.getElementById('horizontal-bar');
  const columns = document.querySelectorAll('.xmb-column');
  const clockEl = document.getElementById('clock');
  const modalEl = document.getElementById('folder-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');
  const audioToggle = document.getElementById('audio-toggle');
  const audioIconOn = document.getElementById('audio-icon-on');
  const audioIconOff = document.getElementById('audio-icon-off');
  const langToggle = document.getElementById('lang-toggle');

  // Subtle Glow Colors for Each Category Icon
  const CATEGORY_GLOWS = {
    design: 'rgba(255, 190, 90, 0.75)',       // Golden Amber
    civil: 'rgba(75, 195, 255, 0.75)',        // Neon Blue
    electronics: 'rgba(105, 225, 135, 0.75)',  // Emerald Green
    education: 'rgba(195, 135, 255, 0.75)',    // Violet Purple
    profile: 'rgba(255, 135, 185, 0.75)'      // Soft Rose
  };

  function applyIconTheme() {
    const activeMap = ICON_MAPS[ICON_THEME] || ICON_MAPS.default;
    const activeCustomIcons = Object.assign({}, CUSTOM_FOLDER_ICONS.default || {}, CUSTOM_FOLDER_ICONS[ICON_THEME] || {});
    const categories = ['design', 'civil', 'electronics', 'education', 'profile'];
    categories.forEach((catKey, idx) => {
      const col = columns[idx];
      if (!col) return;
      const catIconBox = col.querySelector('.category-icon');
      if (catIconBox) {
        catIconBox.innerHTML = `<img src="${activeMap[catKey]}" alt="${catKey}">`;
        catIconBox.style.setProperty('--category-glow', CATEGORY_GLOWS[catKey] || 'rgba(255, 255, 255, 0.85)');
      }
    });

    columns.forEach((col, colIdx) => {
      const folders = col.querySelectorAll('.folder-card');
      folders.forEach((folder, folderIdx) => {
        const wrapper = folder.querySelector('.folder-icon-wrapper');
        if (wrapper) {
          const customKey = `${colIdx}_${folderIdx}`;
          const iconPath = activeCustomIcons[customKey] || activeMap.folder;
          wrapper.innerHTML = `<img src="${iconPath}" alt="folder">`;
        }
      });
    });
  }

  applyIconTheme();

  const flagSVGs = {
    en: `<svg class="flag-icon" viewBox="0 0 60 30" width="16" height="11"><clipPath id="uk"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="ukt"><path d="M30,15 h30 v15 z v-30 h-30 z h-30 v-15 z v30 h30 z"/></clipPath><g clip-path="url(#uk)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#ukt)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>`,
    es: `<svg class="flag-icon" viewBox="0 0 60 30" width="16" height="11"><rect width="60" height="10" fill="#74ACDF"/><rect y="10" width="60" height="10" fill="#FFFFFF"/><rect y="20" width="60" height="10" fill="#74ACDF"/><circle cx="30" cy="15" r="3" fill="#F6B40E"/></svg>`,
    de: `<svg class="flag-icon" viewBox="0 0 60 30" width="16" height="11"><rect width="60" height="10" fill="#000000"/><rect y="10" width="60" height="10" fill="#DD0000"/><rect y="20" width="60" height="10" fill="#FFCC00"/></svg>`
  };

  function applyLanguage(lang) {
    const data = translations[lang];
    if (!data) return;

    // Update category labels and folder items
    columns.forEach((col, colIdx) => {
      const labelEl = col.querySelector('.category-label');
      if (labelEl && data.categories[colIdx]) {
        labelEl.textContent = data.categories[colIdx];
      }

      const folderCards = col.querySelectorAll('.folder-card');
      folderCards.forEach((folder, folderIdx) => {
        const titleEl = folder.querySelector('.folder-title');
        if (titleEl && data.folders[colIdx] && data.folders[colIdx][folderIdx]) {
          titleEl.textContent = data.folders[colIdx][folderIdx];
        }
      });
    });

    // Re-render subitems in active language
    if (currentMenuLayer === 'subitem' || currentMenuLayer === 'subitem_detail') {
      renderSubItems(true); // Redraw item title/desc labels in DOM!
    }

    // Update open detail panel text if active
    if (currentMenuLayer === 'subitem_detail' && activeSubItems[subItemIndex]) {
      renderDetailPanelContent(activeSubItems[subItemIndex]);
    } else if (currentMenuLayer === 'profile_detail') {
      const activeFolderIdx = folderIndexes[categoryIndex];
      const key = `${categoryIndex}_${activeFolderIdx}`;
      const detail = PROFILE_DETAILS[key];
      if (detail) {
        renderDetailPanelContent(detail);
      }
    }

    // Update footer hints
    const hintItems = document.querySelectorAll('.controls-hint .hint-item');
    if (hintItems.length >= 3) {
      if (hintItems[0].childNodes.length > 2) hintItems[0].childNodes[2].textContent = ' ' + data.hints[0];
      if (hintItems[1].childNodes.length > 2) hintItems[1].childNodes[2].textContent = ' ' + data.hints[1];
      if (hintItems[2].childNodes.length > 1) hintItems[2].childNodes[1].textContent = ' ' + data.hints[2];
    }

    if (langToggle && flagSVGs[lang]) {
      langToggle.innerHTML = `${flagSVGs[lang]}<span class="lang-text">${lang.toUpperCase()}</span>`;
    }
  }

  const languages = ['en', 'es', 'de'];
  let currentLangIdx = 0;

  if (langToggle) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      langToggle.blur();
      currentLangIdx = (currentLangIdx + 1) % languages.length;
      const newLang = languages[currentLangIdx];
      applyLanguage(newLang);
      playSound('move');
    });
  }

  // Spacing Configuration (Computed dynamically from CSS)
  let columnGap = 220;
  let folderGap = 98;
  const headerClearance = 140; // Clearance offset so passed items float ABOVE category icon

  function calculateDimensions() {
    // 1. Read --folder-gap directly from CSS root
    const rootStyles = window.getComputedStyle(document.documentElement);
    const cssFolderGap = parseFloat(rootStyles.getPropertyValue('--folder-gap'));
    if (!isNaN(cssFolderGap)) {
      folderGap = cssFolderGap;
    }

    // 2. Calculate exact horizontal step (Column Width + CSS Flex Gap)
    const barStyles = window.getComputedStyle(horizontalBar);
    const flexGap = parseFloat(barStyles.getPropertyValue('gap')) || 120;
    const firstCol = columns[0];
    const colWidth = firstCol ? firstCol.offsetWidth : 100;

    columnGap = colWidth + flexGap;
  }

  calculateDimensions();
  window.addEventListener('resize', () => {
    calculateDimensions();
    updateXMBPosition();
  });

  // Audio File Preloader
  const audioFiles = {
    move: new Audio('Sounds/03%20-%20SND%20Cursor.mp3'),
    close: new Audio('Sounds/07%20-%20SND%20Cancel.mp3'),
    open: new Audio('Sounds/10%20-%20SND%20System%20Ng.mp3'),
    startup: new Audio('Sounds/startup-sound-2.mp3')
  };

  function playSound(type) {
    if (audioMuted) return;

    try {
      const sound = audioFiles[type];
      if (sound) {
        // Clone node for instant, overlapping playback during rapid scrolling
        const playInstance = sound.cloneNode();
        playInstance.volume = 0.7;
        playInstance.play().catch(() => { });
      }
    } catch (e) {
      console.warn('Audio playback failed', e);
    }
  }

  let startupSoundPlayed = false;
  function triggerStartupSound() {
    if (startupSoundPlayed || audioMuted) return;
    try {
      const sound = audioFiles.startup;
      if (sound) {
        sound.currentTime = 1;
        sound.volume = 0.7;
        sound.play().then(() => {
          startupSoundPlayed = true;
        }).catch((err) => {
          console.warn('Autoplay blocked by browser. Startup sound will play on first click/key.', err);
        });
      }
    } catch (e) { }
  }

  // Pre-unlock audio context and play startup sound on first user gesture if autoplay was blocked
  ['pointerdown', 'keydown', 'click'].forEach(evt => {
    window.addEventListener(evt, () => triggerStartupSound(), { once: true });
  });

  // Audio Mute Toggle
  audioToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    audioToggle.blur();
    audioMuted = !audioMuted;
    if (audioMuted) {
      audioIconOn.classList.add('hidden');
      audioIconOff.classList.remove('hidden');
    } else {
      audioIconOn.classList.remove('hidden');
      audioIconOff.classList.add('hidden');
      playSound('move');
    }
  });

  // Clock Update
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    clockEl.textContent = `${hours}:${minutes} ${ampm}`;
  }
  updateClock();
  setInterval(updateClock, 10000);

  // Menu Navigation States (PS3 style nesting layers)
  let currentMenuLayer = 'category'; // 'category' | 'subitem' | 'profile_detail'
  let subItemIndex = 0;
  let activeSubItems = [];



  // Position & Class Updates (Butter Smooth XMB Navigation)
  function updateXMBPosition() {
    calculateDimensions();

    // Toggle body class for submenu states
    document.body.classList.toggle('xmb-submenu-open', currentMenuLayer !== 'category');
    document.body.classList.toggle('xmb-subitem-detail-open', currentMenuLayer === 'subitem_detail');

    // 1. Move Horizontal Bar (Shift stage left if sub-menu/details are open)
    let stageOffset = 0;
    if (currentMenuLayer === 'subitem_detail') {
      stageOffset = -520; // Shift extra left when item detail is active
    } else if (currentMenuLayer !== 'category') {
      stageOffset = -260; // Shift parent columns left to fit new column
    }
    const translateX = -categoryIndex * columnGap + stageOffset;
    horizontalBar.style.transform = `translateX(${translateX}px)`;

    // Position sub-menus next to the selected column
    const drawer = document.getElementById('sub-items-column');
    const panel = document.getElementById('profile-detail-panel');

    if (drawer) {
      const leftPos = (categoryIndex * columnGap) + 160;
      drawer.style.left = `${leftPos}px`;
    }

    if (panel) {
      let panelLeft = (categoryIndex * columnGap) + 160;
      if (currentMenuLayer === 'subitem_detail') {
        panelLeft = (categoryIndex * columnGap) + 240; // Align closer to the subfolder card icon
      }
      panel.style.left = `${panelLeft}px`;
    }

    // 2. Update Columns & Individual Folder Cards
    columns.forEach((col, colIdx) => {
      const isColActive = colIdx === categoryIndex;
      col.classList.toggle('active-col', isColActive);

      // Distance-based horizontal opacity
      let targetColOpacity = 0;
      if (currentMenuLayer !== 'category') {
        // If submenu is open, only show the active category column, hide everything else (0% opacity)
        targetColOpacity = isColActive ? 1.0 : 0.0;
      } else {
        // Normal horizontal fade
        const colDistance = Math.abs(colIdx - categoryIndex);
        const colOpacities = [1.0, 0.5, 0.25, 0.10, 0.05];
        targetColOpacity = colOpacities[Math.min(colDistance, colOpacities.length - 1)];
      }
      col.style.opacity = targetColOpacity;

      const activeFolderIdx = folderIndexes[colIdx];
      const folders = col.querySelectorAll('.folder-card');

      folders.forEach((folder, folderIdx) => {
        const isFolderActive = isColActive && folderIdx === activeFolderIdx;
        const isFolderPassed = folderIdx < activeFolderIdx;

        folder.classList.toggle('active-folder', isFolderActive);
        folder.classList.toggle('passed-folder', isFolderPassed);

        let translateY = 0;
        if (isFolderPassed) {
          translateY = -(activeFolderIdx - folderIdx) * folderGap - headerClearance;
        } else {
          translateY = (folderIdx - activeFolderIdx) * folderGap;
        }

        folder.style.transform = `translateY(${translateY}px)`;

        // Distance-based vertical opacity
        let targetFolderOpacity = 0;
        if (currentMenuLayer !== 'category') {
          // If submenu is open, show ONLY the active folder card in the column, hide others
          targetFolderOpacity = isFolderActive ? 1.0 : 0.0;
        } else {
          // Normal vertical fade
          const folderDistance = Math.abs(folderIdx - activeFolderIdx);
          const folderOpacities = [1.0, 0.45, 0.15, 0.05];
          targetFolderOpacity = folderOpacities[Math.min(folderDistance, folderOpacities.length - 1)];
        }

        // Scale opacity down further if the column itself is inactive
        const columnScale = isColActive ? 1.0 : 0.55;
        folder.style.opacity = targetFolderOpacity * columnScale;
      });
    });
  }

  // Navigation Logic
  function moveCategory(dir) {
    const prev = categoryIndex;
    categoryIndex = Math.max(0, Math.min(totalCategories - 1, categoryIndex + dir));
    if (prev !== categoryIndex) {
      playSound('move');
      updateXMBPosition();
    }
  }

  function moveFolder(dir) {
    const foldersList = columns[categoryIndex].querySelectorAll('.folder-card');
    if (foldersList.length === 0) return;
    const currentFolder = folderIndexes[categoryIndex];
    const newFolder = Math.max(0, Math.min(foldersList.length - 1, currentFolder + dir));
    if (currentFolder !== newFolder) {
      folderIndexes[categoryIndex] = newFolder;
      playSound('move');
      updateXMBPosition();
    }
  }

  // ==========================================================================
  // PS3 XMB Background Gradient Pipeline (linkev/PlayStation-3-XMB Specs)
  // ==========================================================================
  const BG_PRESETS_DAY = {
    '01': { angleDeg: 90.25, start: [197, 197, 197], end: [201, 201, 201] },
    '02': { angleDeg: 67, start: [203, 158, 13], end: [219, 214, 41] },
    '03': { angleDeg: 106, start: [142, 190, 40], end: [104, 168, 22] },
    '04': { angleDeg: 136.75, start: [216, 182, 182], end: [231, 66, 117] },
    '05': { angleDeg: 1.5, start: [19, 108, 19], end: [24, 156, 24] },
    '06': { angleDeg: 148.75, start: [198, 120, 238], end: [103, 77, 161] },
    '07': { angleDeg: 26.5, start: [46, 154, 214], end: [31, 100, 180] },
    '08': { angleDeg: 90, start: [30, 60, 130], end: [15, 30, 80] },
    '09': { angleDeg: 110, start: [120, 70, 160], end: [70, 40, 110] },
    '10': { angleDeg: 45, start: [210, 120, 30], end: [160, 80, 20] },
    '11': { angleDeg: 90, start: [120, 90, 70], end: [70, 50, 40] },
    '12': { angleDeg: 135, start: [180, 30, 40], end: [110, 15, 20] }
  };

  const BG_PRESETS_NIGHT = {
    '01': { angleDeg: 89.75, start: [120, 120, 120], end: [6, 7, 10] },
    '02': { angleDeg: 93.75, start: [160, 140, 60], end: [6, 7, 10] },
    '03': { angleDeg: 90.25, start: [100, 130, 60], end: [6, 7, 10] },
    '04': { angleDeg: 90, start: [160, 90, 120], end: [6, 7, 10] },
    '05': { angleDeg: 90, start: [20, 90, 40], end: [6, 7, 10] },
    '06': { angleDeg: 90, start: [110, 60, 140], end: [6, 7, 10] },
    '07': { angleDeg: 90, start: [30, 90, 160], end: [6, 7, 10] },
    '08': { angleDeg: 90, start: [20, 50, 110], end: [6, 7, 10] },
    '09': { angleDeg: 90, start: [80, 40, 110], end: [6, 7, 10] },
    '10': { angleDeg: 90, start: [140, 70, 20], end: [6, 7, 10] },
    '11': { angleDeg: 90, start: [80, 50, 30], end: [6, 7, 10] },
    '12': { angleDeg: 90, start: [120, 20, 30], end: [6, 7, 10] }
  };

  const CLASSIC_DARK = { angleDeg: 90, start: [25, 28, 38], end: [6, 7, 10] };
  let currentTheme = 'classic';

  function renderSubItems(initial = false) {
    const listEl = document.getElementById('sub-items-list');
    if (!listEl) return;

    if (initial) {
      listEl.innerHTML = '';
      if (activeSubItems.length === 0) {
        return;
      }

      activeSubItems.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'sub-item-card';
        card.setAttribute('data-subitem-index', idx);

        const activeMap = ICON_MAPS[ICON_THEME] || ICON_MAPS.default;
        const iconPath = activeMap.folder;

        const lang = languages[currentLangIdx] || 'en';
        const title = (item.title && typeof item.title === 'object') ? (item.title[lang] || item.title.en) : item.title;
        const desc = (item.desc && typeof item.desc === 'object') ? (item.desc[lang] || item.desc.en) : item.desc;

        card.innerHTML = `
          <div class="sub-item-icon-wrapper">
            <img src="${iconPath}" alt="item">
          </div>
          <div class="sub-item-info">
            <h3 class="sub-item-title">${title}</h3>
            <p class="sub-item-desc">${desc}</p>
          </div>
        `;

        card.addEventListener('click', (e) => {
          e.stopPropagation();
          if (subItemIndex !== idx) {
            subItemIndex = idx;
            playSound('move');
            renderSubItems(false);
          } else {
            openSubItemDetail(item);
          }
        });

        listEl.appendChild(card);
      });
    }

    // Update coordinates & styles (this fires transitions smoothly!)
    const cards = listEl.querySelectorAll('.sub-item-card');
    cards.forEach((card, idx) => {
      const isItemActive = idx === subItemIndex;
      card.classList.toggle('active-item', isItemActive);

      // Uniform spacing above and below selected item (no headerClearance)
      const translateY = (idx - subItemIndex) * folderGap;
      card.style.transform = `translateY(${translateY}px)`;

      const distance = Math.abs(idx - subItemIndex);
      const itemOpacities = [1.0, 0.45, 0.15, 0.05];
      card.style.opacity = itemOpacities[Math.min(distance, itemOpacities.length - 1)];
      card.style.filter = isItemActive ? 'blur(0px)' : 'blur(1.5px)';
    });
  }

  // ==========================================================================
  // Detail Scroll Control Settings (Tweak scroll speed and step sizes here)
  // ==========================================================================
  const SCROLL_SPEED_FACTOR = 1; // Controls mouse wheel scroll speed (lower = slower/smoother)
  const SCROLL_KEY_STEP = 40;       // Pixels moved per ArrowUp/ArrowDown key press

  function renderDetailPanelContent(detail) {
    const panel = document.getElementById('profile-detail-panel');
    const bodyEl = document.getElementById('profile-detail-body');
    const scrollArea = document.getElementById('profile-detail-scroll-area');

    if (!detail || !panel) return;

    const lang = languages[currentLangIdx] || 'en';
    const title = (detail.title && typeof detail.title === 'object') ? (detail.title[lang] || detail.title.en) : detail.title;

    bodyEl.innerHTML = '';

    const layoutWrapper = document.createElement('div');
    layoutWrapper.className = 'timeline-layout-wrapper';

    const textFlow = document.createElement('div');
    textFlow.className = 'timeline-text-flow';

    const imagesFlow = document.createElement('div');
    imagesFlow.className = 'timeline-images-flow';

    // 1. Render item/folder title at top of text flow
    if (title) {
      const titleEl = document.createElement('h2');
      titleEl.className = 'profile-detail-title';
      titleEl.textContent = title;
      textFlow.appendChild(titleEl);
    }

    // 2. Render timeline text blocks & independent images flow
    if (detail.sections && detail.sections.length > 0) {
      detail.sections.forEach((sec, idx) => {
        const secBlock = document.createElement('div');
        secBlock.className = 'timeline-section-block';
        if (idx > 0) secBlock.style.marginTop = '16px';

        if (sec.role) {
          const roleEl = document.createElement('h4');
          roleEl.className = 'section-role';
          roleEl.textContent = sec.role[lang] || sec.role.en;
          secBlock.appendChild(roleEl);
        }

        if (sec.date) {
          const dateEl = document.createElement('div');
          dateEl.className = 'section-date';
          dateEl.textContent = sec.date[lang] || sec.date.en;
          secBlock.appendChild(dateEl);
        }

        if (sec.text) {
          const rawText = sec.text[lang] || sec.text.en || '';
          const paragraphs = rawText.split(/<br\s*\/?>\s*<br\s*\/?>/i);
          paragraphs.forEach(pHtml => {
            if (pHtml.trim()) {
              const textP = document.createElement('p');
              textP.className = 'section-text-p';
              textP.innerHTML = pHtml.trim();
              secBlock.appendChild(textP);
            }
          });
        }

        if (sec.bullets) {
          const bulletsList = sec.bullets[lang] || sec.bullets.en || [];
          bulletsList.forEach(bText => {
            const bP = document.createElement('p');
            bP.className = 'section-bullet';
            bP.textContent = bText;
            secBlock.appendChild(bP);
          });
        }

        textFlow.appendChild(secBlock);

        if (sec.img) {
          const imgCol = document.createElement('div');
          imgCol.className = 'timeline-img-col' + (sec.squared ? ' squared' : '');
          const imgEl = document.createElement('img');
          imgEl.src = sec.img;
          imgEl.alt = 'section media';
          imgCol.appendChild(imgEl);
          imagesFlow.appendChild(imgCol);
        }
      });
    } else {
      const bodyText = (detail.body && typeof detail.body === 'object') ? (detail.body[lang] || detail.body.en) : (detail.desc && typeof detail.desc === 'object') ? (detail.desc[lang] || detail.desc.en) : (detail.body || detail.desc || '');

      const secBlock = document.createElement('div');
      secBlock.className = 'timeline-section-block';

      const paragraphs = bodyText.split(/<br\s*\/?>\s*<br\s*\/?>/i);
      paragraphs.forEach(pHtml => {
        if (pHtml.trim()) {
          const textP = document.createElement('p');
          textP.className = 'section-text-p';
          textP.innerHTML = pHtml.trim();
          secBlock.appendChild(textP);
        }
      });
      textFlow.appendChild(secBlock);

      if (detail.img) {
        const imgCol = document.createElement('div');
        imgCol.className = 'timeline-img-col' + (detail.squared ? ' squared' : '');
        const imgEl = document.createElement('img');
        imgEl.src = detail.img;
        imgEl.alt = 'section media';
        imgCol.appendChild(imgEl);
        imagesFlow.appendChild(imgCol);
      }
    }

    layoutWrapper.appendChild(textFlow);
    if (imagesFlow.children.length > 0) {
      layoutWrapper.appendChild(imagesFlow);
    }

    bodyEl.appendChild(layoutWrapper);

    if (scrollArea) {
      scrollArea.scrollTop = 0;
      setTimeout(updateDetailScrollEffect, 30);
    }
  }

  function updateDetailScrollEffect() {
    const scrollArea = document.getElementById('profile-detail-scroll-area');
    const gradientBar = document.getElementById('detail-scroll-gradient');
    const arrowInd = document.getElementById('detail-scroll-arrow');

    if (!scrollArea || !gradientBar || !arrowInd) return;

    const scrollTop = scrollArea.scrollTop;
    const maxScroll = Math.max(1, scrollArea.scrollHeight - scrollArea.clientHeight);
    const scrollRatio = Math.min(1, Math.max(0, scrollTop / maxScroll));

    const arrowPct = scrollRatio * 100;
    arrowInd.style.top = `${arrowPct}%`;

    const stop1 = Math.max(0, arrowPct - 25).toFixed(1);
    const stop2 = arrowPct.toFixed(1);
    const stop3 = Math.min(100, arrowPct + 25).toFixed(1);

    gradientBar.style.background = `linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) ${stop1}%, rgba(255,255,255,1) ${stop2}%, rgba(255,255,255,0.2) ${stop3}%, rgba(255,255,255,0) 100%)`;

    const areaRect = scrollArea.getBoundingClientRect();
    const OFFSET_PX = 60;
    const viewportTop = areaRect.top + OFFSET_PX;
    const viewportBottom = areaRect.bottom - OFFSET_PX;

    // Symmetrical pixel fade distance for top & bottom exits
    const FADE_ZONE_PX = 90;

    // 1. Text elements fading logic
    const textElements = scrollArea.querySelectorAll('.profile-detail-title, .section-role, .section-date, .section-text-p, .section-bullet');
    textElements.forEach(el => {
      const elRect = el.getBoundingClientRect();
      const elCenterY = elRect.top + elRect.height / 2;
      let opacity = 1.0;

      if (elCenterY < viewportTop) {
        const distFromTop = elCenterY - (viewportTop - FADE_ZONE_PX);
        opacity = Math.max(0.0, Math.min(1.0, distFromTop / FADE_ZONE_PX));
      } else if (elCenterY > viewportBottom) {
        const distFromBottom = (viewportBottom + FADE_ZONE_PX) - elCenterY;
        opacity = Math.max(0.0, Math.min(1.0, distFromBottom / FADE_ZONE_PX));
      }

      el.style.opacity = opacity.toFixed(2);
    });

    // 2. Image elements fading logic (uses top edge for bottom exit & bottom edge for top exit)
    const images = scrollArea.querySelectorAll('.timeline-img-col');
    images.forEach(img => {
      const imgRect = img.getBoundingClientRect();
      let opacity = 1.0;

      if (imgRect.bottom < viewportTop) {
        const distFromTop = imgRect.bottom - (viewportTop - FADE_ZONE_PX);
        opacity = Math.max(0.0, Math.min(1.0, distFromTop / FADE_ZONE_PX));
      } else if (imgRect.top > viewportBottom) {
        const distFromBottom = (viewportBottom + FADE_ZONE_PX) - imgRect.top;
        opacity = Math.max(0.0, Math.min(1.0, distFromBottom / FADE_ZONE_PX));
      }

      img.style.opacity = opacity.toFixed(2);
    });
  }

  function openSubItemDetail(item) {
    currentMenuLayer = 'subitem_detail';
    const panel = document.getElementById('profile-detail-panel');
    renderDetailPanelContent(item);
    panel.classList.add('subitem-detail-mode');
    panel.classList.add('active');
    playSound('open');
    updateXMBPosition();
  }

  function openCurrentFolder() {
    const activeFolderIdx = folderIndexes[categoryIndex];
    const key = `${categoryIndex}_${activeFolderIdx}`;

    if (categoryIndex === 4) {
      const detail = PROFILE_DETAILS[key];
      if (detail) {
        currentMenuLayer = 'profile_detail';
        const panel = document.getElementById('profile-detail-panel');
        renderDetailPanelContent(detail);
        panel.classList.add('active');
        playSound('open');
        updateXMBPosition();
      }
    } else {
      currentMenuLayer = 'subitem';
      activeSubItems = FOLDER_ITEMS[key] || [];
      subItemIndex = 0;

      const drawer = document.getElementById('sub-items-column');
      drawer.classList.add('active');

      renderSubItems(true);
      playSound('open');
      updateXMBPosition();
    }
  }

  function closeCurrentDrawer() {
    if (currentMenuLayer === 'subitem_detail') {
      currentMenuLayer = 'subitem';
      const panel = document.getElementById('profile-detail-panel');
      if (panel) {
        panel.classList.remove('active');
        panel.classList.remove('subitem-detail-mode');
      }
      playSound('close');
      updateXMBPosition();
    } else if (currentMenuLayer === 'subitem') {
      currentMenuLayer = 'category';
      const drawer = document.getElementById('sub-items-column');
      if (drawer) drawer.classList.remove('active');
      playSound('close');
      updateXMBPosition();
    } else if (currentMenuLayer === 'profile_detail') {
      currentMenuLayer = 'category';
      const panel = document.getElementById('profile-detail-panel');
      if (panel) {
        panel.classList.remove('active');
        panel.classList.remove('subitem-detail-mode');
      }
      playSound('close');
      updateXMBPosition();
    }
  }

  function closeModal() {
    if (!modalEl.classList.contains('hidden')) {
      modalEl.classList.add('hidden');
      playSound('close');
    }
  }

  // Keyboard Event Handlers
  window.addEventListener('keydown', (e) => {
    if (!modalEl.classList.contains('hidden')) {
      if (e.key === 'Escape' || e.key === 'Enter') {
        closeModal();
      }
      return;
    }

    if (currentMenuLayer === 'category') {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          moveCategory(-1);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          moveCategory(1);
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          moveFolder(-1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          moveFolder(1);
          break;
        case 'Enter':
        case ' ':
          openCurrentFolder();
          break;
      }
    } else if (currentMenuLayer === 'subitem') {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (subItemIndex > 0) {
            subItemIndex--;
            playSound('move');
            renderSubItems(false);
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (subItemIndex < activeSubItems.length - 1) {
            subItemIndex++;
            playSound('move');
            renderSubItems(false);
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
        case 'Escape':
        case 'Backspace':
          closeCurrentDrawer();
          break;
        case 'Enter':
        case ' ':
          if (activeSubItems[subItemIndex]) {
            openSubItemDetail(activeSubItems[subItemIndex]);
          }
          break;
      }
    } else if (currentMenuLayer === 'subitem_detail' || currentMenuLayer === 'profile_detail') {
      const scrollArea = document.getElementById('profile-detail-scroll-area');
      switch (e.key) {
        case 'ArrowDown':
        case 's':
        case 'S':
          if (scrollArea) {
            scrollArea.scrollBy({ top: SCROLL_KEY_STEP, behavior: 'smooth' });
            setTimeout(updateDetailScrollEffect, 50);
          }
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (scrollArea) {
            scrollArea.scrollBy({ top: -SCROLL_KEY_STEP, behavior: 'smooth' });
            setTimeout(updateDetailScrollEffect, 50);
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
        case 'Escape':
        case 'Backspace':
          closeCurrentDrawer();
          break;
      }
    }
  });

  // Mouse / Pointer Event Listeners
  columns.forEach((col, colIdx) => {
    const header = col.querySelector('.category-header');
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentMenuLayer !== 'category') {
        closeCurrentDrawer();
        return;
      }
      if (categoryIndex !== colIdx) {
        categoryIndex = colIdx;
        playSound('move');
        updateXMBPosition();
      }
    });

    const folders = col.querySelectorAll('.folder-card');
    folders.forEach((folder, folderIdx) => {
      folder.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentMenuLayer !== 'category') {
          closeCurrentDrawer();
          return;
        }
        if (categoryIndex !== colIdx) {
          categoryIndex = colIdx;
          folderIndexes[colIdx] = folderIdx;
          playSound('move');
          updateXMBPosition();
        } else if (folderIndexes[colIdx] !== folderIdx) {
          folderIndexes[colIdx] = folderIdx;
          playSound('move');
          updateXMBPosition();
        } else {
          openCurrentFolder();
        }
      });
    });
  });

  // Mouse wheel navigation
  let wheelTimeout = null;
  window.addEventListener('wheel', (e) => {
    if (!modalEl.classList.contains('hidden')) return;

    if (currentMenuLayer === 'subitem_detail' || currentMenuLayer === 'profile_detail') {
      const scrollArea = document.getElementById('profile-detail-scroll-area');
      if (scrollArea) {
        scrollArea.scrollTop += e.deltaY * SCROLL_SPEED_FACTOR;
        updateDetailScrollEffect();
      }
      return;
    }

    if (wheelTimeout) return;

    wheelTimeout = setTimeout(() => {
      wheelTimeout = null;
    }, 150);

    if (currentMenuLayer === 'category') {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 20) moveCategory(1);
        else if (e.deltaX < -20) moveCategory(-1);
      } else {
        if (e.deltaY > 20) moveFolder(1);
        else if (e.deltaY < -20) moveFolder(-1);
      }
    } else if (currentMenuLayer === 'subitem') {
      if (e.deltaY > 20) {
        if (subItemIndex < activeSubItems.length - 1) {
          subItemIndex++;
          playSound('move');
          renderSubItems(false);
        }
      } else if (e.deltaY < -20) {
        if (subItemIndex > 0) {
          subItemIndex--;
          playSound('move');
          renderSubItems(false);
        }
      }
    }
  }, { passive: true });

  const detailScrollArea = document.getElementById('profile-detail-scroll-area');
  if (detailScrollArea) {
    detailScrollArea.addEventListener('scroll', updateDetailScrollEffect);
  }

  const trackContainer = document.querySelector('.scroll-track-container');
  if (trackContainer && detailScrollArea) {
    trackContainer.addEventListener('click', (e) => {
      const rect = trackContainer.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      const ratio = Math.max(0, Math.min(1, clickY / rect.height));
      const targetScroll = ratio * (detailScrollArea.scrollHeight - detailScrollArea.clientHeight);
      detailScrollArea.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  }

  // Modal Close Handlers
  modalClose.addEventListener('click', closeModal);
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeModal();
  });

  // Initial Position Setup
  updateXMBPosition();

  // ==========================================================================
  // WebGL 2 PlayStation-3-XMB Engine Integration (linkev/PlayStation-3-XMB)
  // ==========================================================================
  const canvas = document.getElementById('wave-canvas');
  let gl = canvas ? canvas.getContext('webgl2', {
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
  }) : null;

  // Load saved configurator settings from localStorage
  try {
    const savedSpline = localStorage.getItem('xmb_spline_settings');
    const savedParticle = localStorage.getItem('xmb_particle_settings');
    if (savedSpline && window.SPLINE_SETTINGS) Object.assign(window.SPLINE_SETTINGS, JSON.parse(savedSpline));
    if (savedParticle && window.PARTICLE_SETTINGS) Object.assign(window.PARTICLE_SETTINGS, JSON.parse(savedParticle));
  } catch (e) { }

  // ==========================================================================
  // PS4 Style Startup Splash Sequence Pipeline
  // ==========================================================================
  const targetSplineRGB = {
    r: window.SPLINE_SETTINGS ? window.SPLINE_SETTINGS.colorR : 22,
    g: window.SPLINE_SETTINGS ? window.SPLINE_SETTINGS.colorG : 94,
    b: window.SPLINE_SETTINGS ? window.SPLINE_SETTINGS.colorB : 94
  };
  const targetParticleOpacity = window.PARTICLE_SETTINGS ? window.PARTICLE_SETTINGS.opacity : 0.62;

  // Add initial splash-active class
  document.body.classList.add('splash-active');

  // Force black wave without grains at startup
  if (window.SPLINE_SETTINGS) {
    window.SPLINE_SETTINGS.colorR = 0;
    window.SPLINE_SETTINGS.colorG = 0;
    window.SPLINE_SETTINGS.colorB = 0;
  }
  if (window.PARTICLE_SETTINGS) {
    window.PARTICLE_SETTINGS.opacity = 0.0;
  }

  function startPS4SplashSequence() {
    const startTime = performance.now();
    const BLUE_RGB = { r: 12, g: 55, b: 120 }; // PlayStation Bluish color

    // --- TIMING CONFIGURATION (Seconds) ---
    const BLACK_HOLD = 0;         // Initial black wave duration (2s)
    const FADE_TO_BLUE = 2;       // Transition to blue duration (1.5s)
    const BLUE_HOLD = 3;          // Hold blue duration (1.5s -> total blue phase = 3s)
    const FADE_TO_THEME = 2;     // Transition to theme duration (1.5s)

    // Calculated stage checkpoints
    const tStage2Start = BLACK_HOLD;
    const tStage2End = tStage2Start + FADE_TO_BLUE + BLUE_HOLD; // 5.0s
    const tStage3End = tStage2End + FADE_TO_THEME;             // 6.5s

    // Trigger startup sound instantly on splash initialization
    triggerStartupSound();

    function lerp(valStart, valEnd, factor) {
      return valStart + (valEnd - valStart) * factor;
    }

    function smoothstep(t) {
      const clampT = Math.max(0, Math.min(1, t));
      return clampT * clampT * (3 - 2 * clampT);
    }

    function animateSplash() {
      const elapsed = (performance.now() - startTime) / 1000;

      // Stage 1 (0s - 2s): Black wave without grains
      if (elapsed < tStage2Start) {
        if (window.SPLINE_SETTINGS) {
          window.SPLINE_SETTINGS.colorR = 0;
          window.SPLINE_SETTINGS.colorG = 0;
          window.SPLINE_SETTINGS.colorB = 0;
        }
        if (window.PARTICLE_SETTINGS) {
          window.PARTICLE_SETTINGS.opacity = 0.0;
        }
      }
      // Stage 2: Transition to bluish color and grains (smooth transition)
      else if (elapsed < tStage2End) {
        if (!document.body.classList.contains('splash-phase-wave')) {
          document.body.classList.add('splash-phase-wave');
          triggerStartupSound();
        }

        // Show "facundo prosiuk" for 2 seconds during wave entrance
        const timeInStage2 = elapsed - tStage2Start;
        if (timeInStage2 >= 1 && timeInStage2 <= 10) {
          if (!document.body.classList.contains('splash-show-name')) {
            document.body.classList.add('splash-show-name');
          }
        } else {
          if (document.body.classList.contains('splash-show-name')) {
            document.body.classList.remove('splash-show-name');
          }
        }

        const progress = smoothstep((elapsed - tStage2Start) / FADE_TO_BLUE);
        if (window.SPLINE_SETTINGS) {
          window.SPLINE_SETTINGS.colorR = lerp(0, BLUE_RGB.r, progress);
          window.SPLINE_SETTINGS.colorG = lerp(0, BLUE_RGB.g, progress);
          window.SPLINE_SETTINGS.colorB = lerp(0, BLUE_RGB.b, progress);
        }
        if (window.PARTICLE_SETTINGS) {
          window.PARTICLE_SETTINGS.opacity = lerp(0.0, 0.70, progress);
        }
      }
      // Stage 3: Transition to configurator / saved theme
      else if (elapsed < tStage3End) {
        if (document.body.classList.contains('splash-show-name')) {
          document.body.classList.remove('splash-show-name');
        }
        const progress = smoothstep((elapsed - tStage2End) / FADE_TO_THEME);
        if (window.SPLINE_SETTINGS) {
          window.SPLINE_SETTINGS.colorR = lerp(BLUE_RGB.r, targetSplineRGB.r, progress);
          window.SPLINE_SETTINGS.colorG = lerp(BLUE_RGB.g, targetSplineRGB.g, progress);
          window.SPLINE_SETTINGS.colorB = lerp(BLUE_RGB.b, targetSplineRGB.b, progress);
        }
        if (window.PARTICLE_SETTINGS) {
          window.PARTICLE_SETTINGS.opacity = lerp(0.70, targetParticleOpacity, progress);
        }
      }
      // Stage 4 (6.5s+): Reveal UI from blurriness (1.5s smooth unblur fade in)
      else {
        if (window.SPLINE_SETTINGS) {
          window.SPLINE_SETTINGS.colorR = targetSplineRGB.r;
          window.SPLINE_SETTINGS.colorG = targetSplineRGB.g;
          window.SPLINE_SETTINGS.colorB = targetSplineRGB.b;
        }
        if (window.PARTICLE_SETTINGS) {
          window.PARTICLE_SETTINGS.opacity = targetParticleOpacity;
        }

        if (document.body.classList.contains('splash-active')) {
          document.body.classList.remove('splash-active');
        }
        return;
      }

      requestAnimationFrame(animateSplash);
    }

    requestAnimationFrame(animateSplash);
  }

  startPS4SplashSequence();

  if (gl && window.createSplineLayer && window.createParticlesLayer) {
    gl.getExtension('OES_texture_float_linear');
    gl.getExtension('EXT_color_buffer_float');

    function resizeCanvas() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const splineLayer = window.createSplineLayer(gl, canvas);
    const particlesLayer = window.createParticlesLayer(gl, canvas);

    let prevFrameMs = performance.now();
    let splineTimeSec = 0;
    let particlesTimeSec = Math.random() * 1000;

    function renderWebGL(nowMs) {
      const dtSec = Math.max(0, (nowMs - prevFrameMs) / 1000);
      prevFrameMs = nowMs;

      splineTimeSec += dtSec;
      particlesTimeSec += dtSec;

      splineLayer.render(splineTimeSec);
      particlesLayer.render(particlesTimeSec);

      requestAnimationFrame(renderWebGL);
    }

    requestAnimationFrame(renderWebGL);
  } else if (canvas) {
    // 2D Fallback
    const ctx = canvas.getContext('2d');
    function resizeCanvas2D() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas2D();
    window.addEventListener('resize', resizeCanvas2D);

    let step = 0;
    function drawWave2D() {
      const width = canvas.width;
      const height = canvas.height;

      const preset = CLASSIC_DARK;
      const rad = (preset.angleDeg * Math.PI) / 180;
      const cx = width / 2;
      const cy = height / 2;
      const L = Math.abs(width * Math.sin(rad)) + Math.abs(height * Math.cos(rad));

      const x1 = cx - (L / 2) * Math.sin(rad);
      const y1 = cy + (L / 2) * Math.cos(rad);
      const x2 = cx + (L / 2) * Math.sin(rad);
      const y2 = cy - (L / 2) * Math.cos(rad);

      const bgGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      bgGrad.addColorStop(0, `rgb(${preset.start.join(',')})`);
      bgGrad.addColorStop(1, `rgb(${preset.end.join(',')})`);

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      step += 0.008;
      const centerY = height * 0.45;

      const waves = [
        { amplitude: 45, frequency: 0.0025, speed: step, opacity: 0.18, color: 'rgba(255, 255, 255, ', yOffset: -10 },
        { amplitude: 65, frequency: 0.0018, speed: step * 0.8, opacity: 0.12, color: 'rgba(180, 220, 255, ', yOffset: 20 },
        { amplitude: 35, frequency: 0.0032, speed: step * 1.2, opacity: 0.08, color: 'rgba(120, 180, 255, ', yOffset: 40 }
      ];

      waves.forEach(w => {
        ctx.beginPath();
        ctx.moveTo(0, height);
        for (let x = 0; x <= width; x += 5) {
          const y = centerY + w.yOffset + Math.sin(x * w.frequency + w.speed) * w.amplitude + Math.cos(x * 0.001 + w.speed * 0.5) * 20;
          if (x === 0) ctx.lineTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, centerY - 100, 0, height);
        gradient.addColorStop(0, w.color + w.opacity + ')');
        gradient.addColorStop(0.5, w.color + (w.opacity * 0.5) + ')');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fill();
      });

      requestAnimationFrame(drawWave2D);
    }
    drawWave2D();
  }

  // Initial render layout and category positions
  applyLanguage('en');
  updateXMBPosition();
});
