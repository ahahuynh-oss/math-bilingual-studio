/**
 * Export and Print Module for Math Bilingual Studio
 * Hỗ trợ xuất Standalone HTML offline (kèm Scaffolding Tutor), in A4, và xuất Word (.doc/.docx)
 */

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
</head>
<body class="bg-slate-50 text-slate-900 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">

  <!-- Header -->
  <header class="border-b border-slate-200 bg-white sticky top-0 z-50 shadow-2xs">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-400 flex items-center justify-center shadow-xs font-bold text-lg text-white">
          🎓
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Math Bilingual Studio (Offline Standalone)</span>
            <span class="text-xs text-slate-500 hidden sm:inline">• ${lesson.meta.grade || 'Toán song ngữ THPT'}</span>
          </div>
          <h1 class="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>${lesson.meta.titleEn}</span>
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
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">${lesson.meta.titleEn}</h2>
          <h3 class="text-base sm:text-lg text-indigo-700 font-semibold mb-4 vi-text">${lesson.meta.titleVi}</h3>
          <p class="text-slate-800 text-sm leading-relaxed mb-2">${lesson.meta.overviewEn}</p>
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
          </h3>
          <span class="text-xs text-slate-500">Click 🔊 để nghe phát âm chuẩn bản xứ</span>
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
                  <button type="button" onclick="speakTerm(this)" data-term="${(v.term || '').replace(/"/g, '&quot;')}" class="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white transition-all text-xs border border-indigo-200 cursor-pointer" title="Listen pronunciation">
                    🔊
                  </button>
                </div>
                <p class="text-sm font-semibold text-emerald-700 vi-text mb-2.5">
                  👉 ${v.meaningVi}
                </p>
                <div class="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-slate-800">
                  <div class="latex-box mb-1">${v.exampleEn}</div>
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
          </h3>
        </div>

        <div class="space-y-4">
          ${lesson.concepts.map((c, i) => `
            <div class="glass-card p-5 sm:p-6 rounded-2xl border-l-4 border-l-indigo-600 border-slate-200 bg-white shadow-xs space-y-3">
              <div class="flex items-center justify-between">
                <h4 class="text-base font-bold text-slate-900">${i + 1}. ${c.titleEn || ''}</h4>
                <span class="text-xs text-indigo-700 vi-text font-semibold">${c.titleVi || ''}</span>
              </div>
              <div class="text-sm text-slate-800 leading-relaxed">${c.descEn || c.contentEn || ''}</div>
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
                <p class="text-sm sm:text-base font-semibold text-slate-900 mb-1.5 latex-box">${ex.problemEn || ex.titleEn || ''}</p>
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
                      <span class="flex items-center gap-2 flex-1 pr-2">
                        <span class="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center text-[11px] font-bold border border-indigo-200 shrink-0">${stepIndex}</span>
                        <span>Step ${stepIndex}: ${stepTitleEn}</span>
                        ${stepTitleVi ? `<span class="text-slate-500 italic vi-text text-xs font-normal">(${stepTitleVi})</span>` : ''}
                      </span>
                      <span id="step-icon-${exampleId}-${stepIndex}" class="text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1 rounded-lg font-bold shrink-0 transition-all shadow-2xs">➕ Mở bước này</span>
                    </div>
                    <div id="step-content-${exampleId}-${stepIndex}" class="hidden p-4 pt-2 border-t border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2 bg-slate-50">
                      ${stepLatex ? `<div class="p-3 bg-white rounded-lg border border-slate-200 font-mono text-center latex-box overflow-x-auto text-slate-900">$$${stepLatex}$$</div>` : ''}
                      ${st.explanationEn ? `<div class="text-slate-800">${st.explanationEn}</div>` : ''}
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
              <h2 class="text-xl sm:text-2xl font-black text-slate-900">Bilingual Math Scaffolding Tutor</h2>
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
          <span id="scaffold-grade-badge" class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300">Khối 12</span>
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
          <h2 class="text-xl sm:text-2xl font-black text-slate-900">${lesson.quiz.titleEn}</h2>
          <h3 class="text-sm font-semibold text-slate-700 vi-text mt-0.5">${lesson.quiz.titleVi}</h3>
          <p class="text-xs text-slate-600 mt-2">
            Thời gian: <strong>${lesson.quiz.timeMinutes || 20} phút</strong> • Tổng số câu: <strong>${lesson.quiz.questions.length}</strong>
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

    function speakTerm(elOrTerm) {
      const term = (typeof elOrTerm === 'string') ? elOrTerm : (elOrTerm ? elOrTerm.getAttribute('data-term') : '');
      if (!term) return;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(term);
        utter.lang = 'en-US';
        utter.rate = 0.9;
        window.speechSynthesis.speak(utter);
      } else {
        alert('Trình duyệt của bạn chưa hỗ trợ Web Speech API.');
      }
    }

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
          html += '<div class="flex items-center justify-between">';
          html += '<span class="font-bold text-slate-900 text-sm">' + (v.english_term || '') + '</span>';
          html += '<button type="button" onclick="speakTerm(this)" data-term="' + engSafe + '" class="text-xs p-1 px-2 rounded bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white border border-indigo-200 transition-all cursor-pointer" title="Listen pronunciation">🔊</button>';
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
      html += '</div>';
      html += '<span class="text-xs text-indigo-700 font-bold">' + (scaffoldTiers.analysis ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.analysis) {
        html += '<div class="p-4 bg-white text-xs sm:text-sm text-slate-800 leading-relaxed latex-box">' + d.problem_analysis + '</div>';
      }
      html += '</div>';

      // 3. Tier 1 Hint Card
      html += '<div class="glass-card rounded-2xl border border-amber-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="tier1" class="p-4 bg-amber-50/70 border-b border-amber-100 flex items-center justify-between cursor-pointer hover:bg-amber-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-amber-700 font-bold text-base">💡</span>';
      html += '<span class="font-bold text-sm text-slate-900">3. Giàn giáo Nấc 1: Câu hỏi gợi mở định hướng tư duy (Tier 1 Hint)</span>';
      html += '</div>';
      html += '<span class="text-xs text-amber-700 font-bold">' + (scaffoldTiers.tier1 ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.tier1) {
        html += '<div class="p-4 bg-amber-50/50 text-xs sm:text-sm text-slate-900 leading-relaxed latex-box border-l-4 border-amber-400">' + d.tier_1_hint + '</div>';
      }
      html += '</div>';

      // 4. Tier 2 Breakdown Card
      html += '<div class="glass-card rounded-2xl border border-blue-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="tier2" class="p-4 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between cursor-pointer hover:bg-blue-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-blue-700 font-bold text-base">🪜</span>';
      html += '<span class="font-bold text-sm text-slate-900">4. Giàn giáo Nấc 2: Khung tư duy chia nhỏ các bước (Tier 2 Breakdown)</span>';
      html += '</div>';
      html += '<span class="text-xs text-blue-700 font-bold">' + (scaffoldTiers.tier2 ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.tier2) {
        html += '<div class="p-4 bg-white space-y-2">';
        (d.tier_2_breakdown || []).forEach((st, idx) => {
          html += '<div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 latex-box flex items-start gap-2.5">';
          html += '<span class="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">' + (idx+1) + '</span>';
          html += '<span>' + st + '</span>';
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
      html += '</div>';
      html += '<span class="text-xs text-rose-700 font-bold">' + (scaffoldTiers.pitfall ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.pitfall) {
        html += '<div class="p-4 bg-rose-50/50 text-xs sm:text-sm text-slate-900 leading-relaxed latex-box border-l-4 border-rose-400">' + d.common_pitfall + '</div>';
      }
      html += '</div>';

      // 6. Full Solution Card
      html += '<div class="glass-card rounded-2xl border border-emerald-200 bg-white overflow-hidden shadow-xs">';
      html += '<div onclick="toggleScaffoldSection(this)" data-sec="tier3" class="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between cursor-pointer hover:bg-emerald-100/50 transition-colors">';
      html += '<div class="flex items-center gap-2">';
      html += '<span class="text-emerald-700 font-bold text-base">📝</span>';
      html += '<span class="font-bold text-sm text-slate-900">6. Lời giải mẫu hoàn chỉnh từng bước (Full Solution)</span>';
      html += '</div>';
      html += '<span class="text-xs text-emerald-700 font-bold">' + (scaffoldTiers.tier3 ? '▲ Thu gọn' : '▼ Mở rộng') + '</span>';
      html += '</div>';
      if (scaffoldTiers.tier3) {
        const solFormatted = (d.full_solution || '').replace(/\\n/g, '<br>');
        html += '<div class="p-5 bg-white text-xs sm:text-sm text-slate-900 leading-relaxed latex-box">' + solFormatted + '</div>';
      }
      html += '</div>';

      // 7. Parallel Exercise
      if (d.parallel_exercise) {
        html += '<div class="glass-card rounded-2xl border border-teal-200 p-5 space-y-3 bg-gradient-to-r from-teal-50/60 via-white to-indigo-50/40 shadow-xs">';
        html += '<div class="flex items-center gap-2">';
        html += '<span class="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-sm border border-teal-200">🎯</span>';
        html += '<span class="font-bold text-sm text-slate-900">7. Bài tập tương tự tự rèn luyện (Parallel Exercise)</span>';
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
        html += '<div class="text-sm sm:text-base font-semibold text-slate-900 mb-2 latex-box">' + q.stemEn + '</div>';
        if (q.stemVi) {
          html += '<div class="text-xs text-slate-600 italic mb-4 vi-text border-l-2 border-indigo-300 pl-2.5">' + q.stemVi + '</div>';
        }

        // Options rendering based on type
        if (q.type === 'multiple-choice') {
          html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">';
          q.options.forEach(opt => {
            html += '<label class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-indigo-400 cursor-pointer transition-all shadow-xs">';
            html += '<input type="radio" name="ans-' + q.id + '" value="' + opt.id + '" class="w-4 h-4 text-indigo-600 focus:ring-0">';
            html += '<span class="font-bold text-xs px-2 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">' + opt.id + '</span>';
            html += '<span class="text-sm text-slate-900 latex-box">' + opt.text + '</span>';
            html += '</label>';
          });
          html += '</div>';
        } else if (q.type === 'true-false-4') {
          html += '<div class="space-y-2.5 my-3 overflow-x-auto">';
          html += '<table class="w-full text-left text-xs sm:text-sm">';
          html += '<thead class="text-slate-600 uppercase text-[10px] border-b border-slate-200 bg-slate-50"><tr><th class="py-2 px-3">Mệnh đề (Proposition)</th><th class="text-center py-2 w-20">Đúng (T)</th><th class="text-center py-2 w-20">Sai (F)</th></tr></thead>';
          html += '<tbody class="divide-y divide-slate-200">';
          q.propositions.forEach(prop => {
            html += '<tr>';
            html += '<td class="py-2.5 pr-2 px-3">';
            html += '<span class="font-bold text-indigo-700 mr-1.5">' + prop.id + ')</span>';
            html += '<span class="text-slate-900 latex-box">' + prop.textEn + '</span>';
            if (prop.textVi) html += '<div class="text-[11px] text-slate-600 italic vi-text mt-0.5">' + prop.textVi + '</div>';
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
        html += '<div id="solution-' + q.id + '" class="hidden mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-1.5">';
        html += '<div class="font-bold text-indigo-700">💡 Giải thích chi tiết:</div>';
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
      let qHtml = `
        <div style="margin-bottom: 16pt; page-break-inside: avoid;">
          <div style="font-weight: bold; margin-bottom: 3pt;">
            Câu ${qIndex + 1} (${q.points} điểm): ${this.formatMathForWord(q.stemEn)}
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
    
    <!-- Top Exam Header Table -->
    <table style="width: 100%; margin-bottom: 12pt;">
      <tr>
        <td style="width: 60%; vertical-align: top;">
          <div style="font-size: 11pt; font-weight: bold; text-transform: uppercase;">MATH BILINGUAL ACADEMY / PHÒNG ĐÀO TẠO</div>
          <div style="font-size: 13.5pt; font-weight: bold; text-transform: uppercase; margin-top: 3pt;">${lesson.quiz.titleEn}</div>
          <div style="font-size: 11pt; font-style: italic;">${lesson.quiz.titleVi}</div>
          <div style="font-size: 11pt; margin-top: 8pt; line-height: 1.5;">
            Họ và tên học sinh (Student Name): ....................................................<br>
            Lớp (Class): ......................... &nbsp;&nbsp;&nbsp; Ngày (Date): ............................<br>
            Thời gian làm bài: <strong>${lesson.quiz.timeMinutes || 20} phút</strong> (Không kể thời gian phát đề)
          </div>
        </td>
        <td style="width: 40%; vertical-align: top; text-align: right;">
          <div style="display: inline-block; text-align: center;">
            <table style="border: 1.5px solid #000; width: 180px; text-align: center;">
              <tr>
                <td style="border: 1px solid #000; padding: 4px; font-weight: bold; font-size: 9.5pt;">ĐIỂM (SCORE)</td>
                <td style="border: 1px solid #000; padding: 4px; font-weight: bold; font-size: 9.5pt;">LỜI PHÊ GIÁO VIÊN</td>
              </tr>
              <tr>
                <td style="border: 1px solid #000; height: 60px;"></td>
                <td style="border: 1px solid #000; height: 60px;"></td>
              </tr>
            </table>
          </div>
        </td>
      </tr>
    </table>

    <div style="border-top: 1.5px solid #000; margin: 8pt 0 14pt 0;"></div>

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
