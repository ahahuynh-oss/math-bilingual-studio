/**
 * Sample Bilingual Math Lessons & Default Data
 * Math Bilingual Studio
 */

const SAMPLE_LESSONS = [
  {
    id: "derivatives-extrema",
    meta: {
      titleEn: "Derivatives and Extrema of Functions",
      titleVi: "Đạo hàm và Cực trị của Hàm số",
      grade: "Grade 12 / Calculus",
      duration: "45 minutes",
      teacher: "Math Bilingual Department",
      overviewEn: "Understand the mathematical definition of derivatives, Fermat's Theorem on critical points, and the First & Second Derivative Tests to classify local extrema.",
      overviewVi: "Nắm vững định nghĩa toán học của đạo hàm, định lý Fermat về điểm tới hạn, cùng quy tắc đạo hàm cấp 1 và cấp 2 để tìm cực trị của hàm số."
    },
    concepts: [
      {
        id: "c1",
        titleEn: "Definition of the Derivative",
        titleVi: "Định nghĩa Đạo hàm",
        latex: "f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0 + \\Delta x) - f(x_0)}{\\Delta x} = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}",
        descEn: "The derivative of a function $y = f(x)$ at $x_0$ represents the instantaneous rate of change and the geometric slope of the tangent line to the curve at $(x_0, f(x_0))$.",
        descVi: "Đạo hàm của hàm số $y = f(x)$ tại $x_0$ biểu diễn tốc độ thay đổi tức thời và về mặt hình học chính là hệ số góc của tiếp tuyến với đồ thị tại điểm $(x_0, f(x_0))$.",
        notesEn: "If $f'(x_0)$ exists, $f$ is said to be differentiable at $x_0$. Differentiability implies continuity.",
        notesVi: "Nếu $f'(x_0)$ tồn tại hữu hạn, ta nói $f$ khả vi tại $x_0$. Hàm số khả vi luôn liên tục tại điểm đó."
      },
      {
        id: "c2",
        titleEn: "Fermat's Theorem & Critical Points",
        titleVi: "Định lý Fermat và Điểm tới hạn",
        latex: "f'(c) = 0 \\quad \\text{or} \\quad f'(c) \\text{ is undefined}",
        descEn: "A critical point (hoặc điểm tới hạn) of $f$ is an interior point $c$ in the domain where either $f'(c) = 0$ or $f'(c)$ does not exist. Fermat's Theorem guarantees that if $f$ has a local extremum at $c$ and $f'(c)$ exists, then $f'(c) = 0$.",
        descVi: "Điểm tới hạn của hàm $f$ là điểm $c$ thuộc tập xác định sao cho $f'(c) = 0$ hoặc $f'(c)$ không xác định. Định lý Fermat khẳng định rằng nếu hàm số đạt cực trị địa phương tại $c$ và có đạo hàm tại đó thì $f'(c) = 0$.",
        notesEn: "Caution: $f'(c) = 0$ is a necessary condition, but NOT a sufficient condition (e.g., $f(x) = x^3$ at $x = 0$).",
        notesVi: "Lưu ý: $f'(c) = 0$ là điều kiện cần chứ CHƯA ĐỦ (ví dụ hàm $f(x) = x^3$ có $f'(0) = 0$ nhưng không đạt cực trị tại $0$)."
      },
      {
        id: "c3",
        titleEn: "First & Second Derivative Tests",
        titleVi: "Quy tắc Đạo hàm Cấp 1 & Cấp 2",
        latex: "\\begin{cases} f'(c) = 0 \\\\ f''(c) < 0 \\end{cases} \\implies \\text{Local Maximum}; \\quad \\begin{cases} f'(c) = 0 \\\\ f''(c) > 0 \\end{cases} \\implies \\text{Local Minimum}",
        descEn: "First Derivative Test: If $f'$ changes sign from positive to negative across $c$, $f(c)$ is a local maximum. If $f'$ changes from negative to positive, $f(c)$ is a local minimum.",
        descVi: "Quy tắc 1: Nếu $f'$ đổi dấu từ dương sang âm khi qua $c$, $f(c)$ là cực đại. Nếu đổi dấu từ âm sang dương, $f(c)$ là cực tiểu.",
        notesEn: "If $f''(c) = 0$, the Second Derivative Test is inconclusive, and you must fall back to the First Derivative Test.",
        notesVi: "Nếu $f''(c) = 0$, quy tắc đạo hàm cấp 2 không đưa ra kết luận, cần chuyển sang lập bảng xét dấu $f'(x)$."
      }
    ],
    vocabulary: [
      {
        id: "v1",
        term: "Derivative",
        ipa: "/dɪˈrɪv.ə.tɪv/",
        pos: "noun",
        meaningVi: "Đạo hàm",
        exampleEn: "The derivative of $x^3 - 3x$ is $3x^2 - 3$.",
        exampleVi: "Đạo hàm của $x^3 - 3x$ là $3x^2 - 3$."
      },
      {
        id: "v2",
        term: "Differentiable",
        ipa: "/ˌdɪf.əˈren.ʃi.ə.bəl/",
        pos: "adjective",
        meaningVi: "Khả vi (có đạo hàm)",
        exampleEn: "Every polynomial function is differentiable everywhere on $\\mathbb{R}$.",
        exampleVi: "Mọi hàm đa thức đều khả vi trên toàn trục số $\\mathbb{R}$."
      },
      {
        id: "v3",
        term: "Critical Point",
        ipa: "/ˈkrɪt.ɪ.kəl pɔɪnt/",
        pos: "noun",
        meaningVi: "Điểm tới hạn",
        exampleEn: "Setting $f'(x) = 0$ yields the critical points of the function.",
        exampleVi: "Giải phương trình $f'(x) = 0$ cho ta các điểm tới hạn của hàm số."
      },
      {
        id: "v4",
        term: "Local Extrema",
        ipa: "/ˈləʊ.kəl ɪkˈstriː.mə/",
        pos: "noun (plural)",
        meaningVi: "Các cực trị địa phương (cực đại & cực tiểu)",
        exampleEn: "The curve reaches its local extrema at $x = -1$ and $x = 1$.",
        exampleVi: "Đường cong đạt các cực trị địa phương tại $x = -1$ và $x = 1$."
      },
      {
        id: "v5",
        term: "Tangent Line",
        ipa: "/ˈtæn.dʒənt laɪn/",
        pos: "noun",
        meaningVi: "Đường tiếp tuyến",
        exampleEn: "The slope of the tangent line equals the derivative evaluated at the point of tangency.",
        exampleVi: "Hệ số góc của tiếp tuyến bằng giá trị đạo hàm tính tại tiếp điểm."
      },
      {
        id: "v6",
        term: "Inflection Point",
        ipa: "/ɪnˈflek.ʃən pɔɪnt/",
        pos: "noun",
        meaningVi: "Điểm uốn của đồ thị",
        exampleEn: "At an inflection point, the concavity of the curve changes and $f''(x) = 0$.",
        exampleVi: "Tại điểm uốn, đồ thị hàm số thay đổi bề lõm và $f''(x) = 0$ (hoặc đổi dấu)."
      }
    ],
    examples: [
      {
        id: "ex1",
        titleEn: "Finding Extrema of a Cubic Function",
        titleVi: "Tìm Cực trị của Hàm bậc ba",
        problemEn: "Find all local extrema of the function $f(x) = x^3 - 3x^2 - 9x + 5$ on the real line $\\mathbb{R}$.",
        problemVi: "Tìm tất cả các cực trị địa phương của hàm số $f(x) = x^3 - 3x^2 - 9x + 5$ trên tập số thực $\\mathbb{R}$.",
        steps: [
          {
            stepNum: 1,
            titleEn: "Compute the first derivative",
            titleVi: "Tính đạo hàm cấp 1",
            latex: "f'(x) = \\frac{d}{dx}(x^3 - 3x^2 - 9x + 5) = 3x^2 - 6x - 9",
            explanationEn: "Differentiate each power term using the power rule $\\frac{d}{dx}(x^n) = n x^{n-1}$.",
            explanationVi: "Lấy đạo hàm từng số hạng theo quy tắc lũy thừa $\\frac{d}{dx}(x^n) = n x^{n-1}$."
          },
          {
            stepNum: 2,
            titleEn: "Find critical points",
            titleVi: "Tìm các điểm tới hạn",
            latex: "3x^2 - 6x - 9 = 0 \\iff 3(x^2 - 2x - 3) = 0 \\iff 3(x-3)(x+1) = 0 \\implies x_1 = -1, \\; x_2 = 3",
            explanationEn: "Set $f'(x) = 0$ and factor the quadratic expression to solve for roots.",
            explanationVi: "Cho $f'(x) = 0$ và phân tích đa thức bậc hai thành nhân tử để giải nghiệm."
          },
          {
            stepNum: 3,
            titleEn: "Apply the Second Derivative Test",
            titleVi: "Áp dụng quy tắc đạo hàm cấp 2",
            latex: "f''(x) = 6x - 6 \\implies f''(-1) = -12 < 0 \\; (\\text{Max}); \\quad f''(3) = 12 > 0 \\; (\\text{Min})",
            explanationEn: "At $x = -1$, $f''(-1) < 0$ implies a local maximum with value $f(-1) = 10$. At $x = 3$, $f''(3) > 0$ implies a local minimum with value $f(3) = -22$.",
            explanationVi: "Tại $x = -1$, $f''(-1) = -12 < 0$ nên hàm đạt cực đại với $y_{CĐ} = 10$. Tại $x = 3$, $f''(3) = 12 > 0$ nên hàm đạt cực tiểu với $y_{CT} = -22$."
          }
        ]
      }
    ],
    visualizer: {
      type: "canvas-interactive", // canvas-interactive or geogebra
      geogebraId: "w2e7bvhq",
      preset: "cubic",
      paramA: 1,
      paramB: -3,
      paramC: -9,
      paramD: 5,
      formulaDisplay: "f(x) = ax^3 + bx^2 + cx + d"
    },
    quiz: {
      titleEn: "Mastery Quiz: Derivatives & Extrema",
      titleVi: "Bài Kiểm Tra Đánh Giá: Đạo hàm & Cực trị",
      timeMinutes: 20,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          points: 2.5,
          stemEn: "What are the coordinates of the local maximum point of the function $f(x) = -x^3 + 3x + 2$?",
          stemVi: "Tọa độ điểm cực đại của đồ thị hàm số $f(x) = -x^3 + 3x + 2$ là:",
          options: [
            { id: "A", text: "Point $(1, 4)$", isCorrect: true },
            { id: "B", text: "Point $(-1, 0)$", isCorrect: false },
            { id: "C", text: "Point $(0, 2)$", isCorrect: false },
            { id: "D", text: "Point $(1, 2)$", isCorrect: false }
          ],
          explanationEn: "First derivative $f'(x) = -3x^2 + 3 = -3(x^2 - 1) = 0 \\iff x = \\pm 1$. Since $f''(x) = -6x$, $f''(1) = -6 < 0$ (Local Max at $x=1$). Evaluating $f(1) = -(1)^3 + 3(1) + 2 = 4$. Thus, the local maximum is $(1, 4)$.",
          explanationVi: "Đạo hàm $f'(x) = -3x^2 + 3 = 0 \\iff x = \\pm 1$. Có $f''(x) = -6x \\implies f''(1) = -6 < 0$ (đạt cực đại tại $x = 1$). Giá trị $y = f(1) = 4$. Điểm cực đại là $(1, 4)$."
        },
        {
          id: "q2",
          type: "true-false-4",
          points: 4.0,
          stemEn: "Consider the function $f(x) = x^4 - 2x^2 + 3$ defined on $\\mathbb{R}$. Determine whether each of the following statements is True (Đúng) or False (Sai):",
          stemVi: "Cho hàm số $f(x) = x^4 - 2x^2 + 3$ xác định trên $\\mathbb{R}$. Xét tính Đúng / Sai của các mệnh đề sau:",
          propositions: [
            {
              id: "a",
              textEn: "The derivative of the function is $f'(x) = 4x^3 - 4x$.",
              textVi: "Đạo hàm của hàm số là $f'(x) = 4x^3 - 4x$.",
              isCorrect: true,
              explanationEn: "Differentiating $x^4 - 2x^2 + 3$ yields $4x^3 - 4x$. True.",
              explanationVi: "Đạo hàm từng số hạng: $(x^4)' = 4x^3$, $(-2x^2)' = -4x$, $(3)' = 0$. Mệnh đề Đúng."
            },
            {
              id: "b",
              textEn: "The equation $f'(x) = 0$ has exactly two distinct real roots.",
              textVi: "Phương trình $f'(x) = 0$ có đúng 2 nghiệm thực phân biệt.",
              isCorrect: false,
              explanationEn: "$4x(x^2 - 1) = 0 \\iff x = 0$ or $x = \\pm 1$. It has three distinct real roots. False.",
              explanationVi: "$4x(x^2 - 1) = 0$ cho 3 nghiệm phân biệt $x = -1, x = 0, x = 1$. Mệnh đề Sai."
            },
            {
              id: "c",
              textEn: "The function achieves a local maximum value equal to $3$ at $x = 0$.",
              textVi: "Hàm số đạt giá trị cực đại bằng $3$ tại điểm $x = 0$.",
              isCorrect: true,
              explanationEn: "$f'(x)$ changes sign from positive to negative when passing through $x = 0$. $f(0) = 3$. True.",
              explanationVi: "Qua $x = 0$, $f'(x)$ đổi dấu từ dương sang âm, $f(0) = 3$. Mệnh đề Đúng."
            },
            {
              id: "d",
              textEn: "The minimum value of the function on $\\mathbb{R}$ is $1$.",
              textVi: "Giá trị nhỏ nhất của hàm số trên $\\mathbb{R}$ là $1$.",
              isCorrect: false,
              explanationEn: "Local minima occur at $x = \\pm 1$, giving $f(\\pm 1) = 1 - 2 + 3 = 2 \\ne 1$. False.",
              explanationVi: "Tại hai điểm cực tiểu $x = \\pm 1$, ta có $f(\\pm 1) = 1^4 - 2(1)^2 + 3 = 2 \\ne 1$. Mệnh đề Sai."
            }
          ]
        },
        {
          id: "q3",
          type: "short-answer",
          points: 3.5,
          stemEn: "Let $f(x) = \\frac{1}{3}x^3 - 2x^2 + 3x + 1$. Find the product of the two critical points $x_1$ and $x_2$ of $f(x)$.",
          stemVi: "Cho hàm số $f(x) = \\frac{1}{3}x^3 - 2x^2 + 3x + 1$. Tính tích hai điểm cực trị $x_1 \\cdot x_2$ của hàm số đã cho.",
          correctAnswer: "3",
          acceptableAnswers: ["3", "3.0", "+3"],
          tolerance: 0.01,
          explanationEn: "Derivative $f'(x) = x^2 - 4x + 3 = 0$. By Vieta's theorem or factoring $(x-1)(x-3) = 0$, the critical points are $x_1 = 1$ and $x_2 = 3$. Their product is $1 \\times 3 = 3$.",
          explanationVi: "Ta có $f'(x) = x^2 - 4x + 3$. Phương trình $f'(x) = 0$ có hai nghiệm là $x_1 = 1$ và $x_2 = 3$. Do đó tích $x_1 \\cdot x_2 = 1 \\cdot 3 = 3$."
        }
      ]
    }
  },
  {
    id: "vectors-3d",
    meta: {
      titleEn: "Vectors and Dot Product in 3D Space",
      titleVi: "Vectơ và Tích vô hướng trong Không gian Oxyz",
      grade: "Grade 12 / Analytic Geometry",
      duration: "45 minutes",
      teacher: "Math Bilingual Department",
      overviewEn: "Master vectors in Cartesian coordinate system $Oxyz$, dot product formula, angle between vectors, and orthogonality condition.",
      overviewVi: "Nắm vững hệ tọa độ Descartes $Oxyz$, công thức tích vô hướng, góc giữa hai vectơ và điều kiện vuông góc."
    },
    concepts: [
      {
        id: "vc1",
        titleEn: "Dot Product & Magnitude",
        titleVi: "Tích Vô hướng & Độ dài Vectơ",
        latex: "\\vec{u} \\cdot \\vec{v} = |\\vec{u}| |\\vec{v}| \\cos(\\theta) = u_1 v_1 + u_2 v_2 + u_3 v_3",
        descEn: "The dot product (scalar product) of two vectors yields a scalar. It allows calculating lengths and angles in 3D geometry.",
        descVi: "Tích vô hướng của hai vectơ trả về một số vô hướng, là công cụ then chốt để tính khoảng cách, độ dài và góc trong không gian.",
        notesEn: "Condition for orthogonality: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$.",
        notesVi: "Điều kiện vuông góc: $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$ (với các vectơ khác $\\vec{0}$)."
      }
    ],
    vocabulary: [
      {
        id: "vv1",
        term: "Dot Product",
        ipa: "/dɒt ˈprɒd.ʌkt/",
        pos: "noun",
        meaningVi: "Tích vô hướng",
        exampleEn: "The dot product of perpendicular vectors is always zero.",
        exampleVi: "Tích vô hướng của hai vectơ vuông góc luôn bằng không."
      },
      {
        id: "vv2",
        term: "Magnitude",
        ipa: "/ˈmæɡ.nɪ.tʃuːd/",
        pos: "noun",
        meaningVi: "Độ dài / Độ lớn của vectơ",
        exampleEn: "The magnitude of vector $\\vec{v} = (1, 2, 2)$ is $\\sqrt{1+4+4} = 3$.",
        exampleVi: "Độ dài của vectơ $\\vec{v} = (1, 2, 2)$ là $\\sqrt{1+4+4} = 3$."
      },
      {
        id: "vv3",
        term: "Orthogonal",
        ipa: "/ɔːˈθɒɡ.ən.əl/",
        pos: "adjective",
        meaningVi: "Vuông góc (trực giao)",
        exampleEn: "Vectors $\\vec{u}$ and $\\vec{v}$ are orthogonal if their dot product vanishes.",
        exampleVi: "Hai vectơ $\\vec{u}$ và $\\vec{v}$ trực giao khi tích vô hướng của chúng bằng $0$."
      }
    ],
    examples: [
      {
        id: "vex1",
        titleEn: "Calculating Angle Between Two 3D Vectors",
        titleVi: "Tính Góc Giữa Hai Vectơ Trong Không Gian",
        problemEn: "Given $\\vec{u} = (1, 0, 1)$ and $\\vec{v} = (0, 1, 1)$, calculate the cosine of the angle $\\theta$ between them.",
        problemVi: "Cho $\\vec{u} = (1, 0, 1)$ và $\\vec{v} = (0, 1, 1)$, tính cosin của góc $\\theta$ giữa hai vectơ này.",
        steps: [
          {
            stepNum: 1,
            titleEn: "Compute dot product",
            titleVi: "Tính tích vô hướng",
            latex: "\\vec{u} \\cdot \\vec{v} = 1(0) + 0(1) + 1(1) = 1",
            explanationEn: "Sum of products of corresponding components.",
            explanationVi: "Tổng các tích của tọa độ tương ứng."
          },
          {
            stepNum: 2,
            titleEn: "Compute magnitudes",
            titleVi: "Tính độ dài các vectơ",
            latex: "|\\vec{u}| = \\sqrt{1^2 + 0^2 + 1^2} = \\sqrt{2}, \\quad |\\vec{v}| = \\sqrt{0^2 + 1^2 + 1^2} = \\sqrt{2}",
            explanationEn: "Norm is the square root of sum of squares.",
            explanationVi: "Độ dài là căn bậc hai của tổng bình phương tọa độ."
          },
          {
            stepNum: 3,
            titleEn: "Apply cosine formula",
            titleVi: "Áp dụng công thức cosin",
            latex: "\\cos(\\theta) = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}| |\\vec{v}|} = \\frac{1}{\\sqrt{2} \\cdot \\sqrt{2}} = \\frac{1}{2} \\implies \\theta = 60^\\circ",
            explanationEn: "Thus the angle between the two vectors is $\\frac{\\pi}{3}$ or $60^\\circ$.",
            explanationVi: "Do đó góc giữa hai vectơ là $60^\\circ$."
          }
        ]
      }
    ],
    visualizer: {
      type: "geogebra",
      geogebraId: "w2e7bvhq",
      preset: "3d-space",
      formulaDisplay: "\\vec{u} = (1, 0, 1), \\; \\vec{v} = (0, 1, 1)"
    },
    quiz: {
      titleEn: "Quiz: 3D Vector Geometry",
      titleVi: "Kiểm tra: Vectơ trong Không gian Oxyz",
      timeMinutes: 15,
      questions: [
        {
          id: "vq1",
          type: "multiple-choice",
          points: 3.0,
          stemEn: "Given $\\vec{a} = (2, -1, 3)$ and $\\vec{b} = (1, 3, -1)$, find the value of $\\vec{a} \\cdot \\vec{b}$.",
          stemVi: "Cho $\\vec{a} = (2, -1, 3)$ và $\\vec{b} = (1, 3, -1)$, giá trị của tích vô hướng $\\vec{a} \\cdot \\vec{b}$ là:",
          options: [
            { id: "A", text: "$-4$", isCorrect: true },
            { id: "B", text: "$2$", isCorrect: false },
            { id: "C", text: "$4$", isCorrect: false },
            { id: "D", text: "$-2$", isCorrect: false }
          ],
          explanationEn: "$\\vec{a} \\cdot \\vec{b} = 2(1) + (-1)(3) + 3(-1) = 2 - 3 - 3 = -4$. Correct is A.",
          explanationVi: "$\\vec{a} \\cdot \\vec{b} = 2 \\cdot 1 + (-1) \\cdot 3 + 3 \\cdot (-1) = 2 - 3 - 3 = -4$. Đáp án đúng là A."
        },
        {
          id: "vq2",
          type: "short-answer",
          points: 3.5,
          stemEn: "Find the real parameter $m$ such that $\\vec{u} = (m, 2, -1)$ is perpendicular to $\\vec{v} = (3, -1, 4)$.",
          stemVi: "Tìm tham số thực $m$ để vectơ $\\vec{u} = (m, 2, -1)$ vuông góc với vectơ $\\vec{v} = (3, -1, 4)$.",
          correctAnswer: "2",
          acceptableAnswers: ["2", "+2", "2.0"],
          tolerance: 0.01,
          explanationEn: "$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0 \\iff 3m + 2(-1) + (-1)(4) = 0 \\iff 3m - 6 = 0 \\implies m = 2$.",
          explanationVi: "$\\vec{u} \\perp \\vec{v} \\iff 3m - 2 - 4 = 0 \\iff 3m = 6 \\iff m = 2$."
        }
      ]
    }
  }
];

// Helper to get clone of current active lesson
function getDefaultLesson() {
  return JSON.parse(JSON.stringify(SAMPLE_LESSONS[0]));
}
