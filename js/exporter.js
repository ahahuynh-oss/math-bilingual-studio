/**
 * Export and Print Module for Math Bilingual Studio
 * Hỗ trợ xuất Standalone HTML offline (kèm Scaffolding Tutor), in A4, và xuất Word (.doc/.docx)
 */

function standaloneParseFormulaForSpeech(f, isVi) {
  if (!f) return '';
  var s = ' ' + String(f).trim() + ' ';
  s = s.replace(/\\text\{([^}]+)\}/g, ' $1 ')
       .replace(/\\mathrm\{([^}]+)\}/g, ' $1 ')
       .replace(/\\mathbf\{([^}]+)\}/g, ' $1 ')
       .replace(/\\left|\\right/g, ' ')
       .replace(/\\quad|\\qquad|\\,|\\;|\\!/g, ' ');

  if (isVi) {
    s = s.replace(/\\vec\{0\}|\\mathbf\{0\}/g, ' vectơ không ')
         .replace(/\\vec\{([A-Za-z0-9]+)\}/g, function(m, v) { return ' vectơ ' + (v.length > 1 ? v.split('').join(' ') : v) + ' '; })
         .replace(/\\overrightarrow\{([A-Za-z0-9]+)\}/g, function(m, v) { return ' vectơ ' + (v.length > 1 ? v.split('').join(' ') : v) + ' '; })
         .replace(/\\\|([^\\|]+?)\\\|/g, ' độ dài của $1 ')
         .replace(/\\cdot/g, ' nhân vô hướng ')
         .replace(/\\times/g, ' nhân có hướng ')
         .replace(/\\d?frac\{([^{}]+)\}\{([^{}]+)\}/g, ' $1 trên $2 ')
         .replace(/\\sqrt\[([^{}]+)\]\{([^{}]+)\}/g, ' căn bậc $1 của $2 ')
         .replace(/\\sqrt\{([^{}]+)\}/g, ' căn bậc hai của $1 ')
         .replace(/\^2\b|\^\{2\}/g, ' bình phương ')
         .replace(/\^3\b|\^\{3\}/g, ' lập phương ')
         .replace(/\^\{([^}]+)\}/g, ' mũ $1 ')
         .replace(/\^([a-zA-Z0-9]+)/g, ' mũ $1 ')
         .replace(/f'''\(x\)/g, ' f ba phẩy x ')
         .replace(/f''\(x\)/g, ' f hai phẩy x ')
         .replace(/f'\(x\)/g, ' f phẩy x ')
         .replace(/y''/g, ' y hai phẩy ')
         .replace(/y'/g, ' y phẩy ')
         .replace(/f\(x\)/g, ' f của x ')
         .replace(/\\perp/g, ' vuông góc với ')
         .replace(/\\parallel/g, ' song song với ')
         .replace(/\\pm/g, ' cộng trừ ')
         .replace(/\\leq|\\le/g, ' nhỏ hơn hoặc bằng ')
         .replace(/\\geq|\\ge/g, ' lớn hơn hoặc bằng ')
         .replace(/\\neq/g, ' khác ')
         .replace(/\\approx/g, ' xấp xỉ ')
         .replace(/\\to/g, ' tiến tới ')
         .replace(/\\implies/g, ' suy ra ')
         .replace(/\\iff/g, ' tương đương ')
         .replace(/\\in/g, ' thuộc ')
         .replace(/\\notin/g, ' không thuộc ')
         .replace(/\\infty/g, ' vô cực ')
         .replace(/\\mathbb\{R\}/g, ' tập số thực R ')
         .replace(/\\Delta/g, ' đen-ta ')
         .replace(/\\pi/g, ' pi ')
         .replace(/\\alpha/g, ' an-pha ')
         .replace(/\\beta/g, ' bê-ta ')
         .replace(/=/g, ' bằng ')
         .replace(/\+/g, ' cộng ')
         .replace(/-/g, ' trừ ');
  } else {
    s = s.replace(/\\vec\{0\}|\\mathbf\{0\}/g, ' zero vector ')
         .replace(/\\vec\{([A-Za-z0-9]+)\}/g, function(m, v) { return ' vector ' + (v.length > 1 ? v.split('').join(' ') : v) + ' '; })
         .replace(/\\overrightarrow\{([A-Za-z0-9]+)\}/g, function(m, v) { return ' vector ' + (v.length > 1 ? v.split('').join(' ') : v) + ' '; })
         .replace(/\\\|([^\\|]+?)\\\|/g, ' magnitude of $1 ')
         .replace(/\\cdot/g, ' dot ')
         .replace(/\\times/g, ' times ')
         .replace(/\\d?frac\{([^{}]+)\}\{([^{}]+)\}/g, ' $1 over $2 ')
         .replace(/\\sqrt\[([^{}]+)\]\{([^{}]+)\}/g, ' $1 root of $2 ')
         .replace(/\\sqrt\{([^{}]+)\}/g, ' square root of $1 ')
         .replace(/\^2\b|\^\{2\}/g, ' squared ')
         .replace(/\^3\b|\^\{3\}/g, ' cubed ')
         .replace(/\^\{([^}]+)\}/g, ' to the power of $1 ')
         .replace(/\^([a-zA-Z0-9]+)/g, ' to the power of $1 ')
         .replace(/f'''\(x\)/g, ' f triple prime of x ')
         .replace(/f''\(x\)/g, ' f double prime of x ')
         .replace(/f'\(x\)/g, ' f prime of x ')
         .replace(/y''/g, ' y double prime ')
         .replace(/y'/g, ' y prime ')
         .replace(/f\(x\)/g, ' f of x ')
         .replace(/\\perp/g, ' is perpendicular to ')
         .replace(/\\parallel/g, ' is parallel to ')
         .replace(/\\pm/g, ' plus or minus ')
         .replace(/\\leq|\\le/g, ' is less than or equal to ')
         .replace(/\\geq|\\ge/g, ' is greater than or equal to ')
         .replace(/\\neq/g, ' is not equal to ')
         .replace(/\\approx/g, ' is approximately ')
         .replace(/\\to/g, ' approaches ')
         .replace(/\\implies/g, ' implies ')
         .replace(/\\iff/g, ' if and only if ')
         .replace(/\\in/g, ' in ')
         .replace(/\\notin/g, ' not in ')
         .replace(/\\infty/g, ' infinity ')
         .replace(/\\mathbb\{R\}/g, ' real numbers ')
         .replace(/\\Delta/g, ' delta ')
         .replace(/\\pi/g, ' pi ')
         .replace(/\\alpha/g, ' alpha ')
         .replace(/\\beta/g, ' beta ')
         .replace(/=/g, ' equals ')
         .replace(/\+/g, ' plus ')
         .replace(/-/g, ' minus ');
  }

  s = s.replace(/\\[a-zA-Z]+/g, ' ')
       .replace(/[{}\\$]/g, ' ')
       .replace(/\s+/g, ' ')
       .trim();

  return s;
}

function standaloneCleanLatexForSpeech(text, forcedLang) {
  if (!text) return '';
  var str = String(text).replace(/<[^>]+>/g, ' ');
  var isVi = (forcedLang === 'vi' || forcedLang === 'vi-VN') || 
             (/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(str));

  str = str.replace(/\$\$([\s\S]*?)\$\$/g, function(m, f) { return ' ' + parseFormulaForSpeech(f, isVi) + ' '; });
  str = str.replace(/\$([^\$]+)\$/g, function(m, f) { return ' ' + parseFormulaForSpeech(f, isVi) + ' '; });
  if (/\\(vec|overrightarrow|frac|sqrt|lim|int|cdot|times|perp|parallel|pm|Delta|alpha|beta|pi|infty|mathbb)/.test(str)) {
    str = parseFormulaForSpeech(str, isVi);
  }
  return str.replace(/\s+/g, ' ').trim();
}

function standaloneEscapeSpeechAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/"/g, '&quot;')
    .replace(/\r?\n/g, ' ')
    .replace(/<[^>]*>/g, ' ');
}

