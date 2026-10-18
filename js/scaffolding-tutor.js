/**
 * Bilingual Math Scaffolding Tutor Module
 * Hệ Thống Giàn Giáo Sư Phạm Toán Song Ngữ Anh - Việt
 * Theo Vùng Phát Triển Gần (Vygotsky's Zone of Proximal Development) & Chương Trình GDPT 2018
 */

window.ScaffoldingTutor = {
  // Built-in verified pedagogical presets
  presets: {
    // ========================================================
    // 1. MẪU KHỐI 10 (GRADE 10): TỌA ĐỘ VÀ TÍCH VÔ HƯỚNG VECTƠ
    // ========================================================
    "grade-10-vectors": {
      id: "grade-10-vectors",
      grade: "Khối 10",
      title: "Khối 10: Tọa độ, Trọng tâm & Tích vô hướng của hai vectơ trong Oxy",
      rawInput: "Trong mặt phẳng tọa độ Oxy, cho tam giác ABC với A(1; 2), B(-2; 6) và C(5; 5). Tìm tọa độ trọng tâm G của tam giác ABC và tính tích vô hướng của hai vectơ AB và AC.",
      data: {
        bilingual_vocabulary: [
          {
            english_term: "Cartesian coordinate plane (Oxy)",
            vietnamese_term: "Mặt phẳng tọa độ Oxy",
            context_note: "Hệ trục tọa độ gồm trục hoành $Ox$ và trục tung $Oy$ vuông góc nhau"
          },
          {
            english_term: "Centroid of a triangle",
            vietnamese_term: "Trọng tâm tam giác",
            context_note: "Giao điểm 3 đường trung tuyến: $x_G = \\frac{x_A+x_B+x_C}{3}, y_G = \\frac{y_A+y_B+y_C}{3}$"
          },
          {
            english_term: "Dot product / Scalar product",
            vietnamese_term: "Tích vô hướng",
            context_note: "Công thức biểu thức tọa độ: $\\vec{u} \\cdot \\vec{v} = u_1 v_1 + u_2 v_2$"
          },
          {
            english_term: "Perpendicular vectors",
            vietnamese_term: "Hai vectơ vuông góc",
            context_note: "Hai vectơ vuông góc khi và chỉ khi tích vô hướng bằng 0: $\\vec{u} \\cdot \\vec{v} = 0$"
          }
        ],
        problem_analysis: "Đề bài cho tọa độ 3 đỉnh của tam giác $ABC$ trong mặt phẳng $Oxy$. Yêu cầu tìm tọa độ trọng tâm $G$ và tính tích vô hướng $\\vec{AB} \\cdot \\vec{AC}$. Dạng toán trọng tâm là ứng dụng tọa độ của vectơ trong chương trình Hình học Toán 10 (CT GDPT 2018).",
        tier_1_hint: "Em hãy nhớ lại: Tọa độ trọng tâm $G$ của tam giác $ABC$ được tính bằng trung bình cộng tọa độ các đỉnh như thế nào? Để tính tích vô hướng $\\vec{AB} \\cdot \\vec{AC}$, trước tiên em cần tìm tọa độ của từng vectơ bằng cách lấy tọa độ điểm ngọn trừ tọa độ điểm gốc.",
        tier_2_breakdown: [
          "Bước 1: Áp dụng công thức tọa độ trọng tâm tam giác: $x_G = \\frac{x_A + x_B + x_C}{3}$ và $y_G = \\frac{y_A + y_B + y_C}{3}$.",
          "Bước 2: Tìm tọa độ hai vectơ: $\\vec{AB} = (x_B - x_A; y_B - y_A)$ và $\\vec{AC} = (x_C - x_A; y_C - y_A)$.",
          "Bước 3: Áp dụng công thức biểu thức tọa độ của tích vô hướng: $\\vec{AB} \\cdot \\vec{AC} = x_1 x_2 + y_1 y_2$ để tính và nhận xét góc $\\widehat{BAC}$."
        ],
        common_pitfall: "Học sinh thường nhầm lẫn khi tìm tọa độ vectơ (lấy gốc trừ ngọn thay vì ngọn trừ gốc), hoặc quên chia cho 3 khi tính tọa độ trọng tâm (chỉ cộng dồn tọa độ 3 đỉnh).",
        full_solution: "1. **Tìm tọa độ trọng tâm $G$ (*Centroid of triangle ABC*):**\n- Áp dụng công thức tọa độ trọng tâm:\n$$x_G = \\frac{x_A + x_B + x_C}{3} = \\frac{1 + (-2) + 5}{3} = \\frac{4}{3}$$\n$$y_G = \\frac{y_A + y_B + y_C}{3} = \\frac{2 + 6 + 5}{3} = \\frac{13}{3}$$\nVậy tọa độ trọng tâm là $G\\left(\\frac{4}{3}; \\frac{13}{3}\\right)$.\n\n2. **Xác định tọa độ hai vectơ $\\vec{AB}$ và $\\vec{AC}$:**\n- Vectơ $\\vec{AB} = (-2 - 1; 6 - 2) = (-3; 4)$.\n- Vectơ $\\vec{AC} = (5 - 1; 5 - 2) = (4; 3)$.\n\n3. **Tính tích vô hướng (*Dot Product*):**\n$$\\vec{AB} \\cdot \\vec{AC} = (-3) \\cdot 4 + 4 \\cdot 3 = -12 + 12 = 0$$\n\n**Kết luận:** Trọng tâm là $G\\left(\\frac{4}{3}; \\frac{13}{3}\\right)$ và tích vô hướng $\\vec{AB} \\cdot \\vec{AC} = 0$. (Đặc biệt: Vì $\\vec{AB} \\cdot \\vec{AC} = 0$ nên $\\vec{AB} \\perp \\vec{AC}$, suy ra tam giác $ABC$ vuông tại $A$).",
        parallel_exercise: {
          question_en: "In the Cartesian plane Oxy, given triangle MNP with M(2; 1), N(5; 5) and P(-2; 4). Calculate the dot product of vector MN and vector MP.",
          question_vi: "Trong mặt phẳng tọa độ Oxy, cho tam giác MNP với M(2; 1), N(5; 5) và P(-2; 4). Tính tích vô hướng của hai vectơ MN và MP.",
          short_answer: "0"
        }
      }
    },

    // ========================================================
    // 2. MẪU KHỐI 11 (GRADE 11): GIỚI HẠN HÀM SỐ DẠNG VÔ ĐỊNH 0/0
    // ========================================================
    "grade-11-limits": {
      id: "grade-11-limits",
      grade: "Khối 11",
      title: "Khối 11: Giới hạn hàm số dạng vô định 0/0 (Limits of Functions)",
      rawInput: "Tính giới hạn của hàm số: L = lim_{x -> 2} (x^2 - 5x + 6) / (x - 2).",
      data: {
        bilingual_vocabulary: [
          {
            english_term: "Limit of a function",
            vietnamese_term: "Giới hạn của hàm số",
            context_note: "Ký hiệu $\\lim_{x \\to x_0} f(x)$, giá trị mà hàm số tiến tới khi biến số tiến dần đến $x_0$"
          },
          {
            english_term: "Indeterminate form 0/0",
            vietnamese_term: "Dạng vô định 0/0",
            context_note: "Dạng giới hạn khi cả tử số và mẫu số cùng tiến về 0, không thể kết luận trực tiếp"
          },
          {
            english_term: "Factoring polynomials",
            vietnamese_term: "Phân tích đa thức thành nhân tử",
            context_note: "Biến đổi $ax^2 + bx + c = a(x - x_1)(x - x_2)$ để làm xuất hiện nhân tử triệt tiêu"
          },
          {
            english_term: "Cancel common factors",
            vietnamese_term: "Khử / Triệt tiêu nhân tử chung",
            context_note: "Rút gọn đại lượng $(x - x_0)$ gây ra dạng vô định khi $x \\neq x_0$"
          }
        ],
        problem_analysis: "Đề bài yêu cầu tính giới hạn của hàm phân thức hữu tỉ tại điểm $x = 2$. Khi thay trực tiếp $x = 2$, biểu thức có dạng vô định $\\left[\\frac{0}{0}\\right]$. Dạng toán trọng tâm là phương pháp khử dạng vô định bằng cách phân tích đa thức thành nhân tử trong Giải tích Toán 11.",
        tier_1_hint: "Khi thay trực tiếp $x = 2$ vào tử và mẫu, em nhận được dạng gì? Khi gặp dạng vô định $\\left[\\frac{0}{0}\\right]$ của phân thức hữu tỉ, đa thức tử số $x^2 - 5x + 6$ chắc chắn chia hết cho $(x - 2)$. Em hãy phân tích tử số thành nhân tử để triệt tiêu đại lượng làm mẫu số bằng 0!",
        tier_2_breakdown: [
          "Bước 1: Kiểm tra dạng giới hạn khi thay $x = 2$: tử số bằng 0 và mẫu số bằng 0 $\\implies$ dạng vô định $\\left[\\frac{0}{0}\\right]$.",
          "Bước 2: Phân tích tam thức bậc hai ở tử số $x^2 - 5x + 6$ thành tích của hai nhị thức bậc nhất: $(x - 2)(x - 3)$.",
          "Bước 3: Rút gọn nhân tử chung $(x - 2)$ khi xét $x \\neq 2$: $\\frac{x^2 - 5x + 6}{x - 2} = x - 3$.",
          "Bước 4: Áp dụng định lý giới hạn hàm số liên tục, thay $x = 2$ vào biểu thức rút gọn để tính giá trị giới hạn $L$."
        ],
        common_pitfall: "Học sinh thường quên kiểm tra dạng giới hạn ban đầu dẫn tới việc vội vàng kết luận giới hạn bằng 0 hoặc không xác định. Một lỗi khác là tính nhầm nghiệm của tam thức bậc hai dẫn tới phân tích sai nhân tử.",
        full_solution: "1. **Nhận dạng giới hạn (*Identify Indeterminate Form*):**\n- Khi $x \\to 2$:\n  + Tử số: $2^2 - 5(2) + 6 = 4 - 10 + 6 = 0$.\n  + Mẫu số: $2 - 2 = 0$.\n- Do đó, giới hạn có dạng vô định $\\left[\\frac{0}{0}\\right]$.\n\n2. **Phân tích nhân tử và khử dạng vô định (*Factoring & Canceling*):**\n- Tam thức bậc hai $x^2 - 5x + 6$ có hai nghiệm là $x = 2$ và $x = 3$.\n- Do đó: $x^2 - 5x + 6 = (x - 2)(x - 3)$.\n- Với mọi $x \\neq 2$, ta có:\n$$\\frac{x^2 - 5x + 6}{x - 2} = \\frac{(x - 2)(x - 3)}{x - 2} = x - 3$$\n\n3. **Tính giới hạn (*Compute Limit*):**\n$$L = \\lim_{x \\to 2} \\frac{x^2 - 5x + 6}{x - 2} = \\lim_{x \\to 2} (x - 3) = 2 - 3 = -1$$\n\n**Kết luận:** Giá trị của giới hạn là $L = -1$.",
        parallel_exercise: {
          question_en: "Evaluate the limit of the function: L = lim_{x -> 3} (x^2 - 4x + 3) / (x - 3).",
          question_vi: "Tính giới hạn của hàm số: L = lim_{x -> 3} (x^2 - 4x + 3) / (x - 3).",
          short_answer: "2"
        }
      }
    },

    // ========================================================
    // 3. MẪU KHỐI 12 (GRADE 12): HÀM PHÂN THỨC & TIỆM CẬN (BÀI 1.26)
    // ========================================================
    "grade-12-asymptotes": {
      id: "grade-12-asymptotes",
      grade: "Khối 12",
      title: "Khối 12: Hàm phân thức & Tích khoảng cách đến hai đường tiệm cận (Bài 1.26)",
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

    // Backward compatibility aliases
    get "problem-126-asymptotes"() {
      return this["grade-12-asymptotes"];
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

  currentInputMode: 'preset', // 'custom' hoặc 'preset'

  init() {
    this.selectPreset("grade-12-asymptotes");
    this.updatePresetCardsUI("grade-12-asymptotes");
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

  updatePresetCardsUI(activePresetId) {
    const cardsConfig = {
      'grade-10-vectors': {
        btnId: 'scaffold-preset-btn-grade-10-vectors',
        badgeId: 'scaffold-badge-grade-10-vectors',
        statusId: 'scaffold-status-grade-10-vectors',
        titleId: 'scaffold-title-grade-10-vectors',
        gradeText: 'Khối 10',
        titleText: 'Tọa độ & Tích vô hướng Oxy',
        inactiveBtnClass: 'p-3.5 rounded-2xl border border-sky-200 bg-sky-50/40 hover:bg-sky-50 hover:border-sky-300 text-left transition-all space-y-1.5 group cursor-pointer opacity-85 hover:opacity-100',
        inactiveBadgeClass: 'px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-200',
        inactiveStatusHtml: '<span class="text-xs text-sky-600 group-hover:translate-x-0.5 transition-transform font-medium">Chọn ➔</span>',
        inactiveTitleClass: 'font-bold text-slate-800 text-xs',
        activeBtnClass: 'p-3.5 rounded-2xl border-2 border-sky-500 bg-sky-100/95 shadow-md ring-4 ring-sky-300/60 ring-offset-1 text-left transition-all space-y-1.5 group cursor-pointer scale-[1.02] transform duration-150',
        activeBadgeClass: 'px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-sky-600 text-white shadow-xs',
        activeStatusHtml: '<span class="text-xs font-bold text-sky-900 bg-white/95 px-2.5 py-0.5 rounded-md border border-sky-300 flex items-center gap-1.5 shadow-2xs"><span class="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>✓ Đang chọn</span>',
        activeTitleClass: 'font-black text-sky-950 text-xs sm:text-sm flex items-center gap-1.5'
      },
      'grade-11-limits': {
        btnId: 'scaffold-preset-btn-grade-11-limits',
        badgeId: 'scaffold-badge-grade-11-limits',
        statusId: 'scaffold-status-grade-11-limits',
        titleId: 'scaffold-title-grade-11-limits',
        gradeText: 'Khối 11',
        titleText: 'Giới hạn vô định 0/0',
        inactiveBtnClass: 'p-3.5 rounded-2xl border border-purple-200 bg-purple-50/40 hover:bg-purple-50 hover:border-purple-300 text-left transition-all space-y-1.5 group cursor-pointer opacity-85 hover:opacity-100',
        inactiveBadgeClass: 'px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200',
        inactiveStatusHtml: '<span class="text-xs text-purple-600 group-hover:translate-x-0.5 transition-transform font-medium">Chọn ➔</span>',
        inactiveTitleClass: 'font-bold text-slate-800 text-xs',
        activeBtnClass: 'p-3.5 rounded-2xl border-2 border-purple-500 bg-purple-100/95 shadow-md ring-4 ring-purple-300/60 ring-offset-1 text-left transition-all space-y-1.5 group cursor-pointer scale-[1.02] transform duration-150',
        activeBadgeClass: 'px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-purple-600 text-white shadow-xs',
        activeStatusHtml: '<span class="text-xs font-bold text-purple-900 bg-white/95 px-2.5 py-0.5 rounded-md border border-purple-300 flex items-center gap-1.5 shadow-2xs"><span class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>✓ Đang chọn</span>',
        activeTitleClass: 'font-black text-purple-950 text-xs sm:text-sm flex items-center gap-1.5'
      },
      'grade-12-asymptotes': {
        btnId: 'scaffold-preset-btn-grade-12-asymptotes',
        badgeId: 'scaffold-badge-grade-12-asymptotes',
        statusId: 'scaffold-status-grade-12-asymptotes',
        titleId: 'scaffold-title-grade-12-asymptotes',
        gradeText: 'Khối 12',
        titleText: 'Hàm phân thức & Tiệm cận (1.26)',
        inactiveBtnClass: 'p-3.5 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-300 text-left transition-all space-y-1.5 group cursor-pointer opacity-85 hover:opacity-100',
        inactiveBadgeClass: 'px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200',
        inactiveStatusHtml: '<span class="text-xs text-amber-600 group-hover:translate-x-0.5 transition-transform font-medium">Chọn ➔</span>',
        inactiveTitleClass: 'font-bold text-slate-800 text-xs',
        activeBtnClass: 'p-3.5 rounded-2xl border-2 border-amber-500 bg-amber-100/95 shadow-md ring-4 ring-amber-300/60 ring-offset-1 text-left transition-all space-y-1.5 group cursor-pointer scale-[1.02] transform duration-150',
        activeBadgeClass: 'px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-600 text-white shadow-xs',
        activeStatusHtml: '<span class="text-xs font-bold text-amber-950 bg-white/95 px-2.5 py-0.5 rounded-md border border-amber-300 flex items-center gap-1.5 shadow-2xs"><span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>✓ Đang chọn</span>',
        activeTitleClass: 'font-black text-amber-950 text-xs sm:text-sm flex items-center gap-1.5'
      }
    };

    Object.keys(cardsConfig).forEach((key) => {
      const cfg = cardsConfig[key];
      const btnEl = document.getElementById(cfg.btnId);
      const badgeEl = document.getElementById(cfg.badgeId);
      const statusEl = document.getElementById(cfg.statusId);
      const titleEl = document.getElementById(cfg.titleId);

      if (!btnEl) return;

      const isActive = (key === activePresetId);
      if (isActive) {
        btnEl.className = cfg.activeBtnClass;
        if (badgeEl) badgeEl.className = cfg.activeBadgeClass;
        if (statusEl) statusEl.innerHTML = cfg.activeStatusHtml;
        if (titleEl) {
          titleEl.className = cfg.activeTitleClass;
          titleEl.innerHTML = `<span>🎯</span> <span>${cfg.titleText}</span>`;
        }
      } else {
        btnEl.className = cfg.inactiveBtnClass;
        if (badgeEl) badgeEl.className = cfg.inactiveBadgeClass;
        if (statusEl) statusEl.innerHTML = cfg.inactiveStatusHtml;
        if (titleEl) {
          titleEl.className = cfg.inactiveTitleClass;
          titleEl.innerHTML = cfg.titleText;
        }
      }
    });
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
        btnCustom.className = 'px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-white text-indigo-800 border border-slate-200/80 shadow-xs cursor-pointer';
      }
      if (btnPreset) {
        btnPreset.className = 'px-4 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1.5 border border-transparent cursor-pointer';
      }
      this.updatePresetCardsUI('');
    } else {
      if (customPanel) customPanel.classList.add('hidden');
      if (presetPanel) presetPanel.classList.remove('hidden');
      if (btnCustom) {
        btnCustom.className = 'px-4 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 transition-all flex items-center gap-1.5 border border-transparent cursor-pointer';
      }
      if (btnPreset) {
        btnPreset.className = 'px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 bg-white text-indigo-800 border border-slate-200/80 shadow-xs cursor-pointer';
      }
      this.updatePresetCardsUI(this.currentPresetKey);
    }
  },

  currentPresetKey: 'grade-12-asymptotes',

  selectPreset(presetId) {
    this.currentPresetKey = presetId;
    const p = this.presets[presetId];
    if (!p) return;
    const inputEl = document.getElementById('scaffold-problem-input');
    if (inputEl) inputEl.value = p.rawInput;
    this.currentData = p.data;
    this.resetAccordionDefaults();
    this.updatePresetCardsUI(presetId);
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

    // Check if matches known presets (Grade 10, 11, 12)
    const lower = problemText.toLowerCase();
    if (lower.includes('tiệm cận') || lower.includes('tích khoảng cách') || lower.includes('x + 1') || lower.includes('asymptote')) {
      this.currentData = this.presets["grade-12-asymptotes"].data;
      this.render();
      if (window.App && window.App.showToast) {
        window.App.showToast('✅ Đã dựng giàn giáo nhận thức: Khối 12 (Bài 1.26 - Tiệm cận)!');
      }
      return;
    } else if (lower.includes('giới hạn') || lower.includes('lim') || lower.includes('x^2 - 5x') || lower.includes('limit')) {
      this.currentData = this.presets["grade-11-limits"].data;
      this.render();
      if (window.App && window.App.showToast) {
        window.App.showToast('✅ Đã dựng giàn giáo nhận thức: Khối 11 (Giới hạn hàm số 0/0)!');
      }
      return;
    } else if (lower.includes('trọng tâm') || lower.includes('tam giác abc') || lower.includes('oxy') || lower.includes('centroid') || lower.includes('tọa độ')) {
      this.currentData = this.presets["grade-10-vectors"].data;
      this.render();
      if (window.App && window.App.showToast) {
        window.App.showToast('✅ Đã dựng giàn giáo nhận thức: Khối 10 (Tọa độ & Vectơ Oxy)!');
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
      this.saveCurrentProblemToLibrary(true, problemText);
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

  generateAI() {
    return this.handleAnalyzeClick();
  },

  saveCurrentProblemToLibrary(auto = false, rawText = '') {
    if (!this.currentData) {
      if (!auto && window.App && window.App.showToast) {
        window.App.showToast('Chưa có dữ liệu giàn giáo để lưu!', 'warning');
      }
      return;
    }

    const inputVal = rawText || (document.getElementById('scaffold-problem-input')?.value || '').trim();
    const firstVocab = this.currentData.bilingual_vocabulary?.[0]?.vietnamese_term || 'Bài toán giàn giáo';
    const firstVocabEn = this.currentData.bilingual_vocabulary?.[0]?.english_term || 'Scaffolding Problem';

    // Determine Grade
    let grade = 'Khối 12';
    if (/lớp 10|khối 10|oxy|vectơ|vecto|tam giác/i.test(inputVal)) grade = 'Khối 10';
    else if (/lớp 11|khối 11|giới hạn|lim/i.test(inputVal)) grade = 'Khối 11';
    else if (/lớp 12|khối 12|đạo hàm|tiệm cận|tích phân/i.test(inputVal)) grade = 'Khối 12';

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;

    let titleVi = inputVal.length > 5 ? inputVal.slice(0, 75) : `Chuyên đề: ${firstVocab}`;
    let titleEn = firstVocabEn;
    let fullTitle = `${grade}: ${titleVi} (${titleEn})`;

    let existingIdx = -1;
    if (this.currentEditingId && window.App && window.App.createdLibrary) {
      existingIdx = window.App.createdLibrary.findIndex(e => e.id === this.currentEditingId);
    }

    const entryId = existingIdx >= 0 ? this.currentEditingId : ('scaffold-' + Date.now());
    const existingEntry = existingIdx >= 0 ? window.App.createdLibrary[existingIdx] : null;

    const entry = {
      id: entryId,
      code: existingEntry?.code || Math.random().toString(36).substring(2, 8).toUpperCase(),
      title: fullTitle,
      titleVi: titleVi,
      titleEn: titleEn,
      grade: grade,
      category: 'scaffolding', // Tự động gắn nhãn giàn giáo
      status: 'Đang mở',
      schedule: 'Tự do',
      questionCount: 1,
      conceptCount: 1,
      vocabCount: (this.currentData.bilingual_vocabulary || []).length,
      takenCount: existingEntry?.takenCount || 1,
      updatedAt: timeStr,
      rawInput: inputVal,
      scaffoldData: JSON.parse(JSON.stringify(this.currentData))
    };

    if (window.App && window.App.createdLibrary) {
      if (existingIdx >= 0) {
        window.App.createdLibrary[existingIdx] = entry;
      } else {
        window.App.createdLibrary.unshift(entry);
        this.currentEditingId = entryId;
      }
      window.App.saveCreatedLibrary();
      if (window.App.activeTab === 'scaffold-library') {
        window.App.renderScaffoldLibraryTable(window.App.scaffoldFilter || 'all');
      }
      if (window.App.showToast) {
        window.App.showToast(auto ? '✅ Tự động lưu bài tập vào "Bài tập đã tạo" của Giàn giáo!' : '💾 Đã lưu & cập nhật bài tập vào "Bài tập đã tạo"!');
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
      resultBox.className = 'p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center gap-2';
      resultBox.innerHTML = `<span>🎉</span> <span><strong>Chính xác tuyệt đối!</strong> Em đã vận dụng thành thạo giàn giáo nhận thức để giải quyết bài toán tương tự. Đáp số: <strong>${this.currentData.parallel_exercise.short_answer}</strong></span>`;
    } else {
      resultBox.className = 'p-3.5 rounded-2xl bg-rose-50 border border-rose-300 text-rose-950 text-xs font-semibold flex items-center gap-2';
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
        <div class="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-xs text-slate-600">
          <div class="text-4xl mb-3">🪜</div>
          <p class="text-sm font-bold text-slate-900">Chưa có bài toán nào được kích hoạt giàn giáo</p>
          <p class="text-xs text-slate-500 mt-1">Hãy chọn một bài mẫu bên trên hoặc nhập bài toán bất kỳ rồi bấm <strong>"Bật Giàn Giáo Nhận Thức"</strong>.</p>
        </div>
      `;
      return;
    }

    const d = this.currentData;
    const acc = this.accordions;

    // 1. Vocabulary Grid Items
    const vocabHtml = (d.bilingual_vocabulary || []).map((v) => `
      <div class="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-teal-400 hover:shadow-xs transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-start justify-between gap-2">
            <span class="font-bold text-sm text-indigo-700">${v.english_term}</span>
            ${window.BilingualHelper ? window.BilingualHelper.renderInlinePill(v.english_term, v.vietnamese_term) : `
            <button onclick="ScaffoldingTutor.speakText('${v.english_term.replace(/'/g, "\\'")}')" class="text-xs text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer" title="Nghe phát âm">
              🔊
            </button>
            `}
          </div>
          <div class="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1.5">
            <span>🇻🇳</span>
            <span>${v.vietnamese_term}</span>
          </div>
        </div>
        <div class="text-[11px] text-slate-600 mt-2.5 pt-2 border-t border-slate-100 italic">
          💡 ${v.context_note}
        </div>
      </div>
    `).join('');

    // 2. Breakdown steps with interactive checkboxes
    const stepsHtml = (d.tier_2_breakdown || []).map((st, i) => `
      <div class="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-400 hover:bg-white transition-colors">
        <label class="flex items-center gap-2.5 cursor-pointer mt-0.5">
          <input type="checkbox" class="w-4 h-4 rounded text-teal-600 bg-white border-slate-300 focus:ring-teal-500 cursor-pointer">
        </label>
        <div class="text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
          ${st}
        </div>
      </div>
    `).join('');

    // Helper for Accordion Chevron icon
    const chevronIcon = (isOpen) => `
      <span class="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600 font-bold' : ''}">
        ▼
      </span>
    `;

    // Determine active problem banner metadata
    const activePreset = this.presets[this.currentPresetKey];
    let bannerGrade = 'Toán THPT';
    let bannerTitle = 'Bài toán mục tiêu tạo giàn giáo';
    let bannerRawInput = '';
    let themeBorder = 'border-indigo-300';
    let themeBg = 'bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/30';
    let themeBadge = 'bg-indigo-600 text-white';
    let themeDot = 'bg-indigo-500';

    if (this.currentPresetKey === 'grade-10-vectors') {
      bannerGrade = 'Khối 10 (Hình học & Vectơ Oxy)';
      bannerTitle = activePreset?.title || 'Tọa độ & Tích vô hướng Oxy';
      bannerRawInput = activePreset?.rawInput || '';
      themeBorder = 'border-sky-300';
      themeBg = 'bg-gradient-to-r from-sky-100/70 via-sky-50/40 to-white';
      themeBadge = 'bg-sky-600 text-white';
      themeDot = 'bg-sky-500';
    } else if (this.currentPresetKey === 'grade-11-limits') {
      bannerGrade = 'Khối 11 (Giải tích & Giới hạn)';
      bannerTitle = activePreset?.title || 'Giới hạn hàm số dạng vô định 0/0';
      bannerRawInput = activePreset?.rawInput || '';
      themeBorder = 'border-purple-300';
      themeBg = 'bg-gradient-to-r from-purple-100/70 via-purple-50/40 to-white';
      themeBadge = 'bg-purple-600 text-white';
      themeDot = 'bg-purple-500';
    } else if (this.currentPresetKey === 'grade-12-asymptotes') {
      bannerGrade = 'Khối 12 (Giải tích & Khảo sát hàm số)';
      bannerTitle = activePreset?.title || 'Hàm phân thức & Tiệm cận (Bài 1.26)';
      bannerRawInput = activePreset?.rawInput || '';
      themeBorder = 'border-amber-300';
      themeBg = 'bg-gradient-to-r from-amber-100/70 via-amber-50/40 to-white';
      themeBadge = 'bg-amber-600 text-white';
      themeDot = 'bg-amber-500';
    } else {
      const customInput = document.getElementById('scaffold-problem-input');
      bannerGrade = 'Đề toán tùy biến';
      bannerTitle = 'Phân tích & Giàn giáo nhận thức cá nhân hóa';
      bannerRawInput = customInput ? customInput.value.trim() : '';
    }

    container.innerHTML = `
      <!-- ========================================================= -->
      <!-- BANNER BÀI TOÁN MỤC TIÊU ĐANG CHỌN (HERO CARD) -->
      <!-- ========================================================= -->
      <div class="glass-card rounded-2xl border-2 ${themeBorder} ${themeBg} p-5 sm:p-6 shadow-xs transition-all space-y-3">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2.5">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold ${themeBadge} shadow-2xs">${bannerGrade}</span>
            <span class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <span class="w-2.5 h-2.5 rounded-full ${themeDot} animate-pulse"></span>
              Đang học bài toán mục tiêu:
            </span>
          </div>
          <span class="text-xs text-slate-500 font-medium">Bấm các nấc thang bên dưới để xem gợi ý & lời giải ⬇️</span>
        </div>
        <div>
          <h3 class="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">${bannerTitle}</h3>
          ${bannerRawInput ? `
            <div class="mt-2.5 p-3.5 rounded-xl bg-white/90 border border-slate-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-mono shadow-2xs">
              <span class="font-bold text-slate-700">Đề bài:</span> ${bannerRawInput}
            </div>
          ` : ''}
        </div>
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 1: BÓC TÁCH ĐỀ BÀI (PROBLEM ANALYSIS) -->
      <!-- ========================================================= -->
      <div class="glass-card rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('analysis')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center font-bold text-sm">🎯</span>
            <div>
              <h4 class="text-sm sm:text-base font-bold text-slate-900">Bóc Tách & Phân Tích Bài Toán (Problem Analysis)</h4>
              <p class="text-[11px] text-slate-500">Tóm tắt giả thiết, kết luận và dạng toán trọng tâm</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-purple-700 font-semibold px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 hidden sm:inline">Phân tích</span>
            ${chevronIcon(acc.analysis)}
          </div>
        </button>

        ${acc.analysis ? `
          <div class="px-5 pb-5 pt-1 border-t border-slate-100">
            <div class="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
              ${d.problem_analysis}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 2: TỪ VỰNG SONG NGỮ (BILINGUAL VOCABULARY) -->
      <!-- MẶC ĐỊNH HIỆN -->
      <!-- ========================================================= -->
      <div id="scaffold-card-vocab" class="glass-card rounded-2xl border border-teal-200 bg-white overflow-hidden shadow-xs transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('vocab')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-teal-50/30 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center font-bold text-sm">📚</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm sm:text-base font-bold text-slate-900">Cầu Nối Thuật Ngữ Toán Học Song Ngữ (Bilingual Vocabulary)</h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">Mặc định mở</span>
              </div>
              <p class="text-[11px] text-slate-500">Chuẩn hóa theo CT GDPT 2018 kèm ví dụ toán học và phát âm bản xứ</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-teal-700 font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200">
              ${d.bilingual_vocabulary?.length || 0} Thuật ngữ
            </span>
            ${chevronIcon(acc.vocab)}
          </div>
        </button>

        ${acc.vocab ? `
          <div class="px-5 pb-5 pt-1 border-t border-slate-100">
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
      <div id="scaffold-card-tier-1" class="glass-card rounded-2xl border border-indigo-200 bg-white overflow-hidden shadow-xs transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('tier1')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-indigo-50/30 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold text-sm">🪜</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">Nấc 1: Gợi Mở Tư Duy (Tier 1 Core Hint)</h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">Mặc định mở</span>
              </div>
              <p class="text-[11px] text-slate-500">Kích hoạt kiến thức nền tảng & công thức then chốt (chưa tính toán)</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200">
              ${acc.tier1 ? 'Đang hiển thị' : 'Bấm để mở'}
            </span>
            ${chevronIcon(acc.tier1)}
          </div>
        </button>

        ${acc.tier1 ? `
          <div class="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3.5">
            <div class="p-4 sm:p-5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-xs sm:text-sm text-slate-900 leading-relaxed font-medium shadow-2xs">
              💡 ${d.tier_1_hint}
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <div class="flex items-center gap-2">
                <span>🤔</span>
                <span class="font-medium text-slate-800">Em đã hình dung được hướng đi chưa? Hãy thử viết công thức ra nháp nhé!</span>
              </div>
              <button onclick="ScaffoldingTutor.activateTier(2)" class="px-4 py-1.5 rounded-lg text-xs font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 hover:border-teal-300 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer">
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
      <div id="scaffold-card-tier-2" class="glass-card rounded-2xl border border-teal-200 bg-white overflow-hidden shadow-xs transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('tier2')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-teal-50/30 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center font-bold text-sm">🧩</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
                  Nấc 2: Chia Nhỏ Nhiệm Vụ (Tier 2 Step-by-Step Breakdown)
                </h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${acc.tier2 ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}">
                  ${acc.tier2 ? 'Đang mở' : 'Khóa/Ẩn mặc định'}
                </span>
              </div>
              <p class="text-[11px] text-slate-500">Phân rã bài toán thành các chặng vừa sức kèm ô tự đánh giá</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full ${acc.tier2 ? 'bg-teal-50 text-teal-700 border border-teal-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}">
              ${acc.tier2 ? 'Thu gọn Nấc 2' : 'Bấm để mở Nấc 2'}
            </span>
            ${chevronIcon(acc.tier2)}
          </div>
        </button>

        ${acc.tier2 ? `
          <div class="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3.5">
            <div class="space-y-2.5">
              ${stepsHtml}
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
              <div class="flex items-center gap-2">
                <span>✅</span>
                <span class="font-medium text-slate-800">Hãy tích chọn vào từng bước sau khi em đã hiểu rõ phương pháp!</span>
              </div>
              <button onclick="ScaffoldingTutor.activateTier(3)" class="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 hover:border-indigo-300 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer">
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
      <div id="scaffold-card-tier-3" class="glass-card rounded-2xl border border-indigo-200 bg-white overflow-hidden shadow-xs transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('tier3')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-indigo-50/30 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold text-sm">📖</span>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">
                  Nấc 3: Lời Giải Chi Tiết Hoàn Chỉnh (Tier 3 Full Solution)
                </h4>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full ${acc.tier3 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}">
                  ${acc.tier3 ? 'Đang mở' : 'Khóa/Ẩn mặc định'}
                </span>
              </div>
              <p class="text-[11px] text-slate-500">Trình bày toán học chặt chẽ kèm chú giải thuật ngữ tiếng Anh đối chiếu</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full ${acc.tier3 ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}">
              ${acc.tier3 ? 'Thu gọn Lời giải' : 'Mở xem Lời giải'}
            </span>
            ${chevronIcon(acc.tier3)}
          </div>
        </button>

        ${acc.tier3 ? `
          <div class="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3.5">
            <div class="p-3 bg-indigo-50/80 rounded-xl border border-indigo-200 text-xs text-indigo-950 font-medium">
              💡 <strong>Lưu ý sư phạm:</strong> Em chỉ nên đối chiếu nấc này sau khi đã tự viết lời giải của mình vào vở nháp.
            </div>

            <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-mono whitespace-pre-line shadow-2xs">
              ${d.full_solution}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 6: CẠM BẪY SAI LẦM PHỔ BIẾN -->
      <!-- ========================================================= -->
      <div class="glass-card rounded-2xl border border-amber-200 bg-white overflow-hidden shadow-xs transition-all">
        <button onclick="ScaffoldingTutor.toggleAccordion('pitfall')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-amber-50/30 transition-colors cursor-pointer">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold text-sm">⚠️</span>
            <div>
              <h4 class="text-sm sm:text-base font-bold text-slate-900">Cạm Bẫy Học Sinh Yếu Dễ Mắc Phải (Common Pitfalls)</h4>
              <p class="text-[11px] text-slate-500">Các lỗi sai kinh điển về dấu, tính chất và thuật ngữ cần tránh</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-xs text-amber-800 font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">Cảnh báo</span>
            ${chevronIcon(acc.pitfall)}
          </div>
        </button>

        ${acc.pitfall ? `
          <div class="px-5 pb-5 pt-1 border-t border-slate-100">
            <div class="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-900 leading-relaxed font-medium">
              ${d.common_pitfall}
            </div>
          </div>
        ` : ''}
      </div>

      <!-- ========================================================= -->
      <!-- ACCORDION 7: BÀI TẬP SONG HÀNH TỰ RÈN LUYỆN -->
      <!-- ========================================================= -->
      ${d.parallel_exercise ? `
        <div class="glass-card rounded-2xl border border-indigo-200 bg-white overflow-hidden shadow-xs transition-all">
          <button onclick="ScaffoldingTutor.toggleAccordion('parallel')" class="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-indigo-50/30 transition-colors cursor-pointer">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold text-sm">🚀</span>
              <div>
                <h4 class="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wide">Thử Thách Tự Lập: Bài Tập Song Hành (Parallel Practice)</h4>
                <p class="text-[11px] text-slate-500">Kiểm tra ngay mức độ làm chủ kiến thức sau khi dỡ bỏ giàn giáo</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-bold border border-indigo-200">Tự luyện</span>
              ${chevronIcon(acc.parallel)}
            </div>
          </button>

          ${acc.parallel ? `
            <div class="px-5 pb-5 pt-1 border-t border-slate-100 space-y-3.5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[11px] font-bold text-indigo-700 uppercase">🇬🇧 English:</span>
                    ${window.BilingualHelper ? window.BilingualHelper.renderInlinePill(d.parallel_exercise.question_en, d.parallel_exercise.question_vi) : ''}
                  </div>
                  <div class="text-xs sm:text-sm text-slate-900 font-medium leading-relaxed">${d.parallel_exercise.question_en}</div>
                </div>

                <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="text-[11px] font-bold text-emerald-700 uppercase mb-1">🇻🇳 Tiếng Việt:</div>
                  <div class="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">${d.parallel_exercise.question_vi}</div>
                </div>
              </div>

              <div class="pt-2 flex flex-wrap items-center gap-3">
                <div class="flex-1 min-w-[200px]">
                  <input type="text" id="scaffold-parallel-input" placeholder="Nhập đáp số của em (ví dụ: 7 hoặc 4/9)..." class="w-full px-4 py-2.5 glass-input rounded-xl text-xs sm:text-sm text-slate-900 font-mono">
                </div>
                <button onclick="ScaffoldingTutor.checkParallelAnswer()" class="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 hover:border-teal-300 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer">
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

  exportWord() {
    if (!this.currentData) {
      if (window.App && window.App.showToast) {
        window.App.showToast('Chưa có dữ liệu bài toán giàn giáo để xuất Word!');
      }
      return;
    }
    const preset = this.presets[this.currentPresetKey];
    const title = preset ? (preset.title || preset.grade || 'Toan_Song_Ngu') : 'Toan_Song_Ngu_Gian_Giao';
    if (window.Exporter && window.Exporter.exportScaffoldWord) {
      window.Exporter.exportScaffoldWord(this.currentData, title);
      if (window.App && window.App.showToast) {
        window.App.showToast('Đã tải xuống Phiếu Giàn Giáo file Word (.doc)!');
      }
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
