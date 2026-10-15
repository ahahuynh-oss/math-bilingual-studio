# Math Bilingual Studio

> **Single Page Application (SPA) hỗ trợ giáo viên Toán soạn bài giảng tương tác và đề kiểm tra Toán tiếng Anh song ngữ (English - Vietnamese).**

---

## 🌟 Tổng Quan Tính Năng

### 1. Hệ Thống Soạn Tự Động & Trích Xuất Tài Liệu (AI & Document Auto-Generator)
- **Soạn Tự Động Theo Chủ Đề Chuẩn (Curriculum Topics Generator):**
  - Tích hợp sẵn kho dữ liệu bài giảng toán THPT song ngữ: *Tích phân & Diện tích hình phẳng (Calculus)*, *Xác suất cổ điển & Biến cố độc lập (Probability)*, *Số phức (Complex Numbers)*, *Đạo hàm & Cực trị*, *Vectơ Oxyz*.
  - Khởi tạo tức thì đầy đủ 4 phần: Khái niệm & Định lý có LaTeX, Từ vựng kèm phát âm, Ví dụ mẫu 3 bước, và Đề kiểm tra 3 dạng câu hỏi.
- **Trích Xuất & Soạn Theo Tài Liệu Tải Lên (Document Parser):**
  - Hỗ trợ tải lên đa định dạng: **Word (.docx via Mammoth.js)**, **PDF (.pdf via PDF.js)**, **Text/Markdown (.txt, .md, .tex)** hoặc dán trực tiếp đề thi/giáo án vào khung nhập.
  - Bộ phân tích thông minh (Smart Parser) tự động nhận diện:
    - Tiêu đề bài học song ngữ.
    - Cặp thuật ngữ từ vựng (`Term : Meaning` hoặc `Từ vựng : Dịch nghĩa`).
    - Công thức toán học LaTeX (`\int`, `\lim`, `\frac`, v.v.).
    - Câu hỏi trắc nghiệm ABCD (tự tách 4 phương án).
    - Câu hỏi Đúng/Sai 4 mệnh đề (tự tách các ý a, b, c, d).
    - Câu hỏi điền đáp án ngắn.
- **Trợ Lý AI Trực Tuyến (Google Gemini 1.5 Flash):**
  - Hỗ trợ nhập Google Gemini API Key để tùy biến sinh bài giảng và câu hỏi kiểm tra theo bất kỳ yêu cầu sư phạm nào của giáo viên.

### 2. Hệ Thống Điều Hướng & Soạn Thảo (Tabs System)
- **Tab 1: Soạn Bài giảng (Lesson Builder)**
  - **Khái niệm & Định lý (Concepts & Theorems):** Soạn thảo song ngữ Anh - Việt, hỗ trợ công thức Toán LaTeX ($...$ và $$...$$) với khung Live Math Preview trực tiếp. Nút bật/tắt hiển thị tiếng Việt nhanh chóng.
  - **Từ vựng trọng tâm (Key Vocabulary):** Bảng từ vựng chuẩn ngữ cảnh toán học, phiên âm IPA, từ loại, ví dụ minh họa và **phát âm giọng bản xứ bằng Web Speech API** (`speechSynthesis`).
  - **Ví dụ mẫu (Worked Examples):** Trình bày bài toán mẫu với phương pháp giải chia theo từng bước (Step-by-step reveal) giúp học sinh tự tư duy trước khi xem đáp án.
  - **Khung nhúng GeoGebra & Trực quan hóa (Visualizer):** Hỗ trợ nhúng GeoGebra Applet ID trực tiếp và tích hợp sẵn **Interactive Canvas Grapher** cho phép kéo thanh trượt các hệ số $a, b, c$ của hàm số và quan sát tiếp tuyến tại điểm cực trị trong thời gian thực.
  - **Thanh công cụ hỗ trợ gõ nhanh công thức LaTeX (Quick LaTeX Toolbar):** Chèn nhanh các ký hiệu phổ biến ($\frac{a}{b}$, $\sqrt{x}$, $\int$, $\lim$, $\vec{u}$, $\pm$, $\Delta$, $\alpha$, $\theta$, $\mathbb{R}$, $\begin{cases}...\end{cases}$) vào bất kỳ ô nhập liệu nào đang được chọn.

- **Tab 2: Soạn Đề thi (Quiz & Test Builder)**
  - Hỗ trợ **3 dạng câu hỏi toán học chuẩn** (theo chuẩn Bộ GD&ĐT và các bài thi quốc tế):
    1. **Trắc nghiệm 4 lựa chọn (Multiple Choice A, B, C, D):** Chọn nhanh đáp án đúng, tự do điều chỉnh điểm số.
    2. **Trắc nghiệm Đúng/Sai 4 mệnh đề (True/False 4 propositions a, b, c, d):** Định dạng đề thi tốt nghiệp THPT mới với cách tính điểm chuẩn lũy tiến (1 ý đúng = 10%, 2 ý = 25%, 3 ý = 50%, 4 ý = 100% điểm).
    3. **Câu hỏi điền đáp án ngắn (Short Answer):** Điền số thực hoặc phân số, hỗ trợ kiểm tra dung sai số thập phân ($\pm$ tolerance) và các giá trị tương đương.
  - Mỗi câu hỏi đều hỗ trợ đề bài song ngữ, công thức MathJax và hướng dẫn giải chi tiết.

