# Math Bilingual Studio

> **Single Page Application (SPA) hỗ trợ giáo viên Toán soạn bài giảng tương tác, đề kiểm tra chuẩn Bộ GD&ĐT và ứng dụng Giàn giáo Nhận thức (Scaffolding ZPD) Toán tiếng Anh song ngữ (English - Vietnamese).**
>
> **Phiên bản:** `2026.2.0` • **Dự án Sáng kiến Giáo dục 2026** • **Tác giả:** Huỳnh Thị Hà (Giáo viên Toán THPT)

---

## 🌟 Tổng Quan Tính Năng Nổi Bật (Phiên Bản Mới Nhất 2026.2.0)

### 1. Hệ Thống Soạn Tự Động & Trích Xuất Tài Liệu (AI & Document Auto-Generator)
- **Quét Đề Từ Ảnh Chụp & Trang Sách (Gemini Vision OCR - Tính Năng Mới):**
  - Hỗ trợ kéo thả ảnh hoặc dán ảnh chụp màn hình trực tiếp bằng tổ hợp phím **`Ctrl + V`** (sau khi chụp bằng `Win + Shift + S`).
  - Tự động nhận diện công thức toán học $LaTeX$, bóc tách câu hỏi, dịch song ngữ Anh - Việt.
  - **Tự động phân loại 4 mức độ nhận thức:** Nhận biết (NB) • Thông hiểu (TH) • Vận dụng (VD) • Vận dụng cao (VDC).
- **Trích Xuất & Soạn Theo Tài Liệu Tải Lên (Smart Document Parser):**
  - Hỗ trợ đa định dạng: **Word (.docx via Mammoth.js)**, **PDF (.pdf via PDF.js)**, **Text/Markdown (.txt, .md, .tex)** hoặc dán trực tiếp đề thi/giáo án.
  - Tự động bóc tách tiêu đề, bảng từ vựng song ngữ, công thức toán $LaTeX$ và các câu hỏi trắc nghiệm.
- **Trợ Lý AI Trực Tuyến Thế Hệ Mới (Google Gemini 3.8 Flash & 2.5 Flash):**
  - Tích hợp các mô hình tiên tiến nhất: `gemini-3.8-flash` (mới nhất, siêu nhanh), `gemini-2.5-flash`, `gemini-2.0-flash`, `gemini-1.5-pro`.
  - Nút **"🔍 Quét Model Khả Dụng"** giúp giáo viên kiểm tra tức thì các mô hình AI hoạt động trong tài khoản Google AI Studio cá nhân.
- **Soạn Tự Động Theo Chủ Đề Chuẩn (Curriculum Topics Generator):**
  - Tích hợp sẵn kho bài giảng THPT song ngữ: *Tích phân & Thể tích khối tròn xoay*, *Vectơ & Tọa độ không gian Oxyz*, *Giới hạn vô định 0/0*, *Hàm phân thức & Tiệm cận*, *Đạo hàm & Cực trị*.

### 2. Hệ Thống Điều Hướng Cây Thư Mục & Không Gian Soạn Thảo (Tree Navigation)
- **Nhánh 1: Soạn bài giảng (Lesson Builder)**
  - **Danh sách đã tạo (My Created Library):** Quản lý tập trung toàn bộ bài giảng và đề thi đã tạo, lọc theo Khối 10, 11, 12, thao tác làm bài thi, sửa nội dung hoặc xuất file Word.
  - **Soạn bài giảng mới:** Thiết lập Metadata, Mục tiêu bài học (*Objectives*), Bảng từ vựng có IPA & phát âm bản ngữ, Khái niệm định lý có thanh công cụ gõ nhanh $LaTeX$, và Ví dụ mẫu mở từng bước (*Step-by-step*).
  - **Trực quan hóa đồ thị:** Tích hợp **Interactive Canvas Grapher** cho phép kéo thanh trượt hệ số $a, b, c$ và quan sát tiếp tuyến cực trị thời gian thực, kèm hỗ trợ nhúng GeoGebra Applet.
  - **Soạn đề thi (Quiz Builder):** Hỗ trợ đầy đủ 3 dạng câu hỏi chuẩn thi tốt nghiệp THPT 2025:
    1. *Trắc nghiệm 4 lựa chọn (ABCD).*
    2. *Trắc nghiệm Đúng/Sai 4 mệnh đề* với cách tính điểm lũy tiến chuẩn Bộ GD&ĐT (1 ý: 0.1đ; 2 ý: 0.25đ; 3 ý: 0.5đ; 4 ý: 1.0đ).
    3. *Câu hỏi điền đáp án ngắn* (số thực/phân số có cơ chế dung sai tolerance).
