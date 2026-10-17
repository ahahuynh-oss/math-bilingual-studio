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
            stemEn: "Two forces $\\vec{F}_1$ and $\\vec{F}_2$ act on an object with magnitudes $|\vec{F}_1| = 3\\text{ N}$, $|\vec{F}_2| = 4\\text{ N}$, and their angle is $90^\\circ$. The resultant force magnitude is:",
            stemVi: "Hai lực $\\vec{F}_1$ và $\\vec{F}_2$ cùng tác dụng vào một chất điểm với độ lớn $|\vec{F}_1| = 3\\text{ N}$, $|\vec{F}_2| = 4\\text{ N}$ và góc giữa chúng là $90^\\circ$. Độ lớn hợp lực $\\vec{F} = \\vec{F}_1 + \\vec{F}_2$ là:",
            options: [
              { id: "A", text: "$5\\text{ N}$", isCorrect: true },
              { id: "B", text: "$7\\text{ N}$", isCorrect: false },
              { id: "C", text: "$1\\text{ N}$", isCorrect: false },
              { id: "D", text: "$12\\text{ N}$", isCorrect: false }
            ],
            explanationEn: "$|\\vec{F}| = \\sqrt{F_1^2 + F_2^2} = \\sqrt{3^2 + 4^2} = 5\\text{ N}$.",
            explanationVi: "Theo định lý Pythagore cho hai lực vuông góc: $|\vec{F}| = \\sqrt{3^2 + 4^2} = 5\\text{ N}$."
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
    cleanJSON = cleanJSON.trim();

    // Regex extract outer JSON if extra text is present
    const jsonMatch = cleanJSON.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanJSON = jsonMatch[0];
    }

    const lessonData = JSON.parse(cleanJSON);
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

    const lessonData = JSON.parse(cleanJSON);
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
  }
};

window.AIGenerator = AIGenerator;
