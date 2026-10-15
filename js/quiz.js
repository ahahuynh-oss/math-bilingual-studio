/**
 * Interactive Quiz & Assessment Engine
 * Math Bilingual Studio
 */

const QuizEngine = {
  currentQuiz: null,
  userAnswers: {},
  timerInterval: null,
  timeLeftSeconds: 0,
  isSubmitted: false,
  isTeacherMode: false,

  init(quizData, isTeacher = false) {
    this.currentQuiz = JSON.parse(JSON.stringify(quizData));
    this.userAnswers = {};
    this.isSubmitted = false;
    this.isTeacherMode = isTeacher;
    this.timeLeftSeconds = (this.currentQuiz.timeMinutes || 20) * 60;
    
    // Stop any running timer
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }

    if (!isTeacher) {
      this.startTimer();
    }
    this.render();
  },

  startTimer() {
    this.updateTimerDisplay();
    this.timerInterval = setInterval(() => {
      if (this.timeLeftSeconds > 0) {
        this.timeLeftSeconds--;
        this.updateTimerDisplay();
      } else {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        alert('Hết giờ làm bài! Hệ thống sẽ tự động nộp bài và chấm điểm.');
        this.submit();
      }
    }, 1000);
  },

  updateTimerDisplay() {
    const el = document.getElementById('quiz-timer-display');
    if (!el) return;
    const mins = Math.floor(this.timeLeftSeconds / 60);
    const secs = this.timeLeftSeconds % 60;
    el.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (this.timeLeftSeconds < 180) {
      el.classList.add('text-rose-400');
    } else {
      el.classList.remove('text-rose-400');
    }
  },

  setMultipleChoice(qId, optId) {
    if (this.isSubmitted) return;
    this.userAnswers[qId] = optId;
    this.renderPalette();
  },

  setTrueFalse(qId, propId, val) {
    if (this.isSubmitted) return;
    if (!this.userAnswers[qId]) {
      this.userAnswers[qId] = {};
    }
    this.userAnswers[qId][propId] = val;
    this.renderPalette();
  },

  setShortAnswer(qId, val) {
    if (this.isSubmitted) return;
    this.userAnswers[qId] = val.trim();
    this.renderPalette();
  },

  isQuestionAnswered(q) {
    const ans = this.userAnswers[q.id];
    if (q.type === 'multiple-choice') {
      return !!ans;
    } else if (q.type === 'true-false-4') {
      if (!ans) return false;
      // All 4 propositions should be answered
      return q.propositions.every(p => ans[p.id] !== undefined);
    } else if (q.type === 'short-answer') {
      return typeof ans === 'string' && ans.length > 0;
    }
    return false;
  },

  renderPalette() {
    const palette = document.getElementById('quiz-palette-container');
    if (!palette || !this.currentQuiz) return;

    let answeredCount = 0;
    const questions = this.currentQuiz.questions || [];

    palette.innerHTML = questions.map((q, idx) => {
      const isAns = this.isQuestionAnswered(q);
      if (isAns) answeredCount++;

      let badgeClass = 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500';
      if (this.isSubmitted) {
        // Show pass/fail color in palette after submission
        const result = this.evalQuestion(q);
        if (result.scorePercent === 1) {
          badgeClass = 'bg-emerald-600/30 text-emerald-400 border border-emerald-500 font-bold';
        } else if (result.scorePercent > 0) {
          badgeClass = 'bg-amber-600/30 text-amber-400 border border-amber-500 font-bold';
        } else {
          badgeClass = 'bg-rose-600/30 text-rose-400 border border-rose-500 font-bold';
        }
      } else if (isAns) {
        badgeClass = 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/20';
      }

      return `
        <button onclick="QuizEngine.scrollToQuestion('${q.id}')" class="w-9 h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${badgeClass}">
          ${idx + 1}
        </button>
      `;
    }).join('');

    const progressEl = document.getElementById('quiz-progress-text');
    const progressBar = document.getElementById('quiz-progress-bar');
    if (progressEl) {
      progressEl.innerText = `${answeredCount}/${questions.length} câu`;
    }
    if (progressBar && questions.length > 0) {
      const pct = Math.round((answeredCount / questions.length) * 100);
      progressBar.style.width = `${pct}%`;
    }
  },

  scrollToQuestion(qId) {
    const el = document.getElementById(`interactive-q-${qId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-indigo-500');
      setTimeout(() => el.classList.remove('ring-2', 'ring-indigo-500'), 1500);
    }
  },

  evalQuestion(q) {
    const userAns = this.userAnswers[q.id];
    let earned = 0;
    let details = {};

    if (q.type === 'multiple-choice') {
      const correctOpt = q.options.find(o => o.isCorrect);
      const isRight = userAns === (correctOpt ? correctOpt.id : null);
      earned = isRight ? q.points : 0;
      return {
        earned,
        maxPoints: q.points,
        scorePercent: isRight ? 1 : 0,
        isRight
      };
    } else if (q.type === 'true-false-4') {
      let correctProps = 0;
      const ansObj = userAns || {};
      q.propositions.forEach(p => {
        const chosen = ansObj[p.id];
        if (chosen !== undefined && chosen === p.isCorrect) {
          correctProps++;
        }
      });
      // Official National THPT scoring formula:
      // 1 ý đúng: 10% điểm câu
      // 2 ý đúng: 25% điểm câu
      // 3 ý đúng: 50% điểm câu
      // 4 ý đúng: 100% điểm câu
      let multiplier = 0;
      if (correctProps === 1) multiplier = 0.1;
      else if (correctProps === 2) multiplier = 0.25;
      else if (correctProps === 3) multiplier = 0.5;
      else if (correctProps === 4) multiplier = 1.0;

      earned = q.points * multiplier;
      return {
        earned,
        maxPoints: q.points,
        scorePercent: multiplier,
        correctProps,
        totalProps: q.propositions.length
      };
    } else if (q.type === 'short-answer') {
      const inputStr = String(userAns || '').trim().toLowerCase();
      const targetStr = String(q.correctAnswer || '').trim().toLowerCase();
      const alternates = (q.acceptableAnswers || []).map(a => String(a).trim().toLowerCase());
      
      let isRight = (inputStr === targetStr) || alternates.includes(inputStr);
      if (!isRight && !isNaN(parseFloat(inputStr)) && !isNaN(parseFloat(targetStr))) {
        const tol = q.tolerance || 0.01;
        if (Math.abs(parseFloat(inputStr) - parseFloat(targetStr)) <= tol) {
          isRight = true;
        }
      }

      earned = isRight ? q.points : 0;
      return {
        earned,
        maxPoints: q.points,
        scorePercent: isRight ? 1 : 0,
        isRight
      };
    }

    return { earned: 0, maxPoints: q.points, scorePercent: 0 };
  },

  submit() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.isSubmitted = true;

    let totalEarned = 0;
    let totalMax = 0;

    this.currentQuiz.questions.forEach(q => {
      totalMax += q.points;
      const res = this.evalQuestion(q);
      totalEarned += res.earned;
    });

    const scaledScore = totalMax > 0 ? (totalEarned / totalMax) * 10 : 0;
    
    // Display result card
    const resultCard = document.getElementById('quiz-result-summary-card');
    if (resultCard) {
      resultCard.classList.remove('hidden');
      const scoreVal = document.getElementById('quiz-summary-score');
      const earnedText = document.getElementById('quiz-summary-earned');
      const feedbackText = document.getElementById('quiz-summary-feedback');

      if (scoreVal) scoreVal.innerText = scaledScore.toFixed(1);
      if (earnedText) earnedText.innerText = `${totalEarned.toFixed(2)} / ${totalMax.toFixed(2)} điểm tối đa`;
      if (feedbackText) {
        if (scaledScore >= 9.0) {
          feedbackText.innerText = 'Xuất sắc! (Excellent) Bạn nắm rất chắc toàn bộ thuật ngữ & phương pháp toán học.';
        } else if (scaledScore >= 7.0) {
          feedbackText.innerText = 'Khá giỏi! (Good job) Bạn làm chủ đa số các dạng bài, hãy xem giải thích để khắc phục điểm yếu.';
        } else if (scaledScore >= 5.0) {
          feedbackText.innerText = 'Đạt yêu cầu (Pass). Cần xem lại các định lý và từ vựng trọng tâm.';
        } else {
          feedbackText.innerText = 'Cần cố gắng thêm! (Needs Improvement) Hãy luyện lại các ví dụ mẫu có hướng dẫn giải.';
        }
      }
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.render();
    this.renderPalette();
    App.triggerMathJax();
  },

  reset() {
    this.init(this.currentQuiz, this.isTeacherMode);
    const resultCard = document.getElementById('quiz-result-summary-card');
    if (resultCard) resultCard.classList.add('hidden');
    App.triggerMathJax();
  },

  render() {
    const container = document.getElementById('interactive-quiz-cards');
    if (!container || !this.currentQuiz) return;

    const questions = this.currentQuiz.questions || [];
    if (questions.length === 0) {
      container.innerHTML = `
        <div class="glass-card p-10 rounded-2xl text-center text-slate-400">
          <p class="text-base font-medium">Chưa có câu hỏi nào trong đề thi.</p>
          <p class="text-xs text-slate-500 mt-1">Chuyển qua Tab 2 "Soạn Đề thi" để thêm các câu hỏi trắc nghiệm hoặc điền khuyết.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = questions.map((q, idx) => {
      let cardBorder = 'border-slate-800';
      let evalResult = null;

      if (this.isSubmitted) {
        evalResult = this.evalQuestion(q);
        if (evalResult.scorePercent === 1) {
          cardBorder = 'border-emerald-500/80 bg-emerald-950/10';
        } else if (evalResult.scorePercent > 0) {
          cardBorder = 'border-amber-500/80 bg-amber-950/10';
        } else {
          cardBorder = 'border-rose-500/80 bg-rose-950/10';
        }
      }

      return `
        <div id="interactive-q-${q.id}" class="glass-card p-5 sm:p-7 rounded-2xl border ${cardBorder} transition-all space-y-4">
          <!-- Question Header -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold text-xs border border-indigo-500/30">
                Câu ${idx + 1}
              </span>
              <span class="text-xs text-slate-400 font-medium">
                [${q.points} điểm]
              </span>
              ${this.isSubmitted ? `
                <span class="text-xs font-bold px-2 py-0.5 rounded ${evalResult.scorePercent === 1 ? 'bg-emerald-500/20 text-emerald-400' : (evalResult.scorePercent > 0 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400')}">
                  ${evalResult.earned.toFixed(2)} / ${evalResult.maxPoints} đ
                </span>
              ` : ''}
            </div>
            <span class="text-[11px] font-semibold uppercase tracking-wider text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md">
              ${q.type === 'multiple-choice' ? 'Trắc nghiệm ABCD' : (q.type === 'true-false-4' ? 'Đúng/Sai 4 Mệnh đề' : 'Điền đáp án')}
            </span>
          </div>

          <!-- Stems -->
          <div>
            <div class="text-base sm:text-lg font-semibold text-white latex-box leading-relaxed flex items-start flex-wrap gap-1.5">
              <span>${q.stemEn}</span>
              ${window.BilingualHelper ? window.BilingualHelper.renderInlinePill(q.stemEn, q.stemVi) : ''}
            </div>
            ${q.stemVi ? `
              <div class="text-xs sm:text-sm text-slate-400 italic vi-text mt-1.5 border-l-2 border-indigo-500/40 pl-3">
                ${q.stemVi}
              </div>
            ` : ''}
          </div>

          <!-- Question Body according to type -->
          <div class="pt-2">
            ${this.renderQuestionInteractiveControls(q)}
          </div>

          <!-- Solutions / Explanations -->
          ${(this.isSubmitted || this.isTeacherMode) ? `
            <div class="mt-4 pt-4 border-t border-slate-800/80 bg-slate-950/60 p-4 rounded-xl text-xs sm:text-sm text-slate-300 space-y-2">
              <div class="flex items-center gap-2 font-bold text-indigo-400">
                <span>💡 Hướng dẫn giải & Đáp án:</span>
              </div>
              <div class="latex-box leading-relaxed flex items-start justify-between gap-2">
                <span>${q.explanationEn || 'Không có giải thích.'}</span>
                ${(q.explanationEn && window.BilingualHelper) ? window.BilingualHelper.renderInlinePill(q.explanationEn, q.explanationVi) : ''}
              </div>
              ${q.explanationVi ? `
                <div class="text-slate-400 italic vi-text text-xs border-t border-slate-800/60 pt-1.5">${q.explanationVi}</div>
              ` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    this.renderPalette();
  },

  renderQuestionInteractiveControls(q) {
    if (q.type === 'multiple-choice') {
      const userSelected = this.userAnswers[q.id];
      return `
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          ${q.options.map(opt => {
            const isChecked = userSelected === opt.id;
            let optStyle = 'border-slate-800 bg-slate-900/60 hover:bg-slate-800/60 hover:border-indigo-500/40';
            
            if (this.isSubmitted || this.isTeacherMode) {
              if (opt.isCorrect) {
                optStyle = 'border-emerald-500 bg-emerald-950/20 text-emerald-300 font-medium';
              } else if (isChecked && !opt.isCorrect) {
                optStyle = 'border-rose-500 bg-rose-950/20 text-rose-300';
              }
            } else if (isChecked) {
              optStyle = 'border-indigo-500 bg-indigo-950/40 text-indigo-200 ring-1 ring-indigo-500';
            }

            return `
              <label class="flex items-center gap-3 p-3.5 rounded-xl border ${optStyle} cursor-pointer transition-all">
                <input 
                  type="radio" 
                  name="quiz-opt-${q.id}" 
                  value="${opt.id}" 
                  ${isChecked ? 'checked' : ''} 
                  ${this.isSubmitted ? 'disabled' : ''} 
                  onchange="QuizEngine.setMultipleChoice('${q.id}', '${opt.id}')"
                  class="w-4 h-4 text-indigo-600 focus:ring-0">
                <span class="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-300">
                  ${opt.id}
                </span>
                <span class="text-sm text-slate-100 latex-box flex-1">
                  ${opt.text}
                </span>
                ${(this.isSubmitted || this.isTeacherMode) && opt.isCorrect ? `
                  <span class="text-xs text-emerald-400 font-bold">✓ Đúng</span>
                ` : ''}
              </label>
            `;
          }).join('')}
        </div>
      `;
    } else if (q.type === 'true-false-4') {
      const userAnsObj = this.userAnswers[q.id] || {};
      return `
        <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/40">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead class="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th class="p-3">Mệnh đề (Proposition)</th>
                <th class="p-3 text-center w-24">Đúng (True)</th>
                <th class="p-3 text-center w-24">Sai (False)</th>
                ${(this.isSubmitted || this.isTeacherMode) ? '<th class="p-3 text-center w-20">Đáp án</th>' : ''}
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              ${q.propositions.map(prop => {
                const userVal = userAnsObj[prop.id];
                return `
                  <tr class="hover:bg-slate-850/40 transition-colors">
                    <td class="p-3 pr-2">
                      <div class="flex items-baseline gap-2 flex-wrap">
                        <span class="font-bold text-indigo-400">${prop.id})</span>
                        <span class="text-slate-100 font-medium latex-box">${prop.textEn}</span>
                        ${window.BilingualHelper ? window.BilingualHelper.renderInlinePill(prop.textEn, prop.textVi) : ''}
                      </div>
                      ${prop.textVi ? `
                        <div class="text-[11px] text-slate-400 italic vi-text mt-1 pl-4">${prop.textVi}</div>
                      ` : ''}
                    </td>
                    <td class="p-3 text-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name="q-tf-${q.id}-${prop.id}" 
                          value="true" 
                          ${userVal === true ? 'checked' : ''}
                          ${this.isSubmitted ? 'disabled' : ''}
                          onchange="QuizEngine.setTrueFalse('${q.id}', '${prop.id}', true)" 
                          class="w-4 h-4 text-emerald-500 focus:ring-0">
                      </label>
                    </td>
                    <td class="p-3 text-center">
                      <label class="inline-flex items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name="q-tf-${q.id}-${prop.id}" 
                          value="false" 
                          ${userVal === false ? 'checked' : ''}
                          ${this.isSubmitted ? 'disabled' : ''}
                          onchange="QuizEngine.setTrueFalse('${q.id}', '${prop.id}', false)" 
                          class="w-4 h-4 text-rose-500 focus:ring-0">
                      </label>
                    </td>
                    ${(this.isSubmitted || this.isTeacherMode) ? `
                      <td class="p-3 text-center font-bold text-xs ${prop.isCorrect ? 'text-emerald-400' : 'text-rose-400'}">
                        ${prop.isCorrect ? 'Đúng' : 'Sai'}
                      </td>
                    ` : ''}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    } else if (q.type === 'short-answer') {
      const userVal = this.userAnswers[q.id] || '';
      return `
        <div class="space-y-3 max-w-md">
          <label class="block text-xs font-medium text-slate-300">
            Nhập kết quả tính toán của bạn:
          </label>
          <div class="relative">
            <input 
              type="text" 
              value="${userVal}"
              ${this.isSubmitted ? 'disabled' : ''}
              oninput="QuizEngine.setShortAnswer('${q.id}', this.value)"
              placeholder="Ví dụ: 3, -1/2, hoặc 0.75..." 
              class="w-full px-4 py-3 rounded-xl glass-input text-white font-mono text-sm pr-20">
            <span class="absolute right-3 top-3 text-xs text-slate-500 pointer-events-none font-mono">
              Value
            </span>
          </div>
          ${(this.isSubmitted || this.isTeacherMode) ? `
            <div class="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs flex items-center justify-between">
              <span class="text-slate-400">Đáp án chính xác:</span>
              <span class="font-bold text-emerald-400 font-mono text-sm">${q.correctAnswer}</span>
            </div>
          ` : ''}
        </div>
      `;
    }
    return '';
  }
};

window.QuizEngine = QuizEngine;
