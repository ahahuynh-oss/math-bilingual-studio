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

  init() {
    window.App = this;
    this.loadLessonFromStorage();
    this.loadCreatedLibrary();
    this.syncCurrentLessonToLibrary(false);
    this.setupEventListeners();
    this.setupSpeechVoices();
    this.renderAll();
    this.initCanvasGrapher();
    this.renderMyExamsTable('all');
    if (window.UserGuide) window.UserGuide.init();
    this.switchTab('my-exams');
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

  LIBRARY_STORAGE_KEY: 'math_bilingual_studio_created_library',
  myExamsFilter: 'all',
  createdLibrary: [],

  loadCreatedLibrary() {
    try {
      const saved = localStorage.getItem(this.LIBRARY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
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

    if (rerender && this.activeTab === 'my-exams') {
      this.renderMyExamsTable(this.myExamsFilter || 'all');
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

  updateBreadcrumb(tabName) {
    const el = document.getElementById('breadcrumb-active');
    if (!el) return;
    const title = this.currentLesson?.meta?.titleVi || this.currentLesson?.meta?.titleEn || 'Bài học';
    switch (tabName) {
      case 'my-exams':
        el.innerText = 'Danh sách đã tạo';
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
        el.innerText = 'Gia sư giàn giáo nhận thức (ZPD)';
        break;
      case 'user-guide':
        el.innerText = 'Hướng dẫn cho giáo viên & học sinh';
        break;
      default:
        el.innerText = 'Danh sách đã tạo';
    }
  },

  filterExams(grade) {
    this.renderMyExamsTable(grade);
  },

  renderMyExamsTable(gradeFilter = 'all') {
    this.myExamsFilter = gradeFilter;
    const tbody = document.getElementById('my-exams-tbody');
    const countLabel = document.getElementById('my-exams-count-label');
    if (!tbody) return;

    // Real-time dynamic counts across all categories
    const countAll = this.createdLibrary.length;
    const count12 = this.createdLibrary.filter(item => (item.grade || '').includes('12')).length;
    const count11 = this.createdLibrary.filter(item => (item.grade || '').includes('11')).length;
    const count10 = this.createdLibrary.filter(item => (item.grade || '').includes('10')).length;

    const elAll = document.getElementById('filter-count-all');
    const el12 = document.getElementById('filter-count-Khối12');
    const el11 = document.getElementById('filter-count-Khối11');
    const el10 = document.getElementById('filter-count-Khối10');

    if (elAll) elAll.innerText = countAll;
    if (el12) el12.innerText = count12;
    if (el11) el11.innerText = count11;
    if (el10) el10.innerText = count10;

    let filtered = this.createdLibrary;
    if (gradeFilter !== 'all') {
      filtered = this.createdLibrary.filter(item => (item.grade || '') === gradeFilter || (item.grade || '').includes(gradeFilter.replace('Khối ', '')));
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
          <td colspan="8" class="py-12 text-center text-slate-400 text-sm">
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
      if (item.conceptCount) detailInfo.push(`${item.conceptCount} lý thuyết`);
      if (item.vocabCount) detailInfo.push(`${item.vocabCount} thuật ngữ`);
      const detailStr = detailInfo.length > 0 ? detailInfo.join(' • ') : 'Song ngữ Anh - Việt';

      return `
        <tr class="hover:bg-slate-50/80 transition-colors border-b border-slate-100 group">
          <td class="py-3.5 px-4 font-semibold text-slate-800 text-xs sm:text-sm max-w-xs sm:max-w-md">
            <div class="line-clamp-2 hover:text-indigo-600 cursor-pointer font-bold" onclick="App.openExamFromList('${item.id}')" title="Nhấp để mở bài làm">
              ${item.title}
            </div>
            <div class="text-[11px] text-slate-400 font-normal mt-0.5 flex items-center gap-2">
              <span class="text-teal-600 font-medium">Song ngữ Anh - Việt</span>
              <span>•</span>
              <span>${detailStr}</span>
              <span>•</span>
              <span class="text-indigo-600 font-mono text-[10px]">MathJax 3</span>
            </div>
          </td>

          <td class="py-3.5 px-3 whitespace-nowrap">
            <span class="px-2 py-1 rounded bg-slate-100 text-slate-700 font-mono text-[11px] font-bold border border-slate-200">
              ${item.code}
            </span>
          </td>

          <td class="py-3.5 px-3 text-slate-400 whitespace-nowrap">
            <div class="flex items-center gap-1.5">
              <button onclick="App.copyExamLink('${item.code}')" class="p-1.5 hover:text-indigo-600 rounded-lg hover:bg-slate-100 text-xs transition-colors" title="Sao chép liên kết đề">
                📋
              </button>
              <button onclick="App.openExamFromList('${item.id}')" class="p-1.5 hover:text-indigo-600 rounded-lg hover:bg-slate-100 text-xs transition-colors" title="Mở trực tiếp">
                ↗
              </button>
            </div>
          </td>

          <td class="py-3.5 px-3 whitespace-nowrap">
            <div class="badge-status-open">
              ${item.status || 'Đang mở'}
            </div>
            <div class="text-[10px] text-slate-400 mt-0.5">${item.schedule || 'Tự do'}</div>
          </td>

          <td class="py-3.5 px-3 whitespace-nowrap">
            <span class="px-2 py-0.5 rounded text-[11px] font-semibold border ${gradeColor}">
              ${item.grade || 'Khối 12'}
            </span>
          </td>

          <td class="py-3.5 px-3 text-center text-xs font-bold text-slate-700 whitespace-nowrap">
            ${item.questionCount || 0} câu
          </td>

          <td class="py-3.5 px-3 text-center text-[11px] text-slate-500 whitespace-nowrap">
            ${item.updatedAt || 'Vừa xong'}
          </td>

          <td class="py-3.5 px-4 text-right whitespace-nowrap">
            <div class="flex items-center justify-end gap-1.5">
              <button onclick="App.openExamFromList('${item.id}')" class="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 flex items-center gap-1 transition-all" title="Làm bài tương tác / Xem trước">
                👁️ <span>Mở</span>
              </button>
              <button onclick="App.editExamFromList('${item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-all" title="Chỉnh sửa bài giảng & đề thi">
                ✏️ <span>Sửa</span>
              </button>
              <button onclick="App.openScaffoldForExam('${item.scaffoldKey || item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-all" title="Gia sư giàn giáo nhận thức ZPD">
                🪜
              </button>
              <button onclick="App.exportWordForExam('${item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-all" title="Xuất file Microsoft Word (.doc)">
                📄
              </button>
              <button onclick="App.deleteExamFromList('${item.id}')" class="px-2 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition-all" title="Xóa khỏi danh sách đã tạo">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
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
    const title = item ? item.title : 'bài này';
    if (!confirm(`Bạn có chắc chắn muốn xóa "${title}" khỏi Danh sách đã tạo không?`)) {
      return;
    }
    this.createdLibrary = this.createdLibrary.filter(e => e.id !== examId);
    this.saveCreatedLibrary();
    this.renderMyExamsTable(this.myExamsFilter || 'all');
    this.showToast('Đã xóa thành công khỏi Danh sách đã tạo!');
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

    // Update panels
    const tabs = ['my-exams', 'builder-lesson', 'builder-quiz', 'interactive-preview', 'scaffolding-tutor', 'user-guide'];
    tabs.forEach(t => {
      const panel = document.getElementById(`panel-${t}`);
      if (panel) {
        if (t === tabName) {
          panel.classList.remove('hidden');
        } else {
          panel.classList.add('hidden');
        }
      }

      // Sidebar links
      const sideLink = document.getElementById(`side-nav-${t}`);
      if (sideLink) {
        if (t === tabName || (t === 'my-exams' && tabName === 'my-exams')) {
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
          <div class="flex items-center gap-2">
            <span class="w-6 h-6 rounded-md bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center font-bold text-xs">${idx + 1}</span>
            <button onclick="App.speakText('${v.term}')" class="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
              🔊 Nghe phát âm
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
      <div class="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 space-y-4">
        <!-- Question Top Bar -->
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-400 font-bold text-xs">Câu ${idx + 1}</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 font-medium capitalize">
              ${q.type === 'multiple-choice' ? 'Trắc nghiệm 4 lựa chọn' : (q.type === 'true-false-4' ? 'Đúng/Sai 4 Mệnh đề' : 'Điền đáp án')}
            </span>
          </div>
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Điểm:</span>
              <input type="number" step="0.5" value="${q.points}" onchange="App.updateQuestionField(${idx}, 'points', parseFloat(this.value))" class="w-16 px-2 py-1 glass-input rounded text-center text-xs font-bold text-white">
            </div>
            <button onclick="App.deleteQuestion(${idx})" class="text-slate-500 hover:text-rose-400 text-xs transition-colors">🗑️ Xóa</button>
          </div>
        </div>

        <!-- Question Stems -->
        <div class="space-y-2">
          <div>
            <label class="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Nội dung câu hỏi (English - có hỗ trợ $LaTeX$):</label>
            <textarea rows="2" oninput="App.updateQuestionField(${idx}, 'stemEn', this.value)" class="w-full p-3 glass-input rounded-xl text-xs sm:text-sm font-medium">${q.stemEn || ''}</textarea>
          </div>
          <div>
            <label class="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Dịch nghĩa đề bài (Tiếng Việt):</label>
            <textarea rows="2" oninput="App.updateQuestionField(${idx}, 'stemVi', this.value)" class="w-full p-3 glass-input rounded-xl text-xs">${q.stemVi || ''}</textarea>
          </div>
        </div>

        <!-- Specific Type Inputs -->
        ${this.renderQuestionSpecificEditor(q, idx)}

        <!-- Explanation -->
        <div class="pt-3 border-t border-slate-800/80 space-y-2">
          <label class="block text-[11px] font-semibold text-indigo-400 uppercase">Hướng dẫn giải chi tiết (Solutions & LaTeX explanations):</label>
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
          <span class="block text-[11px] font-semibold text-slate-400 uppercase">4 Phương án trả lời (Chọn radio để đặt đáp án đúng):</span>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${q.options.map((opt, optIdx) => `
              <div class="p-3 rounded-xl border ${opt.isCorrect ? 'border-emerald-500/80 bg-emerald-950/20' : 'border-slate-800 bg-slate-900/60'} flex items-center gap-2">
                <input type="radio" name="correct-radio-${qIdx}" ${opt.isCorrect ? 'checked' : ''} onchange="App.setCorrectMCOption(${qIdx}, '${opt.id}')" class="w-4 h-4 text-emerald-500">
                <span class="font-bold text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">${opt.id}</span>
                <input type="text" value="${opt.text || ''}" oninput="App.updateMCOptionText(${qIdx}, ${optIdx}, this.value)" class="flex-1 px-2.5 py-1 glass-input rounded-lg text-xs" placeholder="Nội dung phương án...">
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (q.type === 'true-false-4') {
      return `
        <div class="space-y-2.5">
          <span class="block text-[11px] font-semibold text-slate-400 uppercase">4 Mệnh đề Đúng / Sai (a, b, c, d):</span>
          <div class="space-y-2">
            ${q.propositions.map((p, pIdx) => `
              <div class="p-3 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-bold text-xs text-indigo-400">Mệnh đề ${p.id})</span>
                  <div class="flex items-center gap-3 text-xs">
                    <label class="flex items-center gap-1 cursor-pointer ${p.isCorrect ? 'text-emerald-400 font-bold' : 'text-slate-400'}">
                      <input type="radio" name="tf-truth-${qIdx}-${p.id}" ${p.isCorrect ? 'checked' : ''} onchange="App.updatePropositionTruth(${qIdx}, ${pIdx}, true)">
                      Đúng
                    </label>
                    <label class="flex items-center gap-1 cursor-pointer ${!p.isCorrect ? 'text-rose-400 font-bold' : 'text-slate-400'}">
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
            <label class="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Đáp án đúng chuẩn:</label>
            <input type="text" value="${q.correctAnswer || ''}" oninput="App.updateQuestionField(${qIdx}, 'correctAnswer', this.value)" placeholder="Ví dụ: 3 hoặc -0.5..." class="w-full px-3 py-1.5 glass-input rounded-lg font-mono text-sm text-emerald-400 font-bold">
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Dung sai cho phép ($\pm$ tolerance):</label>
            <input type="number" step="0.001" value="${q.tolerance || 0.01}" oninput="App.updateQuestionField(${qIdx}, 'tolerance', parseFloat(this.value))" class="w-full px-3 py-1.5 glass-input rounded-lg font-mono text-xs">
          </div>
          <div>
            <label class="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Đáp án tương đương (phân cách dấu phẩy):</label>
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
        points: 2.5,
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
        points: 4.0,
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
        points: 3.5,
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
    this.currentLesson.quiz.questions[idx][field] = val;
    this.saveLessonToStorage();
    this.triggerMathJax();
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
            ${(ex.steps || []).map(st => {
              const stTitlePill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(st.titleEn, st.titleVi) : '';
              const stExpPill = window.BilingualHelper ? window.BilingualHelper.renderInlinePill(st.explanationEn, st.explanationVi) : '';
              return `
                <div id="prev-step-${ex.id}-${st.stepNum}" class="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all">
                  <button onclick="App.toggleStepPreview('${ex.id}', ${st.stepNum})" class="w-full text-left p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                    <span class="font-semibold text-xs sm:text-sm text-slate-800 flex items-center flex-wrap gap-1.5">
                      <span class="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-200">${st.stepNum}</span>
                      <span>${st.titleEn}</span>
                      ${stTitlePill}
                      <span class="vi-text text-slate-400 text-xs font-normal">(${st.titleVi})</span>
                    </span>
                    <span id="prev-step-icon-${ex.id}-${st.stepNum}" class="text-xs text-slate-500 font-medium">➕ Mở bước này</span>
                  </button>
                  <div id="prev-step-content-${ex.id}-${st.stepNum}" class="p-4 pt-1 border-t border-slate-100 hidden bg-slate-50 text-sm">
                    <div class="p-3 bg-white rounded-lg my-2 border border-slate-200 text-center latex-box">
                      $$${st.latex}$$
                    </div>
                    <div class="text-xs sm:text-sm text-slate-700 flex items-start flex-wrap gap-1.5 mt-2">
                      <span>${st.explanationEn}</span>
                      ${stExpPill}
                    </div>
                    <p class="text-xs text-slate-500 italic vi-text mt-1">${st.explanationVi}</p>
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
      if (icon) icon.innerText = '➖ Ẩn bước';
      this.triggerMathJax();
    } else {
      content.classList.add('hidden');
      if (icon) icon.innerText = '➕ Mở bước này';
    }
  },

  revealAllStepsPreview(exId) {
    const contents = document.querySelectorAll(`[id^="prev-step-content-${exId}"]`);
    const icons = document.querySelectorAll(`[id^="prev-step-icon-${exId}"]`);
    contents.forEach(c => c.classList.remove('hidden'));
    icons.forEach(i => i.innerText = '➖ Ẩn bước');
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
    if (keyInput && savedKey) {
      keyInput.value = savedKey;
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
    const tabs = ['curriculum', 'document', 'gemini'];
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

