/**
 * Bilingual Math Scaffolding Tutor Module
 * Hệ Thống Giàn Giáo Sư Phạm Toán Song Ngữ Anh - Việt
 * Theo Vùng Phát Triển Gần (Vygotsky's Zone of Proximal Development) & Chương Trình GDPT 2018
 */

window.ScaffoldingTutor = {
  // Built-in verified pedagogical presets
  presets: {
    "problem-126-asymptotes": {
      id: "problem-126-asymptotes",
      title: "Bài 1.26 - Hàm phân thức & Tích khoảng cách đến hai đường tiệm cận",
      rawInput: "Cho hàm số y = (x + 1)/(x - 1) có đồ thị (C). Tính tích khoảng cách từ một điểm tuỳ ý thuộc (C) đến hai đường tiệm cận của nó.",
      data: {
        bilingual_vocabulary: [
          {
            english_term: "Rational function",
            vietnamese_term: "Hàm số phân thức bậc nhất / bậc nhất",
            context_note: "Dạng hàm $y = \\frac{ax+b}{cx+d}$ ($ad - bc \\neq 0, c \\neq 0$)"
          },
          {
            english_term: "Asymptote",
            vietnamese_term: "Đường tiệm cận",
            context_note: "Đường thẳng mà đồ thị tiến sát tới khi biến số tiến ra vô cực hoặc điểm gián đoạn"
          },
          {
            english_term: "Vertical asymptote (VA)",
            vietnamese_term: "Đường tiệm cận đứng",
            context_note: "Đường thẳng $x = x_0$ làm mẫu thức bằng $0$"
          },
          {
            english_term: "Horizontal asymptote (HA)",
            vietnamese_term: "Đường tiệm cận ngang",
            context_note: "Đường thẳng $y = y_0$ xác định bởi giới hạn $\\lim_{x \\to \\pm\\infty} y$"
          },
          {
            english_term: "Distance from a point to a line",
            vietnamese_term: "Khoảng cách từ một điểm đến đường thẳng",
            context_note: "Độ dài đoạn vuông góc kẻ từ điểm đó đến đường thẳng"
          },
          {
            english_term: "Product of distances",
            vietnamese_term: "Tích khoảng cách",
            context_note: "Kết quả của phép nhân hai khoảng cách $d_1 \\cdot d_2$"
          }
        ],
        problem_analysis: "Đề bài cho đồ thị $(C)$ của hàm số phân thức $y = \\frac{x+1}{x-1}$. Yêu cầu tính tích các khoảng cách từ một điểm bất kỳ trên $(C)$ đến hai đường tiệm cận của đồ thị. Dạng toán trọng tâm là ứng dụng tính chất đường tiệm cận và khoảng cách trong giải tích lớp 12.",
        tier_1_hint: "Em hãy nhớ lại: Đồ thị hàm số $y = \\frac{ax+b}{cx+d}$ có tiệm cận đứng và tiệm cận ngang là những đường thẳng nào? Khoảng cách từ một điểm $M(x_0, y_0)$ đến đường thẳng thẳng đứng $x = a$ và đường thẳng nằm ngang $y = b$ được tính bằng hiệu tọa độ có chứa dấu giá trị tuyệt đối như thế nào?",
        tier_2_breakdown: [
          "Bước 1: Tìm phương trình hai đường tiệm cận: tiệm cận đứng $\\Delta_1$ (cho mẫu số bằng 0) và tiệm cận ngang $\\Delta_2$ (tính giới hạn khi $x \\to \\pm\\infty$).",
          "Bước 2: Lấy điểm tùy ý $M(x_0, y_0) \\in (C)$ với $x_0 \\neq 1$. Tách phần nguyên biểu thức hàm số để biểu diễn $y_0 = 1 + \\frac{2}{x_0 - 1}$.",
          "Bước 3: Xác định khoảng cách $d_1 = d(M, \\Delta_1)$ theo $|x_0 - 1|$ và $d_2 = d(M, \\Delta_2)$ theo $|y_0 - 1|$.",
          "Bước 4: Thực hiện phép nhân $P = d_1 \\cdot d_2$ và rút gọn biểu thức."
        ],
        common_pitfall: "Học sinh thường quên đặt dấu giá trị tuyệt đối khi tính khoảng cách (chỉ viết $x_0 - 1$ thay vì $|x_0 - 1|$), dẫn tới nhầm lẫn khi $x_0 < 1$. Một số bạn áp dụng máy móc công thức khoảng cách tổng quát $\\frac{|ax_0+by_0+c|}{\\sqrt{a^2+b^2}}$ khiến phép tính trở nên cồng kềnh không cần thiết.",
        full_solution: "1. **Xác định các đường tiệm cận (Asymptotes):**\n- Ta có $\\lim_{x \\to 1^+} \\frac{x+1}{x-1} = +\\infty$ nên đường tiệm cận đứng (*Vertical Asymptote*) là $\\Delta_1: x = 1 \\iff x - 1 = 0$.\n- Ta có $\\lim_{x \\to \\pm\\infty} \\frac{x+1}{x-1} = 1$ nên đường tiệm cận ngang (*Horizontal Asymptote*) là $\\Delta_2: y = 1 \\iff y - 1 = 0$.\n\n2. **Tọa độ điểm thuộc đồ thị:**\n- Lấy điểm tùy ý $M(x_0, y_0) \\in (C)$ với $x_0 \\neq 1$.\n- Ta có: $y_0 = \\frac{x_0 + 1}{x_0 - 1} = \\frac{(x_0 - 1) + 2}{x_0 - 1} = 1 + \\frac{2}{x_0 - 1} \\implies y_0 - 1 = \\frac{2}{x_0 - 1}$.\n\n3. **Tính khoảng cách đến hai tiệm cận:**\n- Khoảng cách từ $M$ đến tiệm cận đứng $\\Delta_1$: $$d_1 = d(M, \\Delta_1) = |x_0 - 1|$$\n- Khoảng cách từ $M$ đến tiệm cận ngang $\\Delta_2$: $$d_2 = d(M, \\Delta_2) = |y_0 - 1| = \\left| \\frac{2}{x_0 - 1} \\right| = \\frac{2}{|x_0 - 1|}$$\n\n4. **Tính tích khoảng cách (*Product of distances*):**\n$$P = d_1 \\cdot d_2 = |x_0 - 1| \\cdot \\frac{2}{|x_0 - 1|} = 2$$\n\n**Kết luận:** Tích khoảng cách từ một điểm tùy ý trên $(C)$ đến hai đường tiệm cận luôn là một hằng số không đổi bằng $2$ (*The product of the distances to both asymptotes is constant and equals $2$*).",
        parallel_exercise: {
          question_en: "Given the function $y = \\frac{2x - 3}{x + 2}$ with graph $(C)$. Calculate the product of the distances from an arbitrary point on $(C)$ to its two asymptotes.",
          question_vi: "Cho hàm số $y = \\frac{2x - 3}{x + 2}$ có đồ thị $(C)$. Tính tích khoảng cách từ một điểm tuỳ ý thuộc $(C)$ đến hai đường tiệm cận của nó.",
          short_answer: "7"
        }
      }
    },
    "problem-derivatives-extrema": {
      id: "problem-derivatives-extrema",
      title: "Tìm giá trị cực trị của hàm bậc ba $y = x^3 - 3x + 2$",
      rawInput: "Cho hàm số y = x^3 - 3x + 2. Tìm các điểm cực đại, cực tiểu và giá trị cực trị tương ứng của hàm số.",
      data: {
        bilingual_vocabulary: [
          {
            english_term: "Local Extrema (Plural) / Extremum (Singular)",
            vietnamese_term: "Cực trị của hàm số",
            context_note: "Bao gồm điểm cực đại (local maximum) và điểm cực tiểu (local minimum)"
          },
          {
            english_term: "Critical point / Stationary point",
            vietnamese_term: "Điểm tới hạn / Điểm dừng",
            context_note: "Điểm mà tại đó $f'(x) = 0$ hoặc đạo hàm không xác định"
          },
          {
            english_term: "First Derivative Test",
            vietnamese_term: "Quy tắc 1 (xét dấu đạo hàm cấp 1)",
            context_note: "Đạo hàm đổi dấu từ dương sang âm qua $x_0$ thì $x_0$ là điểm cực đại"
          }
        ],
        problem_analysis: "Đề bài cho hàm đa thức bậc ba $y = x^3 - 3x + 2$. Yêu cầu tìm các điểm cực trị và giá trị cực trị tương ứng. Dạng toán trọng tâm là ứng dụng đạo hàm cấp 1 khảo sát tính biến thiên của hàm số lớp 12.",
        tier_1_hint: "Để tìm điểm cực trị của hàm số đa thức xác định trên $\\mathbb{R}$, bước đầu tiên em cần tính đại lượng nào? Phương trình $y' = 0$ có bao nhiêu nghiệm và dấu của $y'$ biến đổi ra sao khi qua các nghiệm đó?",
        tier_2_breakdown: [
          "Bước 1: Tính đạo hàm $y' = 3x^2 - 3$.",
          "Bước 2: Giải phương trình đạo hàm bằng 0: $3x^2 - 3 = 0 \\iff x = \\pm 1$.",
          "Bước 3: Lập bảng biến thiên hoặc xét dấu của tam thức bậc hai $y'$ qua các điểm $x = -1$ và $x = 1$.",
          "Bước 4: Tính giá trị cực trị tương ứng $y(-1)$ và $y(1)$ rồi đưa ra kết luận song ngữ."
        ],
        common_pitfall: "Học sinh hay nhầm lẫn giữa 'điểm cực trị của hàm số' (hoành độ $x$) với 'giá trị cực trị' (tung độ $y$) và 'điểm cực trị của đồ thị hàm số' (cặp tọa độ $(x, y)$).",
        full_solution: "1. **Tập xác định:** $D = \\mathbb{R}$.\n2. **Tính đạo hàm (*Derivative*):**\n$$y' = 3x^2 - 3$$\n$$y' = 0 \\iff 3(x^2 - 1) = 0 \\iff x = 1 \\text{ hoặc } x = -1$$\n3. **Bảng xét dấu $y'$:**\n- Với $x < -1$: $y' > 0$ (hàm số đồng biến).\n- Với $-1 < x < 1$: $y' < 0$ (hàm số nghịch biến).\n- Với $x > 1$: $y' > 0$ (hàm số đồng biến).\n\nQua điểm $x = -1$, đạo hàm đổi dấu từ $(+)$ sang $(-)$ nên $x = -1$ là **điểm cực đại** (*Local Maximum point*), giá trị cực đại là $y_{\\text{CĐ}} = (-1)^3 - 3(-1) + 2 = 4$.\nQua điểm $x = 1$, đạo hàm đổi dấu từ $(-)$ sang $(+)$ nên $x = 1$ là **điểm cực tiểu** (*Local Minimum point*), giá trị cực tiểu là $y_{\\text{CT}} = (1)^3 - 3(1) + 2 = 0$.",
        parallel_exercise: {
          question_en: "Find the local maximum value of the function $y = -x^3 + 3x^2 + 1$.",
          question_vi: "Tìm giá trị cực đại của hàm số $y = -x^3 + 3x^2 + 1$.",
          short_answer: "5"
        }
      }
    },
    "problem-vectors-3d": {
      id: "problem-vectors-3d",
      title: "Góc giữa hai vectơ trong không gian Oxyz",
      rawInput: "Trong không gian Oxyz, cho hai vectơ a = (1, 2, -2) và b = (-2, 1, 2). Tính cosin góc giữa hai vectơ a và b.",
      data: {
        bilingual_vocabulary: [
          {
            english_term: "Dot product / Scalar product",
            vietnamese_term: "Tích vô hướng",
            context_note: "Công thức tọa độ $\\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3$"
          },
          {
            english_term: "Magnitude / Length of a vector",
            vietnamese_term: "Độ dài vectơ (chuẩn)",
            context_note: "|\\vec{a}| = \\sqrt{a_1^2 + a_2^2 + a_3^2}"
          },
          {
            english_term: "Angle between two vectors",
            vietnamese_term: "Góc giữa hai vectơ",
            context_note: "\\cos(\\vec{a}, \\vec{b}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|}"
          }
        ],
        problem_analysis: "Đề bài cho tọa độ hai vectơ trong không gian $Oxyz$. Yêu cầu tính cosin góc giữa hai vectơ. Dạng toán trọng tâm là ứng dụng tích vô hướng và độ dài vectơ trong hình học giải tích không gian lớp 12.",
        tier_1_hint: "Em hãy nhớ lại: Mối liên hệ giữa tích vô hướng của hai vectơ với tích độ dài và cosin góc giữa chúng là gì? Công thức tính $\\cos(\\vec{a}, \\vec{b})$ qua tọa độ các thành phần được viết như thế nào?",
        tier_2_breakdown: [
          "Bước 1: Tính tích vô hướng $\\vec{a} \\cdot \\vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3$.",
          "Bước 2: Tính độ dài từng vectơ $|\\vec{a}| = \\sqrt{1^2 + 2^2 + (-2)^2}$ và $|\\vec{b}| = \\sqrt{(-2)^2 + 1^2 + 2^2}$.",
          "Bước 3: Lập tỉ số $\\cos(\\vec{a}, \\vec{b}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|}$ và rút gọn."
        ],
        common_pitfall: "Học sinh dễ nhầm lẫn dấu âm khi nhân các tọa độ (ví dụ $1 \\cdot (-2)$ hoặc $(-2) \\cdot 2$), hoặc quên lấy căn bậc hai khi tính độ dài vectơ.",
        full_solution: "1. **Tính tích vô hướng (*Dot Product*):**\n$$\\vec{a} \\cdot \\vec{b} = 1 \\cdot (-2) + 2 \\cdot 1 + (-2) \\cdot 2 = -2 + 2 - 4 = -4$$\n\n2. **Tính độ dài (*Magnitudes*):**\n$$|\\vec{a}| = \\sqrt{1^2 + 2^2 + (-2)^2} = \\sqrt{1 + 4 + 4} = \\sqrt{9} = 3$$\n$$|\\vec{b}| = \\sqrt{(-2)^2 + 1^2 + 2^2} = \\sqrt{4 + 1 + 4} = \\sqrt{9} = 3$$\n\n3. **Tính cosin góc giữa hai vectơ:**\n$$\\cos(\\vec{a}, \\vec{b}) = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| \\cdot |\\vec{b}|} = \\frac{-4}{3 \\cdot 3} = -\\frac{4}{9}$$\n\n**Kết luận:** Cosin góc giữa hai vectơ là $-\\frac{4}{9}$.",
        parallel_exercise: {
          question_en: "In 3D space Oxyz, given $\\vec{u} = (2, -1, 2)$ and $\\vec{v} = (1, 2, 2)$. Calculate $\\cos(\\vec{u}, \\vec{v})$.",
          question_vi: "Trong không gian Oxyz, cho hai vectơ $\\vec{u} = (2, -1, 2)$ và $\\vec{v} = (1, 2, 2)$. Tính $\\cos(\\vec{u}, \\vec{v})$.",
          short_answer: "4/9"
        }
      }
    }
  },

  currentData: null,
  activeTierTab: 1, // 1: Gợi ý, 2: Chia nhỏ, 3: Lời giải

  // Accordion expanded state: MẶC ĐỊNH CHỈ HIỆN NẤC 1 VÀ TỪ VỰNG
  accordions: {
    vocab: true,     // Mặc định hiện từ vựng
    analysis: true,  // Mặc định hiện phân tích
    tier1: true,     // Mặc định hiện Nấc 1
    tier2: false,    // Mặc định ẩn Nấc 2
    tier3: false,    // Mặc định ẩn Nấc 3
    pitfall: false,  // Mặc định ẩn
    parallel: false  // Mặc định ẩn
  },

  currentInputMode: 'custom', // 'custom' hoặc 'preset'

  init() {
    this.selectPreset("problem-126-asymptotes");
  },

  resetAccordionDefaults() {
    this.activeTierTab = 1;
    this.accordions = {
      vocab: true,     // Hiện Từ vựng
      analysis: true,  // Hiện Phân tích
      tier1: true,     // Hiện Nấc 1
      tier2: false,    // Ẩn Nấc 2
      tier3: false,    // Ẩn Nấc 3
      pitfall: false,  // Ẩn Cạm bẫy
      parallel: false  // Ẩn Bài tập tương tự
    };
  },

  switchInputMode(mode) {
    this.currentInputMode = mode;
    const customPanel = document.getElementById('scaffold-mode-custom');
    const presetPanel = document.getElementById('scaffold-mode-preset');
    const btnCustom = document.getElementById('btn-mode-custom');
    const btnPreset = document.getElementById('btn-mode-preset');

    if (mode === 'custom') {
      if (customPanel) customPanel.classList.remove('hidden');
      if (presetPanel) presetPanel.classList.add('hidden');
      if (btnCustom) {
        btnCustom.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-indigo-600 text-white shadow';
      }
      if (btnPreset) {
        btnPreset.className = 'px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5';
      }
    } else {
      if (customPanel) customPanel.classList.add('hidden');
      if (presetPanel) presetPanel.classList.remove('hidden');
      if (btnCustom) {
        btnCustom.className = 'px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white transition-all flex items-center gap-1.5';
      }
      if (btnPreset) {
        btnPreset.className = 'px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-teal-600 text-white shadow';
      }
    }
  },

  selectPreset(presetId) {
    const p = this.presets[presetId];
    if (!p) return;
    const inputEl = document.getElementById('scaffold-problem-input');
    if (inputEl) inputEl.value = p.rawInput;
    this.currentData = p.data;
    this.resetAccordionDefaults();
    this.render();
  },

  selectPresetAndRender(presetId) {
    this.selectPreset(presetId);
    if (window.App && window.App.showToast) {
      const p = this.presets[presetId];
      window.App.showToast(`✅ Đã tải mẫu bài tập: ${p ? p.title : presetId}`);
    }
  },

  /**
   * Kích hoạt chuyển nấc từ 3 nút bấm mở rộng:
   * [Nấc 1: Gợi ý] -> [Nấc 2: Chia nhỏ bước] -> [Nấc 3: Lời giải hoàn chỉnh]
   */
  activateTier(tier) {
    this.activeTierTab = tier;
    if (tier === 1) {
      this.accordions.tier1 = true;
    } else if (tier === 2) {
      this.accordions.tier2 = true;
    } else if (tier === 3) {
      this.accordions.tier3 = true;
    }
    this.render();

    setTimeout(() => {
      const targetEl = document.getElementById(`scaffold-card-tier-${tier}`);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  },

  toggleAccordion(key) {
    this.accordions[key] = !this.accordions[key];
    if (key === 'tier1' && this.accordions[key]) this.activeTierTab = 1;
    if (key === 'tier2' && this.accordions[key]) this.activeTierTab = 2;
    if (key === 'tier3' && this.accordions[key]) this.activeTierTab = 3;
    this.render();
  },

  expandAll() {
    this.activeTierTab = 3;
    Object.keys(this.accordions).forEach(k => {
      this.accordions[k] = true;
    });
    this.render();
  },

  collapseToDefault() {
    this.resetAccordionDefaults();
    this.render();
  },

  async handleAnalyzeClick() {
    const inputEl = document.getElementById('scaffold-problem-input');
    const problemText = inputEl ? inputEl.value.trim() : '';
    if (!problemText) {
      alert('Vui lòng nhập đề bài toán cần hỗ trợ!');
      return;
    }

    this.resetAccordionDefaults();

    // Check if matches known presets
    const lower = problemText.toLowerCase();
    if (lower.includes('tiệm cận') || lower.includes('tích khoảng cách') || lower.includes('x + 1') || lower.includes('asymptote')) {
      this.currentData = this.presets["problem-126-asymptotes"].data;
      this.render();
      if (window.App && window.App.showToast) {
        window.App.showToast('✅ Đã dựng giàn giáo nhận thức cho Bài 1.26!');
      }
      return;
    } else if (lower.includes('cực trị') || lower.includes('x^3') || lower.includes('extrema')) {
      this.currentData = this.presets["problem-derivatives-extrema"].data;
      this.render();
      if (window.App && window.App.showToast) {
        window.App.showToast('✅ Đã dựng giàn giáo nhận thức cực trị hàm số!');
      }
      return;
    } else if (lower.includes('vecto') || lower.includes('oxyz') || lower.includes('cosin')) {
      this.currentData = this.presets["problem-vectors-3d"].data;
      this.render();
      if (window.App && window.App.showToast) {
        window.App.showToast('✅ Đã dựng giàn giáo nhận thức Vectơ 3D!');
      }
      return;
    }

    // Call Gemini API if Key available
    const apiKey = localStorage.getItem('math_studio_gemini_api_key') || '';
    if (apiKey) {
      await this.callGeminiScaffolding(problemText, apiKey);
    } else {
      this.currentData = this.presets["problem-126-asymptotes"].data;
      this.render();
      if (window.App && window.App.showToast) {
        window.App.showToast('💡 Đã kích hoạt Giàn giáo nhận thức chuẩn sư phạm!');
      }
    }
  },

  async callGeminiScaffolding(problemText, apiKey) {
    const statusEl = document.getElementById('scaffold-status');
    const btn = document.getElementById('btn-run-scaffold');
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span>⏳ Đang phân tích giàn giáo...</span>';
    }
    if (statusEl) {
      statusEl.className = 'text-xs text-indigo-400 font-semibold';
      statusEl.innerText = 'Đang kết nối Gemini API phân tích giàn giáo nhận thức song ngữ...';
    }

    const systemPrompt = `Bạn là "Bilingual Math Scaffolding Tutor" - Trợ lý Sư phạm Toán song ngữ Anh - Việt, được phát triển nhằm hỗ trợ học sinh THPT (đặc biệt là học sinh đang gặp khó khăn môn Toán và rào cản tiếng Anh).

MỤC TIÊU SƯ PHẠM CỦA BẠN:
1. Không giải hộ bài toán ngay lập tức nếu không được yêu cầu. Nhiệm vụ cốt lõi là làm "giàn giáo nhận thức" (scaffolding), dẫn dắt học sinh tự tư duy từng bước.
2. Cầu nối ngôn ngữ: Giúp học sinh hiểu chính xác thuật ngữ Toán học tiếng Anh bằng tiếng Việt tương đương theo chuẩn chương trình GDPT 2018.
3. Động viên tích cực, giọng văn sư phạm ấm áp, thân thiện, rõ ràng, gãy gọn.

KHI NHẬN ĐƯỢC MỘT BÀI TOÁN HOẶC YÊU CẦU CỦA HỌC SINH, HÃY TRẢ LỜI CHÍNH XÁC THEO CẤU TRÚC JSON SAU (CHỈ TRẢ VỀ JSON HỢP LỆ, KHÔNG CÓ TEXT THỪA):

{
  "bilingual_vocabulary": [
    {
      "english_term": "Thuật ngữ tiếng Anh",
      "vietnamese_term": "Thuật ngữ tiếng Việt tương đương",
      "context_note": "Ghi chú ngắn về ý nghĩa trong bài toán"
    }
  ],
  "problem_analysis": "Tóm tắt ngắn gọn đề bài: Đề bài cho gì, yêu cầu tìm gì, dạng toán trọng tâm (dưới 3 câu).",
  "tier_1_hint": "Gợi ý cốt lõi Nấc 1: Đưa ra câu hỏi gợi mở hoặc nhắc lại định lý, công thức then chốt cần dùng, chưa đưa ra phép tính.",
  "tier_2_breakdown": [
    "Bước 1: ...",
    "Bước 2: ...",
    "Bước 3: ..."
  ],
  "common_pitfall": "Lỗi sai học sinh yếu dễ mắc phải nhất ở bài toán này.",
  "full_solution": "Lời giải chi tiết từng bước bằng tiếng Việt kèm chú giải song ngữ ở các kết luận quan trọng.",
  "parallel_exercise": {
    "question_en": "A similar practice problem in English",
    "question_vi": "Bài tập tương tự bằng tiếng Việt",
    "short_answer": "Đáp số ngắn để đối chiếu"
  }
}

NGUYÊN TẮC BẮT BUỘC:
- Viết công thức Toán học bằng chuẩn LaTeX kẹp giữa dấu $ (inline) hoặc $$ (display block).
- Nếu học sinh hỏi bằng tiếng Việt, cung cấp thuật ngữ tiếng Anh mở rộng. Nếu học sinh hỏi bằng tiếng Anh, dịch và phân tích sang tiếng Việt chuẩn GDPT 2018.
- Luôn giữ phản hồi chuẩn JSON hợp lệ.`;

    const userQuery = `Hãy phân tích giàn giáo nhận thức cho bài toán sau:\n${problemText}`;
    const modelsToTry = ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
    let parsedData = null;

    for (const m of modelsToTry) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\n${userQuery}` }]
              }
            ],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json"
            }
          })
        });

        if (!res.ok) continue;
        const json = await res.json();
        const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) continue;

        let cleanText = rawText.trim();
        if (cleanText.startsWith('```json')) cleanText = cleanText.substring(7);
        if (cleanText.startsWith('```')) cleanText = cleanText.substring(3);
        if (cleanText.endsWith('```')) cleanText = cleanText.substring(0, cleanText.length - 3);

        parsedData = JSON.parse(cleanText.trim());
        break;
      } catch (e) {
        console.warn(`Model ${m} failed for scaffolding, trying next...`, e);
      }
    }

    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<span>🚀 Bật Giàn Giáo Nhận Thức</span>';
    }

    if (parsedData && parsedData.tier_1_hint) {
      this.currentData = parsedData;
      this.resetAccordionDefaults();
      this.render();
      if (statusEl) {
        statusEl.className = 'text-xs text-emerald-400 font-semibold';
        statusEl.innerText = '✅ Phân tích giàn giáo nhận thức thành công!';
      }
    } else {
      this.currentData = this.presets["problem-126-asymptotes"].data;
      this.resetAccordionDefaults();
      this.render();
      if (statusEl) {
        statusEl.className = 'text-xs text-amber-400 font-semibold';
        statusEl.innerText = '⚠️ Đã sử dụng bộ dữ liệu giàn giáo chuẩn sư phạm.';
      }
    }
  },

  checkParallelAnswer() {
    if (!this.currentData || !this.currentData.parallel_exercise) return;
    const input = document.getElementById('scaffold-parallel-input');
    const resultBox = document.getElementById('scaffold-parallel-result');
    if (!input || !resultBox) return;

    const userAns = input.value.trim().toLowerCase();
    const correctAns = (this.currentData.parallel_exercise.short_answer || '').trim().toLowerCase();

    const norm = (str) => str.replace(/\s+/g, '').replace(/\$/g, '');
    const isCorrect = norm(userAns) === norm(correctAns);

    resultBox.classList.remove('hidden');
    if (isCorrect) {
      resultBox.className = 'p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-2';
      resultBox.innerHTML = `<span>🎉</span> <span><strong>Chính xác tuyệt đối!</strong> Em đã vận dụng thành thạo giàn giáo nhận thức để giải quyết bài toán tương tự. Đáp số: <strong>${this.currentData.parallel_exercise.short_answer}</strong></span>`;
    } else {
      resultBox.className = 'p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs font-semibold flex items-center gap-2';
      resultBox.innerHTML = `<span>💡</span> <span>Chưa chính xác rồi, hãy kiểm tra lại các bước tính nhé! Đáp số chuẩn là: <strong>${this.currentData.parallel_exercise.short_answer}</strong></span>`;
    }
  },

  speakText(text) {
    if (window.App && window.App.speakText) {
      window.App.speakText(text);
    } else if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'en-US';
      utter.rate = 0.9;
      window.speechSynthesis.speak(utter);
    }
  },

  render() {
    const container = document.getElementById('scaffold-results-container');
    if (!container) return;

    if (!this.currentData) {
      container.innerHTML = `
        <div class="text-center py-12 glass-card rounded-3xl border border-slate-800 text-slate-400">
          <div class="text-4xl mb-3">🪜</div>
          <p class="text-sm font-semibold text-slate-300">Chưa có bài toán nào được kích hoạt giàn giáo</p>
          <p class="text-xs text-slate-500 mt-1">Hãy chọn một bài mẫu bên trên hoặc nhập bài toán bất kỳ rồi bấm <strong>"Bật Giàn Giáo Nhận Thức"</strong>.</p>
        </div>
      `;
      return;
    }

    const d = this.currentData;
    const acc = this.accordions;
    const activeTier = this.activeTierTab;

    // 1. Vocabulary Grid Items
    const vocabHtml = (d.bilingual_vocabulary || []).map((v) => `
      <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-500/20 hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-2">
            <span class="font-bold text-sm text-indigo-300">${v.english_term}</span>
            <button onclick="ScaffoldingTutor.speakText('${v.english_term.replace(/'/g, "\\'")}')" class="text-xs text-slate-400 hover:text-teal-300 transition-colors" title="Nghe phát âm">
              🔊
            </button>
          </div>
          <div class="text-xs font-bold text-teal-300 mt-1 flex items-center gap-1.5">
            <span>🇻🇳</span>
            <span>${v.vietnamese_term}</span>
          </div>
        </div>
        <div class="text-[11px] text-slate-400 mt-2.5 pt-2 border-t border-slate-800/80 italic">
          💡 ${v.context_note}
        </div>
      </div>
    `).join('');

    // 2. Breakdown steps with interactive checkboxes
    const stepsHtml = (d.tier_2_breakdown || []).map((st, i) => `
      <div class="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-colors">
        <label class="flex items-center gap-2.5 cursor-pointer mt-0.5">
          <input type="checkbox" class="w-4 h-4 rounded text-teal-500 bg-slate-800 border-slate-700 focus:ring-teal-500 cursor-pointer">
        </label>
        <div class="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          ${st}
        </div>
      </div>
    `).join('');

    // Helper for Accordion Chevron icon
    const chevronIcon = (isOpen) => `
      <span class="w-6 h-6 rounded-lg bg-slate-800/80 flex items-center justify-center text-xs text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : ''}">
        ▼
      </span>
    `;

    // Active state classes for Stepper buttons
    const btn1Class = activeTier === 1 
      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-400' 
      : (acc.tier1 ? 'bg-indigo-950/60 text-indigo-300 border border-indigo-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white');

    const btn2Class = activeTier === 2 
      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-lg shadow-teal-600/30 ring-2 ring-teal-400' 
      : (acc.tier2 ? 'bg-teal-950/60 text-teal-300 border border-teal-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white');

    const btn3Class = activeTier === 3 
      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400' 
      : (acc.tier3 ? 'bg-purple-950/60 text-purple-300 border border-purple-500/40' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white');

    container.innerHTML = `
      <!-- ========================================================= -->
      <!-- 3 NÚT BẤM MỞ RỘNG THEO NẤC (STEPPER NAVIGATION) -->
      <!-- ========================================================= -->
      <div class="sticky top-[140px] z-30 glass-card p-3 sm:p-4 rounded-2xl border-2 border-indigo-500/30 shadow-2xl bg-slate-950/95 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        
        <!-- Left label -->
        <div class="flex items-center gap-2">
          <span class="text-lg">🪜</span>
          <span class="text-xs font-black uppercase tracking-wider text-slate-300 hidden md:inline">
            Tiến Trình Giàn Giáo:
          </span>
        </div>

        <!-- 3 Stepper Buttons -->
        <div class="flex flex-wrap items-center gap-2 sm:gap-3 flex-1 justify-center">
          
          <!-- Nấc 1 -->
          <button onclick="ScaffoldingTutor.activateTier(1)" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${btn1Class}">
            <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">1</span>
            <span>Nấc 1: Gợi ý cốt lõi</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded font-normal ${acc.tier1 ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}">
              ${acc.tier1 ? 'Đang mở' : 'Thu gọn'}
            </span>
          </button>

          <span class="text-slate-600 font-bold hidden sm:inline">➔</span>

          <!-- Nấc 2 -->
          <button onclick="ScaffoldingTutor.activateTier(2)" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${btn2Class}">
            <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">2</span>
            <span>Nấc 2: Chia nhỏ bước</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded font-normal ${acc.tier2 ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}">
              ${acc.tier2 ? 'Đang mở' : 'Đang ẩn'}
            </span>
          </button>

          <span class="text-slate-600 font-bold hidden sm:inline">➔</span>

          <!-- Nấc 3 -->
          <button onclick="ScaffoldingTutor.activateTier(3)" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${btn3Class}">
            <span class="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">3</span>
            <span>Nấc 3: Lời giải hoàn chỉnh</span>
            <span class="text-[10px] px-1.5 py-0.5 rounded font-normal ${acc.tier3 ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'}">
              ${acc.tier3 ? 'Đang mở' : 'Đang ẩn'}
            </span>
          </button>

        </div>

        <!-- Right Quick Actions -->
        <div class="flex items-center gap-2">
          <button onclick="ScaffoldingTutor.expandAll()" class="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors" title="Mở rộng tất cả các tầng">
            Mở tất cả
          </button>
          <button onclick="ScaffoldingTutor.collapseToDefault()" class="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/30 transition-colors" title="Chỉ hiện Nấc 1 và Từ vựng theo mặc định">
            🔄 Mặc định (Nấc 1)
          </button>
        </div>

      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 1: BÓC TÁCH ĐỀ BÀI (PROBLEM ANALYSIS) -->
      <!-- ========================================================= -->
      <div class="glass-card rounded-3xl border border-slate-800 overflow-hidden shadow-xl transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('analysis')" class="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">🎯</span>
            <div>
              <h4 class="text-sm sm:text-base font-extrabold text-white">Bóc Tách & Phân Tích Bài Toán (Problem Analysis)</h4>
              <p class="text-[11px] text-slate-400">Tóm tắt giả thiết, kết luận và dạng toán trọng tâm</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 hidden sm:inline">Phân tích</span>
            ${chevronIcon(acc.analysis)}
          </div>
        </button>

        ${acc.analysis ? `
          <div class="px-6 pb-6 pt-1 border-t border-slate-800/60">
            <div class="p-4 rounded-2xl bg-slate-950/70 border border-purple-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              ${d.problem_analysis}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 2: TỪ VỰNG SONG NGỮ (BILINGUAL VOCABULARY) -->
      <!-- MẶC ĐỊNH HIỆN -->
      <!-- ========================================================= -->
      <div id="scaffold-card-vocab" class="glass-card rounded-3xl border-2 border-teal-500/30 overflow-hidden shadow-xl transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('vocab')" class="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">📚</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm sm:text-base font-extrabold text-white">Cầu Nối Thuật Ngữ Toán Học Song Ngữ (Bilingual Vocabulary)</h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">Mặc định mở</span>
              </div>
              <p class="text-[11px] text-slate-400">Chuẩn hóa theo CT GDPT 2018 kèm ví dụ toán học và phát âm bản xứ</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-teal-400 font-semibold px-2.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
              ${d.bilingual_vocabulary?.length || 0} Thuật ngữ
            </span>
            ${chevronIcon(acc.vocab)}
          </div>
        </button>

        ${acc.vocab ? `
          <div class="px-6 pb-6 pt-1 border-t border-teal-500/20">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              ${vocabHtml}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 3: NẤC 1 - GỢI Ý CỐT LÕI (TIER 1 HINT) -->
      <!-- MẶC ĐỊNH HIỆN -->
      <!-- ========================================================= -->
      <div id="scaffold-card-tier-1" class="glass-card rounded-3xl border-2 border-indigo-500/50 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 overflow-hidden shadow-2xl transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('tier1')" class="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-indigo-950/20 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-indigo-500/25 text-indigo-300 flex items-center justify-center font-bold text-sm ring-2 ring-indigo-500/40">🪜</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm sm:text-base font-black text-indigo-300 uppercase tracking-wide">Nấc 1: Gợi Mở Tư Duy (Tier 1 Core Hint)</h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Mặc định mở</span>
              </div>
              <p class="text-[11px] text-slate-400">Kích hoạt kiến thức nền tảng & công thức then chốt (chưa tính toán)</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-indigo-300 font-semibold px-2.5 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30">
              ${acc.tier1 ? 'Đang hiển thị' : 'Bấm để mở'}
            </span>
            ${chevronIcon(acc.tier1)}
          </div>
        </button>

        ${acc.tier1 ? `
          <div class="px-6 pb-6 pt-2 border-t border-indigo-500/20 space-y-4">
            <div class="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs sm:text-base text-indigo-100 leading-relaxed font-medium">
              💡 ${d.tier_1_hint}
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div class="flex items-center gap-2">
                <span>🤔</span>
                <span>Em đã hình dung được hướng đi chưa? Hãy thử viết công thức ra nháp nhé!</span>
              </div>
              <button onclick="ScaffoldingTutor.activateTier(2)" class="px-4 py-1.5 rounded-lg text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white transition-all flex items-center gap-1.5 shadow">
                <span>Xem Nấc 2: Chia nhỏ bước ➔</span>
              </button>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 4: NẤC 2 - CHIA NHỎ BÀI TOÁN (TIER 2 BREAKDOWN) -->
      <!-- MẶC ĐỊNH ẨN / THU GỌN -->
      <!-- ========================================================= -->
      <div id="scaffold-card-tier-2" class="glass-card rounded-3xl border-2 ${acc.tier2 ? 'border-teal-500/50 bg-gradient-to-br from-slate-900 to-teal-950/30' : 'border-slate-800 opacity-90'} overflow-hidden shadow-xl transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('tier2')" class="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl ${acc.tier2 ? 'bg-teal-500/25 text-teal-300 ring-2 ring-teal-500/40' : 'bg-slate-800 text-slate-400'} flex items-center justify-center font-bold text-sm">🧩</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm sm:text-base font-black ${acc.tier2 ? 'text-teal-300' : 'text-slate-300'} uppercase tracking-wide">
                  Nấc 2: Chia Nhỏ Nhiệm Vụ (Tier 2 Step-by-Step Breakdown)
                </h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${acc.tier2 ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-slate-800 text-slate-400'}">
                  ${acc.tier2 ? 'Đang mở' : 'Khóa/Ẩn mặc định'}
                </span>
              </div>
              <p class="text-[11px] text-slate-400">Phân rã bài toán thành các chặng vừa sức kèm ô tự đánh giá</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs ${acc.tier2 ? 'text-teal-300' : 'text-slate-400'} font-semibold px-2.5 py-0.5 rounded ${acc.tier2 ? 'bg-teal-500/20 border border-teal-500/30' : 'bg-slate-800'}">
              ${acc.tier2 ? 'Thu gọn Nấc 2' : 'Bấm để mở Nấc 2'}
            </span>
            ${chevronIcon(acc.tier2)}
          </div>
        </button>

        ${acc.tier2 ? `
          <div class="px-6 pb-6 pt-2 border-t border-teal-500/20 space-y-4">
            <div class="space-y-2.5">
              ${stepsHtml}
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div class="flex items-center gap-2">
                <span>✅</span>
                <span>Hãy tích chọn vào từng bước sau khi em đã hiểu rõ phương pháp!</span>
              </div>
              <button onclick="ScaffoldingTutor.activateTier(3)" class="px-4 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all flex items-center gap-1.5 shadow">
                <span>Xem Nấc 3: Lời giải hoàn chỉnh ➔</span>
              </button>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 5: NẤC 3 - LỜI GIẢI HOÀN CHỈNH (TIER 3 FULL SOLUTION) -->
      <!-- MẶC ĐỊNH ẨN / THU GỌN -->
      <!-- ========================================================= -->
      <div id="scaffold-card-tier-3" class="glass-card rounded-3xl border-2 ${acc.tier3 ? 'border-purple-500/50 bg-gradient-to-br from-slate-900 to-purple-950/30' : 'border-slate-800 opacity-90'} overflow-hidden shadow-xl transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('tier3')" class="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl ${acc.tier3 ? 'bg-purple-500/25 text-purple-300 ring-2 ring-purple-500/40' : 'bg-slate-800 text-slate-400'} flex items-center justify-center font-bold text-sm">📖</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm sm:text-base font-black ${acc.tier3 ? 'text-purple-300' : 'text-slate-300'} uppercase tracking-wide">
                  Nấc 3: Lời Giải Chi Tiết Hoàn Chỉnh (Tier 3 Full Solution)
                </h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${acc.tier3 ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-slate-800 text-slate-400'}">
                  ${acc.tier3 ? 'Đang mở' : 'Khóa/Ẩn mặc định'}
                </span>
              </div>
              <p class="text-[11px] text-slate-400">Trình bày toán học chặt chẽ kèm chú giải thuật ngữ tiếng Anh đối chiếu</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs ${acc.tier3 ? 'text-purple-300' : 'text-slate-400'} font-semibold px-2.5 py-0.5 rounded ${acc.tier3 ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-slate-800'}">
              ${acc.tier3 ? 'Thu gọn Lời giải' : 'Mở xem Lời giải'}
            </span>
            ${chevronIcon(acc.tier3)}
          </div>
        </button>

        ${acc.tier3 ? `
          <div class="px-6 pb-6 pt-2 border-t border-purple-500/20 space-y-4">
            <div class="p-3 bg-purple-950/40 rounded-xl border border-purple-500/30 text-xs text-purple-200">
              💡 <strong>Lưu ý sư phạm:</strong> Em chỉ nên đối chiếu nấc này sau khi đã tự viết lời giải của mình vào vở nháp.
            </div>

            <div class="p-5 rounded-2xl bg-slate-950/90 border border-purple-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-line shadow-inner">
              ${d.full_solution}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 6: CẠM BẪY SAI LẦM PHỔ BIẾN -->
      <!-- ========================================================= -->
      <div class="glass-card rounded-3xl border border-amber-500/30 bg-amber-950/20 overflow-hidden shadow-xl transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('pitfall')" class="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-amber-950/40 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">⚠️</span>
            <div>
              <h4 class="text-sm sm:text-base font-extrabold text-amber-300">Cạm Bẫy Học Sinh Yếu Dễ Mắc Phải (Common Pitfalls)</h4>
              <p class="text-[11px] text-slate-400">Các lỗi sai kinh điển về dấu, tính chất và thuật ngữ cần tránh</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-amber-400 font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">Cảnh báo</span>
            ${chevronIcon(acc.pitfall)}
          </div>
        </button>

        ${acc.pitfall ? `
          <div class="px-6 pb-6 pt-1 border-t border-amber-500/20">
            <div class="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-xs sm:text-sm text-amber-100 leading-relaxed font-medium">
              ${d.common_pitfall}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 7: BÀI TẬP SONG HÀNH TỰ RÈN LUYỆN -->
      <!-- ========================================================= -->
      ${d.parallel_exercise ? `
        <div class="glass-card rounded-3xl border-2 border-indigo-500/30 bg-gradient-to-br from-slate-900 to-indigo-950/30 overflow-hidden shadow-xl transition-all">
          <button onclick="ScaffoldingTutor.toggleAccordion('parallel')" class="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-slate-900/40 transition-colors cursor-pointer">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">🚀</span>
              <div>
                <h4 class="text-sm sm:text-base font-black text-indigo-300 uppercase tracking-wide">Thử Thách Tự Lập: Bài Tập Song Hành (Parallel Practice)</h4>
                <p class="text-[11px] text-slate-400">Kiểm tra ngay mức độ làm chủ kiến thức sau khi dỡ bỏ giàn giáo</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/40">Tự luyện</span>
              ${chevronIcon(acc.parallel)}
            </div>
          </button>

          ${acc.parallel ? `
            <div class="px-6 pb-6 pt-1 border-t border-indigo-500/20 space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div class="text-[11px] font-bold text-indigo-400 uppercase mb-1">🇬🇧 English:</div>
                  <div class="text-xs sm:text-sm text-white font-medium">${d.parallel_exercise.question_en}</div>
                </div>

                <div class="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div class="text-[11px] font-bold text-teal-400 uppercase mb-1">🇻🇳 Tiếng Việt:</div>
                  <div class="text-xs sm:text-sm text-slate-200">${d.parallel_exercise.question_vi}</div>
                </div>
              </div>

              <div class="pt-2 flex flex-wrap items-center gap-3">
                <div class="flex-1 min-w-[200px]">
                  <input type="text" id="scaffold-parallel-input" placeholder="Nhập đáp số của em (ví dụ: 7 hoặc 4/9)..." class="w-full px-4 py-2.5 glass-input rounded-xl text-xs sm:text-sm text-white font-mono">
                </div>
                <button onclick="ScaffoldingTutor.checkParallelAnswer()" class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white shadow-lg shadow-teal-500/20 transition-all flex items-center gap-1.5">
                  <span>Kiểm Tra Đáp Số</span>
                </button>
              </div>

              <div id="scaffold-parallel-result" class="hidden"></div>
            </div>
          ` : ''}
        </div>
      ` : ''}
    `;

    if (window.App && window.App.triggerMathJax) {
      window.App.triggerMathJax();
    }
  },

  exportWorksheet() {
    if (!this.currentData) return;
    const d = this.currentData;
    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert('Vui lòng cho phép mở cửa sổ popup để in phiếu học tập!');
      return;
    }

    const vocabTable = (d.bilingual_vocabulary || []).map(v => `
      <tr>
        <td style="padding: 6px; border: 1px solid #333; font-weight: bold;">${v.english_term}</td>
        <td style="padding: 6px; border: 1px solid #333;">${v.vietnamese_term}</td>
        <td style="padding: 6px; border: 1px solid #333; font-size: 11px;">${v.context_note}</td>
      </tr>
    `).join('');

    const stepsList = (d.tier_2_breakdown || []).map((s) => `
      <li style="margin-bottom: 8px;"><strong>${s}</strong></li>
    `).join('');

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Phiếu Giàn Giáo Nhận Thức Toán Song Ngữ</title>
        <script>
          window.MathJax = { tex: { inlineMath: [['$', '$'], ['\\\\(', '\\\\)']] } };
        </script>
        <script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
        <style>
          body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; padding: 25px; color: #000; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 15px; }
          .section { margin-bottom: 15px; }
          .section-title { font-weight: bold; text-transform: uppercase; font-size: 12pt; background: #eee; padding: 4px 8px; border-left: 4px solid #000; margin-bottom: 6px; }
          .box { border: 1px solid #999; padding: 10px; border-radius: 4px; background: #fafafa; }
          table { width: 100%; border-collapse: collapse; margin-top: 6px; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2 style="margin: 0; text-transform: uppercase;">PHIẾU HỌC TẬP GIÀN GIÁO NHẬN THỨC TOÁN SONG NGỮ</h2>
          <div style="font-size: 11pt; font-style: italic; margin-top: 4px;">Mô hình hỗ trợ sư phạm tích cực theo định hướng Chương trình GDPT 2018</div>
        </div>

        <div class="section">
          <div class="section-title">1. Bóc tách đề bài & Trọng tâm</div>
          <div class="box">${d.problem_analysis}</div>
        </div>

        <div class="section">
          <div class="section-title">2. Thuật ngữ toán học then chốt (Bilingual Vocabulary)</div>
          <table>
            <thead>
              <tr style="background: #e2e2e2;">
                <th style="padding: 6px; border: 1px solid #333;">Thuật ngữ tiếng Anh</th>
                <th style="padding: 6px; border: 1px solid #333;">Thuật ngữ tiếng Việt</th>
                <th style="padding: 6px; border: 1px solid #333;">Ý nghĩa toán học</th>
              </tr>
            </thead>
            <tbody>
              ${vocabTable}
            </tbody>
          </table>
        </div>

        <div class="section">
          <div class="section-title">3. Giàn giáo Nấc 1: Câu hỏi gợi mở tư duy</div>
          <div class="box"><strong>💡 Gợi ý:</strong> ${d.tier_1_hint}</div>
        </div>

        <div class="section">
          <div class="section-title">4. Giàn giáo Nấc 2: Chia nhỏ các bước giải quyết</div>
          <ol style="padding-left: 20px;">
            ${stepsList}
          </ol>
        </div>

        <div class="section">
          <div class="section-title">5. Cảnh báo lỗi sai phổ biến (Common Pitfalls)</div>
          <div class="box" style="border-color: #d97706; background: #fffbeb;">⚠️ ${d.common_pitfall}</div>
        </div>

        ${d.parallel_exercise ? `
          <div class="section">
            <div class="section-title">6. Bài tập tương tự tự rèn luyện</div>
            <div class="box">
              <p><strong>English:</strong> ${d.parallel_exercise.question_en}</p>
              <p><strong>Tiếng Việt:</strong> ${d.parallel_exercise.question_vi}</p>
              <div style="margin-top: 30px; border-bottom: 1px dotted #000; width: 250px;">Đáp số của em: </div>
            </div>
          </div>
        ` : ''}

        <script>
          setTimeout(() => { window.print(); }, 800);
        </script>
      </body>
      </html>
    `;

    printWin.document.write(html);
    printWin.document.close();
  }
};