const Exporter = {
  /**
   * Helper to format LaTeX math for clean readability in Microsoft Word
   */
  formatMathForWord(text) {
    if (!text) return '';
    let res = String(text);
    res = res
      .replace(/\\vec\{([a-zA-Z0-9]+)\}/g, '$1⃗')
      .replace(/\\overrightarrow\{([a-zA-Z0-9]+)\}/g, '$1⃗')
      .replace(/\\cdot/g, ' · ')
      .replace(/\\times/g, ' × ')
      .replace(/\\perp/g, ' ⊥ ')
      .replace(/\\parallel/g, ' ∥ ')
      .replace(/\\pm/g, ' ± ')
      .replace(/\\mp/g, ' ∓ ')
      .replace(/\\leq/g, ' ≤ ')
      .replace(/\\le/g, ' ≤ ')
      .replace(/\\geq/g, ' ≥ ')
      .replace(/\\ge/g, ' ≥ ')
      .replace(/\\neq/g, ' ≠ ')
      .replace(/\\approx/g, ' ≈ ')
      .replace(/\\equiv/g, ' ≡ ')
      .replace(/\\in/g, ' ∈ ')
      .replace(/\\notin/g, ' ∉ ')
      .replace(/\\to/g, ' → ')
      .replace(/\\implies/g, ' ⇒ ')
      .replace(/\\iff/g, ' ⇔ ')
      .replace(/\\infty/g, '∞')
      .replace(/\\Delta/g, 'Δ')
      .replace(/\\alpha/g, 'α')
      .replace(/\\beta/g, 'β')
      .replace(/\\gamma/g, 'γ')
      .replace(/\\theta/g, 'θ')
      .replace(/\\pi/g, 'π')
      .replace(/\\mathbb\{R\}/g, 'ℝ')
      .replace(/\\mathbb\{Z\}/g, 'ℤ')
      .replace(/\\mathbb\{N\}/g, 'ℕ')
      .replace(/\\mathbb\{C\}/g, 'ℂ')
      .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
      .replace(/\\lim_\{([^}]+)\}/g, 'lim[$1]')
      .replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, '∫[$1 → $2]')
      .replace(/\\int/g, '∫ ')
      .replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, '∑[$1 → $2]')
      .replace(/\\sum/g, '∑ ')
      .replace(/\$\$/g, '')
      .replace(/\$/g, '');
    return res;
  },

  /**
   * Generates a fully standalone self-contained HTML document
   * that can run offline or online in any browser.
   * Includes Lesson Builder + Interactive Quiz + Pedagogical Scaffolding Tutor!
   */
  exportStandaloneHTML(lesson) {
    const serializedLessonData = JSON.stringify(lesson).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
    const presets = (window.ScaffoldingTutor && window.ScaffoldingTutor.presets) ? window.ScaffoldingTutor.presets : {};
    const serializedPresets = JSON.stringify(presets).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
    const currentScaffold = (window.ScaffoldingTutor && window.ScaffoldingTutor.currentData) ? window.ScaffoldingTutor.currentData : null;
    const serializedCurrentScaffold = JSON.stringify(currentScaffold).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

    const branding = window.App?.teacherBranding || {
      department: "SỞ GD&ĐT TP. HỒ CHÍ MINH",
      school: "TRƯỜNG THPT CHUYÊN",
      subject: "TỔ TOÁN - TIN HỌC",
      teacherName: "Cô Huỳnh Thị Hà",
      grade: "Khối 12",
      academicYear: "2025 - 2026",
      examType: "BÀI KIỂM TRA ĐÁNH GIÁ ĐỊNH KỲ"
    };

    const htmlContent = `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lesson.meta.titleEn} | Math Bilingual Studio Standalone</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <!-- MathJax 3 -->
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
        processEscapes: true
      },
      svg: { fontCache: 'global' },
      startup: {
        ready: () => {
          MathJax.startup.defaultReady();
          window.__mathjaxLoaded = true;
        }
      }
    };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
  <style>
    body { font-family: 'Outfit', sans-serif; background-color: #f8fafc; color: #0f172a; }
    code, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .glass-card {
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 1rem !important;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
      color: #0f172a !important;
    }
    .latex-box {
      background: #f8fafc !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 0.75rem !important;
      color: #0f172a !important;
    }
    mjx-container {
      color: #0f172a !important;
      outline: none;
      display: inline-block !important;
      line-height: normal !important;
      vertical-align: middle !important;
    }
    mjx-merror {
      display: inline-block !important;
      color: #dc2626 !important;
      background-color: #fee2e2 !important;
      border: 1px solid #fca5a5 !important;
      border-radius: 4px !important;
      padding: 1px 6px !important;
      font-size: 11px !important;
      line-height: 1.2 !important;
      margin: 0 4px !important;
      white-space: nowrap !important;
    }
    /* Universal light mode overrides so all elements have crisp black text and soothing light backgrounds */
    .text-white, .text-slate-100, .text-slate-200 { color: #0f172a !important; }
    .text-slate-300 { color: #1e293b !important; }
    .text-slate-400 { color: #475569 !important; }
    .text-indigo-300, .text-indigo-400 { color: #4338ca !important; }
    .text-teal-300, .text-teal-400 { color: #0f766e !important; }
    .text-purple-300, .text-purple-400 { color: #6b21a8 !important; }
    .text-amber-300, .text-amber-400 { color: #92400e !important; }
    .text-emerald-300, .text-emerald-400 { color: #047857 !important; }
    .text-rose-300, .text-rose-400 { color: #b91c1c !important; }

    .bg-slate-950, .bg-slate-900, .bg-slate-900\/90, .bg-slate-900\/80, .bg-slate-900\/60, .bg-indigo-950, .bg-indigo-950\/40, .bg-indigo-950\/30, .bg-purple-950, .bg-amber-950, .bg-teal-950, .bg-teal-950\/30 {
      background-color: #f8fafc !important;
      border-color: #e2e8f0 !important;
      color: #0f172a !important;
    }
    .bg-slate-800, .bg-slate-850 {
      background-color: #f1f5f9 !important;
      border-color: #cbd5e1 !important;
      color: #334155 !important;
    }
    .border-slate-800, .border-slate-700 {
      border-color: #e2e8f0 !important;
    }
    .hidden { display: none !important; }
    .cursor-pointer { cursor: pointer !important; }
    button { cursor: pointer; }
    @media print {
      .no-print { display: none !important; }
      body { background: white !important; color: black !important; }
      .glass-card { background: white !important; border: 1px solid #ddd !important; }
    }
  </style>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">

  <!-- Zalo / In-app browser helpful hint -->
  <div style="background: linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%); border-bottom: 2px solid #f59e0b; padding: 10px 16px; font-size: 13px; color: #92400e; display: flex; align-items: center; justify-content: center; gap: 8px; text-align: center;">
    <span>📱</span>
    <span><strong>Dành cho học sinh mở trên Zalo / Điện thoại:</strong> Nếu file đang mở trong Zalo preview, hãy bấm <strong>[Chia sẻ] ↗</strong> hoặc dấu <strong>⋯</strong> ở góc trên và chọn <strong>"Mở bằng trình duyệt" (Safari / Chrome)</strong> để kích hoạt đầy đủ <strong>giọng đọc tiếng Anh Nữ / Nam</strong> và <strong>làm bài kiểm tra tương tác</strong>!</span>
  </div>

  <!-- Header -->
  <header class="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-2xs">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-xs font-bold text-lg text-white">
          🎓
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">${branding.school}</span>
            <span class="text-xs text-slate-500 hidden sm:inline">• ${branding.subject} • GV: ${branding.teacherName} • ${branding.grade}</span>
          </div>
          <h1 class="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>${lesson.meta.titleEn}</span>
            <button type="button" onclick="speakText(this)" data-speech="${(lesson.meta.titleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded-md bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 transition-all text-xs cursor-pointer shadow-2xs" title="Nghe giọng nữ chuẩn (1.0x)">🔊</button>
            <button type="button" onclick="speakSlow(this)" data-speech="${(lesson.meta.titleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded-md bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 transition-all text-xs cursor-pointer shadow-2xs" title="Nghe chậm phát âm (0.72x)">🐢</button>
          </h1>
        </div>
      </div>

      <!-- Navigation & Mode -->
      <div class="flex items-center gap-2">
        <div class="flex bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1">
          <button id="tab-btn-lesson" onclick="switchStandaloneTab('lesson')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-white text-indigo-700 shadow-xs">
            📖 Bài Giảng (Lesson)
          </button>
          <button id="tab-btn-scaffold" onclick="switchStandaloneTab('scaffold')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-600 hover:text-slate-900">
            🪜 Gia Sư Giàn Giáo (Tutor)
          </button>
          <button id="tab-btn-quiz" onclick="switchStandaloneTab('quiz')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-600 hover:text-slate-900">
            ✍️ Kiểm Tra (Quiz)
          </button>
        </div>
        <button onclick="toggleAllVietnamese()" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs flex items-center gap-1.5" title="Bật/Tắt dịch tiếng Việt">
          🇻🇳 <span id="vi-toggle-text">Dịch: Đang mở</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

    <!-- ========================================== -->
    <!-- TAB 1: LESSON VIEW                         -->
    <!-- ========================================== -->
    <div id="standalone-lesson-view" class="space-y-8">
      
      <!-- Lesson Banner -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-50/80 via-white to-teal-50/60 p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div class="relative z-10 max-w-3xl">
          <span class="px-3 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3 inline-block">
            Target Duration: ${lesson.meta.duration || '45 minutes'}
          </span>
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">${lesson.meta.titleEn}</h2>
            <div class="flex items-center gap-1">
              <button type="button" onclick="speakText(this)" data-speech="${(lesson.meta.titleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 transition-all text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs font-semibold" title="Nghe giọng nữ chuẩn (1.0x)">🔊 <span>Nghe</span></button>
              <button type="button" onclick="speakSlow(this)" data-speech="${(lesson.meta.titleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-2 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 transition-all text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs font-semibold" title="Nghe chậm (0.72x)">🐢 <span>Chậm</span></button>
            </div>
          </div>
          <h3 class="text-base sm:text-lg text-indigo-700 font-semibold mb-4 vi-text">${lesson.meta.titleVi}</h3>
          <div class="flex items-start gap-2.5 mb-2">
            <p class="text-slate-800 text-sm leading-relaxed flex-1">${lesson.meta.overviewEn}</p>
            <div class="flex items-center gap-1 shrink-0">
              <button type="button" onclick="speakText(this)" data-speech="${(lesson.meta.overviewEn || '').replace(/"/g, '&quot;')}" class="p-1 px-2 rounded-lg bg-slate-100 hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200 transition-all text-xs cursor-pointer shadow-2xs" title="Nghe đọc phần tổng quan (1.0x)">🔊</button>
              <button type="button" onclick="speakSlow(this)" data-speech="${(lesson.meta.overviewEn || '').replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 transition-all text-xs cursor-pointer shadow-2xs" title="Nghe chậm tổng quan (0.72x)">🐢</button>
            </div>
          </div>
          <p class="text-slate-600 text-xs italic leading-relaxed vi-text border-l-2 border-indigo-400 pl-3">${lesson.meta.overviewVi}</p>
        </div>
        <div class="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
      </div>

      <!-- VOCABULARY SECTION -->
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center text-sm border border-teal-200">🗣️</span>
            <span>Key Mathematical Vocabulary (Từ vựng trọng tâm)</span>
            <button type="button" onclick="speakText(this)" data-speech="Key Mathematical Vocabulary" class="p-1 px-1.5 rounded-md bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white border border-teal-200 text-xs shrink-0 cursor-pointer shadow-2xs" title="Nghe đọc tiêu đề phần từ vựng">🔊</button>
            <button type="button" onclick="speakSlow(this)" data-speech="Key Mathematical Vocabulary" class="p-1 px-1.5 rounded-md bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-xs shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm">🐢</button>
          </h3>
          <span class="text-xs text-slate-500">Bấm 🔊 để nghe chuẩn, 🐢 để nghe chậm phát âm</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="vocab-grid">
          ${lesson.vocabulary.map((v, i) => `
            <div class="glass-card p-4 rounded-xl border border-slate-200 hover:border-indigo-400 transition-all flex flex-col justify-between group bg-white shadow-xs">
              <div>
                <div class="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 class="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">${v.term}</h4>
                    <div class="flex items-center gap-2 text-xs text-slate-500">
                      <span class="font-mono text-teal-700 font-semibold">${v.ipa || ''}</span>
                      <span class="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-600 border border-slate-200">${v.pos || 'term'}</span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 shrink-0">
                    <button type="button" onclick="speakTerm(this)" data-term="${(v.term || '').replace(/"/g, '&quot;')}" class="p-1.5 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white transition-all text-xs border border-indigo-200 cursor-pointer shadow-2xs font-bold" title="Nghe giọng nữ chuẩn (1.0x)">
                      🔊
                    </button>
                    <button type="button" onclick="speakSlow(this)" data-speech="${(v.term || '').replace(/"/g, '&quot;')}" class="p-1.5 px-2 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white transition-all text-xs border border-amber-200 cursor-pointer shadow-2xs font-bold" title="Nghe chậm từng âm tiết (0.72x)">
                      🐢
                    </button>
                  </div>
                </div>
                <p class="text-sm font-semibold text-emerald-700 vi-text mb-2.5">
                  👉 ${v.meaningVi}
                </p>
                <div class="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800">
                  <div class="flex items-start justify-between gap-1 mb-1">
                    <div class="latex-box flex-1">${v.exampleEn}</div>
                    <div class="flex items-center gap-1 shrink-0">
                      <button type="button" onclick="speakText(this)" data-speech="${(v.exampleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white border border-slate-200 text-[10px] cursor-pointer shadow-2xs" title="Nghe câu ví dụ (1.0x)">🔊</button>
                      <button type="button" onclick="speakSlow(this)" data-speech="${(v.exampleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-[10px] cursor-pointer shadow-2xs" title="Nghe chậm câu ví dụ (0.72x)">🐢</button>
                    </div>
                  </div>
                  <div class="text-[11px] text-slate-600 italic vi-text">${v.exampleVi}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CONCEPTS & THEOREMS -->
      <section class="space-y-4">
        <div class="border-b border-slate-200 pb-3">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-sm border border-indigo-200">📐</span>
            <span>Mathematical Concepts & Theorems (Định lý & Công thức)</span>
            <button type="button" onclick="speakText(this)" data-speech="Mathematical Concepts and Theorems" class="p-1 px-1.5 rounded-md bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs shrink-0 cursor-pointer shadow-2xs" title="Nghe đọc tiêu đề phần định lý (1.0x)">🔊</button>
            <button type="button" onclick="speakSlow(this)" data-speech="Mathematical Concepts and Theorems" class="p-1 px-1.5 rounded-md bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-xs shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm (0.72x)">🐢</button>
          </h3>
        </div>

        <div class="space-y-4">
          ${lesson.concepts.map((c, i) => `
            <div class="glass-card p-5 sm:p-6 rounded-2xl border-l-4 border-l-indigo-600 border-slate-200 bg-white shadow-xs space-y-3">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <h4 class="text-base font-bold text-slate-900">${i + 1}. ${c.titleEn || ''}</h4>
                  <div class="flex items-center gap-1">
                    <button type="button" onclick="speakText(this)" data-speech="${(c.titleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded-md bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs shrink-0 cursor-pointer shadow-2xs" title="Nghe đọc định lý (1.0x)">🔊</button>
                    <button type="button" onclick="speakSlow(this)" data-speech="${(c.titleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded-md bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-xs shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm (0.72x)">🐢</button>
                  </div>
                </div>
                <span class="text-xs text-indigo-700 vi-text font-semibold">${c.titleVi || ''}</span>
              </div>
              <div class="flex items-start justify-between gap-2">
                <div class="text-sm text-slate-800 leading-relaxed flex-1">${c.descEn || c.contentEn || ''}</div>
                <div class="flex items-center gap-1 shrink-0">
                  <button type="button" onclick="speakText(this)" data-speech="${((c.descEn || c.contentEn || '') + ' ' + (c.latex || c.formula || '')).replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded-md bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white border border-slate-200 text-xs cursor-pointer shadow-2xs" title="Nghe đọc định nghĩa và công thức (1.0x)">🔊</button>
                  <button type="button" onclick="speakSlow(this)" data-speech="${((c.descEn || c.contentEn || '') + ' ' + (c.latex || c.formula || '')).replace(/"/g, '&quot;')}" class="p-1 px-1.5 rounded-md bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-xs cursor-pointer shadow-2xs" title="Nghe chậm (0.72x)">🐢</button>
                </div>
              </div>
              <div class="text-xs text-slate-700 italic leading-relaxed vi-text bg-slate-50 p-3 rounded-xl border border-slate-200">${c.descVi || c.contentVi || ''}</div>
              ${(c.latex || c.formula) ? `
              <div class="p-3.5 rounded-xl bg-white border border-slate-200 text-center latex-box overflow-x-auto text-slate-900 font-medium">
                $$${c.latex || c.formula}$$
              </div>` : ''}
              ${(c.notesVi || c.notesEn || c.pedagogicalNote) ? `
                <div class="text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-start gap-2">
                  <span>💡</span>
                  <span><strong>Lưu ý sư phạm:</strong> ${c.notesVi || c.notesEn || c.pedagogicalNote}</span>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- WORKED EXAMPLES (STEP-BY-STEP) -->
      <section class="space-y-4">
        <div class="border-b border-slate-200 pb-3">
          <h3 class="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center text-sm border border-purple-200">💡</span>
            <span>Worked Examples (Ví dụ mẫu từng bước)</span>
            <button type="button" onclick="speakText(this)" data-speech="Worked Examples" class="p-1 px-1.5 rounded-md bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 text-xs shrink-0 cursor-pointer shadow-2xs" title="Nghe đọc tiêu đề phần ví dụ (1.0x)">🔊</button>
            <button type="button" onclick="speakSlow(this)" data-speech="Worked Examples" class="p-1 px-1.5 rounded-md bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-xs shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm (0.72x)">🐢</button>
          </h3>
        </div>

        <div class="space-y-6">
          ${lesson.examples.map((ex, i) => {
            const exampleId = ex.id || ('ex-' + (i + 1));
            return `
            <div class="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
              <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  Example ${i + 1}
                </span>
                <button type="button" onclick="revealAllSteps('${exampleId}')" class="text-xs text-indigo-600 hover:text-indigo-800 font-semibold cursor-pointer">
                  Mở toàn bộ các bước giải 👁️
                </button>
              </div>

              <div>
                <div class="flex items-start justify-between gap-2 mb-1.5">
                  <p class="text-sm sm:text-base font-semibold text-slate-900 latex-box flex-1">${ex.problemEn || ex.titleEn || ''}</p>
                  <div class="flex items-center gap-1 shrink-0">
                    <button type="button" onclick="speakText(this)" data-speech="${(ex.problemEn || ex.titleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-2 rounded-lg bg-purple-50 hover:bg-purple-600 text-purple-700 hover:text-white border border-purple-200 text-xs cursor-pointer shadow-2xs inline-flex items-center gap-1" title="Nghe đọc đề bài ví dụ (1.0x)">🔊 <span class="text-[11px] font-semibold">Đề bài</span></button>
                    <button type="button" onclick="speakSlow(this)" data-speech="${(ex.problemEn || ex.titleEn || '').replace(/"/g, '&quot;')}" class="p-1 px-2 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-xs cursor-pointer shadow-2xs inline-flex items-center gap-1" title="Nghe chậm đề bài (0.72x)">🐢 <span class="text-[11px] font-semibold">Chậm</span></button>
                  </div>
                </div>
                <p class="text-xs text-slate-600 italic vi-text border-l-2 border-purple-400 pl-2.5">${ex.problemVi || ex.titleVi || ''}</p>
              </div>

              <!-- Steps Container -->
              <div class="space-y-3 pt-2">
                ${(ex.steps || []).map((st, sIdx) => {
                  const stepIndex = st.stepNum !== undefined ? st.stepNum : (st.stepNumber !== undefined ? st.stepNumber : (sIdx + 1));
                  const stepTitleEn = st.titleEn || st.actionEn || `Step ${stepIndex}`;
                  const stepTitleVi = st.titleVi || st.actionVi || '';
                  const stepLatex = st.latex || st.mathExpression || '';
                  return `
                  <div class="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
                    <div onclick="toggleStep('${exampleId}', ${stepIndex})" class="w-full px-4 py-2.5 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer select-none">
                      <span class="flex items-center gap-2 flex-1 pr-2 flex-wrap">
                        <span class="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-[11px] font-bold border border-indigo-200 shrink-0">${stepIndex}</span>
                        <span>Step ${stepIndex}: ${stepTitleEn}</span>
                        <div class="flex items-center gap-0.5" onclick="event.stopPropagation()">
                          <button type="button" onclick="speakText(this)" data-speech="${(stepTitleEn + (stepLatex ? (' ' + stepLatex) : '')).replace(/"/g, '&quot;')}" class="p-0.5 px-1.5 rounded bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white border border-slate-200 text-[11px] cursor-pointer shadow-2xs" title="Nghe đọc bước này (1.0x)">🔊</button>
                          <button type="button" onclick="speakSlow(this)" data-speech="${(stepTitleEn + (stepLatex ? (' ' + stepLatex) : '')).replace(/"/g, '&quot;')}" class="p-0.5 px-1.5 rounded bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-[11px] cursor-pointer shadow-2xs" title="Nghe chậm (0.72x)">🐢</button>
                        </div>
                        ${stepTitleVi ? `<span class="text-slate-500 italic vi-text text-xs font-normal">(${stepTitleVi})</span>` : ''}
                      </span>
                      <span id="step-icon-${exampleId}-${stepIndex}" class="text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs">➕ Mở bước này</span>
                    </div>
                    <div id="step-content-${exampleId}-${stepIndex}" class="hidden p-4 pt-2 border-t border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2 bg-slate-50">
                      ${stepLatex ? `<div class="p-3 bg-white rounded-lg border border-slate-200 font-mono text-center latex-box overflow-x-auto text-slate-900">$$${stepLatex}$$</div>` : ''}
                      ${st.explanationEn ? `
                        <div class="flex items-start justify-between gap-2 text-slate-800">
                          <div class="flex-1">${st.explanationEn}</div>
                          <div class="flex items-center gap-1 shrink-0">
                            <button type="button" onclick="speakText(this)" data-speech="${st.explanationEn.replace(/"/g, '&quot;')}" class="p-1 rounded bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white border border-slate-200 text-[10px] cursor-pointer shadow-2xs" title="Nghe giải thích bước này (1.0x)">🔊</button>
                            <button type="button" onclick="speakSlow(this)" data-speech="${st.explanationEn.replace(/"/g, '&quot;')}" class="p-1 rounded bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-200 text-[10px] cursor-pointer shadow-2xs" title="Nghe chậm (0.72x)">🐢</button>
                          </div>
                        </div>
                      ` : ''}
                      ${st.explanationVi ? `<div class="text-slate-600 vi-text text-[11px] italic">${st.explanationVi}</div>` : ''}
                    </div>
                  </div>
                  `;
                }).join('')}
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </section>

    </div>

    <!-- ========================================== -->
    <!-- TAB 2: SCAFFOLDING TUTOR (OFFLINE)         -->
    <!-- ========================================== -->
    <div id="standalone-scaffold-view" class="space-y-6 hidden">
      
      <!-- Top Scaffolding Tutor Banner -->
      <div class="glass-card p-6 sm:p-7 rounded-3xl border border-slate-200 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/50 shadow-xs space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg border border-amber-300">🪜</span>
            <div>
              <span class="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                Gia Sư Giàn Giáo Sư Phạm (Scaffolding Offline)
              </span>
              <div class="flex items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-black text-slate-900">Bilingual Math Scaffolding Tutor</h2>
                <button type="button" onclick="speakText(this)" data-speech="Bilingual Math Scaffolding Tutor" class="p-1 px-2 rounded-lg bg-amber-100 hover:bg-amber-600 text-amber-800 hover:text-white border border-amber-300 text-xs cursor-pointer shadow-2xs" title="Nghe đọc tiêu đề giàn giáo">🔊</button>
                <button type="button" onclick="speakSlow(this)" data-speech="Bilingual Math Scaffolding Tutor" class="p-1 px-2 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-300 text-xs cursor-pointer shadow-2xs" title="Nghe chậm tiêu đề (0.72x)">🐢</button>
              </div>
            </div>
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
            Mô hình Vygotsky ZPD • Hoạt động 100% Offline
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Hệ thống cung cấp giàn giáo nhận thức nhiều tầng giúp bạn tự suy luận giải bài toán song ngữ: phá bỏ rào cản thuật ngữ tiếng Anh, mở gợi ý từng nấc và rèn luyện bài tập song song.
        </p>

        <!-- Presets Selection Bar -->
        <div class="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2">
          <span class="text-xs font-bold text-slate-700">Chọn Bài Mẫu THPT:</span>
          <button onclick="selectStandalonePreset('grade-10-vectors')" id="btn-pre-10" class="px-3 py-1 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all">
            📘 Khối 10: Tọa độ Oxy & Tích vô hướng
          </button>
          <button onclick="selectStandalonePreset('grade-11-limits')" id="btn-pre-11" class="px-3 py-1 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all">
            📗 Khối 11: Giới hạn vô định 0/0
          </button>
          <button onclick="selectStandalonePreset('grade-12-asymptotes')" id="btn-pre-12" class="px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 transition-all">
            📙 Khối 12: Hàm phân thức & Tiệm cận
          </button>
        </div>
      </div>

      <!-- Current Problem Card -->
      <div class="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold uppercase tracking-wider text-indigo-700">Đề bài mục tiêu (Target Problem):</span>
          <div class="flex items-center gap-1.5">
            <span id="scaffold-grade-badge" class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 mr-1">Khối 12</span>
            <button type="button" onclick="speakText(document.getElementById('scaffold-problem-text').innerText)" class="p-1 px-2.5 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs" title="Nghe đọc đề bài mục tiêu">🔊 <span class="text-[11px] font-semibold">Nghe đề</span></button>
            <button type="button" onclick="speakSlow(document.getElementById('scaffold-problem-text').innerText)" class="p-1 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-500 text-indigo-600 hover:text-white border border-indigo-200 text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs" title="Nghe chậm đề bài (0.72x)">🐢 <span class="text-[11px] font-semibold">Chậm</span></button>
          </div>
        </div>
        <div id="scaffold-problem-text" class="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed latex-box">
          <!-- Rendered dynamically -->
        </div>
      </div>

      <!-- 3-Step Progress Tier Control Buttons -->
      <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <span>⚡</span> <span>Mở mức độ hỗ trợ sư phạm:</span>
        </span>
        <div class="flex flex-wrap gap-2">
          <button onclick="setStandaloneTier(1)" id="tier-btn-1" class="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-white shadow transition-all">
            🟡 Chỉ mở Gợi ý Nấc 1
          </button>
          <button onclick="setStandaloneTier(2)" id="tier-btn-2" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all">
            🔵 Mở Khung tư duy 3 bước
          </button>
          <button onclick="setStandaloneTier(3)" id="tier-btn-3" class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all">
            🟢 Mở Toàn bộ Lời giải & Cạm bẫy
          </button>
        </div>
      </div>

      <!-- Scaffold Dynamic Sections Container -->
      <div id="standalone-scaffold-container" class="space-y-4">
        <!-- Rendered via JS -->
      </div>

    </div>

    <!-- ========================================== -->
    <!-- TAB 3: QUIZ VIEW                           -->
    <!-- ========================================== -->
    <div id="standalone-quiz-view" class="space-y-8 hidden">
      
      <!-- Quiz Header Card -->
      <div class="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <span class="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2 inline-block">
            Assessment Test
          </span>
          <div class="flex items-center gap-1.5 mb-1 flex-wrap">
            <h2 class="text-xl sm:text-2xl font-black text-slate-900">${(lesson.quiz && lesson.quiz.titleEn) || 'Assessment Test'}</h2>
            <button type="button" onclick="speakText(this)" data-speech="${((lesson.quiz && lesson.quiz.titleEn) || 'Assessment Test').replace(/"/g, '&quot;')}" class="p-1 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs" title="Nghe đọc tiêu đề bài kiểm tra">🔊</button>
            <button type="button" onclick="speakSlow(this)" data-speech="${((lesson.quiz && lesson.quiz.titleEn) || 'Assessment Test').replace(/"/g, '&quot;')}" class="p-1 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-500 text-indigo-600 hover:text-white border border-indigo-200 text-xs inline-flex items-center gap-1 cursor-pointer shadow-2xs" title="Nghe chậm tiêu đề (0.72x)">🐢</button>
          </div>
          <h3 class="text-sm font-semibold text-slate-700 vi-text mt-0.5">${(lesson.quiz && lesson.quiz.titleVi) || 'Kiểm tra đánh giá'}</h3>
          <p class="text-xs text-slate-600 mt-2">
            Thời gian: <strong>${(lesson.quiz && lesson.quiz.timeMinutes) || 20} phút</strong> • Tổng số câu: <strong>${(lesson.quiz && lesson.quiz.questions) ? lesson.quiz.questions.length : 0}</strong>
          </p>
        </div>

        <div class="flex gap-2">
          <button onclick="gradeStandaloneQuiz()" class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 hover:border-emerald-300 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer">
            <span>✅</span> <span>Nộp Bài & Chấm Điểm</span>
          </button>
        </div>
      </div>

      <!-- Quiz Questions Container -->
      <div class="space-y-6" id="standalone-questions-container">
        <!-- Rendered via Javascript for full reactivity -->
      </div>

      <!-- Result Banner (Hidden initially) -->
      <div id="standalone-quiz-result" class="hidden glass-card p-6 sm:p-8 rounded-2xl border border-emerald-300 bg-emerald-50/60 text-center space-y-4">
        <div class="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl font-bold shadow-sm">
          🏆
        </div>
        <h3 class="text-2xl font-black text-slate-900">Kết Quả Bài Kiểm Tra (Quiz Result)</h3>
        <div class="flex justify-center items-baseline gap-2">
          <span id="result-score-num" class="text-5xl font-black text-emerald-700">0.0</span>
          <span class="text-xl text-slate-600 font-semibold">/ 10.0</span>
        </div>
        <p id="result-feedback" class="text-sm font-semibold text-slate-800 max-w-md mx-auto"></p>
        <button onclick="resetStandaloneQuiz()" class="px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-all shadow-xs">
          🔄 Làm lại bài kiểm tra
        </button>
      </div>

    </div>

  </main>

  <footer class="mt-auto border-t border-slate-200 py-6 text-center text-xs text-slate-600 bg-white">
    Được tạo tự động bởi <strong>Math Bilingual Studio</strong> • Hoạt động độc lập & Hỗ trợ học trực tuyến/offline.
  </footer>

  <!-- Embedded JS Logic -->
  <script>
    const LESSON_DATA = ${serializedLessonData};
    const SCAFFOLD_PRESETS = ${serializedPresets};
    let currentScaffoldData = ${serializedCurrentScaffold} || (SCAFFOLD_PRESETS["grade-12-asymptotes"] ? SCAFFOLD_PRESETS["grade-12-asymptotes"].data : (Object.values(SCAFFOLD_PRESETS)[0] ? Object.values(SCAFFOLD_PRESETS)[0].data : null));
    let activeScaffoldPresetKey = (SCAFFOLD_PRESETS["grade-12-asymptotes"] ? "grade-12-asymptotes" : Object.keys(SCAFFOLD_PRESETS)[0]) || "";
    let showVi = true;

    // Scaffolding UI State
    let scaffoldTiers = {
      vocab: true,
      analysis: true,
      tier1: true,
      tier2: false,
      tier3: false,
      pitfall: false,
      parallel: false
    };

    function switchStandaloneTab(tab) {
      const lessonView = document.getElementById('standalone-lesson-view');
      const scaffoldView = document.getElementById('standalone-scaffold-view');
      const quizView = document.getElementById('standalone-quiz-view');
      const btnLesson = document.getElementById('tab-btn-lesson');
      const btnScaffold = document.getElementById('tab-btn-scaffold');
      const btnQuiz = document.getElementById('tab-btn-quiz');

      if (!lessonView || !scaffoldView || !quizView) return;

      // Hide all
      lessonView.classList.add('hidden');
      scaffoldView.classList.add('hidden');
      quizView.classList.add('hidden');

      if (btnLesson) btnLesson.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer';
      if (btnScaffold) btnScaffold.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-amber-300 cursor-pointer';
      if (btnQuiz) btnQuiz.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer';

      if (tab === 'lesson') {
        lessonView.classList.remove('hidden');
        if (btnLesson) btnLesson.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs cursor-pointer';
      } else if (tab === 'scaffold') {
        scaffoldView.classList.remove('hidden');
        if (btnScaffold) btnScaffold.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs cursor-pointer';
        renderStandaloneScaffold();
      } else {
        quizView.classList.remove('hidden');
        if (btnQuiz) btnQuiz.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition-all bg-indigo-50 text-indigo-800 border border-indigo-200 shadow-2xs cursor-pointer';
        renderStandaloneQuestions();
      }
      triggerMathJax();
    }

    function toggleAllVietnamese() {
      showVi = !showVi;
      const elements = document.querySelectorAll('.vi-text');
      elements.forEach(el => {
        el.style.display = showVi ? '' : 'none';
      });
      const viText = document.getElementById('vi-toggle-text');
      if (viText) {
        viText.innerText = showVi ? 'Dịch: Đang mở' : 'Dịch: Đang ẩn';
      }
    }

    ${standaloneParseFormulaForSpeech.toString().replace('standaloneParseFormulaForSpeech', 'parseFormulaForSpeech')}

    ${standaloneCleanLatexForSpeech.toString().replace('standaloneCleanLatexForSpeech', 'cleanLatexForSpeech')}

    ${standaloneEscapeSpeechAttr.toString().replace('standaloneEscapeSpeechAttr', 'escapeSpeechAttr')}

    function getBestVoice(isVi) {
      if (!('speechSynthesis' in window)) return null;
      var voices = window.speechSynthesis.getVoices() || [];
      if (!voices.length) return null;
      if (isVi) {
        for (var v = 0; v < voices.length; v++) {
          var l = (voices[v].lang || '').replace('_', '-').toLowerCase();
          var n = (voices[v].name || '').toLowerCase();
          if (l.startsWith('vi') || n.includes('vietnam') || n.includes('tiếng việt') || n.includes('hoaimy') || n.includes('namminh')) {
            return voices[v];
          }
        }
      }
      return getBestFemaleVoice();
    }

    function getBestFemaleVoice() {
      if (!('speechSynthesis' in window)) return null;
      var voices = window.speechSynthesis.getVoices() || [];
      if (!voices.length) return null;

      var isMale = function(name) {
        var n = (name || '').toLowerCase();
        return n.includes('david') || n.includes('mark') || n.includes('george') || 
               n.includes('guy') || n.includes('james') || n.includes('richard') || 
               n.includes('daniel') || (n.includes('male') && !n.includes('female'));
      };

      // 1. Top tier Natural / Neural American Female voices (Jenny, Aria, Michelle, Zira, Samantha, Ava)
      for (var i = 0; i < voices.length; i++) {
        var v = voices[i];
        var n = (v.name || '').toLowerCase();
        var l = (v.lang || '').replace('_', '-').toLowerCase();
        if ((l.startsWith('en-us') || l.startsWith('en-gb') || l.startsWith('en')) &&
            (n.includes('jenny') || n.includes('aria') || n.includes('michelle') || n.includes('zira') || n.includes('samantha') || n.includes('ava') || n.includes('allison') || n.includes('susan') || n.includes('karen') || n.includes('victoria')) &&
            !isMale(v.name)) {
          return v;
        }
      }

      // 2. Google US English (Standard Chrome natural female voice) or Natural non-male
      for (var j = 0; j < voices.length; j++) {
        var v2 = voices[j];
        var n2 = (v2.name || '').toLowerCase();
        var l2 = (v2.lang || '').replace('_', '-').toLowerCase();
        if (l2.startsWith('en-us') && (n2.includes('google us english') || (n2.includes('natural') && !isMale(v2.name)) || n2.includes('female'))) {
          return v2;
        }
      }

      // 3. Any en-US voice that is not male
      for (var k = 0; k < voices.length; k++) {
        var v3 = voices[k];
        var l3 = (v3.lang || '').replace('_', '-').toLowerCase();
        if (l3.startsWith('en-us') && !isMale(v3.name)) {
          return v3;
        }
      }

      // 4. Any English voice that is not male
      for (var m = 0; m < voices.length; m++) {
        var v4 = voices[m];
        var l4 = (v4.lang || '').replace('_', '-').toLowerCase();
        if (l4.startsWith('en') && !isMale(v4.name)) {
          return v4;
        }
      }

      return voices[0];
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = function() {
        getBestFemaleVoice();
      };
    }

    function speakText(elOrText, rate, forcedLang) {
      if (typeof rate !== 'number') rate = 1.0;
      var rawText = '';
      if (typeof elOrText === 'string') {
        rawText = elOrText;
      } else if (elOrText && elOrText.getAttribute) {
        rawText = elOrText.getAttribute('data-speech') || elOrText.getAttribute('data-term') || '';
        if (!rawText && elOrText.parentElement) {
          var siblingTarget = elOrText.parentElement.querySelector('.speech-target') || elOrText.previousElementSibling;
          if (siblingTarget) rawText = siblingTarget.innerText || '';
        }
        if (!rawText) rawText = elOrText.innerText || '';
      }
      if (!rawText) return;

      var isVi = (forcedLang === 'vi' || forcedLang === 'vi-VN') || 
                 (/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(rawText));
      var clean = cleanLatexForSpeech(rawText, isVi ? 'vi' : 'en');
      if (!clean) return;

      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var utter = new SpeechSynthesisUtterance(clean);
        utter.lang = isVi ? 'vi-VN' : 'en-US';
        utter.rate = rate; // 1.0 is standard normal speed, 0.72 is slow practice
        var voice = getBestVoice(isVi);
        if (voice) utter.voice = voice;
        window.speechSynthesis.speak(utter);
      } else {
        alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API.');
      }
    }

    function speakSlow(elOrText, forcedLang) {
      speakText(elOrText, 0.72, forcedLang);
    }
    var speakTerm = speakText;

    function toggleStep(exId, stepNum) {
      const content = document.getElementById('step-content-' + exId + '-' + stepNum);
      const icon = document.getElementById('step-icon-' + exId + '-' + stepNum);
      if (!content) return;
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) {
          icon.innerText = '➖ Ẩn bước';
          icon.className = 'text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs cursor-pointer';
        }
        triggerMathJax();
      } else {
        content.classList.add('hidden');
        if (icon) {
          icon.innerText = '➕ Mở bước này';
          icon.className = 'text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs cursor-pointer';
        }
      }
    }

    function revealAllSteps(exId) {
      const contents = document.querySelectorAll('[id^="step-content-' + exId + '-"]');
      const icons = document.querySelectorAll('[id^="step-icon-' + exId + '-"]');
      contents.forEach(c => c.classList.remove('hidden'));
      icons.forEach(i => {
        i.innerText = '➖ Ẩn bước';
        i.className = 'text-xs text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs cursor-pointer';
      });
      triggerMathJax();
    }

    function triggerMathJax() {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().catch(err => console.log('MathJax error: ', err));
      }
    }

    // ==========================================
    // STANDALONE SCAFFOLDING TUTOR LOGIC
    // ==========================================
    function selectStandalonePreset(presetKey) {
      activeScaffoldPresetKey = presetKey;
      const p = SCAFFOLD_PRESETS[presetKey];
      if (p) {
        currentScaffoldData = p.data;
        const b = document.getElementById('scaffold-grade-badge');
        if (b) b.innerText = p.grade || 'Toán THPT';
      }
      ['btn-pre-10', 'btn-pre-11', 'btn-pre-12'].forEach(id => {
        const b = document.getElementById(id);
        if (b) {
          b.className = 'px-3 py-1 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all cursor-pointer';
        }
      });
      if (presetKey === 'grade-10-vectors') {
        const b = document.getElementById('btn-pre-10');
        if (b) b.className = 'px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 transition-all cursor-pointer';
      }
      if (presetKey === 'grade-11-limits') {
        const b = document.getElementById('btn-pre-11');
        if (b) b.className = 'px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 transition-all cursor-pointer';
      }
      if (presetKey === 'grade-12-asymptotes') {
        const b = document.getElementById('btn-pre-12');
        if (b) b.className = 'px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-800 border border-indigo-200 transition-all cursor-pointer';
      }

      setStandaloneTier(1);
    }

    function setStandaloneTier(tier) {
      if (tier === 1) {
        scaffoldTiers = { vocab: true, analysis: true, tier1: true, tier2: false, tier3: false, pitfall: false, parallel: false };
      } else if (tier === 2) {
        scaffoldTiers = { vocab: true, analysis: true, tier1: true, tier2: true, tier3: false, pitfall: true, parallel: true };
      } else {
        scaffoldTiers = { vocab: true, analysis: true, tier1: true, tier2: true, tier3: true, pitfall: true, parallel: true };
      }

      ['tier-btn-1', 'tier-btn-2', 'tier-btn-3'].forEach((id, idx) => {
        const b = document.getElementById(id);
        if (b) {
          if (idx + 1 === tier) {
            b.className = 'px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-white shadow-xs transition-all cursor-pointer';
          } else {
            b.className = 'px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer';
          }
        }
      });

      renderStandaloneScaffold();
    }

    function toggleScaffoldSection(secKeyOrEl) {
      const secKey = (typeof secKeyOrEl === 'string') ? secKeyOrEl : (secKeyOrEl ? secKeyOrEl.getAttribute('data-sec') : '');
      if (!secKey) return;
      scaffoldTiers[secKey] = !scaffoldTiers[secKey];
      renderStandaloneScaffold();
    }

    function renderStandaloneScaffold() {
      const container = document.getElementById('standalone-scaffold-container');
      const textEl = document.getElementById('scaffold-problem-text');
      const d = currentScaffoldData;
      if (!d) return;

      const pObj = SCAFFOLD_PRESETS[activeScaffoldPresetKey];
      if (textEl && pObj) {
        textEl.innerHTML = pObj.rawInput || '';
      }

      let html = '';

      // 1. Bilingual Vocabulary Card
      html += '<div class="glass-card rounded-2xl border border-teal-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="vocab" class="p-4 bg-teal-50/70 border-b border-teal-100 flex items-center justify-between cursor-pointer hover:bg-teal-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-teal-700 font-bold text-base">🗣️</span>';
      html += '<span class="font-bold text-sm text-slate-900">1. Thuật ngữ toán học then chốt (Key Mathematical Vocabulary)</span>';
      html += '</div>';
      html += '<span class="text-xs text-teal-700 font-bold">' + (scaffoldTiers.vocab ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';

      if (scaffoldTiers.vocab) {
        html += '<div class="p-4 space-y-3 bg-white">';
        html += '<div class="grid grid-cols-1 md:grid-cols-2 gap-3">';
        (d.bilingual_vocabulary || []).forEach(v => {
          const engSafe = (v.english_term || '').replace(/"/g, '&quot;');
          html += '<div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">';
          html += '<div>';
          html += '<div class="flex items-center justify-between gap-1">';
          html += '<span class="font-bold text-slate-900 text-sm">' + (v.english_term || '') + '</span>';
          html += '<div class="flex items-center gap-1">';
          html += '<button type="button" onclick="speakTerm(this)" data-term="' + engSafe + '" class="text-xs p-1 px-1.5 rounded bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 transition-all cursor-pointer shadow-2xs" title="Listen pronunciation">🔊</button>';
          html += '<button type="button" onclick="speakSlow(this)" data-term="' + engSafe + '" class="text-xs p-1 px-1.5 rounded bg-indigo-50 hover:bg-indigo-500 text-indigo-600 hover:text-white border border-indigo-200 transition-all cursor-pointer shadow-2xs" title="Nghe phát âm chậm (0.72x)">🐢</button>';
          html += '</div>';
          html += '</div>';
          html += '<div class="text-emerald-700 font-semibold text-xs mt-1">👉 ' + (v.vietnamese_term || '') + '</div>';
          html += '<div class="text-slate-600 text-[11px] mt-1.5 italic latex-box">' + (v.context_note || '') + '</div>';
          html += '</div></div>';
        });
        html += '</div></div>';
      }
      html += '</div>';

      // 2. Problem Analysis Card
      html += '<div class="glass-card rounded-2xl border border-indigo-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="analysis" class="p-4 bg-indigo-50/70 border-b border-indigo-100 flex items-center justify-between cursor-pointer hover:bg-indigo-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-indigo-700 font-bold text-base">🔍</span>';
      html += '<span class="font-bold text-sm text-slate-900">2. Bóc tách đề bài & Trọng tâm kiến thức</span>';
      html += '<button type="button" onclick="event.stopPropagation(); speakText(this)" data-speech="Problem Analysis" class="p-0.5 px-1.5 rounded bg-white hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe tiêu đề">🔊</button>';
      html += '<button type="button" onclick="event.stopPropagation(); speakSlow(this)" data-speech="Problem Analysis" class="p-0.5 px-1.5 rounded bg-white hover:bg-indigo-500 text-indigo-700 hover:text-white border border-indigo-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm tiêu đề (0.72x)">🐢</button>';
      html += '</div>';
      html += '<span class="text-xs text-indigo-700 font-bold">' + (scaffoldTiers.analysis ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.analysis) {
        const analysisSafe = escapeSpeechAttr(d.problem_analysis);
        html += '<div class="p-4 bg-white flex items-start justify-between gap-3">';
        html += '<div class="text-xs sm:text-sm text-slate-800 leading-relaxed latex-box flex-1">' + d.problem_analysis + '</div>';
        html += '<div class="flex flex-col gap-1 shrink-0">';
        html += '<button type="button" onclick="speakText(this)" data-speech="' + analysisSafe + '" class="text-xs p-1 px-2 rounded bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 transition-all cursor-pointer shadow-2xs" title="Nghe phân tích đề bài">🔊</button>';
        html += '<button type="button" onclick="speakSlow(this)" data-speech="' + analysisSafe + '" class="text-xs p-1 px-2 rounded bg-indigo-50 hover:bg-indigo-500 text-indigo-600 hover:text-white border border-indigo-200 transition-all cursor-pointer shadow-2xs" title="Nghe phân tích chậm (0.72x)">🐢</button>';
        html += '</div>';
        html += '</div>';
      }
      html += '</div>';

      // 3. Tier 1 Hint Card
      html += '<div class="glass-card rounded-2xl border border-amber-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="tier1" class="p-4 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between cursor-pointer hover:bg-amber-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-amber-700 font-bold text-base">💡</span>';
      html += '<span class="font-bold text-sm text-slate-900">3. Giàn giáo Nấc 1: Gợi mở định hướng tư duy (Tier 1 Hint)</span>';
      html += '<button type="button" onclick="event.stopPropagation(); speakText(this)" data-speech="Tier 1 Hint" class="p-0.5 px-1.5 rounded bg-white hover:bg-amber-600 text-amber-800 hover:text-white border border-amber-300 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe tiêu đề">🔊</button>';
      html += '<button type="button" onclick="event.stopPropagation(); speakSlow(this)" data-speech="Tier 1 Hint" class="p-0.5 px-1.5 rounded bg-white hover:bg-amber-500 text-amber-800 hover:text-white border border-amber-300 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm tiêu đề (0.72x)">🐢</button>';
      html += '</div>';
      html += '<span class="text-xs text-amber-700 font-bold">' + (scaffoldTiers.tier1 ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.tier1) {
        const hintSafe = escapeSpeechAttr(d.tier_1_hint);
        html += '<div class="p-4 bg-amber-50/50 flex items-start justify-between gap-3 border-l-4 border-amber-400">';
        html += '<div class="text-xs sm:text-sm text-slate-900 leading-relaxed latex-box flex-1">' + d.tier_1_hint + '</div>';
        html += '<div class="flex flex-col gap-1 shrink-0">';
        html += '<button type="button" onclick="speakText(this)" data-speech="' + hintSafe + '" class="text-xs p-1 px-2 rounded bg-amber-100 hover:bg-amber-600 text-amber-800 hover:text-white border border-amber-300 transition-all cursor-pointer shadow-2xs" title="Nghe câu hỏi gợi ý Nấc 1">🔊</button>';
        html += '<button type="button" onclick="speakSlow(this)" data-speech="' + hintSafe + '" class="text-xs p-1 px-2 rounded bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white border border-amber-300 transition-all cursor-pointer shadow-2xs" title="Nghe chậm gợi ý Nấc 1 (0.72x)">🐢</button>';
        html += '</div>';
        html += '</div>';
      }
      html += '</div>';

      // 4. Tier 2 Breakdown Card
      html += '<div class="glass-card rounded-2xl border border-blue-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="tier2" class="p-4 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between cursor-pointer hover:bg-blue-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-blue-700 font-bold text-base">🪜</span>';
      html += '<span class="font-bold text-sm text-slate-900">4. Giàn giáo Nấc 2: Khung tư duy chia nhỏ các bước (Tier 2 Breakdown)</span>';
      html += '<button type="button" onclick="event.stopPropagation(); speakText(this)" data-speech="Tier 2 Breakdown" class="p-0.5 px-1.5 rounded bg-white hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe tiêu đề">🔊</button>';
      html += '<button type="button" onclick="event.stopPropagation(); speakSlow(this)" data-speech="Tier 2 Breakdown" class="p-0.5 px-1.5 rounded bg-white hover:bg-blue-500 text-blue-700 hover:text-white border border-blue-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm tiêu đề (0.72x)">🐢</button>';
      html += '</div>';
      html += '<span class="text-xs text-blue-700 font-bold">' + (scaffoldTiers.tier2 ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.tier2) {
        html += '<div class="p-4 bg-white space-y-2">';
        (d.tier_2_breakdown || []).forEach((st, idx) => {
          const stepSafe = escapeSpeechAttr(st);
          html += '<div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 latex-box flex items-start justify-between gap-2.5">';
          html += '<div class="flex items-start gap-2.5 flex-1">';
          html += '<span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">' + (idx+1) + '</span>';
          html += '<span class="flex-1">' + st + '</span>';
          html += '</div>';
          html += '<div class="flex items-center gap-1 shrink-0">';
          html += '<button type="button" onclick="speakText(this)" data-speech="' + stepSafe + '" class="text-xs p-1 rounded bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 transition-all cursor-pointer shadow-2xs" title="Nghe bước ' + (idx+1) + '">🔊</button>';
          html += '<button type="button" onclick="speakSlow(this)" data-speech="' + stepSafe + '" class="text-xs p-1 rounded bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white border border-blue-200 transition-all cursor-pointer shadow-2xs" title="Nghe chậm bước ' + (idx+1) + ' (0.72x)">🐢</button>';
          html += '</div>';
          html += '</div>';
        });
        html += '</div>';
      }
      html += '</div>';

      // 5. Common Pitfalls
      html += '<div class="glass-card rounded-2xl border border-rose-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="pitfall" class="p-4 bg-rose-50/70 border-b border-rose-100 flex items-center justify-between cursor-pointer hover:bg-rose-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-rose-700 font-bold text-base">⚠️</span>';
      html += '<span class="font-bold text-sm text-slate-900">5. Cảnh báo lỗi sai & Cạm bẫy thường gặp (Common Pitfalls)</span>';
      html += '<button type="button" onclick="event.stopPropagation(); speakText(this)" data-speech="Common Pitfalls" class="p-0.5 px-1.5 rounded bg-white hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe tiêu đề">🔊</button>';
      html += '<button type="button" onclick="event.stopPropagation(); speakSlow(this)" data-speech="Common Pitfalls" class="p-0.5 px-1.5 rounded bg-white hover:bg-rose-500 text-rose-700 hover:text-white border border-rose-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm tiêu đề (0.72x)">🐢</button>';
      html += '</div>';
      html += '<span class="text-xs text-rose-700 font-bold">' + (scaffoldTiers.pitfall ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.pitfall) {
        const pitfallSafe = escapeSpeechAttr(d.common_pitfall);
        html += '<div class="p-4 bg-rose-50/50 flex items-start justify-between gap-3 border-l-4 border-rose-400">';
        html += '<div class="text-xs sm:text-sm text-slate-900 leading-relaxed latex-box flex-1">' + d.common_pitfall + '</div>';
        html += '<div class="flex flex-col gap-1 shrink-0">';
        html += '<button type="button" onclick="speakText(this)" data-speech="' + pitfallSafe + '" class="text-xs p-1 px-2 rounded bg-rose-100 hover:bg-rose-600 text-rose-800 hover:text-white border border-rose-300 transition-all cursor-pointer shadow-2xs" title="Nghe cảnh báo cạm bẫy">🔊</button>';
        html += '<button type="button" onclick="speakSlow(this)" data-speech="' + pitfallSafe + '" class="text-xs p-1 px-2 rounded bg-rose-50 hover:bg-rose-500 text-rose-700 hover:text-white border border-rose-300 transition-all cursor-pointer shadow-2xs" title="Nghe chậm cảnh báo cạm bẫy (0.72x)">🐢</button>';
        html += '</div>';
        html += '</div>';
      }
      html += '</div>';

      // 6. Full Solution Card
      html += '<div class="glass-card rounded-2xl border border-emerald-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="tier3" class="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between cursor-pointer hover:bg-emerald-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-emerald-700 font-bold text-base">📝</span>';
      html += '<span class="font-bold text-sm text-slate-900">6. Lời giải mẫu hoàn chỉnh từng bước (Full Solution)</span>';
      html += '<button type="button" onclick="event.stopPropagation(); speakText(this)" data-speech="Full Solution" class="p-0.5 px-1.5 rounded bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe tiêu đề">🔊</button>';
      html += '<button type="button" onclick="event.stopPropagation(); speakSlow(this)" data-speech="Full Solution" class="p-0.5 px-1.5 rounded bg-white hover:bg-emerald-500 text-emerald-700 hover:text-white border border-emerald-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe chậm tiêu đề (0.72x)">🐢</button>';
      html += '</div>';
      html += '<span class="text-xs text-emerald-700 font-bold">' + (scaffoldTiers.tier3 ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.tier3) {
        const solFormatted = (d.full_solution || '').replace(/\\n/g, '<br>');
        const solSafe = escapeSpeechAttr(d.full_solution);
        html += '<div class="p-5 bg-white flex items-start justify-between gap-3">';
        html += '<div class="text-xs sm:text-sm text-slate-900 leading-relaxed latex-box flex-1">' + solFormatted + '</div>';
        html += '<div class="flex flex-col gap-1 shrink-0">';
        html += '<button type="button" onclick="speakText(this)" data-speech="' + solSafe + '" class="text-xs p-1 px-2 rounded bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 transition-all cursor-pointer shadow-2xs" title="Nghe lời giải hoàn chỉnh">🔊</button>';
        html += '<button type="button" onclick="speakSlow(this)" data-speech="' + solSafe + '" class="text-xs p-1 px-2 rounded bg-emerald-50 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-200 transition-all cursor-pointer shadow-2xs" title="Nghe chậm lời giải hoàn chỉnh (0.72x)">🐢</button>';
        html += '</div>';
        html += '</div>';
      }
      html += '</div>';

      // 7. Parallel Exercise
      if (d.parallel_exercise) {
        const pEnSafe = escapeSpeechAttr(d.parallel_exercise.question_en);
        html += '<div class="glass-card rounded-2xl border border-teal-200 p-5 space-y-3 bg-gradient-to-r from-teal-50/60 via-white to-indigo-50/40 shadow-xs">';
        html += '<div class="flex items-center justify-between gap-2">';
        html += '<div class="flex items-center gap-2">';
        html += '<span class="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm border border-teal-200">🎯</span>';
        html += '<span class="font-bold text-sm text-slate-900">7. Bài tập tương tự tự rèn luyện (Parallel Exercise)</span>';
        html += '</div>';
        html += '<div class="flex items-center gap-1 shrink-0">';
        html += '<button type="button" onclick="speakText(this)" data-speech="' + pEnSafe + '" class="p-1 px-2 rounded-lg bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white border border-teal-200 text-xs cursor-pointer shadow-2xs inline-flex items-center gap-1" title="Nghe đọc bài tập tương tự">🔊 <span class="text-[11px] font-semibold">Nghe đề</span></button>';
        html += '<button type="button" onclick="speakSlow(this)" data-speech="' + pEnSafe + '" class="p-1 px-1.5 rounded-lg bg-teal-50 hover:bg-teal-500 text-teal-700 hover:text-white border border-teal-200 text-xs cursor-pointer shadow-2xs inline-flex items-center" title="Nghe chậm (0.72x)">🐢</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="text-xs sm:text-sm text-slate-900 font-semibold latex-box">' + d.parallel_exercise.question_en + '</div>';
        html += '<div class="text-xs text-slate-600 italic vi-text border-l-2 border-teal-400 pl-2.5">' + d.parallel_exercise.question_vi + '</div>';
        html += '<div class="flex flex-wrap items-center gap-3 pt-2">';
        html += '<input type="text" id="offline-parallel-input" placeholder="Nhập đáp số (Ví dụ: 0, 7, 2...)" class="px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 font-mono w-64 focus:border-teal-500 focus:outline-none">';
        html += '<button onclick="checkStandaloneParallelAnswer()" class="px-4 py-2 rounded-xl text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 hover:border-teal-300 shadow-2xs transition-all cursor-pointer">Kiểm Tra Đáp Số</button>';
        html += '</div>';
        html += '<div id="offline-parallel-feedback" class="hidden text-xs p-3 rounded-xl"></div>';
        html += '</div>';
      }

      container.innerHTML = html;
      triggerMathJax();
    }

    function checkStandaloneParallelAnswer() {
      const input = document.getElementById('offline-parallel-input');
      const fb = document.getElementById('offline-parallel-feedback');
      const d = currentScaffoldData;
      if (!input || !fb || !d || !d.parallel_exercise) return;

      const userVal = input.value.trim().toLowerCase();
      const correctVal = String(d.parallel_exercise.short_answer).trim().toLowerCase();

      fb.classList.remove('hidden', 'bg-emerald-50', 'border-emerald-300', 'text-emerald-800', 'bg-rose-50', 'border-rose-300', 'text-rose-800');
      fb.classList.add('border');

      if (userVal === correctVal) {
        fb.classList.add('bg-emerald-50', 'border-emerald-300', 'text-emerald-800');
        fb.innerHTML = '🎉 <strong>Chính xác tuyệt đối!</strong> Em đã vận dụng rất tốt phương pháp giàn giáo để tự giải quyết trọn vẹn bài toán.';
      } else {
        fb.classList.add('bg-rose-50', 'border-rose-300', 'text-rose-800');
        fb.innerHTML = '⚠️ <strong>Chưa chính xác!</strong> Hãy xem lại Nấc 2 (Khung tư duy) và Nấc 5 (Cạm bẫy thường gặp) phía trên để điều chỉnh phép tính.';
      }
    }

    // ==========================================
    // STANDALONE QUIZ RENDERING
    // ==========================================
    function renderStandaloneQuestions() {
      const container = document.getElementById('standalone-questions-container');
      if (container.children.length > 0) return; // already rendered

      const questions = LESSON_DATA.quiz.questions;
      let html = '';

      questions.forEach((q, index) => {
        html += '<div id="q-card-' + q.id + '" class="glass-card p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-xs transition-all">';
        html += '<div class="flex items-start justify-between gap-3 mb-3">';
        html += '<div>';
        html += '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">Question ' + (index+1) + '</span>';
        html += '<span class="text-xs text-slate-500 ml-2">[' + q.points + ' pts]</span>';
        html += '</div>';
        html += '<span class="text-xs text-slate-600 font-medium capitalize">' + q.type.replace('-', ' ') + '</span>';
        html += '</div>';

        // Question stem
        const stemSafe = escapeSpeechAttr(q.stemEn);
        html += '<div class="flex items-start justify-between gap-2 mb-2">';
        html += '<div class="text-sm sm:text-base font-semibold text-slate-900 latex-box flex-1">' + q.stemEn + '</div>';
        html += '<div class="flex items-center gap-1 shrink-0">';
        html += '<button type="button" onclick="speakText(this)" data-speech="' + stemSafe + '" class="p-1 px-2 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 text-xs cursor-pointer shadow-2xs inline-flex items-center gap-1" title="Nghe đọc câu hỏi">🔊 <span class="text-[11px] font-semibold">Nghe</span></button>';
        html += '<button type="button" onclick="speakSlow(this)" data-speech="' + stemSafe + '" class="p-1 px-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-500 text-indigo-600 hover:text-white border border-indigo-200 text-xs cursor-pointer shadow-2xs inline-flex items-center" title="Nghe chậm câu hỏi (0.72x)">🐢</button>';
        html += '</div>';
        html += '</div>';
        if (q.stemVi) {
          html += '<div class="text-xs text-slate-600 italic mb-4 vi-text border-l-2 border-indigo-300 pl-2.5">' + q.stemVi + '</div>';
        }

        // Options rendering based on type
        if (q.type === 'multiple-choice') {
          html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">';
          q.options.forEach(opt => {
            const optSafe = escapeSpeechAttr(opt.text);
            html += '<label class="flex items-center justify-between gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-400 cursor-pointer transition-all shadow-xs group">';
            html += '<div class="flex items-center gap-3 flex-1">';
            html += '<input type="radio" name="ans-' + q.id + '" value="' + opt.id + '" class="w-4 h-4 text-indigo-600 focus:ring-0">';
            html += '<span class="font-bold text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">' + opt.id + '</span>';
            html += '<span class="text-sm text-slate-900 latex-box">' + opt.text + '</span>';
            html += '</div>';
            html += '<div class="flex items-center gap-1 shrink-0">';
            html += '<button type="button" onclick="event.preventDefault(); event.stopPropagation(); speakText(this)" data-speech="' + optSafe + '" class="p-1 px-1.5 rounded bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white border border-slate-200 text-[10px] cursor-pointer shadow-2xs opacity-70 group-hover:opacity-100 transition-opacity" title="Nghe đáp án này">🔊</button>';
            html += '<button type="button" onclick="event.preventDefault(); event.stopPropagation(); speakSlow(this)" data-speech="' + optSafe + '" class="p-1 px-1.5 rounded bg-slate-100 hover:bg-indigo-500 text-slate-600 hover:text-white border border-slate-200 text-[10px] cursor-pointer shadow-2xs opacity-70 group-hover:opacity-100 transition-opacity" title="Nghe chậm đáp án (0.72x)">🐢</button>';
            html += '</div>';
            html += '</label>';
          });
          html += '</div>';
        } else if (q.type === 'true-false-4') {
          html += '<div class="space-y-2.5 my-3 overflow-x-auto">';
          html += '<table class="w-full text-left text-xs sm:text-sm">';
          html += '<thead class="text-slate-600 uppercase text-[10px] border-b border-slate-200 bg-slate-50"><tr><th class="py-2 px-3">Mệnh đề (Proposition)</th><th class="text-center py-2 w-20">Đúng (T)</th><th class="text-center py-2 w-20">Sai (F)</th></tr></thead>';
          html += '<tbody class="divide-y divide-slate-200">';
          q.propositions.forEach(prop => {
            const propSafe = escapeSpeechAttr(prop.textEn);
            html += '<tr>';
            html += '<td class="py-2.5 pr-2 px-3">';
            html += '<div class="flex items-start justify-between gap-2">';
            html += '<div class="flex-1">';
            html += '<span class="font-bold text-indigo-700 mr-1.5">' + prop.id + ')</span>';
            html += '<span class="text-slate-900 latex-box">' + prop.textEn + '</span>';
            if (prop.textVi) html += '<div class="text-[11px] text-slate-600 italic vi-text mt-0.5">' + prop.textVi + '</div>';
            html += '</div>';
            html += '<div class="flex items-center gap-1 shrink-0">';
            html += '<button type="button" onclick="speakText(this)" data-speech="' + propSafe + '" class="p-1 px-1.5 rounded bg-slate-100 hover:bg-indigo-600 text-slate-600 hover:text-white border border-slate-200 text-[10px] cursor-pointer shadow-2xs" title="Nghe mệnh đề này">🔊</button>';
            html += '<button type="button" onclick="speakSlow(this)" data-speech="' + propSafe + '" class="p-1 px-1.5 rounded bg-slate-100 hover:bg-indigo-500 text-slate-600 hover:text-white border border-slate-200 text-[10px] cursor-pointer shadow-2xs" title="Nghe chậm mệnh đề (0.72x)">🐢</button>';
            html += '</div>';
            html += '</div>';
            html += '</td>';
            html += '<td class="text-center py-2.5"><input type="radio" name="tf-' + q.id + '-' + prop.id + '" value="true" class="w-4 h-4 text-emerald-600"></td>';
            html += '<td class="text-center py-2.5"><input type="radio" name="tf-' + q.id + '-' + prop.id + '" value="false" class="w-4 h-4 text-rose-600"></td>';
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        } else if (q.type === 'short-answer') {
          html += '<div class="my-4 max-w-sm">';
          html += '<label class="block text-xs text-slate-600 mb-1.5 font-medium">Nhập đáp số (số thực / phân số):</label>';
          html += '<input type="text" id="short-input-' + q.id + '" placeholder="Ví dụ: 3 hoặc 0.75..." class="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 font-mono text-sm focus:border-indigo-500 focus:outline-none">';
          html += '</div>';
        }

        // Solution box (hidden until graded)
        const expSafe = escapeSpeechAttr(q.explanationEn);
        html += '<div id="solution-' + q.id + '" class="hidden mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1.5">';
        html += '<div class="flex items-center justify-between">';
        html += '<div class="font-bold text-indigo-700">💡 Giải thích chi tiết:</div>';
        html += '<div class="flex items-center gap-1.5">';
        html += '<button type="button" onclick="speakText(this)" data-speech="' + expSafe + '" class="p-1 px-2 rounded bg-white hover:bg-indigo-600 text-indigo-600 hover:text-white border border-slate-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe giải thích chi tiết">🔊 Nghe</button>';
        html += '<button type="button" onclick="speakSlow(this)" data-speech="' + expSafe + '" class="p-1 px-1.5 rounded bg-white hover:bg-indigo-500 text-indigo-600 hover:text-white border border-slate-200 text-[10px] shrink-0 cursor-pointer shadow-2xs" title="Nghe giải thích chậm (0.72x)">🐢 Chậm</button>';
        html += '</div>';
        html += '</div>';
        html += '<div class="latex-box text-slate-900">' + (q.explanationEn || '') + '</div>';
        if (q.explanationVi) html += '<div class="text-slate-600 vi-text italic">' + q.explanationVi + '</div>';
        html += '</div>';

        html += '</div>';
      });

      container.innerHTML = html;
      triggerMathJax();
    }

    function gradeStandaloneQuiz() {
      let earnedPoints = 0;
      let totalMaxPoints = 0;
      const questions = LESSON_DATA.quiz.questions;

      questions.forEach(q => {
        totalMaxPoints += q.points;
        const card = document.getElementById('q-card-' + q.id);
        const sol = document.getElementById('solution-' + q.id);
        if (sol) sol.classList.remove('hidden');

        if (q.type === 'multiple-choice') {
          const selected = document.querySelector('input[name="ans-' + q.id + '"]:checked');
          const correctOpt = q.options.find(o => o.isCorrect);
          if (selected && selected.value === correctOpt.id) {
            earnedPoints += q.points;
            card.classList.add('border-emerald-400', 'bg-emerald-50/50');
          } else {
            card.classList.add('border-rose-400', 'bg-rose-50/50');
          }
        } else if (q.type === 'true-false-4') {
          let correctCount = 0;
          q.propositions.forEach(prop => {
            const chosen = document.querySelector('input[name="tf-' + q.id + '-' + prop.id + '"]:checked');
            if (chosen && ((chosen.value === 'true') === prop.isCorrect)) {
              correctCount++;
            }
          });
          let multiplier = 0;
          if (correctCount === 1) multiplier = 0.1;
          else if (correctCount === 2) multiplier = 0.25;
          else if (correctCount === 3) multiplier = 0.5;
          else if (correctCount === 4) multiplier = 1.0;
          
          earnedPoints += q.points * multiplier;
          if (correctCount === 4) {
            card.classList.add('border-emerald-400', 'bg-emerald-50/50');
          } else if (correctCount >= 2) {
            card.classList.add('border-amber-400', 'bg-amber-50/50');
          } else {
            card.classList.add('border-rose-400', 'bg-rose-50/50');
          }
        } else if (q.type === 'short-answer') {
          const input = document.getElementById('short-input-' + q.id);
          const val = input ? input.value.trim().toLowerCase() : '';
          const correct = String(q.correctAnswer).trim().toLowerCase();
          const acceptable = (q.acceptableAnswers || []).map(a => String(a).trim().toLowerCase());
          
          let isRight = (val === correct) || acceptable.includes(val);
          if (!isRight && !isNaN(parseFloat(val)) && !isNaN(parseFloat(correct))) {
            const tol = q.tolerance || 0.01;
            if (Math.abs(parseFloat(val) - parseFloat(correct)) <= tol) {
              isRight = true;
            }
          }

          if (isRight) {
            earnedPoints += q.points;
            card.classList.add('border-emerald-400', 'bg-emerald-50/50');
          } else {
            card.classList.add('border-rose-400', 'bg-rose-50/50');
          }
        }
      });

      const scaledScore = totalMaxPoints > 0 ? (earnedPoints / totalMaxPoints) * 10 : 0;
      const resultBanner = document.getElementById('standalone-quiz-result');
      const scoreNum = document.getElementById('result-score-num');
      const feedback = document.getElementById('result-feedback');

      resultBanner.classList.remove('hidden');
      scoreNum.innerText = scaledScore.toFixed(1);

      if (scaledScore >= 8.5) {
        feedback.innerText = 'Xuất sắc! Bạn đã nắm rất vững các kiến thức toán học song ngữ!';
      } else if (scaledScore >= 6.5) {
        feedback.innerText = 'Khá tốt! Hãy xem lại các bước giải chi tiết phía dưới để hoàn thiện kiến thức.';
      } else {
        feedback.innerText = 'Cần luyện tập thêm. Hãy đọc kỹ phần định lý và các bước giải mẫu!';
      }

      resultBanner.scrollIntoView({ behavior: 'smooth' });
      triggerMathJax();
    }

    function resetStandaloneQuiz() {
      const container = document.getElementById('standalone-questions-container');
      container.innerHTML = '';
      document.getElementById('standalone-quiz-result').classList.add('hidden');
      renderStandaloneQuestions();
    }

    window.addEventListener('DOMContentLoaded', () => {
      triggerMathJax();
    });
  </script>
</body>
</html>`;

    // Trigger download of standalone HTML
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const safeTitle = (lesson.meta.titleEn || 'Math_Lesson').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${safeTitle}_Bilingual_Standalone.html`;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Generates and downloads an editable Microsoft Word document (.doc)
   * Options: includeSolutions (boolean), mode: 'student' | 'teacher'
   */
  exportWordDocument(lesson, options = { includeSolutions: false }) {
    const { includeSolutions } = options;
    const safeTitle = (lesson.meta.titleEn || 'Math_Lesson').replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = includeSolutions 
      ? `[Giao_Vien_Dap_An]_${safeTitle}.doc` 
      : `[Hoc_Sinh_De_Thi]_${safeTitle}.doc`;

    const vocabRows = (lesson.vocabulary || []).map((v, i) => `
      <tr>
        <td style="border: 1px solid #555; padding: 5px; text-align: center; width: 30px;">${i + 1}</td>
        <td style="border: 1px solid #555; padding: 5px; font-weight: bold; width: 180px;">${v.term}</td>
        <td style="border: 1px solid #555; padding: 5px; font-style: italic; color: #2563eb; width: 110px;">${v.ipa || ''}</td>
        <td style="border: 1px solid #555; padding: 5px; font-weight: bold; width: 160px;">${v.meaningVi}</td>
        <td style="border: 1px solid #555; padding: 5px; font-size: 10pt;">${this.formatMathForWord(v.exampleEn)}<br><span style="color: #555; font-style: italic;">${v.exampleVi}</span></td>
      </tr>
    `).join('');

    const questionItems = (lesson.quiz.questions || []).map((q, qIndex) => {
      const levelLabel = q.level === 'NB' ? 'Nhận biết' : q.level === 'TH' ? 'Thông hiểu' : q.level === 'VD' ? 'Vận dụng' : q.level === 'VDC' ? 'Vận dụng cao' : '';
      const levelTag = levelLabel ? ` [${levelLabel}]` : '';

      let qHtml = `
        <div style="margin-bottom: 16pt; page-break-inside: avoid;">
          <div style="font-weight: bold; margin-bottom: 3pt;">
            Câu ${qIndex + 1} (${q.points} điểm)${levelTag}: ${this.formatMathForWord(q.stemEn)}
          </div>
          <div style="font-style: italic; color: #444; margin-bottom: 6pt; font-size: 11pt;">
            Dịch nghĩa: ${q.stemVi}
          </div>
      `;

      if (q.type === 'multiple-choice') {
        qHtml += `<table style="width: 100%; border-collapse: collapse; margin-left: 10px; margin-bottom: 6pt;">`;
        for (let i = 0; i < q.options.length; i += 2) {
          const opt1 = q.options[i];
          const opt2 = q.options[i + 1];
          qHtml += `<tr>`;
          if (opt1) {
            const isCor = includeSolutions && opt1.isCorrect;
            qHtml += `<td style="padding: 4px; width: 50%; font-size: 11pt; ${isCor ? 'font-weight: bold; color: #b91c1c; text-decoration: underline;' : ''}">
              <strong>${opt1.id}.</strong> ${this.formatMathForWord(opt1.text)} ${isCor ? ' [✓ Đáp án]' : ''}
            </td>`;
          }
          if (opt2) {
            const isCor = includeSolutions && opt2.isCorrect;
            qHtml += `<td style="padding: 4px; width: 50%; font-size: 11pt; ${isCor ? 'font-weight: bold; color: #b91c1c; text-decoration: underline;' : ''}">
              <strong>${opt2.id}.</strong> ${this.formatMathForWord(opt2.text)} ${isCor ? ' [✓ Đáp án]' : ''}
            </td>`;
          }
          qHtml += `</tr>`;
        }
        qHtml += `</table>`;
      } else if (q.type === 'true-false-4') {
        qHtml += `
          <table style="width: 100%; border-collapse: collapse; margin: 6pt 0;">
            <thead>
              <tr style="background-color: #f2f2f2;">
                <th style="border: 1px solid #777; padding: 4px 6px; text-align: left;">Các mệnh đề (Propositions)</th>
                <th style="border: 1px solid #777; padding: 4px; width: 80px; text-align: center;">Đúng</th>
                <th style="border: 1px solid #777; padding: 4px; width: 80px; text-align: center;">Sai</th>
              </tr>
            </thead>
            <tbody>
              ${(q.propositions || []).map(p => `
                <tr>
                  <td style="border: 1px solid #777; padding: 4px 6px;">
                    <strong>${p.id})</strong> ${this.formatMathForWord(p.textEn)}
                    <div style="font-size: 10pt; color: #444; font-style: italic;">${p.textVi}</div>
                  </td>
                  <td style="border: 1px solid #777; text-align: center; font-weight: bold; font-size: 13pt;">
                    ${includeSolutions && p.isCorrect ? '✓' : ''}
                  </td>
                  <td style="border: 1px solid #777; text-align: center; font-weight: bold; font-size: 13pt;">
                    ${includeSolutions && !p.isCorrect ? '✓' : ''}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      } else if (q.type === 'short-answer') {
        qHtml += `
          <div style="margin: 6pt 0; font-size: 11.5pt;">
            <strong>Đáp số của học sinh (Your answer):</strong>
            <span style="display: inline-block; width: 160px; border-bottom: 1.5px dotted #000; margin-left: 10px;">&nbsp;</span>
            ${includeSolutions ? `<span style="color: #b91c1c; font-weight: bold; margin-left: 14pt;">Đáp án chuẩn: ${q.correctAnswer}</span>` : ''}
          </div>
        `;
      }

      if (includeSolutions) {
        qHtml += `
          <div style="background-color: #f8fafc; border-left: 3.5px solid #2563eb; padding: 6px 10px; margin-top: 6pt; font-size: 10.5pt;">
            <strong style="color: #1e40af;">[Hướng dẫn giải chi tiết]:</strong><br>
            ${this.formatMathForWord(q.explanationEn)}<br>
            <em style="color: #4b5563;">${q.explanationVi}</em>
          </div>
        `;
      }

      qHtml += `</div>`;
      return qHtml;
    }).join('');

    const branding = window.App?.teacherBranding || {
      department: "SỞ GD&ĐT TP. HỒ CHÍ MINH",
      school: "TRƯỜNG THPT CHUYÊN",
      subject: "TỔ TOÁN - TIN HỌC",
      teacherName: "Cô Huỳnh Thị Hà",
      grade: "Khối 12",
      academicYear: "2025 - 2026",
      examType: "BÀI KIỂM TRA ĐÁNH GIÁ ĐỊNH KỲ"
    };

    // Prepare MOET Test Matrix table if solutions/teacher mode
    let matrixWordHtml = '';
    if (includeSolutions && window.App?.calculateTestMatrix) {
      const m = window.App.calculateTestMatrix(lesson.quiz);
      if (m) {
        matrixWordHtml = `
          <div class="section-title" style="background-color: #fef3c7; border-left: 4px solid #b45309; color: #78350f;">
            BẢNG MA TRẬN ĐỀ THI THEO CHUẨN BỘ GIÁO DỤC VÀ ĐÀO TẠO (GDPT 2018)
          </div>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16pt; font-size: 10pt;">
            <thead>
              <tr style="background-color: #1e3a8a; color: #fff; text-align: center; font-weight: bold;">
                <th rowspan="2" style="border: 1px solid #555; padding: 4px;">Dạng Thức / Phần Thi</th>
                <th colspan="2" style="border: 1px solid #555; padding: 4px;">1. Nhận biết (NB)</th>
                <th colspan="2" style="border: 1px solid #555; padding: 4px;">2. Thông hiểu (TH)</th>
                <th colspan="2" style="border: 1px solid #555; padding: 4px;">3. Vận dụng (VD)</th>
                <th colspan="2" style="border: 1px solid #555; padding: 4px;">4. Vận dụng cao (VDC)</th>
                <th colspan="2" style="border: 1px solid #555; padding: 4px;">Tổng Cộng</th>
              </tr>
              <tr style="background-color: #e2e8f0; color: #000; text-align: center; font-weight: bold; font-size: 9pt;">
                <th style="border: 1px solid #555; padding: 3px;">Số câu</th>
                <th style="border: 1px solid #555; padding: 3px;">Điểm</th>
                <th style="border: 1px solid #555; padding: 3px;">Số câu</th>
                <th style="border: 1px solid #555; padding: 3px;">Điểm</th>
                <th style="border: 1px solid #555; padding: 3px;">Số câu</th>
                <th style="border: 1px solid #555; padding: 3px;">Điểm</th>
                <th style="border: 1px solid #555; padding: 3px;">Số câu</th>
                <th style="border: 1px solid #555; padding: 3px;">Điểm</th>
                <th style="border: 1px solid #555; padding: 3px;">Số câu</th>
                <th style="border: 1px solid #555; padding: 3px;">Điểm</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #555; padding: 4px; font-weight: bold;">Phần I: Trắc nghiệm 4 lựa chọn</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part1.nbCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part1.nbPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part1.thCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part1.thPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part1.vdCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part1.vdPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part1.vdcCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part1.vdcPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center; font-weight: bold; background-color: #f1f5f9;">${m.part1.totalCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center; font-weight: bold; background-color: #f1f5f9;">${m.part1.totalPts.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #555; padding: 4px; font-weight: bold;">Phần II: Đúng / Sai (4 mệnh đề)</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part2.nbCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part2.nbPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part2.thCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part2.thPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part2.vdCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part2.vdPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part2.vdcCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part2.vdcPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center; font-weight: bold; background-color: #f1f5f9;">${m.part2.totalCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center; font-weight: bold; background-color: #f1f5f9;">${m.part2.totalPts.toFixed(2)}</td>
              </tr>
              <tr>
                <td style="border: 1px solid #555; padding: 4px; font-weight: bold;">Phần III: Điền đáp số ngắn</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part3.nbCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part3.nbPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part3.thCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part3.thPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part3.vdCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part3.vdPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part3.vdcCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center;">${m.part3.vdcPts.toFixed(2)}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center; font-weight: bold; background-color: #f1f5f9;">${m.part3.totalCount}</td>
                <td style="border: 1px solid #555; padding: 4px; text-align: center; font-weight: bold; background-color: #f1f5f9;">${m.part3.totalPts.toFixed(2)}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="background-color: #e0e7ff; font-weight: bold;">
                <td style="border: 1px solid #555; padding: 4px;">TỔNG SỐ CÂU</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.nbCount} câu</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.thCount} câu</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.vdCount} câu</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.vdcCount} câu</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center; font-size: 11pt; color: #1e3a8a;">${m.totals.grandCount} CÂU</td>
              </tr>
              <tr style="background-color: #f1f5f9; font-weight: bold;">
                <td style="border: 1px solid #555; padding: 4px;">TỔNG ĐIỂM SỐ</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.nbPts.toFixed(2)} đ</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.thPts.toFixed(2)} đ</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.vdPts.toFixed(2)} đ</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.vdcPts.toFixed(2)} đ</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center; font-size: 11pt; color: #1e3a8a;">${m.totals.grandPts.toFixed(2)} ĐIỂM</td>
              </tr>
              <tr style="background-color: #fef3c7; font-weight: bold;">
                <td style="border: 1px solid #555; padding: 4px;">TỶ LỆ PHẦN TRĂM (%)</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.nbPct}%</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.thPct}%</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.vdPct}%</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center;">${m.totals.vdcPct}%</td>
                <td colspan="2" style="border: 1px solid #555; padding: 4px; text-align: center; font-size: 11pt; color: #b45309;">100%</td>
              </tr>
            </tfoot>
          </table>
        `;
      }
    }

    const wordHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 21.0cm 29.7cm;
      margin: 2.0cm 2.0cm 2.0cm 2.0cm;
      mso-header-margin: 36.0pt;
      mso-footer-margin: 36.0pt;
      mso-paper-source: 0;
    }
    div.Section1 {
      page: Section1;
    }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.35;
      color: #000;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    .section-title {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      background-color: #ebebeb;
      padding: 5px 8px;
      margin: 14pt 0 8pt 0;
      border-left: 4px solid #111;
    }
  </style>
</head>
<body>
  <div class="Section1">
    
    <!-- MOET Official 2-Column Header Table -->
    <table style="width: 100%; margin-bottom: 10pt; border: none;">
      <tr>
        <td style="width: 48%; vertical-align: top; text-align: center; line-height: 1.35;">
          <div style="font-size: 10pt; font-weight: bold; text-transform: uppercase;">${branding.department}</div>
          <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; color: #1e3a8a;">${branding.school}</div>
          <div style="font-size: 10pt; font-weight: bold;">${branding.subject}</div>
          <div style="font-size: 9.5pt; font-style: italic; margin-top: 2pt;">Giáo viên biên soạn: <strong>${branding.teacherName}</strong></div>
          <div style="width: 80px; border-bottom: 1px solid #000; margin: 3pt auto 0 auto;"></div>
        </td>
        <td style="width: 52%; vertical-align: top; text-align: center; line-height: 1.35;">
          <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">${branding.examType} - NĂM HỌC ${branding.academicYear}</div>
          <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase; color: #b91c1c;">MÔN: TOÁN (BILINGUAL) - ${branding.grade}</div>
          <div style="font-size: 10pt; font-style: italic;">${lesson.quiz.titleEn} (${lesson.quiz.titleVi})</div>
          <div style="font-size: 9.5pt; margin-top: 2pt;">Thời gian làm bài: <strong>${lesson.quiz.timeMinutes || 20} phút</strong> (Không kể thời gian phát đề)</div>
          <div style="width: 100px; border-bottom: 1px solid #000; margin: 3pt auto 0 auto;"></div>
        </td>
      </tr>
    </table>

    <!-- Student Name & Scores Box -->
    <table style="width: 100%; margin-bottom: 12pt; border: 1.5px solid #000;">
      <tr>
        <td style="width: 65%; padding: 6px 10px; font-size: 11pt; line-height: 1.7; vertical-align: top;">
          Họ và tên học sinh: .............................................................. Lớp: ...................<br>
          Số báo danh: .................................................. Mã đề thi: <strong>101</strong>
        </td>
        <td style="width: 35%; border-left: 1.5px solid #000; padding: 4px; text-align: center; vertical-align: top;">
          <div style="font-size: 9pt; font-weight: bold;">ĐIỂM SỐ & NHẬN XÉT CỦA GIÁO VIÊN</div>
          <div style="height: 40px;"></div>
        </td>
      </tr>
    </table>

    <div style="border-top: 1.5px solid #000; margin: 8pt 0 14pt 0;"></div>

    <!-- MOET Matrix Table (For Teacher Edition) -->
    ${matrixWordHtml}

    <!-- Key Vocabulary Section -->
    <div class="section-title">PHẦN I: THUẬT NGỮ TOÁN HỌC TRỌNG TÂM (KEY VOCABULARY)</div>
    <table style="width: 100%; margin-bottom: 14pt;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #555; padding: 5px;">STT</th>
          <th style="border: 1px solid #555; padding: 5px;">Thuật ngữ tiếng Anh</th>
          <th style="border: 1px solid #555; padding: 5px;">Phiên âm (IPA)</th>
          <th style="border: 1px solid #555; padding: 5px;">Thuật ngữ tiếng Việt</th>
          <th style="border: 1px solid #555; padding: 5px;">Ngữ cảnh & Ví dụ</th>
        </tr>
      </thead>
      <tbody>
        ${vocabRows}
      </tbody>
    </table>

    <!-- Questions Assessment Section -->
    <div class="section-title">PHẦN II: BÀI KIỂM TRA ĐÁNH GIÁ (ASSESSMENT TEST)</div>
    ${questionItems}

    <div style="text-align: center; margin-top: 25pt; font-style: italic; font-size: 11pt;">
      --- HẾT (END OF WORKSHEET) ---
    </div>

  </div>
</body>
</html>`;

    const blob = new Blob([wordHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Generates and downloads a Scaffolding Tutor Worksheet in Word (.doc)
   */
  exportScaffoldWord(scaffoldData, lessonTitle = 'Toán Song Ngữ') {
    if (!scaffoldData) return;
    const d = scaffoldData;
    const safeTitle = lessonTitle.replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `[Phieu_Gian_Giao]_${safeTitle}.doc`;

    const vocabRows = (d.bilingual_vocabulary || []).map((v, i) => `
      <tr>
        <td style="border: 1px solid #555; padding: 5px; text-align: center; width: 30px;">${i + 1}</td>
        <td style="border: 1px solid #555; padding: 5px; font-weight: bold; width: 200px;">${v.english_term}</td>
        <td style="border: 1px solid #555; padding: 5px; font-weight: bold; width: 180px;">${v.vietnamese_term}</td>
        <td style="border: 1px solid #555; padding: 5px; font-size: 10.5pt;">${this.formatMathForWord(v.context_note)}</td>
      </tr>
    `).join('');

    const stepsList = (d.tier_2_breakdown || []).map((s, idx) => `
      <li style="margin-bottom: 6pt;"><strong>Bước ${idx + 1}:</strong> ${this.formatMathForWord(s)}</li>
    `).join('');

    const wordHtml = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page Section1 {
      size: 21.0cm 29.7cm;
      margin: 2.0cm 2.0cm 2.0cm 2.0cm;
    }
    div.Section1 { page: Section1; }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.35;
      color: #000;
    }
    table { border-collapse: collapse; width: 100%; }
    .title-box {
      text-align: center;
      border-bottom: 2px solid #000;
      padding-bottom: 10pt;
      margin-bottom: 14pt;
    }
    .section-title {
      font-size: 12pt;
      font-weight: bold;
      text-transform: uppercase;
      background-color: #f0f0f0;
      padding: 5px 8px;
      margin: 14pt 0 6pt 0;
      border-left: 4px solid #111;
    }
    .box {
      border: 1px solid #777;
      background-color: #fafafa;
      padding: 8pt 10pt;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="Section1">
    
    <div class="title-box">
      <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">MATH BILINGUAL ACADEMY • HỆ THỐNG GIÀN GIÁO SƯ PHẠM</div>
      <div style="font-size: 14pt; font-weight: bold; text-transform: uppercase; margin-top: 4pt;">PHIẾU HỌC TẬP GIÀN GIÁO NHẬN THỨC TOÁN SONG NGỮ</div>
      <div style="font-size: 10.5pt; font-style: italic; margin-top: 3pt;">Mô hình hỗ trợ sư phạm tích cực theo Vùng phát triển gần (ZPD) & Định hướng GDPT 2018</div>
      <div style="font-size: 11pt; margin-top: 8pt; text-align: left;">
        Họ và tên học sinh (Student Name): .................................................... &nbsp;&nbsp;&nbsp; Lớp: .................
      </div>
    </div>

    <!-- Section 1 -->
    <div class="section-title">1. Bóc tách đề bài & Trọng tâm kiến thức</div>
    <div class="box">${this.formatMathForWord(d.problem_analysis)}</div>

    <!-- Section 2 -->
    <div class="section-title">2. Thuật ngữ toán học then chốt (Key Vocabulary)</div>
    <table>
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #555; padding: 5px;">STT</th>
          <th style="border: 1px solid #555; padding: 5px;">Thuật ngữ tiếng Anh</th>
          <th style="border: 1px solid #555; padding: 5px;">Thuật ngữ tiếng Việt</th>
          <th style="border: 1px solid #555; padding: 5px;">Ý nghĩa & Ngữ cảnh toán học</th>
        </tr>
      </thead>
      <tbody>
        ${vocabRows}
      </tbody>
    </table>

    <!-- Section 3 -->
    <div class="section-title">3. Giàn giáo Nấc 1: Câu hỏi gợi mở định hướng tư duy</div>
    <div class="box" style="border-left: 4px solid #d97706; background-color: #fffbeb;">
      <strong>💡 Gợi ý tư duy:</strong> ${this.formatMathForWord(d.tier_1_hint)}
    </div>

    <!-- Section 4 -->
    <div class="section-title">4. Giàn giáo Nấc 2: Khung tư duy chia nhỏ các bước giải</div>
    <ol style="padding-left: 18pt; margin: 6pt 0;">
      ${stepsList}
    </ol>

    <!-- Section 5 -->
    <div class="section-title">5. Cảnh báo lỗi sai & Cạm bẫy thường gặp (Common Pitfalls)</div>
    <div class="box" style="border-left: 4px solid #dc2626; background-color: #fef2f2;">
      <strong>⚠️ Lưu ý cạm bẫy:</strong> ${this.formatMathForWord(d.common_pitfall)}
    </div>

    <!-- Section 6 -->
    <div class="section-title">6. Lời giải mẫu hoàn chỉnh từng bước (Full Solution)</div>
    <div class="box" style="line-height: 1.45;">
      ${this.formatMathForWord(d.full_solution || '').replace(/\n/g, '<br>')}
    </div>

    <!-- Section 7 -->
    ${d.parallel_exercise ? `
      <div class="section-title">7. Bài tập tương tự tự rèn luyện (Parallel Exercise)</div>
      <div class="box">
        <p><strong>English:</strong> ${this.formatMathForWord(d.parallel_exercise.question_en)}</p>
        <p><strong>Tiếng Việt:</strong> ${d.parallel_exercise.question_vi}</p>
        <div style="margin-top: 14pt; font-size: 11.5pt;">
          <strong>Đáp số của em (Your answer):</strong>
          <span style="display: inline-block; width: 160px; border-bottom: 1.5px dotted #000; margin-left: 8pt;">&nbsp;</span>
        </div>
      </div>
    ` : ''}

  </div>
</body>
</html>`;

    const blob = new Blob([wordHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Helper format công thức Toán cho hiển thị HTML tĩnh ngay cả khi trình duyệt chặn JS (No-JS Fallback)
   * Tương thích 100% với iOS QuickLook, Zalo In-App Preview, Safari & Android Chrome
   */
  formatMathForDisplay(text) {
    if (!text) return '';
    let s = String(text);

    // 1. Phân số \frac{A}{B} hoặc \dfrac{A}{B}
    s = s.replace(/\\d?frac\{([^{}]+)\}\{([^{}]+)\}/g, '<span class="inline-frac"><span class="frac-num">$1</span><span class="frac-den">$2</span></span>');

    // 2. Giới hạn lim
    s = s.replace(/\\lim_\{([^}]+)\}/g, 'lim($1)');

    // 3. Ký hiệu toán học phổ biến
    s = s.replace(/\\neq/g, ' ≠ ')
         .replace(/\\leq|\\le/g, ' ≤ ')
         .replace(/\\geq|\\ge/g, ' ≥ ')
         .replace(/\\approx/g, ' ≈ ')
         .replace(/\\to/g, ' → ')
         .replace(/\\pm/g, ' ± ')
         .replace(/\\mp/g, ' ∓ ')
         .replace(/\\infty/g, ' ∞ ')
         .replace(/\\cdot/g, ' · ')
         .replace(/\\times/g, ' × ')
         .replace(/\\perp/g, ' ⊥ ')
         .replace(/\\parallel/g, ' ∥ ')
         .replace(/\\mathbb\{R\}/g, 'ℝ')
         .replace(/\\mathbb\{Z\}/g, 'ℤ')
         .replace(/\\mathbb\{N\}/g, 'ℕ')
         .replace(/\\mathbb\{Q\}/g, 'ℚ')
         .replace(/\\mathbb\{C\}/g, 'ℂ')
         .replace(/\\vec\{([a-zA-Z0-9]+)\}/g, '$1⃗')
         .replace(/\\overrightarrow\{([a-zA-Z0-9]+)\}/g, '$1⃗')
         .replace(/\\sqrt\[([^{}]+)\]\{([^{}]+)\}/g, '$1√($2)')
         .replace(/\\sqrt\{([^{}]+)\}/g, '√($1)')
         .replace(/\\Delta/g, 'Δ')
         .replace(/\\alpha/g, 'α')
         .replace(/\\beta/g, 'β')
         .replace(/\\pi/g, 'π')
         .replace(/\\in/g, ' ∈ ')
         .replace(/\\notin/g, ' ∉ ')
         .replace(/\\subset/g, ' ⊂ ')
         .replace(/\\cup/g, ' ∪ ')
         .replace(/\\cap/g, ' ∩ ')
         .replace(/\\emptyset/g, '∅')
         .replace(/\\angle/g, '∠');

    // 4. Chỉ số dưới subscript: x_0 -> x₀, y_0 -> y₀...
    const subMap = { '0':'₀', '1':'₁', '2':'₂', '3':'₃', '4':'₄', '5':'₅', '6':'₆', '7':'₇', '8':'₈', '9':'₉', 'i':'ᵢ', 'n':'ₙ', 'm':'ₘ' };
    s = s.replace(/_([0-9inm])\b/g, (m, c) => subMap[c] || ('_' + c));
    s = s.replace(/_\{([0-9inm]+)\}/g, (m, c) => c.split('').map(ch => subMap[ch] || ch).join(''));

    // 5. Số mũ superscript: ^2 -> ², ^3 -> ³...
    const supMap = { '0':'⁰', '1':'¹', '2':'²', '3':'³', '4':'⁴', '5':'⁵', '6':'⁶', '7':'⁷', '8':'⁸', '9':'⁹', '+':'⁺', '-':'⁻', 'n':'ⁿ' };
    s = s.replace(/\^([0-9n\+\-])\b/g, (m, c) => supMap[c] || ('^' + c));
    s = s.replace(/\^\{([0-9n\+\-]+)\}/g, (m, c) => c.split('').map(ch => supMap[ch] || ch).join(''));

    // 6. Xử lý macro định dạng
    s = s.replace(/\\text\{([^}]+)\}/g, '$1')
         .replace(/\\mathrm\{([^}]+)\}/g, '$1')
         .replace(/\\mathbf\{([^}]+)\}/g, '<strong>$1</strong>')
         .replace(/\\left|\\right/g, '')
         .replace(/\\quad|\\qquad|\\,|\\;|\\!/g, ' ');

    // 7. Loại bỏ các dấu $ bao quanh công thức
    s = s.replace(/\$+/g, '');

    return s;
  },

  /**
   * Generates and downloads a Standalone Self-Contained HTML document
   * specifically for a Scaffolding Tutor Exercise (100% Offline with MathJax, Audio & Auto-Grading)
   * Tương thích 100% với iOS Safari, Android Chrome, Zalo WebView và QuickLook Preview
   */
  exportScaffoldStandaloneHTML(item) {
    if (!item) return;
    const title = item.titleVi || item.title || 'Bài tập giàn giáo ZPD';
    const grade = item.grade || 'Toán THPT';
    const data = item.scaffoldData || {};
    const rawInput = item.rawInput || '';
    const branding = window.App?.teacherBranding || {
      teacherName: "Cô Huỳnh Thị Hà",
      subject: "TỔ TOÁN - TIN HỌC",
      school: "TRƯỜNG THPT CHUYÊN"
    };

    const vocabCards = (data.bilingual_vocabulary || []).map((v, i) => `
      <div class="vocab-card">
        <div class="vocab-top">
          <div>
            <div class="vocab-en">${v.english_term || ''}</div>
            <div class="vocab-vi">👉 ${v.vietnamese_term || ''}</div>
          </div>
          <div class="vocab-actions">
            <button type="button" onclick="speakText('${(v.english_term || '').replace(/'/g, "\\'")}', 0.88)" class="speak-btn" title="Nghe phát âm chuẩn (rõ chữ)">🔊</button>
            <button type="button" onclick="speakText('${(v.english_term || '').replace(/'/g, "\\'")}', 0.68)" class="speak-btn speak-slow" title="Nghe chậm luyện âm">🐢</button>
          </div>
        </div>
        ${v.context_note ? `<div class="vocab-note">${this.formatMathForDisplay(v.context_note)}</div>` : ''}
      </div>
    `).join('');

    const breakdownItems = (data.tier_2_breakdown || []).map((b, i) => `
      <div class="step-item">
        <span class="step-num">${i + 1}</span>
        <div class="step-text">${this.formatMathForDisplay(b)}</div>
      </div>
    `).join('');

    const parallel = data.parallel_exercise || {};
    const cleanEscapedAnswer = (parallel.short_answer || '').replace(/"/g, '\\"');

    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes">
  <title>${title} | Phiếu Giàn Giáo Sư Phạm ZPD</title>
  
  <!-- MathJax Configuration with SVG Render for Sharp Display -->
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
        processEscapes: true
      },
      svg: { fontCache: 'global' },
      startup: {
        ready: function() {
          MathJax.startup.defaultReady();
          document.body.classList.add('mathjax-ready');
        }
      }
    };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

  <!-- PURE EMBEDDED CSS (100% Standalone - Hoàn toàn không phụ thuộc CDN Tailwind, mở trên điện thoại cực đẹp) -->
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #0f172a;
      line-height: 1.6;
      padding: 14px 10px 60px;
      -webkit-font-smoothing: antialiased;
    }
    .standalone-container {
      max-width: 760px;
      margin: 0 auto;
    }

    /* Zalo / In-app browser helpful hint */
    .zalo-hint-banner {
      background: #fffbeb;
      border: 1.5px solid #fde68a;
      border-radius: 16px;
      padding: 12px 14px;
      margin-bottom: 16px;
      font-size: 13px;
      color: #92400e;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      box-shadow: 0 2px 6px rgba(245, 158, 11, 0.08);
      line-height: 1.45;
    }
    .zalo-hint-banner strong { color: #78350f; }

    /* Top Hero Banner */
    .hero-banner {
      background: linear-gradient(135deg, #f59e0b 0%, #ea580c 50%, #4f46e5 100%);
      color: #ffffff;
      padding: 22px 18px;
      border-radius: 22px;
      box-shadow: 0 8px 24px rgba(79, 70, 229, 0.18);
      margin-bottom: 18px;
    }
    .hero-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 255, 255, 0.22);
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 10px;
    }
    .hero-title {
      font-size: 20px;
      font-weight: 900;
      line-height: 1.35;
      margin-bottom: 10px;
    }
    .hero-meta {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.95);
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.25);
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
    }

    /* Cards */
    .scaffold-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 18px 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 8px;
    }
    .card-title {
      font-size: 13.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: #1e293b;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Voice Switcher Bar */
    .voice-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f1f5f9;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 8px 12px;
      margin-bottom: 12px;
      font-size: 12px;
    }
    .voice-btn-group {
      display: flex;
      gap: 6px;
    }
    .btn-voice {
      padding: 4px 10px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }
    .btn-voice.active {
      background: #4f46e5;
      color: #ffffff;
      border-color: #4f46e5;
    }

    /* Vocabulary Grid */
    .vocab-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 12px;
    }
    .vocab-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .vocab-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
    }
    .vocab-en { font-size: 15px; font-weight: 800; color: #0f172a; }
    .vocab-vi { font-size: 13px; font-weight: 700; color: #047857; margin-top: 2px; }
    .vocab-note {
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      padding-top: 6px;
      margin-top: 4px;
      line-height: 1.45;
    }
    .vocab-actions {
      display: flex;
      gap: 4px;
      flex-shrink: 0;
    }

    /* Buttons */
    .speak-btn {
      background: #eef2ff;
      color: #4338ca;
      border: 1px solid #c7d2fe;
      border-radius: 10px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-height: 34px;
      touch-action: manipulation;
    }
    .speak-btn:active { background: #4338ca; color: #fff; }
    .speak-btn.speak-slow {
      background: #fffbeb;
      color: #b45309;
      border-color: #fde68a;
    }
    .speak-btn.speak-slow:active { background: #b45309; color: #fff; }

    .btn-toggle {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      color: #475569;
    }

    /* Breakdown Steps */
    .step-item {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 12px 14px;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-bottom: 8px;
    }
    .step-num {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #e0e7ff;
      color: #4338ca;
      font-weight: 800;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .step-text {
      font-size: 13.5px;
      font-weight: 500;
      color: #1e293b;
      line-height: 1.5;
    }

    /* Content Boxes */
    .hint-box {
      background: #f0f9ff;
      border: 1.5px solid #bae6fd;
      border-radius: 16px;
      padding: 16px;
      font-size: 13.5px;
      color: #0369a1;
      font-weight: 500;
      line-height: 1.55;
    }
    .pitfall-box {
      background: #fff1f2;
      border: 1.5px solid #fecdd3;
      border-radius: 16px;
      padding: 16px;
      font-size: 13px;
      color: #9f1239;
      line-height: 1.55;
    }
    .solution-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      padding: 16px;
      font-size: 13px;
      color: #0f172a;
      line-height: 1.6;
      white-space: pre-wrap;
      font-family: Consolas, Monaco, monospace;
    }

    /* Parallel Exercise Box */
    .parallel-card {
      background: linear-gradient(135deg, #fffbeb 0%, #f5f3ff 100%);
      border: 1.5px solid #fde68a;
      border-radius: 20px;
      padding: 18px 16px;
      margin-bottom: 16px;
    }
    .parallel-input-box {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 10px;
    }
    @media (min-width: 540px) {
      .parallel-input-box { flex-direction: row; }
    }
    .parallel-input {
      flex: 1;
      padding: 12px 16px;
      border: 1.5px solid #cbd5e1;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 700;
      outline: none;
      background: #fff;
    }
    .parallel-input:focus { border-color: #4f46e5; }
    .btn-check-ans {
      background: #4f46e5;
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 12px 20px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      min-height: 44px;
      touch-action: manipulation;
    }
    .result-alert {
      margin-top: 10px;
      padding: 12px 14px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 700;
      display: none;
    }
    .result-alert.correct {
      display: block;
      background: #ecfdf5;
      border: 1.5px solid #6ee7b7;
      color: #065f46;
    }
    .result-alert.wrong {
      display: block;
      background: #fef2f2;
      border: 1.5px solid #fca5a5;
      color: #991b1b;
    }

    /* Fallback Math Fraction (No-JS) */
    .inline-frac {
      display: inline-flex;
      flex-direction: column;
      vertical-align: middle;
      text-align: center;
      padding: 0 4px;
      font-size: 0.9em;
      line-height: 1.1;
    }
    .frac-num {
      border-bottom: 1.5px solid currentColor;
      padding-bottom: 1px;
    }
    .frac-den {
      padding-top: 1px;
    }
    .mathjax-ready .inline-frac {
      display: inline;
    }
  </style>
</head>
<body>
  <div class="standalone-container">

    <!-- Zalo / QuickLook Hint Banner -->
    <div class="zalo-hint-banner">
      <span style="font-size: 20px; line-height: 1;">💡</span>
      <div>
        <strong>Dành cho học sinh mở trên Zalo / Điện thoại:</strong><br>
        Nếu đang xem trong Zalo hoặc trình xem trước tệp, hãy bấm nút <strong>[Chia sẻ] ↗</strong> (ở góc dưới màn hình iPhone) hoặc dấu ba chấm <strong>(⋯)</strong> và chọn <strong>"Mở bằng trình duyệt" (Safari / Chrome)</strong> để kích hoạt <strong>nghe phát âm giọng bản ngữ</strong> và <strong>chấm điểm tự động</strong>!
      </div>
    </div>

    <!-- Top Header Banner -->
    <div class="hero-banner">
      <div class="hero-tag">
        <span>🪜 Giàn Giáo Nhận Thức ZPD</span>
        <span>•</span>
        <span>${grade}</span>
      </div>
      <h1 class="hero-title">${title}</h1>
      <div class="hero-meta">
        <span>Dự án Sáng kiến Giáo dục 2026</span>
        <span>•</span>
        <span>Tác giả: <strong>${branding.teacherName || 'Huỳnh Thị Hà'}</strong></span>
      </div>
    </div>

    <!-- Voice Gender Bar -->
    <div class="voice-bar">
      <span>🗣️ <strong>Giọng đọc tiếng Anh:</strong></span>
      <div class="voice-btn-group">
        <button type="button" id="btn-voice-female" onclick="setVoiceGender('female')" class="btn-voice active">👩 Giọng Nữ (Rõ chữ)</button>
        <button type="button" id="btn-voice-male" onclick="setVoiceGender('male')" class="btn-voice">👨 Giọng Nam (Trầm ấm)</button>
      </div>
    </div>

    <!-- Target Problem Card -->
    <div class="scaffold-card">
      <div class="card-header">
        <h2 class="card-title">
          <span>🎯</span> <span>Bài Toán Mục Tiêu Cần Giải Quyết:</span>
        </h2>
        <div style="display: flex; gap: 6px;">
          <button type="button" onclick="speakText(document.getElementById('scaffold-raw-problem').innerText, 0.88)" class="speak-btn">🔊 Đọc</button>
          <button type="button" onclick="speakText(document.getElementById('scaffold-raw-problem').innerText, 0.68)" class="speak-btn speak-slow">🐢 Chậm</button>
        </div>
      </div>
      <div id="scaffold-raw-problem" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; font-weight: 600; font-size: 15px; color: #0f172a; margin-bottom: 8px;">
        ${this.formatMathForDisplay(rawInput || title)}
      </div>
      ${data.problem_analysis ? `
        <div style="font-size: 12.5px; color: #475569; border-left: 3px solid #6366f1; padding-left: 10px; line-height: 1.5;">
          <strong style="color: #312e81;">Bản chất toán học:</strong> ${this.formatMathForDisplay(data.problem_analysis)}
        </div>
      ` : ''}
    </div>

    <!-- Tier 0: Vocabulary -->
    ${vocabCards ? `
    <div class="scaffold-card">
      <div class="card-header">
        <h3 class="card-title">
          <span>🗣️</span> <span>Cầu Nối Thuật Ngữ Toán Học Song Ngữ (Vocabulary):</span>
        </h3>
      </div>
      <div class="vocab-grid">${vocabCards}</div>
    </div>
    ` : ''}

    <!-- Tier 1: Hint -->
    ${data.tier_1_hint ? `
    <div class="scaffold-card" style="background: #f0f9ff; border-color: #bae6fd;">
      <div class="card-header">
        <h3 class="card-title" style="color: #0369a1;">
          <span>💡</span> <span>Gợi Ý Nấc 1 (Tier 1 Hint - Khơi gợi tư duy):</span>
        </h3>
        <button type="button" onclick="toggleElement('tier-1-content')" class="btn-toggle">Đóng / Mở</button>
      </div>
      <div id="tier-1-content" class="hint-box">
        ${this.formatMathForDisplay(data.tier_1_hint)}
      </div>
    </div>
    ` : ''}

    <!-- Tier 2: Breakdown Steps -->
    ${breakdownItems ? `
    <div class="scaffold-card">
      <div class="card-header">
        <h3 class="card-title">
          <span>🪜</span> <span>Khung Tư Duy Nấc 2 (Tier 2 Breakdown - Chia nhỏ các bước giải):</span>
        </h3>
        <button type="button" onclick="toggleElement('tier-2-content')" class="btn-toggle">Đóng / Mở</button>
      </div>
      <div id="tier-2-content">${breakdownItems}</div>
    </div>
    ` : ''}

    <!-- Pitfalls -->
    ${data.common_pitfall ? `
    <div class="scaffold-card" style="background: #fff1f2; border-color: #fecdd3;">
      <div class="card-header">
        <h3 class="card-title" style="color: #9f1239;">
          <span>⚠️</span> <span>Cạm bẫy & Sai lầm học sinh cần tránh:</span>
        </h3>
      </div>
      <div class="pitfall-box">
        ${this.formatMathForDisplay(data.common_pitfall)}
      </div>
    </div>
    ` : ''}

    <!-- Tier 3: Full Solution -->
    ${data.full_solution ? `
    <div class="scaffold-card">
      <div class="card-header">
        <h3 class="card-title" style="color: #065f46;">
          <span>🏆</span> <span>Lời Giải Mẫu Hoàn Chỉnh (Exemplary Solution):</span>
        </h3>
        <button type="button" onclick="toggleElement('tier-3-content')" class="btn-toggle" style="background: #ecfdf5; color: #065f46; border-color: #a7f3d0;">👁️ Xem Lời Giải</button>
      </div>
      <div id="tier-3-content" class="solution-box" style="display: none;">
${this.formatMathForDisplay(data.full_solution)}
      </div>
    </div>
    ` : ''}

    <!-- Parallel Exercise with Interactive Auto-Grading -->
    ${parallel.question_vi || parallel.question_en ? `
    <div class="parallel-card">
      <div class="card-header">
        <h3 class="card-title" style="color: #78350f;">
          <span>🎯</span> <span>Bài Tập Song Song Tự Luyện (Parallel Exercise):</span>
        </h3>
        <span style="font-size: 11px; font-weight: 800; background: #fff; padding: 4px 10px; border-radius: 8px; border: 1px solid #fde68a; color: #4338ca;">Tự chấm điểm</span>
      </div>
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; margin-bottom: 10px; font-weight: 600; font-size: 14px;">
        <div>${this.formatMathForDisplay(parallel.question_vi || '')}</div>
        ${parallel.question_en ? `<div style="color: #64748b; font-style: italic; font-size: 12.5px; margin-top: 4px;">${this.formatMathForDisplay(parallel.question_en)}</div>` : ''}
      </div>
      <div class="parallel-input-box">
        <input type="text" id="parallel-user-ans" placeholder="Điền đáp số ngắn của em (ví dụ: 2, 4/3, 0)..." class="parallel-input">
        <button type="button" onclick="checkParallelAnswer()" class="btn-check-ans">Kiểm Tra Kết Quả</button>
      </div>
      <div id="parallel-result-box" class="result-alert"></div>
    </div>
    ` : ''}

  </div>

  <script>
    var currentVoiceGender = 'female';

    function setVoiceGender(g) {
      currentVoiceGender = g;
      var fb = document.getElementById('btn-voice-female');
      var mb = document.getElementById('btn-voice-male');
      if (fb && mb) {
        if (g === 'female') {
          fb.className = 'btn-voice active';
          mb.className = 'btn-voice';
        } else {
          fb.className = 'btn-voice';
          mb.className = 'btn-voice active';
        }
      }
    }

    function toggleElement(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.style.display = (el.style.display === 'none' || el.style.display === '') ? 'block' : 'none';
    }

    function speakText(text, rate) {
      if (!window.speechSynthesis || !text) return;
      window.speechSynthesis.cancel();
      var clean = text.replace(/<[^>]*>/g, ' ').replace(/[\\$]/g, '').trim();
      var u = new SpeechSynthesisUtterance(clean);
      u.lang = 'en-US';
      u.rate = rate || (currentVoiceGender === 'female' ? 0.88 : 0.85);
      u.pitch = (currentVoiceGender === 'female') ? 1.03 : 0.94;

      var voices = window.speechSynthesis.getVoices() || [];
      if (voices.length > 0) {
        var isMale = function(n) {
          var name = (n || '').toLowerCase();
          return name.includes('david') || name.includes('mark') || name.includes('george') || 
                 name.includes('guy') || name.includes('james') || name.includes('male');
        };
        var targetVoice = null;
        if (currentVoiceGender === 'male') {
          targetVoice = voices.find(function(v) { return (v.lang||'').toLowerCase().startsWith('en') && isMale(v.name); });
        } else {
          targetVoice = voices.find(function(v) { return (v.lang||'').toLowerCase().startsWith('en') && !isMale(v.name); });
        }
        if (targetVoice) u.voice = targetVoice;
      }
      window.speechSynthesis.speak(u);
    }

    var expectedAnswer = "${cleanEscapedAnswer}";
    function checkParallelAnswer() {
      var inp = document.getElementById('parallel-user-ans');
      var box = document.getElementById('parallel-result-box');
      if (!inp || !box) return;
      var val = inp.value.trim().toLowerCase().replace(/\\s+/g, '').replace(/\\$/g, '');
      var expected = expectedAnswer.trim().toLowerCase().replace(/\\s+/g, '').replace(/\\$/g, '');
      
      if (!val) {
        box.className = 'result-alert wrong';
        box.innerHTML = '⚠️ Vui lòng điền đáp số trước khi kiểm tra!';
        return;
      }

      if (val === expected) {
        box.className = 'result-alert correct';
        box.innerHTML = '🎉 <strong>Chính xác tuyệt đối!</strong> Em đã nắm vững giàn giáo nhận thức của dạng toán này!';
      } else {
        box.className = 'result-alert wrong';
        box.innerHTML = '❌ <strong>Chưa chính xác rồi.</strong> Em hãy đọc lại gợi ý Nấc 1 và các bước ở Nấc 2 để thử lại nhé!';
      }
    }
  </script>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const safeTitle = (item.titleVi || item.title || 'Gian_Giao_ZPD').replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1E00-\u1EFF]/g, '_');
    a.href = url;
    a.download = `Gian_Giao_${safeTitle}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * Generates and triggers an A4-optimized printable worksheet
   */
  printWorksheetA4(lesson, options = { includeSolutions: false, mode: 'quiz-only' }) {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Vui lòng cho phép popup để mở trang in đề thi A4!');
      return;
    }

    const { includeSolutions } = options;

    const printHtml = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Worksheet A4 - ${lesson.meta.titleEn}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 15mm 15mm 15mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: "Times New Roman", Times, serif;
      font-size: 11pt;
      line-height: 1.4;
      color: #000;
      background: #fff;
      margin: 0;
      padding: 0;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 12px;
    }
    .header-table td {
      vertical-align: top;
      padding: 4px 6px;
    }
    .school-title {
      font-size: 10pt;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
    }
    .exam-title {
      font-size: 13pt;
      font-weight: bold;
      text-transform: uppercase;
      text-align: center;
      margin-top: 4px;
    }
    .exam-subtitle {
      font-size: 10pt;
      font-style: italic;
      text-align: center;
    }
    .student-info {
      font-size: 10pt;
      margin-top: 6px;
    }
    .divider {
      border-top: 1.5px solid #000;
      margin: 8px 0 16px 0;
    }
    .section-title {
      font-size: 11pt;
      font-weight: bold;
      text-transform: uppercase;
      background: #eee;
      padding: 3px 8px;
      margin: 12px 0 8px 0;
      border-left: 4px solid #000;
    }
    .question-card {
      margin-bottom: 14px;
      page-break-inside: avoid;
    }
    .question-stem {
      font-weight: bold;
      margin-bottom: 4px;
    }
    .question-stem-vi {
      font-style: italic;
      font-size: 10pt;
      color: #333;
      margin-bottom: 6px;
    }
    .options-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px 12px;
      margin-left: 12px;
    }
    .option-item {
      font-size: 10.5pt;
    }
    .option-item.correct-key {
      font-weight: bold;
      color: #b91c1c;
      text-decoration: underline;
    }
    table.tf-table {
      width: 100%;
      border-collapse: collapse;
      margin: 6px 0;
      font-size: 10pt;
    }
    table.tf-table th, table.tf-table td {
      border: 1px solid #777;
      padding: 4px 6px;
    }
    table.tf-table th {
      background: #f3f3f3;
    }
    .solution-box {
      background: #f8f8f8;
      border-left: 3px solid #2563eb;
      padding: 6px 10px;
      margin-top: 6px;
      font-size: 9.5pt;
      page-break-inside: avoid;
    }
    .short-answer-line {
      display: inline-block;
      width: 150px;
      border-bottom: 1px dotted #000;
      margin-left: 8px;
    }
    .latex-box {
      font-family: inherit;
    }
  </style>
  <script>
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
        displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
        processEscapes: true
      },
      svg: { fontCache: 'global' },
      startup: {
        ready: () => {
          MathJax.startup.defaultReady();
          setTimeout(() => { window.print(); }, 900);
        }
      }
    };
  </script>
  <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
