/**
 * Main Application Logic & Controller
 * Math Bilingual Studio
 */

var App = window.App = {
  currentLesson: null,
  activeTab: 'builder-lesson', // 'builder-lesson' | 'builder-quiz' | 'interactive-preview'
  activeSubTabPreview: 'lesson', // 'lesson' | 'quiz'
  previewMode: 'student', // 'student' | 'teacher'
  showVietnamese: true,
  lastFocusedInput: null,
  mathJaxDebounceTimer: null,
  canvasGrapher: null,
  currentOCRImage: null,
  teacherBranding: {
    department: "SỞ GD&ĐT TP. HỒ CHÍ MINH",
    school: "TRƯỜNG THPT CHUYÊN",
    subject: "TỔ TOÁN - TIN HỌC",
    teacherName: "Cô Huỳnh Thị Hà",
    grade: "Khối 12",
    academicYear: "2025 - 2026",
    examType: "BÀI KIỂM TRA ĐÁNH GIÁ ĐỊNH KỲ"
  },

  init() {
    window.App = this;
    this.loadLessonFromStorage();
    this.loadTeacherBranding();
    this.loadCreatedLibrary();
    this.syncCurrentLessonToLibrary(false);
    this.setupEventListeners();
    this.initWorkspaceResizer();
    this.setupSpeechVoices();
    this.renderAll();
    this.initCanvasGrapher();
    this.renderMyExamsTable('all');
    this.renderScaffoldLibraryTable('all');
    this.updateTreeMenuUI();
    if (window.UserGuide) window.UserGuide.init();
    this.switchTab('scaffolding-tutor');
  },

  loadLessonFromStorage() {
    try {
      const saved = localStorage.getItem('math_bilingual_studio_active_lesson');
      if (saved) {
        this.currentLesson = JSON.parse(saved);
      } else {
        this.currentLesson = getDefaultLesson();
      }
    } catch (e) {
      console.warn('Could not load saved lesson, loading default:', e);
      this.currentLesson = getDefaultLesson();
    }
  },

  saveLessonToStorage(notify = false) {
    try {
      localStorage.setItem('math_bilingual_studio_active_lesson', JSON.stringify(this.currentLesson));
      this.syncCurrentLessonToLibrary(true);
      if (notify) {
        this.showToast('Đã tự động lưu & đồng bộ vào Danh sách đã tạo!');
      }
    } catch (e) {
      console.error('Error saving to localStorage:', e);
    }
  },

  showToast(message, type = 'success') {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.innerText = message;
    toast.className = `fixed bottom-6 right-6 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl transition-all duration-300 z-50 flex items-center gap-2 ${
      type === 'success' ? 'bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-rose-600 text-white shadow-rose-500/20'
    }`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
    }, 2800);
  },

  loadTeacherBranding() {
    try {
      const saved = localStorage.getItem('math_studio_teacher_branding');
      if (saved) {
        this.teacherBranding = Object.assign(this.teacherBranding, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load teacher branding:', e);
    }
  },

  saveTeacherBranding(data) {
    if (data) {
      this.teacherBranding = Object.assign(this.teacherBranding, data);
    }
    localStorage.setItem('math_studio_teacher_branding', JSON.stringify(this.teacherBranding));
    this.showToast('Đã lưu thông tin trường & giáo viên thành công!');
  },

  openBrandingModal() {
    this.loadTeacherBranding();
    const b = this.teacherBranding;
    const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.value = v || ''; };
    setVal('brand-input-department', b.department);
    setVal('brand-input-school', b.school);
    setVal('brand-input-subject', b.subject);
    setVal('brand-input-teacher', b.teacherName);
    setVal('brand-input-grade', b.grade);
    setVal('brand-input-year', b.academicYear);
    setVal('brand-input-exam', b.examType);
    const m = document.getElementById('modal-teacher-branding');
    if (m) m.classList.remove('hidden');
  },

  closeBrandingModal() {
    const m = document.getElementById('modal-teacher-branding');
    if (m) m.classList.add('hidden');
  },

  saveBrandingFromModal() {
    const getVal = (id) => document.getElementById(id)?.value?.trim() || '';
    this.saveTeacherBranding({
      department: getVal('brand-input-department'),
      school: getVal('brand-input-school'),
      subject: getVal('brand-input-subject'),
      teacherName: getVal('brand-input-teacher'),
      grade: getVal('brand-input-grade'),
      academicYear: getVal('brand-input-year'),
      examType: getVal('brand-input-exam')
    });
    this.closeBrandingModal();
  },

  setupEventListeners() {
    // Track focused inputs for LaTeX helper
    document.addEventListener('focusin', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        this.lastFocusedInput = e.target;
      }
    });

    // Preset selector change
    const presetSelect = document.getElementById('lesson-preset-selector');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        const selectedId = e.target.value;
        if (selectedId === 'new-blank') {
          this.createNewLesson();
        } else {
          const match = SAMPLE_LESSONS.find(l => l.id === selectedId);
          if (match) {
            this.currentLesson = JSON.parse(JSON.stringify(match));
            this.saveLessonToStorage(true);
            this.renderAll();
          }
        }
      });
    }

    // Listen for image paste (Ctrl + V) for instant OCR
    document.addEventListener('paste', (e) => {
      const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            this.openAIGeneratorModal('ocr');
            this.processOCRImageFile(file);
            this.showToast('Đã nhận ảnh chụp từ bộ nhớ đệm (Ctrl + V)!');
            break;
          }
        }
      }
    });
  },

  setupSpeechVoices() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Ready voices
      };
    }
  },

  speakText(text, rate = 1.0) {
    if (window.BilingualHelper && window.BilingualHelper.speak) {
      window.BilingualHelper.speak(text, rate);
      return;
    }
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt không hỗ trợ Web Speech API.');
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = rate;
    window.speechSynthesis.speak(utter);
  },

  speakSlow(text) {
    this.speakText(text, 0.72);
  },

  insertLatex(snippet) {
    const el = this.lastFocusedInput;
    if (!el) {
      this.showToast('Vui lòng nhấp chuột vào ô nhập liệu cần chèn công thức!', 'error');
      return;
    }

    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const text = el.value || '';
    const before = text.substring(0, start);
    const after = text.substring(end);

    el.value = before + snippet + after;
    el.selectionStart = el.selectionEnd = start + snippet.length;
    el.focus();
    el.dispatchEvent(new Event('input', { bubbles: true }));
  },

  treeState: {
    lesson: true,
    scaffold: true
  },

  toggleTreeMenu(treeName) {
    this.treeState[treeName] = !this.treeState[treeName];
    this.updateTreeMenuUI();
  },

  expandTree(treeName) {
    this.treeState[treeName] = true;
    this.updateTreeMenuUI();
  },

  updateTreeMenuUI() {
    ['lesson', 'scaffold'].forEach(name => {
      const parent = document.getElementById(`side-tree-parent-${name}`);
      const children = document.getElementById(`side-tree-children-${name}`);
      const arrow = document.getElementById(`side-tree-arrow-${name}`);
      const isOpen = this.treeState[name];
      if (children) {
        if (isOpen) {
          children.classList.remove('hidden');
        } else {
          children.classList.add('hidden');
        }
      }
      if (parent) {
        if (isOpen) {
          parent.classList.add('open');
        } else {
          parent.classList.remove('open');
        }
      }
      if (arrow) {
        arrow.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
      }
    });
  },

  LIBRARY_STORAGE_KEY: 'math_bilingual_studio_created_library',
  myExamsFilter: 'all',
  scaffoldFilter: 'all',
  createdLibrary: [],

  getLectureItems() {
    return this.createdLibrary.filter(item => item.category !== 'scaffolding');
  },

  getScaffoldingItems() {
    return this.createdLibrary.filter(item => item.category === 'scaffolding');
  },

  loadCreatedLibrary() {
    try {
      const saved = localStorage.getItem(this.LIBRARY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize and categorize existing items
          parsed.forEach(item => {
            if (!item.category) {
              if (item.scaffoldKey || (item.id && (item.id.startsWith('grade-') || item.id.startsWith('scaffold-'))) || item.scaffoldData) {
                item.category = 'scaffolding';
              } else {
                item.category = 'lecture';
              }
            }
          });
          this.createdLibrary = parsed;
          return;
        }
      }
    } catch (e) {
      console.warn('Could not read created library from storage:', e);
    }
    this.createdLibrary = this.getDefaultSeedLibrary();
    this.saveCreatedLibrary();
  },

  saveCreatedLibrary() {
    try {
      localStorage.setItem(this.LIBRARY_STORAGE_KEY, JSON.stringify(this.createdLibrary));
    } catch (e) {
      console.error('Error saving createdLibrary to localStorage:', e);
    }
  },

  getDefaultSeedLibrary() {
    const l0 = (typeof SAMPLE_LESSONS !== 'undefined' && SAMPLE_LESSONS[0]) ? JSON.parse(JSON.stringify(SAMPLE_LESSONS[0])) : null;
    const l1 = (typeof SAMPLE_LESSONS !== 'undefined' && SAMPLE_LESSONS[1]) ? JSON.parse(JSON.stringify(SAMPLE_LESSONS[1])) : null;
    return [
      {
        id: 'derivatives-extrema',
        code: 'P8DZW2',
        title: 'Ôn tập Bài 4 – Chương 1 – Toán 12: Đạo hàm & Cực trị hàm số (Derivatives and Extrema)',
        titleVi: 'Đạo hàm & Cực trị hàm số',
        titleEn: 'Derivatives and Extrema of Functions',
        grade: 'Khối 12',
        category: 'lecture',
        status: 'Đang mở',
        schedule: 'Tự do',
        questionCount: 22,
        conceptCount: 3,
        vocabCount: 8,
        takenCount: 14,
        updatedAt: 'Hôm nay',
        presetKey: 'derivatives-extrema',
        lessonData: l0
      },
      {
        id: 'grade-12-asymptotes',
        code: 'Z9AAJW',
        title: 'Đề HSG Chuyên Đề – Hàm phân thức & Tiệm cận (Rational Functions & Asymptotes - Bài 1.26)',
        titleVi: 'Hàm phân thức & Tiệm cận',
        titleEn: 'Rational Functions & Asymptotes',
        grade: 'Khối 12',
        category: 'scaffolding',
        status: 'Đang mở',
        schedule: 'Theo lịch',
        questionCount: 50,
        conceptCount: 4,
        vocabCount: 10,
        takenCount: 8,
        updatedAt: '14/10/2026',
        scaffoldKey: 'grade-12-asymptotes'
      },
      {
        id: 'grade-11-limits',
        code: '5SNKDC',
        title: 'Ôn tập Bài 15 – Chương 5 – Toán 11: Giới hạn hàm số dạng vô định 0/0 (Limits of Functions)',
        titleVi: 'Giới hạn hàm số dạng vô định 0/0',
        titleEn: 'Limits of Functions (0/0 Indeterminate Form)',
        grade: 'Khối 11',
        category: 'scaffolding',
        status: 'Đang mở',
        schedule: 'Tự do',
        questionCount: 22,
        conceptCount: 3,
        vocabCount: 7,
        takenCount: 19,
        updatedAt: '13/10/2026',
        scaffoldKey: 'grade-11-limits'
      },
      {
        id: 'grade-10-vectors',
        code: '7ZC696',
        title: 'Ôn tập Bài 15 – Chương 5 – Toán 10: Tọa độ Oxy, Trọng tâm & Tích vô hướng (Vectors in Oxy)',
        titleVi: 'Tọa độ Oxy, Trọng tâm & Tích vô hướng',
        titleEn: 'Vectors & Coordinate Geometry in Oxy',
        grade: 'Khối 10',
        category: 'scaffolding',
        status: 'Đang mở',
        schedule: 'Tự do',
        questionCount: 22,
        conceptCount: 3,
        vocabCount: 9,
        takenCount: 12,
        updatedAt: '12/10/2026',
        scaffoldKey: 'grade-10-vectors'
      },
      {
        id: 'vectors-3d',
        code: '8KNSRW',
        title: 'Ôn tập Bài 3 – Chương 1 – Toán 12: Vectơ & Hình học Không gian Oxyz (Vectors in 3D Space)',
        titleVi: 'Vectơ & Hình học Không gian Oxyz',
        titleEn: 'Vectors & Analytic Geometry in 3D Space',
        grade: 'Khối 12',
        category: 'lecture',
        status: 'Đang mở',
        schedule: 'Tự do',
        questionCount: 22,
        conceptCount: 4,
        vocabCount: 8,
        takenCount: 25,
        updatedAt: '11/10/2026',
        presetKey: 'vectors-3d',
        lessonData: l1
      },
      {
        id: 'integrals-calculus',
        code: 'F2H75Q',
        title: 'Ôn tập Bài 4 – Chương 3 – Toán 12: Tích phân Xác định & Diện tích Hình phẳng (Calculus)',
        titleVi: 'Tích phân Xác định & Diện tích Hình phẳng',
        titleEn: 'Definite Integrals & Planar Area',
        grade: 'Khối 12',
        category: 'lecture',
        status: 'Đang mở',
        schedule: 'Tự do',
        questionCount: 22,
        conceptCount: 3,
        vocabCount: 6,
        takenCount: 6,
        updatedAt: '10/10/2026',
        curriculumKey: 'integrals-calculus'
      },
      {
        id: 'probability-events',
        code: 'XP482L',
        title: 'Đề kiểm tra 45 phút – Xác suất Cổ điển & Biến cố Độc lập (Classical Probability & Events)',
        titleVi: 'Xác suất Cổ điển & Biến cố Độc lập',
        titleEn: 'Classical Probability & Independent Events',
        grade: 'Khối 11',
        category: 'lecture',
        status: 'Đang mở',
        schedule: 'Tự do',
        questionCount: 25,
        conceptCount: 3,
        vocabCount: 8,
        takenCount: 15,
        updatedAt: '09/10/2026',
        curriculumKey: 'probability-statistics'
      },
      {
        id: 'complex-numbers',
        code: 'C912VM',
        title: 'Chuyên đề Số phức & Biểu diễn hình học trên mặt phẳng phức (Complex Numbers & Argand)',
        titleVi: 'Số phức & Biểu diễn hình học',
        titleEn: 'Complex Numbers & Geometric Representations',
        grade: 'Khối 12',
        category: 'lecture',
        status: 'Đang mở',
        schedule: 'Theo lịch',
        questionCount: 30,
        conceptCount: 4,
        vocabCount: 11,
        takenCount: 7,
        updatedAt: '08/10/2026',
        curriculumKey: 'complex-numbers'
      }
    ];
  },

  syncCurrentLessonToLibrary(rerender = true) {
    if (!this.currentLesson) return;

    if (!this.currentLesson.id) {
      this.currentLesson.id = `lesson-${Date.now()}`;
    }
    if (!this.currentLesson.code) {
      this.currentLesson.code = Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    const meta = this.currentLesson.meta || {};
    let grade = meta.grade || 'Khối 12';
    if (grade.includes('12')) grade = 'Khối 12';
    else if (grade.includes('11')) grade = 'Khối 11';
    else if (grade.includes('10')) grade = 'Khối 10';

    const vi = (meta.titleVi || '').trim();
    const en = (meta.titleEn || '').trim();
    let displayTitle = vi;
    if (en && en !== vi) {
      displayTitle = vi ? `${vi} (${en})` : en;
    }
    if (!displayTitle) {
      displayTitle = 'Bài giảng / Đề thi Toán Song ngữ';
    }

    const qCount = (this.currentLesson.quiz?.questions?.length || 0);
    const exCount = (this.currentLesson.workedExamples?.length || this.currentLesson.examples?.length || 0);
    const totalQuestions = qCount > 0 ? qCount : (exCount > 0 ? exCount : 15);
    const conceptCount = this.currentLesson.concepts?.length || 0;
    const vocabCount = this.currentLesson.vocabulary?.length || 0;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;

    const existingIdx = this.createdLibrary.findIndex(item => item.id === this.currentLesson.id);

    const libraryEntry = {
      id: this.currentLesson.id,
      code: this.currentLesson.code,
      title: displayTitle,
      titleVi: vi,
      titleEn: en,
      grade: grade,
      category: 'lecture', // Tự động tích hợp vào danh mục Bài giảng
      status: 'Đang mở',
      schedule: 'Tự do',
      questionCount: totalQuestions,
      conceptCount: conceptCount,
      vocabCount: vocabCount,
      takenCount: existingIdx >= 0 ? (this.createdLibrary[existingIdx].takenCount || 0) : 0,
      updatedAt: timeStr,
      lessonData: JSON.parse(JSON.stringify(this.currentLesson))
    };

    if (existingIdx >= 0) {
      if (this.createdLibrary[existingIdx].code) {
        libraryEntry.code = this.createdLibrary[existingIdx].code;
        this.currentLesson.code = libraryEntry.code;
      }
      this.createdLibrary[existingIdx] = libraryEntry;
    } else {
      this.createdLibrary.unshift(libraryEntry);
    }

    this.saveCreatedLibrary();

    if (rerender) {
      if (this.activeTab === 'my-exams') {
        this.renderMyExamsTable(this.myExamsFilter || 'all');
      } else if (this.activeTab === 'scaffold-library') {
        this.renderScaffoldLibraryTable(this.scaffoldFilter || 'all');
      }
    }
  },

  toggleSidebar() {
    const sidebar = document.getElementById('app-sidebar');
    const overlay = document.getElementById('sidebar-backdrop');
    if (!sidebar) return;
    sidebar.classList.toggle('-translate-x-full');
    if (overlay) overlay.classList.toggle('hidden');
  },

  isSidebarCollapsed: false,

  toggleSidebarCollapse() {
    const sidebar = document.getElementById('app-sidebar');
    if (!sidebar) return;

    // Mobile viewport: fallback to mobile drawer
    if (window.innerWidth < 1024) {
      this.toggleSidebar();
      return;
    }

    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    if (this.isSidebarCollapsed) {
      sidebar.classList.add('sidebar-collapsed');
    } else {
      sidebar.classList.remove('sidebar-collapsed');
    }

    const btn = document.getElementById('btn-toggle-sidebar');
    if (btn) {
      btn.setAttribute('title', this.isSidebarCollapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên');
      btn.innerHTML = this.isSidebarCollapsed 
        ? `<svg class="w-4 h-4 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m11 9 3 3-3 3"/></svg>`
        : `<svg class="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9-3 3 3 3"/></svg>`;
    }
  },

  // Draggable sidebar resizer & Workspace scaling
  currentZoom: 100,
  isFullWidth: false,

  initWorkspaceResizer() {
    const resizer = document.getElementById('sidebar-resizer');
    const sidebar = document.getElementById('app-sidebar');

    // Load saved sidebar width
    try {
      const savedWidth = localStorage.getItem('math_studio_sidebar_w');
      if (savedWidth) {
        const w = parseInt(savedWidth);
        if (w >= 180 && w <= 500) {
          document.documentElement.style.setProperty('--sidebar-w', `${w}px`);
        }
      }
    } catch (e) {
      console.warn('Could not read sidebar width from localStorage:', e);
    }

    // Load saved zoom
    try {
      const savedZoom = localStorage.getItem('math_studio_zoom_level');
      if (savedZoom) {
        this.setZoom(parseInt(savedZoom), false);
      }
    } catch (e) {
      console.warn('Could not read zoom level from localStorage:', e);
    }

    // Load saved fullwidth preference
    try {
      const savedFullWidth = localStorage.getItem('math_studio_full_width');
      if (savedFullWidth === '1') {
        this.toggleFullWidth(true);
      }
    } catch (e) {
      console.warn('Could not read fullwidth preference from localStorage:', e);
    }

    if (!resizer || !sidebar) return;

    let isDragging = false;
    let startX = 0;
    let startWidth = 260;

    const onMouseDown = (e) => {
      if (e.button !== 0) return; // Only primary mouse button
      isDragging = true;
      startX = e.clientX;
      startWidth = sidebar.getBoundingClientRect().width;
      
      document.body.classList.add('is-resizing');
      resizer.classList.add('is-dragging');

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      let newWidth = startWidth + (e.clientX - startX);

      // Auto un-collapse if dragged open from collapsed state
      if (this.isSidebarCollapsed && newWidth > 110) {
        this.isSidebarCollapsed = false;
        sidebar.classList.remove('sidebar-collapsed');
        const btn = document.getElementById('btn-toggle-sidebar');
        if (btn) {
          btn.setAttribute('title', 'Thu gọn thanh bên');
          btn.innerHTML = `<svg class="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/><path d="m14 9-3 3 3 3"/></svg>`;
        }
      }

      // Auto snap to collapsed if dragged very small
      if (newWidth < 120) {
        if (!this.isSidebarCollapsed) {
          this.toggleSidebarCollapse();
        }
        return;
      }

      // Constrain sidebar width between 180px and 500px
      newWidth = Math.max(180, Math.min(500, newWidth));
      document.documentElement.style.setProperty('--sidebar-w', `${newWidth}px`);
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      document.body.classList.remove('is-resizing');
      resizer.classList.remove('is-dragging');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      const currentW = sidebar.getBoundingClientRect().width;
      if (!this.isSidebarCollapsed && currentW >= 180) {
        localStorage.setItem('math_studio_sidebar_w', Math.round(currentW));
      }
    };

    resizer.addEventListener('mousedown', onMouseDown);

    // Double click to reset to standard 260px
    resizer.addEventListener('dblclick', () => {
      document.documentElement.style.setProperty('--sidebar-w', '260px');
      localStorage.setItem('math_studio_sidebar_w', 260);
      if (this.isSidebarCollapsed) {
        this.toggleSidebarCollapse();
      }
      this.showToast('Đã đặt lại kích thước thanh bên chuẩn (260px)');
    });
  },

  setZoom(val, showNotice = false) {
    const zoom = Math.min(130, Math.max(75, parseInt(val) || 100));
    this.currentZoom = zoom;
    const mainContent = document.getElementById('app-workspace-main');
    if (mainContent) {
      mainContent.style.zoom = (zoom / 100);
      document.documentElement.style.setProperty('--app-zoom', (zoom / 100));
    }
    const slider = document.getElementById('workspace-zoom-slider');
    if (slider && parseInt(slider.value) !== zoom) {
      slider.value = zoom;
    }
    const label = document.getElementById('workspace-zoom-label');
    if (label) {
      label.textContent = `${zoom}%`;
    }
    localStorage.setItem('math_studio_zoom_level', zoom);
    if (showNotice) {
      this.showToast(`Kích thước giao diện làm việc: ${zoom}%`);
    }
  },

  adjustZoom(delta) {
    const current = this.currentZoom || 100;
    this.setZoom(current + delta, true);
  },

  resetZoom() {
    this.setZoom(100, true);
    this.showToast('Đã đặt lại kích thước giao diện 100%');
  },

  toggleFullWidth(silent = false) {
    this.isFullWidth = !this.isFullWidth;
    const main = document.getElementById('app-workspace-main');
    const btn = document.getElementById('btn-toggle-fullwidth');
    const icon = document.getElementById('fullwidth-icon');
    const text = document.getElementById('fullwidth-text');
    if (main) {
      if (this.isFullWidth) {
        main.classList.remove('max-w-7xl');
        main.classList.add('max-w-full', 'px-6', 'lg:px-10');
        if (!silent) this.showToast('Đã mở rộng giao diện làm việc toàn màn hình');
      } else {
        main.classList.add('max-w-7xl');
        main.classList.remove('max-w-full', 'px-6', 'lg:px-10');
        if (!silent) this.showToast('Đã chuyển về độ rộng tiêu chuẩn');
      }
    }
    if (btn) {
      btn.classList.toggle('bg-indigo-50', this.isFullWidth);
      btn.classList.toggle('text-indigo-700', this.isFullWidth);
      btn.classList.toggle('border-indigo-300', this.isFullWidth);
    }
    if (icon) {
      icon.textContent = this.isFullWidth ? '⤡' : '⤢';
    }
    if (text) {
      text.textContent = this.isFullWidth ? 'Thu gọn viền' : 'Tràn viền';
    }
    localStorage.setItem('math_studio_full_width', this.isFullWidth ? '1' : '0');
  },

  updateBreadcrumb(tabName) {
    const el = document.getElementById('breadcrumb-active');
    if (!el) return;
    const title = this.currentLesson?.meta?.titleVi || this.currentLesson?.meta?.titleEn || 'Bài học';
    switch (tabName) {
      case 'my-exams':
        el.innerText = 'Soạn bài giảng › Danh sách đã tạo';
        break;
      case 'builder-lesson':
        el.innerText = `Soạn bài giảng › ${title}`;
        break;
      case 'builder-quiz':
        el.innerText = `Soạn đề thi › ${this.currentLesson?.quiz?.titleVi || this.currentLesson?.quiz?.titleEn || 'Đề kiểm tra'}`;
        break;
      case 'interactive-preview':
        el.innerText = `Làm bài tương tác › ${title}`;
        break;
      case 'scaffolding-tutor':
        el.innerText = 'Gia sư giàn giáo ZPD › Không gian tương tác';
        break;
      case 'scaffold-library':
        el.innerText = 'Gia sư giàn giáo ZPD › Bài tập đã tạo';
        break;
      case 'user-guide':
        el.innerText = 'Hướng dẫn cho giáo viên & học sinh';
        break;
      default:
        el.innerText = 'Bilingual Math Scaffolding Studio';
    }
  },

  filterExams(grade) {
    this.renderMyExamsTable(grade);
  },

  filterScaffoldExams(grade) {
    this.renderScaffoldLibraryTable(grade);
  },

  renderMyExamsTable(gradeFilter = 'all') {
    this.myExamsFilter = gradeFilter;
    const tbody = document.getElementById('my-exams-tbody');
    const countLabel = document.getElementById('my-exams-count-label');
    if (!tbody) return;

    // Filter only lecture & quiz items for Bài giảng
    const lectureItems = this.getLectureItems();

    // Real-time dynamic counts across lecture items
    const countAll = lectureItems.length;
    const count12 = lectureItems.filter(item => (item.grade || '').includes('12')).length;
    const count11 = lectureItems.filter(item => (item.grade || '').includes('11')).length;
    const count10 = lectureItems.filter(item => (item.grade || '').includes('10')).length;

    const elAll = document.getElementById('filter-count-all');
    const el12 = document.getElementById('filter-count-Khối12');
    const el11 = document.getElementById('filter-count-Khối11');
    const el10 = document.getElementById('filter-count-Khối10');

    if (elAll) elAll.innerText = countAll;
    if (el12) el12.innerText = count12;
    if (el11) el11.innerText = count11;
    if (el10) el10.innerText = count10;

    let filtered = lectureItems;
    if (gradeFilter !== 'all') {
      filtered = lectureItems.filter(item => (item.grade || '') === gradeFilter || (item.grade || '').includes(gradeFilter.replace('Khối ', '')));
    }

    if (countLabel) {
      countLabel.innerText = `${filtered.length} bài giảng & đề thi song ngữ đã tạo (Tự động cập nhật)`;
    }

    // Filter button active styles
    const filters = ['all', 'Khối 12', 'Khối 11', 'Khối 10'];
    filters.forEach(f => {
      const btnId = 'filter-grade-' + (f === 'all' ? 'all' : f.replace(/\s+/g, ''));
      const btn = document.getElementById(btnId);
      if (btn) {
        if (f === gradeFilter) {
          btn.className = 'w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-bold bg-indigo-50 text-indigo-700 flex items-center justify-between border border-indigo-200/60 shadow-xs transition-all';
        } else {
          btn.className = 'w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 flex items-center justify-between transition-all';
        }
      }
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" class="py-12 text-center text-slate-400 text-sm">
            <div class="text-3xl mb-2">📁</div>
            <p class="font-medium">Chưa có bài giảng hoặc đề thi nào thuộc mục này.</p>
            <p class="text-xs text-slate-400 mt-1">Hãy bấm "Soạn bài mới" hoặc dùng "AI Studio" để tự động tạo!</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(item => {
      const gradeColor = (item.grade || '').includes('12') 
        ? 'bg-amber-50 text-amber-700 border-amber-200' 
        : (item.grade || '').includes('11') 
          ? 'bg-purple-50 text-purple-700 border-purple-200' 
          : 'bg-sky-50 text-sky-700 border-sky-200';

      const detailInfo = [];
      if (item.questionCount) detailInfo.push(`${item.questionCount} câu`);
      if (item.conceptCount) detailInfo.push(`${item.conceptCount} lý thuyết`);
      if (item.vocabCount) detailInfo.push(`${item.vocabCount} thuật ngữ`);
      const detailStr = detailInfo.length > 0 ? detailInfo.join(' • ') : 'Song ngữ Anh - Việt';

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100 group">
          <td class="py-3.5 px-4 font-semibold text-slate-800 text-xs sm:text-sm">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="px-2 py-0.5 rounded text-[11px] font-bold border ${gradeColor}">
                ${item.grade || 'Toán THPT'}
              </span>
              <span class="line-clamp-2 hover:text-indigo-600 cursor-pointer font-bold text-slate-900" onclick="App.openExamFromList('${item.id}')" title="Nhấp để mở bài làm">
                ${item.title}
              </span>
            </div>
            <div class="text-[11px] text-slate-400 font-normal flex items-center gap-2 flex-wrap">
              <span class="text-teal-600 font-medium">Song ngữ Anh - Việt</span>
              <span>•</span>
              <span>${detailStr}</span>
              <span>•</span>
              <span class="text-indigo-600 font-mono text-[10px]">MathJax 3</span>
            </div>
          </td>

          <td class="py-3.5 px-3 text-center text-[11px] text-slate-500 whitespace-nowrap">
            ${item.updatedAt || 'Vừa xong'}
          </td>

          <td class="py-3.5 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="App.openExamFromList('${item.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 flex items-center gap-1 transition-all cursor-pointer" title="Làm bài tương tác / Xem trước">
                👁️ <span>Mở</span>
              </button>
              <button onclick="App.editExamFromList('${item.id}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer" title="Chỉnh sửa bài giảng & đề thi">
                ✏️ <span>Sửa</span>
              </button>
              <button onclick="App.openScaffoldForExam('${item.scaffoldKey || item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all cursor-pointer" title="Gia sư giàn giáo nhận thức ZPD">
                🪜
              </button>
              <button onclick="App.exportWordForExam('${item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer" title="Xuất file Microsoft Word (.doc)">
                📄
              </button>
              <button onclick="App.deleteExamFromList('${item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer" title="Xóa khỏi danh sách đã tạo">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  renderScaffoldLibraryTable(gradeFilter = 'all') {
    this.scaffoldFilter = gradeFilter;
    const tbody = document.getElementById('scaffold-library-tbody');
    const countLabel = document.getElementById('scaffold-library-count-label');
    if (!tbody) return;

    // Filter only scaffolding items for Giàn giáo
    const scaffoldItems = this.getScaffoldingItems();

    const countAll = scaffoldItems.length;
    const count12 = scaffoldItems.filter(item => (item.grade || '').includes('12')).length;
    const count11 = scaffoldItems.filter(item => (item.grade || '').includes('11')).length;
    const count10 = scaffoldItems.filter(item => (item.grade || '').includes('10')).length;

    const elAll = document.getElementById('filter-scaffold-count-all');
    const el12 = document.getElementById('filter-scaffold-count-Khối12');
    const el11 = document.getElementById('filter-scaffold-count-Khối11');
    const el10 = document.getElementById('filter-scaffold-count-Khối10');

    if (elAll) elAll.innerText = countAll;
    if (el12) el12.innerText = count12;
    if (el11) el11.innerText = count11;
    if (el10) el10.innerText = count10;

    let filtered = scaffoldItems;
    if (gradeFilter !== 'all') {
      filtered = scaffoldItems.filter(item => (item.grade || '') === gradeFilter || (item.grade || '').includes(gradeFilter.replace('Khối ', '')));
    }

    if (countLabel) {
      countLabel.innerText = `${filtered.length} bài tập giàn giáo ZPD đã tạo (Tự động cập nhật)`;
    }

    const filters = ['all', 'Khối 12', 'Khối 11', 'Khối 10'];
    filters.forEach(f => {
      const btnId = 'filter-scaffold-grade-' + (f === 'all' ? 'all' : f.replace(/\s+/g, ''));
      const btn = document.getElementById(btnId);
      if (btn) {
        if (f === gradeFilter) {
          btn.className = 'w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-bold bg-amber-50 text-amber-800 flex items-center justify-between border border-amber-200/60 shadow-xs transition-all';
        } else {
          btn.className = 'w-full px-3.5 py-2.5 rounded-xl text-left text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 flex items-center justify-between transition-all';
        }
      }
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="3" class="py-12 text-center text-slate-400 text-sm">
            <div class="text-3xl mb-2">🪜</div>
            <p class="font-medium">Chưa có bài tập giàn giáo nào thuộc mục này.</p>
            <p class="text-xs text-slate-400 mt-1">Hãy bấm "Tạo bài tập giàn giáo mới" hoặc phân tích bài toán bằng AI để tự động thêm!</p>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(item => {
      const gradeColor = (item.grade || '').includes('12') 
        ? 'bg-amber-50 text-amber-700 border-amber-200' 
        : (item.grade || '').includes('11') 
          ? 'bg-purple-50 text-purple-700 border-purple-200' 
          : 'bg-sky-50 text-sky-700 border-sky-200';

      const vocabCount = item.vocabCount || (item.scaffoldData?.bilingual_vocabulary?.length) || 4;

      return `
        <tr class="hover:bg-amber-50/40 transition-colors border-b border-slate-100 group">
          <td class="py-3.5 px-4 font-semibold text-slate-800 text-xs sm:text-sm">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <span class="px-2 py-0.5 rounded text-[11px] font-bold border ${gradeColor}">
                ${item.grade || 'Toán THPT'}
              </span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                Mô hình 4 Nấc ZPD
              </span>
              <span class="line-clamp-2 hover:text-amber-700 cursor-pointer font-bold text-slate-900" onclick="App.openScaffoldItem('${item.id}')" title="Nhấp để mở bài tập giàn giáo">
                ${item.title || item.titleVi || 'Bài tập giàn giáo ZPD'}
              </span>
            </div>
            <div class="text-[11px] text-slate-500 font-normal flex items-center gap-2 flex-wrap">
              <span class="text-amber-700 font-semibold">Giàn giáo nhận thức</span>
              <span>•</span>
              <span>${vocabCount} thuật ngữ song ngữ</span>
              <span>•</span>
              <span class="text-teal-600 font-medium">Gợi ý Nấc 1 & Nấc 2</span>
              <span>•</span>
              <span class="text-indigo-600 font-mono text-[10px]">MathJax 3</span>
            </div>
          </td>

          <td class="py-3.5 px-3 text-center text-[11px] text-slate-500 whitespace-nowrap">
            ${item.updatedAt || 'Vừa xong'}
          </td>

          <td class="py-3.5 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="App.openScaffoldItem('${item.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 flex items-center gap-1 transition-all cursor-pointer" title="Mở không gian giàn giáo nhận thức ZPD">
                🪜 <span>Mở</span>
              </button>
              <button onclick="App.exportWordForScaffoldItem('${item.id}')" class="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all cursor-pointer" title="Xuất file Word (.doc) giàn giáo">
                📄 <span>Word</span>
              </button>
              <button onclick="App.printScaffoldItem('${item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer" title="In phiếu bài tập A4">
                🖨️
              </button>
              <button onclick="App.deleteExamFromList('${item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer" title="Xóa khỏi bài tập đã tạo">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  openScaffoldItem(id) {
    const item = this.createdLibrary.find(e => e.id === id);
    if (!item) return;

    if (item.scaffoldKey && window.ScaffoldingTutor && window.ScaffoldingTutor.presets[item.scaffoldKey]) {
      window.ScaffoldingTutor.selectPreset(item.scaffoldKey);
    } else if (item.scaffoldData && window.ScaffoldingTutor) {
      window.ScaffoldingTutor.currentData = JSON.parse(JSON.stringify(item.scaffoldData));
      const input = document.getElementById('scaffold-problem-input');
      if (input && item.rawInput) {
        input.value = item.rawInput;
      }
      window.ScaffoldingTutor.switchInputMode('custom');
      window.ScaffoldingTutor.render();
    }
    this.switchTab('scaffolding-tutor');
    this.showToast('🪜 Đã nạp bài tập giàn giáo: ' + (item.titleVi || item.title));
  },

  exportWordForScaffoldItem(id) {
    const item = this.createdLibrary.find(e => e.id === id);
    if (!item) return;
    this.openScaffoldItem(id);
    setTimeout(() => {
      if (window.ScaffoldingTutor && window.ScaffoldingTutor.exportWord) {
        window.ScaffoldingTutor.exportWord();
      }
    }, 200);
  },

  printScaffoldItem(id) {
    const item = this.createdLibrary.find(e => e.id === id);
    if (!item) return;
    this.openScaffoldItem(id);
    setTimeout(() => {
      if (window.ScaffoldingTutor && window.ScaffoldingTutor.exportWorksheet) {
        window.ScaffoldingTutor.exportWorksheet();
      }
    }, 200);
  },

  openExamFromList(examId) {
    const item = this.createdLibrary.find(e => e.id === examId);
    if (!item) return;

    if (item.lessonData) {
      this.currentLesson = JSON.parse(JSON.stringify(item.lessonData));
      localStorage.setItem('math_bilingual_studio_active_lesson', JSON.stringify(this.currentLesson));
      this.renderAll();
      this.switchTab('interactive-preview');
      return;
    }

    if (item.presetKey) {
      this.loadPreset(item.presetKey);
      this.switchTab('interactive-preview');
    } else if (item.scaffoldKey) {
      if (window.ScaffoldingTutor) {
        window.ScaffoldingTutor.selectPreset(item.scaffoldKey);
      }
      this.switchTab('scaffolding-tutor');
    } else if (item.curriculumKey) {
      if (window.AIGenerator && window.AIGenerator.generateFromCurriculum) {
        window.AIGenerator.generateFromCurriculum(item.curriculumKey);
      }
      this.switchTab('interactive-preview');
    } else {
      this.switchTab('interactive-preview');
    }
  },

  editExamFromList(examId) {
    const item = this.createdLibrary.find(e => e.id === examId);
    if (!item) return;

    if (item.lessonData) {
      this.currentLesson = JSON.parse(JSON.stringify(item.lessonData));
      localStorage.setItem('math_bilingual_studio_active_lesson', JSON.stringify(this.currentLesson));
      this.renderAll();
      this.switchTab('builder-lesson');
      return;
    }

    if (item.presetKey) {
      this.loadPreset(item.presetKey);
    }
    this.switchTab('builder-lesson');
  },

  exportWordForExam(examId) {
    const item = this.createdLibrary.find(e => e.id === examId);
    if (item && item.lessonData) {
      this.currentLesson = JSON.parse(JSON.stringify(item.lessonData));
      localStorage.setItem('math_bilingual_studio_active_lesson', JSON.stringify(this.currentLesson));
      this.renderAll();
    }
    this.openExportWordModal();
  },

  deleteExamFromList(examId) {
    const item = this.createdLibrary.find(e => e.id === examId);
    const title = item ? item.title : 'mục này';
    if (!confirm(`Bạn có chắc chắn muốn xóa "${title}" khỏi danh sách đã tạo không?`)) {
      return;
    }
    this.createdLibrary = this.createdLibrary.filter(e => e.id !== examId);
    this.saveCreatedLibrary();
    this.renderMyExamsTable(this.myExamsFilter || 'all');
    this.renderScaffoldLibraryTable(this.scaffoldFilter || 'all');
    this.showToast('Đã xóa thành công khỏi danh sách đã tạo!');
  },

  openScaffoldForExam(scaffoldKey) {
    if (window.ScaffoldingTutor) {
      if (window.ScaffoldingTutor.presets[scaffoldKey]) {
        window.ScaffoldingTutor.selectPreset(scaffoldKey);
      } else {
        window.ScaffoldingTutor.init();
      }
    }
    this.switchTab('scaffolding-tutor');
  },

  copyExamLink(code) {
    const dummyUrl = window.location.origin + window.location.pathname + '#exam=' + code;
    navigator.clipboard?.writeText(dummyUrl).then(() => {
      this.showToast(`Đã sao chép liên kết đề thi ${code}!`);
    }).catch(() => {
      this.showToast(`Mã đề: ${code}`);
    });
  },

  loadPreset(presetId) {
    const match = SAMPLE_LESSONS.find(l => l.id === presetId);
    if (match) {
      this.currentLesson = JSON.parse(JSON.stringify(match));
      this.saveLessonToStorage(true);
      this.renderAll();
      const select = document.getElementById('lesson-preset-selector');
      if (select) select.value = presetId;
    }
  },

  loadScaffoldPreset(scaffoldKey) {
    if (window.ScaffoldingTutor) {
      window.ScaffoldingTutor.selectPreset(scaffoldKey);
    }
    this.switchTab('scaffolding-tutor');
  },

  switchTab(tabName) {
    this.activeTab = tabName;

    // Auto-expand tree menu containing this tab
    const lessonTabs = ['my-exams', 'builder-lesson', 'builder-quiz'];
    const scaffoldTabs = ['scaffolding-tutor', 'scaffold-library'];
    if (lessonTabs.includes(tabName)) {
      this.expandTree('lesson');
    } else if (scaffoldTabs.includes(tabName)) {
      this.expandTree('scaffold');
    }

    // Update panels
    const tabs = ['my-exams', 'builder-lesson', 'builder-quiz', 'interactive-preview', 'scaffolding-tutor', 'scaffold-library', 'user-guide'];
    tabs.forEach(t => {
      const panel = document.getElementById(`panel-${t}`);
      if (panel) {
        if (t === tabName) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      }

      // Sidebar links & sub-links
      const sideLink = document.getElementById(`side-nav-${t}`);
      if (sideLink) {
        if (t === tabName) {
          sideLink.classList.add('active');
        } else {
          sideLink.classList.remove('active');
        }
      }
    });

    // Update Breadcrumb text
    this.updateBreadcrumb(tabName);

    // Scroll to top of workspace
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (tabName === 'my-exams') {
      this.renderMyExamsTable(this.myExamsFilter || 'all');
    } else if (tabName === 'scaffold-library') {
      this.renderScaffoldLibraryTable(this.scaffoldFilter || 'all');
    } else if (tabName === 'interactive-preview') {
      this.renderInteractivePreview();
    } else if (tabName === 'scaffolding-tutor') {
      if (window.ScaffoldingTutor && (!window.ScaffoldingTutor.currentData || !document.getElementById('scaffold-results-container')?.children.length)) {
        window.ScaffoldingTutor.init();
      }
    } else if (tabName === 'user-guide') {
      if (window.UserGuide) {
        window.UserGuide.render();
      }
    }

    this.triggerMathJax();
  },

  triggerMathJax() {
    clearTimeout(this.mathJaxDebounceTimer);
    this.mathJaxDebounceTimer = setTimeout(() => {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().catch(err => {
          // ignore transient parse error during rapid typing
        });
      }
    }, 150);
  },

  toggleBilingualDisplay() {
    this.showVietnamese = !this.showVietnamese;
    const btn = document.getElementById('btn-toggle-bilingual');
    if (btn) {
      btn.innerHTML = this.showVietnamese 
        ? `🇻🇳 <span class="hidden sm:inline">Dịch tiếng Việt:</span> <strong>Bật</strong>`
        : `🇻🇳 <span class="hidden sm:inline">Dịch tiếng Việt:</span> <strong>Tắt</strong>`;
    }
    const elements = document.querySelectorAll('.vi-text');
    elements.forEach(el => {
      el.style.display = this.showVietnamese ? '' : 'none';
    });
  },

  renderAll() {
    this.renderLessonBuilder();
    this.renderQuizBuilder();
    this.renderInteractivePreview();
    this.triggerMathJax();
  },

  createNewLesson() {
    const newId = `lesson-${Date.now()}`;
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.currentLesson = {
      id: newId,
      code: newCode,
      meta: {
        titleEn: "New Math Bilingual Lesson & Quiz",
        titleVi: "Bài giảng & Đề thi Toán Song ngữ Mới",
        grade: "Khối 12",
        duration: "45 phút",
        teacher: "Thầy Hưng",
        overviewEn: "Enter learning objectives and core theorems in English.",
        overviewVi: "Nhập mục tiêu bài học, định lý và phương pháp giải bằng tiếng Việt."
      },
      concepts: [],
      vocabulary: [],
      workedExamples: [],
      examples: [],
      visualizer: {
        type: "canvas-interactive",
        preset: "cubic",
        paramA: 1,
        paramB: 0,
        paramC: -3,
        paramD: 0,
        formulaDisplay: "f(x) = x^3 - 3x"
      },
      quiz: {
        titleEn: "Practice & Assessment Quiz",
        titleVi: "Bài Kiểm Tra Ôn Tập & Đánh Giá",
        timeMinutes: 20,
        questions: []
      }
    };
    this.saveLessonToStorage(true);
    this.renderAll();
    this.switchTab('builder-lesson');
  },

  // ==========================================
  // TAB 1: LESSON BUILDER (SOẠN BÀI GIẢNG)
  // ==========================================
  renderLessonBuilder() {
    const meta = this.currentLesson.meta;
    document.getElementById('meta-title-en').value = meta.titleEn || '';
    document.getElementById('meta-title-vi').value = meta.titleVi || '';
    document.getElementById('meta-grade').value = meta.grade || '';
    document.getElementById('meta-duration').value = meta.duration || '';
    document.getElementById('meta-overview-en').value = meta.overviewEn || '';
    document.getElementById('meta-overview-vi').value = meta.overviewVi || '';

    this.renderConceptsEditor();
    this.renderVocabularyEditor();
    this.renderExamplesEditor();
    this.renderVisualizerEditor();
  },

  updateMeta(field, value) {
    this.currentLesson.meta[field] = value;
    this.saveLessonToStorage();
  },

  // 1. Concepts Editor
  renderConceptsEditor() {
    const container = document.getElementById('builder-concepts-list');
    if (!container) return;
    const concepts = this.currentLesson.concepts || [];

    container.innerHTML = concepts.map((c, idx) => `
      <div class="glass-card p-5 rounded-2xl border border-slate-200 bg-white space-y-4 relative group shadow-xs">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
            Khái niệm / Định lý #${idx + 1}
          </span>
          <button onclick="App.deleteConcept(${idx})" class="text-slate-500 hover:text-rose-600 text-xs flex items-center gap-1 transition-colors cursor-pointer">
            🗑️ Xóa mục này
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Tên khái niệm (English):</label>
            <input type="text" value="${c.titleEn || ''}" oninput="App.updateConcept(${idx}, 'titleEn', this.value)" class="w-full px-3.5 py-2 glass-input rounded-xl text-sm font-semibold text-slate-900">
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Dịch nghĩa (Tiếng Việt):</label>
            <input type="text" value="${c.titleVi || ''}" oninput="App.updateConcept(${idx}, 'titleVi', this.value)" class="w-full px-3.5 py-2 glass-input rounded-xl text-sm font-semibold text-slate-900">
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-indigo-700 uppercase mb-1 flex items-center justify-between">
            <span>Công thức toán / Định lý (LaTeX - không cần bọc $):</span>
            <span class="text-[10px] text-slate-500 lowercase">Xem trước tự động render bên dưới</span>
          </label>
          <textarea rows="2" oninput="App.updateConcept(${idx}, 'latex', this.value)" class="w-full p-3 font-mono text-sm glass-input rounded-xl text-slate-900">${c.latex || ''}</textarea>
          <!-- Live Math Preview -->
          <div class="mt-2 p-3 bg-slate-50 rounded-xl border border-indigo-200 text-center latex-box text-slate-900">
            $$${c.latex || '\\text{Formula Preview}'}$$
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Giải thích chi tiết (English):</label>
            <textarea rows="2" oninput="App.updateConcept(${idx}, 'descEn', this.value)" class="w-full p-3 glass-input rounded-xl text-xs text-slate-800">${c.descEn || ''}</textarea>
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Bản dịch tiếng Việt:</label>
            <textarea rows="2" oninput="App.updateConcept(${idx}, 'descVi', this.value)" class="w-full p-3 glass-input rounded-xl text-xs text-slate-800">${c.descVi || ''}</textarea>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 border-t border-slate-200">
          <div>
            <label class="block text-[10px] font-semibold text-amber-700 uppercase mb-1">Ghi chú / Lưu ý (English):</label>
            <input type="text" value="${c.notesEn || ''}" oninput="App.updateConcept(${idx}, 'notesEn', this.value)" placeholder="Lưu ý quan trọng..." class="w-full px-3 py-1.5 glass-input rounded-lg text-xs text-slate-800">
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-amber-700 uppercase mb-1">Ghi chú (Tiếng Việt):</label>
            <input type="text" value="${c.notesVi || ''}" oninput="App.updateConcept(${idx}, 'notesVi', this.value)" placeholder="Lưu ý tiếng Việt..." class="w-full px-3 py-1.5 glass-input rounded-lg text-xs text-slate-800">
          </div>
        </div>
      </div>
    `).join('');
  },

  addConcept() {
    this.currentLesson.concepts.push({
      id: `c-${Date.now()}`,
      titleEn: "New Concept / Theorem",
      titleVi: "Khái niệm / Định lý mới",
      latex: "f(x) = ax^2 + bx + c",
      descEn: "Mathematical description of the concept.",
      descVi: "Mô tả ý nghĩa toán học của khái niệm.",
      notesEn: "Key remark.",
      notesVi: "Lưu ý then chốt."
    });
    this.saveLessonToStorage();
    this.renderConceptsEditor();
    this.triggerMathJax();
  },

  updateConcept(idx, field, val) {
    this.currentLesson.concepts[idx][field] = val;
    this.saveLessonToStorage();
    this.triggerMathJax();
  },

  deleteConcept(idx) {
    if (confirm('Bạn có chắc chắn muốn xóa khái niệm này?')) {
      this.currentLesson.concepts.splice(idx, 1);
      this.saveLessonToStorage();
      this.renderConceptsEditor();
      this.triggerMathJax();
    }
  },

  // 2. Vocabulary Editor
  renderVocabularyEditor() {
    const container = document.getElementById('builder-vocab-list');
    if (!container) return;
    const vocab = this.currentLesson.vocabulary || [];

    container.innerHTML = vocab.map((v, idx) => `
      <div class="glass-card p-4 rounded-xl border border-slate-200 bg-white space-y-3 shadow-xs">
        <div class="flex items-center justify-between border-b border-slate-200 pb-2">
          <div class="flex items-center gap-1.5">
            <span class="w-6 h-6 rounded-md bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-xs">${idx + 1}</span>
            <button type="button" onclick="App.speakText('${v.term}')" class="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer" title="Nghe giọng nữ chuẩn (1.0x)">
              🔊 Nghe
            </button>
            <button type="button" onclick="App.speakSlow('${v.term}')" class="px-2 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer" title="Nghe phát âm chậm (0.72x)">
              🐢 Chậm
            </button>
          </div>
          <button onclick="App.deleteVocab(${idx})" class="text-slate-500 hover:text-rose-600 text-xs cursor-pointer">🗑️ Xóa</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <div class="sm:col-span-2">
            <label class="block text-[10px] font-semibold text-slate-600 uppercase mb-1">Thuật ngữ (English):</label>
            <input type="text" value="${v.term || ''}" oninput="App.updateVocab(${idx}, 'term', this.value)" class="w-full px-3 py-1.5 glass-input rounded-lg text-sm font-semibold text-slate-900">
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-600 uppercase mb-1">Phiên âm IPA:</label>
            <input type="text" value="${v.ipa || ''}" oninput="App.updateVocab(${idx}, 'ipa', this.value)" placeholder="/.../" class="w-full px-3 py-1.5 glass-input rounded-lg text-xs font-mono text-teal-700 font-medium">
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-600 uppercase mb-1">Từ loại (pos):</label>
            <input type="text" value="${v.pos || ''}" oninput="App.updateVocab(${idx}, 'pos', this.value)" placeholder="noun, verb..." class="w-full px-3 py-1.5 glass-input rounded-lg text-xs text-slate-800">
          </div>
        </div>

        <div>
          <label class="block text-[10px] font-semibold text-slate-600 uppercase mb-1">Nghĩa tiếng Việt:</label>
          <input type="text" value="${v.meaningVi || ''}" oninput="App.updateVocab(${idx}, 'meaningVi', this.value)" class="w-full px-3 py-1.5 glass-input rounded-lg text-sm text-emerald-800 font-semibold">
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div>
            <label class="block text-[10px] font-semibold text-slate-600 uppercase mb-1">Ví dụ toán học (English):</label>
            <input type="text" value="${v.exampleEn || ''}" oninput="App.updateVocab(${idx}, 'exampleEn', this.value)" class="w-full px-3 py-1.5 glass-input rounded-lg text-xs text-slate-800">
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-600 uppercase mb-1">Dịch ví dụ (Tiếng Việt):</label>
            <input type="text" value="${v.exampleVi || ''}" oninput="App.updateVocab(${idx}, 'exampleVi', this.value)" class="w-full px-3 py-1.5 glass-input rounded-lg text-xs text-slate-800">
          </div>
        </div>
      </div>
    `).join('');
  },

  addVocab() {
    this.currentLesson.vocabulary.push({
      id: `v-${Date.now()}`,
      term: "Asymptote",
      ipa: "/ˈæs.ɪm.toʊt/",
      pos: "noun",
      meaningVi: "Đường tiệm cận",
      exampleEn: "The line $x = 0$ is a vertical asymptote.",
      exampleVi: "Đường thẳng $x = 0$ là tiệm cận đứng."
    });
    this.saveLessonToStorage();
    this.renderVocabularyEditor();
  },

  updateVocab(idx, field, val) {
    this.currentLesson.vocabulary[idx][field] = val;
    this.saveLessonToStorage();
  },

  deleteVocab(idx) {
    this.currentLesson.vocabulary.splice(idx, 1);
    this.saveLessonToStorage();
    this.renderVocabularyEditor();
  },

  // 3. Examples Editor
  renderExamplesEditor() {
    const container = document.getElementById('builder-examples-list');
    if (!container) return;
    const examples = this.currentLesson.examples || [];

    container.innerHTML = examples.map((ex, exIdx) => `
      <div class="glass-card p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
            Ví dụ mẫu #${exIdx + 1}
          </span>
          <button onclick="App.deleteExample(${exIdx})" class="text-slate-500 hover:text-rose-600 text-xs cursor-pointer">🗑️ Xóa ví dụ này</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Tiêu đề ví dụ (English):</label>
            <input type="text" value="${ex.titleEn || ''}" oninput="App.updateExample(${exIdx}, 'titleEn', this.value)" class="w-full px-3.5 py-2 glass-input rounded-xl text-sm font-semibold text-slate-900">
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Tiêu đề (Tiếng Việt):</label>
            <input type="text" value="${ex.titleVi || ''}" oninput="App.updateExample(${exIdx}, 'titleVi', this.value)" class="w-full px-3.5 py-2 glass-input rounded-xl text-sm font-semibold text-slate-900">
          </div>
        </div>

        <div>
          <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Đề bài (English Problem Statement - hỗ trợ $LaTeX$):</label>
          <textarea rows="2" oninput="App.updateExample(${exIdx}, 'problemEn', this.value)" class="w-full p-3 glass-input rounded-xl text-xs text-slate-800">${ex.problemEn || ''}</textarea>
        </div>
        <div>
          <label class="block text-[11px] font-semibold text-slate-600 uppercase mb-1">Dịch đề bài (Tiếng Việt):</label>
          <textarea rows="2" oninput="App.updateExample(${exIdx}, 'problemVi', this.value)" class="w-full p-3 glass-input rounded-xl text-xs text-slate-800">${ex.problemVi || ''}</textarea>
        </div>

        <!-- Steps List -->
        <div class="space-y-3 pt-3 border-t border-slate-200">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-700 uppercase">Các bước giải (Step-by-step Solution):</span>
            <button onclick="App.addStep(${exIdx})" class="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-all text-xs font-semibold cursor-pointer">
              ➕ Thêm bước giải
            </button>
          </div>

          <div class="space-y-3">
            ${(ex.steps || []).map((st, stIdx) => `
              <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-indigo-700">Bước ${stIdx + 1}</span>
                  <button onclick="App.deleteStep(${exIdx}, ${stIdx})" class="text-slate-500 hover:text-rose-600 text-xs cursor-pointer">Xóa bước</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" value="${st.titleEn || ''}" oninput="App.updateStep(${exIdx}, ${stIdx}, 'titleEn', this.value)" placeholder="Tiêu đề bước (En)..." class="px-3 py-1.5 glass-input rounded-lg text-xs font-semibold text-slate-900">
                  <input type="text" value="${st.titleVi || ''}" oninput="App.updateStep(${exIdx}, ${stIdx}, 'titleVi', this.value)" placeholder="Tiêu đề bước (Vi)..." class="px-3 py-1.5 glass-input rounded-lg text-xs font-semibold text-slate-900">
                </div>
                <div>
                  <textarea rows="1" oninput="App.updateStep(${exIdx}, ${stIdx}, 'latex', this.value)" placeholder="Công thức LaTeX của bước..." class="w-full p-2 glass-input rounded-lg text-xs font-mono text-slate-900">${st.latex || ''}</textarea>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <textarea rows="2" oninput="App.updateStep(${exIdx}, ${stIdx}, 'explanationEn', this.value)" placeholder="Giải thích bước (En)..." class="p-2 glass-input rounded-lg text-xs text-slate-800">${st.explanationEn || ''}</textarea>
                  <textarea rows="2" oninput="App.updateStep(${exIdx}, ${stIdx}, 'explanationVi', this.value)" placeholder="Giải thích bước (Vi)..." class="p-2 glass-input rounded-lg text-xs text-slate-800">${st.explanationVi || ''}</textarea>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');
  },

  addExample() {
    this.currentLesson.examples.push({
      id: `ex-${Date.now()}`,
      titleEn: "Finding Extrema of Function",
      titleVi: "Tìm Cực trị của Hàm số",
      problemEn: "Find the local extrema of $f(x) = x^2 - 4x + 3$.",
      problemVi: "Tìm cực trị của hàm số $f(x) = x^2 - 4x + 3$.",
      steps: [
        {
          stepNum: 1,
          titleEn: "Calculate derivative",
          titleVi: "Tính đạo hàm",
          latex: "f'(x) = 2x - 4",
          explanationEn: "Differentiate $f(x)$ with respect to $x$.",
          explanationVi: "Lấy đạo hàm của $f(x)$ theo biến $x$."
        }
      ]
    });
    this.saveLessonToStorage();
    this.renderExamplesEditor();
    this.triggerMathJax();
  },

  updateExample(idx, field, val) {
    this.currentLesson.examples[idx][field] = val;
    this.saveLessonToStorage();
  },

  deleteExample(idx) {
    this.currentLesson.examples.splice(idx, 1);
    this.saveLessonToStorage();
    this.renderExamplesEditor();
  },

  addStep(exIdx) {
    const ex = this.currentLesson.examples[exIdx];
    const nextNum = (ex.steps.length || 0) + 1;
    ex.steps.push({
      stepNum: nextNum,
      titleEn: `Step ${nextNum}`,
      titleVi: `Bước ${nextNum}`,
      latex: "f'(x) = 0 \\implies x = 2",
      explanationEn: "Solve for critical points.",
      explanationVi: "Giải phương trình tìm điểm tới hạn."
    });
    this.saveLessonToStorage();
    this.renderExamplesEditor();
    this.triggerMathJax();
  },

  updateStep(exIdx, stIdx, field, val) {
    this.currentLesson.examples[exIdx].steps[stIdx][field] = val;
    this.saveLessonToStorage();
    this.triggerMathJax();
  },

  deleteStep(exIdx, stIdx) {
    this.currentLesson.examples[exIdx].steps.splice(stIdx, 1);
    this.saveLessonToStorage();
    this.renderExamplesEditor();
  },

  // 4. Visualizer Editor
  renderVisualizerEditor() {
    const v = this.currentLesson.visualizer || {};
    const geoInput = document.getElementById('visualizer-geogebra-id');
    const formulaInput = document.getElementById('visualizer-formula-display');
    if (geoInput) geoInput.value = v.geogebraId || '';
    if (formulaInput) formulaInput.value = v.formulaDisplay || '';
  },

  updateVisualizer(field, val) {
    if (!this.currentLesson.visualizer) {
      this.currentLesson.visualizer = {};
    }
    this.currentLesson.visualizer[field] = val;
    this.saveLessonToStorage();
  },

  // ==========================================
  // TAB 2: QUIZ BUILDER (SOẠN ĐỀ THI)
  // ==========================================
  renderQuizBuilder() {
    const quiz = this.currentLesson.quiz || { questions: [] };
    const titleEn = document.getElementById('quiz-title-en');
    const titleVi = document.getElementById('quiz-title-vi');
    const timeMin = document.getElementById('quiz-time-minutes');
    if (titleEn) titleEn.value = quiz.titleEn || '';
    if (titleVi) titleVi.value = quiz.titleVi || '';
    if (timeMin) timeMin.value = quiz.timeMinutes || 20;

    this.renderQuizQuestionsEditor();
  },

  updateQuizMeta(field, val) {
    this.currentLesson.quiz[field] = val;
    this.saveLessonToStorage();
  },

  renderQuizQuestionsEditor() {
    const container = document.getElementById('builder-questions-list');
    if (!container) return;
    const questions = this.currentLesson.quiz.questions || [];

    if (questions.length === 0) {
      container.innerHTML = `
        <div class="glass-card p-8 rounded-2xl text-center text-slate-400">
          <p class="font-semibold text-white">Chưa có câu hỏi nào trong đề thi.</p>
          <p class="text-xs text-slate-500 mt-1">Bấm các nút bên trên để thêm: 1. Trắc nghiệm ABCD, 2. Đúng/Sai 4 mệnh đề, hoặc 3. Điền đáp án ngắn.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = questions.map((q, idx) => `
      <div class="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
        <!-- Question Top Bar -->
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 font-bold text-xs border border-indigo-200 shadow-2xs">Câu ${idx + 1}</span>
            <span class="px-3 py-1 rounded-lg text-xs font-bold border shadow-2xs ${
              q.type === 'true-false-4' ? 'bg-teal-50 text-teal-800 border-teal-200' :
              (q.type === 'multiple-choice' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
              'bg-purple-50 text-purple-800 border-purple-200')
            }">
              ${q.type === 'multiple-choice' ? 'Trắc nghiệm 4 lựa chọn' : (q.type === 'true-false-4' ? 'Đúng/Sai 4 Mệnh đề' : 'Điền đáp án')}
            </span>
          </div>
          <div class="flex flex-wrap items-center gap-2 sm:gap-3">
            <div class="flex items-center gap-1 text-xs text-slate-500">
              <span class="font-semibold text-slate-600">Mức độ:</span>
              <select onchange="App.updateQuestionField(${idx}, 'level', this.value)" class="px-2 py-1 rounded-lg border border-slate-300 text-xs font-bold text-slate-800 bg-white shadow-2xs">
                <option value="NB" ${(q.level || 'TH') === 'NB' ? 'selected' : ''}>🟢 Nhận biết (NB)</option>
                <option value="TH" ${(q.level || 'TH') === 'TH' ? 'selected' : ''}>🔵 Thông hiểu (TH)</option>
                <option value="VD" ${(q.level || 'TH') === 'VD' ? 'selected' : ''}>🟠 Vận dụng (VD)</option>
                <option value="VDC" ${(q.level || 'TH') === 'VDC' ? 'selected' : ''}>🔴 Vận dụng cao (VDC)</option>
              </select>
            </div>
            <div class="flex items-center gap-1 text-xs text-slate-500">
              <span class="font-semibold text-slate-600">Điểm:</span>
              <input type="number" step="0.25" value="${q.points}" onchange="App.updateQuestionField(${idx}, 'points', parseFloat(this.value))" class="w-16 px-2 py-1 rounded-lg border border-slate-300 text-center text-xs font-bold text-slate-800 bg-white shadow-2xs">
            </div>
            <button id="btn-ai-gen-single-${idx}" onclick="App.autoGenerateSingleQuestionAI(${idx})" class="px-3 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs" title="AI tự động soạn lại câu hỏi này theo đúng mức độ ${q.level || 'TH'}">
              <span>✨</span> <span>Soạn Tự Động (${q.level || 'TH'})</span>
            </button>
            <button onclick="App.deleteQuestion(${idx})" class="text-slate-400 hover:text-rose-600 text-xs transition-colors cursor-pointer" title="Xóa câu hỏi">🗑️ Xóa</button>
          </div>
        </div>

        <!-- Question Stems -->
        <div class="space-y-2">
          <div>
            <label class="block text-[11px] font-bold text-slate-700 uppercase mb-1">Nội dung câu hỏi (English - có hỗ trợ $LaTeX$):</label>
            <textarea rows="2" oninput="App.updateQuestionField(${idx}, 'stemEn', this.value)" class="w-full p-3 glass-input rounded-xl text-xs sm:text-sm font-medium">${q.stemEn || ''}</textarea>
          </div>
          <div>
            <label class="block text-[11px] font-bold text-slate-700 uppercase mb-1">Dịch nghĩa đề bài (Tiếng Việt):</label>
            <textarea rows="2" oninput="App.updateQuestionField(${idx}, 'stemVi', this.value)" class="w-full p-3 glass-input rounded-xl text-xs">${q.stemVi || ''}</textarea>
          </div>
        </div>

        <!-- Specific Type Inputs -->
        ${this.renderQuestionSpecificEditor(q, idx)}

        <!-- Explanation -->
        <div class="pt-3 border-t border-slate-100 space-y-2">
          <label class="block text-[11px] font-bold text-indigo-700 uppercase">Hướng dẫn giải chi tiết (Solutions & LaTeX explanations):</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <textarea rows="2" oninput="App.updateQuestionField(${idx}, 'explanationEn', this.value)" placeholder="Explanation in English..." class="p-3 glass-input rounded-xl text-xs">${q.explanationEn || ''}</textarea>
            <textarea rows="2" oninput="App.updateQuestionField(${idx}, 'explanationVi', this.value)" placeholder="Giải thích chi tiết tiếng Việt..." class="p-3 glass-input rounded-xl text-xs">${q.explanationVi || ''}</textarea>
          </div>
        </div>
      </div>
    `).join('');
  },

  renderQuestionSpecificEditor(q, qIdx) {
    if (q.type === 'multiple-choice') {
      return `
        <div class="space-y-2.5">
          <span class="block text-[11px] font-bold text-slate-700 uppercase">4 Phương án trả lời (Chọn radio để đặt đáp án đúng):</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${q.options.map((opt, optIdx) => `
              <div class="p-3 rounded-xl border ${opt.isCorrect ? 'border-emerald-300 bg-emerald-50/70' : 'border-slate-200 bg-slate-50/70'} flex items-center gap-2">
                <input type="radio" name="correct-radio-${qIdx}" ${opt.isCorrect ? 'checked' : ''} onchange="App.setCorrectMCOption(${qIdx}, '${opt.id}')" class="w-4 h-4 text-emerald-600">
                <span class="font-bold text-xs px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs">${opt.id}</span>
                <input type="text" value="${opt.text || ''}" oninput="App.updateMCOptionText(${qIdx}, ${optIdx}, this.value)" class="flex-1 px-2.5 py-1 glass-input rounded-lg text-xs" placeholder="Nội dung phương án...">
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (q.type === 'true-false-4') {
      return `
        <div class="space-y-2.5">
          <span class="block text-[11px] font-bold text-slate-700 uppercase">4 Mệnh đề Đúng / Sai (a, b, c, d):</span>
          <div class="space-y-2">
            ${q.propositions.map((p, pIdx) => `
              <div class="p-3 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-indigo-800">Mệnh đề ${p.id})</span>
                  <div class="flex items-center gap-3 text-xs">
                    <label class="flex items-center gap-1 cursor-pointer ${p.isCorrect ? 'text-emerald-700 font-bold' : 'text-slate-600'}">
                      <input type="radio" name="tf-truth-${qIdx}-${p.id}" ${p.isCorrect ? 'checked' : ''} onchange="App.updatePropositionTruth(${qIdx}, ${pIdx}, true)">
                      Đúng
                    </label>
                    <label class="flex items-center gap-1 cursor-pointer ${!p.isCorrect ? 'text-rose-700 font-bold' : 'text-slate-600'}">
                      <input type="radio" name="tf-truth-${qIdx}-${p.id}" ${!p.isCorrect ? 'checked' : ''} onchange="App.updatePropositionTruth(${qIdx}, ${pIdx}, false)">
                      Sai
                    </label>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" value="${p.textEn || ''}" oninput="App.updatePropositionField(${qIdx}, ${pIdx}, 'textEn', this.value)" placeholder="Proposition stem in English..." class="px-2.5 py-1 glass-input rounded-lg text-xs">
                  <input type="text" value="${p.textVi || ''}" oninput="App.updatePropositionField(${qIdx}, ${pIdx}, 'textVi', this.value)" placeholder="Dịch nghĩa mệnh đề..." class="px-2.5 py-1 glass-input rounded-lg text-xs">
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (q.type === 'short-answer') {
      return `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label class="block text-[10px] font-bold text-slate-700 uppercase mb-1">Đáp án đúng chuẩn:</label>
            <input type="text" value="${q.correctAnswer || ''}" oninput="App.updateQuestionField(${qIdx}, 'correctAnswer', this.value)" placeholder="Ví dụ: 3 hoặc -0.5..." class="w-full px-3 py-1.5 glass-input rounded-lg font-mono text-sm text-emerald-700 font-bold">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-700 uppercase mb-1">Dung sai cho phép ($\pm$ tolerance):</label>
            <input type="number" step="0.001" value="${q.tolerance || 0.01}" oninput="App.updateQuestionField(${qIdx}, 'tolerance', parseFloat(this.value))" class="w-full px-3 py-1.5 glass-input rounded-lg font-mono text-xs">
          </div>
          <div>
            <label class="block text-[10px] font-bold text-slate-700 uppercase mb-1">Đáp án tương đương (phân cách dấu phẩy):</label>
            <input type="text" value="${(q.acceptableAnswers || []).join(', ')}" oninput="App.updateQuestionField(${qIdx}, 'acceptableAnswers', this.value.split(',').map(s=>s.trim()))" placeholder="3, 3.0, +3" class="w-full px-3 py-1.5 glass-input rounded-lg font-mono text-xs">
          </div>
        </div>
      `;
    }
    return '';
  },

  addQuestion(type) {
    const qCount = (this.currentLesson.quiz.questions || []).length;
    let newQ = null;

    if (type === 'multiple-choice') {
      newQ = {
        id: `q-${Date.now()}`,
        type: 'multiple-choice',
        level: 'TH',
        points: 0.25,
        stemEn: "Evaluate the derivative of $f(x) = x^3 - 3x$ at $x = 2$.",
        stemVi: "Tính giá trị của đạo hàm $f'(2)$ biết $f(x) = x^3 - 3x$.",
        options: [
          { id: "A", text: "$9$", isCorrect: true },
          { id: "B", text: "$6$", isCorrect: false },
          { id: "C", text: "$3$", isCorrect: false },
          { id: "D", text: "$0$", isCorrect: false }
        ],
        explanationEn: "$f'(x) = 3x^2 - 3 \\implies f'(2) = 3(4) - 3 = 9$.",
        explanationVi: "Đạo hàm $f'(x) = 3x^2 - 3$, thay $x = 2$ ta được $9$."
      };
    } else if (type === 'true-false-4') {
      newQ = {
        id: `q-${Date.now()}`,
        type: 'true-false-4',
        level: 'TH',
        points: 1.0,
        stemEn: "Let $f(x) = x^3 - 3x^2 + 2$. Determine whether each statement is True or False:",
        stemVi: "Cho hàm số $f(x) = x^3 - 3x^2 + 2$. Xét tính Đúng / Sai của các mệnh đề sau:",
        propositions: [
          { id: "a", textEn: "The domain of $f$ is $\\mathbb{R}$.", textVi: "Tập xác định của hàm số là $\\mathbb{R}$.", isCorrect: true },
          { id: "b", textEn: "The derivative is $f'(x) = 3x^2 - 6x$.", textVi: "Đạo hàm là $f'(x) = 3x^2 - 6x$.", isCorrect: true },
          { id: "c", textEn: "The function has 3 distinct critical points.", textVi: "Hàm số có 3 điểm cực trị phân biệt.", isCorrect: false },
          { id: "d", textEn: "The local maximum value is $2$ at $x = 0$.", textVi: "Giá trị cực đại là $2$ tại $x = 0$.", isCorrect: true }
        ],
        explanationEn: "$f'(x) = 3x(x - 2) = 0 \\iff x = 0$ or $x = 2$. It has 2 critical points.",
        explanationVi: "Phương trình $f'(x) = 0$ có 2 nghiệm là $x = 0$ và $x = 2$."
      };
    } else if (type === 'short-answer') {
      newQ = {
        id: `q-${Date.now()}`,
        type: 'short-answer',
        level: 'VD',
        points: 0.5,
        stemEn: "Calculate the slope of the tangent line to $y = x^2$ at $x = 3$.",
        stemVi: "Tính hệ số góc của tiếp tuyến với parabol $y = x^2$ tại điểm có hoành độ $x = 3$.",
        correctAnswer: "6",
        acceptableAnswers: ["6", "+6", "6.0"],
        tolerance: 0.01,
        explanationEn: "$y' = 2x \\implies y'(3) = 2(3) = 6$.",
        explanationVi: "Hệ số góc bằng $y'(3) = 2 \\cdot 3 = 6$."
      };
    }

    if (newQ) {
      this.currentLesson.quiz.questions.push(newQ);
      this.saveLessonToStorage();
      this.renderQuizQuestionsEditor();
      this.triggerMathJax();
    }
  },

  updateQuestionField(idx, field, val) {
    if (!this.currentLesson || !this.currentLesson.quiz || !this.currentLesson.quiz.questions[idx]) return;
    this.currentLesson.quiz.questions[idx][field] = val;
    this.saveLessonToStorage();
    if (field === 'level') {
      const btn = document.getElementById(`btn-ai-gen-single-${idx}`);
      if (btn) {
        btn.innerHTML = `<span>✨</span> <span>Soạn Tự Động (${val})</span>`;
        btn.title = `AI tự động soạn lại câu hỏi này theo đúng mức độ ${val}`;
      }
    }
    this.triggerMathJax();
  },

  async autoGenerateSingleQuestionAI(qIndex) {
    if (!this.currentLesson || !this.currentLesson.quiz) return;
    const questions = this.currentLesson.quiz.questions;
    const q = questions[qIndex];
    if (!q) return;

    const btn = document.getElementById(`btn-ai-gen-single-${qIndex}`);
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span>⏳</span> <span>Đang soạn (${q.level || 'TH'})...</span>`;
    }

    const apiKey = localStorage.getItem('math_studio_gemini_api_key') || '';
    const preferredModel = localStorage.getItem('math_studio_gemini_model') || 'gemini-2.5-flash';
    const topic = this.currentLesson.meta?.titleVi || this.currentLesson.meta?.titleEn || this.currentLesson.quiz.titleVi || 'Toán THPT';
    const grade = this.currentLesson.meta?.grade || 'Khối 12';

    try {
      this.showToast(`🤖 AI đang tự động biên soạn Câu ${qIndex + 1} theo mức độ [${q.level || 'TH'}]...`);
      const newQ = await window.AIGenerator.generateSingleQuestionAI({
        type: q.type || 'multiple-choice',
        level: q.level || 'TH',
        topic: topic,
        grade: grade,
        apiKey: apiKey,
        preferredModel: preferredModel
      });

      // Preserve ID, points, type, level
      questions[qIndex] = {
        ...questions[qIndex],
        ...newQ,
        id: q.id || `q-${qIndex + 1}`,
        type: q.type || 'multiple-choice',
        level: q.level || 'TH',
        points: q.points || 1.0
      };

      this.saveLessonToStorage(true);
      this.renderQuizQuestionsEditor();
      this.triggerMathJax();
      this.showToast(`✅ Đã tự động soạn thành công Câu ${qIndex + 1} theo chuẩn mức độ [${q.level || 'TH'}]!`);
    } catch (err) {
      console.error('Lỗi khi tự động soạn câu hỏi:', err);
      this.showToast(`⚠️ Không thể tạo câu hỏi: ${err.message}`);
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }
  },

  async autoGenerateFullQuizAI() {
    if (!this.currentLesson) return;
    this.currentLesson.quiz = this.currentLesson.quiz || { questions: [] };
    let questions = this.currentLesson.quiz.questions;

    if (!questions || !questions.length) {
      const confirmInit = confirm('Chưa có câu hỏi nào trong đề thi. Bạn có muốn khởi tạo và soạn tự động 6 câu mẫu chuẩn ma trận (NB, TH, VD, VDC) không?');
      if (confirmInit) {
        this.currentLesson.quiz.questions = [
          { id: 'q1', type: 'multiple-choice', level: 'NB', points: 0.25, stemEn: '', stemVi: '' },
          { id: 'q2', type: 'multiple-choice', level: 'TH', points: 0.25, stemEn: '', stemVi: '' },
          { id: 'q3', type: 'multiple-choice', level: 'VD', points: 0.25, stemEn: '', stemVi: '' },
          { id: 'q4', type: 'true-false-4', level: 'TH', points: 1.0, stemEn: '', stemVi: '' },
          { id: 'q5', type: 'true-false-4', level: 'VD', points: 1.0, stemEn: '', stemVi: '' },
          { id: 'q6', type: 'short-answer', level: 'VDC', points: 0.5, stemEn: '', stemVi: '' }
        ];
        questions = this.currentLesson.quiz.questions;
      } else {
        return;
      }
    }

    const btn = document.getElementById('btn-ai-gen-full-quiz');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⏳</span> <span>AI Đang Soạn Tự Động Cả Bài...</span>';
    }

    const apiKey = localStorage.getItem('math_studio_gemini_api_key') || '';
    const preferredModel = localStorage.getItem('math_studio_gemini_model') || 'gemini-2.5-flash';
    const topic = this.currentLesson.meta?.titleVi || this.currentLesson.meta?.titleEn || this.currentLesson.quiz.titleVi || 'Toán THPT';
    const grade = this.currentLesson.meta?.grade || 'Khối 12';

    try {
      this.showToast(`🤖 Bắt đầu AI soạn tự động cả bài thi (${questions.length} câu) theo đúng các mức độ nhận thức đã chọn...`);
      const updatedQuestions = await window.AIGenerator.generateFullQuizAI({
        questions: questions,
        topic: topic,
        grade: grade,
        apiKey: apiKey,
        preferredModel: preferredModel,
        onProgress: (current, total, lvl) => {
          this.showToast(`⏳ AI đang soạn câu ${current}/${total} (Mức độ: ${lvl})...`);
        }
      });

      this.currentLesson.quiz.questions = updatedQuestions;
      this.saveLessonToStorage(true);
      this.renderQuizQuestionsEditor();
      this.triggerMathJax();
      this.showToast(`🎉 Đã hoàn thành soạn tự động cả bài thi (${updatedQuestions.length} câu) đúng chuẩn mức độ nhận thức!`);
    } catch (err) {
      console.error('Lỗi khi tự động soạn cả bài thi:', err);
      this.showToast(`⚠️ Lỗi khi soạn cả bài: ${err.message}`);
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalText;
      }
    }
  },

  setCorrectMCOption(qIdx, optId) {
    const q = this.currentLesson.quiz.questions[qIdx];
    q.options.forEach(o => {
      o.isCorrect = (o.id === optId);
    });
    this.saveLessonToStorage();
    this.renderQuizQuestionsEditor();
  },

  updateMCOptionText(qIdx, optIdx, text) {
    this.currentLesson.quiz.questions[qIdx].options[optIdx].text = text;
    this.saveLessonToStorage();
    this.triggerMathJax();
  },

  updatePropositionTruth(qIdx, pIdx, isCorrect) {
    this.currentLesson.quiz.questions[qIdx].propositions[pIdx].isCorrect = isCorrect;
    this.saveLessonToStorage();
  },

  updatePropositionField(qIdx, pIdx, field, val) {
    this.currentLesson.quiz.questions[qIdx].propositions[pIdx][field] = val;
    this.saveLessonToStorage();
    this.triggerMathJax();
  },

  deleteQuestion(idx) {
    if (confirm('Bạn có chắc muốn xóa câu hỏi này?')) {
      this.currentLesson.quiz.questions.splice(idx, 1);
      this.saveLessonToStorage();
      this.renderQuizQuestionsEditor();
      this.triggerMathJax();
    }
  },

  // ==========================================
  // TAB 3: LIVE PREVIEW & INTERACTIVE MODE
  // ==========================================
  renderInteractivePreview() {
    this.renderPreviewLesson();
    if (window.QuizEngine && this.currentLesson && this.currentLesson.quiz) {
      window.QuizEngine.init(this.currentLesson.quiz, this.previewMode === 'teacher');
    }
    this.switchPreviewSubTab(this.activeSubTabPreview || 'lesson');
  },

  switchPreviewSubTab(sub) {
    this.activeSubTabPreview = sub;
    const lView = document.getElementById('preview-panel-lesson');
    const qView = document.getElementById('preview-panel-quiz');
    const lBtn = document.getElementById('preview-tab-lesson-btn');
    const qBtn = document.getElementById('preview-tab-quiz-btn');

    if (sub === 'lesson') {
      if (lView) lView.classList.remove('hidden');
      if (qView) qView.classList.add('hidden');
      if (lBtn) lBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-indigo-700 shadow-xs transition-all';
      if (qBtn) qBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 transition-all';
      this.renderPreviewLesson();
    } else {
      if (lView) lView.classList.add('hidden');
      if (qView) qView.classList.remove('hidden');
      if (qBtn) qBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-indigo-700 shadow-xs transition-all';
      if (lBtn) lBtn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 transition-all';
      if (window.QuizEngine && this.currentLesson && this.currentLesson.quiz) {
        window.QuizEngine.init(this.currentLesson.quiz, this.previewMode === 'teacher');
      }
    }
    this.triggerMathJax();
  },

  toggleTeacherMode() {
    this.previewMode = (this.previewMode === 'student') ? 'teacher' : 'student';
    const btn = document.getElementById('btn-toggle-teacher-mode');
    if (btn) {
      btn.innerHTML = (this.previewMode === 'teacher')
        ? `👨‍🏫 <span>Chế độ:</span> <strong>Giáo viên (Hiện đáp án)</strong>`
        : `👨‍🎓 <span>Chế độ:</span> <strong>Học sinh (Làm bài trực tiếp)</strong>`;
      btn.className = (this.previewMode === 'teacher')
        ? 'px-3.5 py-1.5 rounded-xl text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 shadow-2xs flex items-center gap-1.5 cursor-pointer'
        : 'px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center gap-1.5 cursor-pointer';
    }
    if (window.QuizEngine && this.currentLesson && this.currentLesson.quiz) {
      window.QuizEngine.init(this.currentLesson.quiz, this.previewMode === 'teacher');
    }
    this.triggerMathJax();
  },

  renderPreviewLesson() {
    const container = document.getElementById('preview-panel-lesson');
    if (!container || !this.currentLesson) return;
    const lesson = this.currentLesson;

    const helperTitle = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(lesson.meta.titleEn, lesson.meta.titleVi) : '';
    const helperOverview = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(lesson.meta.overviewEn, lesson.meta.overviewVi) : '';

    // Vocabulary Cards
    const vocabCards = (lesson.vocabulary || []).map(v => {
      const vPill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(v.term, v.meaningVi) : '';
      const exPill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(v.exampleEn, v.exampleVi) : '';
      return `
        <div class="glass-card p-4 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col justify-between group shadow-xs">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <div>
                <h4 class="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                  <span>${v.term}</span>
                </h4>
                <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span class="font-mono text-teal-600 font-semibold">${v.ipa || ''}</span>
                  <span class="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-500">${v.pos || 'term'}</span>
                </div>
              </div>
              ${vPill}
            </div>
            <p class="text-xs sm:text-sm font-semibold text-emerald-700 vi-text mb-2.5">
              👉 ${v.meaningVi}
            </p>
            <div class="text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-700">
              <div class="latex-box p-1.5 mb-1 flex items-start justify-between gap-1">
                <span>${v.exampleEn}</span>
                ${exPill}
              </div>
              <div class="text-slate-500 italic vi-text text-[11px]">${v.exampleVi}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Concepts Cards
    const conceptCards = (lesson.concepts || []).map((c, i) => {
      const cTitlePill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(c.titleEn, c.titleVi) : '';
      const cDescPill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(c.descEn, c.descVi) : '';
      const cNotePill = c.notesEn && window.BilingualHelper ? window.BilingualHelper.renderInlinePill(c.notesEn, c.notesVi) : '';
      return `
        <div class="glass-card p-5 sm:p-6 rounded-2xl border-l-4 border-l-indigo-600 shadow-xs space-y-3">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h4 class="text-base sm:text-lg font-bold text-slate-900 flex items-center flex-wrap gap-1.5">
              <span>${i+1}. ${c.titleEn}</span>
              ${cTitlePill}
            </h4>
            <span class="text-sm font-medium text-indigo-700 vi-text">(${c.titleVi})</span>
          </div>
          
          <div class="bg-slate-50 p-4 rounded-xl border border-indigo-100 text-center my-3 overflow-x-auto latex-box">
            $$${c.latex}$$
          </div>

          <div class="space-y-2 text-xs sm:text-sm text-slate-700">
            <div class="leading-relaxed flex items-start flex-wrap gap-1">
              <strong class="text-slate-900">En:</strong>
              <span>${c.descEn}</span>
              ${cDescPill}
            </div>
            <p class="leading-relaxed text-slate-500 vi-text border-l-2 border-indigo-400 pl-3"><strong class="text-indigo-700">Vi:</strong> ${c.descVi}</p>
            ${c.notesEn ? `
              <div class="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <div class="flex items-start flex-wrap gap-1">
                  <span>💡 <strong>Note:</strong> ${c.notesEn}</span>
                  ${cNotePill}
                </div>
                <div class="vi-text mt-1 text-amber-800">👉 ${c.notesVi}</div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    // Examples Cards
    const exampleCards = (lesson.examples || []).map((ex, exIdx) => {
      const exTitlePill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(ex.titleEn, ex.titleVi) : '';
      const exProbPill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(ex.problemEn, ex.problemVi) : '';
      return `
        <div class="glass-card p-5 sm:p-6 rounded-2xl shadow-xs space-y-4">
          <div>
            <span class="px-2.5 py-1 rounded bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold">Example ${exIdx+1}</span>
            <h4 class="text-base sm:text-lg font-bold text-slate-900 mt-1.5 flex items-center flex-wrap gap-1.5">
              <span>${ex.titleEn}</span>
              ${exTitlePill}
              <span class="vi-text font-normal text-slate-500 text-sm">(${ex.titleVi})</span>
            </h4>
            <div class="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed">
              <div class="latex-box p-2 mb-2 flex items-start justify-between gap-2">
                <span>${ex.problemEn}</span>
                ${exProbPill}
              </div>
              <div class="vi-text text-slate-500 text-xs italic mt-2 border-t border-slate-200 pt-2">${ex.problemVi}</div>
            </div>
          </div>

          <div class="space-y-3 pt-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold uppercase text-slate-400 tracking-wider">Step-by-step Solution</span>
              <button onclick="App.revealAllStepsPreview('${ex.id}')" class="text-xs text-indigo-600 hover:text-indigo-800 underline font-medium cursor-pointer">
                Mở tất cả các bước (Show all)
              </button>
            </div>
            ${(ex.steps || []).map((st, sIdx) => {
              const stepIndex = st.stepNum !== undefined ? st.stepNum : (sIdx + 1);
              const exampleId = ex.id || `ex-${exIdx + 1}`;
              const stTitlePill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(st.titleEn || '', st.titleVi || '') : '';
              const stExpPill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(st.explanationEn || '', st.explanationVi || '') : '';
              return `
                <div id="prev-step-${exampleId}-${stepIndex}" class="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all">
                  <div onclick="App.toggleStepPreview('${exampleId}', ${stepIndex})" class="w-full text-left p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer select-none">
                    <div class="font-semibold text-xs sm:text-sm text-slate-800 flex items-center flex-wrap gap-1.5 flex-1 pr-2">
                      <span class="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-200 shrink-0">${stepIndex}</span>
                      <span>${st.titleEn || `Step ${stepIndex}`}</span>
                      <span onclick="event.stopPropagation()">${stTitlePill}</span>
                      ${st.titleVi ? `<span class="vi-text text-slate-400 text-xs font-normal">(${st.titleVi})</span>` : ''}
                    </div>
                    <span id="prev-step-icon-${exampleId}-${stepIndex}" class="text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs">➕ Mở bước này</span>
                  </div>
                  <div id="prev-step-content-${exampleId}-${stepIndex}" class="p-4 pt-1 border-t border-slate-100 hidden bg-slate-50 text-sm">
                    ${st.latex ? `
                      <div class="p-3 bg-white rounded-lg my-2 border border-slate-200 text-center latex-box overflow-x-auto text-slate-900">
                        $$${st.latex}$$
                      </div>
                    ` : ''}
                    <div class="text-xs sm:text-sm text-slate-700 flex items-start flex-wrap gap-1.5 mt-2">
                      <span>${st.explanationEn || ''}</span>
                      <span onclick="event.stopPropagation()">${stExpPill}</span>
                    </div>
                    ${st.explanationVi ? `<p class="text-xs text-slate-500 italic vi-text mt-1">${st.explanationVi}</p>` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    container.innerHTML = `
      <!-- 1. Header Banner -->
      <div id="preview-lesson-banner" class="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-100 bg-gradient-to-r from-white via-indigo-50/30 to-amber-50/20 shadow-xs space-y-3">
        <span class="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2 inline-block shadow-2xs">
          ${lesson.meta.grade || 'Toán THPT'} • Thời lượng: ${lesson.meta.duration || '45 phút'}
        </span>
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center flex-wrap gap-2">
          <span>${lesson.meta.titleEn}</span>
          ${helperTitle}
        </h2>
        <h3 class="text-base sm:text-lg text-indigo-700 font-semibold mb-2 vi-text">${lesson.meta.titleVi}</h3>
        <div class="text-slate-600 text-xs sm:text-sm leading-relaxed mb-2 flex items-start flex-wrap gap-1.5 font-medium">
          <span>${lesson.meta.overviewEn}</span>
          ${helperOverview}
        </div>
        <p class="text-slate-500 text-xs italic leading-relaxed vi-text border-l-2 border-indigo-400 pl-3">${lesson.meta.overviewVi}</p>
      </div>

      <!-- 2. Vocabulary Section -->
      ${vocabCards ? `
        <section class="space-y-4">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-sm border border-teal-200">🗣️</span>
              <span>Cầu Nối Thuật Ngữ Toán Học (Bilingual Vocabulary)</span>
            </h3>
            <span class="text-xs text-slate-400 font-medium">${(lesson.vocabulary || []).length} thuật ngữ</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            ${vocabCards}
          </div>
        </section>
      ` : ''}

      <!-- 3. Concepts & Theorems Section -->
      ${conceptCards ? `
        <section class="space-y-4">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm border border-indigo-200">📐</span>
              <span>Khái Niệm & Định Lý Cốt Lõi (Core Concepts & Theorems)</span>
            </h3>
            <span class="text-xs text-slate-400 font-medium">${(lesson.concepts || []).length} định lý</span>
          </div>
          <div class="space-y-4">
            ${conceptCards}
          </div>
        </section>
      ` : ''}

      <!-- 4. Worked Examples Section -->
      ${exampleCards ? `
        <section class="space-y-4">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <h3 class="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span class="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm border border-purple-200">💡</span>
              <span>Ví Dụ Mẫu & Hướng Dẫn Giải Từng Bước (Worked Examples)</span>
            </h3>
            <span class="text-xs text-slate-400 font-medium">${(lesson.examples || []).length} ví dụ</span>
          </div>
          <div class="space-y-6">
            ${exampleCards}
          </div>
        </section>
      ` : ''}
    `;
  },

  toggleStepPreview(exId, stepNum) {
    const content = document.getElementById(`prev-step-content-${exId}-${stepNum}`);
    const icon = document.getElementById(`prev-step-icon-${exId}-${stepNum}`);
    if (!content) return;
    if (content.classList.contains('hidden')) {
      content.classList.remove('hidden');
      if (icon) {
        icon.innerText = '➖ Ẩn bước';
        icon.className = 'text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs';
      }
      this.triggerMathJax();
    } else {
      content.classList.add('hidden');
      if (icon) {
        icon.innerText = '➕ Mở bước này';
        icon.className = 'text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs';
      }
    }
  },

  revealAllStepsPreview(exId) {
    const contents = document.querySelectorAll(`[id^="prev-step-content-${exId}"]`);
    const icons = document.querySelectorAll(`[id^="prev-step-icon-${exId}"]`);
    contents.forEach(c => c.classList.remove('hidden'));
    icons.forEach(i => {
      i.innerText = '➖ Ẩn bước';
      i.className = 'text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs';
    });
    this.triggerMathJax();
  },

  // ==========================================
  // INTERACTIVE CANVAS GRAPHER COMPONENT
  // ==========================================
  initCanvasGrapher() {
    const canvas = document.getElementById('interactive-math-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Controls
    const sliderA = document.getElementById('graph-slider-a');
    const sliderB = document.getElementById('graph-slider-b');
    const sliderC = document.getElementById('graph-slider-c');
    const displayA = document.getElementById('val-slider-a');
    const displayB = document.getElementById('val-slider-b');
    const displayC = document.getElementById('val-slider-c');

    const draw = () => {
      const a = sliderA ? parseFloat(sliderA.value) : 1;
      const b = sliderB ? parseFloat(sliderB.value) : -3;
      const c = sliderC ? parseFloat(sliderC.value) : 0;

      if (displayA) displayA.innerText = a;
      if (displayB) displayB.innerText = b;
      if (displayC) displayC.innerText = c;

      const w = canvas.width;
      const h = canvas.height;
      const ox = w / 2;
      const oy = h / 2;
      const scale = 35; // px per math unit

      // Clear
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = ox % scale; x < w; x += scale) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = oy % scale; y < h; y += scale) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Coordinate axes
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, oy);
      ctx.lineTo(w, oy); // X-axis
      ctx.moveTo(ox, 0);
      ctx.lineTo(ox, h); // Y-axis
      ctx.stroke();

      // Plot Cubic Function f(x) = a*x^3 + b*x + c
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();

      let started = false;
      for (let px = 0; px <= w; px += 2) {
        const x = (px - ox) / scale;
        const y = a * Math.pow(x, 3) + b * x + c;
        const py = oy - y * scale;

        if (py >= -200 && py <= h + 200) {
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
      }
      ctx.stroke();

      // Draw Critical Points (f'(x) = 3a x^2 + b = 0 => x^2 = -b / (3a))
      if (a !== 0 && (-b / (3 * a)) >= 0) {
        const root = Math.sqrt(-b / (3 * a));
        const roots = [root, -root];

        roots.forEach(rx => {
          const ry = a * Math.pow(rx, 3) + b * rx + c;
          const rpx = ox + rx * scale;
          const rpy = oy - ry * scale;

          if (rpx >= 0 && rpx <= w && rpy >= 0 && rpy <= h) {
            // Draw marker
            ctx.fillStyle = '#f43f5e';
            ctx.beginPath();
            ctx.arc(rpx, rpy, 6, 0, Math.PI * 2);
            ctx.fill();

            // Draw horizontal tangent line
            ctx.strokeStyle = '#fb7185';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(rpx - 40, rpy);
            ctx.lineTo(rpx + 40, rpy);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      }
    };

    [sliderA, sliderB, sliderC].forEach(s => {
      if (s) s.addEventListener('input', draw);
    });

    draw();
  },

  // ==========================================
  // EXPORT AND IMPORT ACTIONS
  // ==========================================
  exportStandaloneHTML() {
    Exporter.exportStandaloneHTML(this.currentLesson);
    this.showToast('Đã đóng gói và tải xuống file HTML độc lập!');
  },

  openPrintModal() {
    const modal = document.getElementById('print-options-modal');
    if (modal) modal.classList.remove('hidden');
  },

  closePrintModal() {
    const modal = document.getElementById('print-options-modal');
    if (modal) modal.classList.add('hidden');
  },

  executePrint(includeSolutions) {
    this.closePrintModal();
    Exporter.printWorksheetA4(this.currentLesson, { includeSolutions });
  },

  openScaffoldingIntroModal() {
    const modal = document.getElementById('modal-scaffolding-intro');
    if (modal) modal.classList.remove('hidden');
  },

  closeScaffoldingIntroModal() {
    const modal = document.getElementById('modal-scaffolding-intro');
    if (modal) modal.classList.add('hidden');
  },

  openExportWordModal() {
    const modal = document.getElementById('export-word-modal');
    if (modal) modal.classList.remove('hidden');
  },

  closeExportWordModal() {
    const modal = document.getElementById('export-word-modal');
    if (modal) modal.classList.add('hidden');
  },

  openFeedbackModal() {
    const modal = document.getElementById('modal-feedback');
    if (modal) modal.classList.remove('hidden');
  },

  closeFeedbackModal() {
    const modal = document.getElementById('modal-feedback');
    if (modal) modal.classList.add('hidden');
  },

  submitFeedback(event) {
    if (event) event.preventDefault();
    const type = document.getElementById('feedback-type')?.value || 'gop-y';
    const content = document.getElementById('feedback-content')?.value || '';
    if (!content.trim()) {
      this.showToast('Vui lòng nhập nội dung góp ý hoặc mô tả lỗi!', 'error');
      return;
    }
    this.closeFeedbackModal();
    this.showToast('Cảm ơn thầy cô! Phản hồi đã được ghi nhận và gửi đến cô Huỳnh Thị Hà.', 'success');
    if (document.getElementById('feedback-content')) {
      document.getElementById('feedback-content').value = '';
    }
  },

  executeExportWord(mode) {
    this.closeExportWordModal();
    if (mode === 'student') {
      Exporter.exportWordDocument(this.currentLesson, { includeSolutions: false });
      this.showToast('Đã tải xuống Đề thi học sinh file Word (.doc)!');
    } else if (mode === 'teacher') {
      Exporter.exportWordDocument(this.currentLesson, { includeSolutions: true });
      this.showToast('Đã tải xuống Đề kèm Đáp án chi tiết file Word (.doc)!');
    } else if (mode === 'scaffold') {
      if (window.ScaffoldingTutor) {
        window.ScaffoldingTutor.exportWord();
      } else {
        this.showToast('Chưa có dữ liệu bài toán giàn giáo để xuất Word!');
      }
    }
  },

  exportJSON() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.currentLesson, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    const safeTitle = (this.currentLesson.meta.titleEn || 'Math_Lesson').replace(/[^a-zA-Z0-9_-]/g, '_');
    a.download = `${safeTitle}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  },

  triggerJSONImport() {
    const input = document.getElementById('import-file-input');
    if (input) input.click();
  },

  handleJSONFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.meta && parsed.quiz) {
          this.currentLesson = parsed;
          this.saveLessonToStorage(true);
          this.renderAll();
          this.showToast('Đã nhập bài giảng thành công!');
        } else {
          alert('Tệp JSON không đúng cấu trúc bài giảng của Math Bilingual Studio.');
        }
      } catch (err) {
        alert('Lỗi đọc tệp JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  },

  // ==========================================
  // AI & DOCUMENT AUTO-GENERATOR
  // ==========================================
  currentParsedDoc: null,

  openAIGeneratorModal(initialTab = 'curriculum') {
    const modal = document.getElementById('modal-ai-generator');
    if (modal) modal.classList.remove('hidden');
    this.switchAIGeneratorTab(initialTab);
    // Load saved gemini key and model if any
    const savedKey = localStorage.getItem('math_studio_gemini_api_key');
    const keyInput = document.getElementById('ai-gemini-key');
    const ocrKeyInput = document.getElementById('ai-ocr-gemini-key');
    if (savedKey) {
      if (keyInput) keyInput.value = savedKey;
      if (ocrKeyInput) ocrKeyInput.value = savedKey;
    }
    const savedModel = localStorage.getItem('math_studio_gemini_model');
    const modelSelect = document.getElementById('ai-gemini-model');
    if (modelSelect && savedModel) {
      modelSelect.value = savedModel;
    }
  },

  closeAIGeneratorModal() {
    const modal = document.getElementById('modal-ai-generator');
    if (modal) modal.classList.add('hidden');
  },

  switchAIGeneratorTab(tab) {
    const tabs = ['curriculum', 'document', 'gemini', 'ocr'];
    // Sync API key between tabs if user typed in one
    const geminiKey = document.getElementById('ai-gemini-key')?.value?.trim();
    const ocrKey = document.getElementById('ai-ocr-gemini-key')?.value?.trim();
    const commonKey = geminiKey || ocrKey || localStorage.getItem('math_studio_gemini_api_key');
    if (commonKey) {
      const gK = document.getElementById('ai-gemini-key');
      const oK = document.getElementById('ai-ocr-gemini-key');
      if (gK && !gK.value) gK.value = commonKey;
      if (oK && !oK.value) oK.value = commonKey;
    }

    tabs.forEach(t => {
      const panel = document.getElementById(`ai-tab-panel-${t}`);
      const btn = document.getElementById(`ai-tab-btn-${t}`);
      if (panel && btn) {
        if (t === tab) {
          panel.classList.remove('hidden');
          btn.className = 'px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer';
        } else {
          panel.classList.add('hidden');
          btn.className = 'px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all flex items-center gap-1.5 border border-transparent cursor-pointer';
        }
      }
    });
  },

  handleOCRImageUpload(event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      this.processOCRImageFile(file);
    }
  },

  handleOCRImageDrop(event) {
    event.preventDefault();
    const dt = event.dataTransfer;
    if (dt && dt.files && dt.files[0]) {
      this.processOCRImageFile(dt.files[0]);
    }
  },

  processOCRImageFile(file) {
    if (!file.type || !file.type.startsWith('image/')) {
      alert('Vui lòng chọn hoặc kéo thả tệp hình ảnh (PNG, JPG, JPEG, WebP)!');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const base64Data = dataUrl.split(',')[1];
      this.currentOCRImage = {
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        mimeType: file.type || 'image/jpeg',
        dataBase64: base64Data,
        dataUrl: dataUrl
      };
      this.renderOCRImagePreview();
    };
    reader.readAsDataURL(file);
  },

  renderOCRImagePreview() {
    const container = document.getElementById('ai-ocr-preview-container');
    const imgEl = document.getElementById('ai-ocr-preview-img');
    const nameEl = document.getElementById('ai-ocr-preview-name');
    const dropzone = document.getElementById('ai-ocr-dropzone');
    if (!this.currentOCRImage) {
      if (container) container.classList.add('hidden');
      if (dropzone) dropzone.classList.remove('hidden');
      return;
    }
    if (imgEl) imgEl.src = this.currentOCRImage.dataUrl;
    if (nameEl) nameEl.innerText = `${this.currentOCRImage.name} (${this.currentOCRImage.size})`;
    if (container) container.classList.remove('hidden');
    if (dropzone) dropzone.classList.add('hidden');
  },

  clearOCRImage() {
    this.currentOCRImage = null;
    const input = document.getElementById('ai-ocr-file-input');
    if (input) input.value = '';
    this.renderOCRImagePreview();
  },

  async generateWithGeminiVisionAI() {
    const keyInput = document.getElementById('ai-ocr-gemini-key') || document.getElementById('ai-gemini-key');
    let apiKey = keyInput?.value?.trim() || localStorage.getItem('math_studio_gemini_api_key');
    if (!apiKey) {
      apiKey = prompt('Vui lòng nhập Google Gemini API Key để quét và nhận diện ảnh đề thi:');
      if (!apiKey) return;
      if (keyInput) keyInput.value = apiKey;
    }
    localStorage.setItem('math_studio_gemini_api_key', apiKey);

    if (!this.currentOCRImage || !this.currentOCRImage.dataBase64) {
      alert('Vui lòng chọn hoặc kéo thả ảnh chụp đề thi/trang SGK trước khi quét!');
      return;
    }

    const modelSelect = document.getElementById('ai-ocr-model');
    const preferredModel = modelSelect ? modelSelect.value : 'gemini-2.5-flash';
    const customPrompt = document.getElementById('ai-ocr-prompt')?.value?.trim() || '';
    const statusEl = document.getElementById('ai-ocr-status');
    const btn = document.getElementById('btn-run-ocr-ai');

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="inline-block animate-spin mr-1.5">🌀</span> Đang OCR Công Thức & Dịch Song Ngữ...`;
    }
    if (statusEl) {
      statusEl.className = 'text-xs text-indigo-700 font-semibold p-2.5 bg-indigo-50 rounded-xl border border-indigo-200';
      statusEl.innerHTML = `Đang gửi ảnh chụp lên Gemini Vision (Model: ${preferredModel}) để nhận diện công thức LaTeX và trích xuất cấu trúc đề thi 4 mức độ...`;
    }

    try {
      const generated = await window.AIGenerator.generateWithGeminiVision(
        apiKey,
        this.currentOCRImage.dataBase64,
        this.currentOCRImage.mimeType,
        customPrompt,
        preferredModel,
        (currentModel) => {
          if (statusEl) {
            statusEl.innerText = `Đang phân tích hình ảnh và công thức với mô hình Google: ${currentModel}...`;
          }
        }
      );

      this.currentLesson = generated;
      this.saveLessonToStorage(true);
      this.renderAll();
      this.closeAIGeneratorModal();
      const modelUsed = generated.meta?.generatedByModel ? ` (Model: ${generated.meta.generatedByModel})` : '';
      this.showToast(`AI Vision đã quét ảnh và tạo đề thi song ngữ thành công!${modelUsed}`);
      this.switchTab('interactive-preview');
    } catch (err) {
      console.error('Gemini Vision OCR Error:', err);
      if (statusEl) {
        statusEl.className = 'text-xs text-rose-600 font-semibold p-3 bg-rose-50 rounded-xl border border-rose-200';
        statusEl.innerHTML = `⚠️ Lỗi quét ảnh: ${err.message}. Gợi ý: Kiểm tra API Key hoặc chọn mô hình gemini-2.5-flash / gemini-1.5-flash.`;
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = `<span>📸 Quét Ảnh & Tự Động Sinh Đề Thi Chuẩn</span>`;
      }
    }
  },

  calculateTestMatrix(quiz) {
    const questions = quiz?.questions || [];
    const matrix = {
      part1: { nbCount: 0, nbPts: 0, thCount: 0, thPts: 0, vdCount: 0, vdPts: 0, vdcCount: 0, vdcPts: 0, totalCount: 0, totalPts: 0 },
      part2: { nbCount: 0, nbPts: 0, thCount: 0, thPts: 0, vdCount: 0, vdPts: 0, vdcCount: 0, vdcPts: 0, totalCount: 0, totalPts: 0 },
      part3: { nbCount: 0, nbPts: 0, thCount: 0, thPts: 0, vdCount: 0, vdPts: 0, vdcCount: 0, vdcPts: 0, totalCount: 0, totalPts: 0 },
      totals: { nbCount: 0, nbPts: 0, thCount: 0, thPts: 0, vdCount: 0, vdPts: 0, vdcCount: 0, vdcPts: 0, grandCount: 0, grandPts: 0, nbPct: 0, thPct: 0, vdPct: 0, vdcPct: 0 }
    };

    questions.forEach(q => {
      let pKey = 'part1';
      if (q.type === 'true-false-4') pKey = 'part2';
      else if (q.type === 'short-answer') pKey = 'part3';

      const lvl = (q.level || 'TH').toUpperCase();
      const pts = typeof q.points === 'number' ? q.points : (parseFloat(q.points) || (pKey === 'part1' ? 0.25 : pKey === 'part2' ? 1.0 : 0.5));

      if (lvl === 'NB') {
        matrix[pKey].nbCount++;
        matrix[pKey].nbPts += pts;
      } else if (lvl === 'VD') {
        matrix[pKey].vdCount++;
        matrix[pKey].vdPts += pts;
      } else if (lvl === 'VDC') {
        matrix[pKey].vdcCount++;
        matrix[pKey].vdcPts += pts;
      } else {
        matrix[pKey].thCount++;
        matrix[pKey].thPts += pts;
      }

      matrix[pKey].totalCount++;
      matrix[pKey].totalPts += pts;
    });

    ['nb', 'th', 'vd', 'vdc'].forEach(k => {
      matrix.totals[`${k}Count`] = matrix.part1[`${k}Count`] + matrix.part2[`${k}Count`] + matrix.part3[`${k}Count`];
      matrix.totals[`${k}Pts`] = matrix.part1[`${k}Pts`] + matrix.part2[`${k}Pts`] + matrix.part3[`${k}Pts`];
    });

    matrix.totals.grandCount = matrix.part1.totalCount + matrix.part2.totalCount + matrix.part3.totalCount;
    matrix.totals.grandPts = matrix.part1.totalPts + matrix.part2.totalPts + matrix.part3.totalPts;

    if (matrix.totals.grandPts > 0) {
      matrix.totals.nbPct = Math.round((matrix.totals.nbPts / matrix.totals.grandPts) * 100);
      matrix.totals.thPct = Math.round((matrix.totals.thPts / matrix.totals.grandPts) * 100);
      matrix.totals.vdPct = Math.round((matrix.totals.vdPts / matrix.totals.grandPts) * 100);
      matrix.totals.vdcPct = Math.round((matrix.totals.vdcPts / matrix.totals.grandPts) * 100);
    }

    return matrix;
  },

  openTestMatrixModal() {
    const quiz = this.currentLesson?.quiz || { questions: [] };
    const m = this.calculateTestMatrix(quiz);
    const container = document.getElementById('test-matrix-table-container');
    if (container) {
      container.innerHTML = `
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left border-collapse border border-slate-300">
            <thead>
              <tr class="bg-indigo-50 text-indigo-900 text-center font-bold">
                <th rowspan="2" class="border border-slate-300 p-2.5 bg-slate-100 text-slate-800">Phần Thi & Định Dạng</th>
                <th colspan="2" class="border border-slate-300 p-2 bg-emerald-50 text-emerald-900">1. Nhận biết (NB)</th>
                <th colspan="2" class="border border-slate-300 p-2 bg-blue-50 text-blue-900">2. Thông hiểu (TH)</th>
                <th colspan="2" class="border border-slate-300 p-2 bg-amber-50 text-amber-900">3. Vận dụng (VD)</th>
                <th colspan="2" class="border border-slate-300 p-2 bg-rose-50 text-rose-900">4. Vận dụng cao (VDC)</th>
                <th colspan="2" class="border border-slate-300 p-2 bg-purple-50 text-purple-900">Tổng Cộng</th>
              </tr>
              <tr class="bg-slate-100 text-slate-800 text-center font-semibold">
                <th class="border border-slate-300 p-1.5">Số câu</th>
                <th class="border border-slate-300 p-1.5">Điểm</th>
                <th class="border border-slate-300 p-1.5">Số câu</th>
                <th class="border border-slate-300 p-1.5">Điểm</th>
                <th class="border border-slate-300 p-1.5">Số câu</th>
                <th class="border border-slate-300 p-1.5">Điểm</th>
                <th class="border border-slate-300 p-1.5">Số câu</th>
                <th class="border border-slate-300 p-1.5">Điểm</th>
                <th class="border border-slate-300 p-1.5">Số câu</th>
                <th class="border border-slate-300 p-1.5">Điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-300 p-2 font-bold text-slate-800">Phần I: Trắc nghiệm 4 lựa chọn</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-emerald-700">${m.part1.nbCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part1.nbPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-blue-700">${m.part1.thCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part1.thPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-amber-700">${m.part1.vdCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part1.vdPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-rose-700">${m.part1.vdcCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part1.vdcPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-bold text-indigo-900 bg-indigo-50/50">${m.part1.totalCount}</td>
                <td class="border border-slate-300 p-2 text-center font-bold text-indigo-900 bg-indigo-50/50">${m.part1.totalPts.toFixed(2)}</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-300 p-2 font-bold text-slate-800">Phần II: Đúng / Sai (4 mệnh đề)</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-emerald-700">${m.part2.nbCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part2.nbPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-blue-700">${m.part2.thCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part2.thPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-amber-700">${m.part2.vdCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part2.vdPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-rose-700">${m.part2.vdcCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part2.vdcPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-bold text-indigo-900 bg-indigo-50/50">${m.part2.totalCount}</td>
                <td class="border border-slate-300 p-2 text-center font-bold text-indigo-900 bg-indigo-50/50">${m.part2.totalPts.toFixed(2)}</td>
              </tr>
              <tr class="hover:bg-slate-50">
                <td class="border border-slate-300 p-2 font-bold text-slate-800">Phần III: Điền đáp số ngắn</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-emerald-700">${m.part3.nbCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part3.nbPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-blue-700">${m.part3.thCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part3.thPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-amber-700">${m.part3.vdCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part3.vdPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-semibold text-rose-700">${m.part3.vdcCount}</td>
                <td class="border border-slate-300 p-2 text-center text-slate-700">${m.part3.vdcPts.toFixed(2)}</td>
                <td class="border border-slate-300 p-2 text-center font-bold text-indigo-900 bg-indigo-50/50">${m.part3.totalCount}</td>
                <td class="border border-slate-300 p-2 text-center font-bold text-indigo-900 bg-indigo-50/50">${m.part3.totalPts.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="bg-indigo-50 font-bold text-indigo-950">
                <td class="border border-slate-300 p-2 font-extrabold uppercase">TỔNG SỐ CÂU</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-emerald-800 font-extrabold">${m.totals.nbCount} câu</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-blue-800 font-extrabold">${m.totals.thCount} câu</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-amber-800 font-extrabold">${m.totals.vdCount} câu</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-rose-800 font-extrabold">${m.totals.vdcCount} câu</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-purple-900 font-black text-sm">${m.totals.grandCount} CÂU</td>
              </tr>
              <tr class="bg-slate-100 font-bold text-slate-900">
                <td class="border border-slate-300 p-2 font-extrabold uppercase">TỔNG ĐIỂM</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-emerald-800 font-bold">${m.totals.nbPts.toFixed(2)} đ</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-blue-800 font-bold">${m.totals.thPts.toFixed(2)} đ</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-amber-800 font-bold">${m.totals.vdPts.toFixed(2)} đ</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-rose-800 font-bold">${m.totals.vdcPts.toFixed(2)} đ</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-purple-900 font-black text-sm">${m.totals.grandPts.toFixed(2)} ĐIỂM</td>
              </tr>
              <tr class="bg-amber-50 font-bold text-amber-950">
                <td class="border border-slate-300 p-2 font-extrabold uppercase">TỈ LỆ % ĐIỂM SỐ</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-emerald-700 font-extrabold text-sm">${m.totals.nbPct}%</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-blue-700 font-extrabold text-sm">${m.totals.thPct}%</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-amber-700 font-extrabold text-sm">${m.totals.vdPct}%</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-rose-700 font-extrabold text-sm">${m.totals.vdcPct}%</td>
                <td colspan="2" class="border border-slate-300 p-2 text-center text-purple-900 font-black text-sm">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span>ℹ️</span>
            <span>Khung chuẩn Bộ GD&ĐT khuyến nghị: <strong>40% Nhận biết</strong> • <strong>30% Thông hiểu</strong> • <strong>20% Vận dụng</strong> • <strong>10% Vận dụng cao</strong>.</span>
          </div>
          <span class="px-2 py-1 rounded bg-indigo-100 text-indigo-800 font-bold text-[11px]">GDPT 2018</span>
        </div>
      `;
    }
    const modal = document.getElementById('modal-test-matrix');
    if (modal) modal.classList.remove('hidden');
  },

  closeTestMatrixModal() {
    const modal = document.getElementById('modal-test-matrix');
    if (modal) modal.classList.add('hidden');
  },

  copyTestMatrixSummary() {
    const quiz = this.currentLesson?.quiz || { questions: [] };
    const m = this.calculateTestMatrix(quiz);
    const text = `BẢNG MA TRẬN ĐỀ THI (CHUẨN BỘ GIÁO DỤC VÀ ĐÀO TẠO)\n` +
      `Môn: Toán (Bilingual) - Tổng: ${m.totals.grandCount} câu (${m.totals.grandPts.toFixed(2)} điểm)\n` +
      `- 1. Nhận biết (NB): ${m.totals.nbCount} câu (${m.totals.nbPts.toFixed(2)} đ - ${m.totals.nbPct}%)\n` +
      `- 2. Thông hiểu (TH): ${m.totals.thCount} câu (${m.totals.thPts.toFixed(2)} đ - ${m.totals.thPct}%)\n` +
      `- 3. Vận dụng (VD): ${m.totals.vdCount} câu (${m.totals.vdPts.toFixed(2)} đ - ${m.totals.vdPct}%)\n` +
      `- 4. Vận dụng cao (VDC): ${m.totals.vdcCount} câu (${m.totals.vdcPts.toFixed(2)} đ - ${m.totals.vdcPct}%)\n`;
    navigator.clipboard.writeText(text).then(() => {
      this.showToast('Đã sao chép tóm tắt ma trận đề thi vào bộ nhớ tạm!');
    });
  },

  async handleDocumentFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const textarea = document.getElementById('ai-doc-textarea');
    const statusEl = document.getElementById('ai-doc-file-status');
    if (statusEl) {
      statusEl.innerText = `Đang đọc tệp: ${file.name}...`;
      statusEl.className = 'text-xs text-indigo-400 font-semibold';
    }

    const fileName = file.name.toLowerCase();

    try {
      if (fileName.endsWith('.docx')) {
        // Microsoft Word .docx using mammoth
        if (window.mammoth) {
          const arrayBuffer = await file.arrayBuffer();
          const res = await window.mammoth.extractRawText({ arrayBuffer: arrayBuffer });
          if (textarea) textarea.value = res.value;
          if (statusEl) statusEl.innerText = `Đã trích xuất xong từ tệp Word: ${file.name}`;
          this.analyzePastedDocument();
        } else {
          alert('Thư viện đọc Word (.docx) đang được tải, vui lòng thử lại sau giây lát!');
        }
      } else if (fileName.endsWith('.pdf')) {
        // PDF using pdfjsLib
        if (window.pdfjsLib) {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageStrings = content.items.map(item => item.str);
            fullText += `\n--- Trang ${i} ---\n` + pageStrings.join(' ');
          }
          if (textarea) textarea.value = fullText;
          if (statusEl) statusEl.innerText = `Đã trích xuất ${pdf.numPages} trang từ PDF: ${file.name}`;
          this.analyzePastedDocument();
        } else {
          alert('Thư viện đọc PDF đang được tải, vui lòng thử lại sau giây lát!');
        }
      } else {
        // Plain text, markdown, LaTeX, json
        const reader = new FileReader();
        reader.onload = (e) => {
          if (textarea) textarea.value = e.target.result;
          if (statusEl) statusEl.innerText = `Đã đọc thành công tệp: ${file.name}`;
          this.analyzePastedDocument();
        };
        reader.readAsText(file);
      }
    } catch (err) {
      console.error('File parsing error:', err);
      if (statusEl) {
        statusEl.innerText = `Lỗi đọc tệp: ${err.message}`;
        statusEl.className = 'text-xs text-rose-400 font-semibold';
      }
    }

    event.target.value = '';
  },

  analyzePastedDocument() {
    const textarea = document.getElementById('ai-doc-textarea');
    if (!textarea) return;
    const text = textarea.value.trim();
    if (!text) {
      const summary = document.getElementById('ai-doc-parse-summary');
      if (summary) summary.classList.add('hidden');
      return;
    }

    this.currentParsedDoc = AIGenerator.parseRawDocumentText(text);

    // Update UI summary
    const summary = document.getElementById('ai-doc-parse-summary');
    const badgeVocab = document.getElementById('parse-badge-vocab');
    const badgeConcepts = document.getElementById('parse-badge-concepts');
    const badgeQuestions = document.getElementById('parse-badge-questions');
    const titleEnInput = document.getElementById('parse-input-title-en');
    const titleViInput = document.getElementById('parse-input-title-vi');

    if (summary) summary.classList.remove('hidden');
    if (badgeVocab) badgeVocab.innerText = `${this.currentParsedDoc.vocabulary.length} Từ vựng`;
    if (badgeConcepts) badgeConcepts.innerText = `${this.currentParsedDoc.concepts.length} Định lý / Công thức`;
    if (badgeQuestions) badgeQuestions.innerText = `${this.currentParsedDoc.questions.length} Câu hỏi kiểm tra`;
    if (titleEnInput) titleEnInput.value = this.currentParsedDoc.detectedTitleEn || '';
    if (titleViInput) titleViInput.value = this.currentParsedDoc.detectedTitleVi || '';
  },

  generateFromCurriculumTopic(specificTopicKey) {
    const select = document.getElementById('ai-curriculum-select');
    const key = specificTopicKey || (select ? select.value : 'vectors-grade10');
    const aiGen = window.AIGenerator || (typeof AIGenerator !== 'undefined' ? AIGenerator : null);
    if (!aiGen) {
      alert('Module AI đang được tải lại từ trình duyệt. Vui lòng bấm tổ hợp phím Ctrl + Shift + R hoặc tải lại trang!');
      return;
    }
    const generated = aiGen.generateLessonFromTopic(key);
    if (generated) {
      this.currentLesson = generated;
      this.saveLessonToStorage(true);
      this.renderAll();
      this.closeAIGeneratorModal();
      this.showToast(`Đã tự động tạo bài học: "${generated.meta.titleVi || generated.meta.titleEn}"!`);
      this.switchTab('interactive-preview');
    }
  },

  generateFromParsedDocument() {
    const textarea = document.getElementById('ai-doc-textarea');
    const text = textarea ? textarea.value.trim() : '';

    if (!text && (!this.currentParsedDoc || (this.currentParsedDoc.vocabulary.length === 0 && this.currentParsedDoc.questions.length === 0))) {
      alert('Vui lòng tải lên tệp tài liệu hoặc dán nội dung văn bản trước khi tạo!');
      return;
    }

    const aiGen = window.AIGenerator || (typeof AIGenerator !== 'undefined' ? AIGenerator : null);
    if (!aiGen) {
      alert('Module AI đang được tải lại từ trình duyệt. Vui lòng bấm Ctrl + Shift + R hoặc F5!');
      return;
    }

    if (!this.currentParsedDoc) {
      this.currentParsedDoc = aiGen.parseRawDocumentText(text);
    }

    // Update custom titles if edited
    const titleEnInput = document.getElementById('parse-input-title-en');
    const titleViInput = document.getElementById('parse-input-title-vi');
    if (titleEnInput && titleEnInput.value.trim()) {
      this.currentParsedDoc.detectedTitleEn = titleEnInput.value.trim();
    }
    if (titleViInput && titleViInput.value.trim()) {
      this.currentParsedDoc.detectedTitleVi = titleViInput.value.trim();
    }

    const generated = aiGen.buildLessonFromParsedDoc(this.currentParsedDoc, text);
    this.currentLesson = generated;
    this.saveLessonToStorage(true);
    this.renderAll();
    this.closeAIGeneratorModal();
    this.showToast(`Đã tổng hợp bài giảng & đề thi từ tài liệu thành công!`);
    this.switchTab('interactive-preview');
  },

  handleModelChange() {
    const modelSelect = document.getElementById('ai-gemini-model');
    if (modelSelect) {
      localStorage.setItem('math_studio_gemini_model', modelSelect.value);
    }
  },

  async autoDetectGeminiModels() {
    const keyInput = document.getElementById('ai-gemini-key');
    const statusEl = document.getElementById('ai-gemini-status');
    const modelSelect = document.getElementById('ai-gemini-model');
    const apiKey = keyInput ? keyInput.value.trim() : '';

    if (!apiKey) {
      alert('Vui lòng nhập Google Gemini API Key trước khi quét mô hình khả dụng!');
      return;
    }

    const aiGen = window.AIGenerator || (typeof AIGenerator !== 'undefined' ? AIGenerator : null);
    if (!aiGen) return;

    if (statusEl) {
      statusEl.className = 'text-xs text-purple-400 font-semibold';
      statusEl.innerText = '🔍 Đang kết nối Google API để quét các mô hình được kích hoạt cho Key...';
    }

    try {
      const models = await aiGen.fetchAvailableModels(apiKey);
      if (models.length > 0 && modelSelect) {
        modelSelect.innerHTML = '';
        models.forEach(m => {
          const opt = document.createElement('option');
          opt.value = m;
          const isRec = m.includes('3.8-flash') || m.includes('flash');
          opt.text = isRec ? `🚀 ${m} (Khuyên dùng)` : m;
          modelSelect.appendChild(opt);
        });

        // Add auto fallback option
        const autoOpt = document.createElement('option');
        autoOpt.value = 'auto';
        autoOpt.text = '⚡ Tự động linh hoạt chuyển đổi (Auto-Fallback)';
        modelSelect.appendChild(autoOpt);

        const best = models.find(m => m.includes('3.8-flash')) || models.find(m => m.includes('flash')) || models[0];
        modelSelect.value = best;
        this.handleModelChange();

        if (statusEl) {
          statusEl.className = 'text-xs text-emerald-400 font-semibold';
          statusEl.innerText = `✅ Đã quét thành công ${models.length} mô hình tương thích! Đã chọn: ${best}`;
        }
      } else {
        if (statusEl) {
          statusEl.className = 'text-xs text-amber-400 font-semibold';
          statusEl.innerText = '⚠️ Không lấy được danh sách mô hình từ API. Sẽ sử dụng mặc định: gemini-3.8-flash.';
        }
      }
    } catch (e) {
      if (statusEl) {
        statusEl.className = 'text-xs text-rose-400 font-semibold';
        statusEl.innerText = `Lỗi quét model: ${e.message}`;
      }
    }
  },

  async generateWithGeminiAI() {
    const keyInput = document.getElementById('ai-gemini-key');
    const promptInput = document.getElementById('ai-gemini-prompt');
    const topicSelect = document.getElementById('ai-curriculum-select');
    const modelSelect = document.getElementById('ai-gemini-model');
    const statusEl = document.getElementById('ai-gemini-status');
    const btn = document.getElementById('btn-run-gemini-ai');

    const apiKey = keyInput ? keyInput.value.trim() : '';
    const promptText = promptInput ? promptInput.value.trim() : '';
    const preferredModel = modelSelect ? modelSelect.value : 'gemini-3.8-flash';

    // Intelligently detect target topic from prompt
    let fallbackTopic = 'vectors-sum-diff-grade10';
    const lowerP = promptText.toLowerCase();
    if (lowerP.includes('tổng') || lowerP.includes('hiệu') || lowerP.includes('cộng') || lowerP.includes('trừ')) {
      fallbackTopic = 'vectors-sum-diff-grade10';
    } else if (lowerP.includes('vecto') || lowerP.includes('vector')) {
      fallbackTopic = 'vectors-grade10';
    } else if (topicSelect) {
      fallbackTopic = topicSelect.value;
    }

    const aiGen = window.AIGenerator || (typeof AIGenerator !== 'undefined' ? AIGenerator : null);
    if (!aiGen) {
      if (statusEl) {
        statusEl.innerHTML = `
          <div class="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs">
            Trình duyệt của bạn đang lưu bộ nhớ đệm (cache) cũ. Vui lòng nhấn <strong>Ctrl + Shift + R</strong> (hoặc <strong>Ctrl + F5</strong>) để tải lại toàn bộ script mới nhất!
          </div>
        `;
      }
      return;
    }

    if (!apiKey) {
      // Fallback to offline smart engine
      const confirmOffline = confirm('Chưa có Gemini API Key. Bạn có muốn sử dụng Bộ Tạo Bài Giảng & Đề Thi Chuẩn Thông Minh Tích Hợp Sẵn không?');
      if (confirmOffline) {
        this.generateFromCurriculumTopic(fallbackTopic);
      }
      return;
    }

    // Save key & model
    localStorage.setItem('math_studio_gemini_api_key', apiKey);
    this.handleModelChange();

    if (btn) {
      btn.disabled = true;
      btn.innerText = '⏳ AI Đang Xử Lý & Sinh Bài Giảng...';
    }
    if (statusEl) {
      statusEl.innerText = `Đang kết nối Gemini API (${preferredModel}) và kết xuất bài học song ngữ kèm công thức LaTeX...`;
      statusEl.className = 'text-xs text-indigo-400 font-semibold';
    }

    try {
      const generated = await aiGen.generateWithGemini(
        apiKey, 
        promptText, 
        fallbackTopic, 
        preferredModel, 
        (currentModel) => {
          if (statusEl) {
            statusEl.className = 'text-xs text-indigo-400 font-semibold';
            statusEl.innerText = `Đang kết nối và xử lý với mô hình Google: ${currentModel}...`;
          }
        }
      );
      this.currentLesson = generated;
      this.saveLessonToStorage(true);
      this.renderAll();
      this.closeAIGeneratorModal();
      const modelUsed = generated.meta?.generatedByModel ? ` (Model: ${generated.meta.generatedByModel})` : '';
      this.showToast(`AI đã tạo bài giảng và đề thi song ngữ thành công!${modelUsed}`);
      this.switchTab('interactive-preview');
    } catch (err) {
      console.error('Gemini AI Generation Error:', err);
      if (statusEl) {
        statusEl.className = 'text-xs text-rose-300 font-semibold';
        const topicTitle = fallbackTopic === 'vectors-sum-diff-grade10' 
          ? 'Tổng và Hiệu Của Hai Vectơ - Toán 10' 
          : 'Các Khái Niệm Mở Đầu Về Vectơ - Toán 10';
        statusEl.innerHTML = `
          <div class="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2 text-left">
            <div class="text-rose-300 font-bold">⚠️ Không thể tạo bằng Gemini: ${err.message}</div>
            <div class="text-[11px] text-slate-300">Gợi ý: Bạn có thể chọn mô hình <strong>gemini-3.8-flash</strong> hoặc bấm <strong>"Quét Model Khả Dụng"</strong> ở trên, hoặc khởi tạo tức thì bài chuẩn:</div>
            <button type="button" onclick="App.generateFromCurriculumTopic('${fallbackTopic}')" class="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center gap-1.5 border border-indigo-200 shadow-2xs transition-all cursor-pointer">
              <span>🚀 Tạo Ngay Bài "${topicTitle}" (12 Câu Trắc Nghiệm)</span>
            </button>
          </div>
        `;
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerText = '✨ Khởi Chạy Sinh Bài Giảng Với Gemini';
      }
    }
  }
};

window.App = App;

window.addEventListener('DOMContentLoaded', () => {
  window.App = App;
  App.init();
});

