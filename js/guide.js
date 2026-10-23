/**
 * User Guide & Interactive Step-by-Step Manual
 * Bilingual Math Scaffolding Studio - Dự án Sáng kiến Giáo dục 2026 - Tác giả: Huỳnh Thị Hà
 * Phiên bản: 2026.2.0 (Cập nhật đồng bộ mới nhất)
 * Layout matching Edu SaaS standard: Breadcrumbs, Header Banner, Sticky Table of Contents, Numbered Step Cards
 */

const UserGuide = {
  currentSectionId: 'general-workflow',

  sections: [
    {
      id: 'general-workflow',
      num: 1,
      title: 'Quy trình chung',
      shortTitle: 'Quy trình tổng quan cho giáo viên & học sinh',
      englishTitle: 'General Workflow for Teachers & Students',
      summary: 'Quy trình 4 bước khép kín từ lúc soạn bài giảng, kích hoạt giàn giáo ZPD, làm bài tương tác & luyện nói bản ngữ đến khi xuất bản đa kênh.',
      icon: '✈️',
      steps: [
        {
          num: 1,
          title: 'Soạn bài giảng hoặc Nhập tài liệu Word / PDF / Ảnh chụp',
          englishTitle: 'Create Lesson or Import Word / PDF / Vision OCR',
          desc: 'Thầy cô chọn mục <strong>Soạn bài giảng</strong> trên cây thư mục hoặc bấm <strong>✨ Soạn tự động (AI Studio)</strong>.',
          bullets: [
            '<strong>Chọn chủ đề chuẩn:</strong> Khởi tạo tức thì bài giảng Toán THPT (Khối 10, 11, 12) chuẩn GDPT 2018 với đầy đủ lý thuyết, từ vựng, ví dụ và đề thi.',
            '<strong>Nạp file Word (.docx), PDF hoặc Markdown/LaTeX:</strong> Bộ phân tích thông minh (Smart Parser) tự động bóc tách từ vựng, công thức Toán $LaTeX$ và các câu hỏi trắc nghiệm.',
            '<strong>Quét ảnh chụp đề thi (Gemini Vision OCR):</strong> Kéo thả hoặc dán ảnh (Ctrl + V) từ sách giáo khoa, tài liệu in để AI tự động chuyển thành đề thi song ngữ và phân loại 4 mức độ nhận thức.',
            '<strong>Soạn bài bằng Gemini AI:</strong> Nhập câu lệnh tùy chỉnh (Prompt) để AI tạo nội dung theo yêu cầu sư phạm riêng.'
          ],
          actionBtn: { text: 'Mở Soạn bài giảng', tab: 'builder-lesson', icon: '📝' }
        },
        {
          num: 2,
          title: 'Kích hoạt Gia sư Giàn giáo Nhận thức ZPD (6 nấc)',
          englishTitle: 'Activate 6-Stage Cognitive Scaffolding (Vygotsky ZPD)',
          desc: 'Chuyển sang nhánh <strong>Gia sư giàn giáo ZPD</strong> để thiết lập mức độ nâng đỡ sư phạm tối ưu cho từng đối tượng học sinh.',
          bullets: [
            'Hệ thống triển khai <strong>6 tầng sư phạm hoàn chỉnh</strong>: Bóc tách đề bài & Trọng tâm kiến thức, Bảng thuật ngữ toán có phát âm IPA, Gợi ý Nấc 1 Socratic, Khung tư duy Nấc 2 có checklist từng chặng, Cạm bẫy học sinh cần tránh (Common Pitfalls), và Lời giải mẫu hoàn chỉnh.',
            'Học sinh tự rèn luyện tính độc lập qua <strong>Bài tập song song (Parallel Exercise)</strong> có kiểm tra đáp số tự động theo nguyên lý rút dần giàn giáo (Scaffold Fading).',
            'Giáo viên có thể bấm <strong>"✏️ Sửa bài tập này"</strong> để tùy biến nội dung giàn giáo và lưu trực tiếp vào kho <em>"Bài tập đã tạo"</em>.'
          ],
          actionBtn: { text: 'Mở Không gian Giàn giáo ZPD', tab: 'scaffolding-tutor', icon: '🪜' }
        },
        {
          num: 3,
          title: 'Tổ chức Luyện phát âm Bản ngữ & Thi tương tác',
          englishTitle: 'Pronunciation Shadowing & Interactive Assessment',
          desc: 'Cho học sinh học tập và làm bài trực tiếp trên máy tính hoặc thiết bị di động.',
          bullets: [
            'Học sinh bấm cụm nút <strong>🔊 Nghe chuẩn (1.0x)</strong> và <strong>🐢 Nghe chậm (0.75x)</strong> cạnh từng thuật ngữ và câu hỏi để làm quen với ngữ điệu bản ngữ.',
            'Bấm <strong>🎙️ Luyện theo</strong> để mở phòng thực hành phát âm Shadowing: thu âm qua micro và nhận phản hồi chấm điểm phát âm trực quan.',
            '<strong>Tra cứu thông minh:</strong> Bôi đen bất kỳ từ hoặc câu tiếng Anh nào trên màn hình để nghe đọc và dịch nghĩa tức thì (Floating Tooltip).',
            'Làm bài kiểm tra có đồng hồ đếm ngược, nộp bài nhận điểm số thang 10, phân loại năng lực và đối chiếu đáp án chi tiết.'
          ],
          actionBtn: { text: 'Mở Làm bài tương tác', tab: 'interactive-preview', icon: '🎯' }
        },
        {
          num: 4,
          title: 'Xuất bản Đề in A4, File Word hoặc Web Độc Lập Offline',
          englishTitle: 'Export to Word (.docx), Standalone HTML & Printable A4',
          desc: 'Linh hoạt triển khai trực tiếp trên lớp học hoặc giao bài tập về nhà.',
          bullets: [
            'Bấm <strong>Xuất Word (.doc/.docx)</strong> để tải về: Phiếu bài tập học sinh (chuẩn A4 Times New Roman 12pt), Đề thi kèm đáp án giáo viên, hoặc Phiếu giàn giáo ZPD.',
            'Bấm <strong>Export Standalone HTML</strong> để tạo 1 file duy nhất chạy offline 100% không cần kết nối Internet.',
            'Bấm <strong>In Worksheet A4</strong> để in photocopy trực tiếp chuẩn định dạng máy in trường học.',
            'Mọi nội dung đều được tự động lưu trữ và phân loại trong <strong>Danh sách đã tạo</strong> và <strong>Kho bài tập đã tạo</strong>.'
          ],
          actionBtn: { text: 'Mở Danh sách đã tạo', tab: 'my-exams', icon: '📊' }
        }
      ]
    },

    {
      id: 'gemini-api',
      num: 2,
      title: 'Cấu hình Trợ lý AI Google Gemini',
      shortTitle: 'Hướng dẫn cấu hình & sử dụng AI Google Gemini (Hỗ trợ Gemini 3.8 Flash)',
      englishTitle: 'Google Gemini AI Setup & Model Switching',
      summary: 'Khai thác tối đa trí tuệ nhân tạo thế hệ mới (Gemini 3.8 Flash, 2.5 Flash, 2.0 Flash) hoàn toàn miễn phí để tự động sinh bài giảng và đề thi chuẩn GDPT 2018.',
      icon: '🔑',
      steps: [
        {
          num: 1,
          title: 'Lấy khóa API Key Google Gemini hoàn toàn miễn phí',
          englishTitle: 'Get Free Google Gemini API Key',
          desc: 'Google cung cấp gói miễn phí (Free Tier) với hạn mức hàng triệu tokens mỗi ngày cho mục đích giáo dục.',
          bullets: [
            'Thầy cô truy cập cổng Google AI Studio: <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-indigo-600 font-bold underline">https://aistudio.google.com/app/apikey</a>.',
            'Đăng nhập bằng tài khoản Google cá nhân hoặc tài khoản tổ chức giáo dục.',
            'Bấm nút <strong>Create API Key</strong>, chọn dự án và sao chép chuỗi khóa (bắt đầu bằng <code>AIzaSy...</code>).'
          ]
        },
        {
          num: 2,
          title: 'Lưu khóa API Key & Tùy chọn Mô hình Thế hệ Mới',
          englishTitle: 'Save API Key & Select AI Model',
          desc: 'Khóa được mã hóa và lưu an toàn trên trình duyệt của riêng thầy cô (LocalStorage), tuyệt đối không gửi về máy chủ bên thứ ba.',
          bullets: [
            'Bấm nút <strong>✨ Soạn tự động (AI Studio)</strong> trên thanh bên.',
            'Chọn Tab 3: <strong>🤖 Trợ Lý AI Trực Tuyến (Gemini)</strong>.',
            'Dán khóa API Key vào ô nhập và chọn mô hình mong muốn:',
            '• <strong>gemini-3.8-flash:</strong> Mô hình mới nhất, siêu nhanh, tối ưu hóa lập luận toán học song ngữ.',
            '• <strong>gemini-2.5-flash:</strong> Đạt độ chính xác cao và hiểu biết sâu sắc ngữ cảnh toán học.',
            '• <strong>gemini-1.5-pro:</strong> Tùy chọn chuyên sâu cho các bài toán phân hóa vận dụng cao.',
            'Thầy cô có thể bấm nút <strong>🔍 Quét Model Khả Dụng</strong> để hệ thống tự động kiểm tra các mô hình được kích hoạt trong tài khoản.'
          ],
          actionBtn: { text: 'Mở Trợ lý AI để dán khóa', tab: 'open-ai-modal', icon: '✨' }
        },
        {
          num: 3,
          title: 'Ra lệnh sinh bài giảng & đề thi thông minh',
          englishTitle: 'Prompting for Bilingual Math Content',
          desc: 'Nhập câu lệnh bằng tiếng Việt hoặc tiếng Anh để AI tạo nội dung theo đúng yêu cầu chuyên môn.',
          bullets: [
            'Ví dụ Prompt mẫu: <em>"Soạn bài giảng và 10 câu trắc nghiệm song ngữ chủ đề \'Khoảng cách trong không gian Oxyz\' Toán 12, có 4 câu ABCD, 4 câu Đúng/Sai và 2 câu điền số"</em>.',
            'Hệ thống tự động biên dịch thuật ngữ Anh - Việt, tích hợp công thức $LaTeX$ chuẩn và tự động điền vào trình soạn thảo.'
          ]
        }
      ]
    },

    {
      id: 'vision-ocr',
      num: 3,
      title: 'Quét Đề Từ Ảnh Chụp (Gemini Vision OCR)',
      shortTitle: 'Tính năng quét ảnh đề thi, trang SGK & dán trực tiếp (Ctrl + V)',
      englishTitle: 'Gemini Vision OCR for Math Worksheets & Textbooks',
      summary: 'Công nghệ AI Vision tự động đọc ảnh chụp đề thi giấy, SGK hoặc bảng viết, bóc tách công thức LaTeX, dịch song ngữ và phân loại 4 mức độ nhận thức.',
      icon: '📸',
      steps: [
        {
          num: 1,
          title: 'Nạp ảnh chụp đề thi cực nhanh qua 3 cách',
          englishTitle: 'Upload or Paste Image Instantly',
          desc: 'Hỗ trợ định dạng ảnh PNG, JPG, JPEG, WebP từ mọi nguồn tài liệu.',
          bullets: [
            '<strong>Cách 1 (Dán trực tiếp - Tiện lợi nhất):</strong> Sử dụng tổ hợp phím <kbd class="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">Win + Shift + S</kbd> để chụp ảnh một phần màn hình hoặc trang sách, sau đó nhấn <kbd class="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-300 font-mono text-[10px]">Ctrl + V</kbd> ngay tại màn hình Studio. Hệ thống sẽ tự động mở hộp thoại và tải ảnh vào.',
            '<strong>Cách 2 (Kéo thả):</strong> Kéo tệp ảnh từ máy tính thả trực tiếp vào khung nét đứt màu xanh.',
            '<strong>Cách 3 (Chọn tệp):</strong> Nhấp chuột vào khung nạp ảnh để duyệt tệp từ ổ đĩa.'
          ],
          actionBtn: { text: 'Mở Quét ảnh đề thi (OCR)', tab: 'open-ocr-modal', icon: '📸' }
        },
        {
          num: 2,
          title: 'Tùy chỉnh Mô hình Vision & Yêu cầu sư phạm',
          englishTitle: 'Configure Vision Model & Custom Prompt',
          desc: 'Tối ưu hóa khả năng nhận diện hình ảnh toán học phức tạp.',
          bullets: [
            'Chọn mô hình đề xuất: <strong>gemini-2.5-flash</strong> (chuyên biệt đọc ảnh công thức toán học) hoặc <strong>gemini-1.5-pro</strong> (đọc chữ viết tay khó).',
            'Nhập yêu cầu bổ sung nếu cần (ví dụ: <em>"Chỉ trích xuất 5 câu trắc nghiệm hình học, gắn nhãn mức độ nhận thức theo chương 2"</em>).'
          ]
        },
        {
          num: 3,
          title: 'Khởi chạy Quét & Tự động sinh Đề thi Song ngữ Chuẩn',
          englishTitle: 'Run OCR & Auto-Generate Bilingual Quiz',
          desc: 'Hệ thống tự động thực hiện đa nhiệm vụ chỉ trong vài giây.',
          bullets: [
            'Bấm nút <strong>📸 Quét Ảnh & Tự Động Sinh Đề Thi Chuẩn</strong>.',
            'AI tự động bóc tách từng câu hỏi, chuyển đổi ký hiệu toán thành mã $LaTeX$ chuẩn ($...$ và $$...$$).',
            'Tự động dịch song ngữ Anh - Việt đề bài và các phương án trả lời.',
            '<strong>Gắn thẻ 4 mức độ nhận thức:</strong> Nhận biết (NB), Thông hiểu (TH), Vận dụng (VD), Vận dụng cao (VDC).',
            'Tự động chuyển sang tab <strong>Làm bài tương tác</strong> để thầy cô kiểm tra và học sinh làm bài ngay.'
          ]
        }
      ]
    },

    {
      id: 'lesson-builder',
      num: 4,
      title: 'Thiết kế bài giảng Toán song ngữ',
      shortTitle: 'Quy trình soạn thảo bài giảng tương tác chuẩn GDPT 2018',
      englishTitle: 'Interactive Bilingual Lesson Builder',
      summary: 'Xây dựng bài giảng toàn diện: Metadata, Bảng từ vựng có IPA & phát âm giọng Mỹ, Khái niệm định lý có LaTeX Toolbar, Ví dụ mở từng bước và Canvas Grapher.',
      icon: '📝',
      steps: [
        {
          num: 1,
          title: 'Thiết lập Định danh & Mục tiêu bài học (Metadata & Objectives)',
          englishTitle: 'Lesson Metadata & Learning Objectives',
          desc: 'Khung thông tin chuẩn mực giúp học sinh định hình rõ yêu cầu cần đạt.',
          bullets: [
            'Nhập tiêu đề song ngữ Anh - Việt (ví dụ: <em>Derivatives and Extrema - Đạo hàm & Cực trị hàm số</em>).',
            'Chọn Khối lớp (10, 11, 12), thời lượng giảng dạy (45 phút) và tên giáo viên phụ trách.',
            'Điền mục tiêu bài học (*Learning Objectives*) song ngữ rõ ràng, phân định kiến thức toán và năng lực ngôn ngữ.'
          ],
          actionBtn: { text: 'Đi tới Soạn bài giảng', tab: 'builder-lesson', icon: '✍️' }
        },
        {
          num: 2,
          title: 'Xây dựng Bảng thuật ngữ cốt lõi (Bilingual Vocabulary)',
          englishTitle: 'Core Math Vocabulary with IPA & Web Speech',
          desc: 'Cầu nối ngôn ngữ giúp học sinh vượt qua rào cản từ vựng học thuật.',
          bullets: [
            'Bấm <strong>➕ Thêm từ vựng</strong> để bổ sung thuật ngữ mới.',
            'Nhập từ tiếng Anh (ví dụ: <em>Critical point</em>), nghĩa tiếng Việt (<em>Điểm tới hạn</em>), phiên âm quốc tế IPA (<code>/ˈkrɪt.ɪ.kəl pɔɪnt/</code>) và câu ví dụ toán học.',
            'Hệ thống tự động tích hợp nút nghe phát âm giọng bản ngữ và chế độ luyện đọc theo (Shadowing).'
          ]
        },
        {
          num: 3,
          title: 'Soạn Khái niệm & Định lý với Thanh công cụ gõ nhanh LaTeX',
          englishTitle: 'Theorems & Concepts with Quick LaTeX Toolbar',
          desc: 'Trình bày định nghĩa toán học chuẩn mực với công thức sắc nét.',
          bullets: [
            'Sử dụng thanh công cụ <strong>⚡ Chèn nhanh LaTeX</strong> ở đầu trang để chèn các ký hiệu: phân số $\\frac{a}{b}$, căn bậc hai $\\sqrt{x}$, tích phân $\\int$, đạo hàm $f\'(x)$, giới hạn $\\lim$, vectơ $\\vec{u}$, hệ phương trình $\\begin{cases}...\\end{cases}$.',
            'Hỗ trợ khung xem trước công thức trực tiếp (Live Math Preview) thời gian thực.',
            'Bổ sung ghi chú sư phạm (*Pedagogical Notes*) hướng dẫn học sinh phương pháp tư duy và cách tránh nhầm lẫn lý thuyết.'
          ]
        },
        {
          num: 4,
          title: 'Ví dụ mẫu mở từng bước & Đồ thị hàm số trực quan',
          englishTitle: 'Step-by-Step Worked Examples & Canvas Grapher',
          desc: 'Mô hình hóa đường hướng tư duy cho học sinh noi theo.',
          bullets: [
            '<strong>Ví dụ mẫu mở từng bước:</strong> Chia lời giải thành các chặng logic (Bước 1: Tìm TXĐ & Đạo hàm; Bước 2: Lập bảng biến thiên; Bước 3: Kết luận). Học sinh bấm <em>"➕ Mở bước này"</em> để tự kiểm tra tư duy.',
            '<strong>Interactive Canvas Grapher:</strong> Kéo thanh trượt các hệ số $a, b, c$ của hàm số và quan sát tiếp tuyến tại điểm cực trị thay đổi theo thời gian thực.',
            '<strong>Nhúng GeoGebra:</strong> Nhập mã GeoGebra Material ID để tích hợp mô hình hình học 3D tương tác trực tiếp.'
          ]
        }
      ]
    },

    {
      id: 'scaffolding-zpd',
      num: 5,
      title: 'Gia sư Giàn giáo Nhận thức ZPD (6 nấc)',
      shortTitle: 'Phương pháp sư phạm giàn giáo 6 nấc & Rút dần giàn giáo (Scaffold Fading)',
      englishTitle: '6-Stage Cognitive Scaffolding in Practice',
      summary: 'Hiện thực hóa Thuyết Kiến tạo Xã hội & Vùng phát triển gần nhất (Vygotsky) giúp học sinh trung bình - yếu tự tin giải toán song ngữ mà không bị ngợp.',
      icon: '🪜',
      steps: [
        {
          num: 1,
          title: 'Bản chất Sư phạm của Phương pháp Giàn giáo (Scaffolding)',
          englishTitle: 'Scaffolding Philosophy & ZPD Zone',
          desc: 'Giàn giáo không phải là làm hộ bài toán, mà là tạo các điểm tựa nhận thức tạm thời.',
          bullets: [
            'Học sinh chỉ tiến bộ khi giải bài toán ở độ khó <em>vừa sức với sự hỗ trợ sư phạm</em> (Vùng ZPD - Zone of Proximal Development).',
            'Khi năng lực học sinh tăng dần, các nấc hỗ trợ sẽ được thu gọn lại theo nguyên lý <strong>Rút dần giàn giáo (Scaffold Fading)</strong> để tiến tới tự lập hoàn toàn.'
          ]
        },
        {
          num: 2,
          title: 'Cấu trúc 6 Nấc Thang Nâng đỡ Sư phạm Hoàn chỉnh',
          englishTitle: '6 Pedagogy Scaffolding Layers Breakdown',
          desc: 'Hệ thống thiết kế 6 phân tầng nhận thức logic cho mỗi bài toán:',
          bullets: [
            '<strong>1. Bóc tách đề bài & Trọng tâm kiến thức:</strong> Xác định giả thiết, kết luận và bản chất toán học của bài toán.',
            '<strong>2. Bảng thuật ngữ toán song ngữ:</strong> Cung cấp danh sách từ khóa học thuật kèm phát âm để giải phóng rào cản ngôn ngữ.',
            '<strong>3. Gợi ý Nấc 1 (Tier 1 Hint):</strong> Câu hỏi gợi mở Socratic đánh thức kiến thức nền tảng (mặc định luôn mở để tạo động lực ban đầu).',
            '<strong>4. Khung tư duy Nấc 2 (Tier 2 Step Breakdown):</strong> Phân rã bài toán phức tạp thành các chặng nhỏ có ô kiểm (checkbox) để học sinh tự đánh dấu tiến độ (mặc định thu gọn để rèn tính tự lực).',
            '<strong>5. Cạm bẫy & Sai lầm cần tránh (Common Pitfalls):</strong> Chỉ rõ các điểm học sinh hay nhầm lẫn dấu, điều kiện hoặc công thức.',
            '<strong>6. Lời giải mẫu hoàn chỉnh:</strong> Trình bày bài giải chuẩn mực từng bước có $LaTeX$ để học sinh đối chiếu sau khi tự làm.'
          ],
          actionBtn: { text: 'Mở Không gian Giàn giáo ZPD', tab: 'scaffolding-tutor', icon: '🪜' }
        },
        {
          num: 3,
          title: 'Rút dần giàn giáo với Bài tập song song (Parallel Practice)',
          englishTitle: 'Independent Parallel Practice & Auto-Grading',
          desc: 'Chặng cuối cùng để kiểm chứng năng lực làm chủ kiến thức độc lập của học sinh.',
          bullets: [
            'Học sinh giải bài toán tương tự cùng cấu trúc nhưng thay đổi số liệu.',
            'Nhập đáp số vào ô và bấm <strong>Kiểm tra đáp số</strong> để nhận phản hồi đúng/sai tức thì kèm phân tích kết quả.'
          ]
        },
        {
          num: 4,
          title: 'Biên tập & Quản lý Kho bài tập giàn giáo đã tạo',
          englishTitle: 'Edit & Save Custom Scaffolding Worksheets',
          desc: 'Dễ dàng tùy biến bài toán theo tình hình thực tế lớp học.',
          bullets: [
            'Bấm nút <strong>✏️ Sửa bài tập này</strong> tại giao diện gia sư để mở Modal biên tập trực quan tất cả 6 tầng nội dung.',
            'Bấm <strong>Lưu & Tích Hợp</strong> để tự động lưu vào kho <strong>Bài tập đã tạo</strong> (Scaffold Library).',
            'Thầy cô có thể lọc bài tập theo Khối 10, Khối 11, Khối 12 hoặc xuất file Word giàn giáo chuyên biệt.'
          ],
          actionBtn: { text: 'Xem Kho bài tập đã tạo', tab: 'scaffold-library', icon: '📁' }
        }
      ]
    },

    {
      id: 'quiz-creator',
      num: 6,
      title: 'Soạn & Tổ chức Thi trắc nghiệm 3 dạng',
      shortTitle: 'Quy trình tạo đề thi trắc nghiệm song ngữ 3 dạng câu hỏi chuẩn Bộ GD&ĐT 2025',
      englishTitle: 'Assessment Builder: 3 Standard Question Formats',
      summary: 'Thiết kế đề thi chuẩn hóa theo cấu trúc Đề thi Tốt nghiệp THPT 2025: Trắc nghiệm ABCD, Đúng/Sai 4 mệnh đề tính điểm lũy tiến, và Điền số thực/phân số.',
      icon: '🎯',
      steps: [
        {
          num: 1,
          title: 'Dạng 1: Trắc nghiệm khách quan nhiều lựa chọn (ABCD)',
          englishTitle: 'Multiple-Choice Questions (Single Best Answer)',
          desc: 'Kiểm tra mức độ nhận biết và thông hiểu kiến thức cốt lõi.',
          bullets: [
            'Mỗi câu hỏi có 4 phương án A, B, C, D; giáo viên tích chọn phương án đúng.',
            'Cả đề bài và 4 phương án đều hỗ trợ công thức toán $LaTeX$, âm thanh phát âm tiếng Anh và lời giải chi tiết.',
            'Học sinh chọn 1 phương án duy nhất; tính điểm chuẩn xác theo thang điểm quy định.'
          ],
          actionBtn: { text: 'Mở Soạn đề thi', tab: 'builder-quiz', icon: '🎯' }
        },
        {
          num: 2,
          title: 'Dạng 2: Trắc nghiệm Đúng / Sai 4 mệnh đề (True / False)',
          englishTitle: 'True / False 4 Propositions (THPT 2025 Format)',
          desc: 'Định dạng câu hỏi trọng tâm phân hóa năng lực của kỳ thi tốt nghiệp mới.',
          bullets: [
            'Một bài toán chung dẫn dắt 4 mệnh đề con a), b), c), d); học sinh chọn Đúng hoặc Sai cho từng ý.',
            '<strong>Cách tính điểm lũy tiến chuẩn Bộ GD&ĐT:</strong>',
            '• Đúng 1 ý: đạt <strong>0.1 điểm</strong>.',
            '• Đúng 2 ý: đạt <strong>0.25 điểm</strong>.',
            '• Đúng 3 ý: đạt <strong>0.50 điểm</strong>.',
            '• Đúng cả 4 ý: đạt trọn vẹn <strong>1.00 điểm</strong>.',
            'Hệ thống tự động chấm điểm và lập bảng đối chiếu kết quả từng mệnh đề chuẩn xác.'
          ]
        },
        {
          num: 3,
          title: 'Dạng 3: Điền đáp số ngắn (Short-Answer Math Question)',
          englishTitle: 'Short-Answer Numerical & Fraction Input',
          desc: 'Đo lường năng lực tính toán và giải quyết vấn đề độc lập không có phương án gợi ý.',
          bullets: [
            'Học sinh tính toán và nhập trực tiếp con số, phân số (ví dụ: <code>3/4</code>, <code>-2/5</code>) hoặc số thập phân (<code>0.75</code>).',
            'Hệ thống hỗ trợ cơ chế <strong>Dung sai sai số (Tolerance)</strong> để tự động chấp nhận các dạng biểu diễn tương đương hợp lệ.'
          ]
        },
        {
          num: 4,
          title: 'Nộp bài & Bảng tổng kết năng lực sư phạm tự động',
          englishTitle: 'Auto-Grading & Pedagogical Performance Summary',
          desc: 'Phản hồi học tập tức thì ngay khi học sinh hoàn thành bài làm.',
          bullets: [
            'Đồng hồ đếm ngược (Countdown Timer) và Bảng chọn câu hỏi nhanh (Question Palette) theo dõi tiến độ.',
            'Khi học sinh nộp bài, hệ thống hiển thị điểm số thang 10, phân loại xếp hạng (Xuất sắc, Khá, Đạt, Cần cố gắng).',
            'Tự động mở khóa toàn bộ khung hướng dẫn giải chi tiết (*Step-by-step Solution*) cho từng câu hỏi.'
          ]
        }
      ]
    },

    {
      id: 'test-matrix',
      num: 7,
      title: 'Ma trận đề thi chuẩn Bộ GD&ĐT',
      shortTitle: 'Bảng ma trận 4 mức độ nhận thức (NB • TH • VD • VDC)',
      englishTitle: 'Test Matrix & Cognitive Level Distribution',
      summary: 'Phân tích tự động cấu trúc đề thi theo 4 mức độ nhận thức của Bộ Giáo dục & Đào tạo, hỗ trợ giáo viên kiểm soát chất lượng chuyên môn đề kiểm tra.',
      icon: '📊',
      steps: [
        {
          num: 1,
          title: '4 Mức độ nhận thức theo chuẩn đánh giá mới',
          englishTitle: '4 Cognitive Levels Framework',
          desc: 'Chuẩn hóa việc phân loại câu hỏi trong đề kiểm tra:',
          bullets: [
            '<strong>Nhận biết (NB - Recognition):</strong> Nhận diện định nghĩa, công thức, ký hiệu toán học cơ bản.',
            '<strong>Thông hiểu (TH - Comprehension):</strong> Hiểu bản chất khái niệm, áp dụng trực tiếp 1 công thức vào bài toán đơn giản.',
            '<strong>Vận dụng (VD - Application):</strong> Kết hợp nhiều bước lập luận, biến đổi đại số hoặc giải toán có ngữ cảnh.',
            '<strong>Vận dụng cao (VDC - High Application):</strong> Giải quyết bài toán phân hóa, đòi hỏi tư duy sáng tạo hoặc mô hình hóa thực tế.'
          ]
        },
        {
          num: 2,
          title: 'Xem & Xuất Bảng Ma Trận Đề Tự Động',
          englishTitle: 'View & Analyze Auto-Generated Test Matrix',
          desc: 'Công cụ đắc lực phục vụ hồ sơ chuyên môn và kế hoạch bài dạy của giáo viên.',
          bullets: [
            'Bấm nút <strong>📊 Ma trận đề (Bộ GD&ĐT)</strong> trên thanh công cụ bên trái.',
            'Bảng ma trận tự động thống kê số lượng câu hỏi, số điểm và tỷ lệ phần trăm (%) theo từng phần thi (Phần I: ABCD, Phần II: Đúng/Sai, Phần III: Trả lời ngắn).',
            'Giúp giáo viên cân đối tỷ lệ chuẩn (thông thường: 40% NB - 30% TH - 20% VD - 10% VDC) trước khi in ấn hoặc giao bài cho học sinh.'
          ],
          actionBtn: { text: 'Mở Ma trận đề thi', tab: 'open-matrix-modal', icon: '📊' }
        }
      ]
    },

    {
      id: 'speech-shadowing',
      num: 8,
      title: 'Luyện phát âm Bản ngữ & Dịch tức thì',
      shortTitle: 'Tính năng Nghe chuẩn, Shadowing qua micro & Tra cứu bôi đen (Floating Tooltip)',
      englishTitle: 'Native Audio, Voice Shadowing & Floating Lookup',
      summary: 'Trợ lý âm thanh Web Speech API đồng hành cùng học sinh: nghe phát âm bản xứ, luyện đọc theo có chấm điểm bằng micro và bôi đen tra cứu tức thì.',
      icon: '🎙️',
      steps: [
        {
          num: 1,
          title: 'Tùy chọn Giọng Nữ 👩 / Giọng Nam 👨 theo sở thích',
          englishTitle: 'Female & Male Voice Selection',
          desc: 'Dễ dàng chuyển đổi linh hoạt giữa Giọng Nữ trong trẻo hoặc Giọng Nam trầm ấm.',
          bullets: [
            'Bấm nút <strong>👩/👨 Giọng: Nữ / Nam</strong> trên thanh điều hướng trên cùng để chuyển đổi nhanh.',
            'Hệ thống tự động ưu tiên các giọng đọc cao cấp chuẩn bản ngữ tự nhiên (Microsoft Jenny/Guy Neural, Google US English, Apple Samantha/Alex).',
            'Cài đặt giọng đọc được lưu tự động và áp dụng đồng bộ cho toàn bộ bài học, từ vựng, đề thi và phòng Shadowing.'
          ]
        },
        {
          num: 2,
          title: 'Phát âm chậm, rõ chữ & Ngắt nghỉ nhấn nhá tự nhiên (Prosody)',
          englishTitle: 'Clear Articulation & Prosodic Pauses for Learners',
          desc: 'Tối ưu hóa đặc biệt cho người mới bắt đầu học tiếng Anh chuyên ngành Toán.',
          bullets: [
            '<strong>Tốc độ chuẩn sư phạm (0.88x):</strong> Chậm rãi hơn tốc độ máy thông thường, đọc rõ từng phụ âm cuối (/s/, /ks/, /t/, /d/) và trọng âm từ.',
            '<strong>Tốc độ chậm luyện âm (0.68x 🐢):</strong> Tách bạch từng âm vị, tự động chèn nhịp ngắt vi mô (micro-pause) giữa các từ khó để người nghe kịp thẩm thấu và bắt chước.',
            '<strong>Nhấn nhá tự nhiên:</strong> Tự động ngắt hơi sau các liên từ và vế toán học (<em>"Let, ", "Given that, ", "equals, ", "vector, ", "over, "</em>).'
          ]
        },
        {
          num: 3,
          title: 'Bôi đen văn bản để Tra cứu & Nghe tức thì (Floating Tooltip)',
          englishTitle: 'Highlight Selection Floating Tooltip with Voice Toggle',
          desc: 'Thao tác cực kỳ thuận tiện trên cả trang bài giảng, đề thi và giàn giáo.',
          bullets: [
            'Dùng chuột bôi đen (highlight) một từ hoặc cụm từ tiếng Anh bất kỳ trên màn hình.',
            'Thanh công cụ nổi tinh gọn lập tức xuất hiện với các tùy chọn: <strong>🔊 Nghe</strong>, <strong>🐢 Chậm</strong>, nút <strong>👩/👨 Đổi Giọng</strong> và <strong>🎙️ Luyện nói</strong>.',
            'Học sinh không cần rời khỏi trang web hoặc mở tab từ điển khác để tra cứu.'
          ]
        },
        {
          num: 4,
          title: 'Phòng Luyện nói Shadowing với Micro & Chấm điểm tương tác',
          englishTitle: 'Interactive Voice Shadowing Studio with Dual Voices',
          desc: 'Rèn luyện sự tự tin khi nói toán học tiếng Anh.',
          bullets: [
            'Bấm nút <strong>🎙️ Luyện theo</strong> tại bất kỳ từ vựng hoặc câu hỏi nào để mở phòng thực hành.',
            'Chủ động chọn nghe mẫu bằng <strong>👩 Giọng Nữ</strong> hoặc <strong>👨 Giọng Nam</strong>, bấm <strong>Bắt đầu thu âm</strong> và đọc câu tiếng Anh vào micro thiết bị.',
            'Hệ thống nhận diện giọng nói (Web Speech Recognition) và tô màu trực quan: <span class="text-emerald-600 font-bold">Màu xanh lá</span> (chính xác), <span class="text-rose-600 font-bold">Màu đỏ</span> (cần cải thiện), kèm phần trăm độ chuẩn xác.'
          ],
          actionBtn: { text: 'Mở Làm bài để trải nghiệm Shadowing', tab: 'interactive-preview', icon: '🎙️' }
        },
        {
          num: 5,
          title: 'Nút Bật / Tắt Hiển Thị Song Ngữ Nhanh Chóng',
          englishTitle: 'Global Bilingual Display Toggle',
          desc: 'Linh hoạt điều chỉnh mức độ hỗ trợ tiếng Việt trên thanh tiêu đề.',
          bullets: [
            'Bấm nút <strong>🇻🇳 Dịch: Bật / Tắt</strong> ở thanh điều hướng trên cùng.',
            'Chế độ <em>Bật</em>: Hiển thị đầy đủ cả tiếng Anh và tiếng Việt cho học sinh mới làm quen.',
            'Chế độ <em>Tắt</em>: Ẩn phần dịch tiếng Việt để thử thách học sinh đọc hiểu hoàn toàn bằng tiếng Anh chuyên ngành.'
          ]
        }
      ]
    },

    {
      id: 'export-share',
      num: 9,
      title: 'Xuất bản Word, Standalone HTML & In A4',
      shortTitle: 'Hướng dẫn xuất file Microsoft Word chuẩn in, file Web chạy offline và in ấn A4',
      englishTitle: 'Export to Word (.docx), Standalone HTML & Print',
      summary: 'Đa dạng hóa phương thức chuyển giao bài học: file Word tương thích 100%, trang web độc lập chạy không cần mạng, hoặc phiếu in photocopy A4.',
      icon: '📄',
      steps: [
        {
          num: 1,
          title: 'Xuất file Microsoft Word (.doc / .docx) cho 3 mục đích',
          englishTitle: 'Export to Microsoft Word (.docx)',
          desc: 'Tương thích 100% với MS Word mọi phiên bản, Office 365, Google Docs và LibreOffice.',
          bullets: [
            'Bấm nút <strong>Xuất Word (.doc / .docx)</strong> trên thanh bên.',
            'Chọn 1 trong 3 định dạng chuyên biệt:',
            '• <strong>1. Phiếu bài tập cho học sinh:</strong> Có khung thông tin, bảng điểm, bảng từ vựng song ngữ, các câu hỏi và dòng trống điền đáp án (KHÔNG có lời giải).',
            '• <strong>2. Đề thi kèm đáp án chi tiết cho giáo viên:</strong> Đánh dấu đáp án đúng, bảng Đúng/Sai và toàn bộ hướng dẫn giải từng bước.',
            '• <strong>3. Phiếu giàn giáo sư phạm ZPD:</strong> Xuất toàn bộ 6 tầng giàn giáo của bài toán để phát cho học sinh rèn luyện.',
            'Tất cả file Word đều được thiết lập sẵn khổ A4, căn lề chuẩn 2cm, phông chữ Times New Roman 12pt và bảng biểu sắc nét.'
          ],
          actionBtn: { text: 'Mở Xuất Word (.doc / .docx)', tab: 'open-export-word', icon: '📄' }
        },
        {
          num: 2,
          title: 'Xuất file Web Độc Lập (Export Standalone HTML)',
          englishTitle: 'Single-File Standalone HTML Deployment',
          desc: 'Công nghệ đóng gói toàn bộ ứng dụng thành 1 file duy nhất gửi cho học sinh.',
          bullets: [
            'Bấm nút <strong>Export Standalone HTML</strong> trên thanh công cụ bên trái.',
            'Hệ thống nén toàn bộ nội dung bài giảng, từ vựng, hệ thống thi trắc nghiệm, công cụ âm thanh Web Speech và MathJax vào một tệp <code>.html</code> duy nhất.',
            'Học sinh chỉ cần nhấp đúp chuột vào file tải về là có thể làm bài và học tập trên mọi trình duyệt (Chrome, Safari, Edge, Cốc Cốc) mà <strong>hoàn toàn không cần kết nối mạng Internet</strong>.'
          ],
          actionBtn: { text: 'Tạo File Standalone HTML', tab: 'export-html', icon: '🚀' }
        },
        {
          num: 3,
          title: 'In trực tiếp ra khổ giấy A4 (Worksheet Print)',
          englishTitle: 'Print-Ready A4 Worksheets for Classroom',
          desc: 'Tối ưu hóa máy in trường học không lo lỗi định dạng.',
          bullets: [
            'Bấm <strong>In Worksheet A4</strong>.',
            'Chọn in Đề thi học sinh hoặc Đề thi kèm đáp án giáo viên.',
            'Hệ thống tự động ẩn thanh điều hướng web, căn chỉnh bố cục trang in rõ nét, chống tràn dòng và chống gãy trang công thức toán.'
          ],
          actionBtn: { text: 'Mở Hộp thoại In A4', tab: 'print-a4', icon: '🖨️' }
        },
        {
          num: 4,
          title: 'Lưu trữ & Chuyển giao dữ liệu JSON',
          englishTitle: 'JSON Backup & Inter-Teacher Exchange',
          desc: 'Bảo toàn dữ liệu soạn thảo lâu dài.',
          bullets: [
            'Bấm <strong>Tải JSON</strong> để lưu tệp cấu trúc bài giảng vào máy tính.',
            'Bấm <strong>Nhập JSON</strong> khi muốn phục hồi hoặc chia sẻ bài giảng cho đồng nghiệp sử dụng.'
          ]
        }
      ]
    },

    {
      id: 'library-management',
      num: 10,
      title: 'Quản lý Thư viện & Tùy biến giao diện',
      shortTitle: 'Quản lý Cây thư mục, Danh sách đã tạo, Kho bài tập & Tùy biến không gian làm việc',
      englishTitle: 'Library Management, Tree Navigation & Workspace Customization',
      summary: 'Làm chủ hệ thống cây thư mục 2 nhánh, quản lý danh sách bài giảng và bài tập giàn giáo đã tạo, cùng các công cụ co giãn giao diện làm việc linh hoạt.',
      icon: '📊',
      steps: [
        {
          num: 1,
          title: 'Hệ thống Cây thư mục điều hướng thông minh (Tree Navigation)',
          englishTitle: 'Collapsible Tree Navigation System',
          desc: 'Tổ chức khoa học 2 nhánh hoạt động cốt lõi của giáo viên:',
          bullets: [
            '<strong>Nhánh 1: Soạn bài giảng:</strong> Gồm <em>Danh sách đã tạo</em> (quản lý bài giảng & đề thi), <em>Soạn bài giảng mới</em>, và <em>Soạn đề thi (Quiz)</em>.',
            '<strong>Nhánh 2: Gia sư giàn giáo ZPD:</strong> Gồm <em>Không gian giàn giáo ZPD</em> (giao diện tương tác 6 nấc), và <em>Bài tập đã tạo</em> (kho bài tập giàn giáo).',
            'Cây thư mục hỗ trợ nhấp chuột mở/thu gọn và tự động mở đúng nhánh (Auto-expand) khi chuyển tab.'
          ]
        },
        {
          num: 2,
          title: 'Quản lý "Danh sách đã tạo" & "Kho bài tập giàn giáo"',
          englishTitle: 'Manage Created Lectures & Scaffolding Worksheets',
          desc: 'Tự động đồng bộ hóa mọi bài giảng và đề thi đã tạo vào bộ nhớ LocalStorage.',
          bullets: [
            'Mỗi bài thi có mã định danh duy nhất (ví dụ: <code>P8DZW2</code>, <code>DH-126A</code>), tên bài học, ngày cập nhật và số lượng câu hỏi.',
            '<strong>Lọc theo khối lớp:</strong> Bấm chọn Khối 12, Khối 11, hoặc Khối 10 ở cột bên trái để phân loại nhanh chóng.',
            '<strong>Cụm thao tác nhanh trên mỗi hàng:</strong> Bấm <strong>🎯 Làm bài</strong> (mở làm bài tương tác), <strong>🪜 Giàn giáo</strong> (mở không gian ZPD), <strong>✏️ Sửa</strong> (chỉnh sửa nội dung), <strong>📄 Word</strong> (xuất file Word), hoặc <strong>🔗 Link</strong> (sao chép liên kết gửi cho học sinh).'
          ],
          actionBtn: { text: 'Mở Danh sách đã tạo', tab: 'my-exams', icon: '📊' }
        },
        {
          num: 3,
          title: 'Tùy biến không gian làm việc linh hoạt (Zoom & Resize)',
          englishTitle: 'Workspace Zoom Slider, Sidebar Collapse & Drag Resizer',
          desc: 'Tối ưu hóa diện tích hiển thị trên mọi độ phân giải màn hình:',
          bullets: [
            '<strong>Thu gọn thanh bên (Sidebar Collapse):</strong> Bấm nút biểu tượng hình chữ nhật ở góc trên bên trái để thu nhỏ thanh bên, tăng tối đa không gian hiển thị cho bài giảng.',
            '<strong>Kéo co giãn thanh bên (Sidebar Resizer):</strong> Rê chuột vào vạch ranh giới giữa thanh bên và không gian làm việc để kéo giãn chiều rộng tùy ý (từ 180px đến 500px). Nhấp đúp chuột để trở về kích thước mặc định 260px.',
            '<strong>Thanh trượt thu phóng giao diện (Workspace Zoom Slider):</strong> Kéo thanh trượt 🔍 trên thanh tiêu đề để phóng to hoặc thu nhỏ toàn bộ không gian làm việc từ <strong>75% đến 130%</strong> phù hợp với mắt nhìn hoặc máy chiếu trên lớp.'
          ]
        }
      ]
    },

    {
      id: 'feedback-support',
      num: 11,
      title: 'Báo lỗi & Góp ý sáng kiến',
      shortTitle: 'Kênh tiếp nhận đóng góp chuyên môn sư phạm & Hỗ trợ kỹ thuật trực tiếp',
      englishTitle: 'Pedagogical Feedback, Bug Reporting & Direct Support',
      summary: 'Kênh kết nối trực tiếp với tác giả sáng kiến giáo dục nhằm liên tục hoàn thiện công cụ phục vụ giảng dạy môn Toán song ngữ tại các trường THPT.',
      icon: '💬',
      steps: [
        {
          num: 1,
          title: 'Gửi phản hồi đóng góp cho Dự án',
          englishTitle: 'Submit Feedback & Suggestions',
          desc: 'Dự án Sáng kiến Giáo dục 2026 luôn trân trọng mọi ý kiến đóng góp từ quý thầy cô và các em học sinh.',
          bullets: [
            'Bấm nút <strong>Báo lỗi & góp ý</strong> ở nhóm HỖ TRỢ trên thanh bên trái.',
            'Chọn loại phản hồi: Đóng góp phương pháp sư phạm, Góp ý chuẩn hóa thuật ngữ toán học, hoặc Báo cáo lỗi kỹ thuật.',
            'Nhập nội dung chia sẻ và gửi trực tiếp đến tác giả đề tài.'
          ],
          actionBtn: { text: 'Gửi Góp ý / Báo lỗi', tab: 'open-feedback-modal', icon: '💬' }
        },
        {
          num: 2,
          title: 'Kênh liên hệ trực tiếp Tác giả Đề tài',
          englishTitle: 'Author Information & Open-Source Repository',
          desc: 'Trao đổi chuyên môn và chuyển giao ứng dụng vào thực tế giảng dạy:',
          bullets: [
            '<strong>Tác giả:</strong> Cô Huỳnh Thị Hà - Giáo viên Toán THPT.',
            '<strong>Dự án:</strong> Sáng kiến Giáo dục 2026 - <em>Bilingual Math Scaffolding Studio</em>.',
            '<strong>Email liên hệ:</strong> <a href="mailto:ahahuynh@gmail.com" class="text-indigo-600 font-bold">ahahuynh@gmail.com</a>.',
            '<strong>Mã nguồn mở GitHub:</strong> <a href="https://github.com/ahahuynh-oss/math-bilingual-studio" target="_blank" class="text-indigo-600 font-bold underline">https://github.com/ahahuynh-oss/math-bilingual-studio</a>.'
          ]
        }
      ]
    }
  ],

  init() {
    this.render();
  },

  switchSection(sectionId) {
    this.currentSectionId = sectionId;
    this.render();
    
    // Smooth scroll to top of guide content
    const container = document.getElementById('guide-detail-column');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },

  render() {
    const container = document.getElementById('panel-user-guide');
    if (!container) return;

    const currentSec = this.sections.find(s => s.id === this.currentSectionId) || this.sections[0];
    
    // Title speaker helper
    const renderTitleSpeaker = (enText) => {
      if (window.BilingualHelper && window.BilingualHelper.renderTitleSpeaker) {
        return window.BilingualHelper.renderTitleSpeaker(enText);
      }
      return '';
    };

    container.innerHTML = `
      <!-- ============================================================ -->
      <!-- TOP BANNER CARD -->
      <!-- ============================================================ -->
      <div class="glass-card p-6 sm:p-8 rounded-3xl border border-indigo-100 bg-gradient-to-r from-white via-indigo-50/30 to-amber-50/20 shadow-xs space-y-3">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold shadow-2xs">
          <span>📖</span>
          <span>Cẩm nang sử dụng Studio</span>
        </div>
        
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center flex-wrap gap-2">
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Hướng dẫn cho giáo viên & học sinh
            </h1>
            ${renderTitleSpeaker('Teacher and Student User Manual')}
          </div>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
            Phiên bản 2026.2.0 (Cập nhật mới nhất)
          </span>
        </div>

        <p class="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-3xl">
          Thầy cô và các em bấm chọn <strong>"Mục lục"</strong> ở cột bên trái để chọn nội dung cần hướng dẫn và xem các bước thực hành chi tiết.
        </p>
      </div>

      <!-- ============================================================ -->
      <!-- 2-COLUMN LAYOUT: MỤC LỤC (LEFT) & NỘI DUNG TỪNG BƯỚC (RIGHT) -->
      <!-- ============================================================ -->
      <div class="flex flex-col lg:flex-row gap-6 items-start">
        
        <!-- LEFT COLUMN: MỤC LỤC (TABLE OF CONTENTS) -->
        <div class="w-full lg:w-72 glass-card p-4 rounded-3xl border border-slate-200/90 shadow-xs shrink-0 lg:sticky lg:top-20 space-y-2">
          
          <div class="text-[11px] font-black uppercase tracking-wider text-slate-400 px-3 py-1 flex items-center justify-between">
            <span>MỤC LỤC</span>
            <span class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">${this.sections.length} chuyên đề</span>
          </div>

          <div class="space-y-1">
            ${this.sections.map(sec => {
              const isActive = sec.id === currentSec.id;
              const activeClass = isActive 
                ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 shadow-2xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 font-medium';
              const numBadgeClass = isActive 
                ? 'text-indigo-600 font-black' 
                : 'text-slate-400 font-semibold';

              return `
                <button 
                  onclick="UserGuide.switchSection('${sec.id}')"
                  class="w-full px-3.5 py-2.5 rounded-2xl text-left text-xs sm:text-[13px] flex items-center gap-3 transition-all cursor-pointer ${activeClass}">
                  <span class="w-5 text-center text-xs ${numBadgeClass}">${sec.num}</span>
                  <span class="truncate flex-1">${sec.title}</span>
                  ${isActive ? '<span class="text-indigo-600 text-xs font-bold">›</span>' : ''}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- RIGHT COLUMN: DETAILED STEP-BY-STEP CARDS -->
        <div id="guide-detail-column" class="flex-1 min-w-0 w-full space-y-5">
          
          <!-- Section Heading -->
          <div class="flex items-center flex-wrap gap-2">
            <h2 class="text-lg sm:text-xl font-black text-slate-900">
              ${currentSec.num}. ${currentSec.shortTitle || currentSec.title}
            </h2>
            ${renderTitleSpeaker(currentSec.englishTitle)}
          </div>

          <!-- Subcard Banner -->
          <div class="glass-card p-5 sm:p-6 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/40 via-white to-slate-50 flex items-start gap-4 shadow-xs">
            <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-black shadow-sm shrink-0">
              ${currentSec.icon || '✈️'}
            </div>
            <div class="space-y-1 min-w-0 flex-1">
              <div class="flex items-center flex-wrap gap-2">
                <h3 class="text-base sm:text-lg font-black text-slate-900">
                  ${currentSec.title}
                </h3>
                ${renderTitleSpeaker(currentSec.englishTitle)}
              </div>
              <p class="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                ${currentSec.summary}
              </p>
            </div>
          </div>

          <!-- Step Cards with Numbered Badges (1, 2, 3...) -->
          <div class="space-y-4">
            ${currentSec.steps.map((st, sIdx) => `
              <div class="glass-card p-5 sm:p-6 rounded-3xl border border-slate-200 hover:border-indigo-200 shadow-xs transition-all space-y-3.5">
                
                <!-- Step Header -->
                <div class="flex items-start gap-3.5">
                  <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
                    ${st.num || sIdx + 1}
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center flex-wrap gap-2">
                      <h4 class="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        ${st.title}
                      </h4>
                      ${st.englishTitle ? renderTitleSpeaker(st.englishTitle) : ''}
                    </div>
                    ${st.desc ? `
                      <p class="text-xs text-slate-600 font-normal mt-0.5">${st.desc}</p>
                    ` : ''}
                  </div>
                </div>

                <!-- Step Bullets -->
                ${st.bullets && st.bullets.length ? `
                  <div class="pl-11 space-y-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    ${st.bullets.map(b => `
                      <div class="flex items-start gap-2">
                        <span class="text-indigo-500 font-bold select-none">•</span>
                        <div class="flex-1">${b}</div>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}

                <!-- Quick Action Button if present -->
                ${st.actionBtn ? `
                  <div class="pl-11 pt-1">
                    <button 
                      onclick="UserGuide.handleActionClick('${st.actionBtn.tab}')" 
                      class="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white border border-indigo-200 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer">
                      <span>${st.actionBtn.icon || '👉'}</span>
                      <span>${st.actionBtn.text}</span>
                      <span>➔</span>
                    </button>
                  </div>
                ` : ''}

              </div>
            `).join('')}
          </div>

          <!-- Bottom Navigation (Previous / Next) -->
          <div class="pt-4 flex items-center justify-between text-xs gap-3 flex-wrap">
            ${currentSec.num > 1 ? `
              <button 
                onclick="UserGuide.switchSection('${this.sections[currentSec.num - 2].id}')" 
                class="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all flex items-center gap-1.5 cursor-pointer">
                <span>←</span>
                <span>Bài trước: ${this.sections[currentSec.num - 2].title}</span>
              </button>
            ` : '<div></div>'}

            ${currentSec.num < this.sections.length ? `
              <button 
                onclick="UserGuide.switchSection('${this.sections[currentSec.num].id}')" 
                class="px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 hover:border-indigo-300 font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer">
                <span>Bài tiếp theo: ${this.sections[currentSec.num].title}</span>
                <span>→</span>
              </button>
            ` : '<div></div>'}
          </div>

        </div>

      </div>
    `;

    if (window.App && window.App.triggerMathJax) {
      window.App.triggerMathJax();
    }
  },

  handleActionClick(target) {
    const app = window.App || (typeof App !== 'undefined' ? App : null);
    if (!app) {
      console.warn('App instance not ready yet');
      return;
    }

    if (target === 'open-ai-modal') {
      if (app.openAIGeneratorModal) {
        app.openAIGeneratorModal('gemini');
      }
    } else if (target === 'open-ocr-modal') {
      if (app.openAIGeneratorModal) {
        app.openAIGeneratorModal('ocr');
      }
    } else if (target === 'open-matrix-modal') {
      if (app.openTestMatrixModal) {
        app.openTestMatrixModal();
      }
    } else if (target === 'open-feedback-modal') {
      if (app.openFeedbackModal) {
        app.openFeedbackModal();
      }
    } else if (target === 'open-export-word') {
      if (app.openExportWordModal) {
        app.openExportWordModal();
      }
    } else if (target === 'export-html') {
      if (app.exportStandaloneHTML) {
        app.exportStandaloneHTML();
      }
    } else if (target === 'print-a4') {
      if (app.openPrintModal) {
        app.openPrintModal();
      }
    } else if (app.switchTab) {
      app.switchTab(target);

      // Close mobile drawer if opened
      const sidebar = document.getElementById('app-sidebar');
      const overlay = document.getElementById('sidebar-backdrop');
      if (window.innerWidth < 1024 && sidebar && !sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.add('-translate-x-full');
        if (overlay) overlay.classList.add('hidden');
      }
    }
  }
};

window.UserGuide = UserGuide;
