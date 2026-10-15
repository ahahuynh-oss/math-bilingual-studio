/**
 * User Guide & Interactive Step-by-Step Manual
 * Bilingual Math Scaffolding Studio - Dự án Sáng kiến Giáo dục 2026 - Tác giả: Huỳnh Thị Hà
 * Layout matching Edu SaaS standard: Breadcrumbs, Header Banner, Sticky Table of Contents, Numbered Step Cards
 */

const UserGuide = {
  currentSectionId: 'general-workflow',

  sections: [
    {
      id: 'general-workflow',
      num: 1,
      title: 'Quy trình chung',
      shortTitle: 'Quy trình chung cho giáo viên mới dùng',
      englishTitle: 'General Workflow for Teachers',
      summary: 'Ba bước từ lúc soạn bài giảng, thiết lập giàn giáo sư phạm đến khi học sinh nhận link làm bài & luyện nói.',
      icon: '✈️',
      steps: [
        {
          num: 1,
          title: 'Tạo bài giảng hoặc Nạp tài liệu Word/PDF',
          englishTitle: 'Create Lesson or Import Curriculum',
          desc: 'Thầy cô vào menu <strong>Soạn bài giảng</strong> hoặc bấm nút <strong>✨ Soạn tự động (AI Studio)</strong>.',
          bullets: [
            'Chọn một chủ đề chuẩn THPT (Khối 10, 11, 12) hoặc tải lên file Word (.docx), PDF giáo án sẵn có.',
            'Hệ thống tự động đồng bộ hóa: Mục tiêu bài học (*Objectives*), Từ vựng chuyên ngành có phiên âm IPA, Công thức chuẩn LaTeX và các Ví dụ mẫu giải từng bước (*Step-by-step*).',
            'Thầy cô có thể tùy ý bổ sung các ghi chú sư phạm (*Pedagogical Notes*) song ngữ cho học trò.'
          ],
          actionBtn: { text: 'Mở Soạn bài giảng', tab: 'builder-lesson', icon: '📝' }
        },
        {
          num: 2,
          title: 'Kích hoạt Giàn giáo Sư phạm (Scaffolding 3 nấc)',
          englishTitle: 'Activate 3-Tier Cognitive Scaffolding',
          desc: 'Chuyển sang mục <strong>Gia sư giàn giáo ZPD</strong> để thiết lập mức độ nâng đỡ nhận thức phù hợp với năng lực học sinh.',
          bullets: [
            '<strong>Nấc 1 (Gợi mở tư duy):</strong> Mặc định luôn mở để kích hoạt kiến thức nền tảng và công thức then chốt (chưa tính toán).',
            '<strong>Nấc 2 (Chia nhỏ nhiệm vụ):</strong> Phân rã bài toán thành các chặng vừa sức kèm ô kiểm đánh giá từng bước (mặc định ẩn để rèn tính tự lực).',
            '<strong>Nấc 3 (Lời giải hoàn chỉnh):</strong> Cung cấp đáp án và lập luận chuẩn mực đối chiếu cuối cùng.',
            'Cảnh báo các cạm bẫy học sinh yếu dễ mắc phải (*Common Pitfalls*) và cấp bài tập song hành (*Parallel Practice*).'
          ],
          actionBtn: { text: 'Mở Gia sư Giàn giáo ZPD', tab: 'scaffolding-tutor', icon: '🪜' }
        },
        {
          num: 3,
          title: 'Tổ chức Luyện phát âm & Làm bài thi Tương tác',
          englishTitle: 'Pronunciation Shadowing & Interactive Quiz',
          desc: 'Cho học sinh làm bài trực tiếp trên máy tính hoặc điện thoại thông minh.',
          bullets: [
            'Tận dụng cụm nút <strong>🔊 Nghe</strong>, <strong>🐢 Nghe chậm</strong> và <strong>🎙️ Luyện theo</strong> ngay cạnh từng thuật ngữ và câu hỏi.',
            'Học sinh có thể <strong>bôi đen bất kỳ từ hoặc câu tiếng Anh nào</strong> trên màn hình để nghe phát âm và dịch nghĩa tức thì.',
            'Làm bài thi trắc nghiệm (ABCD, Đúng/Sai 4 mệnh đề, Điền số) và nhận kết quả, điểm số, nhận xét sư phạm ngay khi nộp bài.'
          ],
          actionBtn: { text: 'Mở Làm bài tương tác', tab: 'interactive-preview', icon: '🎯' }
        },
        {
          num: 4,
          title: 'Xuất bản đề in A4, File Word hoặc Chia sẻ Link',
          englishTitle: 'Export Word, Printable A4 & Share Link',
          desc: 'Linh hoạt triển khai trực tiếp trên lớp học hoặc giao bài tập về nhà.',
          bullets: [
            'Bấm <strong>Xuất Word (.doc/.docx)</strong> để tải về: Phiếu bài tập học sinh (không có giải), Đề kèm đáp án chi tiết cho giáo viên, hoặc Phiếu giàn giáo ZPD.',
            'Bấm <strong>Export Standalone HTML</strong> để tạo 1 file duy nhất chạy offline mọi lúc mọi nơi không cần cài đặt.',
            'Mọi đề thi và bài giảng đã soạn đều tự động lưu vào <strong>Danh sách đã tạo</strong>.'
          ],
          actionBtn: { text: 'Mở Danh sách đã tạo', tab: 'my-exams', icon: '📊' }
        }
      ]
    },

    {
      id: 'gemini-api',
      num: 2,
      title: 'Cấu hình API Key Google',
      shortTitle: 'Hướng dẫn cấu hình & sử dụng API Key Google Gemini',
      englishTitle: 'Google Gemini AI Setup & Configuration',
      summary: 'Khai thác tối đa trí tuệ nhân tạo Gemini 2.5 Flash hoàn toàn miễn phí để tự động soạn bài giảng và trích xuất câu hỏi.',
      icon: '🔑',
      steps: [
        {
          num: 1,
          title: 'Lấy khóa API Key Google miễn phí',
          englishTitle: 'Get Free Gemini API Key',
          desc: 'Google cung cấp gói miễn phí (Free Tier) với hàng triệu tokens mỗi ngày cho mục đích giáo dục.',
          bullets: [
            'Thầy cô truy cập trang Google AI Studio tại: <a href="https://aistudio.google.com/app/apikey" target="_blank" class="text-indigo-600 font-bold underline">https://aistudio.google.com/app/apikey</a>.',
            'Đăng nhập bằng tài khoản Google cá nhân hoặc tài khoản trường học.',
            'Bấm nút <strong>Create API Key</strong> và sao chép chuỗi ký tự khóa được tạo (bắt đầu bằng <code>AIzaSy...</code>).'
          ]
        },
        {
          num: 2,
          title: 'Dán API Key vào Bilingual Math Studio',
          englishTitle: 'Save API Key in Studio Settings',
          desc: 'Khóa được lưu mã hóa an toàn trên trình duyệt của riêng thầy cô (LocalStorage), không gửi về máy chủ bên ngoài.',
          bullets: [
            'Bấm nút <strong>✨ Soạn tự động (AI Studio)</strong> trên thanh bên.',
            'Chọn Tab số 3: <strong>🤖 Trợ Lý AI Trực Tuyến (Gemini)</strong>.',
            'Dán khóa API Key vào ô nhập và bấm <strong>Lưu & Kiểm Tra Khóa</strong>.'
          ],
          actionBtn: { text: 'Mở Trợ lý AI để dán khóa', tab: 'open-ai-modal', icon: '✨' }
        },
        {
          num: 3,
          title: 'Ra lệnh sinh bài giảng & đề thi thông minh',
          englishTitle: 'Prompting for Bilingual Content',
          desc: 'Nhập câu lệnh bằng tiếng Việt hoặc tiếng Anh để AI tạo nội dung chuẩn GDPT 2018.',
          bullets: [
            'Ví dụ: <em>"Soạn bài giảng và 5 câu trắc nghiệm song ngữ chủ đề Tích phân tính thể tích khối tròn xoay lớp 12"</em>.',
            'Hệ thống tự động biên dịch, gắn thẻ LaTeX và tích hợp phiên âm IPA chuẩn xác.'
          ]
        }
      ]
    },

    {
      id: 'lesson-builder',
      num: 3,
      title: 'Soạn bài giảng Toán song ngữ',
      shortTitle: 'Quy trình thiết kế bài giảng Toán song ngữ chuẩn GDPT 2018',
      englishTitle: 'Designing Bilingual Math Lessons',
      summary: 'Xây dựng bài giảng trực quan kết hợp thuật ngữ Anh - Việt, công thức LaTeX và ví dụ có lời giải mở từng bước.',
      icon: '📝',
      steps: [
        {
          num: 1,
          title: 'Điền thông tin định danh bài học (Metadata)',
          englishTitle: 'Fill Lesson Metadata',
          desc: 'Thiết lập tiêu đề bài học song ngữ và các thông số cần thiết.',
          bullets: [
            'Nhập tên bài học tiếng Anh và tiếng Việt (ví dụ: <em>Extrema of Functions - Cực trị của hàm số</em>).',
            'Chọn Khối lớp (10, 11, 12), thời lượng mục tiêu (45 phút) và tên giáo viên phụ trách.',
            'Viết tóm tắt mục tiêu bài học (*Learning Objectives*) song ngữ rõ ràng.'
          ],
          actionBtn: { text: 'Đi tới Soạn bài giảng', tab: 'builder-lesson', icon: '📋' }
        },
        {
          num: 2,
          title: 'Xây dựng Bảng thuật ngữ cốt lõi (Bilingual Vocabulary)',
          englishTitle: 'Curate Core Bilingual Math Vocabulary',
          desc: 'Cung cấp cầu nối ngôn ngữ giúp học sinh không bị bỡ ngỡ với thuật ngữ học thuật.',
          bullets: [
            'Bấm <strong>➕ Thêm từ vựng</strong>.',
            'Nhập từ tiếng Anh (ví dụ: <em>Critical point</em>), nghĩa tiếng Việt (<em>Điểm tới hạn</em>), phiên âm IPA và ví dụ ngữ cảnh toán học.',
            'Tự động tích hợp nút nghe phát âm chuẩn và luyện đọc theo.'
          ]
        },
        {
          num: 3,
          title: 'Nhập Khái niệm & Định lý then chốt (Key Concepts)',
          englishTitle: 'Structure Key Concepts & Theorems',
          desc: 'Trình bày định nghĩa toán học chuẩn mực với thanh công cụ chèn LaTeX nhanh.',
          bullets: [
            'Sử dụng thanh công cụ <strong>⚡ Chèn LaTeX</strong> ở đầu trang để chèn nhanh phân số, căn thức, đạo hàm, tích phân, giới hạn, vectơ.',
            'Kèm theo lưu ý sư phạm (*Pedagogical Note*) chỉ rõ cách tránh nhầm lẫn lý thuyết.'
          ]
        },
        {
          num: 4,
          title: 'Biên soạn Ví dụ mẫu mở từng bước (Step-by-Step Examples)',
          englishTitle: 'Scaffolded Step-by-Step Worked Examples',
          desc: 'Mô hình hóa tư duy giải toán cho học sinh noi theo.',
          bullets: [
            'Chia lời giải thành 3-4 bước rõ ràng: Bước 1 (Tìm TXĐ & Đạo hàm), Bước 2 (Lập bảng biến thiên), Bước 3 (Kết luận).',
            'Khi học sinh học trên trang tương tác, các em có thể tự suy nghĩ rồi bấm <strong>➕ Mở bước này</strong> để tự kiểm tra tiến trình tư duy.'
          ]
        }
      ]
    },

    {
      id: 'scaffolding-zpd',
      num: 4,
      title: 'Kích hoạt Giàn giáo ZPD (3 nấc)',
      shortTitle: 'Phương pháp sư phạm giàn giáo nhận thức ZPD (3 nấc)',
      englishTitle: '3-Tier Cognitive Scaffolding in Practice',
      summary: 'Ứng dụng thuyết Vùng phát triển gần nhất (Vygotsky) giúp học sinh trung bình - yếu tự tin giải toán song ngữ.',
      icon: '🪜',
      steps: [
        {
          num: 1,
          title: 'Hiểu đúng về triết lý Giàn giáo Sư phạm (Scaffolding)',
          englishTitle: 'Scaffolding Philosophy',
          desc: 'Giàn giáo không phải là làm hộ bài toán, mà là tạo các điểm tựa tư duy tạm thời.',
          bullets: [
            'Nhà tâm lý học Lev Vygotsky chỉ ra rằng học sinh chỉ tiến bộ khi giải bài toán ở độ khó <em>vừa sức với sự hỗ trợ</em> (Vùng ZPD).',
            'Hệ thống cung cấp 3 nấc giàn giáo với cơ chế <strong>Rút dần giàn giáo (Scaffold Fading)</strong> khi học sinh đã vững kiến thức.'
          ]
        },
        {
          num: 2,
          title: 'Khai thác Nấc 1: Gợi mở tư duy (Tier 1 Core Hint)',
          englishTitle: 'Tier 1 Socratic Questioning',
          desc: 'Được thiết kế để mặc định luôn mở, giúp học sinh bắt đầu bài toán mà không bị bế tắc.',
          bullets: [
            'Hệ thống đặt câu hỏi gợi mở định hướng công thức cần dùng (ví dụ: <em>Muốn tìm tiệm cận đứng ta tìm nghiệm của mẫu số như thế nào?</em>).',
            'Chưa đưa ra số liệu hay phép tính cụ thể, kích thích học sinh tự nhẩm hoặc viết ra giấy nháp.'
          ],
          actionBtn: { text: 'Trải nghiệm Nấc 1', tab: 'scaffolding-tutor', icon: '🪜' }
        },
        {
          num: 3,
          title: 'Khai thác Nấc 2: Chia nhỏ nhiệm vụ (Tier 2 Step Breakdown)',
          englishTitle: 'Tier 2 Task Breakdown with Checklists',
          desc: 'Mặc định ẩn/thu gọn để rèn tính tự lực; học sinh chỉ mở khi Nấc 1 chưa đủ giúp các em vượt khó.',
          bullets: [
            'Phân rã bài toán phức tạp thành 4 chặng nhiệm vụ nhỏ vừa sức.',
            'Mỗi bước có ô kiểm (checkbox) để học sinh tự đánh dấu hoàn thành sau khi làm xong từng chặng.'
          ]
        },
        {
          num: 4,
          title: 'Kiểm tra với Bài tập song hành (Parallel Practice)',
          englishTitle: 'Independent Parallel Practice',
          desc: 'Giai đoạn rút hoàn toàn giàn giáo để học sinh tự lập.',
          bullets: [
            'Học sinh tự giải một bài toán có cấu trúc tương tự (Parallel Exercise).',
            'Nhập đáp số vào ô và bấm <strong>Kiểm tra đáp số</strong> để nhận xác nhận đúng/sai tức thì.'
          ]
        }
      ]
    },

    {
      id: 'quiz-creator',
      num: 5,
      title: 'Soạn & Làm đề thi trắc nghiệm',
      shortTitle: 'Quy trình tạo và tổ chức thi trắc nghiệm song ngữ 3 dạng câu hỏi',
      englishTitle: 'Interactive Quiz Authoring & Assessment',
      summary: 'Chuẩn hóa theo cấu trúc định dạng Đề thi Tốt nghiệp THPT 2025: Trắc nghiệm ABCD, Đúng/Sai 4 ý, Điền số ngắn.',
      icon: '🎯',
      steps: [
        {
          num: 1,
          title: 'Dạng 1: Trắc nghiệm khách quan nhiều lựa chọn (ABCD)',
          englishTitle: 'Multiple-Choice (Single Best Answer)',
          desc: 'Dạng bài tập kinh điển kiểm tra kiến thức nhận biết và thông hiểu.',
          bullets: [
            'Mỗi câu có 4 phương án A, B, C, D; giáo viên tích chọn phương án đúng.',
            'Cả đề bài và các phương án đều hỗ trợ công thức LaTeX chuẩn và nút nghe đọc tiếng Anh.',
            'Mỗi câu đúng đạt trọn vẹn điểm số quy định (mặc định 0.25đ hoặc 1.0đ).'
          ],
          actionBtn: { text: 'Mở Soạn đề thi', tab: 'builder-quiz', icon: '🎯' }
        },
        {
          num: 2,
          title: 'Dạng 2: Trắc nghiệm Đúng / Sai 4 mệnh đề (True / False)',
          englishTitle: 'True / False 4 Propositions (THPT 2025 Format)',
          desc: 'Dạng câu hỏi trọng tâm của kỳ thi tốt nghiệp THPT mới.',
          bullets: [
            'Một bài toán chung gồm 4 mệnh đề a), b), c), d) yêu cầu học sinh xác định tính Đúng/Sai của từng ý.',
            'Thang điểm lũy tiến chuẩn Bộ GD&ĐT: Đúng 1 ý: 0.1đ; đúng 2 ý: 0.25đ; đúng 3 ý: 0.5đ; đúng cả 4 ý: 1.0đ.',
            'Hệ thống tự động chấm điểm chính xác theo quy chuẩn này.'
          ]
        },
        {
          num: 3,
          title: 'Dạng 3: Điền đáp số ngắn (Short-Answer Math Question)',
          englishTitle: 'Short-Answer Quantitative Questions',
          desc: 'Kiểm tra khả năng tính toán độc lập không có gợi ý phương án.',
          bullets: [
            'Học sinh giải và nhập trực tiếp con số, phân số hoặc số thập phân.',
            'Hệ thống hỗ trợ sai số cho phép (*Tolerance*) để chấp nhận cả dạng số nguyên và số thực (ví dụ: 0.75 và 3/4).'
          ]
        },
        {
          num: 4,
          title: 'Nộp bài & Bảng chấm điểm thông minh',
          englishTitle: 'Instant Grading & Pedagogical Feedback',
          desc: 'Khi học sinh hoàn thành, bấm <strong>Nộp bài (Submit)</strong>.',
          bullets: [
            'Hiện bảng điểm thang 10, phân loại năng lực (Xuất sắc, Khá giỏi, Đạt, Cần cố gắng).',
            'Tự động mở khóa toàn bộ khung hướng dẫn giải chi tiết (*Step-by-step Solution*) cho từng câu để học sinh đối chiếu.'
          ]
        }
      ]
    },

    {
      id: 'speech-shadowing',
      num: 6,
      title: 'Luyện phát âm & Dịch trực tiếp',
      shortTitle: 'Tính năng Nghe chuẩn, Luyện nói theo (Shadowing) & Dịch tức thì',
      englishTitle: 'Pronunciation, Shadowing & Real-Time Translation',
      summary: 'Trợ lý âm thanh thông minh đồng hành xuyên suốt toàn bộ từ vựng, tiêu đề, đề bài và bước giải.',
      icon: '🎙️',
      steps: [
        {
          num: 1,
          title: 'Nghe phát âm chuẩn (1.0x) và Nghe chậm (0.75x)',
          englishTitle: 'Audio Playback Speeds',
          desc: 'Sử dụng các nút bấm trực quan ngay cạnh bất kỳ văn bản tiếng Anh nào.',
          bullets: [
            'Bấm <strong>🔊</strong> để nghe phát âm tốc độ chuẩn bản xứ (Web Speech API).',
            'Bấm <strong>🐢</strong> để nghe tốc độ chậm (0.75x), giúp nhận diện rõ trọng âm và phụ âm cuối.',
            'Hệ thống tự động lọc ký hiệu LaTeX thành câu nói tự nhiên (ví dụ: $\\frac{a}{b}$ đọc là <em>"a over b"</em>).'
          ]
        },
        {
          num: 2,
          title: 'Bôi đen văn bản bất kỳ để Tra cứu & Nghe tức thì',
          englishTitle: 'Floating Selection Tooltip',
          desc: 'Thao tác cực kỳ thuận tiện trên cả trang bài giảng và đề thi.',
          bullets: [
            'Dùng chuột bôi đen (highlight) một từ hoặc một câu tiếng Anh bất kỳ trên màn hình.',
            'Một thanh công cụ nổi tinh gọn sẽ xuất hiện ngay lập tức với 3 lựa chọn: <strong>🔊 Nghe</strong>, <strong>🐢 Chậm</strong>, <strong>🎙️ Luyện nói</strong>.',
            'Thầy cô và học sinh không cần rời khỏi trang web để tra từ điển.'
          ]
        },
        {
          num: 3,
          title: 'Phòng Luyện nói Shadowing với Micro',
          englishTitle: 'Interactive Voice Recognition & Grading',
          desc: 'Học sinh bấm nút <strong>🎙️ Luyện theo</strong> để mở phòng thực hành.',
          bullets: [
            'Hệ thống hiển thị phiên âm quốc tế IPA và nghĩa tiếng Việt chuẩn theo thuật ngữ toán học.',
            'Học sinh nghe mẫu 2 lần, sau đó bấm <strong>Bắt đầu thu âm</strong> và đọc câu tiếng Anh vào micro.',
            'Hệ thống đối chiếu giọng nói và tô màu phản hồi: <span class="text-emerald-600 font-bold">Màu xanh lá</span> (phát âm chuẩn), <span class="text-rose-600 font-bold">Màu đỏ</span> (cần cải thiện), kèm phần trăm độ chính xác.'
          ],
          actionBtn: { text: 'Mở Làm bài tương tác để luyện nói', tab: 'interactive-preview', icon: '🎙️' }
        }
      ]
    },

    {
      id: 'export-share',
      num: 7,
      title: 'Xuất bản Word & Standalone HTML',
      shortTitle: 'Hướng dẫn xuất file Microsoft Word chuẩn in và file Web độc lập',
      englishTitle: 'Export to Word (.docx) & Standalone HTML',
      summary: 'Tạo tài liệu in ấn sắc nét và trang web độc lập chạy offline không cần máy chủ.',
      icon: '📄',
      steps: [
        {
          num: 1,
          title: 'Xuất file Microsoft Word (.doc/.docx)',
          englishTitle: 'Export to Microsoft Word',
          desc: 'Tương thích 100% với Office Word, Google Docs, LibreOffice.',
          bullets: [
            'Bấm nút <strong>Xuất Word</strong> trên thanh công cụ bên trái.',
            'Chọn 1 trong 3 định dạng: <em>1. Phiếu bài tập cho học sinh</em>, <em>2. Đề thi kèm đáp án chi tiết cho giáo viên</em>, hoặc <em>3. Phiếu giàn giáo sư phạm ZPD</em>.',
            'File Word được định dạng sẵn khổ giấy A4 chuẩn, lề 2cm, phông chữ Times New Roman 12pt sắc nét.'
          ],
          actionBtn: { text: 'Mở Xuất Word (.doc / .docx)', tab: 'open-export-word', icon: '📄' }
        },
        {
          num: 2,
          title: 'Xuất file Web Độc Lập (Export Standalone HTML)',
          englishTitle: 'Single-File Offline Web Deployment',
          desc: 'Chỉ cần gửi 1 file HTML duy nhất cho học sinh qua Zalo/Email.',
          bullets: [
            'Bấm nút <strong>Export Standalone HTML</strong> trên thanh bên.',
            'Hệ thống nén toàn bộ bài giảng, đề thi, công cụ phát âm và MathJax vào một file duy nhất.',
            'Học sinh có thể nhấp đúp để mở làm bài trên mọi trình duyệt (Chrome, Safari, Edge, Cốc Cốc) ngay cả khi không có mạng Internet.'
          ],
          actionBtn: { text: 'Tạo File Standalone HTML', tab: 'export-html', icon: '🚀' }
        },
        {
          num: 3,
          title: 'In trực tiếp ra giấy A4 (Worksheet)',
          englishTitle: 'Print-Ready A4 Worksheets',
          desc: 'Tối ưu hóa máy in trường học.',
          bullets: [
            'Bấm <strong>In Worksheet A4</strong>.',
            'Tự động ẩn thanh công cụ web và căn chỉnh bố cục trang in 2 cột rõ nét, sẵn sàng in photocopy cho học sinh làm trên lớp.'
          ],
          actionBtn: { text: 'In Worksheet A4', tab: 'print-a4', icon: '🖨️' }
        }
      ]
    },

    {
      id: 'library-management',
      num: 8,
      title: 'Quản lý "Danh sách đã tạo"',
      shortTitle: 'Tính năng quản lý thư viện và tự động lưu trữ thông minh',
      englishTitle: 'Created Library & Exam Management',
      summary: 'Tự động lưu trữ bài giảng và đề thi, lọc theo khối lớp và chuyển đổi nhanh chóng.',
      icon: '📊',
      steps: [
        {
          num: 1,
          title: 'Tự động đồng bộ hóa vào Danh sách đã tạo',
          englishTitle: 'Auto-Sync Created Library',
          desc: 'Mọi bài giảng hoặc đề thi mới được tạo đều tự động xuất hiện tại đây.',
          bullets: [
            'Khi thầy cô soạn bài mới, tải tài liệu Word hoặc sinh qua AI, hệ thống tự động lưu vào <strong>Danh sách đã tạo</strong>.',
            'Mỗi đề có mã đề định danh duy nhất (ví dụ: <code>DH-126A</code>, <code>GH-110B</code>), tên bài học, ngày cập nhật và trạng thái kích hoạt.'
          ],
          actionBtn: { text: 'Mở Danh sách đã tạo', tab: 'my-exams', icon: '📊' }
        },
        {
          num: 2,
          title: 'Lọc nhanh theo Khối lớp',
          englishTitle: 'Filter by Grade Level',
          desc: 'Phân loại trực quan giúp quản lý hàng chục đề thi dễ dàng.',
          bullets: [
            'Bấm chọn <strong>Khối 12</strong>, <strong>Khối 11</strong>, hoặc <strong>Khối 10</strong> ở cột bên trái.',
            'Bảng bên phải tự động lọc danh sách tương ứng cùng số lượng bài thi cập nhật thời gian thực.'
          ]
        },
        {
          num: 3,
          title: 'Thao tác nhanh: Làm bài, Xem Giàn giáo, Sửa hoặc Xóa',
          englishTitle: 'Quick Actions on Exams',
          desc: 'Mỗi hàng trong bảng cung cấp các nút thao tác tiện dụng.',
          bullets: [
            '<strong>🎯 Làm bài:</strong> Chuyển ngay sang chế độ thi tương tác của học sinh.',
            '<strong>🪜 Giàn giáo:</strong> Mở ngay gia sư 3 nấc sư phạm ZPD.',
            '<strong>✏️ Sửa:</strong> Mở bài trong tab Soạn bài giảng để biên tập nội dung.',
            '<strong>🔗 Link:</strong> Sao chép đường link trực tiếp gửi cho học sinh.'
          ]
        }
      ]
    },

    {
      id: 'feedback-support',
      num: 9,
      title: 'Báo lỗi & Góp ý sáng kiến',
      shortTitle: 'Kênh tiếp nhận đóng góp & Hỗ trợ kỹ thuật trực tiếp',
      englishTitle: 'Feedback, Bug Reports & Direct Support',
      summary: 'Đồng hành cùng giáo viên trong quá trình ứng dụng thực tế tại các trường THPT.',
      icon: '💬',
      steps: [
        {
          num: 1,
          title: 'Gửi phản hồi đóng góp cho Dự án',
          englishTitle: 'Send Feedback & Pedagogical Ideas',
          desc: 'Dự án Sáng kiến Giáo dục 2026 luôn lắng nghe ý kiến từ quý thầy cô.',
          bullets: [
            'Bấm nút <strong>Báo lỗi & góp ý</strong> ở thanh bên trái.',
            'Chọn loại phản hồi: Đóng góp phương pháp sư phạm, Góp ý từ vựng toán học, hoặc Báo cáo lỗi kỹ thuật.',
            'Nhập nội dung và gửi trực tiếp đến tác giả đề tài.'
          ],
          actionBtn: { text: 'Gửi Góp ý / Báo lỗi', tab: 'open-feedback-modal', icon: '💬' }
        },
        {
          num: 2,
          title: 'Kênh hỗ trợ kỹ thuật trực tiếp',
          englishTitle: 'Direct Author & Tech Contacts',
          desc: 'Liên hệ qua Email hoặc GitHub khi cần trao đổi chuyên môn & đóng góp sáng kiến.',
          bullets: [
            '<strong>Tác giả:</strong> Cô Huỳnh Thị Hà - Giáo viên Toán THPT.',
            '<strong>Email:</strong> <a href="mailto:ahahuynh@gmail.com" class="text-indigo-600 font-bold">ahahuynh@gmail.com</a>.',
            '<strong>Mã nguồn mở GitHub:</strong> <a href="https://github.com/ahahuynh-oss/math-bilingual-studio" target="_blank" class="text-indigo-600 font-bold underline">ahahuynh-oss/math-bilingual-studio</a>.'
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
      <!-- TOP BANNER CARD (MATCHING USER SAMPLE SCREENSHOT) -->
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
          <span class="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            Phiên bản 2026.2
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
            <span class="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">9 chuyên đề</span>
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

          <!-- Subcard Banner (Matching user sample with paperplane / icon) -->
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

          <!-- Step Cards with Numbered Badges (1, 2, 3...) matching screenshot -->
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
          <div class="pt-4 flex items-center justify-between text-xs">
            ${currentSec.num > 1 ? `
              <button 
                onclick="UserGuide.switchSection('${this.sections[currentSec.num - 2].id}')" 
                class="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all flex items-center gap-1.5">
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
        app.openAIGeneratorModal();
        if (app.switchAIGeneratorTab) app.switchAIGeneratorTab('gemini');
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
