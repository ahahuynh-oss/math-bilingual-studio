/**
 * Bilingual Math Companion: Audio Speech, Real-time Translation & Pronunciation Shadowing
 * Bilingual Math Scaffolding Studio - Dự án Sáng kiến Giáo dục 2026 - Tác giả: Huỳnh Thị Hà
 */

const BilingualHelper = {
  // Rich Bilingual Math Dictionary (Offline-First)
  mathDictionary: {
    // Calculus & Functions
    "derivative": { vi: "Đạo hàm", ipa: "/dɪˈrɪv.ə.tɪv/", note: "Tỉ số biến thiên tức thời của hàm số" },
    "derivatives": { vi: "Các đạo hàm", ipa: "/dɪˈrɪv.ə.tɪvz/", note: "Số nhiều của đạo hàm" },
    "differentiable": { vi: "Khả vi (có đạo hàm)", ipa: "/ˌdɪf.əˈren.ʃi.ə.bəl/", note: "Hàm số có đạo hàm tại một điểm" },
    "critical point": { vi: "Điểm tới hạn", ipa: "/ˈkrɪt.ɪ.kəl pɔɪnt/", note: "Điểm mà f'(x) = 0 hoặc f'(x) không xác định" },
    "critical points": { vi: "Các điểm tới hạn", ipa: "/ˈkrɪt.ɪ.kəl pɔɪnts/", note: "Các điểm nghi ngờ đạt cực trị" },
    "local extremum": { vi: "Cực trị địa phương", ipa: "/ˈloʊ.kəl ɪkˈstriː.məm/", note: "Điểm cực đại hoặc cực tiểu" },
    "local extrema": { vi: "Các cực trị địa phương", ipa: "/ˈloʊ.kəl ɪkˈstriː.mə/", note: "Số nhiều của cực trị" },
    "local maximum": { vi: "Điểm cực đại địa phương", ipa: "/ˈloʊ.kəl ˈmæk.sə.məm/", note: "Giá trị lớn nhất trong lân cận" },
    "local minimum": { vi: "Điểm cực tiểu địa phương", ipa: "/ˈloʊ.kəl ˈmɪn.ə.məm/", note: "Giá trị nhỏ nhất trong lân cận" },
    "asymptote": { vi: "Đường tiệm cận", ipa: "/ˈæs.ɪm.toʊt/", note: "Đường thẳng mà đồ thị tiến sát đến vô cực" },
    "horizontal asymptote": { vi: "Tiệm cận ngang", ipa: "/ˌhɔːr.ɪˈzɑːn.t̬əl ˈæs.ɪm.toʊt/", note: "Giới hạn khi x tiến đến vô cực" },
    "vertical asymptote": { vi: "Tiệm cận đứng", ipa: "/ˈvɝː.t̬ɪ.kəl ˈæs.ɪm.toʊt/", note: "Giới hạn vô cực khi x tiến tới điểm gián đoạn" },
    "slant asymptote": { vi: "Tiệm cận xiên", ipa: "/slænt ˈæs.ɪm.toʊt/", note: "Đường thẳng y = ax + b tiệm cận" },
    "continuity": { vi: "Tính liên tục", ipa: "/ˌkɑːn.təˈnuː.ə.t̬i/", note: "Đồ thị liền mạch không bị đứt đoạn" },
    "continuous": { vi: "Liên tục", ipa: "/kənˈtɪn.ju.əs/", note: "Hàm số liên tục trên tập xác định" },
    "limit": { vi: "Giới hạn", ipa: "/ˈlɪm.ɪt/", note: "Giá trị tiệm cận của hàm số" },
    "indeterminate form": { vi: "Dạng vô định", ipa: "/ˌɪn.dɪˈtɝː.mɪ.nət fɔːrm/", note: "Dạng 0/0, vô cực/vô cực..." },
    "definite integral": { vi: "Tích phân xác định", ipa: "/ˈdef.ən.ət ˈɪn.t̬ə.ɡrəl/", note: "Diện tích hình phẳng hoặc tổng tích lũy" },
    "integral": { vi: "Tích phân / Nguyên hàm", ipa: "/ˈɪn.t̬ə.ɡrəl/", note: "Phép toán ngược của đạo hàm" },
    "antiderivative": { vi: "Nguyên hàm", ipa: "/ˌæn.taɪ.dɪˈrɪv.ə.tɪv/", note: "Hàm F(x) sao cho F'(x) = f(x)" },
    "rate of change": { vi: "Tốc độ thay đổi / Tốc độ biến thiên", ipa: "/reɪt əv tʃeɪndʒ/", note: "Ý nghĩa vật lý của đạo hàm" },
    "tangent line": { vi: "Tiếp tuyến (đường tiếp tuyến)", ipa: "/ˈtæn.dʒənt laɪn/", note: "Đường thẳng tiếp xúc với đồ thị tại 1 điểm" },
    "inflection point": { vi: "Điểm uốn của đồ thị", ipa: "/ɪnˈflek.ʃən pɔɪnt/", note: "Điểm đồ thị đổi hướng bề lõm" },
    "concave upward": { vi: "Lõm lên trên (bề lõm quay lên)", ipa: "/kɑːnˈkeɪv ˈʌp.wɚd/", note: "Đạo hàm cấp hai f''(x) > 0" },
    "concave downward": { vi: "Lõm xuống dưới (bề lõm quay xuống)", ipa: "/kɑːnˈkeɪv ˈdaʊn.wɚd/", note: "Đạo hàm cấp hai f''(x) < 0" },
    
    // Vectors & Coordinate Geometry
    "vector": { vi: "Vectơ", ipa: "/ˈvek.tɚ/", note: "Đoạn thẳng có hướng" },
    "vectors": { vi: "Các vectơ", ipa: "/ˈvek.tɚz/", note: "Số nhiều của vectơ" },
    "dot product": { vi: "Tích vô hướng", ipa: "/dɑːt ˈprɑː.dʌkt/", note: "Tích vô hướng của hai vectơ: u . v" },
    "scalar product": { vi: "Tích vô hướng (vô hướng hóa)", ipa: "/ˈskeɪ.lɚ ˈprɑː.dʌkt/", note: "Kết quả là một số thực" },
    "cross product": { vi: "Tích có hướng", ipa: "/krɑːs ˈprɑː.dʌkt/", note: "Tích có hướng tạo thành một vectơ vuông góc" },
    "perpendicular": { vi: "Vuông góc", ipa: "/ˌpɝː.pənˈdɪk.jə.lɚ/", note: "Hai đường thẳng hoặc vectơ tạo góc 90 độ" },
    "orthogonal": { vi: "Trực giao / Vuông góc", ipa: "/ɔːrˈθɑː.ɡən.əl/", note: "Tích vô hướng bằng 0" },
    "parallel": { vi: "Song song", ipa: "/ˈper.ə.lel/", note: "Cùng phương và không cắt nhau" },
    "collinear": { vi: "Cùng phương / Thẳng hàng", ipa: "/kəˈlɪn.i.ɚ/", note: "Các điểm nằm trên cùng một đường thẳng" },
    "coplanar": { vi: "Đồng phẳng", ipa: "/koʊˈpleɪ.nɚ/", note: "Cùng nằm trong một mặt phẳng" },
    "magnitude": { vi: "Độ dài / Độ lớn của vectơ", ipa: "/ˈmæɡ.nə.tuːd/", note: "Độ dài đoạn thẳng có hướng" },
    "unit vector": { vi: "Vectơ đơn vị", ipa: "/ˈjuː.nɪt ˈvek.tɚ/", note: "Vectơ có độ dài bằng 1" },
    "coordinate": { vi: "Tọa độ", ipa: "/koʊˈɔːr.dən.ət/", note: "Cặp số xác định vị trí" },
    "coordinates": { vi: "Hệ tọa độ / Tọa độ các điểm", ipa: "/koʊˈɔːr.dən.əts/", note: "(x, y) hoặc (x, y, z)" },
    "origin": { vi: "Gốc tọa độ", ipa: "/ˈɔːr.ə.dʒɪn/", note: "Điểm O(0, 0, 0)" },
    "plane": { vi: "Mặt phẳng", ipa: "/pleɪn/", note: "Không gian 2 chiều phẳng" },
    "space": { vi: "Không gian", ipa: "/speɪs/", note: "Không gian 3 chiều Oxyz" },
    "centroid": { vi: "Trọng tâm tam giác", ipa: "/ˈsen.trɔɪd/", note: "Giao điểm của ba đường trung tuyến" },
    "midpoint": { vi: "Trung điểm", ipa: "/ˈmɪd.pɔɪnt/", note: "Điểm chia đôi đoạn thẳng" },
    "distance": { vi: "Khoảng cách", ipa: "/ˈdɪs.təns/", note: "Độ dài giữa hai điểm" },

    // Complex Numbers & Algebra
    "complex number": { vi: "Số phức", ipa: "/ˈkɑːm.pleks ˈnʌm.bɚ/", note: "Số có dạng z = a + bi" },
    "real part": { vi: "Phần thực", ipa: "/ˈriː.əl pɑːrt/", note: "Số thực a trong z = a + bi" },
    "imaginary part": { vi: "Phần ảo", ipa: "/ɪˈmædʒ.ə.ner.i pɑːrt/", note: "Hệ số b của đơn vị ảo i" },
    "imaginary unit": { vi: "Đơn vị ảo", ipa: "/ɪˈmædʒ.ə.ner.i ˈjuː.nɪt/", note: "Ký hiệu i với i^2 = -1" },
    "modulus": { vi: "Mô-đun của số phức", ipa: "/ˈmɑː.dʒə.ləs/", note: "Độ dài căn(a^2 + b^2)" },
    "conjugate": { vi: "Số phức liên hợp", ipa: "/ˈkɑːn.dʒə.ɡeɪt/", note: "Số phức z ngang = a - bi" },
    "complex plane": { vi: "Mặt phẳng phức (mặt phẳng Argand)", ipa: "/ˈkɑːm.pleks pleɪn/", note: "Trục hoành biểu diễn phần thực, trục tung phần ảo" },
    
    // Probability & Statistics
    "probability": { vi: "Xác suất", ipa: "/ˌprɑː.bəˈbɪl.ə.t̬i/", note: "Khả năng xảy ra của một biến cố" },
    "sample space": { vi: "Không gian mẫu", ipa: "/ˈsæm.pəl speɪs/", note: "Tập hợp tất cả các kết quả có thể xảy ra" },
    "event": { vi: "Biến cố", ipa: "/ɪˈvent/", note: "Tập con của không gian mẫu" },
    "independent events": { vi: "Các biến cố độc lập", ipa: "/ˌɪn.dɪˈpen.dənt ɪˈvents/", note: "Biến cố này không ảnh hưởng đến biến cố kia" },
    "conditional probability": { vi: "Xác suất có điều kiện", ipa: "/kənˈdɪʃ.ən.əl ˌprɑː.bəˈbɪl.ə.t̬i/", note: "Xác suất xảy ra A khi biết B đã xảy ra" },
    "variance": { vi: "Phương sai", ipa: "/ˈver.i.əns/", note: "Độ phân tán của mẫu số liệu" },
    "standard deviation": { vi: "Độ lệch chuẩn", ipa: "/ˌstæn.dɚd ˌdiː.viˈeɪ.ʃən/", note: "Căn bậc hai của phương sai" },
    
    // Common Problem Solving Verbs & Phrases
    "find the value of": { vi: "Tìm giá trị của", ipa: "/faɪnd ðə ˈvæl.juː əv/", note: "Yêu cầu tính toán biểu thức" },
    "given that": { vi: "Cho biết / Giả sử rằng", ipa: "/ˈɡɪv.ən ðæt/", note: "Dữ kiện ban đầu của bài toán" },
    "determine whether": { vi: "Xác định xem liệu", ipa: "/dɪˈtɝː.mɪn ˈweð.ɚ/", note: "Kiểm tra tính đúng sai" },
    "prove that": { vi: "Chứng minh rằng", ipa: "/pruːv ðæt/", note: "Yêu cầu lập luận logic" },
    "which of the following": { vi: "Khẳng định nào sau đây / Phương án nào", ipa: "/wɪtʃ əv ðə ˈfɑː.loʊ.ɪŋ/", note: "Câu hỏi trắc nghiệm tiêu chuẩn" },
    "is true": { vi: "Là đúng", ipa: "/ɪz truː/", note: "Mệnh đề đúng" },
    "is false": { vi: "Là sai", ipa: "/ɪz fɑːls/", note: "Mệnh đề sai" },
    "satisfies": { vi: "Thỏa mãn điều kiện", ipa: "/ˈsæt̬.ɪs.faɪz/", note: "Nghiệm của phương trình/hệ thức" },
    "maximum value": { vi: "Giá trị lớn nhất (GTLN / Max)", ipa: "/ˈmæk.sə.məm ˈvæl.juː/", note: "Giá trị lớn nhất trên miền D" },
    "minimum value": { vi: "Giá trị nhỏ nhất (GTNN / Min)", ipa: "/ˈmɪn.ə.məm ˈvæl.juː/", note: "Giá trị nhỏ nhất trên miền D" },
    "domain of the function": { vi: "Tập xác định của hàm số", ipa: "/doʊˈmeɪn əv ðə ˈfʌŋk.ʃən/", note: "Tập hợp các giá trị của x" },
    "range of the function": { vi: "Tập giá trị của hàm số", ipa: "/reɪndʒ əv ðə ˈfʌŋk.ʃən/", note: "Tập hợp các giá trị của y" }
  },

  // Translation cache for fast lookups
  translationCache: {},

  // Active recognition instance for shadowing
  recognition: null,
  isRecording: false,
  currentTargetText: '',
  currentTargetVi: '',

  init() {
    this.createFloatingTooltip();
    this.createShadowingModal();
    this.setupSelectionListener();
    this.setupSpeechVoices();
  },

  setupSpeechVoices() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // Warm up speech synthesis
      };
    }
  },

  cleanLatexForSpeech(text) {
    if (!text) return '';
    return text
      .replace(/\$\$[\s\S]*?\$\$/g, ' math formula ')
      .replace(/\$([^\$]+)\$/g, (m, formula) => {
        return ' ' + formula
          .replace(/\\vec\{([^}]+)\}/g, 'vector $1')
          .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 over $2')
          .replace(/\\sqrt\{([^}]+)\}/g, 'square root of $1')
          .replace(/\\lim_\{([^}]+)\}/g, 'limit as $1')
          .replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, 'integral from $1 to $2')
          .replace(/f'\(x\)/g, "f prime of x")
          .replace(/f''\(x\)/g, "f double prime of x")
          .replace(/f\(x\)/g, "f of x")
          .replace(/\\cdot/g, ' dot ')
          .replace(/\\perp/g, ' is perpendicular to ')
          .replace(/\\pm/g, ' plus or minus ')
          .replace(/\\Delta/g, ' delta ')
          .replace(/\\infty/g, ' infinity ')
          .replace(/\\in/g, ' in ')
          .replace(/\\mathbb\{R\}/g, ' real numbers ')
          .replace(/[\\_{}^]/g, ' ') + ' ';
      })
      .replace(/\s+/g, ' ')
      .trim();
  },

  speak(text, rate = 1.0) {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt hiện tại không hỗ trợ Web Speech API.');
      return;
    }
    const clean = this.cleanLatexForSpeech(text);
    if (!clean) return;

    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.lang = 'en-US';
    utter.rate = rate; // 1.0 is standard, 0.75 is slow practice

    // Select natural US voice if available
    const voices = window.speechSynthesis.getVoices();
    const usVoice = voices.find(v => (v.lang === 'en-US' || v.lang === 'en_US') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (usVoice) utter.voice = usVoice;

    window.speechSynthesis.speak(utter);
  },

  async translate(text) {
    const raw = text.trim();
    if (!raw) return '';

    const lower = raw.toLowerCase().replace(/[.,!?;:]+$/, '').trim();
    // 1. Direct local dictionary match
    if (this.mathDictionary[lower]) {
      return this.mathDictionary[lower].vi;
    }

    // 2. Check cache
    if (this.translationCache[raw]) {
      return this.translationCache[raw];
    }

    // 3. Query Google Translate Free Endpoint
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(raw)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        let translated = '';
        if (data && data[0]) {
          data[0].forEach(chunk => {
            if (chunk[0]) translated += chunk[0];
          });
        }
        if (translated) {
          this.translationCache[raw] = translated;
          return translated;
        }
      }
    } catch (e) {
      console.warn('Online translation error, falling back to local heuristic:', e);
    }

    // 4. Fallback search inside math terms
    for (const [key, val] of Object.entries(this.mathDictionary)) {
      if (lower.includes(key)) {
        return `[Thuật ngữ: ${key} = ${val.vi}]`;
      }
    }

    return 'Bản dịch tự động đang sẵn sàng';
  },

  // ==============================================================
  // 1. FLOATING TOOLTIP FOR SELECTED TEXT (BÔI ĐEN ĐỂ ĐỌC & DỊCH)
  // ==============================================================
  createFloatingTooltip() {
    if (document.getElementById('bilingual-floating-tooltip')) return;

    const tooltip = document.createElement('div');
    tooltip.id = 'bilingual-floating-tooltip';
    tooltip.className = 'fixed z-50 hidden bg-slate-900 text-white rounded-2xl shadow-2xl p-3 border border-indigo-500/40 backdrop-blur-md max-w-sm transition-opacity duration-150 text-xs';
    tooltip.innerHTML = `
      <div class="flex items-center justify-between gap-3 border-b border-slate-700/80 pb-2 mb-2">
        <div class="flex items-center gap-1.5 font-bold text-amber-300 text-[11px] truncate max-w-[200px]" id="bilingual-tooltip-text-preview">
          English text
        </div>
        <button onclick="BilingualHelper.hideFloatingTooltip()" class="text-slate-400 hover:text-white text-xs px-1">✕</button>
      </div>

      <div id="bilingual-tooltip-translation" class="text-emerald-300 font-medium text-xs mb-2.5 p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 leading-snug">
        Đang dịch nghĩa...
      </div>

      <div class="flex items-center gap-1.5 flex-wrap">
        <button onclick="BilingualHelper.speakCurrentSelection(1.0)" class="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-xs transition-colors" title="Nghe đọc chuẩn">
          <span>🔊</span> <span>Nghe</span>
        </button>
        <button onclick="BilingualHelper.speakCurrentSelection(0.75)" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium flex items-center gap-1 transition-colors" title="Nghe tốc độ chậm để luyện phát âm">
          <span>🐢</span> <span>Chậm</span>
        </button>
        <button onclick="BilingualHelper.openShadowingForSelection()" class="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 text-[11px] font-bold flex items-center gap-1 transition-colors" title="Mở phòng luyện đọc theo & chấm điểm">
          <span>🎙️</span> <span>Luyện đọc theo</span>
        </button>
      </div>
    `;

    document.body.appendChild(tooltip);

    // Close when clicking outside
    document.addEventListener('mousedown', (e) => {
      const tt = document.getElementById('bilingual-floating-tooltip');
      if (tt && !tt.contains(e.target)) {
        // Small delay to allow button clicks inside
        setTimeout(() => {
          const sel = window.getSelection().toString().trim();
          if (!sel) this.hideFloatingTooltip();
        }, 100);
      }
    });
  },

  setupSelectionListener() {
    let debounceTimer = null;
    document.addEventListener('mouseup', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const selection = window.getSelection();
        const text = selection.toString().trim();
        
        // Ignore if clicked inside input, textarea, or the tooltip itself
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('#bilingual-floating-tooltip') || e.target.closest('#modal-shadowing-practice')) {
          return;
        }

        if (text && text.length >= 2 && /[a-zA-Z]/.test(text)) {
          this.showFloatingTooltip(selection, text);
        } else {
          this.hideFloatingTooltip();
        }
      }, 150);
    });
  },

  currentSelectedText: '',

  async showFloatingTooltip(selection, text) {
    const tooltip = document.getElementById('bilingual-floating-tooltip');
    if (!tooltip || selection.rangeCount === 0) return;

    this.currentSelectedText = text;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const previewEl = document.getElementById('bilingual-tooltip-text-preview');
    const transEl = document.getElementById('bilingual-tooltip-translation');

    if (previewEl) previewEl.innerText = text.length > 30 ? text.substring(0, 30) + '...' : text;
    if (transEl) transEl.innerText = 'Đang tra cứu dịch nghĩa...';

    // Position tooltip above selection
    tooltip.classList.remove('hidden');
    tooltip.style.opacity = '1';

    const topPos = window.scrollY + rect.top - tooltip.offsetHeight - 10;
    const leftPos = Math.max(10, Math.min(window.innerWidth - 320, window.scrollX + rect.left + (rect.width / 2) - 140));

    tooltip.style.top = `${Math.max(10, topPos)}px`;
    tooltip.style.left = `${leftPos}px`;

    // Fetch translation
    const trans = await this.translate(text);
    if (transEl) {
      const lower = text.toLowerCase().trim();
      const dictEntry = this.mathDictionary[lower];
      if (dictEntry) {
        transEl.innerHTML = `
          <div class="font-bold text-white text-xs">👉 ${dictEntry.vi}</div>
          <div class="text-[11px] text-teal-300 font-mono mt-0.5">${dictEntry.ipa} • ${dictEntry.note}</div>
        `;
      } else {
        transEl.innerHTML = `<span class="text-white font-semibold">👉 ${trans}</span>`;
      }
    }
  },

  hideFloatingTooltip() {
    const tooltip = document.getElementById('bilingual-floating-tooltip');
    if (tooltip) {
      tooltip.classList.add('hidden');
    }
  },

  speakCurrentSelection(rate = 1.0) {
    if (this.currentSelectedText) {
      this.speak(this.currentSelectedText, rate);
    }
  },

  openShadowingForSelection() {
    const text = this.currentSelectedText;
    const transEl = document.getElementById('bilingual-tooltip-translation');
    const vi = transEl ? transEl.innerText.replace(/^👉\s*/, '') : '';
    this.hideFloatingTooltip();
    this.openShadowingPractice(text, vi);
  },

  // ==============================================================
  // 2. INLINE BUTTONS (NGHE ĐỌC & DỊCH NGAY CẠNH MỖI TỪ / CÂU)
  // ==============================================================
  renderInlinePill(englishText, vietnameseText = '') {
    const safeEn = (englishText || '').replace(/"/g, '&quot;').replace(/'/g, "\\'");
    const safeVi = (vietnameseText || '').replace(/"/g, '&quot;').replace(/'/g, "\\'");
    return `
      <span class="inline-bilingual-helper inline-flex items-center gap-1 align-middle ml-1.5 select-none" onclick="event.stopPropagation()">
        <button onclick="BilingualHelper.speak('${safeEn}', 1.0)" class="w-6 h-6 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center text-xs transition-colors shadow-2xs border border-indigo-200/80 cursor-pointer" title="Nghe đọc chuẩn tiếng Anh (Web Speech)">
          🔊
        </button>
        <button onclick="BilingualHelper.speak('${safeEn}', 0.75)" class="w-6 h-6 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white flex items-center justify-center text-xs transition-colors shadow-2xs border border-amber-200/80 cursor-pointer" title="Nghe tốc độ chậm (0.75x) để luyện theo">
          🐢
        </button>
        <button onclick="BilingualHelper.openShadowingPractice('${safeEn}', '${safeVi}')" class="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white flex items-center gap-1 text-[11px] font-bold transition-colors shadow-2xs border border-emerald-200/80 cursor-pointer" title="Xem dịch nghĩa, phiên âm và luyện đọc theo với micro">
          <span>🎙️</span> <span>Luyện theo</span>
        </button>
      </span>
    `;
  },

  // Title Audio Speaker Helper
  renderTitleSpeaker(englishTitle) {
    if (!englishTitle) return '';
    const safeEn = (englishTitle || '').replace(/"/g, '&quot;').replace(/'/g, "\\'");
    return `
      <span class="inline-title-speaker inline-flex items-center gap-1 ml-2 align-middle select-none" onclick="event.stopPropagation()">
        <button onclick="BilingualHelper.speak('${safeEn}', 1.0)" class="w-6 h-6 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white flex items-center justify-center text-xs transition-all shadow-2xs border border-indigo-200/80 cursor-pointer" title="Phát âm tiếng Anh: ${safeEn}">
          🔊
        </button>
        <button onclick="BilingualHelper.speak('${safeEn}', 0.75)" class="w-6 h-6 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white flex items-center justify-center text-xs transition-all shadow-2xs border border-amber-200/80 cursor-pointer" title="Nghe chậm (0.75x)">
          🐢
        </button>
      </span>
    `;
  },

  // ==============================================================
  // 3. INTERACTIVE SHADOWING & PRONUNCIATION PRACTICE MODAL
  // ==============================================================
  createShadowingModal() {
    if (document.getElementById('modal-shadowing-practice')) return;

    const modal = document.createElement('div');
    modal.id = 'modal-shadowing-practice';
    modal.className = 'hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto';
    modal.innerHTML = `
      <div class="glass-card max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in duration-150">
        
        <!-- Modal Header -->
        <div class="flex items-start justify-between border-b border-slate-100 pb-3">
          <div class="flex items-center gap-2.5">
            <span class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-amber-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              🎙️
            </span>
            <div>
              <h3 class="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                Luyện Đọc Phát Âm & Dịch Nghĩa Song Ngữ
              </h3>
              <p class="text-[11px] text-slate-500">Kỹ thuật Shadowing: Nghe chuẩn, luyện nói theo và nhận phản hồi tức thì</p>
            </div>
          </div>
          <button onclick="BilingualHelper.closeShadowingModal()" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition-all">✕</button>
        </div>

        <!-- Target English Text Card -->
        <div class="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
          <div class="flex items-center justify-between text-xs font-bold uppercase text-indigo-700 tracking-wider">
            <span>Câu / Cụm Từ Tiếng Anh Mục Tiêu:</span>
            <span id="shadow-ipa-badge" class="font-mono text-indigo-600 font-semibold lowercase">/ipa/</span>
          </div>
          <div id="shadow-target-en" class="text-base sm:text-lg font-black text-slate-900 leading-relaxed font-sans">
            Target English text
          </div>
          
          <div class="pt-2 border-t border-indigo-200/60 flex items-center justify-between text-xs">
            <span class="font-bold text-indigo-800">🇻🇳 Nghĩa tiếng Việt:</span>
            <div id="shadow-target-vi" class="font-semibold text-emerald-700 text-right">
              Bản dịch tiếng Việt
            </div>
          </div>
        </div>

        <!-- Speech Controls -->
        <div class="flex flex-wrap items-center justify-center gap-2.5 py-1">
          <button onclick="BilingualHelper.speakTarget(1.0)" class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer">
            <span>🔊</span> <span>Nghe Chuẩn (1.0x)</span>
          </button>
          <button onclick="BilingualHelper.speakTarget(0.75)" class="px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer">
            <span>🐢</span> <span>Nghe Chậm (0.75x)</span>
          </button>
          <button id="btn-start-record" onclick="BilingualHelper.toggleSpeechRecognition()" class="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer animate-pulse">
            <span id="record-icon">🎙️</span> <span id="record-label">Bấm Để Thu Âm & Luyện Đọc</span>
          </button>
        </div>

        <!-- Pronunciation Feedback Section -->
        <div id="shadow-feedback-box" class="hidden p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div class="flex items-center justify-between font-bold">
            <span class="text-slate-700">Kết quả nhận diện giọng nói của bạn:</span>
            <span id="shadow-score-badge" class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">100%</span>
          </div>
          <div id="shadow-user-transcript" class="p-3 bg-white rounded-xl border border-slate-200 font-medium text-slate-800 text-sm leading-relaxed">
            ...
          </div>
          <div id="shadow-feedback-comment" class="text-[11px] font-semibold text-slate-500">
            Hãy phát âm rõ ràng từng từ tiếng Anh vào microphone.
          </div>
        </div>

        <!-- Tips Footer -->
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
          <span class="text-base">💡</span>
          <span><strong>Mẹo học tập:</strong> Nghe mẫu 2-3 lần, nhại lại chuẩn ngữ điệu (Shadowing), sau đó nhấn nút thu âm để hệ thống chấm điểm độ chính xác.</span>
        </div>

        <div class="flex justify-end pt-1">
          <button onclick="BilingualHelper.closeShadowingModal()" class="px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-all cursor-pointer">
            Đóng
          </button>
        </div>

      </div>
    `;

    document.body.appendChild(modal);
  },

  openShadowingPractice(textEn, textVi = '') {
    this.createShadowingModal();
    const modal = document.getElementById('modal-shadowing-practice');
    if (!modal) return;

    this.currentTargetText = (textEn || '').trim();
    this.currentTargetVi = (textVi || '').trim();

    const enEl = document.getElementById('shadow-target-en');
    const viEl = document.getElementById('shadow-target-vi');
    const ipaEl = document.getElementById('shadow-ipa-badge');
    const fbBox = document.getElementById('shadow-feedback-box');

    if (enEl) enEl.innerText = this.currentTargetText;
    if (fbBox) fbBox.classList.add('hidden');

    // Check IPA in dictionary
    const lower = this.currentTargetText.toLowerCase().replace(/[.,!?;:]+$/, '').trim();
    const dict = this.mathDictionary[lower];
    if (ipaEl) {
      if (dict && dict.ipa) {
        ipaEl.innerText = dict.ipa;
        ipaEl.classList.remove('hidden');
      } else {
        ipaEl.classList.add('hidden');
      }
    }

    // Set Vietnamese translation
    if (viEl) {
      if (this.currentTargetVi) {
        viEl.innerText = this.currentTargetVi;
      } else if (dict && dict.vi) {
        viEl.innerText = dict.vi;
      } else {
        viEl.innerText = 'Đang dịch...';
        this.translate(this.currentTargetText).then(res => {
          viEl.innerText = res;
        });
      }
    }

    modal.classList.remove('hidden');

    // Auto-play pronunciation once when opened for immediate learning
    this.speak(this.currentTargetText, 1.0);
  },

  closeShadowingModal() {
    const modal = document.getElementById('modal-shadowing-practice');
    if (modal) modal.classList.add('hidden');
    if (this.isRecording && this.recognition) {
      this.recognition.stop();
      this.isRecording = false;
    }
  },

  speakTarget(rate = 1.0) {
    if (this.currentTargetText) {
      this.speak(this.currentTargetText, rate);
    }
  },

  toggleSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ Web Speech Recognition để thu âm giọng nói trực tiếp. Bạn vẫn có thể nghe phát âm chuẩn bằng nút Nghe Chuẩn và Nghe Chậm!');
      return;
    }

    const btn = document.getElementById('btn-start-record');
    const icon = document.getElementById('record-icon');
    const label = document.getElementById('record-label');

    if (this.isRecording) {
      if (this.recognition) this.recognition.stop();
      this.isRecording = false;
      if (btn) btn.className = 'px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer';
      if (icon) icon.innerText = '🎙️';
      if (label) label.innerText = 'Bấm Để Thu Âm & Luyện Đọc';
      return;
    }

    try {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      this.recognition.onstart = () => {
        this.isRecording = true;
        if (btn) btn.className = 'px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-2 shadow-lg ring-4 ring-amber-300 transition-all cursor-pointer';
        if (icon) icon.innerText = '🔴';
        if (label) label.innerText = 'Đang nghe... Hãy đọc câu trên!';
        
        const fbBox = document.getElementById('shadow-feedback-box');
        const userTranscript = document.getElementById('shadow-user-transcript');
        if (fbBox) fbBox.classList.remove('hidden');
        if (userTranscript) userTranscript.innerHTML = '<span class="text-amber-600 animate-pulse">Đang lắng nghe giọng của bạn qua microphone...</span>';
      };

      this.recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        this.evaluatePronunciation(spokenText);
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        this.isRecording = false;
        if (btn) btn.className = 'px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer';
        if (icon) icon.innerText = '🎙️';
        if (label) label.innerText = 'Bấm Để Thu Âm & Luyện Đọc';

        const userTranscript = document.getElementById('shadow-user-transcript');
        if (userTranscript) {
          userTranscript.innerHTML = `<span class="text-rose-600">Lỗi thu âm: ${event.error === 'not-allowed' ? 'Vui lòng cấp quyền truy cập Microphone cho trình duyệt.' : 'Không phát hiện âm thanh. Hãy thử lại gần micro hơn.'}</span>`;
        }
      };

      this.recognition.onend = () => {
        this.isRecording = false;
        if (btn) btn.className = 'px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer';
        if (icon) icon.innerText = '🎙️';
        if (label) label.innerText = 'Luyện Lại Lần Nữa';
      };

      this.recognition.start();
    } catch (e) {
      console.error('Cannot start SpeechRecognition:', e);
      alert('Không thể khởi tạo thu âm: ' + e.message);
    }
  },

  evaluatePronunciation(spokenText) {
    const targetClean = this.cleanLatexForSpeech(this.currentTargetText).toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    const spokenClean = spokenText.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

    const targetWords = targetClean.split(/\s+/).filter(Boolean);
    const spokenWords = spokenClean.split(/\s+/).filter(Boolean);

    let matchCount = 0;
    const highlightedWords = targetWords.map(tw => {
      if (spokenWords.includes(tw)) {
        matchCount++;
        return `<span class="text-emerald-600 font-bold bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">${tw}</span>`;
      } else {
        return `<span class="text-rose-600 font-bold bg-rose-50 px-1 py-0.5 rounded border border-rose-200">${tw}</span>`;
      }
    });

    const score = targetWords.length > 0 ? Math.round((matchCount / targetWords.length) * 100) : 100;

    const fbBox = document.getElementById('shadow-feedback-box');
    const badge = document.getElementById('shadow-score-badge');
    const transcriptEl = document.getElementById('shadow-user-transcript');
    const commentEl = document.getElementById('shadow-feedback-comment');

    if (fbBox) fbBox.classList.remove('hidden');

    if (badge) {
      badge.innerText = `${score}%`;
      if (score >= 80) {
        badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200';
      } else if (score >= 50) {
        badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200';
      } else {
        badge.className = 'px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-200';
      }
    }

    if (transcriptEl) {
      transcriptEl.innerHTML = `
        <div class="mb-1.5"><span class="text-slate-400 text-xs">Bạn vừa đọc:</span> "<strong>${spokenText}</strong>"</div>
        <div class="text-xs pt-2 border-t border-slate-100 leading-relaxed">
          <span class="text-slate-500 font-semibold mr-1">Đối chiếu chuẩn:</span>
          ${highlightedWords.join(' ')}
        </div>
      `;
    }

    if (commentEl) {
      if (score >= 90) {
        commentEl.innerHTML = '🎉 <strong>Xuất sắc (Excellent)!</strong> Phát âm rất chuẩn ngữ điệu toán học.';
      } else if (score >= 70) {
        commentEl.innerHTML = '👍 <strong>Khá tốt (Good job)!</strong> Chú ý các từ màu đỏ để phát âm tròn vành rõ chữ hơn.';
      } else {
        commentEl.innerHTML = '💪 <strong>Cần luyện thêm (Keep practicing)!</strong> Hãy bấm "Nghe Chậm (0.75x)" 2 lần rồi thu âm lại nhé.';
      }
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => BilingualHelper.init());
} else {
  BilingualHelper.init();
}

window.BilingualHelper = BilingualHelper;
