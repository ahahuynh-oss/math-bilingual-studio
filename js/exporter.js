/**
 * Export and Print Module for Math Bilingual Studio
 * Math Bilingual Studio
 */

const Exporter = {
  /**
   * Generates a fully standalone self-contained HTML document
   * that can run offline or online in any browser.
   */
  exportStandaloneHTML(lesson) {
    const serializedData = JSON.stringify(lesson).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');

    const htmlContent = `<!DOCTYPE html>
<html lang="vi" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${lesson.meta.titleEn} | Math Bilingual Lesson</title>
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
    body { font-family: 'Outfit', sans-serif; }
    code, .font-mono { font-family: 'JetBrains Mono', monospace; }
    .glass-card {
      background: rgba(15, 23, 42, 0.75);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    .latex-box mjx-container {
      font-size: 110% !important;
      outline: none;
    }
    @media print {
      .no-print { display: none !important; }
      body { background: white !important; color: black !important; }
      .glass-card { background: white !important; border: 1px solid #ddd !important; }
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">

  <!-- Header -->
  <header class="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 backdrop-blur-md">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 font-bold text-lg text-white">
          $\\sum$
        </div>
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">Standalone Interactive Math</span>
            <span class="text-xs text-slate-400 hidden sm:inline">• ${lesson.meta.grade || 'Toán song ngữ'}</span>
          </div>
          <h1 class="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span>${lesson.meta.titleEn}</span>
          </h1>
        </div>
      </div>

      <!-- Navigation & Mode -->
      <div class="flex items-center gap-2">
        <div class="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button id="tab-btn-lesson" onclick="switchStandaloneTab('lesson')" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all bg-indigo-600 text-white shadow">
            📖 Bài Giảng (Lesson)
          </button>
          <button id="tab-btn-quiz" onclick="switchStandaloneTab('quiz')" class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-white">
            ✍️ Kiểm Tra (Quiz)
          </button>
        </div>
        <button onclick="toggleAllVietnamese()" class="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5" title="Bật/Tắt dịch tiếng Việt">
          🇻🇳 <span id="vi-toggle-text">Dịch: Đang mở</span>
        </button>
      </div>
    </div>
  </header>

  <!-- Main Container -->
  <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">

    <!-- LESSON TAB -->
    <div id="standalone-lesson-view" class="space-y-8">
      
      <!-- Lesson Banner -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-teal-950/50 p-6 sm:p-8 border border-indigo-500/20 shadow-xl">
        <div class="relative z-10 max-w-3xl">
          <span class="px-3 py-1 rounded-md text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-3 inline-block">
            Target Duration: ${lesson.meta.duration || '45 minutes'}
          </span>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">${lesson.meta.titleEn}</h2>
          <h3 class="text-lg text-indigo-300 font-medium mb-4 vi-text">${lesson.meta.titleVi}</h3>
          <p class="text-slate-300 text-sm leading-relaxed mb-2">${lesson.meta.overviewEn}</p>
          <p class="text-slate-400 text-xs italic leading-relaxed vi-text border-l-2 border-indigo-400/40 pl-3">${lesson.meta.overviewVi}</p>
        </div>
        <div class="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-600/10 to-transparent pointer-events-none"></div>
      </div>

      <!-- VOCABULARY SECTION -->
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm">🗣️</span>
            <span>Key Mathematical Vocabulary (Từ vựng trọng tâm)</span>
          </h3>
          <span class="text-xs text-slate-400">Click 🔊 to hear pronunciation</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="vocab-grid">
          ${lesson.vocabulary.map((v, i) => `
            <div class="glass-card p-4 rounded-xl hover:border-indigo-500/40 transition-all flex flex-col justify-between group">
              <div>
                <div class="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h4 class="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">${v.term}</h4>
                    <div class="flex items-center gap-2 text-xs text-slate-400">
                      <span class="font-mono text-teal-400">${v.ipa || ''}</span>
                      <span class="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">${v.pos || 'term'}</span>
                    </div>
                  </div>
                  <button onclick="speakTerm('${v.term}')" class="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white transition-all text-xs" title="Listen pronunciation">
                    🔊
                  </button>
                </div>
                <p class="text-sm font-medium text-emerald-400 vi-text mb-2.5">
                  👉 ${v.meaningVi}
                </p>
                <div class="text-xs bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 text-slate-300">
                  <div class="latex-box mb-1">${v.exampleEn}</div>
                  <div class="text-slate-400 italic vi-text text-[11px]">${v.exampleVi}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- CONCEPTS & THEOREMS SECTION -->
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm">📐</span>
            <span>Concepts & Theorems (Khái niệm & Định lý)</span>
          </h3>
        </div>

        <div class="space-y-4">
          ${lesson.concepts.map((c, i) => `
            <div class="glass-card p-5 sm:p-6 rounded-2xl border-l-4 border-l-indigo-500">
              <div class="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                <h4 class="text-base sm:text-lg font-bold text-white">
                  ${i+1}. ${c.titleEn}
                </h4>
                <span class="text-sm font-medium text-indigo-300 vi-text">(${c.titleVi})</span>
              </div>
              
              <!-- Formula Box -->
              <div class="bg-slate-900/90 p-4 rounded-xl border border-indigo-500/20 text-center my-3 overflow-x-auto latex-box">
                $$${c.latex}$$
              </div>

              <div class="space-y-2 mt-4 text-sm text-slate-300">
                <p class="leading-relaxed"><strong class="text-slate-100">En:</strong> ${c.descEn}</p>
                <p class="leading-relaxed text-slate-400 vi-text border-l-2 border-indigo-500/30 pl-3"><strong class="text-indigo-300">Vi:</strong> ${c.descVi}</p>
                ${c.notesEn ? `
                  <div class="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200">
                    <div>💡 <strong>Note:</strong> ${c.notesEn}</div>
                    <div class="vi-text mt-1 text-amber-300/80">👉 ${c.notesVi}</div>
                  </div>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- WORKED EXAMPLES SECTION (With Step Reveal) -->
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-sm">💡</span>
            <span>Worked Examples (Ví dụ Mẫu & Hướng dẫn Giải)</span>
          </h3>
        </div>

        <div class="space-y-6">
          ${lesson.examples.map((ex, exIdx) => `
            <div class="glass-card p-5 sm:p-6 rounded-2xl">
              <div class="mb-4">
                <span class="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 text-xs font-semibold">Example ${exIdx+1}</span>
                <h4 class="text-base sm:text-lg font-bold text-white mt-1">${ex.titleEn} <span class="vi-text font-normal text-slate-400 text-sm">(${ex.titleVi})</span></h4>
                <div class="mt-3 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 leading-relaxed">
                  <div class="latex-box">${ex.problemEn}</div>
                  <div class="vi-text text-slate-400 text-xs italic mt-2 border-t border-slate-800 pt-2">${ex.problemVi}</div>
                </div>
              </div>

              <!-- Step-by-step Interactive Reveal -->
              <div class="space-y-3 mt-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold uppercase text-slate-400 tracking-wider">Step-by-step Solution</span>
                  <button onclick="revealAllSteps('${ex.id}')" class="text-xs text-indigo-400 hover:text-indigo-300 underline">
                    Mở tất cả các bước (Show all)
                  </button>
                </div>
                ${ex.steps.map((st, stIdx) => `
                  <div id="step-${ex.id}-${st.stepNum}" class="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all">
                    <button onclick="toggleStep('${ex.id}', ${st.stepNum})" class="w-full text-left p-3.5 flex items-center justify-between hover:bg-slate-800/40 transition-colors">
                      <span class="font-semibold text-xs sm:text-sm text-indigo-300 flex items-center gap-2">
                        <span class="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">${st.stepNum}</span>
                        ${st.titleEn} <span class="vi-text text-slate-400 text-xs font-normal">(${st.titleVi})</span>
                      </span>
                      <span id="step-icon-${ex.id}-${st.stepNum}" class="text-xs text-slate-400">➕ Mở bước này</span>
                    </button>
                    <div id="step-content-${ex.id}-${st.stepNum}" class="p-4 pt-1 border-t border-slate-800 hidden bg-slate-950/40 text-sm">
                      <div class="p-3 bg-slate-900 rounded-lg my-2 border border-slate-800/80 text-center latex-box">
                        $$${st.latex}$$
                      </div>
                      <p class="text-xs sm:text-sm text-slate-300">${st.explanationEn}</p>
                      <p class="text-xs text-slate-400 italic vi-text mt-1">${st.explanationVi}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- VISUALIZER / GEOGEBRA EMBED -->
      ${lesson.visualizer ? `
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 class="text-lg font-bold text-white flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">📈</span>
            <span>Interactive Math Visualizer & Grapher</span>
          </h3>
          <span class="text-xs text-cyan-400 font-mono">${lesson.visualizer.formulaDisplay || 'Graph Analysis'}</span>
        </div>

        <div class="glass-card p-4 sm:p-6 rounded-2xl">
          <div class="w-full h-96 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative flex items-center justify-center">
            ${lesson.visualizer.geogebraId ? `
              <iframe 
                src="https://www.geogebra.org/material/iframe/id/${lesson.visualizer.geogebraId}/width/800/height/400/border/888888/sfsb/true/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/true/rc/false/ld/false/sdz/true/ctl/false" 
                class="w-full h-full border-0" 
                title="GeoGebra Interactive Applet">
              </iframe>
            ` : `
              <div class="text-center p-6 text-slate-400">
                <p class="font-medium text-white mb-1">Visualizer Preview</p>
                <p class="text-xs">Formula: ${lesson.visualizer.formulaDisplay || 'y = f(x)'}</p>
              </div>
            `}
          </div>
        </div>
      </section>
      ` : ''}

    </div>

    <!-- QUIZ TAB -->
    <div id="standalone-quiz-view" class="space-y-6 hidden">
      
      <!-- Quiz Header / Status Card -->
      <div class="glass-card p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 border-indigo-500/30">
        <div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-400">Interactive Quiz</span>
          <h2 class="text-xl sm:text-2xl font-bold text-white mt-1">${lesson.quiz.titleEn}</h2>
          <h3 class="text-sm text-indigo-300 vi-text">${lesson.quiz.titleVi}</h3>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-right">
            <span class="text-xs text-slate-400 block">Total Questions</span>
            <span class="text-lg font-bold text-white">${lesson.quiz.questions.length} Items</span>
          </div>
          <button id="btn-submit-standalone-quiz" onclick="gradeStandaloneQuiz()" class="px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all flex items-center gap-2">
            <span>✅ Nộp Bài & Chấm Điểm</span>
          </button>
        </div>
      </div>

      <!-- Quiz Questions Container -->
      <div class="space-y-6" id="standalone-questions-container">
        <!-- Rendered via Javascript for full reactivity -->
      </div>

      <!-- Result Banner (Hidden initially) -->
      <div id="standalone-quiz-result" class="hidden glass-card p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/50 bg-gradient-to-b from-slate-900 to-emerald-950/30 text-center space-y-4">
        <div class="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl font-bold shadow-lg shadow-emerald-500/20">
          🏆
        </div>
        <h3 class="text-2xl font-black text-white">Kết Quả Bài Kiểm Tra (Quiz Result)</h3>
        <div class="flex justify-center items-baseline gap-2">
          <span id="result-score-num" class="text-5xl font-black text-emerald-400">0.0</span>
          <span class="text-xl text-slate-400 font-semibold">/ 10.0</span>
        </div>
        <p id="result-feedback" class="text-sm font-medium text-slate-300 max-w-md mx-auto"></p>
        <button onclick="resetStandaloneQuiz()" class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all">
          🔄 Làm lại bài kiểm tra
        </button>
      </div>

    </div>

  </main>

  <footer class="mt-auto border-t border-slate-900 py-6 text-center text-xs text-slate-500 bg-slate-950">
    Được tạo tự động bởi <strong>Math Bilingual Studio</strong> • Hoạt động độc lập & Hỗ trợ học trực tuyến/offline.
  </footer>

  <!-- Embedded JS Logic -->
  <script>
    const LESSON_DATA = ${serializedData};
    let showVi = true;

    function switchStandaloneTab(tab) {
      const lessonView = document.getElementById('standalone-lesson-view');
      const quizView = document.getElementById('standalone-quiz-view');
      const btnLesson = document.getElementById('tab-btn-lesson');
      const btnQuiz = document.getElementById('tab-btn-quiz');

      if (tab === 'lesson') {
        lessonView.classList.remove('hidden');
        quizView.classList.add('hidden');
        btnLesson.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all bg-indigo-600 text-white shadow';
        btnQuiz.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-white';
      } else {
        lessonView.classList.add('hidden');
        quizView.classList.remove('hidden');
        btnQuiz.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all bg-indigo-600 text-white shadow';
        btnLesson.className = 'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all text-slate-400 hover:text-white';
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
      document.getElementById('vi-toggle-text').innerText = showVi ? 'Dịch: Đang mở' : 'Dịch: Đang ẩn';
    }

    function speakTerm(term) {
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
      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        icon.innerText = '➖ Ẩn bước';
        triggerMathJax();
      } else {
        content.classList.add('hidden');
        icon.innerText = '➕ Mở bước này';
      }
    }

    function revealAllSteps(exId) {
      const contents = document.querySelectorAll('[id^="step-content-' + exId + '"]');
      const icons = document.querySelectorAll('[id^="step-icon-' + exId + '"]');
      contents.forEach(c => c.classList.remove('hidden'));
      icons.forEach(i => i.innerText = '➖ Ẩn bước');
      triggerMathJax();
    }

    function triggerMathJax() {
      if (window.MathJax && window.MathJax.typesetPromise) {
        window.MathJax.typesetPromise().catch(err => console.log('MathJax error: ', err));
      }
    }

    // Render Quiz Questions
    function renderStandaloneQuestions() {
      const container = document.getElementById('standalone-questions-container');
      if (container.children.length > 0) return; // already rendered

      const questions = LESSON_DATA.quiz.questions;
      let html = '';

      questions.forEach((q, index) => {
        html += '<div id="q-card-' + q.id + '" class="glass-card p-5 sm:p-6 rounded-2xl border border-slate-800 transition-all">';
        html += '<div class="flex items-start justify-between gap-3 mb-3">';
        html += '<div>';
        html += '<span class="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-400">Question ' + (index+1) + '</span>';
        html += '<span class="text-xs text-slate-500 ml-2">[' + q.points + ' pts]</span>';
        html += '</div>';
        html += '<span class="text-xs text-slate-400 font-medium capitalize">' + q.type.replace('-', ' ') + '</span>';
        html += '</div>';

        // Question stem
        html += '<div class="text-sm sm:text-base font-semibold text-slate-100 mb-2 latex-box">' + q.stemEn + '</div>';
        if (q.stemVi) {
          html += '<div class="text-xs text-slate-400 italic mb-4 vi-text border-l-2 border-indigo-500/30 pl-2.5">' + q.stemVi + '</div>';
        }

        // Options rendering based on type
        if (q.type === 'multiple-choice') {
          html += '<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">';
          q.options.forEach(opt => {
            html += '<label class="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-indigo-500/50 cursor-pointer transition-all">';
            html += '<input type="radio" name="ans-' + q.id + '" value="' + opt.id + '" class="w-4 h-4 text-indigo-600 focus:ring-0">';
            html += '<span class="font-bold text-xs px-2 py-1 rounded bg-slate-800 text-slate-300">' + opt.id + '</span>';
            html += '<span class="text-sm text-slate-200 latex-box">' + opt.text + '</span>';
            html += '</label>';
          });
          html += '</div>';
        } else if (q.type === 'true-false-4') {
          html += '<div class="space-y-2.5 my-3 overflow-x-auto">';
          html += '<table class="w-full text-left text-xs sm:text-sm">';
          html += '<thead class="text-slate-400 uppercase text-[10px] border-b border-slate-800"><tr><th class="py-2">Mệnh đề (Proposition)</th><th class="text-center py-2 w-20">Đúng (T)</th><th class="text-center py-2 w-20">Sai (F)</th></tr></thead>';
          html += '<tbody class="divide-y divide-slate-800/60">';
          q.propositions.forEach(prop => {
            html += '<tr>';
            html += '<td class="py-2.5 pr-2">';
            html += '<span class="font-bold text-indigo-400 mr-1.5">' + prop.id + ')</span>';
            html += '<span class="text-slate-200 latex-box">' + prop.textEn + '</span>';
            if (prop.textVi) html += '<div class="text-[11px] text-slate-400 italic vi-text mt-0.5">' + prop.textVi + '</div>';
            html += '</td>';
            html += '<td class="text-center py-2.5"><input type="radio" name="tf-' + q.id + '-' + prop.id + '" value="true" class="w-4 h-4 text-emerald-500"></td>';
            html += '<td class="text-center py-2.5"><input type="radio" name="tf-' + q.id + '-' + prop.id + '" value="false" class="w-4 h-4 text-rose-500"></td>';
            html += '</tr>';
          });
          html += '</tbody></table></div>';
        } else if (q.type === 'short-answer') {
          html += '<div class="my-4 max-w-sm">';
          html += '<label class="block text-xs text-slate-400 mb-1.5 font-medium">Nhập đáp số (số thực / phân số):</label>';
          html += '<input type="text" id="short-input-' + q.id + '" placeholder="Ví dụ: 3 hoặc 0.75..." class="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-indigo-500 focus:outline-none">';
          html += '</div>';
        }

        // Solution box (hidden until graded)
        html += '<div id="solution-' + q.id + '" class="hidden mt-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 space-y-1.5">';
        html += '<div class="font-bold text-indigo-400">💡 Giải thích chi tiết:</div>';
        html += '<div class="latex-box">' + (q.explanationEn || '') + '</div>';
        if (q.explanationVi) html += '<div class="text-slate-400 vi-text italic">' + q.explanationVi + '</div>';
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
            card.classList.add('border-emerald-500/80', 'bg-emerald-950/10');
          } else {
            card.classList.add('border-rose-500/80', 'bg-rose-950/10');
          }
        } else if (q.type === 'true-false-4') {
          let correctCount = 0;
          q.propositions.forEach(prop => {
            const chosen = document.querySelector('input[name="tf-' + q.id + '-' + prop.id + '"]:checked');
            if (chosen && ((chosen.value === 'true') === prop.isCorrect)) {
              correctCount++;
            }
          });
          // Official Ministry Scoring Scale for 4 sub-questions:
          // 1 correct = 10%, 2 correct = 25%, 3 correct = 50%, 4 correct = 100% of points
          let multiplier = 0;
          if (correctCount === 1) multiplier = 0.1;
          else if (correctCount === 2) multiplier = 0.25;
          else if (correctCount === 3) multiplier = 0.5;
          else if (correctCount === 4) multiplier = 1.0;
          
          earnedPoints += q.points * multiplier;
          if (correctCount === 4) {
            card.classList.add('border-emerald-500/80', 'bg-emerald-950/10');
          } else if (correctCount >= 2) {
            card.classList.add('border-amber-500/80', 'bg-amber-950/10');
          } else {
            card.classList.add('border-rose-500/80', 'bg-rose-950/10');
          }
        } else if (q.type === 'short-answer') {
          const input = document.getElementById('short-input-' + q.id);
          const val = input ? input.value.trim().toLowerCase() : '';
          const correct = String(q.correctAnswer).trim().toLowerCase();
          const acceptable = (q.acceptableAnswers || []).map(a => String(a).trim().toLowerCase());
          
          let isRight = (val === correct) || acceptable.includes(val);
          // Numerical tolerance check
          if (!isRight && !isNaN(parseFloat(val)) && !isNaN(parseFloat(correct))) {
            const tol = q.tolerance || 0.01;
            if (Math.abs(parseFloat(val) - parseFloat(correct)) <= tol) {
              isRight = true;
            }
          }

          if (isRight) {
            earnedPoints += q.points;
            card.classList.add('border-emerald-500/80', 'bg-emerald-950/10');
          } else {
            card.classList.add('border-rose-500/80', 'bg-rose-950/10');
          }
        }
      });

      // Calculate final score scaled to 10
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
    .score-box {
      border: 1.5px solid #000;
      width: 120px;
      height: 65px;
      text-align: center;
      font-size: 9pt;
      padding: 4px;
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