- **Nhánh 2: Gia sư Giàn giáo Nhận thức ZPD (Scaffolding Tutor - Mô Hình Vygotsky)**
  - **6 Nấc Sư Phạm Khai Phóng Năng Lực:**
    1. *Bóc tách đề bài & Trọng tâm kiến thức.*
    2. *Bảng thuật ngữ toán song ngữ (có phát âm & luyện đọc).*
    3. *Gợi ý Nấc 1 (Tier 1 Hint - Khơi gợi tư duy Socratic ban đầu).*
    4. *Khung tư duy Nấc 2 (Tier 2 Step Breakdown - Chia nhỏ nhiệm vụ có checklist từng bước).*
    5. *Cạm bẫy học sinh cần tránh (Common Pitfalls).*
    6. *Lời giải mẫu hoàn chỉnh (Exemplary Solution).*
    7. *Bài tập song song rèn luyện (Parallel Exercise) tự động chấm điểm & rút dần giàn giáo (Scaffold Fading).*
  - **Biên tập trực quan:** Nút *"✏️ Sửa bài tập này"* mở Modal chỉnh sửa mọi trường nội dung giàn giáo và lưu tức thì vào kho **Bài tập đã tạo (Scaffold Library)**.

### 3. Công Cụ Đánh Giá & Hỗ Trợ Chuyên Môn
- **Ma Trận Đề Thi Chuẩn Bộ GD&ĐT (Test Matrix):**
  - Phân tích cơ cấu đề theo 4 mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao).
  - Tự động thống kê số câu, số điểm và tỷ lệ % theo từng phần thi phục vụ hồ sơ bài dạy.
- **Trợ Lý Âm Thanh Bản Xứ & Phòng Luyện Nói Shadowing:**
  - Cụm nút **🔊 Nghe chuẩn (1.0x)** và **🐢 Nghe chậm (0.75x)** ứng dụng Web Speech API.
  - **Bôi đen văn bản để tra cứu tức thì (Floating Tooltip):** Hiện thanh tra cứu nghe, nghe chậm và luyện nói ngay khi tô đen chữ tiếng Anh trên màn hình.
  - **Phòng Luyện nói Shadowing với Micro:** Nhận diện giọng nói và chấm điểm phát âm tương tác kèm phân tích màu sắc trực quan.
  - **Nút bật/tắt song ngữ:** Bật hoặc ẩn phần dịch tiếng Việt trên toàn trang chỉ với 1 click.

### 4. Tùy Biến Giao Diện Làm Việc Linh Hoạt
- **Workspace Zoom Slider:** Kéo thanh trượt 🔍 để thu phóng toàn bộ giao diện làm việc từ **75% đến 130%**.
- **Sidebar Collapse & Resizer:** Nút thu gọn thanh bên và thanh kéo co giãn chiều rộng thanh bên từ 180px đến 500px (nhấp đúp để đặt lại mặc định 260px).

### 5. Xuất Bản & Chuyển Giao Đa Kênh
- **Xuất Microsoft Word (.doc / .docx):**
  - Tương thích 100% với Word, Office 365, Google Docs, LibreOffice; định dạng sẵn khổ A4 chuẩn, lề 2cm, Times New Roman 12pt.
  - 3 tùy chọn: *Phiếu bài tập học sinh*, *Đề thi kèm đáp án giáo viên*, hoặc *Phiếu giàn giáo ZPD*.
