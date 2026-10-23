/**
 * AI & Smart Document Auto-Generation Module
 * Math Bilingual Studio
 */

var AIGenerator = window.AIGenerator = {
  // Built-in Curriculum Library for instant smart generation
  curriculumDatabase: {
    "integrals-calculus": {
      id: "integrals-calculus",
      meta: {
        titleEn: "Definite Integrals and Area Calculation",
        titleVi: "Tích Phân Xác Định và Ứng Dụng Tính Diện Tích",
        grade: "Grade 12 / Calculus",
        duration: "45 minutes",
        teacher: "Math Bilingual Department",
        overviewEn: "Master the Fundamental Theorem of Calculus, integration by substitution and parts, and calculating the area of planar regions bounded by curves.",
        overviewVi: "Nắm vững định lý cơ bản của giải tích, các phương pháp đổi biến, tích phân từng phần và tính diện tích hình phẳng giới hạn bởi các đường cong."
      },
      concepts: [
        {
          id: "ci-1",
          titleEn: "Fundamental Theorem of Calculus (Newton-Leibniz Formula)",
          titleVi: "Định lý Cơ bản của Giải tích (Công thức Newton-Leibniz)",
          latex: "\\int_{a}^{b} f(x)\\,dx = F(b) - F(a) = \\left[ F(x) \\right]_{a}^{b}",
          descEn: "If $f$ is continuous on $[a, b]$ and $F$ is an antiderivative of $f$ on $[a, b]$, then the definite integral equals the difference between $F(b)$ and $F(a)$.",
          descVi: "Nếu hàm số $f$ liên tục trên $[a, b]$ và $F$ là một nguyên hàm của $f$ trên $[a, b]$, thì tích phân xác định bằng hiệu số giữa $F(b)$ và $F(a)$.",
          notesEn: "The integral represents the net signed area between $y = f(x)$ and the $x$-axis from $x = a$ to $x = b$.",
          notesVi: "Hình học: Tích phân biểu diễn diện tích có dấu của hình thang cong giới hạn bởi đồ thị $y = f(x)$ và trục hoành."
        },
        {
          id: "ci-2",
          titleEn: "Area Between Two Curves",
          titleVi: "Diện Tích Hình Phẳng Giới Hạn Bởi Hai Đường Cong",
          latex: "S = \\int_{a}^{b} |f(x) - g(x)|\\,dx",
          descEn: "The area of the region bounded by curves $y = f(x)$, $y = g(x)$ and vertical lines $x = a, x = b$ is calculated by integrating the absolute difference.",
          descVi: "Diện tích hình phẳng giới hạn bởi đồ thị hai hàm số $y = f(x), y = g(x)$ và hai đường thẳng $x = a, x = b$ được tính bằng tích phân của giá trị tuyệt đối hiệu hai hàm số.",
          notesEn: "To remove the absolute value bars, find the intersection points where $f(x) = g(x)$ on $[a, b]$.",
          notesVi: "Để phá dấu giá trị tuyệt đối, cần giải phương trình hoành độ giao điểm $f(x) = g(x)$ trên đoạn $[a, b]$."
        }
      ],
      vocabulary: [
        {
          id: "vi-1",
          term: "Definite Integral",
          ipa: "/ˈdef.ɪ.nət ˈɪn.tɪ.ɡrəl/",
          pos: "noun",
          meaningVi: "Tích phân xác định",
          exampleEn: "The definite integral calculates the accumulation of quantities.",
          exampleVi: "Tích phân xác định tính tổng tích lũy của một đại lượng."
        },
        {
          id: "vi-2",
          term: "Antiderivative",
          ipa: "/ˌæn.ti.dɪˈrɪv.ə.tɪv/",
          pos: "noun",
          meaningVi: "Nguyên hàm",
          exampleEn: "$F(x) = x^3$ is an antiderivative of $f(x) = 3x^2$.",
          exampleVi: "$F(x) = x^3$ là một nguyên hàm của $f(x) = 3x^2$."
        },
        {
          id: "vi-3",
          term: "Integration by Parts",
          ipa: "/ˌɪn.tɪˈɡreɪ.ʃən baɪ pɑːts/",
          pos: "noun phrase",
          meaningVi: "Phương pháp tích phân từng phần",
          exampleEn: "We apply integration by parts $\\int u\\,dv = uv - \\int v\\,du$.",
          exampleVi: "Ta áp dụng công thức tích phân từng phần $\\int u\\,dv = uv - \\int v\\,du$."
        },
        {
          id: "vi-4",
          term: "Bounded Region",
          ipa: "/ˈbaʊn.dɪd ˈriː.dʒən/",
          pos: "noun",
          meaningVi: "Hình phẳng bị giới hạn (miền đóng)",
          exampleEn: "Compute the area of the region bounded by $y = x^2$ and $y = 2x$.",
          exampleVi: "Tính diện tích hình phẳng bị giới hạn bởi $y = x^2$ và $y = 2x$."
        }
      ],
      examples: [
        {
          id: "exi-1",
          titleEn: "Calculating Area Between Parabola and Line",
          titleVi: "Tính Diện Tích Giới Hạn Bởi Parabol và Đường Thẳng",
          problemEn: "Find the area of the planar region bounded by the parabola $y = x^2$ and the line $y = 2x$.",
          problemVi: "Tính diện tích hình phẳng giới hạn bởi parabol $y = x^2$ và đường thẳng $y = 2x$.",
          steps: [
            {
              stepNum: 1,
              titleEn: "Find intersection points",
              titleVi: "Tìm hoành độ giao điểm",
              latex: "x^2 = 2x \\iff x(x - 2) = 0 \\implies x_1 = 0, \\; x_2 = 2",
              explanationEn: "Equate the two functions to determine the limits of integration $[0, 2]$.",
              explanationVi: "Lập phương trình hoành độ giao điểm để tìm cận tích phân $[0, 2]$."
            },
            {
              stepNum: 2,
              titleEn: "Set up the definite integral",
              titleVi: "Thiết lập biểu thức tích phân",
              latex: "S = \\int_{0}^{2} (2x - x^2)\\,dx",
              explanationEn: "On the interval $[0, 2]$, the line $y = 2x$ lies above the parabola $y = x^2$, so $2x - x^2 \\ge 0$.",
              explanationVi: "Trên đoạn $[0, 2]$, đường thẳng $y = 2x$ nằm phía trên parabol $y = x^2$ nên biểu thức luôn dương."
            },
            {
              stepNum: 3,
              titleEn: "Evaluate the integral",
              titleVi: "Tính giá trị tích phân",
              latex: "S = \\left[ x^2 - \\frac{x^3}{3} \\right]_{0}^{2} = \\left( 4 - \\frac{8}{3} \\right) - 0 = \\frac{4}{3} \\approx 1.33",
              explanationEn: "Use the power rule for integration to get the final area $\\frac{4}{3}$ square units.",
              explanationVi: "Lấy nguyên hàm và thay cận Newton-Leibniz để được diện tích là $\\frac{4}{3}$ đơn vị diện tích."
            }
          ]
        }
      ],
      visualizer: {
        type: "canvas-interactive",
        preset: "integral",
        paramA: 1,
        paramB: -2,
        paramC: 0,
        formulaDisplay: "S = \\int_{0}^{2} (2x - x^2)\\,dx = \\frac{4}{3}"
      },
      quiz: {
        titleEn: "Assessment Quiz: Integrals and Area Calculation",
        titleVi: "Bài Kiểm Tra Đánh Giá: Tích Phân & Ứng Dụng",
        timeMinutes: 20,
        questions: [
          {
            id: "qi-1",
            type: "multiple-choice",
            points: 2.5,
            stemEn: "Evaluate the definite integral $I = \\int_{0}^{1} (3x^2 + 2x)\\,dx$.",
            stemVi: "Tính giá trị của tích phân xác định $I = \\int_{0}^{1} (3x^2 + 2x)\\,dx$.",
            options: [
              { id: "A", text: "$2$", isCorrect: true },
              { id: "B", text: "$3$", isCorrect: false },
              { id: "C", text: "$1$", isCorrect: false },
              { id: "D", text: "$5$", isCorrect: false }
            ],
            explanationEn: "$I = \\left[ x^3 + x^2 \\right]_{0}^{1} = (1 + 1) - 0 = 2$. Correct is A.",
            explanationVi: "Nguyên hàm là $F(x) = x^3 + x^2$. Thay cận: $F(1) - F(0) = 2 - 0 = 2$."
          },
          {
            id: "qi-2",
            type: "true-false-4",
            points: 4.0,
            stemEn: "Consider the integral $I = \\int_{1}^{e} \\frac{\\ln(x)}{x}\\,dx$. Determine whether each statement is True or False:",
            stemVi: "Cho tích phân $I = \\int_{1}^{e} \\frac{\\ln(x)}{x}\\,dx$. Xét tính Đúng / Sai của các mệnh đề sau:",
            propositions: [
              {
                id: "a",
                textEn: "Using substitution $u = \\ln(x)$, we have $du = \\frac{1}{x}\\,dx$.",
                textVi: "Đặt ẩn phụ $u = \\ln(x)$, ta có vi phân $du = \\frac{1}{x}\\,dx$.",
                isCorrect: true,
                explanationEn: "Differentiating $\\ln(x)$ gives $\\frac{1}{x}$. True.",
                explanationVi: "Đạo hàm của hàm $\\ln(x)$ là $\\frac{1}{x}$. Mệnh đề Đúng."
              },
              {
                id: "b",
                textEn: "The transformed limits of integration are $u = 0$ to $u = 1$.",
                textVi: "Đổi cận theo biến mới: khi $x = 1 \\implies u = 0$, khi $x = e \\implies u = 1$.",
                isCorrect: true,
                explanationEn: "$\\ln(1) = 0$ and $\\ln(e) = 1$. True.",
                explanationVi: "$\\ln(1) = 0$ và $\\ln(e) = 1$. Mệnh đề Đúng."
              },
              {
                id: "c",
                textEn: "The transformed integral is $\\int_{0}^{1} u^2\\,du$.",
                textVi: "Tích phân mới sau khi đổi biến là $\\int_{0}^{1} u^2\\,du$.",
                isCorrect: false,
                explanationEn: "The integral becomes $\\int_{0}^{1} u\\,du$, not $u^2$. False.",
                explanationVi: "Tích phân biến đổi thành $\\int_{0}^{1} u\\,du$. Mệnh đề Sai."
              },
              {
                id: "d",
                textEn: "The final value of $I$ is $\\frac{1}{2}$.",
                textVi: "Giá trị chính xác của tích phân $I$ bằng $\\frac{1}{2}$.",
                isCorrect: true,
                explanationEn: "$\\left[ \\frac{u^2}{2} \\right]_{0}^{1} = \\frac{1}{2}$. True.",
                explanationVi: "Nguyên hàm $\\frac{u^2}{2}$ thế cận từ $0$ đến $1$ bằng $\\frac{1}{2}$. Mệnh đề Đúng."
              }
            ]
          },
          {
            id: "qi-3",
            type: "short-answer",
            points: 3.5,
            stemEn: "Find the area of the region bounded by $y = 3x^2$, the $x$-axis, and the vertical lines $x = 1$ and $x = 2$.",
            stemVi: "Tính diện tích hình phẳng giới hạn bởi đường cong $y = 3x^2$, trục hoành $Ox$, và hai đường thẳng $x = 1, x = 2$.",
            correctAnswer: "7",
            acceptableAnswers: ["7", "7.0", "+7"],
            tolerance: 0.01,
            explanationEn: "$S = \\int_{1}^{2} 3x^2\\,dx = \\left[ x^3 \\right]_{1}^{2} = 8 - 1 = 7$.",
            explanationVi: "Diện tích $S = \\int_{1}^{2} 3x^2\\,dx = \\left[ x^3 \\right]_{1}^{2} = 2^3 - 1^3 = 7$."
          }
        ]
      }
    },

    "probability-statistics": {
      id: "probability-statistics",
      meta: {
        titleEn: "Classical Probability and Conditional Events",
        titleVi: "Xác Suất Cổ Điển và Biến Cố Có Điều Kiện",
        grade: "Grade 11 / 12 Probability",
        duration: "45 minutes",
        teacher: "Math Bilingual Department",
        overviewEn: "Master sample spaces, classical probability formulas, mutually exclusive events, independent events, and conditional probability Bayes rule.",
        overviewVi: "Nắm vững không gian mẫu, công thức xác suất cổ điển, biến cố xung khắc, biến cố độc lập và xác suất có điều kiện."
      },
      concepts: [
        {
          id: "cp-1",
          titleEn: "Classical Probability Definition",
          titleVi: "Định nghĩa Xác suất Cổ điển",
          latex: "P(A) = \\frac{n(A)}{n(\\Omega)} = \\frac{|A|}{|\\Omega|}, \\quad 0 \\le P(A) \\le 1",
          descEn: "If the sample space $\\Omega$ is finite and all elementary outcomes are equally likely, the probability of event $A$ is the ratio of favorable outcomes to total outcomes.",
          descVi: "Trong không gian mẫu hữu hạn $\\Omega$ đồng khả năng, xác suất xảy ra biến cố $A$ là tỉ số giữa số kết quả thuận lợi cho $A$ và tổng số phần tử của không gian mẫu.",
          notesEn: "$P(\\emptyset) = 0$, $P(\\Omega) = 1$, and $P(\\overline{A}) = 1 - P(A)$.",
          notesVi: "Xác suất biến cố không thể bằng $0$, biến cố chắc chắn bằng $1$, và xác suất biến cố đối $P(\\overline{A}) = 1 - P(A)$."
        },
        {
          id: "cp-2",
          titleEn: "Conditional Probability & Multiplication Rule",
          titleVi: "Xác Suất Có Điều Kiện & Quy Tắc Nhân",
          latex: "P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} \\iff P(A \\cap B) = P(B) \\cdot P(A \\mid B)",
          descEn: "The probability of event $A$ occurring given that event $B$ has already occurred ($P(B) > 0$). If $A$ and $B$ are independent, then $P(A \\mid B) = P(A)$.",
          descVi: "Xác suất của biến cố $A$ khi biết biến cố $B$ đã xảy ra. Nếu $A$ và $B$ độc lập thì $P(A \\cap B) = P(A) \\cdot P(B)$.",
          notesEn: "Independence is symmetric: $A$ is independent of $B \\iff B$ is independent of $A$.",
          notesVi: "Tính độc lập có tính đối xứng: $A$ độc lập với $B \\iff B$ độc lập với $A$."
        }
      ],
      vocabulary: [
        {
          id: "vp-1",
          term: "Sample Space",
          ipa: "/ˈsɑːm.pəl speɪs/",
          pos: "noun",
          meaningVi: "Không gian mẫu (tập hợp tất cả kết quả có thể)",
          exampleEn: "The sample space of rolling a die is $\\Omega = \\{1, 2, 3, 4, 5, 6\\}$.",
          exampleVi: "Không gian mẫu khi gieo một con xúc xắc là $\\Omega = \\{1, 2, 3, 4, 5, 6\\}$."
        },
        {
          id: "vp-2",
          term: "Mutually Exclusive Events",
          ipa: "/ˈmjuː.tʃu.ə.li ɪkˈskluː.sɪv ɪˈvents/",
          pos: "noun phrase",
          meaningVi: "Các biến cố xung khắc",
          exampleEn: "If $A \\cap B = \\emptyset$, the events are mutually exclusive.",
          exampleVi: "Nếu $A \\cap B = \\emptyset$, hai biến cố này xung khắc nhau."
        },
        {
          id: "vp-3",
          term: "Conditional Probability",
          ipa: "/kənˈdɪʃ.ən.əl ˌprɒb.əˈbɪl.ə.ti/",
          pos: "noun",
          meaningVi: "Xác suất có điều kiện",
          exampleEn: "Conditional probability updates our beliefs when new evidence emerges.",
          exampleVi: "Xác suất có điều kiện giúp cập nhật đánh giá khi có thông tin mới."
        }
      ],
      examples: [
        {
          id: "exp-1",
          titleEn: "Drawing Marbles Without Replacement",
          titleVi: "Rút Bi Không Hoàn Lại Trong Hộp",
          problemEn: "A bag contains 5 red balls and 3 blue balls. If two balls are drawn at random without replacement, find the probability that both balls are red.",
          problemVi: "Một túi chứa 5 viên bi đỏ và 3 viên bi xanh. Lấy ngẫu nhiên lần lượt 2 viên bi không hoàn lại. Tính xác suất để cả 2 viên bi đều là màu đỏ.",
          steps: [
            {
              stepNum: 1,
              titleEn: "Calculate total outcomes",
              titleVi: "Tính số phần tử không gian mẫu",
              latex: "n(\\Omega) = C_{8}^{2} = \\frac{8 \\times 7}{2} = 28",
              explanationEn: "Total ways to choose 2 balls from 8 balls in the bag.",
              explanationVi: "Số cách chọn ngẫu nhiên 2 viên bi trong tổng số 8 viên bi là tổ hợp $C_8^2 = 28$."
            },
            {
              stepNum: 2,
              titleEn: "Calculate favorable outcomes",
              titleVi: "Tính số kết quả thuận lợi",
              latex: "n(A) = C_{5}^{2} = \\frac{5 \\times 4}{2} = 10",
              explanationEn: "Number of ways to choose 2 red balls from 5 red balls.",
              explanationVi: "Số cách chọn 2 viên bi đỏ từ 5 viên bi đỏ là $C_5^2 = 10$."
            },
            {
              stepNum: 3,
              titleEn: "Compute probability",
              titleVi: "Tính xác suất biến cố",
              latex: "P(A) = \\frac{n(A)}{n(\\Omega)} = \\frac{10}{28} = \\frac{5}{14} \\approx 0.357",
              explanationEn: "The required probability is $\\frac{5}{14}$.",
              explanationVi: "Xác suất cần tìm là $P(A) = \\frac{10}{28} = \\frac{5}{14}$."
            }
          ]
        }
      ],
      visualizer: {
        type: "canvas-interactive",
        preset: "probability",
        formulaDisplay: "P(A \\cap B) = P(A) \\cdot P(B \\mid A)"
      },
      quiz: {
        titleEn: "Mastery Quiz: Probability Theory",
        titleVi: "Bài Kiểm Tra: Lý Thuyết Xác Suất",
        timeMinutes: 20,
        questions: [
          {
            id: "qp-1",
            type: "multiple-choice",
            points: 3.0,
            stemEn: "A fair 6-sided die is rolled once. What is the probability of obtaining an even prime number?",
            stemVi: "Gieo một con xúc xắc cân đối 6 mặt một lần. Xác suất để xuất hiện một số nguyên tố chẵn là:",
            options: [
              { id: "A", text: "$\\frac{1}{6}$", isCorrect: true },
              { id: "B", text: "$\\frac{1}{2}$", isCorrect: false },
              { id: "C", text: "$\\frac{1}{3}$", isCorrect: false },
              { id: "D", text: "$0$", isCorrect: false }
            ],
            explanationEn: "The only even prime number on a die is $2$. Hence $P = \\frac{1}{6}$.",
            explanationVi: "Số nguyên tố chẵn duy nhất từ 1 đến 6 là số $2$. Do đó xác suất là $\\frac{1}{6}$."
          },
          {
            id: "qp-2",
            type: "short-answer",
            points: 3.5,
            stemEn: "Let $A$ and $B$ be independent events with $P(A) = 0.4$ and $P(B) = 0.5$. Calculate the union probability $P(A \\cup B)$.",
            stemVi: "Cho hai biến cố độc lập $A$ và $B$ thỏa mãn $P(A) = 0.4$ và $P(B) = 0.5$. Tính xác suất hợp $P(A \\cup B)$.",
            correctAnswer: "0.7",
            acceptableAnswers: ["0.7", "0.70", "7/10"],
            tolerance: 0.01,
            explanationEn: "$P(A \\cap B) = 0.4 \\times 0.5 = 0.2$. Thus $P(A \\cup B) = P(A) + P(B) - P(A \\cap B) = 0.4 + 0.5 - 0.2 = 0.7$.",
            explanationVi: "Vì $A, B$ độc lập nên $P(A \\cap B) = 0.4 \\cdot 0.5 = 0.2$. Khi đó $P(A \\cup B) = 0.4 + 0.5 - 0.2 = 0.7$."
          }
        ]
      }
    },

    "complex-numbers": {
      id: "complex-numbers",
      meta: {
        titleEn: "Complex Numbers and the Argand Plane",
        titleVi: "Số Phức và Mặt Phẳng Tọa Độ Phức Argand",
        grade: "Grade 12 / Algebra",
        duration: "45 minutes",
        teacher: "Math Bilingual Department",
        overviewEn: "Understand imaginary unit $i$, algebraic form $z = a + bi$, modulus, conjugate, and geometric representation of complex numbers.",
        overviewVi: "Nắm vững đơn vị ảo $i$, dạng đại số $z = a + bi$, môđun, số phức liên hợp và biểu diễn hình học của số phức."
      },
      concepts: [
        {
          id: "cc-1",
          titleEn: "Algebraic Form & Conjugate",
          titleVi: "Dạng Đại Số & Số Phức Liên Hợp",
          latex: "z = a + bi \\implies \\overline{z} = a - bi, \\quad |z| = \\sqrt{a^2 + b^2}",
          descEn: "Every complex number consists of a real part $\\text{Re}(z) = a$ and an imaginary part $\\text{Im}(z) = b$, with imaginary unit $i^2 = -1$.",
          descVi: "Mỗi số phức gồm phần thực $a$ và phần ảo $b$, với đơn vị ảo quy ước $i^2 = -1$.",
          notesEn: "$z \\cdot \\overline{z} = a^2 + b^2 = |z|^2$ is always a non-negative real number.",
          notesVi: "Tích $z \\cdot \\overline{z} = a^2 + b^2 = |z|^2$ luôn là một số thực không âm."
        }
      ],
      vocabulary: [
        {
          id: "vc-1",
          term: "Imaginary Unit",
          ipa: "/ɪˈmædʒ.ɪ.nər.i ˈjuː.nɪt/",
          pos: "noun",
          meaningVi: "Đơn vị ảo ($i$ với $i^2 = -1$)",
          exampleEn: "The imaginary unit satisfies $i^2 = -1$.",
          exampleVi: "Đơn vị ảo thỏa mãn $i^2 = -1$."
        },
        {
          id: "vc-2",
          term: "Complex Conjugate",
          ipa: "/ˈkɒm.pleks ˈkɒn.dʒʊ.ɡeɪt/",
          pos: "noun",
          meaningVi: "Số phức liên hợp",
          exampleEn: "The conjugate of $3 + 4i$ is $3 - 4i$.",
          exampleVi: "Số phức liên hợp của $3 + 4i$ là $3 - 4i$."
        },
        {
          id: "vc-3",
          term: "Modulus",
          ipa: "/ˈmɒdʒ.ə.ləs/",
          pos: "noun",
          meaningVi: "Môđun (độ lớn) của số phức",
          exampleEn: "The modulus represents distance to origin.",
          exampleVi: "Môđun biểu diễn khoảng cách từ điểm biểu diễn đến gốc tọa độ."
        }
      ],
      examples: [
        {
          id: "exc-1",
          titleEn: "Finding Modulus and Inverting Complex Numbers",
          titleVi: "Tính Môđun và Tìm Số Phức Nghịch Đảo",
          problemEn: "Given $z = 3 - 4i$, calculate its modulus $|z|$ and write the inverse $\\frac{1}{z}$ in standard form $a + bi$.",
          problemVi: "Cho số phức $z = 3 - 4i$, tính môđun $|z|$ và viết số phức nghịch đảo $\\frac{1}{z}$ dưới dạng đại số $a + bi$.",
          steps: [
            {
              stepNum: 1,
              titleEn: "Compute modulus",
              titleVi: "Tính môđun",
              latex: "|z| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = 5",
              explanationEn: "Norm is the square root of sum of squares.",
              explanationVi: "Môđun bằng căn bậc hai của tổng bình phương phần thực và phần ảo."
            },
            {
              stepNum: 2,
              titleEn: "Compute inverse",
              titleVi: "Tính số phức nghịch đảo",
              latex: "\\frac{1}{z} = \\frac{\\overline{z}}{|z|^2} = \\frac{3 + 4i}{25} = \\frac{3}{25} + \\frac{4}{25}i",
              explanationEn: "Multiply numerator and denominator by conjugate.",
              explanationVi: "Nhân cả tử và mẫu với số phức liên hợp $\\overline{z} = 3 + 4i$."
            }
          ]
        }
      ],
      visualizer: {
        type: "canvas-interactive",
        preset: "complex",
        formulaDisplay: "z = x + yi, \\quad |z| = \\sqrt{x^2 + y^2}"
      },
      quiz: {
        titleEn: "Quiz: Complex Numbers",
        titleVi: "Kiểm tra: Số phức",
        timeMinutes: 15,
        questions: [
          {
            id: "qc-1",
            type: "multiple-choice",
            points: 3.5,
            stemEn: "What is the modulus of the complex number $z = (1 + i)(2 - i)$?",
            stemVi: "Môđun của số phức $z = (1 + i)(2 - i)$ bằng:",
            options: [
              { id: "A", text: "$\\sqrt{10}$", isCorrect: true },
              { id: "B", text: "$10$", isCorrect: false },
              { id: "C", text: "$\\sqrt{5}$", isCorrect: false },
              { id: "D", text: "$5$", isCorrect: false }
            ],
            explanationEn: "$|z| = |1+i| \\cdot |2-i| = \\sqrt{2} \\cdot \\sqrt{5} = \\sqrt{10}$.",
            explanationVi: "Sử dụng tính chất tích môđun: $|z| = |1+i| \\cdot |2-i| = \\sqrt{2} \\cdot \\sqrt{5} = \\sqrt{10}$."
          }
        ]
      }
    },
    "vectors-grade10": {
      id: "vectors-grade10",
      meta: {
        titleEn: "Introduction to Vectors (Grade 10 Plane Geometry)",
        titleVi: "Các Khái Niệm Mở Đầu Về Vectơ (Hình Học Lớp 10)",
        grade: "Grade 10 / Geometry",
        duration: "45 minutes",
        teacher: "Math Bilingual Department",
        overviewEn: "Understand the core concepts of vectors in a plane: directed line segments, direction, magnitude, collinear vectors, equal vectors, and opposite vectors.",
        overviewVi: "Nắm vững các khái niệm nền tảng về vectơ trong mặt phẳng: đoạn thẳng có hướng, phương, hướng, độ dài, hai vectơ cùng phương, hai vectơ bằng nhau và vectơ-không."
      },
      concepts: [
        {
          id: "cv-1",
          titleEn: "Definition of a Vector",
          titleVi: "Định Nghĩa Vectơ",
          latex: "\\vec{a} = \\vec{AB}, \\quad |\\vec{AB}| = AB",
          descEn: "A vector is a directed line segment with an initial point $A$ and a terminal point $B$. The length (magnitude) is denoted by $|\\vec{AB}|$.",
          descVi: "Vectơ là một đoạn thẳng có hướng, điểm đầu là $A$ và điểm cuối là $B$. Độ dài của vectơ kí hiệu là $|\\vec{AB}|$.",
          notesEn: "The line passing through $A$ and $B$ is called the support line (giá của vectơ).",
          notesVi: "Đường thẳng đi qua điểm đầu và điểm cuối được gọi là giá của vectơ."
        },
        {
          id: "cv-2",
          titleEn: "Collinear and Equal Vectors",
          titleVi: "Vectơ Cùng Phương và Hai Vectơ Bằng Nhau",
          latex: "\\vec{a} = \\vec{b} \\iff \\begin{cases} \\text{cùng hướng} \\\\ |\\vec{a}| = |\\vec{b}| \\end{cases}",
          descEn: "Two vectors are collinear if their supports are parallel or coincident. Two vectors are equal if they have the same direction and magnitude.",
          descVi: "Hai vectơ cùng phương nếu giá của chúng song song hoặc trùng nhau. Hai vectơ bằng nhau nếu chúng có cùng hướng và cùng độ dài.",
          notesEn: "Opposite vectors have the same magnitude but opposite directions: $\\vec{BA} = -\\vec{AB}$.",
          notesVi: "Hai vectơ đối nhau có cùng độ dài nhưng ngược hướng: $\\vec{BA} = -\\vec{AB}$."
        },
        {
          id: "cv-3",
          titleEn: "Zero Vector",
          titleVi: "Vectơ-Không",
          latex: "\\vec{AA} = \\vec{0}, \\quad |\\vec{0}| = 0",
          descEn: "The zero vector $\\vec{0}$ has an initial point coinciding with its terminal point. Its magnitude is 0, and it is considered collinear and perpendicular to any vector.",
          descVi: "Vectơ-không là vectơ có điểm đầu trùng điểm cuối. Độ dài bằng 0, quy ước cùng phương và cùng hướng với mọi vectơ.",
          notesEn: "Notation: $\\vec{0}$, magnitude $|\\vec{0}| = 0$.",
          notesVi: "Kí hiệu là $\\vec{0}$, độ dài $|\\vec{0}| = 0$."
        }
      ],
      vocabulary: [
        { id: "vv-1", term: "Vector", ipa: "/ˈvek.tər/", pos: "noun", meaningVi: "Vectơ (đoạn thẳng có hướng)", exampleEn: "A vector has both magnitude and direction.", exampleVi: "Một vectơ có cả độ dài và hướng." },
        { id: "vv-2", term: "Magnitude / Length", ipa: "/ˈmæɡ.nɪ.tjuːd/", pos: "noun", meaningVi: "Độ dài vectơ", exampleEn: "The magnitude of vector $\\vec{AB}$ equals segment length $AB$.", exampleVi: "Độ dài vectơ $\\vec{AB}$ bằng độ dài đoạn thẳng $AB$." },
        { id: "vv-3", term: "Initial Point", ipa: "/ɪˈnɪʃ.əl pɔɪnt/", pos: "noun", meaningVi: "Điểm đầu (gốc của vectơ)", exampleEn: "Point $A$ is the initial point of vector $\\vec{AB}$.", exampleVi: "Điểm $A$ là điểm đầu của vectơ $\\vec{AB}$." },
        { id: "vv-4", term: "Terminal Point", ipa: "/ˈtɜː.mɪ.nəl pɔɪnt/", pos: "noun", meaningVi: "Điểm cuối (ngọn của vectơ)", exampleEn: "Point $B$ is the terminal point of $\\vec{AB}$.", exampleVi: "Điểm $B$ là điểm cuối của $\\vec{AB}$." },
        { id: "vv-5", term: "Collinear Vectors", ipa: "/kəʊˈlɪn.i.ər ˈvek.tərz/", pos: "noun phrase", meaningVi: "Hai vectơ cùng phương", exampleEn: "Collinear vectors lie on parallel or coincident lines.", exampleVi: "Các vectơ cùng phương có giá song song hoặc trùng nhau." },
        { id: "vv-6", term: "Equal Vectors", ipa: "/ˈiː.kwəl ˈvek.tərz/", pos: "noun phrase", meaningVi: "Hai vectơ bằng nhau", exampleEn: "Equal vectors have identical direction and magnitude.", exampleVi: "Hai vectơ bằng nhau có cùng hướng và cùng độ dài." }
      ],
      examples: [
        {
          id: "exv-1",
          titleEn: "Identify Equal Vectors in a Parallelogram",
          titleVi: "Xác Định Các Vectơ Bằng Nhau Trong Hình Bình Hành",
          problemEn: "Given parallelogram $ABCD$ with center $O$. List all vectors equal to $\\vec{AB}$ and all vectors equal to $\\vec{AO}$ having endpoints chosen from $A, B, C, D, O$.",
          problemVi: "Cho hình bình hành $ABCD$ tâm $O$. Hãy liệt kê các vectơ bằng vectơ $\\vec{AB}$ và các vectơ bằng vectơ $\\vec{AO}$ có điểm đầu và điểm cuối từ $A, B, C, D, O$.",
          steps: [
            { stepNum: 1, titleEn: "Find vectors equal to $\\vec{AB}$", titleVi: "Tìm các vectơ bằng $\\vec{AB}$", latex: "\\vec{AB} = \\vec{DC}", explanationEn: "Because $ABCD$ is a parallelogram, segment $AB \\parallel CD$ and $AB = CD$. The direction from $A$ to $B$ is the same as from $D$ to $C$. Thus $\\vec{AB} = \\vec{DC}$.", explanationVi: "Vì $ABCD$ là hình bình hành nên $AB \\parallel CD$ và $AB = CD$. Hướng từ $A$ đến $B$ cùng hướng từ $D$ đến $C$. Do đó $\\vec{AB} = \\vec{DC}$." },
            { stepNum: 2, titleEn: "Find vectors equal to $\\vec{AO}$", titleVi: "Tìm các vectơ bằng $\\vec{AO}$", latex: "\\vec{AO} = \\vec{OC}", explanationEn: "$O$ is the midpoint of diagonal $AC$, so $AO = OC$ and they have the same direction on line $AC$. Hence $\\vec{AO} = \\vec{OC}$.", explanationVi: "$O$ là trung điểm đường chéo $AC$ nên $AO = OC$ và cùng hướng từ $A$ đến $C$. Do đó $\\vec{AO} = \\vec{OC}$." },
            { stepNum: 3, titleEn: "Note opposite vectors", titleVi: "Lưu ý các vectơ đối", latex: "\\vec{BA} = \\vec{CD} = -\\vec{AB}, \\quad \\vec{CO} = \\vec{OA} = -\\vec{AO}", explanationEn: "Vectors with reversed arrows are opposite vectors, not equal vectors.", explanationVi: "Các vectơ ngược chiều là các vectơ đối, không phải vectơ bằng nhau." }
          ]
        }
      ],
      visualizer: {
        type: "canvas-interactive",
        preset: "cubic",
        paramA: 1,
        paramB: 0,
        paramC: 0,
        formulaDisplay: "\\vec{u} = (x, y), \\quad |\\vec{u}| = \\sqrt{x^2 + y^2}"
      },
      quiz: {
        titleEn: "Assessment: Introduction to Vectors (12 Multiple-Choice Questions)",
        titleVi: "Đề Kiểm Tra: Các Khái Niệm Mở Đầu Về Vectơ (12 Câu Trắc Nghiệm)",
        timeMinutes: 25,
        questions: [
          {
            id: "qv-1", type: "multiple-choice", points: 0.8,
            stemEn: "Which of the following definitions of a vector is correct?",
            stemVi: "Khẳng định nào sau đây là định nghĩa đúng về vectơ?",
            options: [
              { id: "A", text: "A vector is a directed line segment.", isCorrect: true },
              { id: "B", text: "A vector is an undirected segment with a known length.", isCorrect: false },
              { id: "C", text: "A vector is a straight line extending indefinitely.", isCorrect: false },
              { id: "D", text: "A vector is any ray in the Cartesian coordinate plane.", isCorrect: false }
            ],
            explanationEn: "By definition, a vector is a line segment with a specified direction.",
            explanationVi: "Theo định nghĩa SGK Toán 10: Vectơ là một đoạn thẳng có hướng."
          },
          {
            id: "qv-2", type: "multiple-choice", points: 0.8,
            stemEn: "What is the magnitude of the zero vector $\\vec{0}$?",
            stemVi: "Độ dài của vectơ-không $\\vec{0}$ bằng bao nhiêu?",
            options: [
              { id: "A", text: "$0$", isCorrect: true },
              { id: "B", text: "$1$", isCorrect: false },
              { id: "C", text: "Undefined", isCorrect: false },
              { id: "D", text: "$\\infty$", isCorrect: false }
            ],
            explanationEn: "The magnitude of the zero vector is strictly 0: $|\\vec{0}| = 0$.",
            explanationVi: "Vectơ-không có độ dài bằng 0, kí hiệu $|\\vec{0}| = 0$."
          },
          {
            id: "qv-3", type: "multiple-choice", points: 0.8,
            stemEn: "Two non-zero vectors are collinear if and only if:",
            stemVi: "Hai vectơ khác $\\vec{0}$ được gọi là cùng phương khi và chỉ khi:",
            options: [
              { id: "A", text: "Their supports are parallel or coincident.", isCorrect: true },
              { id: "B", text: "Their supports are strictly perpendicular.", isCorrect: false },
              { id: "C", text: "They have equal lengths.", isCorrect: false },
              { id: "D", text: "They share the same initial point.", isCorrect: false }
            ],
            explanationEn: "Two vectors are collinear if their support lines are parallel or coincident.",
            explanationVi: "Hai vectơ cùng phương khi và chỉ khi giá của chúng song song hoặc trùng nhau."
          },
          {
            id: "qv-4", type: "multiple-choice", points: 0.8,
            stemEn: "Given parallelogram $ABCD$. Which vector is equal to $\\vec{AB}$?",
            stemVi: "Cho hình bình hành $ABCD$. Vectơ nào sau đây bằng vectơ $\\vec{AB}$?",
            options: [
              { id: "A", text: "$\\vec{DC}$", isCorrect: true },
              { id: "B", text: "$\\vec{CD}$", isCorrect: false },
              { id: "C", text: "$\\vec{BA}$", isCorrect: false },
              { id: "D", text: "$\\vec{BC}$", isCorrect: false }
            ],
            explanationEn: "Because $AB \\parallel CD, AB = CD$ and the arrow points from $D$ to $C$, $\\vec{AB} = \\vec{DC}$.",
            explanationVi: "Trong hình bình hành $ABCD$, $\\vec{AB}$ cùng hướng và cùng độ dài với $\\vec{DC}$ nên $\\vec{AB} = \\vec{DC}$."
          },
          {
            id: "qv-5", type: "multiple-choice", points: 0.8,
            stemEn: "For three distinct points $A, B, C$, $\\vec{AB}$ and $\\vec{AC}$ are collinear if and only if:",
            stemVi: "Cho 3 điểm phân biệt $A, B, C$. Hai vectơ $\\vec{AB}$ và $\\vec{AC}$ cùng phương khi và chỉ khi:",
            options: [
              { id: "A", text: "Three points $A, B, C$ are collinear.", isCorrect: true },
              { id: "B", text: "$AB = AC$.", isCorrect: false },
              { id: "C", text: "Triangle $ABC$ is isosceles at $A$.", isCorrect: false },
              { id: "D", text: "$A$ is the midpoint of segment $BC$.", isCorrect: false }
            ],
            explanationEn: "$\\vec{AB}$ and $\\vec{AC}$ share the initial point $A$, so they are collinear iff $A, B, C$ lie on the same line.",
            explanationVi: "Hai vectơ $\\vec{AB}, \\vec{AC}$ chung gốc $A$ cùng phương khi và chỉ khi 3 điểm $A, B, C$ thẳng hàng."
          },
          {
            id: "qv-6", type: "multiple-choice", points: 0.8,
            stemEn: "How many non-zero vectors can be formed with distinct initial and terminal points from 4 non-coplanar points $A, B, C, D$?",
            stemVi: "Từ 4 điểm phân biệt $A, B, C, D$ không thẳng hàng, có bao nhiêu vectơ khác $\\vec{0}$ có điểm đầu và điểm cuối là các điểm đã cho?",
            options: [
              { id: "A", text: "$12$", isCorrect: true },
              { id: "B", text: "$6$", isCorrect: false },
              { id: "C", text: "$8$", isCorrect: false },
              { id: "D", text: "$16$", isCorrect: false }
            ],
            explanationEn: "Number of ordered pairs of 4 points is $A_4^2 = 4 \\times 3 = 12$ vectors.",
            explanationVi: "Số vectơ khác $\\vec{0}$ lập từ 4 điểm là chỉnh hợp chập 2 của 4 phần tử: $A_4^2 = 4 \\times 3 = 12$ vectơ."
          },
          {
            id: "qv-7", type: "multiple-choice", points: 0.8,
            stemEn: "Given square $ABCD$ with side length $a$. The magnitude $|\\vec{AC}|$ is:",
            stemVi: "Cho hình vuông $ABCD$ cạnh $a$. Độ dài của vectơ $|\\vec{AC}|$ là:",
            options: [
              { id: "A", text: "$a\\sqrt{2}$", isCorrect: true },
              { id: "B", text: "$a$", isCorrect: false },
              { id: "C", text: "$2a$", isCorrect: false },
              { id: "D", text: "$a\\frac{\\sqrt{2}}{2}$", isCorrect: false }
            ],
            explanationEn: "$|\\vec{AC}| = AC = \\sqrt{a^2 + a^2} = a\\sqrt{2}$.",
            explanationVi: "Độ dài $|\\vec{AC}|$ bằng độ dài đường chéo hình vuông: $AC = a\\sqrt{2}$."
          },
          {
            id: "qv-8", type: "multiple-choice", points: 0.8,
            stemEn: "Which statement about the zero vector $\\vec{0}$ is FALSE?",
            stemVi: "Khẳng định nào sau đây về vectơ-không $\\vec{0}$ là SAI?",
            options: [
              { id: "A", text: "The zero vector does not have a magnitude.", isCorrect: true },
              { id: "B", text: "The zero vector is collinear with every vector.", isCorrect: false },
              { id: "C", text: "The magnitude of the zero vector equals $0$.", isCorrect: false },
              { id: "D", text: "Every point $M$ determines a zero vector $\\vec{MM} = \\vec{0}$.", isCorrect: false }
            ],
            explanationEn: "The zero vector HAS a magnitude, which is precisely 0. Thus statement A is false.",
            explanationVi: "Vectơ-không CÓ độ dài và độ dài bằng 0. Khẳng định A nói không có độ dài là sai."
          },
          {
            id: "qv-9", type: "multiple-choice", points: 0.8,
            stemEn: "If $\\vec{a} = \\vec{b}$, which condition must hold?",
            stemVi: "Nếu hai vectơ $\\vec{a} = \\vec{b}$ thì điều kiện nào sau đây bắt buộc thỏa mãn?",
            options: [
              { id: "A", text: "$\\vec{a}$ and $\\vec{b}$ have the same direction and $|\\vec{a}| = |\\vec{b}|$.", isCorrect: true },
              { id: "B", text: "$\\vec{a}$ and $\\vec{b}$ only need to have equal magnitudes.", isCorrect: false },
              { id: "C", text: "$\\vec{a}$ and $\\vec{b}$ have opposite directions.", isCorrect: false },
              { id: "D", text: "The supports of $\\vec{a}$ and $\\vec{b}$ must be identical lines.", isCorrect: false }
            ],
            explanationEn: "Two equal vectors must share the exact same direction and magnitude.",
            explanationVi: "Hai vectơ bằng nhau phải cùng hướng và cùng độ dài."
          },
          {
            id: "qv-10", type: "multiple-choice", points: 0.8,
            stemEn: "Given equilateral triangle $ABC$ with side length $2$. Find $|\\vec{AB} - \\vec{0}|$.",
            stemVi: "Cho tam giác đều $ABC$ cạnh $2$. Độ dài $|\\vec{AB}|$ bằng:",
            options: [
              { id: "A", text: "$2$", isCorrect: true },
              { id: "B", text: "$\\sqrt{3}$", isCorrect: false },
              { id: "C", text: "$1$", isCorrect: false },
              { id: "D", text: "$4$", isCorrect: false }
            ],
            explanationEn: "$|\\vec{AB}| = AB = 2$.",
            explanationVi: "Độ dài của vectơ $|\\vec{AB}|$ chính là khoảng cách giữa 2 điểm $A$ và $B$, do đó bằng 2."
          },
          {
            id: "qv-11", type: "multiple-choice", points: 0.8,
            stemEn: "Let $I$ be the midpoint of segment $AB$. Which of the following vector equalities is TRUE?",
            stemVi: "Gọi $I$ là trung điểm của đoạn thẳng $AB$. Đẳng thức vectơ nào sau đây là ĐÚNG?",
            options: [
              { id: "A", text: "$\\vec{IA} = -\\vec{IB}$", isCorrect: true },
              { id: "B", text: "$\\vec{IA} = \\vec{IB}$", isCorrect: false },
              { id: "C", text: "$\\vec{AI} = \\vec{BI}$", isCorrect: false },
              { id: "D", text: "$|\\vec{IA}| = 2|\\vec{IB}|$", isCorrect: false }
            ],
            explanationEn: "$I$ is the midpoint of $AB$, so $\\vec{IA}$ and $\\vec{IB}$ have equal length and opposite directions: $\\vec{IA} = -\\vec{IB}$.",
            explanationVi: "Vì $I$ là trung điểm của $AB$ nên $\\vec{IA}$ và $\\vec{IB}$ là 2 vectơ đối nhau: $\\vec{IA} = -\\vec{IB}$."
          },
          {
            id: "qv-12", type: "multiple-choice", points: 1.2,
            stemEn: "Given rectangle $ABCD$. Which of the following vector statements is CORRECT?",
            stemVi: "Cho hình chữ nhật $ABCD$. Khẳng định nào sau đây là ĐÚNG?",
            options: [
              { id: "A", text: "$|\\vec{AC}| = |\\vec{BD}|$, but $\\vec{AC} \\neq \\vec{BD}$", isCorrect: true },
              { id: "B", text: "$\\vec{AC} = \\vec{BD}$", isCorrect: false },
              { id: "C", text: "$\\vec{AD} = \\vec{CB}$", isCorrect: false },
              { id: "D", text: "$\\vec{AB} = \\vec{CD}$", isCorrect: false }
            ],
            explanationEn: "In a rectangle, diagonals have equal length $AC = BD$, but their directions are different, so $\\vec{AC} \\neq \\vec{BD}$.",
            explanationVi: "Trong hình chữ nhật, hai đường chéo bằng nhau ($AC = BD$) nhưng khác hướng nên hai vectơ $|\\vec{AC}| = |\\vec{BD}|$ nhưng $\\vec{AC} \\neq \\vec{BD}$."
          }
        ]
      }
    },
    "vectors-sum-diff-grade10": {
      id: "vectors-sum-diff-grade10",
      meta: {
        titleEn: "Addition and Subtraction of Two Vectors (Grade 10)",
        titleVi: "Tổng và Hiệu Của Hai Vectơ (Hình Học Lớp 10)",
        grade: "Grade 10 / Geometry",
        duration: "45 minutes",
        teacher: "Math Bilingual Department",
        overviewEn: "Master vector operations: Triangle rule (Chasles' relation), Parallelogram rule, vector subtraction, and properties of midpoints and centroids.",
        overviewVi: "Nắm vững các phép toán vectơ: Quy tắc ba điểm (hệ thức Chasles), quy tắc hình bình hành, phép trừ vectơ, hệ thức trung điểm và trọng tâm tam giác."
      },
      concepts: [
        {
          id: "csd-1",
          titleEn: "Triangle Rule for Vector Addition",
          titleVi: "Quy Tắc Ba Điểm (Quy Tắc Tam Giác)",
          latex: "\\vec{AB} + \\vec{BC} = \\vec{AC}",
          descEn: "For any three points $A, B, C$, the sum of vector $\\vec{AB}$ and vector $\\vec{BC}$ is vector $\\vec{AC}$.",
          descVi: "Với ba điểm bất kì $A, B, C$, ta luôn có tổng của vectơ $\\vec{AB}$ và vectơ $\\vec{BC}$ bằng vectơ $\\vec{AC}$.",
          notesEn: "Also called Chasles' relation. Extends to polygon rules: $\\vec{A_1A_2} + \\vec{A_2A_3} + \\dots + \\vec{A_{n-1}A_n} = \\vec{A_1A_n}$.",
          notesVi: "Còn gọi là hệ thức Chasles. Mở rộng cho đa giác: điểm cuối vectơ trước nối tiếp điểm đầu vectơ sau."
        },
        {
          id: "csd-2",
          titleEn: "Parallelogram Rule",
          titleVi: "Quy Tắc Hình Bình Hành",
          latex: "\\vec{AB} + \\vec{AD} = \\vec{AC} \\quad (ABCD \\text{ is a parallelogram})",
          descEn: "If $ABCD$ is a parallelogram, the sum of two adjacent side vectors sharing initial point $A$ equals the diagonal vector starting from $A$.",
          descVi: "Nếu $ABCD$ là hình bình hành thì tổng hai vectơ chung gốc $A$ tương ứng với hai cạnh bằng vectơ đường chéo xuất phát từ $A$.",
          notesEn: "Used in physics to find the resultant of two forces: $\\vec{F} = \\vec{F}_1 + \\vec{F}_2$.",
          notesVi: "Ứng dụng trong vật lý để tìm hợp lực của hai lực đồng quy."
        },
        {
          id: "csd-3",
          titleEn: "Vector Subtraction and Difference Rule",
          titleVi: "Phép Trừ Vectơ và Quy Tắc Hiệu",
          latex: "\\vec{OB} - \\vec{OA} = \\vec{AB}, \\quad \\vec{a} - \\vec{b} = \\vec{a} + (-\\vec{b})",
          descEn: "Subtracting vector $\\vec{b}$ means adding its opposite vector $-\\vec{b}$. For any origin $O$, the difference $\\vec{OB} - \\vec{OA} = \\vec{AB}$.",
          descVi: "Hiệu của hai vectơ là tổng với vectơ đối. Với điểm $O$ bất kì, hiệu hai vectơ chung gốc $\\vec{OB} - \\vec{OA} = \\vec{AB}$ (ngọn trừ gốc).",
          notesEn: "Remember: Terminal point of the subtrahend becomes initial point of the difference.",
          notesVi: "Ghi nhớ: Ngọn của số bị trừ là điểm cuối, ngọn của số trừ là điểm đầu."
        },
        {
          id: "csd-4",
          titleEn: "Midpoint and Centroid Relations",
          titleVi: "Hệ Thức Trung Điểm và Trọng Tâm",
          latex: "\\vec{IA} + \\vec{IB} = \\vec{0} \\iff \\vec{MA} + \\vec{MB} = 2\\vec{MI}; \\quad \\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}",
          descEn: "$I$ is the midpoint of $AB$ iff $\\vec{IA} + \\vec{IB} = \\vec{0}$. $G$ is the centroid of $\\triangle ABC$ iff $\\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}$.",
          descVi: "$I$ là trung điểm $AB$ khi và chỉ khi $\\vec{IA} + \\vec{IB} = \\vec{0}$. $G$ là trọng tâm $\\triangle ABC$ khi và chỉ khi $\\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}$."
        }
      ],
      vocabulary: [
        { id: "vsd-1", term: "Vector Addition", ipa: "/ˈvek.tər əˈdɪʃ.ən/", pos: "noun phrase", meaningVi: "Phép cộng vectơ (tổng hai vectơ)", exampleEn: "Vector addition obeys commutative and associative laws.", exampleVi: "Phép cộng vectơ có tính giao hoán và kết hợp." },
        { id: "vsd-2", term: "Vector Subtraction", ipa: "/ˈvek.tər səbˈtræk.ʃən/", pos: "noun phrase", meaningVi: "Phép trừ vectơ (hiệu hai vectơ)", exampleEn: "Vector subtraction is defined via opposite vectors.", exampleVi: "Phép trừ vectơ được định nghĩa qua vectơ đối." },
        { id: "vsd-3", term: "Opposite Vector", ipa: "/ˈɒp.ə.zɪt ˈvek.tər/", pos: "noun phrase", meaningVi: "Vectơ đối", exampleEn: "$-\\vec{AB} = \\vec{BA}$ is the opposite vector of $\\vec{AB}$.", exampleVi: "$-\\vec{AB} = \\vec{BA}$ là vectơ đối của $\\vec{AB}$." },
        { id: "vsd-4", term: "Triangle Rule", ipa: "/ˈtraɪ.æŋ.ɡəl ruːl/", pos: "noun phrase", meaningVi: "Quy tắc tam giác (quy tắc ba điểm)", exampleEn: "According to the triangle rule, $\\vec{AB} + \\vec{BC} = \\vec{AC}$.", exampleVi: "Theo quy tắc tam giác, $\\vec{AB} + \\vec{BC} = \\vec{AC}$." },
        { id: "vsd-5", term: "Parallelogram Rule", ipa: "/ˌpær.əˈlel.ə.ɡræm ruːl/", pos: "noun phrase", meaningVi: "Quy tắc hình bình hành", exampleEn: "The parallelogram rule determines the resultant vector.", exampleVi: "Quy tắc hình bình hành xác định vectơ tổng hợp lực." },
        { id: "vsd-6", term: "Resultant Vector", ipa: "/rɪˈzʌl.tənt ˈvek.tər/", pos: "noun phrase", meaningVi: "Vectơ tổng (vectơ hợp lực)", exampleEn: "The resultant vector represents the combined effect of forces.", exampleVi: "Vectơ tổng biểu thị tác dụng kết hợp của các vectơ thành phần." }
      ],
      examples: [
        {
          id: "exsd-1",
          titleEn: "Simplifying Vector Expressions in a Parallelogram",
          titleVi: "Rút Gọn Biểu Thức Vectơ Trong Hình Bình Hành",
          problemEn: "Given parallelogram $ABCD$ with center $O$. Simplify the expression $\\vec{u} = \\vec{AB} + \\vec{AD} - \\vec{AC}$.",
          problemVi: "Cho hình bình hành $ABCD$ tâm $O$. Hãy rút gọn biểu thức vectơ $\\vec{u} = \\vec{AB} + \\vec{AD} - \\vec{AC}$.",
          steps: [
            { stepNum: 1, titleEn: "Apply Parallelogram Rule", titleVi: "Áp dụng quy tắc hình bình hành", latex: "\\vec{AB} + \\vec{AD} = \\vec{AC}", explanationEn: "Because $ABCD$ is a parallelogram, the sum of adjacent side vectors from $A$ equals the diagonal vector $\\vec{AC}$.", explanationVi: "Vì $ABCD$ là hình bình hành nên tổng hai vectơ cạnh $\\vec{AB} + \\vec{AD} = \\vec{AC}$." },
            { stepNum: 2, titleEn: "Substitute and simplify", titleVi: "Thay thế và rút gọn", latex: "\\vec{u} = \\vec{AC} - \\vec{AC} = \\vec{0}", explanationEn: "Subtracting a vector from itself produces the zero vector $\\vec{0}$.", explanationVi: "Hiệu của một vectơ với chính nó cho kết quả là vectơ-không $\\vec{0}$." },
            { stepNum: 3, titleEn: "Conclusion", titleVi: "Kết luận", latex: "\\vec{u} = \\vec{0}", explanationEn: "The resultant vector is the zero vector.", explanationVi: "Biểu thức sau khi rút gọn bằng vectơ $\\vec{0}$." }
          ]
        }
      ],
      visualizer: {
        type: "canvas-interactive",
        preset: "cubic",
        paramA: 1,
        paramB: 0,
        paramC: 0,
        formulaDisplay: "\\vec{u} + \\vec{v} = (x_1 + x_2, \\; y_1 + y_2)"
      },
      quiz: {
        titleEn: "Assessment: Vector Addition and Subtraction (12 Multiple-Choice Questions)",
        titleVi: "Đề Kiểm Tra: Tổng và Hiệu Của Hai Vectơ (12 Câu Trắc Nghiệm)",
        timeMinutes: 25,
        questions: [
          {
            id: "qsd-1", type: "multiple-choice", points: 0.8,
            stemEn: "For three points $A, B, C$, which vector equals $\\vec{AB} + \\vec{BC}$?",
            stemVi: "Với ba điểm bất kì $A, B, C$, vectơ nào bằng $\\vec{AB} + \\vec{BC}$?",
            options: [
              { id: "A", text: "$\\vec{AC}$", isCorrect: true },
              { id: "B", text: "$\\vec{CA}$", isCorrect: false },
              { id: "C", text: "$\\vec{BA}$", isCorrect: false },
              { id: "D", text: "$\\vec{CB}$", isCorrect: false }
            ],
            explanationEn: "According to the triangle rule, $\\vec{AB} + \\vec{BC} = \\vec{AC}$.",
            explanationVi: "Theo quy tắc ba điểm (hệ thức Chasles), $\\vec{AB} + \\vec{BC} = \\vec{AC}$."
          },
          {
            id: "qsd-2", type: "multiple-choice", points: 0.8,
            stemEn: "For any origin $O$ and points $A, B$, the vector $\\vec{OB} - \\vec{OA}$ equals:",
            stemVi: "Với điểm $O$ bất kì và hai điểm $A, B$, vectơ $\\vec{OB} - \\vec{OA}$ bằng:",
            options: [
              { id: "A", text: "$\\vec{AB}$", isCorrect: true },
              { id: "B", text: "$\\vec{BA}$", isCorrect: false },
              { id: "C", text: "$\\vec{OA}$", isCorrect: false },
              { id: "D", text: "$\\vec{BO}$", isCorrect: false }
            ],
            explanationEn: "By the subtraction rule for vectors with the same origin, $\\vec{OB} - \\vec{OA} = \\vec{AB}$.",
            explanationVi: "Theo quy tắc phép trừ hai vectơ chung gốc, $\\vec{OB} - \\vec{OA} = \\vec{AB}$."
          },
          {
            id: "qsd-3", type: "multiple-choice", points: 0.8,
            stemEn: "Given parallelogram $ABCD$. The sum $\\vec{AB} + \\vec{AD}$ is equal to:",
            stemVi: "Cho hình bình hành $ABCD$. Tổng vectơ $\\vec{AB} + \\vec{AD}$ bằng:",
            options: [
              { id: "A", text: "$\\vec{AC}$", isCorrect: true },
              { id: "B", text: "$\\vec{BD}$", isCorrect: false },
              { id: "C", text: "$\\vec{CA}$", isCorrect: false },
              { id: "D", text: "$\\vec{DB}$", isCorrect: false }
            ],
            explanationEn: "By the parallelogram rule, $\\vec{AB} + \\vec{AD} = \\vec{AC}$.",
            explanationVi: "Theo quy tắc hình bình hành, $\\vec{AB} + \\vec{AD} = \\vec{AC}$."
          },
          {
            id: "qsd-4", type: "multiple-choice", points: 0.8,
            stemEn: "Given triangle $ABC$. Simplify $\\vec{AB} + \\vec{BC} + \\vec{CA}$:",
            stemVi: "Cho tam giác $ABC$. Rút gọn biểu thức $\\vec{AB} + \\vec{BC} + \\vec{CA}$:",
            options: [
              { id: "A", text: "$\\vec{0}$", isCorrect: true },
              { id: "B", text: "$\\vec{AA}$", isCorrect: false },
              { id: "C", text: "$2\\vec{AC}$", isCorrect: false },
              { id: "D", text: "$3\\vec{AB}$", isCorrect: false }
            ],
            explanationEn: "$\\vec{AB} + \\vec{BC} + \\vec{CA} = \\vec{AC} + \\vec{CA} = \\vec{AA} = \\vec{0}$.",
            explanationVi: "Ta có $\\vec{AB} + \\vec{BC} + \\vec{CA} = \\vec{AC} + \\vec{CA} = \\vec{0}$."
          },
          {
            id: "qsd-5", type: "multiple-choice", points: 0.8,
            stemEn: "Let $I$ be the midpoint of segment $AB$. For any point $M$, which relation is TRUE?",
            stemVi: "Gọi $I$ là trung điểm của đoạn thẳng $AB$. Với điểm $M$ bất kì, hệ thức nào sau đây là ĐÚNG?",
            options: [
              { id: "A", text: "$\\vec{MA} + \\vec{MB} = 2\\vec{MI}$", isCorrect: true },
              { id: "B", text: "$\\vec{MA} + \\vec{MB} = \\vec{MI}$", isCorrect: false },
              { id: "C", text: "$\\vec{MA} - \\vec{MB} = 2\\vec{MI}$", isCorrect: false },
              { id: "D", text: "$\\vec{MA} + \\vec{MB} = \\vec{0}$", isCorrect: false }
            ],
            explanationEn: "Midpoint formula for vectors: $\\vec{MA} + \\vec{MB} = 2\\vec{MI}$.",
            explanationVi: "Tính chất trung điểm: $\\vec{MA} + \\vec{MB} = 2\\vec{MI}$ với mọi điểm $M$."
          },
          {
            id: "qsd-6", type: "multiple-choice", points: 0.8,
            stemEn: "Let $G$ be the centroid of triangle $ABC$. Which of the following vector equalities is TRUE?",
            stemVi: "Gọi $G$ là trọng tâm của tam giác $ABC$. Đẳng thức vectơ nào sau đây là ĐÚNG?",
            options: [
              { id: "A", text: "$\\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}$", isCorrect: true },
              { id: "B", text: "$\\vec{GA} + \\vec{GB} + \\vec{GC} = 3\\vec{GG}$", isCorrect: false },
              { id: "C", text: "$\\vec{AB} + \\vec{BC} + \\vec{CA} = \\vec{G}$", isCorrect: false },
              { id: "D", text: "$\\vec{GA} = \\vec{GB} = \\vec{GC}$", isCorrect: false }
            ],
            explanationEn: "$G$ is the centroid iff $\\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}$.",
            explanationVi: "$G$ là trọng tâm tam giác khi và chỉ khi $\\vec{GA} + \\vec{GB} + \\vec{GC} = \\vec{0}$."
          },
          {
            id: "qsd-7", type: "multiple-choice", points: 0.8,
            stemEn: "Given square $ABCD$ with side length $a$. The magnitude $|\\vec{AB} + \\vec{AD}|$ is:",
            stemVi: "Cho hình vuông $ABCD$ cạnh $a$. Độ dài của vectơ $|\\vec{AB} + \\vec{AD}|$ là:",
            options: [
              { id: "A", text: "$a\\sqrt{2}$", isCorrect: true },
              { id: "B", text: "$2a$", isCorrect: false },
              { id: "C", text: "$a$", isCorrect: false },
              { id: "D", text: "$0$", isCorrect: false }
            ],
            explanationEn: "$\\vec{AB} + \\vec{AD} = \\vec{AC}$, and diagonal $AC = a\\sqrt{2}$, so magnitude is $a\\sqrt{2}$.",
            explanationVi: "Ta có $\\vec{AB} + \\vec{AD} = \\vec{AC}$ nên $|\\vec{AB} + \\vec{AD}| = AC = a\\sqrt{2}$."
          },
          {
            id: "qsd-8", type: "multiple-choice", points: 0.8,
            stemEn: "Given square $ABCD$ with side length $a$. The magnitude $|\\vec{AB} - \\vec{AD}|$ is:",
            stemVi: "Cho hình vuông $ABCD$ cạnh $a$. Độ dài của vectơ $|\\vec{AB} - \\vec{AD}|$ bằng:",
            options: [
              { id: "A", text: "$a\\sqrt{2}$", isCorrect: true },
              { id: "B", text: "$0$", isCorrect: false },
              { id: "C", text: "$a$", isCorrect: false },
              { id: "D", text: "$2a$", isCorrect: false }
            ],
            explanationEn: "$\\vec{AB} - \\vec{AD} = \\vec{DB}$. The diagonal length is $DB = a\\sqrt{2}$.",
            explanationVi: "Ta có $\\vec{AB} - \\vec{AD} = \\vec{DB}$. Độ dài đường chéo $DB = a\\sqrt{2}$."
          },
          {
            id: "qsd-9", type: "multiple-choice", points: 0.8,
            stemEn: "Which of the following equals the opposite vector of $\\vec{AB} - \\vec{CD}$?",
            stemVi: "Vectơ nào sau đây là vectơ đối của vectơ $\\vec{AB} - \\vec{CD}$?",
            options: [
              { id: "A", text: "$\\vec{CD} - \\vec{AB}$", isCorrect: true },
              { id: "B", text: "$\\vec{BA} - \\vec{DC}$", isCorrect: false },
              { id: "C", text: "$\\vec{AB} + \\vec{CD}$", isCorrect: false },
              { id: "D", text: "$\\vec{BA} + \\vec{CD}$", isCorrect: false }
            ],
            explanationEn: "$-(\\vec{AB} - \\vec{CD}) = -\\vec{AB} + \\vec{CD} = \\vec{CD} - \\vec{AB}$.",
            explanationVi: "Vectơ đối của $\\vec{u}$ là $-\\vec{u} = -(\\vec{AB} - \\vec{CD}) = \\vec{CD} - \\vec{AB}$."
          },
          {
            id: "qsd-10", type: "multiple-choice", points: 0.8,
            stemEn: "Given equilateral triangle $ABC$ of side $a$. Find $|\\vec{AB} + \\vec{AC}|$.",
            stemVi: "Cho tam giác đều $ABC$ cạnh $a$. Tính độ dài vectơ $|\\vec{AB} + \\vec{AC}|$.",
            options: [
              { id: "A", text: "$a\\sqrt{3}$", isCorrect: true },
              { id: "B", text: "$2a$", isCorrect: false },
              { id: "C", text: "$a$", isCorrect: false },
              { id: "D", text: "$\\frac{a\\sqrt{3}}{2}$", isCorrect: false }
            ],
            explanationEn: "Let $M$ be the midpoint of $BC$. $\\vec{AB} + \\vec{AC} = 2\\vec{AM}$. Height $AM = \\frac{a\\sqrt{3}}{2}$, so $2AM = a\\sqrt{3}$.",
            explanationVi: "Gọi $M$ là trung điểm $BC$ thì $\\vec{AB} + \\vec{AC} = 2\\vec{AM}$. Đường cao $AM = \\frac{a\\sqrt{3}}{2}$ nên độ dài là $2AM = a\\sqrt{3}$."
          },
          {
            id: "qsd-11", type: "multiple-choice", points: 0.8,
            stemEn: "For four points $A, B, C, D$, the expression $\\vec{AB} - \\vec{CD} - (\\vec{AC} - \\vec{BD})$ equals:",
            stemVi: "Cho 4 điểm $A, B, C, D$. Biểu thức $\\vec{AB} - \\vec{CD} - (\\vec{AC} - \\vec{BD})$ bằng:",
            options: [
              { id: "A", text: "$\\vec{0}$", isCorrect: true },
              { id: "B", text: "$\\vec{AD}$", isCorrect: false },
              { id: "C", text: "$2\\vec{AB}$", isCorrect: false },
              { id: "D", text: "$\\vec{BC}$", isCorrect: false }
            ],
            explanationEn: "$\\vec{AB} - \\vec{AC} = \\vec{CB}$, and $-\\vec{CD} + \\vec{BD} = \\vec{DC} + \\vec{BD} = \\vec{BC}$. Then $\\vec{CB} + \\vec{BC} = \\vec{0}$.",
            explanationVi: "Rút gọn: $(\\vec{AB} - \\vec{AC}) + (\\vec{BD} - \\vec{CD}) = \\vec{CB} + \\vec{BC} = \\vec{0}$."
          },
          {
            id: "qsd-12", type: "multiple-choice", points: 1.2,
            stemEn: "Two forces $\\vec{F}_1$ and $\\vec{F}_2$ act on an object with magnitudes $|\\vec{F}_1| = 3\\text{ N}$, $|\\vec{F}_2| = 4\\text{ N}$, and their angle is $90^\\circ$. The resultant force magnitude is:",
            stemVi: "Hai lực $\\vec{F}_1$ và $\\vec{F}_2$ cùng tác dụng vào một chất điểm với độ lớn $|\\vec{F}_1| = 3\\text{ N}$, $|\\vec{F}_2| = 4\\text{ N}$ và góc giữa chúng là $90^\\circ$. Độ lớn hợp lực $\\vec{F} = \\vec{F}_1 + \\vec{F}_2$ là:",
            options: [
              { id: "A", text: "$5\\text{ N}$", isCorrect: true },
              { id: "B", text: "$7\\text{ N}$", isCorrect: false },
              { id: "C", text: "$1\\text{ N}$", isCorrect: false },
              { id: "D", text: "$12\\text{ N}$", isCorrect: false }
            ],
            explanationEn: "$|\\vec{F}| = \\sqrt{F_1^2 + F_2^2} = \\sqrt{3^2 + 4^2} = 5\\text{ N}$.",
            explanationVi: "Theo định lý Pythagore cho hai lực vuông góc: $|\\vec{F}| = \\sqrt{3^2 + 4^2} = 5\\text{ N}$."
          }
        ]
      }
    }
  },

  /**
   * Smart Parser to parse user pasted text or extracted document text
   */
  parseRawDocumentText(rawText) {
    const text = rawText.replace(/\r\n/g, '\n').trim();
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);

    const result = {
      detectedTitleEn: "",
      detectedTitleVi: "",
      detectedOverviewEn: "",
      detectedOverviewVi: "",
      concepts: [],
      vocabulary: [],
      examples: [],
      questions: []
    };

    // 1. Detect Title
    const firstLine = lines[0] || "Custom Math Lesson";
    if (firstLine.includes(':') || firstLine.includes('-') || firstLine.includes('/')) {
      const parts = firstLine.split(/[:\-\/]/);
      result.detectedTitleEn = parts[0].trim();
      result.detectedTitleVi = (parts[1] || parts[0]).trim();
    } else {
      result.detectedTitleEn = firstLine;
      result.detectedTitleVi = firstLine;
    }

    // 2. Scan for Vocabulary pairs
    // Patterns like: "Derivative: Đạo hàm", "Tangent - Tiếp tuyến", "Vocabulary:", "Từ vựng:"
    let inVocab = false;
    let inQuestions = false;
    let inConcepts = false;

    lines.forEach((line, idx) => {
      const lower = line.toLowerCase();

      // Section markers
      if (lower.includes('vocabulary') || lower.includes('từ vựng')) {
        inVocab = true;
        inQuestions = false;
        inConcepts = false;
        return;
      }
      if (lower.includes('question') || lower.includes('câu hỏi') || lower.includes('bài tập') || lower.includes('đề thi') || lower.includes('quiz')) {
        inQuestions = true;
        inVocab = false;
        inConcepts = false;
        return;
      }
      if (lower.includes('định lý') || lower.includes('khái niệm') || lower.includes('theorem') || lower.includes('concept')) {
        inConcepts = true;
        inVocab = false;
        inQuestions = false;
        return;
      }

      // Check vocabulary pattern: Term [/ipa/] : Meaning OR Term - Meaning
      if (inVocab || line.match(/^[A-Za-z\s]{3,25}\s*[:–-]\s*[\p{L}\s()]{3,50}$/u)) {
        if (line.includes(':') || line.includes('-') || line.includes('–')) {
          const parts = line.split(/[:–-]/);
          const term = parts[0].replace(/^[*•\d.)-]+/, '').trim();
          const meaning = (parts[1] || '').trim();
          if (term.length > 2 && meaning.length > 1 && !term.toLowerCase().startsWith('câu')) {
            result.vocabulary.push({
              id: `v-parsed-${Date.now()}-${result.vocabulary.length}`,
              term: term,
              ipa: "",
              pos: "term",
              meaningVi: meaning,
              exampleEn: `In mathematics, ${term.toLowerCase()} is fundamental.`,
              exampleVi: `Trong toán học, ${meaning.toLowerCase()} đóng vai trò trọng tâm.`
            });
          }
        }
      }

      // Check Concepts / Formulas
      if ((inConcepts || line.startsWith('$$') || line.includes('\\frac') || line.includes('\\int') || line.includes('\\lim')) && !inQuestions) {
        if (line.length > 5) {
          result.concepts.push({
            id: `c-parsed-${Date.now()}-${result.concepts.length}`,
            titleEn: `Theorem / Concept ${result.concepts.length + 1}`,
            titleVi: `Định lý / Khái niệm ${result.concepts.length + 1}`,
            latex: line.replace(/^\$\$|\$\$$/g, '').trim(),
            descEn: `Mathematical rule extracted from document: ${line.substring(0, 50)}...`,
            descVi: `Quy tắc toán học trích xuất từ tài liệu đã tải lên.`,
            notesEn: "Key formula.",
            notesVi: "Công thức trọng tâm."
          });
        }
      }
    });

    // 3. Scan for Questions (Multiple Choice, True/False, Short Answer)
    // Regex looking for "Câu 1", "Question 1", "1."
    const questionBlocks = [];
    let currentBlock = [];

    lines.forEach(line => {
      const isNewQ = line.match(/^(câu|question|\d+[\.\:\)])/i);
      if (isNewQ && currentBlock.length > 0) {
        questionBlocks.push(currentBlock.join('\n'));
        currentBlock = [line];
      } else {
        currentBlock.push(line);
      }
    });
    if (currentBlock.length > 0) {
      questionBlocks.push(currentBlock.join('\n'));
    }

    questionBlocks.forEach((block, qIdx) => {
      const qLines = block.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (qLines.length < 1) return;

      const stem = qLines[0].replace(/^(câu|question|\d+)[\s\.\:\d]+/i, '').trim() || qLines[0];

      // Check if it's 4-propositions True/False: contains a), b), c), d)
      const hasTFProps = block.match(/[a-d]\)/gi);
      if (hasTFProps && hasTFProps.length >= 3) {
        const props = [];
        ['a', 'b', 'c', 'd'].forEach(pId => {
          const match = block.match(new RegExp(`${pId}\\)[\\s\\t]*([^\\n\\r]+)`, 'i'));
          if (match) {
            props.push({
              id: pId,
              textEn: match[1].trim(),
              textVi: match[1].trim(),
              isCorrect: true,
              explanationEn: "Verified proposition.",
              explanationVi: "Mệnh đề theo nội dung tài liệu."
            });
          }
        });

        if (props.length >= 2) {
          result.questions.push({
            id: `q-parsed-${Date.now()}-${qIdx}`,
            type: "true-false-4",
            points: 4.0,
            stemEn: stem,
            stemVi: stem,
            propositions: props,
            explanationEn: "Explanations for propositions.",
            explanationVi: "Hướng dẫn giải chi tiết cho các mệnh đề."
          });
          return;
        }
      }

      // Check if it's Multiple Choice ABCD
      const hasOptions = block.match(/[A-D][\.\:\)][\s\t]*([^\n]+)/g);
      if (hasOptions && hasOptions.length >= 2) {
        const options = [];
        ['A', 'B', 'C', 'D'].forEach(optId => {
          const optMatch = block.match(new RegExp(`${optId}[\\.\\:\\)][\\s\\t]*([^\\n]+)`, 'i'));
          if (optMatch) {
            options.push({
              id: optId,
              text: optMatch[1].trim(),
              isCorrect: optId === 'A' // default first option if unspecified
            });
          }
        });

        if (options.length >= 2) {
          result.questions.push({
            id: `q-parsed-${Date.now()}-${qIdx}`,
            type: "multiple-choice",
            points: 2.5,
            stemEn: stem,
            stemVi: stem,
            options: options,
            explanationEn: "Solution according to the document.",
            explanationVi: "Lời giải chi tiết theo tài liệu tham khảo."
          });
          return;
        }
      }

      // Otherwise classify as short answer if not already matched
      if (stem.length > 10) {
        result.questions.push({
          id: `q-parsed-${Date.now()}-${qIdx}`,
          type: "short-answer",
          points: 3.5,
          stemEn: stem,
          stemVi: stem,
          correctAnswer: "1",
          acceptableAnswers: ["1"],
          tolerance: 0.01,
          explanationEn: "Calculated answer.",
          explanationVi: "Đáp số tính toán được từ đề bài."
        });
      }
    });

    return result;
  },

  /**
   * Generates a complete lesson object using built-in topic or parsed document
   */
  generateLessonFromTopic(topicKey) {
    const topic = this.curriculumDatabase[topicKey];
    if (topic) {
      return JSON.parse(JSON.stringify(topic));
    }
    return null;
  },

  /**
   * Transforms parsed document into full Lesson schema
   */
  buildLessonFromParsedDoc(parsed, originalText) {
    const defaultFallback = this.curriculumDatabase["integrals-calculus"];

    const newLesson = {
      id: `lesson-doc-${Date.now()}`,
      meta: {
        titleEn: parsed.detectedTitleEn || "Extracted Bilingual Math Lesson",
        titleVi: parsed.detectedTitleVi || "Bài Giảng Toán Trích Xuất Từ Tài Liệu",
        grade: "Grade 11 / 12",
        duration: "45 minutes",
        teacher: "Math Bilingual Department",
        overviewEn: `Synthesized lesson generated from uploaded source text (${parsed.vocabulary.length} terms, ${parsed.concepts.length} theorems, ${parsed.questions.length} questions).`,
        overviewVi: `Bài giảng song ngữ được tổng hợp tự động từ tài liệu tải lên (${parsed.vocabulary.length} từ vựng, ${parsed.concepts.length} định lý, ${parsed.questions.length} câu hỏi kiểm tra).`
      },
      concepts: parsed.concepts.length > 0 ? parsed.concepts : defaultFallback.concepts,
      vocabulary: parsed.vocabulary.length > 0 ? parsed.vocabulary : defaultFallback.vocabulary,
      examples: parsed.examples.length > 0 ? parsed.examples : defaultFallback.examples,
      visualizer: {
        type: "canvas-interactive",
        preset: "cubic",
        paramA: 1,
        paramB: -3,
        paramC: 0,
        formulaDisplay: "y = f(x)"
      },
      quiz: {
        titleEn: `Quiz: ${parsed.detectedTitleEn || 'Assessment Test'}`,
        titleVi: `Đề Kiểm Tra: ${parsed.detectedTitleVi || 'Đánh Giá Năng Lực'}`,
        timeMinutes: 20,
        questions: parsed.questions.length > 0 ? parsed.questions : defaultFallback.quiz.questions
      }
    };

    return newLesson;
  },

  /**
   * Fetch list of models enabled for the given Gemini API Key
   */
  async fetchAvailableModels(apiKey) {
    if (!apiKey) return [];
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) return [];
      const data = await res.json();
      if (!data.models || !Array.isArray(data.models)) return [];
      return data.models
        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'))
        .map(m => m.name.replace(/^models\//, ''));
    } catch (e) {
      console.warn('Không thể tự động quét danh sách model từ API Key:', e);
      return [];
    }
  },

  safeParseAiJson(rawJSON) {
    if (!rawJSON || typeof rawJSON !== 'string') return null;
    let clean = rawJSON.trim();
    if (clean.startsWith('```json')) clean = clean.substring(7);
    else if (clean.startsWith('```')) clean = clean.substring(3);
    if (clean.endsWith('```')) clean = clean.substring(0, clean.length - 3);
    clean = clean.trim();
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (jsonMatch) clean = jsonMatch[0];

    // Try direct parse first
    try {
      return JSON.parse(clean);
    } catch (e1) {
      // Fix unescaped backslashes before LaTeX commands in JSON strings
      try {
        const latexFixed = clean.replace(/\\([a-zA-Z]+)/g, (match, cmd) => {
          return '\\\\' + cmd;
        });
        return JSON.parse(latexFixed);
      } catch (e2) {
        // Fallback: fix control chars created by single backslashes in JSON (\x0b, \t, \f, etc.)
        const sanitized = clean
          .replace(/\x0bec\b/g, '\\\\vec')
          .replace(/\x0b/g, '\\\\')
          .replace(/\text\{/g, '\\\\text{')
          .replace(/\x0crac\b/g, '\\\\frac')
          .replace(/\right\b/g, '\\\\right')
          .replace(/\x08egin\b/g, '\\\\begin')
          .replace(/\x08ar\b/g, '\\\\bar')
          .replace(/\neq\b/g, '\\\\neq');
        return JSON.parse(sanitized);
      }
    }
  },

  /**
   * Call Google Gemini API with smart adaptive model fallback
   */
  async generateWithGemini(apiKey, promptText, topicOrSource, preferredModel = 'gemini-3.8-flash', onProgress = null) {
    // Determine priority sequence of models
    let modelsToTry = [];
    if (preferredModel && preferredModel !== 'auto') {
      modelsToTry.push(preferredModel);
    }

    // Google's newest and recommended models
    const fallbackList = [
      'gemini-3.8-flash',
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-2.0-flash-lite',
      'gemini-pro'
    ];
    fallbackList.forEach(m => {
      if (!modelsToTry.includes(m)) modelsToTry.push(m);
    });

    // Optionally enrich with online models for this key
    try {
      const onlineModels = await this.fetchAvailableModels(apiKey);
      if (onlineModels.length > 0) {
        // Prepend valid flash or pro models discovered online
        onlineModels.forEach(m => {
          if (!modelsToTry.includes(m) && (m.includes('flash') || m.includes('pro'))) {
            modelsToTry.push(m);
          }
        });
      }
    } catch (e) {
      // Continue with predefined list
    }

    const systemInstruction = `You are a professional Bilingual Mathematics Educator specializing in High School Calculus and Geometry (English - Vietnamese). 
Generate a comprehensive interactive Math lesson and quiz adhering strictly to the JSON schema below. 
Equations must be formatted in valid LaTeX without dollar signs in the 'latex' field, or inline $...$ in textual descriptions.
JSON Schema:
{
  "meta": { "titleEn": "...", "titleVi": "...", "grade": "...", "duration": "45 minutes", "overviewEn": "...", "overviewVi": "..." },
  "concepts": [ { "id": "c1", "titleEn": "...", "titleVi": "...", "latex": "...", "descEn": "...", "descVi": "...", "notesEn": "...", "notesVi": "..." } ],
  "vocabulary": [ { "id": "v1", "term": "...", "ipa": "...", "pos": "noun", "meaningVi": "...", "exampleEn": "...", "exampleVi": "..." } ],
  "examples": [ { "id": "ex1", "titleEn": "...", "titleVi": "...", "problemEn": "...", "problemVi": "...", "steps": [ { "stepNum": 1, "titleEn": "...", "titleVi": "...", "latex": "...", "explanationEn": "...", "explanationVi": "..." } ] } ],
  "visualizer": { "type": "canvas-interactive", "formulaDisplay": "..." },
  "quiz": {
    "titleEn": "...", "titleVi": "...", "timeMinutes": 20,
    "questions": [
      { "id": "q1", "type": "multiple-choice", "points": 2.5, "stemEn": "...", "stemVi": "...", "options": [ { "id": "A", "text": "...", "isCorrect": true }, { "id": "B", "text": "...", "isCorrect": false }, { "id": "C", "text": "...", "isCorrect": false }, { "id": "D", "text": "...", "isCorrect": false } ], "explanationEn": "...", "explanationVi": "..." },
      { "id": "q2", "type": "true-false-4", "points": 4.0, "stemEn": "...", "stemVi": "...", "propositions": [ { "id": "a", "textEn": "...", "textVi": "...", "isCorrect": true, "explanationEn": "...", "explanationVi": "..." }, { "id": "b", "textEn": "...", "textVi": "...", "isCorrect": false, "explanationEn": "...", "explanationVi": "..." }, { "id": "c", "textEn": "...", "textVi": "...", "isCorrect": true, "explanationEn": "...", "explanationVi": "..." }, { "id": "d", "textEn": "...", "textVi": "...", "isCorrect": false, "explanationEn": "...", "explanationVi": "..." } ], "explanationEn": "...", "explanationVi": "..." },
      { "id": "q3", "type": "short-answer", "points": 3.5, "stemEn": "...", "stemVi": "...", "correctAnswer": "...", "acceptableAnswers": ["..."], "tolerance": 0.01, "explanationEn": "...", "explanationVi": "..." }
    ]
  }
}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemInstruction}\n\nTask: Generate a bilingual lesson and quiz based on the following input:\n${promptText || topicOrSource}` }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.3
      }
    };

    let lastError = null;
    let rawJSON = null;
    let successfulModel = null;

    for (const model of modelsToTry) {
      try {
        if (typeof onProgress === 'function') {
          onProgress(model);
        }
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errData = await response.json();
          const errMsg = errData.error?.message || `HTTP ${response.status}`;
          throw new Error(`[${model}] ${errMsg}`);
        }

        const data = await response.json();
        rawJSON = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJSON) {
          successfulModel = model;
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Thử model ${model} không thành công:`, err.message);
      }
    }

    if (!rawJSON) {
      throw new Error(lastError ? lastError.message : 'Không nhận được nội dung phản hồi từ bất kỳ mô hình Gemini nào.');
    }

    let cleanJSON = rawJSON.trim();
    if (cleanJSON.startsWith('```json')) {
      cleanJSON = cleanJSON.substring(7);
    } else if (cleanJSON.startsWith('```')) {
      cleanJSON = cleanJSON.substring(3);
    }
    if (cleanJSON.endsWith('```')) {
      cleanJSON = cleanJSON.substring(0, cleanJSON.length - 3);
    }

    const lessonData = this.safeParseAiJson(cleanJSON);
    lessonData.id = `lesson-ai-${Date.now()}`;
    lessonData.meta = lessonData.meta || {};
    lessonData.meta.titleEn = lessonData.meta.titleEn || "Bilingual Math Lesson";
    lessonData.meta.titleVi = lessonData.meta.titleVi || "Bài Giảng Toán Song Ngữ";
    lessonData.meta.generatedByModel = successfulModel;
    lessonData.concepts = Array.isArray(lessonData.concepts) ? lessonData.concepts : [];
    lessonData.vocabulary = Array.isArray(lessonData.vocabulary) ? lessonData.vocabulary : [];
    lessonData.examples = Array.isArray(lessonData.examples) ? lessonData.examples : [];
    lessonData.quiz = lessonData.quiz || { titleVi: "Đề Kiểm Tra Đánh Giá", timeMinutes: 20, questions: [] };
    lessonData.quiz.questions = Array.isArray(lessonData.quiz.questions) ? lessonData.quiz.questions : [];
    // Ensure cognitive level for every question
    lessonData.quiz.questions.forEach((q, idx) => {
      if (!q.level) {
        q.level = idx === 0 ? 'NB' : (idx === 1 ? 'TH' : (idx % 2 === 0 ? 'VD' : 'VDC'));
      }
    });
    return lessonData;
  },

  /**
   * Gemini Vision Multimodal OCR: Transcribe math worksheets/textbook photos directly into bilingual lessons & quizzes
   */
  async generateWithGeminiVision(apiKey, imageBase64, mimeType = 'image/jpeg', customPrompt = '', preferredModel = 'gemini-2.5-flash', onProgress = null) {
    if (!apiKey) throw new Error('Vui lòng nhập Google Gemini API Key để quét ảnh OCR.');
    if (!imageBase64) throw new Error('Chưa có dữ liệu hình ảnh để phân tích.');

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    let modelsToTry = [];
    if (preferredModel && preferredModel !== 'auto') {
      modelsToTry.push(preferredModel);
    }
    const visionFallbacks = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-3.8-flash'
    ];
    visionFallbacks.forEach(m => {
      if (!modelsToTry.includes(m)) modelsToTry.push(m);
    });

    const systemInstruction = `You are an expert Bilingual Mathematics Educator and Optical Character Recognition (OCR) specialist.
Analyze the attached image of a mathematics exam paper, textbook page, or handwritten/printed math worksheet.
Tasks:
1. Accurately transcribe all mathematical formulas and expressions into valid LaTeX.
2. Structure the content into an interactive bilingual (English - Vietnamese) lesson and quiz adhering strictly to the JSON schema below.
3. For each question, classify its cognitive level into:
   - "NB": Nhận biết (Recognition / Knowledge)
   - "TH": Thông hiểu (Comprehension / Understanding)
   - "VD": Vận dụng (Application)
   - "VDC": Vận dụng cao (Higher-Order / Advanced problem solving)
JSON Schema:
{
  "meta": { "titleEn": "...", "titleVi": "...", "grade": "...", "duration": "45 minutes", "overviewEn": "...", "overviewVi": "..." },
  "concepts": [ { "id": "c1", "titleEn": "...", "titleVi": "...", "latex": "...", "descEn": "...", "descVi": "...", "notesEn": "...", "notesVi": "..." } ],
  "vocabulary": [ { "id": "v1", "term": "...", "ipa": "...", "pos": "noun", "meaningVi": "...", "exampleEn": "...", "exampleVi": "..." } ],
  "examples": [ { "id": "ex1", "titleEn": "...", "titleVi": "...", "problemEn": "...", "problemVi": "...", "steps": [ { "stepNum": 1, "titleEn": "...", "titleVi": "...", "latex": "...", "explanationEn": "...", "explanationVi": "..." } ] } ],
  "visualizer": { "type": "canvas-interactive", "formulaDisplay": "..." },
  "quiz": {
    "titleEn": "...", "titleVi": "...", "timeMinutes": 20,
    "questions": [
      { "id": "q1", "type": "multiple-choice", "level": "TH", "points": 2.5, "stemEn": "...", "stemVi": "...", "options": [ { "id": "A", "text": "...", "isCorrect": true }, { "id": "B", "text": "...", "isCorrect": false }, { "id": "C", "text": "...", "isCorrect": false }, { "id": "D", "text": "...", "isCorrect": false } ], "explanationEn": "...", "explanationVi": "..." },
      { "id": "q2", "type": "true-false-4", "level": "NB", "points": 4.0, "stemEn": "...", "stemVi": "...", "propositions": [ { "id": "a", "textEn": "...", "textVi": "...", "isCorrect": true, "explanationEn": "...", "explanationVi": "..." }, { "id": "b", "textEn": "...", "textVi": "...", "isCorrect": false, "explanationEn": "...", "explanationVi": "..." }, { "id": "c", "textEn": "...", "textVi": "...", "isCorrect": true, "explanationEn": "...", "explanationVi": "..." }, { "id": "d", "textEn": "...", "textVi": "...", "isCorrect": false, "explanationEn": "...", "explanationVi": "..." } ], "explanationEn": "...", "explanationVi": "..." },
      { "id": "q3", "type": "short-answer", "level": "VD", "points": 3.5, "stemEn": "...", "stemVi": "...", "correctAnswer": "...", "acceptableAnswers": ["..."], "tolerance": 0.01, "explanationEn": "...", "explanationVi": "..." }
    ]
  }
}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              inline_data: {
                mime_type: mimeType,
                data: cleanBase64
              }
            },
            {
              text: `${systemInstruction}\n\nTask: Perform OCR on the attached image, extract all questions & math content into a bilingual lesson and exam quiz. Teacher notes: ${customPrompt || 'Tự động nhận diện công thức LaTeX và cấu trúc thành đề kiểm tra song ngữ chuẩn Bộ GD&ĐT.'}`
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2
      }
    };

    let lastError = null;
    let rawJSON = null;
    let successfulModel = null;

    for (const model of modelsToTry) {
      try {
        if (typeof onProgress === 'function') onProgress(model);
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errData = await response.json();
          const errMsg = errData.error?.message || `HTTP ${response.status}`;
          throw new Error(`[${model}] ${errMsg}`);
        }

        const data = await response.json();
        rawJSON = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJSON) {
          successfulModel = model;
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Vision model ${model} failed:`, err.message);
      }
    }

    if (!rawJSON) {
      throw new Error(lastError ? lastError.message : 'Không nhận diện được nội dung từ hình ảnh.');
    }

    let cleanJSON = rawJSON.trim();
    if (cleanJSON.startsWith('```json')) cleanJSON = cleanJSON.substring(7);
    else if (cleanJSON.startsWith('```')) cleanJSON = cleanJSON.substring(3);
    if (cleanJSON.endsWith('```')) cleanJSON = cleanJSON.substring(0, cleanJSON.length - 3);
    cleanJSON = cleanJSON.trim();

    const jsonMatch = cleanJSON.match(/\{[\s\S]*\}/);
    if (jsonMatch) cleanJSON = jsonMatch[0];

    const lessonData = this.safeParseAiJson(cleanJSON);
    lessonData.id = `lesson-ocr-${Date.now()}`;
    lessonData.meta = lessonData.meta || {};
    lessonData.meta.titleEn = lessonData.meta.titleEn || "OCR Bilingual Math Lesson";
    lessonData.meta.titleVi = lessonData.meta.titleVi || "Bài Giảng OCR Từ Hình Ảnh";
    lessonData.meta.generatedByModel = successfulModel;
    lessonData.concepts = Array.isArray(lessonData.concepts) ? lessonData.concepts : [];
    lessonData.vocabulary = Array.isArray(lessonData.vocabulary) ? lessonData.vocabulary : [];
    lessonData.examples = Array.isArray(lessonData.examples) ? lessonData.examples : [];
    lessonData.quiz = lessonData.quiz || { titleVi: "Đề Kiểm Tra OCR", timeMinutes: 20, questions: [] };
    lessonData.quiz.questions = Array.isArray(lessonData.quiz.questions) ? lessonData.quiz.questions : [];
    
    // Ensure cognitive level
    lessonData.quiz.questions.forEach((q, idx) => {
      if (!q.level) {
        q.level = idx === 0 ? 'NB' : (idx === 1 ? 'TH' : (idx % 2 === 0 ? 'VD' : 'VDC'));
      }
    });

    return lessonData;
  },

  /**
   * Sinh tự động 01 câu hỏi đơn lẻ theo đúng loại câu hỏi và mức độ nhận thức (NB, TH, VD, VDC)
   */
  async generateSingleQuestionAI({ type = 'multiple-choice', level = 'TH', topic = '', grade = 'Khối 12', apiKey = '', preferredModel = 'gemini-2.5-flash' }) {
    const levelNames = {
      'NB': 'Nhận biết (Recall / Knowledge)',
      'TH': 'Thông hiểu (Comprehension)',
      'VD': 'Vận dụng (Application)',
      'VDC': 'Vận dụng cao (High-order Analysis & Optimization)'
    };

    const levelDescriptions = {
      'NB': 'Mức độ 1: NHẬN BIẾT - Nhận biết định nghĩa, công thức toán học cơ bản, nhận diện công thức hoặc đọc đồ thị trực tiếp mà không cần biến đổi phức tạp.',
      'TH': 'Mức độ 2: THÔNG HIỂU - Hiểu bản chất khái niệm, áp dụng trực tiếp 1-2 công thức chuẩn để tính toán hoặc suy luận toán học 1 bước.',
      'VD': 'Mức độ 3: VẬN DỤNG - Kết hợp 2-3 kiến thức liên hoàn, biến đổi đại số hoặc tọa độ hình học, giải phương trình/bài toán có ngữ cảnh.',
      'VDC': 'Mức độ 4: VẬN DỤNG CAO - Phân hóa học sinh xuất sắc, chứa bài toán tham số m, cực trị min/max, tối ưu hóa thực tế hoặc hình học không gian phức tạp.'
    };

    // If Gemini API Key is provided, call Gemini
    if (apiKey) {
      const modelsToTry = [preferredModel, 'gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'].filter(Boolean);
      const systemInstruction = `Bạn là Chuyên gia Khảo thí và Sư phạm Toán THPT theo Chương trình GDPT 2018 (Song ngữ Anh - Việt).
Biên soạn CHÍNH XÁC 01 CÂU HỎI TOÁN HỌC SONG NGỮ (English & Tiếng Việt).
- Chủ đề: ${topic || 'Toán THPT Chuẩn'} (${grade || 'THPT'})
- Định dạng câu hỏi: ${type}
- Mức độ nhận thức: ${level} - ${levelNames[level] || level}
- Yêu cầu sư phạm: ${levelDescriptions[level] || ''}
- Bắt buộc kẹp công thức toán giữa $...$ (inline) hoặc $$...$$ (display).
- Chỉ trả về JSON hợp lệ theo đúng cấu trúc. Không có markdown thừa ngoài json block.`;

      let jsonSchemaDescription = '';
      if (type === 'multiple-choice') {
        jsonSchemaDescription = `{
  "stemEn": "Question stem in English with LaTeX...",
  "stemVi": "Nội dung câu hỏi tiếng Việt có công thức LaTeX...",
  "options": [
    { "id": "A", "text": "$...$", "isCorrect": true },
    { "id": "B", "text": "$...$", "isCorrect": false },
    { "id": "C", "text": "$...$", "isCorrect": false },
    { "id": "D", "text": "$...$", "isCorrect": false }
  ],
  "explanationEn": "Step-by-step solution in English...",
  "explanationVi": "Lời giải chi tiết từng bước bằng tiếng Việt..."
}`;
      } else if (type === 'true-false-4') {
        jsonSchemaDescription = `{
  "stemEn": "General problem stem in English with LaTeX...",
  "stemVi": "Đề bài chung bằng tiếng Việt...",
  "propositions": [
    { "id": "a", "textEn": "...", "textVi": "...", "isCorrect": true, "explanationEn": "...", "explanationVi": "..." },
    { "id": "b", "textEn": "...", "textVi": "...", "isCorrect": false, "explanationEn": "...", "explanationVi": "..." },
    { "id": "c", "textEn": "...", "textVi": "...", "isCorrect": true, "explanationEn": "...", "explanationVi": "..." },
    { "id": "d", "textEn": "...", "textVi": "...", "isCorrect": false, "explanationEn": "...", "explanationVi": "..." }
  ],
  "explanationEn": "Comprehensive solution...",
  "explanationVi": "Hướng dẫn giải chi tiết cho 4 mệnh đề..."
}`;
      } else {
        jsonSchemaDescription = `{
  "stemEn": "Question stem in English with LaTeX...",
  "stemVi": "Nội dung câu hỏi tiếng Việt...",
  "correctAnswer": "4",
  "acceptableAnswers": ["4", "4.0", "+4"],
  "tolerance": 0.01,
  "explanationEn": "Detailed step-by-step solution in English...",
  "explanationVi": "Lời giải chi tiết từng bước bằng tiếng Việt..."
}`;
      }

      for (const m of modelsToTry) {
        try {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                role: "user",
                parts: [{ text: `${systemInstruction}\n\nSchema:\n${jsonSchemaDescription}\n\nHãy tạo 01 câu hỏi mức độ ${level}!` }]
              }],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.35
              }
            })
          });

          if (res.ok) {
            const data = await res.json();
            let rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (rawText) {
              rawText = rawText.trim();
              if (rawText.startsWith('```json')) rawText = rawText.substring(7);
              if (rawText.startsWith('```')) rawText = rawText.substring(3);
              if (rawText.endsWith('```')) rawText = rawText.substring(0, rawText.length - 3);
              const parsed = this.safeParseAiJson(rawText);
              if (parsed && (parsed.stemEn || parsed.stemVi)) {
                return parsed;
              }
            }
          }
        } catch (e) {
          console.warn(`Gemini model ${m} failed for single question:`, e);
        }
      }
    }

    // Fallback: Smart Procedural Curriculum Generator
    return this.generateSmartFallbackQuestion(type, level, topic, grade);
  },

  /**
   * Kho câu hỏi mẫu thông minh đa dạng theo mức độ nhận thức (Offline / Fallback)
   */
  generateSmartFallbackQuestion(type, level, topic = '', grade = '') {
    const rInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const lowerTopic = (topic + ' ' + grade).toLowerCase();
    const isVector = lowerTopic.includes('vect') || lowerTopic.includes('hình học') || lowerTopic.includes('oxy') || lowerTopic.includes('oxz');
    const isProb = lowerTopic.includes('xác suất') || lowerTopic.includes('thống kê') || lowerTopic.includes('prob');

    // 1. DẠNG TRẮC NGHIỆM 4 LỰA CHỌN (MULTIPLE CHOICE)
    if (type === 'multiple-choice') {
      if (level === 'NB') {
        if (isVector) {
          const a = rInt(1, 5), b = rInt(-4, 4);
          return {
            stemEn: `In Cartesian plane $Oxy$, given point $A(${a}; ${b})$. Find the coordinates of vector $\\vec{OA}$.`,
            stemVi: `Trong mặt phẳng tọa độ $Oxy$, cho điểm $A(${a}; ${b})$. Tọa độ của vectơ $\\vec{OA}$ là:`,
            options: [
              { id: "A", text: `$(${a}; ${b})$`, isCorrect: true },
              { id: "B", text: `$(${b}; ${a})$`, isCorrect: false },
              { id: "C", text: `$(${-a}; ${-b})$`, isCorrect: false },
              { id: "D", text: `$(${a}; 0)$`, isCorrect: false }
            ],
            explanationEn: `Vector $\\vec{OA}$ with origin $O(0; 0)$ has coordinates equal to point $A$: $\\vec{OA} = (${a}; ${b})$.`,
            explanationVi: `Vectơ có điểm đầu là gốc tọa độ $O(0; 0)$ và điểm cuối $A(${a}; ${b})$ có tọa độ chính bằng tọa độ điểm $A$: $\\vec{OA} = (${a}; ${b})$.`
          };
        } else if (isProb) {
          return {
            stemEn: `Let $A$ be an arbitrary event in sample space $\\Omega$. Which formula is correct for the probability of the complementary event $\\overline{A}$?`,
            stemVi: `Cho $A$ là một biến cố bất kỳ trong không gian mẫu $\\Omega$. Khẳng định nào sau đây là đúng về xác suất của biến cố đối $\\overline{A}$?`,
            options: [
              { id: "A", text: `$P(\\overline{A}) = 1 - P(A)$`, isCorrect: true },
              { id: "B", text: `$P(\\overline{A}) = P(A) - 1$`, isCorrect: false },
              { id: "C", text: `$P(\\overline{A}) = 1 + P(A)$`, isCorrect: false },
              { id: "D", text: `$P(\\overline{A}) = \\frac{1}{P(A)}$`, isCorrect: false }
            ],
            explanationEn: `By definition of complementary probability: $P(\\overline{A}) = 1 - P(A)$.`,
            explanationVi: `Theo công thức xác suất của biến cố đối: $P(\\overline{A}) = 1 - P(A)$.`
          };
        } else {
          const k = rInt(2, 6);
          return {
            stemEn: `Find an antiderivative of the function $f(x) = ${k}x^{${k-1}}$ on $\\mathbb{R}$.`,
            stemVi: `Tìm một nguyên hàm của hàm số $f(x) = ${k}x^{${k-1}}$ trên $\\mathbb{R}$.`,
            options: [
              { id: "A", text: `$F(x) = x^{${k}}$`, isCorrect: true },
              { id: "B", text: `$F(x) = ${k}x^{${k}}$`, isCorrect: false },
              { id: "C", text: `$F(x) = x^{${k-1}}$`, isCorrect: false },
              { id: "D", text: `$F(x) = ${k*(k-1)}x^{${k-2}}$`, isCorrect: false }
            ],
            explanationEn: `Using basic power rule $\\int ${k}x^{${k-1}}\\,dx = x^{${k}} + C$. Correct is A.`,
            explanationVi: `Áp dụng công thức nguyên hàm cơ bản của lũy thừa: $\\int ${k}x^{${k-1}}\\,dx = x^{${k}} + C$. Chọn A.`
          };
        }
      } else if (level === 'TH') {
        if (isVector) {
          const x1 = rInt(1, 4), y1 = rInt(1, 4), x2 = rInt(1, 4), y2 = rInt(-4, 0);
          const dot = x1 * x2 + y1 * y2;
          return {
            stemEn: `In plane $Oxy$, given two vectors $\\vec{u} = (${x1}; ${y1})$ and $\\vec{v} = (${x2}; ${y2})$. Calculate the dot product $\\vec{u} \\cdot \\vec{v}$.`,
            stemVi: `Trong mặt phẳng $Oxy$, cho hai vectơ $\\vec{u} = (${x1}; ${y1})$ và $\\vec{v} = (${x2}; ${y2})$. Tính tích vô hướng $\\vec{u} \\cdot \\vec{v}$.`,
            options: [
              { id: "A", text: `$${dot}$`, isCorrect: true },
              { id: "B", text: `$${dot + 2}$`, isCorrect: false },
              { id: "C", text: `$${dot - 3}$`, isCorrect: false },
              { id: "D", text: `$${dot + 5}$`, isCorrect: false }
            ],
            explanationEn: `$\\vec{u} \\cdot \\vec{v} = (${x1})(${x2}) + (${y1})(${y2}) = ${dot}$.`,
            explanationVi: `Áp dụng biểu thức tọa độ của tích vô hướng: $\\vec{u} \\cdot \\vec{v} = (${x1})(${x2}) + (${y1})(${y2}) = ${dot}$.`
          };
        } else {
          const a = rInt(1, 3);
          const val = a * 2;
          return {
            stemEn: `Evaluate the definite integral $I = \\int_{0}^{2} (${a}x + 1)\\,dx$.`,
            stemVi: `Tính tích phân xác định $I = \\int_{0}^{2} (${a}x + 1)\\,dx$.`,
            options: [
              { id: "A", text: `$${val + 2}$`, isCorrect: true },
              { id: "B", text: `$${val + 4}$`, isCorrect: false },
              { id: "C", text: `$${val}$`, isCorrect: false },
              { id: "D", text: `$${val - 1}$`, isCorrect: false }
            ],
            explanationEn: `$I = \\left[ \\frac{${a}x^2}{2} + x \\right]_{0}^{2} = \\frac{${a}(4)}{2} + 2 = ${val + 2}$.`,
            explanationVi: `Nguyên hàm là $F(x) = \\frac{${a}x^2}{2} + x$. Thay cận: $F(2) - F(0) = ${val + 2}$.`
          };
        }
      } else if (level === 'VD') {
        const mVal = rInt(2, 5);
        return {
          stemEn: `Find all values of real parameter $m$ so that the function $y = x^3 - 3mx^2 + 12x + 1$ has two distinct critical points.`,
          stemVi: `Tìm tất cả các giá trị thực của tham số $m$ để hàm số $y = x^3 - 3mx^2 + 12x + 1$ có hai điểm cực trị phân biệt.`,
          options: [
            { id: "A", text: `$m < -2$ hoặc $m > 2$`, isCorrect: true },
            { id: "B", text: `$-2 < m < 2$`, isCorrect: false },
            { id: "C", text: `$m > 2$`, isCorrect: false },
            { id: "D", text: `$m \\neq 2$`, isCorrect: false }
          ],
          explanationEn: `Derivative $y' = 3x^2 - 6mx + 12 = 0 \\iff x^2 - 2mx + 4 = 0$. For two distinct roots, $\\Delta' = m^2 - 4 > 0 \\iff m < -2$ or $m > 2$.`,
          explanationVi: `Ta có $y' = 3x^2 - 6mx + 12$. Hàm số có hai điểm cực trị phân biệt khi và chỉ khi phương trình $y' = 0$ có hai nghiệm phân biệt: $\\Delta' = m^2 - 4 > 0 \\iff m < -2$ hoặc $m > 2$.`
        };
      } else {
        // VDC
        return {
          stemEn: `A manufacturer produces an open rectangular box from a square sheet of metal of side $12\\text{ cm}$ by cutting equal squares from each corner. Find the maximum volume of the box in $\\text{cm}^3$.`,
          stemVi: `Một xưởng sản xuất cần làm một chiếc hộp hình chữ nhật không nắp từ một tấm tôn hình vuông cạnh $12\\text{ cm}$ bằng cách cắt bỏ 4 góc hình vuông cạnh $x\\text{ cm}$ rồi gập mép lên. Thể tích lớn nhất của chiếc hộp là bao nhiêu $\\text{cm}^3$?`,
          options: [
            { id: "A", text: `$128\\text{ cm}^3$`, isCorrect: true },
            { id: "B", text: `$144\\text{ cm}^3$`, isCorrect: false },
            { id: "C", text: `$96\\text{ cm}^3$`, isCorrect: false },
            { id: "D", text: `$160\\text{ cm}^3$`, isCorrect: false }
          ],
          explanationEn: `Volume $V(x) = x(12 - 2x)^2 = 4x^3 - 48x^2 + 144x$ with $0 < x < 6$. $V'(x) = 12(x-2)(x-6) = 0 \\implies x = 2$. $V(2) = 2(8)^2 = 128\\text{ cm}^3$.`,
          explanationVi: `Thể tích hộp là $V(x) = x(12 - 2x)^2 = 4x(6 - x)^2$ với $0 < x < 6$. Lấy đạo hàm $V'(x) = 12x^2 - 96x + 144 = 0 \\implies x = 2$. Giá trị thể tích lớn nhất đạt được là $V(2) = 2 \\cdot 8^2 = 128\\text{ cm}^3$.`
        };
      }
    }

    // 2. DẠNG ĐÚNG/SAI 4 MỆNH ĐỀ (TRUE/FALSE 4 PROPOSITIONS)
    if (type === 'true-false-4') {
      if (level === 'NB' || level === 'TH') {
        const c = rInt(1, 4);
        return {
          stemEn: `Given function $f(x) = x^3 - 3x + ${c}$. Consider the validity of each statement:`,
          stemVi: `Cho hàm số $f(x) = x^3 - 3x + ${c}$. Xét tính Đúng / Sai của các mệnh đề sau:`,
          propositions: [
            {
              id: "a",
              textEn: `The derivative is $f'(x) = 3x^2 - 3$.`,
              textVi: `Đạo hàm của hàm số là $f'(x) = 3x^2 - 3$.`,
              isCorrect: true,
              explanationEn: `$(x^3)' = 3x^2$, $(-3x)' = -3$. True.`,
              explanationVi: `Đạo hàm từng số hạng: $(x^3)' = 3x^2, (-3x)' = -3$. Đúng.`
            },
            {
              id: "b",
              textEn: `The equation $f'(x) = 0$ has two roots $x = \\pm 1$.`,
              textVi: `Phương trình $f'(x) = 0$ có hai nghiệm phân biệt $x = \\pm 1$.`,
              isCorrect: true,
              explanationEn: `$3x^2 - 3 = 0 \\iff x^2 = 1 \\implies x = \\pm 1$. True.`,
              explanationVi: `$3(x^2 - 1) = 0 \\implies x = \\pm 1$. Đúng.`
            },
            {
              id: "c",
              textEn: `The function is increasing on interval $(-1; 1)$.`,
              textVi: `Hàm số đồng biến trên khoảng $(-1; 1)$.`,
              isCorrect: false,
              explanationEn: `On $(-1, 1)$, $f'(x) < 0$, so function is decreasing. False.`,
              explanationVi: `Trên $(-1; 1)$, $f'(x) < 0$ nên hàm số nghịch biến. Sai.`
            },
            {
              id: "d",
              textEn: `The local maximum point is $x = -1$.`,
              textVi: `Điểm cực đại của hàm số là $x = -1$.`,
              isCorrect: true,
              explanationEn: `$f'(x)$ changes sign from positive to negative across $x = -1$. True.`,
              explanationVi: `Qua $x = -1$, $f'(x)$ đổi dấu từ dương sang âm nên $x = -1$ là điểm cực đại. Đúng.`
            }
          ],
          explanationEn: `Summary: a) True, b) True, c) False, d) True.`,
          explanationVi: `Tổng hợp: Mệnh đề a) Đúng, b) Đúng, c) Sai, d) Đúng.`
        };
      } else {
        // VD / VDC
        return {
          stemEn: `Given rational function $y = \\frac{2x + 1}{x - 1}$ with curve $(C)$. Determine whether each statement is True or False:`,
          stemVi: `Cho hàm số phân thức hữu tỉ $y = \\frac{2x + 1}{x - 1}$ có đồ thị $(C)$. Xét tính Đúng / Sai của các mệnh đề sau:`,
          propositions: [
            {
              id: "a",
              textEn: `The line $x = 1$ is the vertical asymptote of $(C)$.`,
              textVi: `Đường thẳng $x = 1$ là tiệm cận đứng của đồ thị $(C)$.`,
              isCorrect: true,
              explanationEn: `$\\lim_{x \\to 1^+} \\frac{2x+1}{x-1} = +\\infty$. True.`,
              explanationVi: `Vì $\\lim_{x \\to 1^+} y = +\\infty$ nên $x = 1$ là tiệm cận đứng. Đúng.`
            },
            {
              id: "b",
              textEn: `The line $y = 1$ is the horizontal asymptote of $(C)$.`,
              textVi: `Đường thẳng $y = 1$ là tiệm cận ngang của đồ thị $(C)$.`,
              isCorrect: false,
              explanationEn: `$\\lim_{x \\to \\pm\\infty} \\frac{2x+1}{x-1} = 2$, horizontal asymptote is $y = 2$. False.`,
              explanationVi: `Ta có $\\lim_{x \\to \\pm\\infty} y = 2$ nên tiệm cận ngang là $y = 2$. Sai.`
            },
            {
              id: "c",
              textEn: `The intersection point of the two asymptotes is $I(1; 2)$.`,
              textVi: `Giao điểm của hai đường tiệm cận là $I(1; 2)$.`,
              isCorrect: true,
              explanationEn: `Asymptotes are $x = 1$ and $y = 2$, intersection is $I(1; 2)$. True.`,
              explanationVi: `Hai tiệm cận $x = 1$ và $y = 2$ cắt nhau tại tâm đối xứng $I(1; 2)$. Đúng.`
            },
            {
              id: "d",
              textEn: `The product of distances from any point on $(C)$ to both asymptotes is equal to $3$.`,
              textVi: `Tích khoảng cách từ một điểm bất kỳ trên $(C)$ đến hai đường tiệm cận luôn bằng $3$.`,
              isCorrect: true,
              explanationEn: `$d_1 \\cdot d_2 = |x_0 - 1| \\cdot \\left| \\frac{2x_0+1}{x_0-1} - 2 \\right| = |x_0 - 1| \\cdot \\frac{3}{|x_0 - 1|} = 3$. True.`,
              explanationVi: `Với $M(x_0; y_0) \\in (C)$, tích khoảng cách $d_1 \\cdot d_2 = |x_0 - 1| \\cdot \\left| \\frac{3}{x_0 - 1} \\right| = 3$. Đúng.`
            }
          ],
          explanationEn: `Summary: a) True, b) False, c) True, d) True.`,
          explanationVi: `Tổng kết: a) Đúng, b) Sai, c) Đúng, d) Đúng.`
        };
      }
    }

    // 3. DẠNG ĐIỀN ĐÁP SỐ NGẮN (SHORT ANSWER)
    if (level === 'NB' || level === 'TH') {
      const u1 = rInt(1, 3), u2 = rInt(2, 5);
      const ans = u1 * u1 + u2 * u2;
      return {
        stemEn: `In Cartesian plane $Oxy$, calculate the square of the magnitude of vector $\\vec{u} = (${u1}; ${u2})$.`,
        stemVi: `Trong mặt phẳng tọa độ $Oxy$, tính bình phương độ dài của vectơ $\\vec{u} = (${u1}; ${u2})$ (tức $|\\vec{u}|^2$).`,
        correctAnswer: `${ans}`,
        acceptableAnswers: [`${ans}`, `${ans}.0`],
        tolerance: 0.01,
        explanationEn: `$|\\vec{u}|^2 = (${u1})^2 + (${u2})^2 = ${ans}$.`,
        explanationVi: `Bình phương độ dài vectơ bằng tổng bình phương các tọa độ: $|\\vec{u}|^2 = ${u1}^2 + ${u2}^2 = ${ans}$.`
      };
    } else {
      // VD / VDC
      const p = rInt(2, 4);
      const ans = Math.round(p * 2);
      return {
        stemEn: `Calculate the area of the planar region bounded by parabola $y = ${p}x - x^2$ and the $x$-axis.`,
        stemVi: `Tính diện tích hình phẳng giới hạn bởi đường cong parabol $y = ${p}x - x^2$ và trục hoành $Ox$. (Làm tròn đến 2 chữ số thập phân).`,
        correctAnswer: `${(Math.pow(p, 3) / 6).toFixed(2)}`,
        acceptableAnswers: [`${(Math.pow(p, 3) / 6).toFixed(2)}`, `${Math.pow(p, 3)}/6`],
        tolerance: 0.05,
        explanationEn: `Roots are $x = 0, x = ${p}$. Area $S = \\int_{0}^{${p}} (${p}x - x^2)\\,dx = \\left[ \\frac{${p}x^2}{2} - \\frac{x^3}{3} \\right]_{0}^{${p}} = \\frac{${p}^3}{6} \\approx ${(Math.pow(p, 3) / 6).toFixed(2)}$.`,
        explanationVi: `Phương trình hoành độ giao điểm $x(${p} - x) = 0 \\implies x = 0, x = ${p}$. Diện tích $S = \\int_{0}^{${p}} (${p}x - x^2)\\,dx = \\frac{${p}^3}{6} \\approx ${(Math.pow(p, 3) / 6).toFixed(2)}$.`
      };
    }
  },

  /**
   * Sinh tự động TOÀN BỘ bài thi theo đúng mức độ nhận thức của từng câu đã chọn
   */
  async generateFullQuizAI({ questions = [], topic = '', grade = 'Khối 12', apiKey = '', preferredModel = 'gemini-2.5-flash', onProgress = null }) {
    if (!questions || !questions.length) return [];
    const generatedQuestions = [];

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (typeof onProgress === 'function') {
        onProgress(i + 1, questions.length, q.level || 'TH');
      }

      try {
        const genQ = await this.generateSingleQuestionAI({
          type: q.type || 'multiple-choice',
          level: q.level || 'TH',
          topic: topic,
          grade: grade,
          apiKey: apiKey,
          preferredModel: preferredModel
        });

        generatedQuestions.push({
          ...q,
          ...genQ,
          id: q.id || `q-${i + 1}`,
          type: q.type,
          level: q.level || 'TH',
          points: q.points || (q.type === 'true-false-4' ? 4.0 : (q.type === 'short-answer' ? 3.0 : 2.5))
        });
      } catch (err) {
        console.warn(`Lỗi sinh câu hỏi ${i + 1}:`, err);
        const fallbackQ = this.generateSmartFallbackQuestion(q.type || 'multiple-choice', q.level || 'TH', topic, grade);
        generatedQuestions.push({
          ...q,
          ...fallbackQ,
          id: q.id || `q-${i + 1}`,
          type: q.type,
          level: q.level || 'TH',
          points: q.points || 2.5
        });
      }
    }

    return generatedQuestions;
  },

  /**
   * Biên soạn bài giảng bám sát mục tiêu bài học & đảm bảo tính chính xác khoa học
   */
  async generateScientificLesson({
    titleVi = '',
    titleEn = '',
    grade = 'Khối 10',
    overviewVi = '',
    overviewEn = '',
    duration = '45 minutes',
    documentText = '',
    imageBase64 = null,
    imageMime = 'image/jpeg',
    apiKey = '',
    preferredModel = 'gemini-2.5-flash',
    onProgress = null
  }) {
    // 1. If image uploaded with API Key, use Gemini Vision
    if (imageBase64 && apiKey) {
      const visionPrompt = `Biên soạn bài giảng Toán học song ngữ dựa trên ảnh tài liệu/trang SGK này, bắt buộc bám sát mục tiêu bài học:\n- Tên bài: ${titleVi || 'Toán học'} (${titleEn || 'Mathematics'})\n- Mục tiêu bài giảng: ${overviewVi || overviewEn}\n- Khối lớp: ${grade}\nĐảm bảo tính chính xác khoa học tuyệt đối, công thức toán LaTeX chuẩn, giải thích từng bước logic.`;
      try {
        const lesson = await this.generateWithGeminiVision(apiKey, imageBase64, imageMime, visionPrompt, preferredModel, onProgress);
        if (lesson) {
          if (titleVi) lesson.meta.titleVi = titleVi;
          if (titleEn) lesson.meta.titleEn = titleEn;
          if (overviewVi) lesson.meta.overviewVi = overviewVi;
          if (overviewEn) lesson.meta.overviewEn = overviewEn;
          if (grade) lesson.meta.grade = grade;
          return lesson;
        }
      } catch (err) {
        console.warn('Gemini Vision OCR failed, falling back to text/curriculum engine:', err);
      }
    }

    // 2. If Gemini API Key is available, generate with structured scientific prompt
    if (apiKey) {
      const prompt = `Bạn là Chuyên gia Sư phạm và Nhà Toán học hàng đầu về Toán THPT (Chương trình GDPT 2018) và Toán Song ngữ Anh - Việt.
Nhiệm vụ: Biên soạn một bài giảng Toán học song ngữ hoàn chỉnh, BÁM SÁT CHẶT CHẼ MỤC TIÊU BÀI HỌC và ĐẢM BẢO TÍNH CHÍNH XÁC KHOA HỌC TUYỆT ĐỐI.

THÔNG TIN & MỤC TIÊU BÀI HỌC:
- Tên bài học tiếng Việt: ${titleVi || 'Tổng và hiệu của hai vectơ'}
- Tên bài học tiếng Anh: ${titleEn || 'Addition and Subtraction of Vectors'}
- Khối lớp / Môn học: ${grade || 'Lớp 10 / Hình học'}
- Thời lượng: ${duration || '45 phút'}
- Mô tả mục tiêu bài giảng (Tiếng Việt): ${overviewVi || 'Nắm vững các quy tắc phép toán vectơ và ứng dụng hình học.'}
- Mô tả mục tiêu bài giảng (English Overview): ${overviewEn || 'Master vector addition and subtraction rules and geometric applications.'}
${documentText ? `\nTÀI LIỆU NGUỒN TẢI LÊN CỦA GIÁO VIÊN:\n${documentText.slice(0, 3500)}\n` : ''}

YÊU CẦU BẮT BUỘC ĐẢM BẢO TÍNH CHÍNH XÁC KHOA HỌC:
1. Bám sát 100% mục tiêu bài học đã nêu. Nội dung phải phục vụ trực tiếp cho mục tiêu bài giảng.
2. Tính chính xác khoa học tuyệt đối:
   - Các định lý, quy tắc toán học (Quy tắc tam giác, Quy tắc hình bình hành, Quy tắc hiệu...) phải phát biểu chuẩn xác, rõ điều kiện.
   - Công thức toán học định dạng chuẩn LaTeX kẹp giữa dấu $ (inline) hoặc $$ (display block).
   - Các bước giải của ví dụ mẫu (Worked Examples) phải giải thích từng bước rõ ràng, logic suy luận chặt chẽ.
   - Thuật ngữ toán học tiếng Anh chuẩn học thuật quốc tế kèm phiên âm IPA chuẩn.
3. Trả về đúng JSON Schema quy định:
{
  "meta": {
    "titleEn": "${titleEn || 'Addition and Subtraction of Vectors'}",
    "titleVi": "${titleVi || 'Tổng và hiệu của hai vectơ'}",
    "grade": "${grade || 'Khối 10'}",
    "duration": "${duration || '45 minutes'}",
    "overviewEn": "${overviewEn || '...'}",
    "overviewVi": "${overviewVi || '...'}"
  },
  "concepts": [
    { "id": "c1", "titleEn": "...", "titleVi": "...", "latex": "...", "descEn": "...", "descVi": "...", "notesEn": "...", "notesVi": "..." }
  ],
  "vocabulary": [
    { "id": "v1", "term": "...", "ipa": "...", "pos": "noun", "meaningVi": "...", "exampleEn": "...", "exampleVi": "..." }
  ],
  "examples": [
    { "id": "ex1", "titleEn": "...", "titleVi": "...", "problemEn": "...", "problemVi": "...", "steps": [ { "stepNum": 1, "titleEn": "...", "titleVi": "...", "latex": "...", "explanationEn": "...", "explanationVi": "..." } ] }
  ],
  "quiz": {
    "titleEn": "...", "titleVi": "...", "timeMinutes": 15,
    "questions": [
      { "id": "q1", "type": "multiple-choice", "points": 2.5, "level": "NB", "stemEn": "...", "stemVi": "...", "options": [ { "id": "A", "text": "...", "isCorrect": true }, { "id": "B", "text": "...", "isCorrect": false }, { "id": "C", "text": "...", "isCorrect": false }, { "id": "D", "text": "...", "isCorrect": false } ], "explanationEn": "...", "explanationVi": "..." }
    ]
  }
}`;
      try {
        const lesson = await this.generateWithGemini(apiKey, prompt, titleVi, preferredModel, onProgress);
        if (lesson && lesson.concepts && lesson.concepts.length > 0) {
          if (titleVi) lesson.meta.titleVi = titleVi;
          if (titleEn) lesson.meta.titleEn = titleEn;
          if (overviewVi) lesson.meta.overviewVi = overviewVi;
          if (overviewEn) lesson.meta.overviewEn = overviewEn;
          if (grade) lesson.meta.grade = grade;
          return lesson;
        }
      } catch (err) {
        console.warn('Gemini API call failed, using high-precision offline curriculum generator:', err);
      }
    }

    // 3. High-precision Offline Scientific Generator
    return this.buildScientificOfflineLesson({
      titleVi, titleEn, grade, overviewVi, overviewEn, duration, documentText
    });
  },

  buildScientificOfflineLesson({ titleVi, titleEn, grade, overviewVi, overviewEn, duration, documentText }) {
    const textCombo = `${titleVi} ${titleEn} ${overviewVi} ${overviewEn} ${documentText}`.toLowerCase();

    // 1. Identify best curriculum database key
    let bestKey = 'vectors-sum-diff-grade10';
    if (textCombo.includes('tích phân') || textCombo.includes('integral') || textCombo.includes('diện tích hình phẳng') || textCombo.includes('newton-leibniz')) {
      bestKey = 'integrals-calculus';
    } else if (textCombo.includes('xác suất') || textCombo.includes('probability') || textCombo.includes('biến cố') || textCombo.includes('thống kê')) {
      bestKey = 'probability-statistics';
    } else if (textCombo.includes('số phức') || textCombo.includes('complex') || textCombo.includes('mặt phẳng phức') || textCombo.includes('argand')) {
      bestKey = 'complex-numbers';
    } else if (textCombo.includes('đạo hàm') || textCombo.includes('derivative') || textCombo.includes('cực trị') || textCombo.includes('tiệm cận')) {
      bestKey = 'derivatives-extrema';
    } else if (textCombo.includes('oxyz') || textCombo.includes('không gian') || textCombo.includes('3d')) {
      bestKey = 'vectors-3d';
    } else if (textCombo.includes('tổng và hiệu') || textCombo.includes('hình bình hành') || textCombo.includes('quy tắc tam giác') || textCombo.includes('phép trừ') || textCombo.includes('vectơ') || textCombo.includes('vector')) {
      bestKey = 'vectors-sum-diff-grade10';
    }

    const template = this.curriculumDatabase[bestKey] || this.curriculumDatabase['vectors-sum-diff-grade10'];
    const lesson = JSON.parse(JSON.stringify(template));

    // Customize strictly to the teacher's exact inputs
    lesson.id = 'lesson-' + Date.now();
    lesson.meta = {
      ...lesson.meta,
      titleVi: titleVi || lesson.meta.titleVi,
      titleEn: titleEn || lesson.meta.titleEn,
      grade: grade || lesson.meta.grade,
      duration: duration || lesson.meta.duration,
      overviewVi: overviewVi || lesson.meta.overviewVi,
      overviewEn: overviewEn || lesson.meta.overviewEn
    };

    // If teacher provided source document text, enrich concepts or questions from it
    if (documentText && documentText.trim().length > 20) {
      try {
        const parsedDoc = this.parseRawDocumentText(documentText);
        if (parsedDoc.vocabulary.length > 0) {
          lesson.vocabulary = [...parsedDoc.vocabulary, ...lesson.vocabulary].slice(0, 8);
        }
        if (parsedDoc.concepts.length > 0) {
          lesson.concepts = [...parsedDoc.concepts, ...lesson.concepts].slice(0, 5);
        }
        if (parsedDoc.questions.length > 0) {
          lesson.quiz.questions = [...parsedDoc.questions, ...lesson.quiz.questions].slice(0, 10);
        }
      } catch (e) {
        console.warn('Could not enrich from document text:', e);
      }
    }

    return lesson;
  }
};

window.AIGenerator = AIGenerator;