</head>
<body>

  <!-- Header -->
  <table class="header-table">
    <tr>
      <td style="width: 55%;">
        <div class="school-title">MATH BILINGUAL ACADEMY / PHÒNG ĐÀO TẠO</div>
        <div class="exam-title">${lesson.quiz.titleEn}</div>
        <div class="exam-subtitle">${lesson.quiz.titleVi}</div>
        <div class="student-info">
          Họ và tên học sinh (Student Name): ...................................................<br>
          Lớp (Class): ......................... &nbsp;&nbsp;&nbsp; Ngày (Date): ...........................<br>
          Thời gian làm bài: <strong>${lesson.quiz.timeMinutes || 20} phút</strong> (Không kể thời gian phát đề)
        </div>
      </td>
      <td style="width: 45%; text-align: right;">
        <div style="display: inline-block; text-align: center;">
          <table style="border: 1.5px solid #000; border-collapse: collapse; text-align: center; width: 170px;">
            <tr>
              <td style="border: 1px solid #000; padding: 3px; font-weight: bold; font-size: 9pt;">ĐIỂM (SCORE)</td>
              <td style="border: 1px solid #000; padding: 3px; font-weight: bold; font-size: 9pt;">LỜI PHÊ GIÁO VIÊN</td>
            </tr>
            <tr>
              <td style="border: 1px solid #000; height: 55px; font-size: 14pt; font-weight: bold;"></td>
              <td style="border: 1px solid #000; height: 55px;"></td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>

  <div class="divider"></div>

  <!-- Questions -->
  <div class="section-title">PHẦN I: BÀI KIỂM TRA ĐÁNH GIÁ (ASSESSMENT TEST)</div>

  ${lesson.quiz.questions.map((q, qIndex) => `
    <div class="question-card">
      <div class="question-stem">
        <strong>Câu ${qIndex + 1} (${q.points} điểm):</strong> ${q.stemEn}
      </div>
      <div class="question-stem-vi">
        <em>Dịch nghĩa: ${q.stemVi}</em>
      </div>

      ${q.type === 'multiple-choice' ? `
        <div class="options-grid">
          ${q.options.map(opt => `
            <div class="option-item ${includeSolutions && opt.isCorrect ? 'correct-key' : ''}">
              <strong>${opt.id}.</strong> ${opt.text} ${includeSolutions && opt.isCorrect ? '✓ [Đáp án]' : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${q.type === 'true-false-4' ? `
        <table class="tf-table">
          <thead>
            <tr>
              <th>Các mệnh đề (Propositions)</th>
              <th style="width: 70px; text-align: center;">Đúng</th>
              <th style="width: 70px; text-align: center;">Sai</th>
            </tr>
          </thead>
          <tbody>
            ${q.propositions.map(p => `
              <tr>
                <td>
                  <strong>${p.id})</strong> ${p.textEn}
                  <div style="font-size: 9pt; color: #444; font-style: italic;">${p.textVi}</div>
                </td>
                <td style="text-align: center; font-weight: bold;">
                  ${includeSolutions && p.isCorrect ? '✓' : ''}
                </td>
                <td style="text-align: center; font-weight: bold;">
                  ${includeSolutions && !p.isCorrect ? '✓' : ''}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : ''}

      ${q.type === 'short-answer' ? `
        <div style="margin: 6px 0; font-size: 10.5pt;">
          <strong>Đáp số của học sinh (Your answer):</strong>
          <span class="short-answer-line"></span>
          ${includeSolutions ? `<span style="color: #b91c1c; font-weight: bold; margin-left: 12px;">Đáp án đúng: ${q.correctAnswer}</span>` : ''}
        </div>
      ` : ''}

      ${includeSolutions ? `
        <div class="solution-box">
          <strong style="color: #1e40af;">[Hướng dẫn giải chi tiết]:</strong><br>
          ${q.explanationEn}<br>
          <em style="color: #555;">${q.explanationVi}</em>
        </div>
      ` : ''}
    </div>
  `).join('')}

  <div style="text-align: center; margin-top: 24px; font-style: italic; font-size: 10pt;">
    --- HẾT (END OF WORKSHEET) ---
  </div>
</body>
</html>`;

    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
  }
};

window.Exporter = Exporter;