- **Tab 3: Xem trước & Tương tác (Live Preview & Interactive Mode)**
  - **Chế độ Học sinh (Student Mode):**
    - Học bài trực tiếp: Nghe đọc từ vựng, mở từng bước giải ví dụ mẫu, kéo thanh trượt đồ thị hàm số.
    - Làm bài kiểm tra có đồng hồ đếm ngược (Countdown Timer), thanh tiến độ (Progress Bar), bảng chọn câu hỏi nhanh (Question Palette).
    - Nộp bài & chấm điểm tự động tức thì (Auto-grading), thang điểm 10, hiển thị nhận xét và lời giải chi tiết.
  - **Chế độ Giáo viên (Teacher Mode):** Xem trước bài giảng và đề thi với đáp án hiển thị sẵn để kiểm tra chất lượng trước khi giao cho học sinh.

- **Tab 4: Gia Sư Giàn Giáo (Scaffolding Tutor - Mô Hình Vygotsky ZPD):**
  - **6 Nấc Sư Phạm Khai Phóng Năng Lực:** Bóc tách đề bài & Trọng tâm, Bảng thuật ngữ toán song ngữ (có phát âm Web Speech API), Gợi ý nấc 1 (Tier 1 Hint), Khung tư duy chia nhỏ các bước (Tier 2 Breakdown), Cạm bẫy học sinh cần tránh (Common Pitfalls), Lời giải mẫu hoàn chỉnh (Full Solution) và Bài tập song song rèn luyện (Parallel Exercise có tự động kiểm tra đáp số).
  - Tích hợp sẵn 3 bài mẫu chuẩn THPT (Lớp 10: Tọa độ & Tích vô hướng Oxy, Lớp 11: Giới hạn vô định 0/0, Lớp 12: Hàm phân thức & Tiệm cận).

### 2. Tính Năng Xuất Nội Dung (Export Features)
- **Nút "Xuất Word (.doc / .docx)":**
  - Tạo tệp Word chuẩn tương thích 100% với **Microsoft Word (mọi phiên bản), Office 365, Google Docs, LibreOffice Writer**.
  - Tự động thiết lập cấu hình trang in chuẩn A4 (lề 2cm, Times New Roman 12pt, bảng biểu có viền sắc nét, công thức toán hiển thị rõ ràng).
  - Hỗ trợ 3 tùy chọn xuất:
    1. *Phiếu Bài Tập Cho Học Sinh:* Khung thông tin học sinh, bảng điểm, Bảng từ vựng song ngữ, các câu hỏi và chỗ trống điền đáp án.
    2. *Đề Thi Kèm Đáp Án Chi Tiết:* Đánh dấu đáp án chuẩn và lời giải từng bước cho giáo viên.
    3. *Phiếu Giàn Giáo Sư Phạm (Scaffolding Worksheet):* Xuất toàn bộ 6 tầng sư phạm của bài toán giàn giáo để phát cho học sinh hoặc lưu trữ giáo án.
- **Nút "Export Standalone HTML":**
  - Đóng gói toàn bộ bài giảng, từ vựng, ví dụ, công cụ phát âm Web Speech API, MathJax 3, hệ thống làm bài thi **và tích hợp cả Tab Gia Sư Giàn Giáo (Scaffolding Tutor) offline** thành **1 file HTML duy nhất**.
  - Học sinh chỉ cần click đúp chuột vào file tải về là có thể:
    + Đọc lý thuyết bài giảng & nghe phát âm từ vựng toán.
    + Tự học với Gia sư giàn giáo (chuyển đổi giữa các khối 10, 11, 12, mở 3 nấc gợi ý, làm bài tập song song có chấm điểm ngay).
    + Làm bài kiểm tra tính giờ tự chấm điểm mà không cần kết nối mạng Internet.
- **Nút "Print Worksheet (A4)":**
  - Chuyển đổi định dạng chuyên nghiệp tối ưu cho máy in hoặc Lưu dưới dạng PDF chuẩn khổ giấy A4 (Times New Roman, phân chia 2 cột, công thức toán sắc nét, chống lỗi gãy trang).

### 3. Kết Xuất Toán Học (MathJax 3)
- Tích hợp MathJax 3 CHTML/SVG hiển thị mượt mà trên mọi màn hình.
- Debounced re-rendering tự động cập nhật công thức mỗi khi giáo viên gõ nội dung trong trình soạn thảo.

---

## 🚀 Hướng Dẫn Sử Dụng Nhanh

1. **Khởi chạy ứng dụng:**
   - Ứng dụng đang chạy tại: `http://localhost:8088`
   - Hoặc mở trực tiếp file `index.html` trong trình duyệt.
2. **Khám phá các bài mẫu:**
   - Sử dụng menu chọn mẫu bài học ở thanh trên cùng để xem bài giảng:
     - *1. Đạo hàm & Cực trị của hàm số (Derivatives and Extrema)*
     - *2. Vectơ & Tích vô hướng trong Không gian Oxyz (Vectors in 3D Space)*
     - *3. Tạo bài học mới (Blank Lesson)*
3. **Lưu trữ & Chuyển giao:**
   - Mọi thay đổi được tự động lưu vào bộ nhớ `localStorage` của trình duyệt.
   - Nút **"Tải JSON"** và **"Nhập JSON"** giúp bạn dễ dàng lưu trữ và chia sẻ file bài giảng với các đồng nghiệp.