- **Export Standalone HTML:** Đóng gói toàn bộ ứng dụng thành **1 file HTML duy nhất** chạy offline 100% không cần cài đặt hay kết nối Internet.
- **In Worksheet A4:** Căn chỉnh bố cục tối ưu hóa cho máy in trường học hoặc xuất PDF khổ A4 sắc nét.
- **Lưu trữ & Phục hồi JSON:** Sao lưu và chuyển giao bài giảng giữa các giáo viên thuận tiện.

---

## 📖 Cẩm Nang Hướng Dẫn Sử Dụng Tích Hợp (11 Chuyên Đề)

Ứng dụng tích hợp sẵn toàn bộ cẩm nang hướng dẫn sử dụng chi tiết ngay tại mục **"❓ Hướng dẫn"** trên thanh bên, bao gồm:
1. **Quy trình chung:** Quy trình 4 bước tổng quan cho giáo viên & học sinh.
2. **Cấu hình Trợ lý AI Google Gemini:** Hướng dẫn lấy key miễn phí và đổi mô hình Gemini 3.8 Flash.
3. **Quét Đề Từ Ảnh Chụp (Gemini Vision OCR):** Hướng dẫn kéo thả và dán ảnh `Ctrl + V`.
4. **Thiết kế bài giảng Toán song ngữ:** Soạn lý thuyết, từ vựng, ví dụ mẫu và Canvas Grapher.
5. **Gia sư Giàn giáo Nhận thức ZPD (6 nấc):** Phương pháp sư phạm và rút dần giàn giáo.
6. **Soạn & Tổ chức Thi trắc nghiệm 3 dạng:** ABCD, Đúng/Sai 4 mệnh đề và Điền đáp án ngắn.
7. **Ma trận đề thi chuẩn Bộ GD&ĐT:** Phân tích 4 mức độ nhận thức (NB • TH • VD • VDC).
8. **Luyện phát âm Bản ngữ & Dịch tức thì:** Nghe 1.0x, 0.75x, Floating Tooltip và phòng Shadowing.
9. **Xuất bản Word, Standalone HTML & In A4:** Hướng dẫn xuất bản và in ấn chuẩn.
10. **Quản lý Thư viện & Tùy biến giao diện:** Cây thư mục, kho bài tập, Zoom Slider và Sidebar Resizer.
11. **Báo lỗi & Góp ý sáng kiến:** Kênh gửi phản hồi sư phạm và thông tin tác giả.

---

## 🚀 Hướng Dẫn Khởi Chạy Nhanh

### Cách 1: Khởi chạy bằng tệp thực thi nhanh (Khuyên dùng trên Windows)
- Nhấp đúp vào tệp `CHAY_APP_TOAN_8088.bat` tại thư mục gốc.
- Trình duyệt sẽ tự động mở địa chỉ: `http://localhost:8088/`

### Cách 2: Khởi chạy bằng Python Server
```bash
cd math-bilingual-studio
python -m http.server 8088 --bind 127.0.0.1
```
Sau đó truy cập: `http://localhost:8088/` trên trình duyệt.

### Cách 3: Mở trực tiếp file HTML
- Mở trực tiếp tệp `index.html` bằng bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari).

---

## 📞 Thông Tin Tác Giả & Hỗ Trợ Kỹ Thuật

- **Tác giả sáng kiến:** Cô Huỳnh Thị Hà - Giáo viên Toán THPT
- **Dự án:** Sáng kiến Giáo dục 2026 - *Bilingual Math Scaffolding Studio*
- **Email:** [ahahuynh@gmail.com](mailto:ahahuynh@gmail.com)
- **Mã nguồn mở GitHub:** [https://github.com/ahahuynh-oss/math-bilingual-studio](https://github.com/ahahuynh-oss/math-bilingual-studio)
