const SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzvTuHAb78nlFWPzu6UAJoI_MPJuviIPxgBVP_xYNp7bP-nmH1RqqqwBUp-iEQ9pVcR/exec";
const STORAGE_KEY = "suandok-news-history-v2";
const LANGUAGE_KEY = "suandok-news-language";
const ADMIN_AUTH_KEY = "suandok-news-admin-auth-v1";
const NEWS_REQUIRED_NAV_KEY = "suandok-news-required-nav-v1";
const HISTORY_FETCH_LIMIT = 100;
const HOME_SEPSIS_CASE_LIMIT = 5;
const SEPSIS_PROTOCOL_KEY = "suandok-sepsis-protocol-v1";
const SEPSIS_PROGRESS_TASKS = ["consult", 1, 4, 3, 2, 6, 5, 7];
const SEPSIS_CHECK_ONLY_STEPS = new Set(["consult", 2, 3, 7]);
const SEPSIS_SHARED_TIME_STEPS = new Map([[4, 1]]);
const SMART_EVALUATION_KEY = "smart-sepsis-app-evaluation-v1";
const SATISFACTION_SHEET_NAME = "Satisfaction Assessment Form";
const APP_VERSION = "20260610-readable-type-cache-fix";
const SMART_EVALUATION_QUESTIONS = [
  "รูปแบบหน้าจอมีความสวยงามและน่าสนใจ",
  "เมนูและฟังก์ชันต่าง ๆ เข้าใจง่าย",
  "แอปพลิเคชันสามารถใช้งานได้สะดวก",
  "ความรวดเร็วในการบันทึกข้อมูลผู้ป่วย",
  "ช่วยลดระยะเวลาในการคัดกรองผู้ป่วยสงสัย Sepsis",
  "แอปพลิเคชันช่วยให้สามารถคัดกรองหรือตัดสินใจทางคลินิกได้ง่ายขึ้น",
  "ช่วยให้ประเมิน NEWS Score ได้สะดวกและถูกต้อง",
  "ช่วยให้ปฏิบัติตาม Sepsis Protocol ได้ครบถ้วน",
  "ช่วยลดความคลาดเคลื่อนในการดูแลผู้ป่วย Sepsis",
  "ช่วยให้สามารถติดตามผู้ป่วยได้อย่างต่อเนื่อง",
  "ช่วยให้เข้าถึงแนวทางการดูแลผู้ป่วย Sepsis ได้ง่าย",
  "ข้อมูลที่แสดงผลมีความถูกต้องและน่าเชื่อถือ",
  "แอปพลิเคชันมีประโยชน์ต่อการปฏิบัติงานในห้องฉุกเฉิน",
  "มีความพึงพอใจโดยรวมต่อการใช้งานแอปพลิเคชัน"
];

const SMART_EVALUATION_QUESTIONS_EN = [
  "The screen design is attractive and engaging",
  "Menus and functions are easy to understand",
  "The application is convenient to use",
  "Patient data can be recorded quickly",
  "The application helps reduce screening time for suspected sepsis patients",
  "The application supports easier clinical screening or decision-making",
  "NEWS Score assessment is convenient and accurate",
  "The application helps complete Sepsis Protocol steps",
  "The application helps reduce errors in sepsis care",
  "The application supports continuous patient follow-up",
  "Sepsis care guidelines are easy to access",
  "Displayed information is accurate and reliable",
  "The application is useful for work in the emergency department",
  "Overall satisfaction with using the application"
];

const PAGE_TEXT = {
  th: {
    languageTh: "ไทย",
    languageEn: "EN",
    appTagline: "รู้ทัน เช็กไว เตือนภัย SEPSIS",
    desktopNav: {
      home: "หน้าหลัก",
      assessment: "ประเมิน NEWS",
      history: "ประวัติ",
      dashboard: "Dashboard สรุปผล",
      sepsis: "Sepsis Protocol",
      knowledge: "Knowledge"
    },
    desktopViews: {
      home: ["หน้าหลัก", "เลือกส่วนที่ต้องการใช้งานจากเมนูด้านซ้าย"],
      assessment: ["ประเมิน NEWS", "กรอกข้อมูลและคำนวณคะแนน National Early Warning Score"],
      history: ["ประวัติการประเมิน", "ค้นหา เปิดดู และจัดการข้อมูลย้อนหลัง"],
      dashboard: ["Dashboard สรุปผล", "ดูภาพรวมและตัวชี้วัดคุณภาพการดูแลผู้ป่วย Sepsis"],
      sepsis: ["Sepsis Protocol", "ติดตาม Sepsis 6 พร้อมเวลาสำคัญและรายการดำเนินการ"],
      evaluation: ["ประเมิน Smart Sepsis App", "แบบประเมินความพึงพอใจ 14 ข้อ คะแนน 1-5 สำหรับผู้ใช้งาน"],
      knowledge: ["Knowledge", "ความรู้และแนวทางการดูแล Sepsis สำหรับทบทวนและใช้งานร่วมกับ NEWS"],
      more: ["Sepsis Protocol / อื่นๆ", "รวม protocol, ฟอร์มผู้ป่วย และข้อมูลประกอบ"]
    },
    dashboard: {
      title: "CQI & Performance",
      subtitle: "ติดตามคุณภาพการดูแลผู้ป่วย Sepsis",
      date: "วันที่",
      location: "สถานที่",
      refresh: "รีเฟรช",
      loading: "กำลังโหลดข้อมูลจาก Google Sheet...",
      preparing: "กำลังเตรียมข้อมูล...",
      range: "ช่วงข้อมูล",
      partialError: "โหลดข้อมูลบางส่วนไม่สำเร็จ",
      allDates: "ทุกวันที่โหลดได้",
      allLocations: "ทุกสถานที่",
      summarySepsis: "ผู้ป่วย Sepsis ทั้งหมด",
      summaryAtb3h: "ผู้ป่วย sepsis ที่ได้รับยา ATB ภายใน 3 ชม.",
      summarySevereAtb1h: "ผู้ป่วย severe sepsis หรือ septic shock ที่ได้รับยา ATB ภายใน 1 ชม.",
      caseUnit: "ราย",
      noTimeData: "ยังไม่มีข้อมูลเวลา",
      noCases: "ยังไม่มีเคส",
      noTrend: "ยังไม่มีข้อมูลสำหรับแนวโน้ม",
      sourceTitle: "ตำแหน่งที่พบการติดเชื้อ (source of infection)",
      trendTitle: "แนวโน้มผลลัพธ์",
      qualityTitle: "ตัวชี้วัดคุณภาพ",
      riskTitle: "ระดับความเสี่ยงจาก NEWS",
      metricSepsisCount: "จำนวนผู้ป่วย",
      metricSepsisCountLong: "จำนวนผู้ป่วย Sepsis (ราย)",
      range7: "7 วัน",
      range30: "30 วัน",
      range90: "3 เดือน",
      range365: "12 เดือน",
      dayMonth: "วัน",
      qualityHeaderIndicator: "ตัวชี้วัด",
      qualityHeaderTarget: "เป้าหมาย",
      qualityHeaderResult: "ผลลัพธ์",
      qualityBloodCulture: "เจาะ Hemoculture ก่อนได้ ATB ทุกครั้ง",
      qualityAtb3h: "ผู้ป่วย sepsis ได้รับ ATB ภายใน 3 ชั่วโมง นับตั้งแต่เข้าห้องฉุกเฉิน",
      qualitySevereAtb1h: "ผู้ป่วย severe sepsis หรือ septic shock ได้รับยา ATB ภายใน 1 ชั่วโมง นับตั้งแต่แพทย์วินิจฉัย",
      riskLow: "0-4 ต่ำ",
      riskWatch: "5-6 เฝ้าระวัง",
      riskHigh: "7-12 สูง",
      sourceLabels: {
        respiratory: "ระบบทางเดินหายใจ",
        urinary: "ระบบทางเดินปัสสาวะ",
        abdominal: "ช่องท้อง",
        skin: "ระบบผิวหนัง",
        unknown: "ไม่รู้แหล่งติดเชื้อ",
        other: "อื่นๆ"
      }
    },
    evaluation: {
      kicker: "Smart Sepsis App",
      title: "แบบประเมินความพึงพอใจ",
      subtitle: "ให้คะแนน 1-5 ตามแบบประเมิน Smart Sepsis App",
      section1: "ส่วนที่ 1 ข้อมูลทั่วไป",
      section1Hint: "เลือกข้อมูลผู้ประเมินก่อนให้คะแนน",
      position: "ตำแหน่ง",
      nurse: "พยาบาลวิชาชีพ",
      assistant: "ผู้ช่วยพยาบาล",
      other: "อื่นๆ",
      experience: "ระยะเวลาการทำงาน",
      expUnder1: "น้อยกว่า 1 ปี",
      exp1to5: "1-5 ปี",
      expOver5: "มากกว่า 5 ปี",
      section2: "ส่วนที่ 2 ความพึงพอใจต่อการทำงาน",
      scoreHint: "1 = น้อยที่สุด, 5 = มากที่สุด",
      section3: "ส่วนที่ 3 ข้อเสนอแนะ",
      section3Hint: "ข้อเสนอแนะหรือชื่นชม ให้กำลังใจ Team sepsis ER",
      suggestionPlaceholder: "พิมพ์ข้อเสนอแนะเพิ่มเติม",
      reset: "ล้างแบบประเมิน",
      submit: "บันทึกแบบประเมิน",
      thankTitle: "ขอบคุณสำหรับการประเมิน",
      thankText: "ข้อมูลของท่านจะถูกนำไปใช้ปรับปรุง Smart Sepsis App ให้ใช้งานได้ดียิ่งขึ้น",
      ok: "ตกลง"
    },
    home: {
      title: "Smart sepsis app",
      welcome: "ยินดีต้อนรับเข้าสู่ระบบ",
      latest: "ผู้ป่วยที่ประเมิน sepsis protocol ล่าสุด",
      viewAll: "ดูทั้งหมด",
      suspected: "พบผู้ป่วยสงสัย Sepsis",
      suspectedText: "ประเมิน NEWS ทันที เพื่อลดความเสี่ยงและเพิ่มความปลอดภัยของผู้ป่วย",
      start: "เริ่มประเมินทันที",
      today: "วันนี้",
      menuAssessment: "ประเมิน NEWS",
      menuDashboard: "Dashboard",
      menuDashboardSub: "สรุปผล",
      menuSepsis: "Sepsis",
      menuSepsisSub: "Protocol",
      menuKnowledge: "ความรู้ & แนวทาง",
      menuKnowledgeSub: "การดูแล Sepsis",
      menuEvaluation: "ประเมิน Smart Sepsis App"
    },
    knowledge: {
      title: "ความรู้และแนวทางการดูแล Sepsis",
      downloadTitle: "ดาวน์โหลดเอกสารเพิ่มเติม"
    },
    sepsis: {
      backHome: "กลับหน้าหลัก",
      age: "อายุ",
      sex: "เพศ",
      screeningDate: "วันที่คัดกรอง",
      fromNews: "ดึงจากประวัติ NEWS",
      unclassified: "ยังไม่ระบุระดับ",
      triageUrgency: "ระดับความเร่งด่วน",
      save: "บันทึก",
      notePlaceholder: "บันทึก note เพิ่มเติม เช่น antibiotic ที่ให้, ชื่อผู้รับผิดชอบ, การตอบสนองหลังให้สารน้ำ",
      patient: {
        location: "สถานที่ประเมิน",
        hnPlaceholder: "เช่น 123456789"
      },
      levels: {
        high: "เสี่ยงสูง",
        watch: "เฝ้าระวัง",
        medium: "ปานกลาง",
        low: "ต่ำ"
      },
      protocol: {
        hour1: "1 ชั่วโมง",
        hour3: "3 ชั่วโมง",
        severe: "Severe sepsis / septic shock: ภายใน 1 ชั่วโมง",
        sepsis: "Sepsis: ภายใน 3 ชั่วโมง",
        doctorDiagnosis: "แพทย์วินิจฉัย",
        screeningStart: "เริ่มคัดกรอง"
      },
      triage: {
        title: "Triage",
        subtitle: "ระดับความเร่งด่วน",
        resuscitation: "เร่งด่วนวิกฤต",
        emergency: "เร่งด่วน",
        urgency: "ด่วน",
        semiUrgency: "ค่อนข้างด่วน",
        nonUrgency: "ไม่เร่งด่วน"
      },
      consult: {
        title: "แพทย์วินิจฉัย",
        toggleLabel: "บันทึกเวลาแพทย์วินิจฉัย",
        doneTitle: "บันทึกเวลาแพทย์วินิจฉัยแล้ว",
        pendingTitle: "รอบันทึกเวลาแพทย์วินิจฉัย"
      },
      type: {
        title: "ประเภทภาวะ",
        subtitle: "เลือกประเภทภาวะของผู้ป่วย",
        sepsisText: "ภาวะติดเชื้อร่วมกับอวัยวะล้มเหลว",
        severeText: "ภาวะติดเชื้อรุนแรง ร่วมกับอวัยวะล้มเหลว และ/หรือ ช็อก",
        helper: "การเลือกประเภทจะช่วยแนะนำแนวทางการรักษาและเป้าหมายการดูแลที่เหมาะสม"
      },
      infection: {
        title: "Source of Infection",
        subtitle: "เลือกแหล่งติดเชื้อที่เป็นไปได้",
        respiratory: "ระบบทางเดินหายใจ",
        urinary: "ระบบทางเดินปัสสาวะ",
        abdominal: "ช่องท้อง",
        skin: "ระบบผิวหนังและเนื้อเยื่ออ่อน",
        unknown: "ไม่รู้แหล่งติดเชื้อ",
        other: "อื่นๆ"
      },
      progress: {
        subtitle: "ติดตามความก้าวหน้าของ {count} ขั้นตอนสำคัญแบบเรียลไทม์ ภายใน {target}",
        elapsed: "เวลาที่ผ่านไป",
        elapsedHint: "นับจากเวลาเริ่มคัดกรอง",
        remaining: "เหลือเวลา",
        overTarget: "เกินเป้าหมาย",
        complete: "เสร็จสิ้น",
        inProgress: "กำลังดำเนินการ",
        completion: "ทำแล้ว {done} จาก {total} รายการ",
        actions: "รายการดำเนินการ",
        all: "ทั้งหมด",
        pending: "รอดำเนินการ",
        done: "เสร็จแล้ว",
        minutes: "นาที",
        steps: "ขั้นตอน",
        items: "รายการ"
      },
      actions: {
        consult: ["แจ้งแพทย์", "ติ๊กเมื่อแจ้งแพทย์แล้ว"],
        1: ["เจาะเลือดเพาะเชื้อ (Hemoculture)", "เก็บ specimen จากตำแหน่งที่ติดเชื้อ"],
        2: ["Collect specimen from suspected source", "เก็บ specimen เพิ่มเติมตามแหล่งติดเชื้อ"],
        3: ["Retain foley's cath + Record urine output", "คาสายสวนปัสสาวะ และบันทึกปริมาณปัสสาวะ"],
        4: ["ตรวจ Lactate", "ผลแล็บ Lactate"],
        5: ["ให้สารน้ำ (IV Fluid)", "ให้ 30 ml/kg ภายใน {target}แรก"],
        6: ["ให้ยาปฏิชีวนะ (Antibiotic)", "ภายใน {target}แรก{goldenHour}"],
        7: ["ประเมินอาการและติดตามสัญญาณชีพ", "ติดตามอาการและประเมินซ้ำ"]
      },
      disposition: {
        title: "Disposition",
        subtitle: "เลือกแนวทางการดูแลต่อเนื่อง",
        admitWard: "รับไว้รักษาในโรงพยาบาล (หอผู้ป่วยทั่วไป)",
        admitIcu: "รับไว้รักษาในหอผู้ป่วยวิกฤต (ICU)",
        refer: "ส่งต่อโรงพยาบาลอื่น",
        discharge: "จำหน่ายกลับบ้าน"
      },
      currentCase: {
        title: "เคสที่กำลังทำ",
        subtitle: "สรุปเคสปัจจุบันแบบย่อ และเปิดรายการเคสทั้งหมดเมื่อต้องสลับงาน",
        chooseHistory: "เลือกจากประวัติ",
        viewAll: "ดูเคสทั้งหมด",
        deleteCurrent: "ลบเคสที่กำลังทำ",
        emptyActive: "ยังไม่มีเคสที่กำลังเปิดอยู่",
        deleteCurrentMissing: "ยังไม่มีเคสที่กำลังเปิดอยู่",
        noSaved: "ยังไม่มีเคสที่บันทึกไว้",
        loading: "กำลังโหลดเคสจาก Google Sheet...",
        failed: "โหลดจาก Google Sheet ไม่สำเร็จ กำลังแสดงข้อมูลในเครื่อง",
        activeSection: "เคสที่กำลังทำ",
        completedSection: "เคสที่ทำสมบูรณ์แล้ว 10 เคสล่าสุด",
        activeEmpty: "ยังไม่มีเคสที่กำลังทำ",
        completedEmpty: "ยังไม่มีเคสที่ทำสมบูรณ์แล้ว",
        openCurrent: "กำลังเปิด",
        open: "เปิดต่อ",
        delete: "ลบ",
        statusComplete: "เสร็จสิ้น",
        statusOver: "เกินเวลา",
        statusWorking: "กำลังทำ",
        noHn: "ยังไม่ระบุ HN",
        noTime: "ยังไม่ระบุเวลา",
        remaining: "เหลือ {minutes} นาที",
        over: "เกินเวลา {minutes} นาที",
        stepCount: "{done}/{total} ขั้นตอน",
        loaded: "เปิดเคส {title} แล้ว",
        deleteConfirm: "ต้องการลบ {title} ใช่ไหม?",
        deleteLast: "ลบเคสล่าสุดแล้ว เลือกเคสจากประวัติ NEWS เพื่อทำต่อ",
        deleted: "ลบ {title} แล้ว",
        chooseNewsOnly: "เลือกเคสจากประวัติ NEWS เท่านั้น หากเป็นผู้ป่วยใหม่ให้บันทึก NEWS ก่อน"
      },
      timeline: {
        title: "บันทึกเวลาสำคัญ",
        consult: "แพทย์วินิจฉัย",
        bloodCulture: "เจาะเลือดเพาะเชื้อ",
        lactate: "ตรวจ Lactate",
        fluid: "ให้สารน้ำ",
        antibiotic: "ให้ยาปฏิชีวนะ",
        pending: "รอดำเนินการ",
        notSet: "ยังไม่ระบุ"
      },
      focus: {
        title: "Care Focus",
        subtitle: "จุดเน้นสำหรับทีมดูแลในรอบนี้",
        item1Title: "ติดตามความดันและระดับความรู้สึกตัว",
        item1Text: "ผู้ป่วย NEWS สูงและมีความเสี่ยง septic shock",
        item2Title: "เตรียมผลเพาะเชื้อและ lactate",
        item2Text: "ใช้ประกอบการปรับแผนรักษาและ antibiotic",
        item3Title: "บันทึก reassessment ให้ครบ",
        item3Text: "เพื่อส่งต่อเวรและติดตามคุณภาพการดูแล"
      },
      modal: {
        title: "รายการเคส Sepsis Protocol",
        subtitle: "แสดงเคสที่กำลังทำ และเคสที่ทำสมบูรณ์แล้ว 10 เคสล่าสุดจาก Google Sheet",
        close: "ปิด"
      },
      statuses: {
        chooseHistoryFirst: "กรุณาเลือกหรือบันทึก NEWS ในประวัติก่อน จึงจะเปิดเป็นเคสที่กำลังทำได้",
        loadedFromAssessment: "ดึงข้อมูลจากแบบประเมินแล้ว",
        saveRequiresCase: "กรุณาเลือกเคสจากประวัติ NEWS ก่อนบันทึก Sepsis Protocol",
        saveRequiresDiagnosisTime: "กรุณาระบุเวลาแพทย์วินิจฉัยก่อนบันทึก Sepsis Protocol",
        savePending: "บันทึก Sepsis Protocol ลงเครื่องแล้ว กำลังส่งไป Google Sheet...",
        saveSuccess: "บันทึก Sepsis Protocol ลง sheet sepsis เรียบร้อยแล้ว",
        saveError: "บันทึกลงเครื่องแล้ว แต่ส่งไป sheet sepsis ไม่สำเร็จ",
        noteSaved: "บันทึก note ล่าสุดอัตโนมัติ"
      },
      homeCases: {
        loading: "กำลังโหลดเคสจาก Google Sheet...",
        failed: "โหลดจาก Google Sheet ไม่สำเร็จ กำลังแสดงข้อมูลในเครื่อง",
        empty: "ยังไม่มีเคส Sepsis Protocol"
      }
    }
  },
  en: {
    languageTh: "TH",
    languageEn: "English",
    appTagline: "Detect early, check fast, protect against SEPSIS",
    desktopNav: {
      home: "Home",
      assessment: "NEWS Assessment",
      history: "History",
      dashboard: "Dashboard",
      sepsis: "Sepsis Protocol",
      knowledge: "Knowledge"
    },
    desktopViews: {
      home: ["Home", "Choose a workflow from the menu"],
      assessment: ["NEWS Assessment", "Enter patient data and calculate the National Early Warning Score"],
      history: ["Assessment History", "Search, review, and manage saved assessments"],
      dashboard: ["Dashboard", "Review sepsis care quality indicators and performance"],
      sepsis: ["Sepsis Protocol", "Track Sepsis 6 tasks, key times, and care progress"],
      evaluation: ["Smart Sepsis App Evaluation", "14-item satisfaction survey, scored 1-5 by users"],
      knowledge: ["Knowledge", "Sepsis care knowledge and guidelines for review with NEWS"],
      more: ["Sepsis Protocol / More", "Protocols, patient forms, and supporting information"]
    },
    dashboard: {
      title: "CQI & Performance",
      subtitle: "Track sepsis care quality",
      date: "Date",
      location: "Location",
      refresh: "Refresh",
      loading: "Loading data from Google Sheet...",
      preparing: "Preparing data...",
      range: "Data range",
      partialError: "Some data could not be loaded",
      allDates: "All loaded dates",
      allLocations: "All locations",
      summarySepsis: "Total Sepsis patients",
      summaryAtb3h: "Sepsis patients receiving ATB within 3 hr",
      summarySevereAtb1h: "Severe sepsis or septic shock patients receiving ATB within 1 hr",
      caseUnit: "cases",
      noTimeData: "No time data yet",
      noCases: "No cases yet",
      noTrend: "No trend data yet",
      sourceTitle: "Source of infection",
      trendTitle: "Outcome Trend",
      qualityTitle: "Quality Indicators",
      riskTitle: "NEWS Risk Level",
      metricSepsisCount: "Patient count",
      metricSepsisCountLong: "Sepsis patients (cases)",
      range7: "7 days",
      range30: "30 days",
      range90: "3 months",
      range365: "12 months",
      dayMonth: "days",
      qualityHeaderIndicator: "Indicator",
      qualityHeaderTarget: "Target",
      qualityHeaderResult: "Result",
      qualityBloodCulture: "Hemoculture before every ATB dose",
      qualityAtb3h: "Sepsis patients receive ATB within 3 hours from ER arrival",
      qualitySevereAtb1h: "Severe sepsis or septic shock patients receive ATB within 1 hour from physician diagnosis",
      riskLow: "0-4 Low",
      riskWatch: "5-6 Watch",
      riskHigh: "7-12 High",
      sourceLabels: {
        respiratory: "Respiratory system",
        urinary: "Urinary tract infection",
        abdominal: "Intra-abdominal infection",
        skin: "Skin and soft tissue",
        unknown: "Unknown source",
        other: "Other"
      }
    },
    evaluation: {
      kicker: "Smart Sepsis App",
      title: "Satisfaction Assessment",
      subtitle: "Rate 1-5 for the Smart Sepsis App evaluation",
      section1: "Section 1 General information",
      section1Hint: "Select evaluator information before scoring",
      position: "Position",
      nurse: "Registered nurse",
      assistant: "Nursing assistant",
      other: "Other",
      experience: "Work experience",
      expUnder1: "Less than 1 year",
      exp1to5: "1-5 years",
      expOver5: "More than 5 years",
      section2: "Section 2 Satisfaction with work support",
      scoreHint: "1 = lowest, 5 = highest",
      section3: "Section 3 Suggestions",
      section3Hint: "Suggestions or encouragement for Team sepsis ER",
      suggestionPlaceholder: "Type additional suggestions",
      reset: "Clear form",
      submit: "Submit assessment",
      thankTitle: "Thank you for your assessment",
      thankText: "Your feedback will be used to improve the Smart Sepsis App.",
      ok: "OK"
    },
    home: {
      title: "Smart sepsis app",
      welcome: "Welcome",
      latest: "Latest patients assessed with sepsis protocol",
      viewAll: "View all",
      suspected: "Suspected sepsis patient",
      suspectedText: "Assess NEWS immediately to reduce risk and improve patient safety",
      start: "Start assessment",
      today: "Today",
      menuAssessment: "NEWS Assessment",
      menuDashboard: "Dashboard",
      menuDashboardSub: "Summary",
      menuSepsis: "Sepsis",
      menuSepsisSub: "Protocol",
      menuKnowledge: "Knowledge & Guidelines",
      menuKnowledgeSub: "Sepsis care",
      menuEvaluation: "Smart Sepsis App Evaluation"
    },
    knowledge: {
      title: "Sepsis Knowledge and Care Guidelines",
      downloadTitle: "Download additional documents"
    },
    sepsis: {
      backHome: "Back to home",
      age: "Age",
      sex: "Sex",
      screeningDate: "Screening date",
      fromNews: "Loaded from NEWS history",
      unclassified: "No level specified",
      triageUrgency: "Urgency level",
      save: "Save",
      notePlaceholder: "Add notes, such as antibiotics given, responsible staff, or response after fluid resuscitation",
      patient: {
        location: "Assessment Location",
        hnPlaceholder: "e.g. 123456789"
      },
      levels: {
        high: "High risk",
        watch: "Watch closely",
        medium: "Moderate",
        low: "Low"
      },
      protocol: {
        hour1: "1 hour",
        hour3: "3 hours",
        severe: "Severe sepsis / septic shock: within 1 hour",
        sepsis: "Sepsis: within 3 hours",
        doctorDiagnosis: "Physician diagnosis",
        screeningStart: "Screening start"
      },
      triage: {
        title: "Triage",
        subtitle: "Urgency level",
        resuscitation: "Critical urgency",
        emergency: "Emergency",
        urgency: "Urgent",
        semiUrgency: "Semi-urgent",
        nonUrgency: "Non-urgent"
      },
      consult: {
        title: "Physician diagnosis",
        toggleLabel: "Record physician diagnosis time",
        doneTitle: "Physician diagnosis time recorded",
        pendingTitle: "Waiting for physician diagnosis time"
      },
      type: {
        title: "Clinical Type",
        subtitle: "Select the patient's condition type",
        sepsisText: "Infection with organ dysfunction",
        severeText: "Severe infection with organ dysfunction and/or shock",
        helper: "The selected type guides the care target and treatment timeline."
      },
      infection: {
        title: "Source of Infection",
        subtitle: "Select the possible infection source",
        respiratory: "Respiratory system",
        urinary: "Urinary tract infection",
        abdominal: "Intra-abdominal infection",
        skin: "Skin and soft tissue",
        unknown: "Unknown source",
        other: "Other"
      },
      progress: {
        subtitle: "Track {count} key steps in real time within {target}",
        elapsed: "Elapsed time",
        elapsedHint: "Counted from screening start",
        remaining: "Time left",
        overTarget: "Over target",
        complete: "Complete",
        inProgress: "In progress",
        completion: "{done} of {total} items done",
        actions: "Action list",
        all: "All",
        pending: "Pending",
        done: "Done",
        minutes: "min",
        steps: "steps",
        items: "items"
      },
      actions: {
        consult: ["Notify physician", "Mark when physician has been notified"],
        1: ["Draw blood culture (Hemoculture)", "Collect specimen from the infection site"],
        2: ["Collect specimen from suspected source", "Collect additional specimens by infection source"],
        3: ["Retain foley's cath + Record urine output", "Insert urinary catheter and record urine output"],
        4: ["Check lactate", "Lactate result"],
        5: ["Give IV fluid", "Give 30 ml/kg within the first {target}"],
        6: ["Give antibiotic", "Within the first {target}{goldenHour}"],
        7: ["Reassess and monitor vital signs", "Monitor symptoms and reassess"]
      },
      disposition: {
        title: "Disposition",
        subtitle: "Select the continuing care plan",
        admitWard: "Admit to ward",
        admitIcu: "Admit to ICU",
        refer: "Refer to another hospital",
        discharge: "Discharge home"
      },
      currentCase: {
        title: "Active Case",
        subtitle: "Brief current case summary and full case list for handoff",
        chooseHistory: "Choose from history",
        viewAll: "View all cases",
        deleteCurrent: "Delete active case",
        emptyActive: "No active case is open",
        deleteCurrentMissing: "No active case is open",
        noSaved: "No saved cases yet",
        loading: "Loading cases from Google Sheet...",
        failed: "Could not load from Google Sheet. Showing local data.",
        activeSection: "Active cases",
        completedSection: "Latest 10 completed cases",
        activeEmpty: "No active cases",
        completedEmpty: "No completed cases yet",
        openCurrent: "Open now",
        open: "Open",
        delete: "Delete",
        statusComplete: "Complete",
        statusOver: "Over target",
        statusWorking: "In progress",
        noHn: "No HN specified",
        noTime: "No time specified",
        remaining: "{minutes} min left",
        over: "{minutes} min over",
        stepCount: "{done}/{total} steps",
        loaded: "Opened {title}",
        deleteConfirm: "Delete {title}?",
        deleteLast: "Deleted the latest case. Choose a NEWS history case to continue.",
        deleted: "Deleted {title}",
        chooseNewsOnly: "Choose a case from NEWS history only. For a new patient, save NEWS first."
      },
      timeline: {
        title: "Key Times",
        consult: "Physician diagnosis",
        bloodCulture: "Blood culture",
        lactate: "Lactate",
        fluid: "IV fluid",
        antibiotic: "Antibiotic",
        pending: "Pending",
        notSet: "Not set"
      },
      focus: {
        title: "Care Focus",
        subtitle: "Priorities for the care team this round",
        item1Title: "Monitor blood pressure and consciousness",
        item1Text: "High NEWS patient with septic shock risk",
        item2Title: "Prepare culture and lactate results",
        item2Text: "Use results to adjust treatment and antibiotics",
        item3Title: "Complete reassessment documentation",
        item3Text: "Support handoff and care-quality tracking"
      },
      modal: {
        title: "Sepsis Protocol Cases",
        subtitle: "Shows active cases and the latest 10 completed cases from Google Sheet",
        close: "Close"
      },
      statuses: {
        chooseHistoryFirst: "Please select or save NEWS in history before opening an active case",
        loadedFromAssessment: "Loaded data from the assessment",
        saveRequiresCase: "Please choose a NEWS history case before saving Sepsis Protocol",
        saveRequiresDiagnosisTime: "Please enter the physician diagnosis time before saving Sepsis Protocol",
        savePending: "Sepsis Protocol saved locally. Sending to Google Sheet...",
        saveSuccess: "Sepsis Protocol saved to the sepsis sheet",
        saveError: "Saved locally, but sending to the sepsis sheet failed",
        noteSaved: "Latest note saved automatically"
      },
      homeCases: {
        loading: "Loading cases from Google Sheet...",
        failed: "Could not load from Google Sheet. Showing local data.",
        empty: "No Sepsis Protocol cases yet"
      }
    }
  }
};

const I18N = {
  th: {
    htmlLang: "th",
    heroBadge: "PWA • Offline Ready • Responsive",
    heroSubtitleLine1: "NEWS",
    heroSubtitleLine2: "National Early Warning Score",
    installApp: "ติดตั้งแอป",
    resetAll: "รีเซ็ตทั้งหมด",
    assessmentSectionTitle: "ข้อมูลการประเมิน",
    assessmentSectionSubtitle: "กรอกข้อมูลพื้นฐานก่อนบันทึกคะแนน",
    assessmentTimeLabel: "วันประเมิน",
    locationLabel: "สถานที่ประเมิน",
    hnLabel: "เลขที่โรงพยาบาล (HN)",
    hnPlaceholder: "เช่น 123456789",
    genderLabel: "เพศ",
    genderPlaceholder: "เลือกเพศ",
    genderMale: "ชาย",
    genderFemale: "หญิง",
    ageLabel: "อายุ",
    agePlaceholder: "เช่น 45",
    metricSectionTitle: "ตัวชี้วัด NEWS",
    metricSectionSubtitle: "เลือกค่าที่ตรงกับการประเมินผู้ป่วย",
    metricSectionHint: "ระบบจะคำนวณคะแนนให้อัตโนมัติ",
    historySectionTitle: "ประวัติการบันทึก",
    historySectionSubtitle: "เก็บไว้ในเครื่อง และสามารถดึงจาก Google Sheet พร้อมค้นหาตามวันที่หรือ HN ได้",
    clearHistory: "ล้างข้อมูลในเครื่อง",
    historyHeadLocation: "สถานที่",
    historyHeadHn: "HN",
    historyHeadScore: "คะแนน",
    historyHeadLevel: "ระดับ",
    historyHeadTime: "เวลา",
    historyHeadAction: "จัดการ",
    historyFilterDateLabel: "เลือกวันที่",
    historyFilterHnLabel: "ค้นหา HN",
    historyFilterLocationLabel: "สถานที่",
    historyFilterLevelLabel: "ระดับ",
    historyFilterRedLabel: "RED Flag",
    historyFilterHnPlaceholder: "เช่น 123456789",
    historyRefresh: "รีเฟรช",
    historyResetFilters: "ล้างตัวกรอง",
    historyLoading: "กำลังโหลดประวัติจาก Google Sheet...",
    historySourceGoogle: "กำลังแสดงข้อมูลจาก Google Sheet",
    historySourceLocal: "แสดงข้อมูลจากเครื่อง เนื่องจากไม่สามารถโหลด Google Sheet ได้",
    historySourceEmpty: "ยังไม่พบข้อมูลตามเงื่อนไขที่เลือก",
    historyResultsCount: "พบ {count} รายการ",
    historyResultsCountZero: "ไม่พบรายการ",
    historyFilterAllOption: "ทั้งหมด",
    historyFilterRedOnly: "พบ RED",
    historyFilterRedNone: "ไม่พบ RED",
    adminLoginToggle: "Admin Login",
    adminLogout: "Logout",
    adminUsernameLabel: "Username",
    adminPasswordLabel: "Password",
    adminLoginBtn: "Login",
    adminDelete: "ลบ",
    adminDeleteConfirm: "ยืนยันลบประวัตินี้ใช่หรือไม่",
    adminDeleteSuccess: "ลบประวัติเรียบร้อย",
    adminLoginSuccess: "Admin login สำเร็จ",
    adminLoginFailed: "Username หรือ Password ไม่ถูกต้อง",
    adminRequired: "กรุณา login ก่อนลบข้อมูล",
    resultSectionTitle: "ผลการประเมิน",
    resultSectionSubtitle: "อัปเดตแบบเรียลไทม์",
    totalScoreLabel: "คะแนนรวม",
    urgencyLabelTitle: "ระดับ",
    redFlagTitle: "RED Flag",
    infectionAlertKicker: "Sepsis Alert",
    infectionAlertTitle: "สงสัยภาวะติดเชื้อ",
    infectionAlertText: "คะแนนรวมตั้งแต่ 5 คะแนนขึ้นไป และพบหรือสงสัยแหล่งติดเชื้อ ควรเฝ้าระวังและรายงานทีมดูแลทันที",
    saveBtn: "บันทึกคะแนน",
    resetBtn: "รีเซ็ต",
    adviceSectionTitle: "คำแนะนำการพยาบาล",
    metricTitles: {
      respiratoryRate: "อัตราการหายใจ (ครั้ง/นาที)",
      spo2: "ความอิ่มตัวของออกซิเจนในเลือด",
      oxygenSupport: "การใช้ออกซิเจนเสริม",
      temperature: "อุณหภูมิ",
      systolicBP: "ความดันโลหิตซิสโตลิก (มม.ปรอท)",
      heartRate: "อัตราการเต้นของหัวใจ (ครั้ง/นาที)",
      consciousness: "ระดับความรู้สึกตัว (AVPU)",
      infectionSource: "พบ หรือ สงสัยแหล่งติดเชื้อ (เช่น ระบบทางเดินหายใจ, การติดเชื้อทางเดินปัสสาวะ, การติดเชื้อในช่องท้อง, อื่นๆ)"
    },
    scaleLabels: {
      1: "เกณฑ์ทั่วไป",
      2: "เสี่ยงภาวะหายใจล้มเหลวจาก CO2 สูง (ตัวอย่าง โรคปอดอุดกั้นเรื้อรัง COPD)"
    },
    spo2ScaleDescriptions: {
      1: "เกณฑ์ทั่วไป",
      2: "เสี่ยงภาวะหายใจล้มเหลวจาก CO2 สูง (ตัวอย่าง โรคปอดอุดกั้นเรื้อรัง COPD)"
    },
    metrics: {
      respiratoryRate: [
        { label: "≤8", value: "3" },
        { label: "9-11", value: "1" },
        { label: "12-20", value: "0" },
        { label: "21-24", value: "2" },
        { label: "≥25", value: "3" }
      ],
      spo2: {
        1: [
          { label: "≤91%", value: "3" },
          { label: "92-93%", value: "2" },
          { label: "94-95%", value: "1" },
          { label: "≥96%", value: "0" }
        ],
        2: [
          { label: "≤83%", value: "3" },
          { label: "84-85%", value: "2" },
          { label: "86-87%", value: "1" },
          { label: "88-92% / ≥93% Air", value: "0" },
          { label: "93-94% O2", value: "1" },
          { label: "95-96% O2", value: "2" },
          { label: "≥97% O2", value: "3" }
        ]
      },
      oxygenSupport: [
        { label: "ไม่มี", value: "0" },
        { label: "มี", value: "2" }
      ],
      temperature: [
        { label: "<35°C", value: "3" },
        { label: "35.1-36°C", value: "1" },
        { label: "36.1-38°C", value: "0" },
        { label: "38.1-39°C", value: "1" },
        { label: ">39.1°C", value: "2" }
      ],
      systolicBP: [
        { label: "≤90", value: "3" },
        { label: "91-100", value: "2" },
        { label: "101-110", value: "1" },
        { label: "111-219", value: "0" },
        { label: "≥220", value: "3" }
      ],
      heartRate: [
        { label: "≤40", value: "3" },
        { label: "41-50", value: "1" },
        { label: "51-90", value: "0" },
        { label: "91-110", value: "1" },
        { label: "111-130", value: "2" },
        { label: "≥131", value: "3" }
      ],
      consciousness: [
        { label: "รู้สึกตัวดี (A)", value: "0" },
        { label: "ตอบสนองต่อเสียง/ความเจ็บปวด/ไม่ตอบสนอง (V, P, U)", value: "3" }
      ],
      infectionSource: [
        { label: "No", value: "No" },
        { label: "Yes", value: "Yes" }
      ]
    },
    levelLabels: {
      Normal: "Non-urgent",
      Low: "Semi-urgent",
      Urgent: "Urgent",
      Emergent: "Emergency"
    },
    scoreStateReady: "พร้อมประเมิน",
    scoreStateInProgress: "กำลังประเมิน",
    scoreStateWatch: "ติดตามใกล้ชิด",
    redFound: "พบ RED",
    redNotFound: "ไม่พบ",
    advice: {
      Normal: {
        title: "0-2 คะแนน: Non-urgent",
        items: [
          "Non-urgent / ไม่ฉุกเฉิน",
          "ประเมินอาการและอาการแสดงของผู้ป่วย",
          "อธิบายขั้นตอนการรับบริการ"
        ]
      },
      Low: {
        title: "3-4 คะแนน: Semi-urgent",
        items: [
          "Semi-urgent / เจ็บป่วยกึ่งฉุกเฉิน",
          "ประเมินอาการและอาการแสดงของผู้ป่วย",
          "รายงานพยาบาลเพื่อประเมินอาการซ้ำ",
          "ระหว่างรอตรวจ เฝ้าระวังสัญญาณชีพและอาการเปลี่ยนแปลง"
        ]
      },
      Urgent: {
        title: "5-6 คะแนน: Urgent",
        items: [
          "Urgent / เจ็บป่วยฉุกเฉินระดับปานกลาง",
          "ประเมินอาการและอาการแสดงของผู้ป่วย",
          "รายงานพยาบาลเพื่อประเมินอาการซ้ำ",
          "กรณีผู้ป่วยอยู่ OPD ให้พิจารณาส่งต่อ ER",
          "เมื่อถึง ER ให้ประเมินสัญญาณชีพและอาการซ้ำ เพื่อรายงานแพทย์หรือหัวหน้าพยาบาลเวร (Incharge)",
          "กรณีผู้ป่วยอยู่ IPD หรือ ICU ให้รายงานแพทย์หรือหัวหน้าพยาบาลเวรทันที"
        ]
      },
      Emergent: {
        title: "มากกว่า 7 คะแนน: Emergency",
        items: [
          "ฉุกเฉิน / มีความเสี่ยงสูง",
          "รายงานพยาบาลและแพทย์ทันที",
          "พิจารณาส่งต่อ ER",
          "ให้การพยาบาลเบื้องต้น เช่น ให้ออกซิเจน",
          "ติดตามอาการอย่างใกล้ชิด",
          "หากผู้ป่วยอยู่ IPD หรือ ICU ให้รายงานแพทย์หรือหัวหน้าพยาบาลเวรทันที"
        ]
      },
      redTitle: "Red Score",
      redItems: [
        "กรณีพบคะแนนข้อใดข้อหนึ่ง = +3 เปลี่ยน Triage เป็น Urgency",
        "รายงานพยาบาลและแพทย์ทันที",
        "พิจารณาส่งต่อ ER",
        "ให้การพยาบาลเบื้องต้น เช่น ให้ออกซิเจน",
        "ติดตามอาการอย่างใกล้ชิด",
        "หากผู้ป่วยอยู่ IPD หรือ ICU ให้รายงานแพทย์หรือหัวหน้าพยาบาลเวรทันที"
      ]
    },
    noHistory: "ยังไม่มีประวัติการบันทึก",
    statuses: {
      assessmentTimeRequired: "กรุณาเลือกวันประเมินก่อนบันทึก",
      locationRequired: "กรุณาเลือกสถานที่ประเมินก่อนบันทึก",
      hnRequired: "กรุณากรอกเลขที่โรงพยาบาลเป็นตัวเลข 9 หลัก",
      savePending: "บันทึกลงเครื่องสำเร็จ กำลังส่งข้อมูลไป Google Sheet...",
      saveSuccess: "บันทึกลงเครื่องและส่งไป Google Sheet สำเร็จ",
      saveError: "บันทึกลงเครื่องสำเร็จ แต่ส่งไป Google Sheet ไม่สำเร็จ",
      resetSuccess: "รีเซ็ตข้อมูลเรียบร้อย",
      clearHistorySuccess: "ล้างข้อมูลในเครื่องเรียบร้อย",
      historyLoaded: "โหลดประวัติลงในฟอร์มเรียบร้อย และล็อกค่าไว้แล้ว กดรีเซ็ตหากต้องการกรอกใหม่",
      adminDeleteError: "ลบประวัติไม่สำเร็จ",
      adminSessionExpired: "Session หมดอายุ กรุณา login ใหม่"
    }
  },
  en: {
    htmlLang: "en",
    heroBadge: "PWA • Offline Ready • Responsive",
    heroSubtitleLine1: "NEWS",
    heroSubtitleLine2: "National Early Warning Score",
    installApp: "Install App",
    resetAll: "Reset All",
    assessmentSectionTitle: "Assessment Details",
    assessmentSectionSubtitle: "Enter basic information before saving the score",
    assessmentTimeLabel: "Assessment Date/Time",
    locationLabel: "Assessment Location",
    hnLabel: "Hospital Number (HN)",
    hnPlaceholder: "e.g. 123456789",
    genderLabel: "Sex",
    genderPlaceholder: "Select sex",
    genderMale: "Male",
    genderFemale: "Female",
    ageLabel: "Age",
    agePlaceholder: "e.g. 45",
    metricSectionTitle: "NEWS Metrics",
    metricSectionSubtitle: "Choose values that match the patient assessment",
    metricSectionHint: "Scores are calculated automatically",
    historySectionTitle: "Saved History",
    historySectionSubtitle: "Stored on this device and can also be loaded from Google Sheet with date or HN filters",
    clearHistory: "Clear Local Cache",
    historyHeadLocation: "Location",
    historyHeadHn: "HN",
    historyHeadScore: "Score",
    historyHeadLevel: "Level",
    historyHeadTime: "Time",
    historyHeadAction: "Action",
    historyFilterDateLabel: "Select Date",
    historyFilterHnLabel: "Search HN",
    historyFilterLocationLabel: "Location",
    historyFilterLevelLabel: "Level",
    historyFilterRedLabel: "RED Flag",
    historyFilterHnPlaceholder: "e.g. 123456789",
    historyRefresh: "Refresh",
    historyResetFilters: "Reset Filters",
    historyLoading: "Loading history from Google Sheet...",
    historySourceGoogle: "Showing data from Google Sheet",
    historySourceLocal: "Showing local data because Google Sheet could not be loaded",
    historySourceEmpty: "No records matched the selected filters",
    historyResultsCount: "{count} records found",
    historyResultsCountZero: "No matching records",
    historyFilterAllOption: "All",
    historyFilterRedOnly: "RED Found",
    historyFilterRedNone: "No RED",
    adminLoginToggle: "Admin Login",
    adminLogout: "Logout",
    adminUsernameLabel: "Username",
    adminPasswordLabel: "Password",
    adminLoginBtn: "Login",
    adminDelete: "Delete",
    adminDeleteConfirm: "Delete this history record?",
    adminDeleteSuccess: "History record deleted successfully",
    adminLoginSuccess: "Admin login successful",
    adminLoginFailed: "Invalid username or password",
    adminRequired: "Please login before deleting records",
    resultSectionTitle: "Assessment Result",
    resultSectionSubtitle: "Updated in real time",
    totalScoreLabel: "Total Score",
    urgencyLabelTitle: "Level",
    redFlagTitle: "RED Flag",
    infectionAlertKicker: "Sepsis Alert",
    infectionAlertTitle: "Suspected Infection",
    infectionAlertText: "A total score of 5 or more with a found or suspected source of infection should prompt close monitoring and immediate team notification.",
    saveBtn: "Save Score",
    resetBtn: "Reset",
    adviceSectionTitle: "Nursing Advice",
    metricTitles: {
      respiratoryRate: "Respiratory Rate (breaths/min)",
      spo2: "Oxygen Saturation in Blood",
      oxygenSupport: "Supplemental Oxygen",
      temperature: "Temperature",
      systolicBP: "Systolic Blood Pressure (mmHg)",
      heartRate: "Heart Rate (beats/min)",
      consciousness: "Consciousness Level (AVPU)",
      infectionSource: "Found or suspected source of infection (ex. Respiratory system, urinary tract infection, intra-abdominal infection, others)"
    },
    scaleLabels: {
      1: "General Criteria",
      2: "Risk of CO2 Retention (example: Chronic Obstructive Pulmonary Disease, COPD)"
    },
    spo2ScaleDescriptions: {
      1: "General Criteria",
      2: "Risk of respiratory failure from high CO2 (example: Chronic Obstructive Pulmonary Disease, COPD)"
    },
    metrics: {
      respiratoryRate: [
        { label: "≤8", value: "3" },
        { label: "9-11", value: "1" },
        { label: "12-20", value: "0" },
        { label: "21-24", value: "2" },
        { label: "≥25", value: "3" }
      ],
      spo2: {
        1: [
          { label: "≤91%", value: "3" },
          { label: "92-93%", value: "2" },
          { label: "94-95%", value: "1" },
          { label: "≥96%", value: "0" }
        ],
        2: [
          { label: "≤83%", value: "3" },
          { label: "84-85%", value: "2" },
          { label: "86-87%", value: "1" },
          { label: "88-92% / ≥93% Air", value: "0" },
          { label: "93-94% O2", value: "1" },
          { label: "95-96% O2", value: "2" },
          { label: "≥97% O2", value: "3" }
        ]
      },
      oxygenSupport: [
        { label: "No", value: "0" },
        { label: "Yes", value: "2" }
      ],
      temperature: [
        { label: "<35°C", value: "3" },
        { label: "35.1-36°C", value: "1" },
        { label: "36.1-38°C", value: "0" },
        { label: "38.1-39°C", value: "1" },
        { label: ">39.1°C", value: "2" }
      ],
      systolicBP: [
        { label: "≤90", value: "3" },
        { label: "91-100", value: "2" },
        { label: "101-110", value: "1" },
        { label: "111-219", value: "0" },
        { label: "≥220", value: "3" }
      ],
      heartRate: [
        { label: "≤40", value: "3" },
        { label: "41-50", value: "1" },
        { label: "51-90", value: "0" },
        { label: "91-110", value: "1" },
        { label: "111-130", value: "2" },
        { label: "≥131", value: "3" }
      ],
      consciousness: [
        { label: "Alert (A)", value: "0" },
        { label: "Responds to Voice/Pain/Unresponsive (V, P, U)", value: "3" }
      ],
      infectionSource: [
        { label: "No", value: "0" },
        { label: "Yes", value: "2" }
      ]
    },
    levelLabels: {
      Normal: "Non-urgent",
      Low: "Semi-urgent",
      Urgent: "Urgent",
      Emergent: "Emergency"
    },
    scoreStateReady: "Ready",
    scoreStateInProgress: "Assessing",
    scoreStateWatch: "Close Monitoring",
    redFound: "RED Detected",
    redNotFound: "Not Found",
    advice: {
      Normal: {
        title: "0-2 points: Non-urgent",
        items: [
          "Not urgent / non-emergency",
          "Assess the patient's symptoms and clinical signs",
          "Explain the care process and service steps"
        ]
      },
      Low: {
        title: "3-4 points: Semi-urgent",
        items: [
          "Mild urgency / semi-emergency condition",
          "Assess the patient's symptoms and clinical signs",
          "Report to the nurse for reassessment",
          "While waiting, monitor vital signs and any change in symptoms"
        ]
      },
      Urgent: {
        title: "Urgent (5-6 points)",
        items: [
          "Urgent / moderate emergency condition",
          "Assess the patient's symptoms and clinical signs",
          "Report to the nurse for reassessment",
          "If the patient is in OPD, consider transfer to ER",
          "On arrival at ER, reassess vital signs and symptoms and report to the physician or nurse in charge",
          "If the patient is in IPD or ICU, report to the physician or nurse in charge immediately"
        ]
      },
      Emergent: {
        title: "More than 7 points: Emergency",
        items: [
          "Emergency / high-risk condition",
          "Notify the nurse and physician immediately",
          "Consider transfer to ER",
          "Provide initial nursing care such as oxygen support",
          "Monitor the patient closely",
          "If the patient is in IPD or ICU, report to the physician or nurse in charge immediately"
        ]
      },
      redTitle: "Red Score",
      redItems: [
        "When any single item scores +3, change triage to Urgency",
        "Notify the nurse and physician immediately",
        "Consider transfer to ER",
        "Provide initial nursing care such as oxygen support",
        "Monitor the patient closely",
        "If the patient is in IPD or ICU, report to the physician or nurse in charge immediately"
      ]
    },
    noHistory: "No saved records yet",
    statuses: {
      assessmentTimeRequired: "Please select the assessment date/time before saving",
      locationRequired: "Please select the assessment location before saving",
      hnRequired: "Please enter a 9-digit hospital number",
      savePending: "Saved locally. Sending data to Google Sheet...",
      saveSuccess: "Saved locally and sent to Google Sheet successfully",
      saveError: "Saved locally, but sending to Google Sheet failed",
      resetSuccess: "Form reset successfully",
      clearHistorySuccess: "Local cache cleared successfully",
      historyLoaded: "History record loaded into the form and locked. Press reset to enter new values",
      adminDeleteError: "Failed to delete history record",
      adminSessionExpired: "Session expired. Please login again"
    }
  }
};

const selectors = {
  respiratoryRate: document.getElementById("respiratoryRate"),
  spo2: document.getElementById("spo2"),
  oxygenSupport: document.getElementById("oxygenSupport"),
  temperature: document.getElementById("temperature"),
  systolicBP: document.getElementById("systolicBP"),
  heartRate: document.getElementById("heartRate"),
  consciousness: document.getElementById("consciousness"),
  infectionSource: document.getElementById("infectionSource"),
  location: document.getElementById("location"),
  hn: document.getElementById("hn"),
  gender: document.getElementById("gender"),
  age: document.getElementById("age"),
  assessmentTime: document.getElementById("assessmentTime"),
  totalScore: document.getElementById("totalScore"),
  urgencyLabel: document.getElementById("urgencyLabel"),
  redFlag: document.getElementById("redFlag"),
  infectionAlertCard: document.getElementById("infectionAlertCard"),
  infectionAlertKicker: document.getElementById("infectionAlertKicker"),
  infectionAlertTitle: document.getElementById("infectionAlertTitle"),
  infectionAlertText: document.getElementById("infectionAlertText"),
  saveBtn: document.getElementById("saveBtn"),
  resetBtn: document.getElementById("resetBtn"),
  resetBtnTop: document.getElementById("resetBtnTop"),
  saveStatus: document.getElementById("saveStatus"),
  adviceBox: document.getElementById("adviceBox"),
  historyTable: document.getElementById("historyTable"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
  toggleAdminLoginBtn: document.getElementById("toggleAdminLoginBtn"),
  adminLogoutBtn: document.getElementById("adminLogoutBtn"),
  adminLoginPanel: document.getElementById("adminLoginPanel"),
  adminUsername: document.getElementById("adminUsername"),
  adminPassword: document.getElementById("adminPassword"),
  adminLoginBtn: document.getElementById("adminLoginBtn"),
  adminStatus: document.getElementById("adminStatus"),
  refreshHistoryBtn: document.getElementById("refreshHistoryBtn"),
  resetHistoryFiltersBtn: document.getElementById("resetHistoryFiltersBtn"),
  historyFilterDate: document.getElementById("historyFilterDate"),
  historyFilterHn: document.getElementById("historyFilterHn"),
  historyFilterLocation: document.getElementById("historyFilterLocation"),
  historyFilterLevel: document.getElementById("historyFilterLevel"),
  historyFilterRed: document.getElementById("historyFilterRed"),
  historyResultCount: document.getElementById("historyResultCount"),
  historySourceNote: document.getElementById("historySourceNote"),
  installBtn: document.getElementById("installBtn"),
  scoreStateTag: document.getElementById("scoreStateTag"),
  langThBtn: document.getElementById("langThBtn"),
  langEnBtn: document.getElementById("langEnBtn"),
  languageButtons: Array.from(document.querySelectorAll("[data-language]")),
  assessmentCard: document.getElementById("assessmentCard"),
  resultPanel: document.getElementById("resultPanel"),
  stickyPanel: document.querySelector(".sticky-panel"),
  sepsisStickyPanel: document.querySelector("#sepsisView .sepsis-sticky-panel"),
  metricProgressLabel: document.getElementById("metricProgressLabel"),
  metricProgressText: document.getElementById("metricProgressText"),
  metricProgressFill: document.getElementById("metricProgressFill"),
  mobileSaveBar: document.getElementById("mobileSaveBar"),
  mobileSaveHint: document.getElementById("mobileSaveHint"),
  mobileProgressText: document.getElementById("mobileProgressText"),
  mobileScore: document.getElementById("mobileScore"),
  mobileSaveBtn: document.getElementById("mobileSaveBtn"),
  mobileResetBtn: document.getElementById("mobileResetBtn"),
  locationGroup: document.querySelector(".location-button-grid"),
  desktopAppTopbar: document.getElementById("desktopAppTopbar"),
  homeView: document.getElementById("homeView"),
  assessmentView: document.getElementById("assessmentView"),
  historyView: document.getElementById("historyView"),
  dashboardView: document.getElementById("dashboardView"),
  dashboardDateFilter: document.getElementById("dashboardDateFilter"),
  dashboardLocationFilter: document.getElementById("dashboardLocationFilter"),
  dashboardRefreshBtn: document.getElementById("dashboardRefreshBtn"),
  dashboardStatus: document.getElementById("dashboardStatus"),
  dashboardRangeButtons: Array.from(document.querySelectorAll("[data-dashboard-range]")),
  dashboardMetricButtons: Array.from(document.querySelectorAll("[data-dashboard-metric]")),
  sepsisView: document.getElementById("sepsisView"),
  smartEvaluationView: document.getElementById("smartEvaluationView"),
  smartEvaluationForm: document.getElementById("smartEvaluationForm"),
  smartEvaluationQuestions: document.getElementById("smartEvaluationQuestions"),
  smartEvaluationAnswered: document.getElementById("smartEvaluationAnswered"),
  smartEvaluationStatus: document.getElementById("smartEvaluationStatus"),
  smartEvaluationResetBtn: document.getElementById("smartEvaluationResetBtn"),
  knowledgeView: document.getElementById("knowledgeView"),
  sheetLoadingOverlay: document.getElementById("sheetLoadingOverlay"),
  sheetLoadingTitle: document.getElementById("sheetLoadingTitle"),
  sheetLoadingText: document.getElementById("sheetLoadingText"),
  knowledgeImageModal: document.getElementById("knowledgeImageModal"),
  knowledgeImageModalLabel: document.getElementById("knowledgeImageModalLabel"),
  knowledgeModalViewport: document.getElementById("knowledgeModalViewport"),
  knowledgeModalImage: document.getElementById("knowledgeModalImage"),
  knowledgeZoomInBtn: document.getElementById("knowledgeZoomInBtn"),
  knowledgeZoomOutBtn: document.getElementById("knowledgeZoomOutBtn"),
  knowledgeZoomResetBtn: document.getElementById("knowledgeZoomResetBtn"),
  knowledgeDownloadImageLink: document.getElementById("knowledgeDownloadImageLink"),
  knowledgeCards: Array.from(document.querySelectorAll("[data-knowledge-image]")),
  prototypeBoard: document.getElementById("prototype-board"),
  appNavItems: Array.from(document.querySelectorAll("[data-app-view]")),
  navViewButtons: Array.from(document.querySelectorAll("[data-nav-view]")),
  prototypeGroups: Array.from(document.querySelectorAll("[data-prototype-group]")),
  desktopViewTitle: document.getElementById("desktopViewTitle"),
  desktopViewSubtitle: document.getElementById("desktopViewSubtitle")
};

let deferredPrompt = null;
let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || "th";
let validationActive = false;
let smartEvaluationValidationActive = false;
let historyFilterTimer = null;
let currentEditingRecord = null;
let historyFormLocked = false;
let adminAuth = readAdminAuth();
let currentAppView = "home";
let knowledgeImageZoom = 1;
const historyState = {
  remoteItems: [],
  displayedItems: [],
  remoteLoaded: false,
  remoteFailed: false,
  loading: false
};
const dashboardState = {
  sepsisItems: [],
  sepsisRemoteLoaded: false,
  sepsisRemoteFailed: false,
  loading: false,
  rangeDays: 365,
  metric: "sepsisCount",
  chartZoom: 1
};
let dashboardTrendHighchart = null;
let sepsisFilterMode = "all";
let sepsisTimer = null;
let sepsisStore = { activeCaseId: "", cases: [] };
let sepsisState = createDefaultSepsisState();
let sepsisHnLookupToken = 0;
let sepsisHnSearchDraft = null;
let sepsisNewsRequiredHn = "";
let sepsisCaseListLoading = false;
let sepsisCaseListLoadFailed = false;
let sepsisSheetSyncTimer = null;

function t() {
  return I18N[currentLanguage] || I18N.th;
}

function pageText() {
  return PAGE_TEXT[currentLanguage] || PAGE_TEXT.th;
}

function sepsisCopy() {
  return pageText().sepsis || PAGE_TEXT.th.sepsis;
}

function formatTemplate(text, values = {}) {
  return String(text || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function getSepsisActionCopy(step) {
  const actions = sepsisCopy().actions || PAGE_TEXT.th.sepsis.actions;
  return actions[step] || actions[String(step)] || ["", ""];
}

function getSepsisActionLabel(step) {
  return getSepsisActionCopy(step)[0] || "";
}

function getSepsisDisplaySex(value = "") {
  const normalized = getSepsisSexValueFromHistory(value);
  if (normalized === "ชาย") return currentLanguage === "en" ? "Male" : "ชาย";
  if (normalized === "หญิง") return currentLanguage === "en" ? "Female" : "หญิง";
  return value || "";
}

function smartEvaluationQuestions() {
  return currentLanguage === "en" ? SMART_EVALUATION_QUESTIONS_EN : SMART_EVALUATION_QUESTIONS;
}

function ensureInfectionSourceConfig() {
  Object.values(I18N).forEach(copy => {
    copy.metricTitles = copy.metricTitles || {};
    copy.metrics = copy.metrics || {};

    if (!copy.metricTitles.infectionSource) {
      copy.metricTitles.infectionSource = copy.htmlLang === "th"
        ? "พบ หรือ สงสัยแหล่งติดเชื้อ"
        : "Found or suspected source of infection";
    }

    if (!Array.isArray(copy.metrics.infectionSource)) {
      copy.metrics.infectionSource = [
        { label: "No", value: "No" },
        { label: "Yes", value: "Yes" }
      ];
    }
  });
}

ensureInfectionSourceConfig();

function createDefaultSepsisState() {
  return {
    caseId: "",
    historyRecordKey: "",
    createdAt: "",
    updatedAt: "",
    patientName: "ผู้ป่วย Sepsis Protocol",
    patientHn: "",
    patientAge: "",
    patientSex: "",
    assessmentLocation: "",
    triage: "",
    consultDone: false,
    consultTime: "",
    infectionSource: "",
    disposition: "",
    lactateValue: "",
    startDateTime: "",
    newsScore: 0,
    newsLevel: "",
    type: "sepsis",
    note: "",
    tasks: {
      1: { done: false, time: "" },
      2: { done: false, time: "" },
      3: { done: false, time: "" },
      4: { done: false, time: "" },
      5: { done: false, time: "" },
      6: { done: false, time: "" },
      7: { done: false, time: "" }
    }
  };
}

function hashSepsisCaseKey(value = "") {
  let hash = 0;
  const text = String(value);
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash) + text.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function getHistoryRecordKey(item = {}) {
  const hn = sanitizeHN(item.hn || item.patientHn || "");
  const assessmentTime = item.assessmentTime || item.startDateTime || "";
  const savedAt = item.savedAt || item.createdAt || "";
  if (!hn || (!assessmentTime && !savedAt)) return "";
  return `${hn}|${assessmentTime}|${savedAt}`;
}

function getSepsisCaseIdFromHistory(item = {}) {
  const key = getHistoryRecordKey(item);
  return key ? `sepsis-history-${hashSepsisCaseKey(key)}` : "";
}

function normalizeSepsisProtocolType(value = "") {
  const normalized = String(value || "").trim().toLowerCase().replace(/[_-]+/g, " ");
  if (["septic shock", "shock", "severe", "severe sepsis", "severe sepsis septic shock", "severe sepsis/shock"].includes(normalized)) {
    return "severe";
  }
  return "sepsis";
}

function normalizeSepsisDisposition(value = "") {
  const text = String(value || "").trim();
  if (text === "Admit (Ward/ICU)" || text.toLowerCase() === "admit") return "Admit Ward";
  return text;
}

function getSepsisSheetProtocolType(type = "sepsis") {
  return normalizeSepsisProtocolType(type) === "severe" ? "septic shock" : "sepsis";
}

function normalizeSepsisCase(input = {}) {
  const base = createDefaultSepsisState();
  const historyRecordKey = input.historyRecordKey || getHistoryRecordKey(input);
  const inputTasks = input.tasks || {};
  const tasks = Object.keys(base.tasks).reduce((record, step) => {
    const stepNumber = Number(step);
    const task = inputTasks[step] || {};
    const sharedSourceStep = SEPSIS_SHARED_TIME_STEPS.get(stepNumber);
    const sharedSourceTask = sharedSourceStep ? inputTasks[sharedSourceStep] || {} : {};
    const rawTime = sharedSourceStep ? sharedSourceTask.time || task.time || "" : task.time || "";
    const time = SEPSIS_CHECK_ONLY_STEPS.has(stepNumber) ? "" : normalizeClockTime(rawTime);
    record[step] = {
      ...base.tasks[step],
      ...task,
      time,
      done: Boolean(task.done || (!sharedSourceStep && time))
    };
    return record;
  }, {});
  return {
    ...base,
    ...input,
    type: normalizeSepsisProtocolType(input.type || input.protocolType || base.type),
    disposition: normalizeSepsisDisposition(input.disposition || base.disposition),
    consultDone: parseSheetBoolean(input.consultDone),
    consultTime: normalizeClockTime(input.consultTime || ""),
    historyRecordKey,
    caseId: input.caseId || (historyRecordKey ? `sepsis-history-${hashSepsisCaseKey(historyRecordKey)}` : ""),
    createdAt: input.createdAt || new Date().toISOString(),
    updatedAt: input.updatedAt || input.createdAt || new Date().toISOString(),
    tasks
  };
}

function readSepsisStore() {
  try {
    const raw = localStorage.getItem(SEPSIS_PROTOCOL_KEY);
    if (!raw) return { activeCaseId: "", cases: [] };
    const parsed = JSON.parse(raw);

    if (Array.isArray(parsed?.cases)) {
      const normalizedCases = parsed.cases.map(normalizeSepsisCase).filter(item => item.historyRecordKey);
      if (normalizedCases.length > 0) {
        return { activeCaseId: "", cases: normalizedCases };
      }
    }

    const legacyCase = normalizeSepsisCase(parsed || {});
    return legacyCase.historyRecordKey ? { activeCaseId: "", cases: [legacyCase] } : { activeCaseId: "", cases: [] };
  } catch {
    return { activeCaseId: "", cases: [] };
  }
}

function getActiveSepsisCase() {
  return sepsisStore.cases.find(item => item.caseId === sepsisStore.activeCaseId) || null;
}

function persistSepsisState() {
  if (!sepsisState.caseId || !sepsisState.historyRecordKey) {
    renderSepsisCaseList();
    renderSepsisCurrentCaseSummary();
    return false;
  }

  const caseIndex = sepsisStore.cases.findIndex(item => item.caseId === sepsisState.caseId);
  if (caseIndex < 0) {
    renderSepsisCaseList();
    renderSepsisCurrentCaseSummary();
    return false;
  }

  sepsisState.updatedAt = new Date().toISOString();

  sepsisStore.cases[caseIndex] = normalizeSepsisCase(sepsisState);
  sepsisStore.activeCaseId = sepsisState.caseId;
  sepsisStore.cases.sort((a, b) => getSepsisCaseSortTime(b) - getSepsisCaseSortTime(a));
  localStorage.setItem(SEPSIS_PROTOCOL_KEY, JSON.stringify(sepsisStore));
  renderSepsisCaseList();
  renderHomeSepsisCases(sepsisStore.cases);
  scheduleSepsisSheetSync(sepsisState);
  return true;
}

function scheduleSepsisSheetSync(sepsis = sepsisState, delay = 700) {
  const normalized = normalizeSepsisCase(sepsis || {});
  if (!normalized.caseId || !normalized.historyRecordKey) return;

  window.clearTimeout(sepsisSheetSyncTimer);
  sepsisSheetSyncTimer = window.setTimeout(() => {
    syncSepsisCaseToSheet(normalized);
  }, delay);
}

async function syncSepsisCaseToSheet(sepsis = sepsisState) {
  const normalized = normalizeSepsisCase(sepsis || {});
  if (!normalized.caseId || !normalized.historyRecordKey) return false;

  try {
    await saveToGoogleSheet(createSepsisSheetPayload(normalized));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function deleteSepsisCaseFromSheet(sepsis = {}) {
  const normalized = normalizeSepsisCase(sepsis || {});
  if (!normalized.caseId && !normalized.historyRecordKey) return false;

  try {
    await saveToGoogleSheet({
      sheetName: "sepsis",
      recordType: "sepsisProtocol",
      mode: "delete",
      caseId: normalized.caseId || "",
      historyRecordKey: normalized.historyRecordKey || ""
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function getNowDateTimeLocalValue() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
}

function normalizeClockTime(value) {
  if (!value) return "";
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "";
    return `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
  }

  const text = String(value || "").trim();
  if (!text) return "";

  const parsed = Date.parse(text);
  if (!Number.isNaN(parsed) && /\d{4}-\d{1,2}-\d{1,2}|T\d{1,2}:\d{2}/.test(text)) {
    const date = new Date(parsed);
    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  const timeMatch = text
    .replace(/[น.]/g, "")
    .match(/(\d{1,2})\s*[:.]\s*(\d{2})(?:\s*[:.]\s*\d{2})?\s*(AM|PM)?/i);
  if (!timeMatch) return text;

  let hours = Number.parseInt(timeMatch[1], 10);
  const minutes = Number.parseInt(timeMatch[2], 10);
  const meridiem = (timeMatch[3] || "").toUpperCase();
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return text;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return "";

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function formatClockTimeDraft(value) {
  const text = String(value || "");

  if (/[:.]/.test(text)) {
    const [rawHours = "", rawMinutes = ""] = text.split(/[:.]/);
    let hourDigits = rawHours.replace(/\D/g, "").slice(0, 2);
    let minuteDigits = rawMinutes.replace(/\D/g, "").slice(0, 2);

    if (hourDigits.length === 2 && Number.parseInt(hourDigits, 10) > 23) {
      hourDigits = hourDigits.slice(0, 1);
    }

    if (minuteDigits.length === 2 && Number.parseInt(minuteDigits, 10) > 59) {
      minuteDigits = minuteDigits.slice(0, 1);
    }

    const displayHours = hourDigits.length === 1 ? hourDigits.padStart(2, "0") : hourDigits;
    return `${displayHours}:${minuteDigits}`;
  }

  let digits = text.replace(/\D/g, "").slice(0, 4);

  if (digits.length >= 2) {
    const hours = Number.parseInt(digits.slice(0, 2), 10);
    if (hours > 23) digits = digits.slice(0, 1);
  }

  if (digits.length >= 4) {
    const minutes = Number.parseInt(digits.slice(2, 4), 10);
    if (minutes > 59) digits = digits.slice(0, 3);
  }

  return digits.length > 2 ? `${digits.slice(0, 2)}:${digits.slice(2)}` : digits;
}

function isCompleteClockTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value || "").trim());
}

function completeClockTimeDraft(value) {
  const text = String(value || "").trim();

  if (/[:.]/.test(text)) {
    const [rawHours = "", rawMinutes = ""] = text.split(/[:.]/);
    const hourDigits = rawHours.replace(/\D/g, "");
    const minuteDigits = rawMinutes.replace(/\D/g, "");
    if (!hourDigits || !minuteDigits || hourDigits.length > 2 || minuteDigits.length > 2) return "";

    const hours = Number.parseInt(hourDigits, 10);
    const minutes = Number.parseInt(minuteDigits, 10);
    if (Number.isNaN(hours) || Number.isNaN(minutes) || hours > 23 || minutes > 59) return "";

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const digits = text.replace(/\D/g, "");
  if (digits.length === 3) {
    const hours = Number.parseInt(digits.slice(0, 1), 10);
    const minutes = Number.parseInt(digits.slice(1), 10);
    if (Number.isNaN(hours) || Number.isNaN(minutes) || minutes > 59) return "";
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  if (digits.length === 4) {
    const hours = Number.parseInt(digits.slice(0, 2), 10);
    const minutes = Number.parseInt(digits.slice(2), 10);
    if (Number.isNaN(hours) || Number.isNaN(minutes) || hours > 23 || minutes > 59) return "";
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  return "";
}

function formatTimeDisplay(value) {
  return normalizeClockTime(value) || "-";
}

function parseFlexibleDateTime(value) {
  if (!value) return 0;
  if (value instanceof Date) {
    const time = value.getTime();
    return Number.isNaN(time) ? 0 : time;
  }

  const text = String(value || "").trim();
  if (!text) return 0;

  const direct = Date.parse(text);
  if (!Number.isNaN(direct)) return direct;

  const monthMap = {
    "มค": 0, "มกราคม": 0,
    "กพ": 1, "กุมภาพันธ์": 1,
    "มีค": 2, "มีนาคม": 2,
    "เมย": 3, "เมษายน": 3,
    "พค": 4, "พฤษภาคม": 4,
    "มิย": 5, "มิถุนายน": 5,
    "กค": 6, "กรกฎาคม": 6,
    "สค": 7, "สิงหาคม": 7,
    "กย": 8, "กันยายน": 8,
    "ตค": 9, "ตุลาคม": 9,
    "พย": 10, "พฤศจิกายน": 10,
    "ธค": 11, "ธันวาคม": 11
  };
  const thaiDateMatch = text.match(/(\d{1,2})\s+([^\s\d]+)\s+(\d{4})(?:\s+(\d{1,2})[:.](\d{2}))?/);
  if (!thaiDateMatch) return 0;

  const day = Number.parseInt(thaiDateMatch[1], 10);
  const monthKey = thaiDateMatch[2].replace(/\./g, "").trim();
  const month = monthMap[monthKey];
  let year = Number.parseInt(thaiDateMatch[3], 10);
  const hours = Number.parseInt(thaiDateMatch[4] || "0", 10);
  const minutes = Number.parseInt(thaiDateMatch[5] || "0", 10);
  if (year > 2400) year -= 543;
  if (month === undefined || Number.isNaN(day) || Number.isNaN(year) || Number.isNaN(hours) || Number.isNaN(minutes)) return 0;

  return new Date(year, month, day, hours, minutes, 0, 0).getTime();
}

function setSepsisFieldDisplay(element, value, fallback = "-") {
  if (!element) return;
  const displayValue = value || fallback;
  if ("value" in element) {
    element.value = value || "";
  } else {
    element.textContent = displayValue;
  }
}

function formatDateThai(value) {
  const copy = sepsisCopy();
  if (!value) return copy.timeline.notSet;
  const parsedTime = parseFlexibleDateTime(value);
  const date = parsedTime ? new Date(parsedTime) : new Date(value);
  if (Number.isNaN(date.getTime())) return copy.timeline.notSet;
  return date.toLocaleDateString(currentLanguage === "en" ? "en-US" : "th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function formatDateTimeThai(value) {
  const copy = sepsisCopy();
  if (!value) return copy.timeline.notSet;
  const parsedTime = parseFlexibleDateTime(value);
  const date = parsedTime ? new Date(parsedTime) : new Date(value);
  if (Number.isNaN(date.getTime())) return copy.timeline.notSet;
  return date.toLocaleString(currentLanguage === "en" ? "en-US" : "th-TH", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getStartDate(sepsis = sepsisState) {
  if (!sepsis.startDateTime) return null;
  const parsedTime = parseFlexibleDateTime(sepsis.startDateTime);
  const screeningDate = parsedTime ? new Date(parsedTime) : new Date(sepsis.startDateTime);
  if (Number.isNaN(screeningDate.getTime())) return null;
  if (sepsis.type === "severe") {
    return getDateTimeFromStartAndTime(screeningDate, sepsis.consultTime) || screeningDate;
  }
  return screeningDate;
}

function getTaskDateTime(step, sepsis = sepsisState) {
  const start = getStartDate(sepsis);
  const time = getSepsisStepTime(step, sepsis);
  if (!start || !time) return null;
  return getDateTimeFromStartAndTime(start, time);
}

function isSepsisStepDone(step, sepsis = sepsisState) {
  if (step === "consult") return Boolean(sepsis.consultDone);
  return Boolean(sepsis.tasks?.[step]?.done || (!SEPSIS_CHECK_ONLY_STEPS.has(step) && getSepsisStepTime(step, sepsis)));
}

function getSepsisStepTime(step, sepsis = sepsisState) {
  if (step === "consult") return normalizeClockTime(sepsis.consultTime || "");
  const sharedSourceStep = SEPSIS_SHARED_TIME_STEPS.get(step);
  if (sharedSourceStep) return normalizeClockTime(sepsis.tasks?.[sharedSourceStep]?.time || sepsis.tasks?.[step]?.time || "");
  return normalizeClockTime(sepsis.tasks?.[step]?.time || "");
}

function getDateTimeFromStartAndTime(startDate, timeValue) {
  if (!startDate || Number.isNaN(startDate.getTime())) return null;
  const text = String(timeValue || "").trim();
  if (!text) return null;

  if (/\d{4}-\d{1,2}-\d{1,2}|\d{1,2}[/-]\d{1,2}[/-]\d{2,4}/.test(text)) {
    const fullDate = new Date(text);
    if (!Number.isNaN(fullDate.getTime())) return fullDate;
  }

  const timeMatch = text
    .replace(/[น.]/g, "")
    .match(/(\d{1,2})\s*[:.]\s*(\d{2})(?:\s*[:.]\s*\d{2})?\s*(AM|PM)?/i);
  if (!timeMatch) return null;

  let hours = Number.parseInt(timeMatch[1], 10);
  const minutes = Number.parseInt(timeMatch[2], 10);
  const meridiem = (timeMatch[3] || "").toUpperCase();
  if (meridiem === "PM" && hours < 12) hours += 12;
  if (meridiem === "AM" && hours === 12) hours = 0;
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return null;

  const result = new Date(startDate);
  result.setHours(hours, minutes, 0, 0);
  if (result.getTime() < startDate.getTime()) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}

function getSepsisTargetMinutes(type = sepsisState.type) {
  return type === "severe" ? 60 : 180;
}

function getSepsisTargetHoursLabel(type = sepsisState.type) {
  const copy = sepsisCopy();
  return type === "severe" ? copy.protocol.hour1 : copy.protocol.hour3;
}

function getSepsisProtocolLabel(type = sepsisState.type) {
  const copy = sepsisCopy();
  return type === "severe" ? copy.protocol.severe : copy.protocol.sepsis;
}

function getSepsisClockStartLabel(type = sepsisState.type) {
  const copy = sepsisCopy();
  return type === "severe" ? copy.protocol.doctorDiagnosis : copy.protocol.screeningStart;
}

function calculateSepsisMetrics() {
  const completedSteps = SEPSIS_PROGRESS_TASKS.filter(step => isSepsisStepDone(step, sepsisState)).length;
  const progressPercent = Math.round((completedSteps / SEPSIS_PROGRESS_TASKS.length) * 100);
  const start = getStartDate();
  const elapsedMinutes = start ? Math.max(0, Math.round((Date.now() - start.getTime()) / 60000)) : 0;
  const targetMinutes = getSepsisTargetMinutes(sepsisState.type);
  const remainingMinutes = start ? targetMinutes - elapsedMinutes : targetMinutes;
  return {
    completedSteps,
    progressPercent,
    elapsedMinutes,
    remainingMinutes,
    targetMinutes
  };
}

function calculateSepsisMetricsForCase(sepsis) {
  const completedSteps = SEPSIS_PROGRESS_TASKS.filter(step => isSepsisStepDone(step, sepsis)).length;
  const progressPercent = Math.round((completedSteps / SEPSIS_PROGRESS_TASKS.length) * 100);
  const start = getStartDate(sepsis);
  const elapsedMinutes = start ? Math.max(0, Math.round((Date.now() - start.getTime()) / 60000)) : 0;
  const targetMinutes = getSepsisTargetMinutes(sepsis.type);
  const remainingMinutes = start ? targetMinutes - elapsedMinutes : targetMinutes;
  return {
    completedSteps,
    progressPercent,
    elapsedMinutes,
    remainingMinutes,
    targetMinutes
  };
}

function createSepsisSheetPayload(sepsis = sepsisState) {
  const normalized = normalizeSepsisCase(sepsis);
  const metrics = calculateSepsisMetricsForCase(normalized);
  const savedAt = new Date().toISOString();
  const task = step => {
    const current = normalized.tasks?.[step] || { done: false, time: "" };
    return { ...current, time: normalizeClockTime(current.time || "") };
  };
  const completedAll = metrics.completedSteps === SEPSIS_PROGRESS_TASKS.length;

  return {
    sheetName: "sepsis",
    recordType: "sepsisProtocol",
    caseId: normalized.caseId || "",
    historyRecordKey: normalized.historyRecordKey || "",
    createdAt: normalized.createdAt || savedAt,
    updatedAt: savedAt,
    savedAt,
    mode: "upsert",
    patientHn: normalized.patientHn || "",
    patientName: normalized.patientName || "",
    patientAge: normalized.patientAge || "",
    patientSex: normalized.patientSex || "",
    assessmentLocation: normalized.assessmentLocation || "",
    startDateTime: normalized.startDateTime || "",
    protocolType: getSepsisSheetProtocolType(normalized.type),
    triage: normalized.triage || "",
    infectionSource: normalized.infectionSource || "",
    disposition: normalized.disposition || "",
    newsScore: normalized.newsScore || 0,
    newsLevel: normalized.newsLevel || "",
    consultDone: Boolean(normalized.consultDone),
    consultTime: normalizeClockTime(normalized.consultTime),
    bloodCultureDone: Boolean(task(1).done),
    bloodCultureTime: task(1).time || "",
    specimenDone: Boolean(task(2).done),
    specimenTime: task(2).time || "",
    foleyDone: Boolean(task(3).done),
    foleyTime: task(3).time || "",
    lactateDone: Boolean(task(4).done),
    lactateTime: task(4).time || "",
    lactateValue: normalized.lactateValue || "",
    fluidDone: Boolean(task(5).done),
    fluidTime: task(5).time || "",
    antibioticDone: Boolean(task(6).done),
    antibioticTime: task(6).time || "",
    evaluationDone: Boolean(task(7).done),
    evaluationTime: task(7).time || "",
    completedSteps: metrics.completedSteps,
    totalSteps: SEPSIS_PROGRESS_TASKS.length,
    progressPercent: metrics.progressPercent,
    targetMinutes: metrics.targetMinutes,
    elapsedMinutes: metrics.elapsedMinutes,
    remainingMinutes: metrics.remainingMinutes,
    overTarget: metrics.remainingMinutes < 0,
    onTime: completedAll && metrics.remainingMinutes >= 0,
    note: normalized.note || "",
    rawJson: JSON.stringify(normalized)
  };
}

function getNewsLevelLabel(score) {
  const levels = sepsisCopy().levels;
  const numericScore = Number(score) || 0;
  if (numericScore >= 7) return levels.high;
  if (numericScore >= 5) return levels.watch;
  if (numericScore >= 3) return levels.medium;
  if (numericScore > 0) return levels.low;
  return sepsisCopy().unclassified;
}

function renderSepsisPatientAvatar() {
  const avatarEl = document.getElementById("sepsisPatientAvatar");
  if (!avatarEl) return;

  if (sepsisState.patientSex === "ชาย") {
    avatarEl.innerHTML = `<img class="sepsis-asset-icon" src="icon sepsis/man.svg" alt="" />`;
    return;
  }
  if (sepsisState.patientSex === "หญิง") {
    avatarEl.innerHTML = `<img class="sepsis-asset-icon" src="icon sepsis/woman.svg" alt="" />`;
    return;
  }

  avatarEl.innerHTML = `<svg class="sepsis-svg-icon avatar"><use href="#sp-user"></use></svg>`;
}

function inferScoreFromForm() {
  const total = Number.parseInt(selectors.totalScore?.textContent || "0", 10);
  return Number.isNaN(total) ? 0 : total;
}

function hydrateSepsisFromAssessment() {
  const historyItem = currentEditingRecord
    ? getHistoryLookupItems().find(item => isSameHistoryRecord(item, currentEditingRecord))
    : findLatestHistoryItemByHn(selectors.hn?.value || "");

  if (!historyItem) {
    setSepsisStatus(sepsisCopy().statuses.chooseHistoryFirst, "error");
    setAppView("history", { scrollToTop: false });
    return;
  }

  openSepsisCaseFromHistoryItem(historyItem);
  const assessmentScore = inferScoreFromForm();
  const assessmentTime = selectors.assessmentTime?.value || "";
  const assessmentHn = selectors.hn?.value || "";
  const assessmentAge = sanitizeAge(selectors.age?.value || "");
  const assessmentGender = getSepsisSexValueFromHistory(selectors.gender?.value || "");
  const assessmentLocation = selectors.location?.value || "";

  if (assessmentTime) {
    sepsisState.startDateTime = assessmentTime;
  } else if (!sepsisState.startDateTime) {
    sepsisState.startDateTime = getNowDateTimeLocalValue();
  }

  if (assessmentHn) {
    sepsisState.patientHn = assessmentHn;
  }
  if (assessmentAge) {
    sepsisState.patientAge = assessmentAge;
  }
  if (assessmentGender) {
    sepsisState.patientSex = assessmentGender;
  }
  if (assessmentLocation) {
    sepsisState.assessmentLocation = assessmentLocation;
  }

  sepsisState.newsScore = assessmentScore;
  sepsisState.newsLevel = getNewsLevelLabel(assessmentScore);
  persistSepsisState();
  renderSepsisProtocol();
  setSepsisStatus(sepsisCopy().statuses.loadedFromAssessment, "info");
}

function setSepsisStatus(message, type = "info") {
  const statusEl = document.getElementById("sepsisSaveStatus");
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.className = `sepsis-save-status ${type}`;
}

function getSepsisCaseTitle(sepsis) {
  return sepsis.patientHn ? `HN ${sepsis.patientHn}` : sepsisCopy().currentCase.noHn;
}

function getSepsisCaseSubtitle(sepsis) {
  const time = sepsis.startDateTime ? formatDateTimeThai(sepsis.startDateTime) : sepsisCopy().currentCase.noTime;
  return time;
}

function getSepsisCaseStatusText(sepsis) {
  const copy = sepsisCopy().currentCase;
  const metrics = calculateSepsisMetricsForCase(sepsis);
  if (metrics.completedSteps === SEPSIS_PROGRESS_TASKS.length) return copy.statusComplete;
  if (metrics.remainingMinutes < 0) return copy.statusOver;
  return copy.statusWorking;
}

function isSepsisCaseComplete(sepsis) {
  const savedCompletedSteps = Number.parseInt(sepsis?.completedSteps ?? "", 10);
  const savedTotalSteps = Number.parseInt(sepsis?.totalSteps ?? SEPSIS_PROGRESS_TASKS.length, 10);
  if (!Number.isNaN(savedCompletedSteps) && !Number.isNaN(savedTotalSteps) && savedCompletedSteps >= savedTotalSteps) {
    return true;
  }

  const metrics = calculateSepsisMetricsForCase(sepsis);
  return metrics.completedSteps >= SEPSIS_PROGRESS_TASKS.length;
}

function getSepsisCaseSortTime(sepsis = {}) {
  const rawValue = sepsis.startDateTime || sepsis.assessmentTime || sepsis.updatedAt || sepsis.savedAt || sepsis.createdAt || "";
  return parseFlexibleDateTime(rawValue) || 0;
}

function mergeSepsisCases(cases = []) {
  const caseMap = new Map();
  cases.map(normalizeSepsisCase).forEach(item => {
    if (!item.caseId) return;
    const previous = caseMap.get(item.caseId);
    if (!previous || getSepsisCaseSortTime(item) >= getSepsisCaseSortTime(previous)) {
      caseMap.set(item.caseId, item);
    }
  });
  return Array.from(caseMap.values()).sort((a, b) => getSepsisCaseSortTime(b) - getSepsisCaseSortTime(a));
}

function persistSepsisStoreWithCases(cases = sepsisStore.cases) {
  const mergedCases = mergeSepsisCases(cases);
  const activeCaseId = mergedCases.some(item => item.caseId === sepsisStore.activeCaseId)
    ? sepsisStore.activeCaseId
    : "";
  sepsisStore = { activeCaseId, cases: mergedCases };
  localStorage.setItem(SEPSIS_PROTOCOL_KEY, JSON.stringify(sepsisStore));
}

function renderSepsisCaseSection(title, cases, options = {}) {
  const { emptyText = sepsisCopy().currentCase.noSaved, completed = false } = options;
  const body = cases.length
    ? cases.map(item => renderSepsisCaseItem(item, { completed })).join("")
    : `<div class="sepsis-case-empty">${escapeHtml(emptyText)}</div>`;

  return `
    <section class="sepsis-case-section">
      <h3 class="sepsis-case-section-title">${escapeHtml(title)}</h3>
      <div class="sepsis-case-section-list">
        ${body}
      </div>
    </section>
  `;
}

function renderSepsisCaseItem(item, options = {}) {
  const copy = sepsisCopy().currentCase;
  const isActive = item.caseId === sepsisState.caseId;
  const isComplete = options.completed || isSepsisCaseComplete(item);
  return `
    <article class="sepsis-case-item ${isActive ? "active" : ""} ${isComplete ? "complete" : "in-progress"}">
      <div class="sepsis-case-copy">
        <strong>${escapeHtml(getSepsisCaseTitle(item))}</strong>
        <span>${escapeHtml(getSepsisCaseSubtitle(item))}</span>
      </div>
      <div class="sepsis-case-actions">
        <button class="sepsis-case-open-btn" type="button" data-sepsis-open-case="${escapeHtml(item.caseId)}">${isActive ? escapeHtml(copy.openCurrent) : escapeHtml(copy.open)}</button>
      </div>
    </article>
  `;
}

function renderSepsisCaseListUnusedDuplicateThree() {
  const listEl = document.getElementById("sepsisCaseList");
  if (!listEl) return;

  if (!sepsisStore.cases.length) {
    listEl.innerHTML = `<div class="sepsis-case-empty">ยังไม่มีเคสที่บันทึกไว้</div>`;
    return;
  }

  listEl.innerHTML = sepsisStore.cases.map(item => {
    const metrics = calculateSepsisMetricsForCase(item);
    const isActive = item.caseId === sepsisState.caseId;
    return `
      <article class="sepsis-case-item ${isActive ? "active" : ""}">
        <div class="sepsis-case-copy">
          <strong>${escapeHtml(getSepsisCaseTitle(item))}</strong>
          <span>${escapeHtml(getSepsisCaseSubtitle(item))}</span>
          <small>${escapeHtml(getSepsisCaseStatusText(item))} • ${metrics.completedSteps}/${SEPSIS_PROGRESS_TASKS.length} รายการ • NEWS ${escapeHtml(String(item.newsScore || 0))}</small>
        </div>
        <button class="sepsis-case-open-btn" type="button" data-sepsis-open-case="${escapeHtml(item.caseId)}">${isActive ? "กำลังเปิด" : "เปิดต่อ"}</button>
      </article>
    `;
  }).join("");
}

function renderSepsisCurrentCaseSummary() {
  const copy = sepsisCopy();
  const summaryEl = document.getElementById("sepsisCurrentCaseSummary");
  const deleteCurrentBtn = document.getElementById("sepsisDeleteCurrentCaseBtn");
  if (deleteCurrentBtn) {
    deleteCurrentBtn.disabled = !sepsisState?.caseId;
  }
  if (!summaryEl) return;

  const activeCase = sepsisState;
  if (!activeCase?.caseId) {
    summaryEl.innerHTML = `<div class="sepsis-case-empty">${escapeHtml(copy.currentCase.emptyActive)}</div>`;
    return;
  }

  const metrics = calculateSepsisMetricsForCase(activeCase);
  const urgencyText = metrics.remainingMinutes < 0
    ? formatTemplate(copy.currentCase.over, { minutes: Math.abs(metrics.remainingMinutes) })
    : formatTemplate(copy.currentCase.remaining, { minutes: metrics.remainingMinutes });
  const stepCountText = formatTemplate(copy.currentCase.stepCount, {
    done: metrics.completedSteps,
    total: SEPSIS_PROGRESS_TASKS.length
  });

  summaryEl.innerHTML = `
    <article class="sepsis-current-case-panel">
      <div class="sepsis-current-case-copy">
        <strong>${escapeHtml(getSepsisCaseTitle(activeCase))}</strong>
        <span>${escapeHtml(getSepsisCaseSubtitle(activeCase))}</span>
        <small>${escapeHtml(getSepsisCaseStatusText(activeCase))} • NEWS ${escapeHtml(String(activeCase.newsScore || 0))}</small>
      </div>
      <div class="sepsis-current-case-metrics">
        <span>${escapeHtml(stepCountText)}</span>
        <span>${escapeHtml(urgencyText)}</span>
      </div>
    </article>
  `;
}

function ensureSepsisCaseModalMounted() {
  const modalEl = document.getElementById("sepsisCaseModal");
  if (!modalEl || modalEl.parentElement === document.body) return modalEl;
  document.body.appendChild(modalEl);
  return modalEl;
}

async function refreshSepsisCaseListFromSheet() {
  sepsisCaseListLoading = true;
  sepsisCaseListLoadFailed = false;
  renderSepsisCaseList();

  try {
    const params = new URLSearchParams({
      mode: "sepsis",
      sheetName: "sepsis",
      limit: "10"
    });
    const response = await fetch(`${SHEET_WEBAPP_URL}?${params.toString()}`, {
      method: "GET",
      mode: "cors",
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    if (!payload || payload.ok !== true || !Array.isArray(payload.items)) {
      throw new Error("Invalid sepsis case list response");
    }

    const historyMaps = getDashboardHistoryMaps();
    const sheetCases = payload.items.map(item => normalizeDashboardSepsisItem(item, historyMaps));
    persistSepsisStoreWithCases([...sepsisStore.cases, ...sheetCases]);
    sepsisState = normalizeSepsisCase(getActiveSepsisCase() || sepsisState || createDefaultSepsisState());
  } catch (error) {
    sepsisCaseListLoadFailed = true;
    console.error(error);
  } finally {
    sepsisCaseListLoading = false;
    renderSepsisCaseList();
    renderSepsisCurrentCaseSummary();
  }
}

async function openSepsisCaseModal() {
  const modalEl = ensureSepsisCaseModalMounted();
  if (!modalEl || typeof bootstrap === "undefined") return;
  renderSepsisCaseList();
  modalEl.style.zIndex = "2000";
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
  await refreshSepsisCaseListFromSheet();
}

function loadSepsisCase(caseId) {
  const nextCase = sepsisStore.cases.find(item => item.caseId === caseId);
  if (!nextCase) return;
  sepsisHnSearchDraft = null;
  sepsisStore.activeCaseId = nextCase.caseId;
  sepsisState = normalizeSepsisCase(nextCase);
  localStorage.setItem(SEPSIS_PROTOCOL_KEY, JSON.stringify(sepsisStore));
  renderSepsisProtocol();
  renderSepsisCaseList();
  renderSepsisCurrentCaseSummary();
  const modalEl = document.getElementById("sepsisCaseModal");
  if (modalEl && typeof bootstrap !== "undefined") {
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    modalInstance?.hide();
  }
  setSepsisStatus(formatTemplate(sepsisCopy().currentCase.loaded, { title: getSepsisCaseTitle(sepsisState) }), "info");
}

function deleteSepsisCase(caseId) {
  const targetCase = sepsisStore.cases.find(item => item.caseId === caseId);
  if (!targetCase) return;

  const confirmed = window.confirm(formatTemplate(sepsisCopy().currentCase.deleteConfirm, { title: getSepsisCaseTitle(targetCase) }));
  if (!confirmed) return;

  window.clearTimeout(sepsisSheetSyncTimer);
  deleteSepsisCaseFromSheet(targetCase);
  sepsisStore.cases = sepsisStore.cases.filter(item => item.caseId !== caseId);

  if (!sepsisStore.cases.length) {
    sepsisStore.activeCaseId = "";
    sepsisState = createDefaultSepsisState();
    setSepsisStatus(sepsisCopy().currentCase.deleteLast, "info");
  } else {
    if (sepsisStore.activeCaseId === caseId || sepsisState.caseId === caseId) {
      sepsisStore.activeCaseId = "";
      sepsisState = createDefaultSepsisState();
    } else {
      sepsisState = normalizeSepsisCase(getActiveSepsisCase() || createDefaultSepsisState());
    }
    setSepsisStatus(formatTemplate(sepsisCopy().currentCase.deleted, { title: getSepsisCaseTitle(targetCase) }), "success");
  }

  localStorage.setItem(SEPSIS_PROTOCOL_KEY, JSON.stringify(sepsisStore));
  renderSepsisProtocol();
  renderSepsisCaseList();
  renderSepsisCurrentCaseSummary();
  renderHomeSepsisCases(sepsisStore.cases);
}

function renderSepsisCaseListUnusedDuplicateTwo() {
  const listEl = document.getElementById("sepsisCaseList");
  if (!listEl) return;

  if (!sepsisStore.cases.length) {
    listEl.innerHTML = `<div class="sepsis-case-empty">ยังไม่มีเคสที่บันทึกไว้</div>`;
    return;
  }

  listEl.innerHTML = sepsisStore.cases.map(item => {
    const metrics = calculateSepsisMetricsForCase(item);
    const isActive = item.caseId === sepsisState.caseId;
    return `
      <article class="sepsis-case-item ${isActive ? "active" : ""}">
        <div class="sepsis-case-copy">
          <strong>${escapeHtml(getSepsisCaseTitle(item))}</strong>
          <span>${escapeHtml(getSepsisCaseSubtitle(item))}</span>
          <small>${escapeHtml(getSepsisCaseStatusText(item))} • ${metrics.completedSteps}/${SEPSIS_PROGRESS_TASKS.length} รายการ • NEWS ${escapeHtml(String(item.newsScore || 0))}</small>
        </div>
        <div class="sepsis-case-actions">
        <div class="sepsis-case-actions">
        <div class="sepsis-case-actions">
          <button class="sepsis-case-open-btn" type="button" data-sepsis-open-case="${escapeHtml(item.caseId)}">${isActive ? "กำลังเปิด" : "เปิดต่อ"}</button>
          <button class="sepsis-case-delete-btn" type="button" data-sepsis-delete-case="${escapeHtml(item.caseId)}" aria-label="Delete case ${escapeHtml(getSepsisCaseTitle(item))}">Delete</button>
        </div>
          <button class="sepsis-case-delete-btn" type="button" data-sepsis-delete-case="${escapeHtml(item.caseId)}" aria-label="Delete case ${escapeHtml(getSepsisCaseTitle(item))}">Delete</button>
        </div>
          <button class="sepsis-case-delete-btn" type="button" data-sepsis-delete-case="${escapeHtml(item.caseId)}" aria-label="Delete case ${escapeHtml(getSepsisCaseTitle(item))}">Delete</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderSepsisCaseListUnusedDuplicateEnglish() {
  const listEl = document.getElementById("sepsisCaseList");
  if (!listEl) return;

  if (!sepsisStore.cases.length) {
    listEl.innerHTML = `<div class="sepsis-case-empty">No saved sepsis cases yet.</div>`;
    return;
  }

  listEl.innerHTML = sepsisStore.cases.map(item => {
    const metrics = calculateSepsisMetricsForCase(item);
    const isActive = item.caseId === sepsisState.caseId;
    return `
      <article class="sepsis-case-item ${isActive ? "active" : ""}">
        <div class="sepsis-case-copy">
          <strong>${escapeHtml(getSepsisCaseTitle(item))}</strong>
          <span>${escapeHtml(getSepsisCaseSubtitle(item))}</span>
          <small>${escapeHtml(getSepsisCaseStatusText(item))} | ${metrics.completedSteps}/${SEPSIS_PROGRESS_TASKS.length} steps | NEWS ${escapeHtml(String(item.newsScore || 0))}</small>
        </div>
        <div class="sepsis-case-actions">
          <button class="sepsis-case-open-btn" type="button" data-sepsis-open-case="${escapeHtml(item.caseId)}">${isActive ? "Open now" : "Open"}</button>
          <button class="sepsis-case-delete-btn" type="button" data-sepsis-delete-case="${escapeHtml(item.caseId)}" aria-label="Delete case ${escapeHtml(getSepsisCaseTitle(item))}">Delete</button>
        </div>
      </article>
    `;
  }).join("");
}

function renderSepsisCaseList() {
  const copy = sepsisCopy().currentCase;
  const listEl = document.getElementById("sepsisCaseList");
  if (!listEl) return;

  if (sepsisCaseListLoading) {
    listEl.innerHTML = `<div class="sepsis-case-empty">${escapeHtml(copy.loading)}</div>`;
    return;
  }

  const sortedCases = mergeSepsisCases(sepsisStore.cases);
  const activeCases = sortedCases.filter(item => !isSepsisCaseComplete(item));
  const completedCases = sortedCases.filter(item => isSepsisCaseComplete(item)).slice(0, 10);

  if (!sortedCases.length) {
    listEl.innerHTML = `<div class="sepsis-case-empty">${escapeHtml(copy.noSaved)}</div>`;
    return;
  }

  const failedNotice = sepsisCaseListLoadFailed
    ? `<div class="sepsis-case-empty error">${escapeHtml(copy.failed)}</div>`
    : "";

  listEl.innerHTML = `
    ${failedNotice}
    ${renderSepsisCaseSection(copy.activeSection, activeCases, { emptyText: copy.activeEmpty })}
    ${renderSepsisCaseSection(copy.completedSection, completedCases, { emptyText: copy.completedEmpty, completed: true })}
  `;
}

function createNewSepsisCaseFromCurrentContext() {
  setSepsisStatus(sepsisCopy().currentCase.chooseNewsOnly, "info");
  setAppView("history", { scrollToTop: false });
  return;
}

async function saveSepsisProtocol() {
  if (!persistSepsisState()) {
    setSepsisStatus(sepsisCopy().statuses.saveRequiresCase, "error");
    return;
  }

  if (!normalizeClockTime(sepsisState.consultTime || "")) {
    setSepsisStatus(sepsisCopy().statuses.saveRequiresDiagnosisTime, "error");
    return;
  }

  setSepsisStatus(sepsisCopy().statuses.savePending, "info");

  try {
    await saveToGoogleSheet(createSepsisSheetPayload(sepsisState));
    setSepsisStatus(sepsisCopy().statuses.saveSuccess, "success");
  } catch (error) {
    console.error(error);
    setSepsisStatus(sepsisCopy().statuses.saveError, "error");
  }
}

function setSepsisType(type) {
  sepsisState.type = type === "severe" ? "severe" : "sepsis";
  persistSepsisState();
  renderSepsisProtocol();
  updateDesktopViewCopy("sepsis");
}

function toggleSepsisConsultTime() {
  if (sepsisState.consultTime) {
    sepsisState.consultTime = "";
  } else {
    const now = new Date();
    sepsisState.consultTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }
  persistSepsisState();
  renderSepsisProtocol();
}

function setSepsisTaskTime(step, value) {
  const nextValue = normalizeClockTime(value);
  if (step === "consult") {
    sepsisState.consultTime = nextValue;
    persistSepsisState();
    renderSepsisProtocol();
    return;
  }
  const task = sepsisState.tasks[step];
  if (!task) return;
  task.time = nextValue;
  task.done = Boolean(nextValue);
  SEPSIS_SHARED_TIME_STEPS.forEach((sourceStep, sharedStep) => {
    if (sourceStep !== step) return;
    const sharedTask = sepsisState.tasks[sharedStep];
    if (!sharedTask) return;
    sharedTask.time = nextValue;
  });
  persistSepsisState();
  renderSepsisProtocol();
}

function toggleSepsisTask(step) {
  if (step === "consult") {
    sepsisState.consultDone = !sepsisState.consultDone;
    persistSepsisState();
    renderSepsisProtocol();
    return;
  }
  const task = sepsisState.tasks[step];
  if (!task) return;
  const nextDone = !task.done;
  task.done = nextDone;
  if (nextDone && !task.time && !SEPSIS_CHECK_ONLY_STEPS.has(step) && !SEPSIS_SHARED_TIME_STEPS.has(step)) {
    const now = new Date();
    task.time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  }
  if (nextDone && SEPSIS_SHARED_TIME_STEPS.has(step)) {
    task.time = getSepsisStepTime(step, sepsisState);
  }
  if (!nextDone) {
    task.time = "";
  }
  SEPSIS_SHARED_TIME_STEPS.forEach((sourceStep, sharedStep) => {
    if (sourceStep !== step) return;
    const sharedTask = sepsisState.tasks[sharedStep];
    if (!sharedTask) return;
    sharedTask.time = task.time || "";
  });
  persistSepsisState();
  renderSepsisProtocol();
}

function cycleSepsisFilter() {
  const order = ["all", "pending", "done"];
  const currentIndex = order.indexOf(sepsisFilterMode);
  sepsisFilterMode = order[(currentIndex + 1) % order.length];
  renderSepsisProtocol();
}

function renderSepsisProtocol() {
  const copy = sepsisCopy();
  const patientHnInputEl = document.getElementById("sepsisPatientHnInput");
  const patientAgeInputEl = document.getElementById("sepsisPatientAgeInput");
  const patientSexInputEl = document.getElementById("sepsisPatientSexInput");
  const consultTimeEl = document.getElementById("sepsisConsultTime");
  const consultToggleEl = document.getElementById("sepsisConsultToggle");
  const lactateValueEl = document.getElementById("sepsisLactateValue");
  const startDateTimeEl = document.getElementById("sepsisStartDateTime");
  const startDateHintEl = document.getElementById("sepsisStartDateHint");
  const assessmentLocationTextEl = document.getElementById("sepsisAssessmentLocationText");
  const newsScoreEl = document.getElementById("sepsisNewsScore");
  const newsLevelEl = document.getElementById("sepsisNewsLevel");
  const stepperProgressEl = document.getElementById("sepsisStepperProgress");
  const ringInnerEl = document.getElementById("sepsisRingInner");
  const elapsedTextEl = document.getElementById("sepsisElapsedText");
  const remainingTextEl = document.getElementById("sepsisRemainingText");
  const remainingHintEl = document.getElementById("sepsisRemainingHint");
  const completionTitleEl = document.getElementById("sepsisCompletionTitle");
  const completionTextEl = document.getElementById("sepsisCompletionText");
  const heroProtocolTextEl = document.getElementById("sepsisHeroProtocolText");
  const bundleTitleEl = document.getElementById("sepsisBundleTitle");
  const bundleSubtitleEl = document.getElementById("sepsisBundleSubtitle");
  const targetLabelEl = document.getElementById("sepsisTargetLabel");
  const timelineSubtitleEl = document.getElementById("sepsisTimelineSubtitle");
  const timelineStartLabelEl = document.getElementById("sepsisTimelineStartLabel");
  const tipTextEl = document.getElementById("sepsisTipText");
  const actionHint5El = document.getElementById("sepsisActionHint5");
  const actionHint6El = document.getElementById("sepsisActionHint6");
  const noteInputEl = document.getElementById("sepsisNoteInput");
  const filterBtnEl = document.getElementById("sepsisFilterBtn");
  const timelineStartTimeEl = document.getElementById("sepsisTimelineStartTime");
  const timelineStartDateEl = document.getElementById("sepsisTimelineStartDate");
  const timelineConsultTimeEl = document.getElementById("sepsisTimelineConsultTime");
  const timelineConsultOffsetEl = document.getElementById("sepsisTimelineConsultOffset");

  if (!patientHnInputEl) return;

  const metrics = calculateSepsisMetrics();
  const startDate = getStartDate();
  const targetHoursLabel = getSepsisTargetHoursLabel(sepsisState.type);
  const protocolLabel = getSepsisProtocolLabel(sepsisState.type);
  const clockStartLabel = getSepsisClockStartLabel(sepsisState.type);
  const minuteUnit = copy.progress.minutes;

  applySepsisStaticTranslations();
  renderSepsisPatientAvatar();

  const hnDisplayValue = sepsisHnSearchDraft !== null ? sepsisHnSearchDraft : (sepsisState.patientHn || "");
  const isSearchingDifferentHn = sepsisHnSearchDraft !== null && sepsisHnSearchDraft !== (sepsisState.patientHn || "");
  if (patientHnInputEl.value !== hnDisplayValue) {
    patientHnInputEl.value = hnDisplayValue;
  }
  setSepsisFieldDisplay(patientAgeInputEl, isSearchingDifferentHn ? "" : (sepsisState.patientAge || ""));
  setSepsisFieldDisplay(patientSexInputEl, isSearchingDifferentHn ? "" : getSepsisDisplaySex(sepsisState.patientSex || ""));
  setSepsisFieldDisplay(assessmentLocationTextEl, isSearchingDifferentHn ? "" : (sepsisState.assessmentLocation || ""));
  if (consultTimeEl && consultTimeEl.value !== (sepsisState.consultTime || "")) {
    consultTimeEl.value = sepsisState.consultTime || "";
  }
  if (lactateValueEl && lactateValueEl.value !== (sepsisState.lactateValue || "")) {
    lactateValueEl.value = sepsisState.lactateValue || "";
  }
  document.querySelectorAll("[data-sepsis-triage]").forEach(button => {
    button.classList.toggle("active", button.getAttribute("data-sepsis-triage") === (sepsisState.triage || ""));
  });
  document.querySelectorAll("[data-sepsis-infection]").forEach(button => {
    button.classList.toggle("active", button.getAttribute("data-sepsis-infection") === (sepsisState.infectionSource || ""));
  });
  document.querySelectorAll("[data-sepsis-disposition]").forEach(button => {
    button.classList.toggle("active", button.getAttribute("data-sepsis-disposition") === (sepsisState.disposition || ""));
  });
  setSepsisFieldDisplay(startDateTimeEl, !isSearchingDifferentHn && sepsisState.startDateTime ? formatDateTimeThai(sepsisState.startDateTime) : "");
  startDateHintEl.textContent = !isSearchingDifferentHn && startDate
    ? `${formatDateThai(sepsisState.startDateTime)} ${startDate.toLocaleTimeString(currentLanguage === "en" ? "en-US" : "th-TH", { hour: "2-digit", minute: "2-digit" })}`
    : copy.fromNews;
  newsScoreEl.textContent = String(isSearchingDifferentHn ? 0 : (sepsisState.newsScore || 0));
  newsLevelEl.textContent = isSearchingDifferentHn ? getNewsLevelLabel(0) : (sepsisState.newsLevel || getNewsLevelLabel(sepsisState.newsScore));

  document.querySelectorAll("[data-sepsis-type]").forEach(card => {
    const isActive = card.getAttribute("data-sepsis-type") === sepsisState.type;
    card.classList.toggle("active", isActive);
    card.setAttribute("aria-pressed", isActive ? "true" : "false");

    const indicator = card.querySelector(".sepsis-check, .sepsis-radio");
    if (indicator) {
      indicator.className = isActive ? "sepsis-check" : "sepsis-radio";
      indicator.innerHTML = isActive ? "&#10003;" : "";
    }
  });

  if (heroProtocolTextEl) heroProtocolTextEl.textContent = protocolLabel;
  if (bundleTitleEl) bundleTitleEl.textContent = protocolLabel;
  if (bundleSubtitleEl) bundleSubtitleEl.textContent = formatTemplate(copy.progress.subtitle, { count: SEPSIS_PROGRESS_TASKS.length, target: targetHoursLabel });
  if (targetLabelEl) targetLabelEl.textContent = protocolLabel;
  if (timelineSubtitleEl) timelineSubtitleEl.textContent = protocolLabel;
  if (timelineStartLabelEl) timelineStartLabelEl.textContent = clockStartLabel;
  if (tipTextEl) tipTextEl.textContent = protocolLabel;
  if (actionHint5El) actionHint5El.textContent = formatTemplate(copy.actions[5][1], { target: targetHoursLabel, goldenHour: "" });
  if (actionHint6El) actionHint6El.textContent = formatTemplate(copy.actions[6][1], { target: targetHoursLabel, goldenHour: sepsisState.type === "severe" ? " (Golden Hour)" : "" });
  if (stepperProgressEl) {
    stepperProgressEl.style.width = `${metrics.progressPercent}%`;
  }
  document.querySelectorAll("[data-step-point]").forEach(point => {
    const rawStep = point.getAttribute("data-step-point");
    const step = rawStep && !Number.isNaN(Number(rawStep)) ? Number(rawStep) : rawStep;
    const orderIndex = SEPSIS_PROGRESS_TASKS.findIndex(item => item === step);
    if (orderIndex >= 0) {
      point.style.order = String(orderIndex + 1);
      point.textContent = String(orderIndex + 1);
    }
    point.classList.toggle("done", isSepsisStepDone(step, sepsisState));
  });

  if (elapsedTextEl) elapsedTextEl.textContent = `${metrics.elapsedMinutes} ${minuteUnit}`;
  if (remainingTextEl) remainingTextEl.textContent = `${Math.abs(metrics.remainingMinutes)} ${minuteUnit}`;
  if (remainingHintEl) remainingHintEl.textContent = metrics.remainingMinutes >= 0 ? copy.progress.remaining : copy.progress.overTarget;
  if (ringInnerEl) ringInnerEl.textContent = `${metrics.progressPercent}%`;
  const ringEl = ringInnerEl?.parentElement;
  if (ringEl) {
    ringEl.style.background = `conic-gradient(#10a4bb 0 ${metrics.progressPercent}%, #dce8ef ${metrics.progressPercent}% 100%)`;
  }
  if (completionTitleEl) completionTitleEl.textContent = metrics.completedSteps === SEPSIS_PROGRESS_TASKS.length ? copy.progress.complete : copy.progress.inProgress;
  if (completionTextEl) completionTextEl.textContent = formatTemplate(copy.progress.completion, { done: metrics.completedSteps, total: SEPSIS_PROGRESS_TASKS.length });
  if (noteInputEl && noteInputEl.value !== sepsisState.note) {
    noteInputEl.value = sepsisState.note || "";
  }
  if (filterBtnEl) {
    filterBtnEl.textContent = `${sepsisFilterMode === "all" ? copy.progress.all : sepsisFilterMode === "pending" ? copy.progress.pending : copy.progress.done} ▼`;
  }
  if (timelineStartTimeEl) timelineStartTimeEl.textContent = startDate ? startDate.toLocaleTimeString(currentLanguage === "en" ? "en-US" : "th-TH", { hour: "2-digit", minute: "2-digit" }) : "-";
  if (timelineStartDateEl) timelineStartDateEl.textContent = startDate ? formatDateThai(sepsisState.startDateTime) : copy.timeline.notSet;
  if (timelineConsultTimeEl) timelineConsultTimeEl.textContent = formatTimeDisplay(sepsisState.consultTime || "");
  if (consultToggleEl) {
    const isDone = Boolean(sepsisState.consultTime);
    consultToggleEl.classList.toggle("done", isDone);
    consultToggleEl.classList.toggle("pending", !isDone);
    consultToggleEl.innerHTML = isDone ? "&#10003;" : "";
    consultToggleEl.setAttribute("aria-pressed", isDone ? "true" : "false");
    consultToggleEl.setAttribute("title", isDone ? copy.consult.doneTitle : copy.consult.pendingTitle);
  }
  if (timelineConsultOffsetEl) {
    if (startDate && sepsisState.consultTime) {
      const consultDate = getDateTimeFromStartAndTime(startDate, sepsisState.consultTime);
      const diff = consultDate ? Math.max(0, Math.round((consultDate.getTime() - startDate.getTime()) / 60000)) : 0;
      timelineConsultOffsetEl.textContent = `${diff} ${minuteUnit}`;
    } else {
      timelineConsultOffsetEl.textContent = copy.timeline.pending;
    }
  }

  SEPSIS_PROGRESS_TASKS.forEach((step, index) => {
    const label = getSepsisActionLabel(step);
    const resolvedStep = step && !Number.isNaN(Number(step)) ? Number(step) : step;
    const task = typeof resolvedStep === "number" ? sepsisState.tasks[resolvedStep] : null;
    const done = isSepsisStepDone(resolvedStep, sepsisState);
    const timeValue = getSepsisStepTime(resolvedStep, sepsisState);
    const article = document.querySelector(`[data-sepsis-step="${step}"]`);
    const timeInput = document.querySelector(`[data-sepsis-time="${step}"]`);
    const timeDisplayInput = document.querySelector(`[data-sepsis-time-display="${step}"]`);
    const toggleButton = document.querySelector(`[data-sepsis-toggle="${step}"]`);
    const timelineItem = document.querySelector(`[data-sepsis-timeline="${step}"]`);
    const timelineTime = document.getElementById(`sepsisTimelineTime${step}`);
    const timelineOffset = document.getElementById(`sepsisTimelineOffset${step}`);

    if (article) {
      article.style.order = String(index + 1);
      const numberEl = article.querySelector(".sepsis-action-number");
      if (numberEl) numberEl.textContent = String(index + 1);
      article.classList.toggle("done", done);
      article.classList.toggle("pending", !done);
      const shouldHide = (sepsisFilterMode === "done" && !done) || (sepsisFilterMode === "pending" && done);
      article.hidden = shouldHide;
    }
    if (timeInput) {
      timeInput.value = timeValue;
    }
    if (timeDisplayInput) {
      timeDisplayInput.value = timeValue;
    }
    if (toggleButton) {
      toggleButton.classList.toggle("done", done);
      toggleButton.classList.toggle("pending", !done);
      toggleButton.innerHTML = done ? "&#10003;" : "";
      toggleButton.setAttribute("aria-pressed", done ? "true" : "false");
      toggleButton.setAttribute("title", `${label} ${done ? copy.progress.done : copy.progress.pending}`);
    }
    if (timelineItem) {
      timelineItem.style.order = String(index + 1);
      timelineItem.hidden = SEPSIS_CHECK_ONLY_STEPS.has(resolvedStep);
    }
    if (timelineTime) {
      timelineTime.textContent = formatTimeDisplay(timeValue);
    }
    if (timelineOffset) {
      const taskDate = typeof resolvedStep === "number" ? getTaskDateTime(resolvedStep) : getDateTimeFromStartAndTime(startDate, sepsisState.consultTime);
      if (done && taskDate && startDate) {
        const diff = Math.max(0, Math.round((taskDate.getTime() - startDate.getTime()) / 60000));
        timelineOffset.textContent = `${diff} ${minuteUnit}`;
      } else if (done || timeValue) {
        timelineOffset.textContent = copy.progress.done;
      } else {
        timelineOffset.textContent = copy.timeline.pending;
      }
    }
  });
  renderSepsisCurrentCaseSummary();
}

function setupSepsisProtocol() {
  sepsisStore = readSepsisStore();
  syncSepsisCasesWithHistory();
  sepsisState = normalizeSepsisCase(getActiveSepsisCase() || createDefaultSepsisState());
  ensureSepsisCaseModalMounted();
  renderSepsisProtocol();
  renderSepsisCaseList();
  renderSepsisCurrentCaseSummary();

  const patientHnInputEl = document.getElementById("sepsisPatientHnInput");
  const consultTimeEl = document.getElementById("sepsisConsultTime");
  const consultToggleEl = document.getElementById("sepsisConsultToggle");
  const lactateValueEl = document.getElementById("sepsisLactateValue");
  const loadBtn = document.getElementById("sepsisLoadFromAssessmentBtn");
  const saveBtn = document.getElementById("sepsisSaveBtn");
  const saveBtnModal = document.getElementById("sepsisNewCaseBtnModal");
  const noteInput = document.getElementById("sepsisNoteInput");
  const filterBtn = document.getElementById("sepsisFilterBtn");
  const newCaseBtn = document.getElementById("sepsisNewCaseBtn");
  const openCaseModalBtn = document.getElementById("sepsisOpenCaseModalBtn");
  const deleteCurrentCaseBtn = document.getElementById("sepsisDeleteCurrentCaseBtn");

  patientHnInputEl?.addEventListener("input", async () => {
    const nextHn = sanitizeHN(patientHnInputEl.value);
    patientHnInputEl.value = nextHn;

    const lookupToken = ++sepsisHnLookupToken;
    const matchedHistoryItem = await lookupSepsisHistoryByHn(nextHn);
    if (lookupToken !== sepsisHnLookupToken) return;
    if (matchedHistoryItem) {
      hydrateSepsisFromHistoryItem(matchedHistoryItem);
    } else if (!sepsisState.caseId) {
      sepsisHnSearchDraft = nextHn;
      renderSepsisProtocol();
    }
  });

  consultTimeEl?.addEventListener("input", () => {
    sepsisState.consultTime = normalizeClockTime(consultTimeEl.value);
    persistSepsisState();
    renderSepsisProtocol();
  });

  consultToggleEl?.addEventListener("click", toggleSepsisConsultTime);

  lactateValueEl?.addEventListener("input", () => {
    sepsisState.lactateValue = lactateValueEl.value;
    persistSepsisState();
  });

  document.querySelectorAll("[data-sepsis-triage]").forEach(button => {
    button.addEventListener("click", () => {
      const nextValue = button.getAttribute("data-sepsis-triage") || "";
      sepsisState.triage = sepsisState.triage === nextValue ? "" : nextValue;
      persistSepsisState();
      renderSepsisProtocol();
    });
  });

  document.querySelectorAll("[data-sepsis-infection]").forEach(button => {
    button.addEventListener("click", () => {
      const nextValue = button.getAttribute("data-sepsis-infection") || "";
      sepsisState.infectionSource = sepsisState.infectionSource === nextValue ? "" : nextValue;
      persistSepsisState();
      renderSepsisProtocol();
    });
  });

  document.querySelectorAll("[data-sepsis-disposition]").forEach(button => {
    button.addEventListener("click", () => {
      const nextValue = button.getAttribute("data-sepsis-disposition") || "";
      sepsisState.disposition = sepsisState.disposition === nextValue ? "" : nextValue;
      persistSepsisState();
      renderSepsisProtocol();
    });
  });

  loadBtn?.addEventListener("click", hydrateSepsisFromAssessment);
  saveBtn?.addEventListener("click", saveSepsisProtocol);
  newCaseBtn?.addEventListener("click", createNewSepsisCaseFromCurrentContext);
  saveBtnModal?.addEventListener("click", createNewSepsisCaseFromCurrentContext);
  deleteCurrentCaseBtn?.addEventListener("click", () => {
    if (!sepsisState?.caseId) {
      setSepsisStatus(sepsisCopy().currentCase.deleteCurrentMissing, "info");
      return;
    }
    deleteSepsisCase(sepsisState.caseId);
  });
  openCaseModalBtn?.addEventListener("click", event => {
    event.preventDefault();
    openSepsisCaseModal();
  });
  noteInput?.addEventListener("input", () => {
    sepsisState.note = noteInput.value;
    persistSepsisState();
    setSepsisStatus(sepsisCopy().statuses.noteSaved, "info");
  });
  filterBtn?.addEventListener("click", cycleSepsisFilter);

  document.querySelectorAll("[data-sepsis-type]").forEach(card => {
    card.addEventListener("click", () => {
      setSepsisType(card.getAttribute("data-sepsis-type") || "sepsis");
    });
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setSepsisType(card.getAttribute("data-sepsis-type") || "sepsis");
      }
    });
  });

  document.querySelectorAll("[data-sepsis-time]").forEach(input => {
    const commitTimeInput = () => {
      const rawStep = input.getAttribute("data-sepsis-time");
      const step = rawStep && !Number.isNaN(Number(rawStep)) ? Number(rawStep) : rawStep;
      const completedValue = completeClockTimeDraft(input.value);
      const nextValue = isCompleteClockTime(completedValue) ? completedValue : "";
      input.value = nextValue;
      setSepsisTaskTime(step, nextValue);
    };

    input.value = formatClockTimeDraft(input.value);
    input.addEventListener("input", () => {
      input.value = formatClockTimeDraft(input.value);
    });
    input.addEventListener("change", commitTimeInput);
    input.addEventListener("blur", commitTimeInput);
    input.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        input.blur();
      }
    });
  });

  document.querySelectorAll("[data-sepsis-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      const rawStep = button.getAttribute("data-sepsis-toggle");
      const step = rawStep && !Number.isNaN(Number(rawStep)) ? Number(rawStep) : rawStep;
      toggleSepsisTask(step);
    });
  });

  document.getElementById("sepsisGoNewsBtn")?.addEventListener("click", event => {
    event.preventDefault();
    goToNewsAssessmentFromSepsisHn();
  });

  document.getElementById("sepsisCaseList")?.addEventListener("click", event => {
    const openButton = event.target.closest("[data-sepsis-open-case]");
    if (!openButton) return;
    loadSepsisCase(openButton.getAttribute("data-sepsis-open-case") || "");
  });

  document.getElementById("sepsisCaseList")?.addEventListener("click", event => {
    const deleteButton = event.target.closest("[data-sepsis-delete-case]");
    if (!deleteButton) return;
    deleteSepsisCase(deleteButton.getAttribute("data-sepsis-delete-case") || "");
  });

  if (sepsisTimer) {
    window.clearInterval(sepsisTimer);
  }
  sepsisTimer = window.setInterval(() => {
    if (currentAppView === "sepsis") {
      renderSepsisProtocol();
    }
  }, 60000);
}

function readAdminAuth() {
  try {
    const raw = localStorage.getItem(ADMIN_AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.token) return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistAdminAuth(auth) {
  adminAuth = auth && auth.token ? auth : null;
  if (adminAuth) {
    localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(adminAuth));
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
  updateAdminUI();
}

function updateAppNavigationState(view) {
  selectors.appNavItems.forEach(item => {
    item.classList.toggle("active", item.dataset.appView === view);
  });
}

function updateDesktopViewCopy(view) {
  if (!selectors.desktopViewTitle || !selectors.desktopViewSubtitle) return;
  const viewCopy = pageText().desktopViews;
  const nextCopy = viewCopy[view] || viewCopy.home;
  selectors.desktopViewTitle.textContent = nextCopy[0];
  selectors.desktopViewSubtitle.textContent = view === "sepsis"
    ? (currentLanguage === "en"
      ? `Track Sepsis 6 within ${getSepsisTargetHoursLabel(sepsisState.type)} with key times and care tasks`
      : `ติดตาม Sepsis 6 ภายใน ${getSepsisTargetHoursLabel(sepsisState.type)} พร้อมเวลาสำคัญและรายการดำเนินการ`)
    : nextCopy[1];
}

function updatePrototypeVisibility(view) {
  if (!selectors.prototypeBoard) return;
  const showPrototypeBoard = view === "more";
  selectors.prototypeBoard.hidden = !showPrototypeBoard;
  selectors.prototypeGroups.forEach(item => {
    const groups = (item.dataset.prototypeGroup || "").split(/\s+/).filter(Boolean);
    item.hidden = !showPrototypeBoard || !groups.includes(view);
  });
}

function updateMobileSaveBarVisibility(view) {
  if (!selectors.mobileSaveBar) return;
  selectors.mobileSaveBar.classList.toggle("is-hidden", view !== "assessment");
}

function ensureKnowledgeImageModalMounted() {
  const modalEl = document.getElementById("knowledgeImageModal");
  if (!modalEl) return null;
  if (modalEl.parentElement !== document.body) {
    document.body.appendChild(modalEl);
  }
  return modalEl;
}

function getKnowledgeImageFilename(imageSrc = "") {
  const rawName = imageSrc.split("/").pop() || "knowledge-image.png";
  try {
    return decodeURIComponent(rawName);
  } catch {
    return rawName;
  }
}

async function downloadKnowledgeImage(event) {
  event.preventDefault();
  const link = event.currentTarget;
  const imageSrc = link?.getAttribute("href") || selectors.knowledgeModalImage?.getAttribute("src") || "";
  if (!imageSrc || imageSrc === "#") return;

  const filename = getKnowledgeImageFilename(imageSrc);
  const previousLabel = link.textContent;
  link.setAttribute("aria-busy", "true");
  link.textContent = "...";

  try {
    if (window.showSaveFilePicker) {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{
          description: "PNG image",
          accept: { "image/png": [".png"] }
        }]
      });
      const response = await fetch(imageSrc, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
      const blob = await response.blob();
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    } else {
      const response = await fetch(imageSrc, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Image download failed: ${response.status}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = blobUrl;
      downloadLink.download = filename;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    }
  } catch (error) {
    console.error(error);
    if (error.name === "AbortError") return;
    const downloadLink = document.createElement("a");
    downloadLink.href = imageSrc;
    downloadLink.download = filename;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
  } finally {
    link.removeAttribute("aria-busy");
    link.textContent = previousLabel || "\u21e9";
  }
}

function setKnowledgeImageZoom(nextZoom) {
  knowledgeImageZoom = Math.min(3, Math.max(0.5, nextZoom));
  if (selectors.knowledgeModalImage) {
    selectors.knowledgeModalImage.style.setProperty("--knowledge-zoom", String(knowledgeImageZoom));
  }
  if (selectors.knowledgeZoomResetBtn) {
    selectors.knowledgeZoomResetBtn.textContent = `${Math.round(knowledgeImageZoom * 100)}%`;
  }
  if (selectors.knowledgeZoomOutBtn) {
    selectors.knowledgeZoomOutBtn.disabled = knowledgeImageZoom <= 0.5;
  }
  if (selectors.knowledgeZoomInBtn) {
    selectors.knowledgeZoomInBtn.disabled = knowledgeImageZoom >= 3;
  }
}

function openKnowledgeImage(button) {
  const modalEl = ensureKnowledgeImageModalMounted();
  if (!button || !modalEl || !selectors.knowledgeModalImage || typeof bootstrap === "undefined") return;
  const imageSrc = button.getAttribute("data-knowledge-image") || "";
  const title = button.getAttribute("data-knowledge-title") || button.textContent.trim() || "Knowledge";
  if (!imageSrc) return;
  if (selectors.knowledgeImageModalLabel) {
    selectors.knowledgeImageModalLabel.textContent = title;
  }
  selectors.knowledgeModalImage.src = imageSrc;
  selectors.knowledgeModalImage.alt = title;
  if (selectors.knowledgeDownloadImageLink) {
    selectors.knowledgeDownloadImageLink.href = imageSrc;
    selectors.knowledgeDownloadImageLink.download = getKnowledgeImageFilename(imageSrc);
  }
  if (selectors.knowledgeModalViewport) {
    selectors.knowledgeModalViewport.scrollTop = 0;
    selectors.knowledgeModalViewport.scrollLeft = 0;
  }
  setKnowledgeImageZoom(1);
  modalEl.style.zIndex = "2020";
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function setElementHiddenState(element, isHidden) {
  if (!element) return;
  element.hidden = isHidden;
  if (isHidden) {
    element.setAttribute("hidden", "");
  } else {
    element.removeAttribute("hidden");
  }
}

function setAppView(view, options = {}) {
  const { scrollToTop = true } = options;
  currentAppView = view;

  setElementHiddenState(selectors.homeView, view !== "home");
  setElementHiddenState(selectors.assessmentView, view !== "assessment");
  setElementHiddenState(selectors.historyView, view !== "history");
  setElementHiddenState(selectors.dashboardView, view !== "dashboard");
  setElementHiddenState(selectors.sepsisView, view !== "sepsis");
  setElementHiddenState(selectors.smartEvaluationView, view !== "evaluation");
  setElementHiddenState(selectors.knowledgeView, view !== "knowledge");

  updatePrototypeVisibility(view);
  updateMobileSaveBarVisibility(view);
  setElementHiddenState(selectors.desktopAppTopbar, view === "home");
  updateAppNavigationState(view);
  updateDesktopViewCopy(view);
  if (view === "sepsis") {
    renderSepsisProtocol();
  }
  if (view === "dashboard") {
    renderDashboard();
    refreshDashboard({ silent: true });
  }
  if (view === "evaluation") {
    renderSmartEvaluation();
  }
  syncPanelHeights();

  if (scrollToTop) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function isAdminLoggedIn() {
  return Boolean(adminAuth && adminAuth.token && (!adminAuth.expiresAt || Date.now() < adminAuth.expiresAt));
}

function setDefaultAssessmentTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  selectors.assessmentTime.value = now.toISOString().slice(0, 16);
}

function getTodayDateValue() {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 10);
}

function setDefaultHistoryDate() {
  if (!selectors.historyFilterDate) return;
  selectors.historyFilterDate.value = getTodayDateValue();
}

function getHistoryLevelOptions(copy = t()) {
  return [
    { value: "", label: copy.historyFilterAllOption },
    { value: "Normal", label: copy.levelLabels.Normal },
    { value: "Low", label: copy.levelLabels.Low },
    { value: "Urgent", label: copy.levelLabels.Urgent },
    { value: "Emergent", label: copy.levelLabels.Emergent }
  ];
}

function populateHistoryFilterOptions() {
  const copy = t();
  const selectedLocation = selectors.historyFilterLocation?.value || "";
  const selectedLevel = selectors.historyFilterLevel?.value || "";
  const selectedRed = selectors.historyFilterRed?.value || "";

  if (selectors.historyFilterLocation) {
    selectors.historyFilterLocation.innerHTML = [
      { value: "", label: copy.historyFilterAllOption },
      { value: "OPD", label: "OPD" },
      { value: "Ward", label: "Ward" },
      { value: "ER", label: "ER" },
      { value: "ICU", label: "ICU" }
    ].map(option => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("");
    selectors.historyFilterLocation.value = selectedLocation;
  }

  if (selectors.historyFilterLevel) {
    selectors.historyFilterLevel.innerHTML = getHistoryLevelOptions(copy)
      .map(option => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
      .join("");
    selectors.historyFilterLevel.value = selectedLevel;
  }

  if (selectors.historyFilterRed) {
    selectors.historyFilterRed.innerHTML = [
      { value: "", label: copy.historyFilterAllOption },
      { value: "true", label: copy.historyFilterRedOnly },
      { value: "false", label: copy.historyFilterRedNone }
    ].map(option => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join("");
    selectors.historyFilterRed.value = selectedRed;
  }
}

function sanitizeHN(value) {
  return String(value).replace(/\D/g, "").slice(0, 9);
}

function sanitizeAge(value) {
  return String(value).replace(/\D/g, "").slice(0, 3);
}

function normalizeGender(value) {
  const normalized = String(value || "").trim().toLowerCase();
  if (["male", "m", "man", "boy", "ชาย"].includes(normalized)) return "male";
  if (["female", "f", "woman", "girl", "หญิง"].includes(normalized)) return "female";
  return "";
}

function getInfectionSourceRecordValue(item = {}) {
  return item.infectionSource
    || item.foundOrSuspectedSourceOfInfection
    || item["Found or suspected source of infection (ex. Respiratory system, urinary tract infection, intra-abdominal infection, others)"]
    || item["พบ หรือ สงสัยแหล่งติดเชื้อ (เช่น ระบบทางเดินหายใจ, การติดเชื้อทางเดินปัสสาวะ, การติดเชื้อในช่องท้อง, อื่นๆ)"]
    || "";
}

function getSepsisSexValueFromHistory(value) {
  const normalized = normalizeGender(value);
  if (normalized === "male") return "ชาย";
  if (normalized === "female") return "หญิง";
  return "";
}

function syncLocationButtons() {
  const selectedLocation = selectors.location.value;
  document.querySelectorAll(".location-option").forEach(button => {
    button.classList.toggle("active", button.dataset.location === selectedLocation);
  });
}

function setLocation(value) {
  selectors.location.value = value;
  syncLocationButtons();
  if (validationActive) updateAssessmentValidation(true);
}

function setFormLocked(locked) {
  historyFormLocked = Boolean(locked);

  selectors.assessmentTime.toggleAttribute("disabled", historyFormLocked);
  selectors.hn.toggleAttribute("disabled", historyFormLocked);
  selectors.gender?.toggleAttribute("disabled", historyFormLocked);
  selectors.age?.toggleAttribute("disabled", historyFormLocked);
  document.querySelectorAll(".spo2-scale").forEach(input => {
    input.disabled = historyFormLocked;
  });
  document.querySelectorAll(".metric-option-button").forEach(button => {
    button.toggleAttribute("disabled", historyFormLocked);
  });
  document.querySelectorAll(".location-option").forEach(button => {
    button.toggleAttribute("disabled", historyFormLocked);
  });

  selectors.saveBtn.toggleAttribute("disabled", historyFormLocked);
  selectors.mobileSaveBtn?.toggleAttribute("disabled", historyFormLocked);
  selectors.assessmentCard?.classList.toggle("history-locked", historyFormLocked);
}

function formatExampleSuffix(text) {
  const value = String(text || "");
  const match = value.match(/^(.*?)(\s*\([^()]+\))$/);

  if (!match) {
    return escapeHtml(value);
  }

  const mainText = match[1].trimEnd();
  const suffix = match[2].trimStart();
  return `${escapeHtml(mainText)} <span class="example-note">${escapeHtml(suffix)}</span>`;
}

function setElementText(selector, text) {
  document.querySelectorAll(selector).forEach(element => {
    element.textContent = text;
  });
}

function setElementAttribute(selector, attribute, value) {
  document.querySelectorAll(selector).forEach(element => {
    element.setAttribute(attribute, value);
  });
}

function applyStaticTranslations() {
  const copy = t();
  const page = pageText();
  document.documentElement.lang = copy.htmlLang;
  document.title = "Golden Jubilee Medical Center";

  const heroBadge = document.getElementById("heroBadge");
  if (heroBadge) {
    heroBadge.textContent = copy.heroBadge;
  }
  document.getElementById("heroSubtitleLine1").textContent = copy.heroSubtitleLine1;
  document.getElementById("heroSubtitleLine2").textContent = copy.heroSubtitleLine2;
  selectors.installBtn.textContent = copy.installApp;
  if (selectors.resetBtnTop) selectors.resetBtnTop.textContent = copy.resetAll;
  document.getElementById("assessmentSectionTitle").textContent = copy.assessmentSectionTitle;
  document.getElementById("assessmentSectionSubtitle").textContent = copy.assessmentSectionSubtitle;
  document.getElementById("assessmentTimeLabel").textContent = copy.assessmentTimeLabel;
  document.getElementById("locationLabel").textContent = copy.locationLabel;
  document.getElementById("hnLabel").textContent = copy.hnLabel;
  selectors.hn.placeholder = copy.hnPlaceholder;
  document.getElementById("genderLabel").textContent = copy.genderLabel;
  document.getElementById("ageLabel").textContent = copy.ageLabel;
  if (selectors.age) selectors.age.placeholder = copy.agePlaceholder;
  if (selectors.gender) {
    const genderOptions = selectors.gender.options;
    if (genderOptions[0]) genderOptions[0].textContent = copy.genderPlaceholder;
    if (genderOptions[1]) genderOptions[1].textContent = copy.genderMale;
    if (genderOptions[2]) genderOptions[2].textContent = copy.genderFemale;
  }
  document.getElementById("metricSectionTitle").textContent = copy.metricSectionTitle;
  document.getElementById("metricSectionSubtitle").textContent = copy.metricSectionSubtitle;
  document.getElementById("metricSectionHint").textContent = copy.metricSectionHint;
  document.getElementById("metricTitleRespiratoryRate").textContent = copy.metricTitles.respiratoryRate;
  document.getElementById("metricTitleSpo2").innerHTML = formatExampleSuffix(copy.metricTitles.spo2);
  document.getElementById("metricTitleOxygenSupport").textContent = copy.metricTitles.oxygenSupport;
  document.getElementById("metricTitleTemperature").textContent = copy.metricTitles.temperature;
  document.getElementById("metricTitleSystolicBP").textContent = copy.metricTitles.systolicBP;
  document.getElementById("metricTitleHeartRate").textContent = copy.metricTitles.heartRate;
  document.getElementById("metricTitleConsciousness").textContent = copy.metricTitles.consciousness;
  if (document.getElementById("metricTitleInfectionSource")) {
    document.getElementById("metricTitleInfectionSource").textContent = copy.metricTitles.infectionSource;
  }
  document.getElementById("scale1Label").textContent = copy.scaleLabels[1];
  document.getElementById("scale2Label").innerHTML = formatExampleSuffix(copy.scaleLabels[2]);
  document.getElementById("historySectionTitle").textContent = copy.historySectionTitle;
  document.getElementById("historySectionSubtitle").textContent = copy.historySectionSubtitle;
  selectors.clearHistoryBtn.textContent = copy.clearHistory;
  if (selectors.refreshHistoryBtn) selectors.refreshHistoryBtn.textContent = copy.historyRefresh;
  if (selectors.resetHistoryFiltersBtn) selectors.resetHistoryFiltersBtn.textContent = copy.historyResetFilters;
  if (document.getElementById("historyFilterDateLabel")) document.getElementById("historyFilterDateLabel").textContent = copy.historyFilterDateLabel;
  if (document.getElementById("historyFilterHnLabel")) document.getElementById("historyFilterHnLabel").textContent = copy.historyFilterHnLabel;
  if (document.getElementById("historyFilterLocationLabel")) document.getElementById("historyFilterLocationLabel").textContent = copy.historyFilterLocationLabel;
  if (document.getElementById("historyFilterLevelLabel")) document.getElementById("historyFilterLevelLabel").textContent = copy.historyFilterLevelLabel;
  if (document.getElementById("historyFilterRedLabel")) document.getElementById("historyFilterRedLabel").textContent = copy.historyFilterRedLabel;
  if (selectors.historyFilterHn) selectors.historyFilterHn.placeholder = copy.historyFilterHnPlaceholder;
  populateHistoryFilterOptions();
  document.getElementById("historyHeadLocation").textContent = copy.historyHeadLocation;
  document.getElementById("historyHeadHn").textContent = copy.historyHeadHn;
  document.getElementById("historyHeadScore").textContent = copy.historyHeadScore;
  document.getElementById("historyHeadLevel").textContent = copy.historyHeadLevel;
  document.getElementById("historyHeadTime").textContent = copy.historyHeadTime;
  if (document.getElementById("historyHeadAction")) document.getElementById("historyHeadAction").textContent = copy.historyHeadAction;
  if (selectors.toggleAdminLoginBtn) selectors.toggleAdminLoginBtn.textContent = copy.adminLoginToggle;
  if (selectors.adminLogoutBtn) selectors.adminLogoutBtn.textContent = copy.adminLogout;
  if (document.getElementById("adminUsernameLabel")) document.getElementById("adminUsernameLabel").textContent = copy.adminUsernameLabel;
  if (document.getElementById("adminPasswordLabel")) document.getElementById("adminPasswordLabel").textContent = copy.adminPasswordLabel;
  if (selectors.adminLoginBtn) selectors.adminLoginBtn.textContent = copy.adminLoginBtn;
  document.getElementById("resultSectionTitle").textContent = copy.resultSectionTitle;
  document.getElementById("resultSectionSubtitle").textContent = copy.resultSectionSubtitle;
  document.getElementById("totalScoreLabel").textContent = copy.totalScoreLabel;
  document.getElementById("urgencyLabelTitle").textContent = copy.urgencyLabelTitle;
  document.getElementById("redFlagTitle").textContent = copy.redFlagTitle;
  if (selectors.infectionAlertKicker) selectors.infectionAlertKicker.textContent = copy.infectionAlertKicker;
  if (selectors.infectionAlertTitle) selectors.infectionAlertTitle.textContent = copy.infectionAlertTitle;
  if (selectors.infectionAlertText) selectors.infectionAlertText.textContent = copy.infectionAlertText;
  selectors.saveBtn.textContent = copy.saveBtn;
  selectors.resetBtn.textContent = copy.resetBtn;
  if (selectors.mobileSaveBtn) selectors.mobileSaveBtn.textContent = copy.saveBtn;
  if (selectors.mobileResetBtn) selectors.mobileResetBtn.textContent = copy.resetBtn;
  if (selectors.metricProgressLabel) selectors.metricProgressLabel.textContent = currentLanguage === "th" ? "ความคืบหน้า NEWS" : "NEWS Progress";
  if (selectors.mobileSaveHint) selectors.mobileSaveHint.textContent = currentLanguage === "th" ? "พร้อมบันทึก" : "Ready to save";
  document.getElementById("adviceSectionTitle").textContent = copy.adviceSectionTitle;
  selectors.langThBtn?.classList.toggle("active", currentLanguage === "th");
  selectors.langEnBtn?.classList.toggle("active", currentLanguage === "en");
  selectors.languageButtons.forEach(button => {
    const language = button.dataset.language || "th";
    button.classList.toggle("active", language === currentLanguage);
    button.textContent = language === "th" ? page.languageTh : page.languageEn;
  });

  Object.entries(page.desktopNav).forEach(([view, label]) => {
    document.querySelectorAll(`[data-app-view="${view}"] span:last-child`).forEach(navLabel => {
      navLabel.textContent = label;
    });
  });

  setElementText(".desktop-app-brand p", page.appTagline);
  setElementText("#homeSmartTitle", page.home.title);
  setElementText("#homeView .home-smart-brand p", page.appTagline);
  setElementText("#homeView .home-welcome-copy h2", page.home.welcome);
  setElementText("#homeView .home-welcome-copy strong", page.appTagline);
  setElementText("#homeFollowTitle", page.home.latest);
  setElementText("#homeView .home-follow-head button", page.home.viewAll);
  setElementText("#homeView .home-sepsis-cta h2", page.home.suspected);
  setElementText("#homeView .home-sepsis-cta p", page.home.suspectedText);
  setElementText("#homeView .home-sepsis-cta button", page.home.start);
  setElementText("#homeClockDate", page.home.today);
  setElementText('#homeView [data-nav-view="assessment"] strong', page.home.menuAssessment);
  setElementText('#homeView [data-nav-view="dashboard"] strong', page.home.menuDashboard);
  setElementText('#homeView [data-nav-view="dashboard"] small', page.home.menuDashboardSub);
  setElementText('#homeView [data-nav-view="sepsis"] strong', page.home.menuSepsis);
  setElementText('#homeView [data-nav-view="sepsis"] small', page.home.menuSepsisSub);
  setElementText('#homeView [data-nav-view="knowledge"] strong', page.home.menuKnowledge);
  setElementText('#homeView [data-nav-view="knowledge"] small', page.home.menuKnowledgeSub);
  setElementText('#homeView [data-nav-view="evaluation"] strong', page.home.menuEvaluation);

  setElementText("#dashboardView .dashboard-topbar h2", page.dashboard.title);
  setElementText("#dashboardView .dashboard-topbar p", page.dashboard.subtitle);
  setElementText("#dashboardView .dashboard-filter-panel label:nth-child(1) span", page.dashboard.date);
  setElementText("#dashboardView .dashboard-filter-panel label:nth-child(2) span", page.dashboard.location);
  setElementText("#dashboardRefreshBtn", page.dashboard.refresh);
  setElementText("#dashboardView .dashboard-highlight-card:nth-child(1) div > span", page.dashboard.summarySepsis);
  setElementText("#dashboardView .dashboard-highlight-card:nth-child(1) small", page.dashboard.caseUnit);
  setElementText("#dashboardView .dashboard-highlight-card:nth-child(2) div > span", page.dashboard.summaryAtb3h);
  setElementText("#dashboardView .dashboard-highlight-card:nth-child(3) div > span", page.dashboard.summarySevereAtb1h);
  setElementText("#dashboardView .dashboard-source-panel .dashboard-panel-head h3", page.dashboard.sourceTitle);
  setElementText("#dashboardView .dashboard-trend-panel .dashboard-panel-head h3", page.dashboard.trendTitle);
  setElementText("#dashboardView .dashboard-grid .dashboard-panel:nth-child(1) .dashboard-panel-head h3", page.dashboard.qualityTitle);
  setElementText("#dashboardView .dashboard-grid .dashboard-panel:nth-child(2) .dashboard-panel-head h3", page.dashboard.riskTitle);
  setElementText('[data-dashboard-metric="sepsisCount"]', page.dashboard.metricSepsisCount);
  setElementText('[data-dashboard-range="7"]', page.dashboard.range7);
  setElementText('[data-dashboard-range="30"]', page.dashboard.range30);
  setElementText('[data-dashboard-range="90"]', page.dashboard.range90);
  setElementText('[data-dashboard-range="365"]', page.dashboard.range365);

  setElementText("#smartEvaluationView .smart-evaluation-kicker", page.evaluation.kicker);
  setElementText("#smartEvaluationView .smart-evaluation-hero h2", page.evaluation.title);
  setElementText("#smartEvaluationView .smart-evaluation-hero p", page.evaluation.subtitle);
  setElementText("#smartEvaluationView .smart-evaluation-card:nth-of-type(1) h3", page.evaluation.section1);
  setElementText("#smartEvaluationView .smart-evaluation-card:nth-of-type(1) p", page.evaluation.section1Hint);
  setElementText("#smartEvaluationView fieldset:nth-child(1) legend", page.evaluation.position);
  setElementText('#smartEvaluationView [name="position"][value="พยาบาลวิชาชีพ"] + span', page.evaluation.nurse);
  setElementText('#smartEvaluationView [name="position"][value="ผู้ช่วยพยาบาล"] + span', page.evaluation.assistant);
  setElementText('#smartEvaluationView [name="position"][value="อื่นๆ"] + span', page.evaluation.other);
  setElementText("#smartEvaluationView fieldset:nth-child(2) legend", page.evaluation.experience);
  setElementText('#smartEvaluationView [name="experience"][value="น้อยกว่า 1 ปี"] + span', page.evaluation.expUnder1);
  setElementText('#smartEvaluationView [name="experience"][value="1-5 ปี"] + span', page.evaluation.exp1to5);
  setElementText('#smartEvaluationView [name="experience"][value="มากกว่า 5 ปี"] + span', page.evaluation.expOver5);
  setElementText("#smartEvaluationView .smart-evaluation-card:nth-of-type(2) h3", page.evaluation.section2);
  setElementText("#smartEvaluationView .smart-evaluation-card:nth-of-type(2) p", page.evaluation.scoreHint);
  setElementText("#smartEvaluationView .smart-evaluation-card:nth-of-type(3) h3", page.evaluation.section3);
  setElementText("#smartEvaluationView .smart-evaluation-card:nth-of-type(3) p", page.evaluation.section3Hint);
  setElementAttribute("#smartEvaluationSuggestion", "placeholder", page.evaluation.suggestionPlaceholder);
  setElementText("#smartEvaluationResetBtn", page.evaluation.reset);
  setElementText('#smartEvaluationView button[type="submit"]', page.evaluation.submit);
  setElementText("#smartEvaluationThankYouModalLabel", page.evaluation.thankTitle);
  setElementText("#smartEvaluationThankYouModal p", page.evaluation.thankText);
  setElementText("#smartEvaluationThankYouModal button", page.evaluation.ok);

  setElementText("#knowledgeView .prototype-title", page.knowledge.title);
  setElementText("#knowledgeDownloadTitle", page.knowledge.downloadTitle);

  setElementAttribute("#sepsisView .sepsis-icon-button", "aria-label", page.sepsis.backHome);
  setElementText("#sepsisView .sepsis-field:nth-of-type(2) .sepsis-field-label", page.sepsis.age);
  setElementText("#sepsisView .sepsis-field:nth-of-type(3) .sepsis-field-label", page.sepsis.sex);
  setElementText("#sepsisView .sepsis-stat-block:first-child .sepsis-stat-label", page.sepsis.screeningDate);
  setElementText("#sepsisStartDateHint", page.sepsis.fromNews);
  setElementText("#sepsisNewsLevel", page.sepsis.unclassified);
  setElementText("#sepsisView .sepsis-section-head h3 + p", page.sepsis.triageUrgency);
  setElementText("#sepsisSaveBtn", page.sepsis.save);
  setElementAttribute("#sepsisNoteInput", "placeholder", page.sepsis.notePlaceholder);
  applySepsisStaticTranslations();
  updateAdminUI();
}

function setScopedText(rootSelector, selector, text) {
  const root = document.querySelector(rootSelector);
  const element = root?.querySelector(selector);
  if (element) element.textContent = text;
}

function setChoiceCardText(selector, title, subtitle = "") {
  document.querySelectorAll(selector).forEach(card => {
    const titleEl = card.querySelector("strong");
    const subtitleEl = card.querySelector("span:last-child");
    if (titleEl) titleEl.textContent = title;
    if (subtitleEl && subtitle) subtitleEl.textContent = subtitle;
  });
}

function setSepsisActionStaticText(step, title, subtitle) {
  const article = document.querySelector(`[data-sepsis-step="${step}"]`);
  if (!article) return;
  const titleEl = article.querySelector(".sepsis-action-copy strong");
  const subtitleEl = article.querySelector(".sepsis-action-copy span");
  if (titleEl) titleEl.textContent = title;
  if (subtitleEl) subtitleEl.textContent = subtitle;
}

function applySepsisStaticTranslations() {
  const copy = sepsisCopy();
  const targetHoursLabel = getSepsisTargetHoursLabel(sepsisState.type);
  const goldenHour = currentLanguage === "en"
    ? (sepsisState.type === "severe" ? " (Golden Hour)" : "")
    : (sepsisState.type === "severe" ? " (Golden Hour)" : "");

  setElementAttribute("#sepsisPatientHnInput", "placeholder", copy.patient.hnPlaceholder);
  setElementText("#sepsisView .sepsis-field-span-full .sepsis-field-label", copy.patient.location);

  setScopedText('#sepsisView [data-sepsis-triage="Resuscitation"]', "span:last-child", copy.triage.resuscitation);
  setScopedText('#sepsisView [data-sepsis-triage="Emergency"]', "span:last-child", copy.triage.emergency);
  setScopedText('#sepsisView [data-sepsis-triage="Urgency"]', "span:last-child", copy.triage.urgency);
  setScopedText('#sepsisView [data-sepsis-triage="Semi-urgency"]', "span:last-child", copy.triage.semiUrgency);
  setScopedText('#sepsisView [data-sepsis-triage="Non-urgency"]', "span:last-child", copy.triage.nonUrgency);

  setScopedText("#sepsisView .sepsis-consult-card", ".sepsis-consult-copy strong", copy.consult.title);
  setElementAttribute("#sepsisConsultTime", "aria-label", copy.consult.toggleLabel);
  setElementAttribute("#sepsisConsultToggle", "aria-label", copy.consult.toggleLabel);

  const typeSection = document.querySelector('#sepsisView [data-sepsis-type]')?.closest(".sepsis-card");
  if (typeSection) {
    const typeTitle = typeSection.querySelector(".sepsis-section-head h3");
    const typeSubtitle = typeSection.querySelector(".sepsis-section-head p");
    const sepsisTypeText = typeSection.querySelector('[data-sepsis-type="sepsis"] p');
    const severeTypeText = typeSection.querySelector('[data-sepsis-type="severe"] p');
    const helperNote = typeSection.querySelector(".sepsis-helper-note");
    if (typeTitle) typeTitle.textContent = copy.type.title;
    if (typeSubtitle) typeSubtitle.textContent = copy.type.subtitle;
    if (sepsisTypeText) sepsisTypeText.textContent = copy.type.sepsisText;
    if (severeTypeText) severeTypeText.textContent = copy.type.severeText;
    if (helperNote) helperNote.textContent = copy.type.helper;
  }

  const infectionSection = document.querySelector('#sepsisView [data-sepsis-infection]')?.closest(".sepsis-card");
  if (infectionSection) {
    const titleEl = infectionSection.querySelector(".sepsis-section-head h3");
    const subtitleEl = infectionSection.querySelector(".sepsis-section-head p");
    if (titleEl) titleEl.textContent = copy.infection.title;
    if (subtitleEl) subtitleEl.textContent = copy.infection.subtitle;
  }
  setChoiceCardText('[data-sepsis-infection="Respiratory system"]', copy.infection.respiratory);
  setChoiceCardText('[data-sepsis-infection="Urinary tract infection"]', copy.infection.urinary);
  setChoiceCardText('[data-sepsis-infection="Intra-abdominal infection"]', copy.infection.abdominal);
  setChoiceCardText('[data-sepsis-infection="Skin and soft tissue"]', copy.infection.skin);
  setChoiceCardText('[data-sepsis-infection="Unknown source"]', copy.infection.unknown);
  setChoiceCardText('[data-sepsis-infection="Other"]', copy.infection.other);

  const progressSection = document.getElementById("sepsisActionList")?.closest(".sepsis-card");
  if (progressSection) {
    const elapsedLabel = progressSection.querySelector(".sepsis-summary-item:nth-child(1) .sepsis-summary-label");
    const elapsedHint = progressSection.querySelector(".sepsis-summary-item:nth-child(1) small");
    const actionsTitle = progressSection.querySelector(".sepsis-actions-head h4");
    if (elapsedLabel) elapsedLabel.textContent = copy.progress.elapsed;
    if (elapsedHint) elapsedHint.textContent = copy.progress.elapsedHint;
    if (actionsTitle) actionsTitle.textContent = copy.progress.actions;
  }

  SEPSIS_PROGRESS_TASKS.forEach(step => {
    const [title, subtitle] = getSepsisActionCopy(step);
    const resolvedSubtitle = formatTemplate(subtitle, { target: targetHoursLabel, goldenHour });
    setSepsisActionStaticText(step, title, resolvedSubtitle);
    const toggle = document.querySelector(`[data-sepsis-toggle="${step}"]`);
    if (toggle) toggle.setAttribute("aria-label", `${title} ${copy.progress.done}`);
  });

  const dispositionSection = document.querySelector('#sepsisView [data-sepsis-disposition]')?.closest(".sepsis-card");
  if (dispositionSection) {
    const titleEl = dispositionSection.querySelector(".sepsis-section-head h3");
    const subtitleEl = dispositionSection.querySelector(".sepsis-section-head p");
    if (titleEl) titleEl.textContent = copy.disposition.title;
    if (subtitleEl) subtitleEl.textContent = copy.disposition.subtitle;
  }
  setChoiceCardText('[data-sepsis-disposition="Admit Ward"]', "Admit Ward", copy.disposition.admitWard);
  setChoiceCardText('[data-sepsis-disposition="Admit ICU"]', "Admit ICU", copy.disposition.admitIcu);
  setChoiceCardText('[data-sepsis-disposition="Refer"]', "Refer", copy.disposition.refer);
  setChoiceCardText('[data-sepsis-disposition="Discharge"]', "Discharge", copy.disposition.discharge);

  const currentCaseCard = document.querySelector(".sepsis-current-case-card");
  if (currentCaseCard) {
    const titleEl = currentCaseCard.querySelector(".sepsis-section-head h3");
    const subtitleEl = currentCaseCard.querySelector(".sepsis-section-head p");
    if (titleEl) titleEl.textContent = copy.currentCase.title;
    if (subtitleEl) subtitleEl.textContent = copy.currentCase.subtitle;
  }
  setElementText("#sepsisNewCaseBtn", copy.currentCase.chooseHistory);
  setElementText("#sepsisOpenCaseModalBtn", copy.currentCase.viewAll);
  setElementText("#sepsisDeleteCurrentCaseBtn", copy.currentCase.deleteCurrent);

  const timelineCard = document.getElementById("sepsisTimelineGrid")?.closest(".sepsis-card");
  if (timelineCard) {
    const titleEl = timelineCard.querySelector(".sepsis-section-head h3");
    if (titleEl) titleEl.textContent = copy.timeline.title;
  }
  setElementText('#sepsisTimelineGrid [data-sepsis-timeline="consult"] span', copy.timeline.consult);
  setElementText('#sepsisTimelineGrid [data-sepsis-timeline="1"] span', copy.timeline.bloodCulture);
  setElementText('#sepsisTimelineGrid [data-sepsis-timeline="4"] span', copy.timeline.lactate);
  setElementText('#sepsisTimelineGrid [data-sepsis-timeline="5"] span', copy.timeline.fluid);
  setElementText('#sepsisTimelineGrid [data-sepsis-timeline="6"] span', copy.timeline.antibiotic);

  const focusCard = document.querySelector("#sepsisView .sepsis-focus-list")?.closest(".sepsis-card");
  if (focusCard) {
    const titleEl = focusCard.querySelector(".sepsis-section-head h3");
    const subtitleEl = focusCard.querySelector(".sepsis-section-head p");
    if (titleEl) titleEl.textContent = copy.focus.title;
    if (subtitleEl) subtitleEl.textContent = copy.focus.subtitle;
    const items = focusCard.querySelectorAll(".sepsis-focus-item");
    const focusItems = [
      [copy.focus.item1Title, copy.focus.item1Text],
      [copy.focus.item2Title, copy.focus.item2Text],
      [copy.focus.item3Title, copy.focus.item3Text]
    ];
    items.forEach((item, index) => {
      if (!focusItems[index]) return;
      const title = item.querySelector("strong");
      const text = item.querySelector("span");
      if (title) title.textContent = focusItems[index][0];
      if (text) text.textContent = focusItems[index][1];
    });
  }

  setElementText("#sepsisCaseModalLabel", copy.modal.title);
  setElementText("#sepsisCaseModal .sepsis-case-modal-subtitle", copy.modal.subtitle);
  setElementText("#sepsisNewCaseBtnModal", copy.currentCase.chooseHistory);
  setElementText("#sepsisCaseModal .modal-footer button:last-child", copy.modal.close);
}

function updateAdminUI() {
  const copy = t();
  const loggedIn = isAdminLoggedIn();

  selectors.toggleAdminLoginBtn?.classList.toggle("d-none", loggedIn);
  selectors.adminLogoutBtn?.classList.toggle("d-none", !loggedIn);

  if (loggedIn && selectors.adminLoginPanel) {
    selectors.adminLoginPanel.classList.add("d-none");
  }

  if (selectors.adminStatus && loggedIn) {
    selectors.adminStatus.textContent = `${copy.adminLoginSuccess}`;
    selectors.adminStatus.classList.remove("error");
  }

  renderHistory();
}

function renderMetricButtons(containerId, inputId, options) {
  const input = document.getElementById(inputId);
  const container = document.getElementById(containerId);
  const selectedOptionKey = input?.dataset.selectedOptionKey || "";

  if (!input || !container) return;

  const showScore = input.classList.contains("score-input");
  container.innerHTML = options.map((option, index) => {
    const optionKey = `${inputId}-${index}`;
    return `
      <button
        type="button"
        class="btn metric-option-button ${selectedOptionKey === optionKey ? "active" : ""}"
        data-input-target="${inputId}"
        data-option-key="${optionKey}"
        data-score-value="${option.value}"
      >
        <span class="metric-option-text">${escapeHtml(option.label)}</span>
        ${showScore ? `<span class="metric-option-score score-${option.value}">+${option.value}</span>` : ""}
      </button>
    `;
  }).join("");
}

function syncMetricButtons(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const selectedOptionKey = input.dataset.selectedOptionKey || "";

  document.querySelectorAll(`[data-input-target="${inputId}"]`).forEach(button => {
    button.classList.toggle("active", button.dataset.optionKey === selectedOptionKey);
  });
}

function setMetricValue(inputId, value, optionKey = "") {
  const input = document.getElementById(inputId);
  if (!input) return;

  const isSameSelection = input.dataset.selectedOptionKey === optionKey && optionKey !== "";

  input.value = isSameSelection ? "" : value;
  input.dataset.selectedOptionKey = isSameSelection ? "" : optionKey;
  syncMetricButtons(inputId);
  if (isSameSelection && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
  updateUI();
}

function renderSpo2Options(scale = "1") {
  const copy = t();
  const options = copy.metrics.spo2[scale] || copy.metrics.spo2[1];
  const label = document.getElementById("spo2ScaleLabel");
  const selectedOptionKey = selectors.spo2.dataset.selectedOptionKey || "";

  if (label) {
    label.innerHTML = formatExampleSuffix(copy.spo2ScaleDescriptions[scale] || "");
  }

  if (!options.some((_, index) => `spo2-${index}` === selectedOptionKey)) {
    selectors.spo2.value = "";
    selectors.spo2.dataset.selectedOptionKey = "";
  }

  renderMetricButtons("spo2Options", "spo2", options);
}

function renderAllMetricButtons() {
  const copy = t();
  renderMetricButtons("respiratoryRateOptions", "respiratoryRate", copy.metrics.respiratoryRate);
  renderMetricButtons("oxygenSupportOptions", "oxygenSupport", copy.metrics.oxygenSupport);
  renderMetricButtons("temperatureOptions", "temperature", copy.metrics.temperature);
  renderMetricButtons("systolicBPOptions", "systolicBP", copy.metrics.systolicBP);
  renderMetricButtons("heartRateOptions", "heartRate", copy.metrics.heartRate);
  renderMetricButtons("consciousnessOptions", "consciousness", copy.metrics.consciousness);
  renderMetricButtons("infectionSourceOptions", "infectionSource", copy.metrics.infectionSource);
  renderSpo2Options(document.querySelector(".spo2-scale:checked")?.value || "1");
  if (historyFormLocked) setFormLocked(true);
}

function calculateScore() {
  return Array.from(document.querySelectorAll(".score-input")).reduce((sum, el) => {
    return sum + Number.parseInt(el.value || 0, 10);
  }, 0);
}

function getCompletedMetricCount() {
  return Array.from(document.querySelectorAll(".score-input, .tracked-input")).filter(el => (el.value || "").trim() !== "").length;
}

function updateMetricProgress(score) {
  const completed = getCompletedMetricCount();
  const total = document.querySelectorAll(".score-input, .tracked-input").length || 8;
  const ratio = total ? (completed / total) * 100 : 0;
  const progressText = `${completed}/${total}`;

  if (selectors.metricProgressText) selectors.metricProgressText.textContent = progressText;
  if (selectors.metricProgressFill) selectors.metricProgressFill.style.width = `${ratio}%`;
  if (selectors.mobileProgressText) selectors.mobileProgressText.textContent = progressText;
  if (selectors.mobileScore) selectors.mobileScore.textContent = `${score}`;
  if (selectors.mobileSaveBar) {
    selectors.mobileSaveBar.classList.toggle("is-complete", completed === total);
  }
}

function shouldShowInfectionAlert(score) {
  return score >= 5 && selectors.infectionSource?.value === "Yes";
}

function updateInfectionAlert(score) {
  if (!selectors.infectionAlertCard) return;
  selectors.infectionAlertCard.classList.remove(
    "severity-theme-normal",
    "severity-theme-low",
    "severity-theme-urgent",
    "severity-theme-emergent",
    "severity-theme-red"
  );

  if (!shouldShowInfectionAlert(score)) {
    selectors.infectionAlertCard.classList.add("d-none");
    return;
  }

  const levelKey = getRiskLevel(score);
  selectors.infectionAlertCard.classList.add(`severity-theme-${getSeverityTheme(levelKey, false)}`);
  selectors.infectionAlertCard.classList.remove("d-none");
}

function updateAssessmentValidation(showErrors = validationActive) {
  const invalidTime = !selectors.assessmentTime.value;
  const invalidLocation = !selectors.location.value.trim();
  const invalidHn = sanitizeHN(selectors.hn.value).length !== 9;
  const shouldHighlight = Boolean(showErrors);

  selectors.assessmentTime.classList.toggle("field-invalid", shouldHighlight && invalidTime);
  selectors.assessmentTime.setAttribute("aria-invalid", shouldHighlight && invalidTime ? "true" : "false");

  selectors.hn.classList.toggle("field-invalid", shouldHighlight && invalidHn);
  selectors.hn.setAttribute("aria-invalid", shouldHighlight && invalidHn ? "true" : "false");

  if (selectors.locationGroup) {
    selectors.locationGroup.classList.toggle("field-invalid", shouldHighlight && invalidLocation);
  }

  return {
    invalidTime,
    invalidLocation,
    invalidHn,
    hasError: invalidTime || invalidLocation || invalidHn
  };
}

function getRiskLevel(score) {
  if (score >= 7) return "Emergent";
  if (score >= 5) return "Urgent";
  if (score >= 3) return "Low";
  return "Normal";
}

function checkRedFlag() {
  return Array.from(document.querySelectorAll(".score-input")).some(el => Number.parseInt(el.value || 0, 10) === 3);
}

function getUrgencyClass(levelKey) {
  switch (levelKey) {
    case "Emergent": return "critical";
    case "Urgent": return "high";
    case "Low": return "mid";
    default: return "low";
  }
}

function getSeverityTheme(levelKey, red) {
  if (red) return "red";

  switch (levelKey) {
    case "Emergent": return "emergent";
    case "Urgent": return "urgent";
    case "Low": return "low";
    default: return "normal";
  }
}

function updateAdvice(levelKey, red) {
  const copy = t();
  const advice = copy.advice[levelKey] || copy.advice.Normal;
  const adviceTheme = getSeverityTheme(levelKey, false);
  const renderAdviceItems = items => items.map(item => {
    const isUrgencyTriage = /triage/i.test(item) && /urgency/i.test(item);
    return `<li class="${isUrgencyTriage ? "advice-emergency-item" : ""}">${escapeHtml(item)}</li>`;
  }).join("");
  const extra = red ? `
    <div class="advice-card severity-theme-red">
      <h3>${escapeHtml(copy.advice.redTitle)}</h3>
      <ul>
        ${renderAdviceItems(copy.advice.redItems)}
      </ul>
    </div>
  ` : "";

  selectors.adviceBox.innerHTML = `
    <div class="advice-card severity-theme-${adviceTheme}">
      <h3>${escapeHtml(advice.title)}</h3>
      <ul>
        ${renderAdviceItems(advice.items)}
      </ul>
      ${extra}
    </div>
  `;
}

function updateResultPanelState(score, red, levelKey) {
  if (!selectors.resultPanel) return;

  selectors.resultPanel.classList.remove(
    "panel-warning",
    "panel-danger",
    "severity-theme-normal",
    "severity-theme-low",
    "severity-theme-urgent",
    "severity-theme-emergent",
    "severity-theme-red"
  );

  selectors.resultPanel.classList.add(`severity-theme-${getSeverityTheme(levelKey, red)}`);

  if (red || levelKey === "Emergent") {
    selectors.resultPanel.classList.add("panel-danger");
    return;
  }

  if (score >= 5 || levelKey === "Urgent") {
    selectors.resultPanel.classList.add("panel-warning");
  }
}

function updateUI() {
  const copy = t();
  const score = calculateScore();
  const levelKey = getRiskLevel(score);
  const red = checkRedFlag();
  const urgencyClass = getUrgencyClass(levelKey);
  const scoreStateClass = red ? "watch" : score === 0 ? "ready" : "active";

  selectors.totalScore.textContent = score;
  selectors.urgencyLabel.textContent = copy.levelLabels[levelKey];
  selectors.urgencyLabel.className = `status-pill ${urgencyClass}`;
  selectors.redFlag.textContent = red ? copy.redFound : copy.redNotFound;
  selectors.redFlag.className = `status-pill ${red ? "danger" : "neutral"}`;
  selectors.scoreStateTag.textContent = red ? copy.scoreStateWatch : score === 0 ? copy.scoreStateReady : copy.scoreStateInProgress;
  selectors.scoreStateTag.className = `badge rounded-pill px-3 py-2 score-state-tag ${scoreStateClass}`;

  updateMetricProgress(score);
  updateAssessmentValidation();
  updateResultPanelState(score, red, levelKey);
  updateInfectionAlert(score);
  updateAdvice(levelKey, red);
}

function getHistory() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function isSameHistoryRecord(item, match) {
  if (!item || !match) return false;
  return String(item.savedAt || "") === String(match.savedAt || "")
    && sanitizeHN(item.hn || "") === sanitizeHN(match.hn || "")
    && String(item.assessmentTime || "") === String(match.assessmentTime || "");
}

function saveLocal(data, match = null) {
  const history = getHistory();
  const nextHistory = [...history];
  const matchIndex = match ? nextHistory.findIndex(item => isSameHistoryRecord(item, match)) : -1;

  if (matchIndex >= 0) {
    nextHistory[matchIndex] = data;
  } else {
    nextHistory.unshift(data);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextHistory.slice(0, 100)));
}

function deleteLocalHistory(match) {
  const history = getHistory().filter(item => !isSameHistoryRecord(item, match));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 100)));
}

function getHistoryFilters() {
  const hn = sanitizeHN(selectors.historyFilterHn?.value || "");

  return {
    date: hn ? "" : (selectors.historyFilterDate?.value || ""),
    hn,
    location: selectors.historyFilterLocation?.value || "",
    levelKey: selectors.historyFilterLevel?.value || "",
    red: selectors.historyFilterRed?.value || ""
  };
}

function normalizeHistoryItem(item = {}) {
  return {
    location: item.location || "",
    hn: sanitizeHN(item.hn || ""),
    gender: normalizeGender(item.gender || ""),
    age: sanitizeAge(item.age || ""),
    assessmentTime: item.assessmentTime || "",
    respiratoryRate: item.respiratoryRate || "",
    spo2: item.spo2 || "",
    oxygenSupport: item.oxygenSupport || "",
    temperature: item.temperature || "",
    systolicBP: item.systolicBP || "",
    heartRate: item.heartRate || "",
    consciousness: item.consciousness || "",
    infectionSource: getInfectionSourceRecordValue(item),
    spo2Scale: item.spo2Scale || "1",
    score: Number.parseInt(item.score ?? 0, 10) || 0,
    level: item.level || "",
    levelKey: item.levelKey || "",
    red: String(item.red).toLowerCase() === "true" || item.red === true,
    savedAt: item.savedAt || ""
  };
}

function getHistoryItemDate(item) {
  const rawValue = item.assessmentTime || item.savedAt || "";
  if (!rawValue) return "";

  const date = new Date(rawValue);
  if (Number.isNaN(date.getTime())) {
    const match = String(rawValue).match(/^(\d{4}-\d{2}-\d{2})/);
    return match ? match[1] : "";
  }

  const adjusted = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return adjusted.toISOString().slice(0, 10);
}

function filterHistoryItems(items, filters = getHistoryFilters()) {
  return items.filter(item => {
    const matchesDate = !filters.date || getHistoryItemDate(item) === filters.date;
    const matchesHn = !filters.hn || sanitizeHN(item.hn || "").includes(filters.hn);
    const matchesLocation = !filters.location || String(item.location || "").trim() === filters.location;
    const matchesLevel = !filters.levelKey || String(item.levelKey || "").trim() === filters.levelKey;
    const redValue = String(item.red).toLowerCase() === "true";
    const matchesRed = !filters.red || String(redValue) === filters.red;
    return matchesDate && matchesHn && matchesLocation && matchesLevel && matchesRed;
  });
}

function getDisplayedHistory(filters = getHistoryFilters()) {
  const remoteItems = historyState.remoteLoaded ? historyState.remoteItems : [];
  if (remoteItems.length || historyState.remoteLoaded) {
    return {
      items: filterHistoryItems(remoteItems, filters),
      source: historyState.remoteFailed ? "local" : "google"
    };
  }

  return {
    items: filterHistoryItems(getHistory(), filters),
    source: "local"
  };
}

function formatAssessmentDateTimeForInput(value) {
  if (!value) return "";
  const parsedTime = parseFlexibleDateTime(value);
  const date = parsedTime ? new Date(parsedTime) : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value).slice(0, 16);
  }

  const adjusted = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return adjusted.toISOString().slice(0, 16);
}

function buildHistoryItemKeys(item = {}) {
  const hn = sanitizeHN(item.hn || "");
  return [
    `${hn}|${item.assessmentTime || ""}|${item.savedAt || ""}`,
    `${hn}|${item.assessmentTime || ""}`
  ];
}

function mergeLocalHistoryMetadata(items) {
  const localEntries = getHistory();
  const metadataMap = new Map();

  localEntries.forEach(entry => {
    buildHistoryItemKeys(entry).forEach(key => {
      if (key && !metadataMap.has(key) && entry.selectionKeys) {
        metadataMap.set(key, entry.selectionKeys);
      }
    });
  });

  return items.map(item => {
    const matchKey = buildHistoryItemKeys(item).find(key => metadataMap.has(key));
    if (!matchKey) return item;
    return {
      ...item,
      selectionKeys: metadataMap.get(matchKey)
    };
  });
}

function getHistoryLookupItems() {
  const seenKeys = new Set();
  const merged = [];
  const localItems = getHistory().map(normalizeHistoryItem);
  const remoteItems = historyState.remoteLoaded ? historyState.remoteItems.map(normalizeHistoryItem) : [];

  [...localItems, ...remoteItems].forEach(item => {
    const key = buildHistoryItemKeys(item).find(Boolean);
    if (!key || seenKeys.has(key)) return;
    seenKeys.add(key);
    merged.push(item);
  });

  return merged;
}

function getHistoryItemTimestamp(item = {}) {
  const rawValue = item.assessmentTime || item.savedAt || "";
  if (!rawValue) return 0;
  const parsed = Date.parse(rawValue);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function findLatestHistoryItemByHn(hn) {
  const normalizedHn = sanitizeHN(hn);
  if (normalizedHn.length !== 9) return null;

  return getHistoryLookupItems()
    .filter(item => sanitizeHN(item.hn || "") === normalizedHn)
    .sort((left, right) => getHistoryItemTimestamp(right) - getHistoryItemTimestamp(left))[0] || null;
}

function createSepsisCaseFromHistoryItem(item = {}, existingCase = null) {
  const normalizedItem = normalizeHistoryItem(item);
  const historyRecordKey = getHistoryRecordKey(normalizedItem);
  const caseId = getSepsisCaseIdFromHistory(normalizedItem);
  if (!historyRecordKey || !caseId) return null;

  const assessmentTime = normalizedItem.assessmentTime || normalizedItem.savedAt || "";
  const age = sanitizeAge(normalizedItem.age || "");
  const patientSex = getSepsisSexValueFromHistory(normalizedItem.gender || "");
  const now = new Date().toISOString();

  return normalizeSepsisCase({
    ...(existingCase || {}),
    caseId,
    historyRecordKey,
    createdAt: existingCase?.createdAt || normalizedItem.savedAt || now,
    updatedAt: existingCase?.updatedAt || now,
    patientHn: sanitizeHN(normalizedItem.hn || existingCase?.patientHn || ""),
    patientAge: age || existingCase?.patientAge || "",
    patientSex: patientSex || existingCase?.patientSex || "",
    assessmentLocation: String(normalizedItem.location || existingCase?.assessmentLocation || "").trim(),
    startDateTime: formatAssessmentDateTimeForInput(assessmentTime) || existingCase?.startDateTime || "",
    newsScore: Number.parseInt(normalizedItem.score ?? existingCase?.newsScore ?? 0, 10) || 0,
    newsLevel: getNewsLevelLabel(Number.parseInt(normalizedItem.score ?? existingCase?.newsScore ?? 0, 10) || 0)
  });
}

function syncSepsisCasesWithHistory(options = {}) {
  const { preferredHistoryItem = null } = options;
  const historyItems = getHistoryLookupItems();
  const previousCases = Array.isArray(sepsisStore.cases) ? sepsisStore.cases.map(normalizeSepsisCase) : [];
  const historyByCaseId = new Map();
  const historyByKey = new Map();
  const nextCases = [];
  const seenCaseIds = new Set();

  historyItems.forEach(item => {
    const caseId = getSepsisCaseIdFromHistory(item);
    const historyRecordKey = getHistoryRecordKey(item);
    if (!caseId || !historyRecordKey) return;
    if (!historyByCaseId.has(caseId)) historyByCaseId.set(caseId, item);
    if (!historyByKey.has(historyRecordKey)) historyByKey.set(historyRecordKey, item);
  });

  previousCases.forEach(existingCase => {
    const matchedHistoryItem = historyByCaseId.get(existingCase.caseId) || historyByKey.get(existingCase.historyRecordKey);
    if (!matchedHistoryItem) {
      if (existingCase.caseId && !seenCaseIds.has(existingCase.caseId)) {
        seenCaseIds.add(existingCase.caseId);
        nextCases.push(existingCase);
      }
      return;
    }
    if (seenCaseIds.has(getSepsisCaseIdFromHistory(matchedHistoryItem))) return;
    const nextCase = createSepsisCaseFromHistoryItem(matchedHistoryItem, existingCase);
    if (!nextCase) return;
    seenCaseIds.add(nextCase.caseId);
    nextCases.push(nextCase);
  });

  if (preferredHistoryItem) {
    const preferredCaseId = getSepsisCaseIdFromHistory(preferredHistoryItem);
    if (preferredCaseId && !seenCaseIds.has(preferredCaseId)) {
      const nextCase = createSepsisCaseFromHistoryItem(preferredHistoryItem);
      if (nextCase) {
        seenCaseIds.add(nextCase.caseId);
        nextCases.unshift(nextCase);
      }
    }
  }

  const preferredCaseId = preferredHistoryItem ? getSepsisCaseIdFromHistory(preferredHistoryItem) : "";
  const previousActiveId = sepsisStore.activeCaseId || sepsisState.caseId || "";
  const activeCaseId = nextCases.some(item => item.caseId === preferredCaseId)
    ? preferredCaseId
    : nextCases.some(item => item.caseId === previousActiveId)
      ? previousActiveId
      : "";

  sepsisStore = { activeCaseId, cases: nextCases };
  sepsisState = normalizeSepsisCase(getActiveSepsisCase() || createDefaultSepsisState());
  localStorage.setItem(SEPSIS_PROTOCOL_KEY, JSON.stringify(sepsisStore));
  renderSepsisCaseList();
  renderSepsisCurrentCaseSummary();
  return sepsisState.caseId ? sepsisState : null;
}

function openSepsisCaseFromHistoryItem(item) {
  const nextCase = syncSepsisCasesWithHistory({ preferredHistoryItem: item });
  if (!nextCase) return false;
  sepsisHnSearchDraft = null;
  renderSepsisProtocol();
  scheduleSepsisSheetSync(nextCase, 100);
  return true;
}

function parseSheetBoolean(value) {
  return value === true || String(value || "").trim().toLowerCase() === "true";
}

function getFirstSheetValue(...values) {
  return values.find(value => value !== undefined && value !== null && String(value).trim() !== "") || "";
}

function normalizeSepsisSheetItem(item = {}, historyItem = null) {
  let parsed = {};
  if (item.rawJson) {
    try {
      parsed = JSON.parse(item.rawJson);
    } catch {
      parsed = {};
    }
  }

  const historyCase = historyItem ? createSepsisCaseFromHistoryItem(historyItem) : null;
  return normalizeSepsisCase({
    ...(historyCase || {}),
    ...parsed,
    caseId: item.caseId || parsed.caseId || historyCase?.caseId || "",
    historyRecordKey: item.historyRecordKey || parsed.historyRecordKey || historyCase?.historyRecordKey || "",
    createdAt: item.createdAt || parsed.createdAt || historyCase?.createdAt || "",
    updatedAt: item.updatedAt || item.savedAt || parsed.updatedAt || "",
    patientHn: sanitizeHN(item.patientHn || parsed.patientHn || historyCase?.patientHn || ""),
    patientName: item.patientName || parsed.patientName || historyCase?.patientName || "",
    patientAge: sanitizeAge(item.patientAge || parsed.patientAge || historyCase?.patientAge || ""),
    patientSex: getSepsisSexValueFromHistory(getFirstSheetValue(
      item.patientSex,
      item.patientGender,
      item.sex,
      item.gender,
      parsed.patientSex,
      parsed.patientGender,
      parsed.sex,
      parsed.gender,
      historyCase?.patientSex
    )),
    assessmentLocation: item.assessmentLocation || parsed.assessmentLocation || historyCase?.assessmentLocation || "",
    startDateTime: formatAssessmentDateTimeForInput(item.startDateTime || parsed.startDateTime || historyCase?.startDateTime || ""),
    type: normalizeSepsisProtocolType(item.protocolType || parsed.protocolType || parsed.type || historyCase?.type || "sepsis"),
    triage: item.triage || parsed.triage || "",
    infectionSource: item.infectionSource || parsed.infectionSource || "",
    disposition: item.disposition || parsed.disposition || "",
    lactateValue: item.lactateValue || parsed.lactateValue || "",
    consultDone: parseSheetBoolean(item.consultDone ?? parsed.consultDone),
    consultTime: normalizeClockTime(item.consultTime || parsed.consultTime || ""),
    newsScore: Number.parseInt(item.newsScore || parsed.newsScore || historyCase?.newsScore || 0, 10) || 0,
    newsLevel: item.newsLevel || parsed.newsLevel || historyCase?.newsLevel || "",
    note: item.note || parsed.note || "",
    tasks: {
      1: {
        done: parseSheetBoolean(item.bloodCultureDone ?? item.hemocultureDone ?? item.hemoCultureDone ?? parsed.tasks?.[1]?.done),
        time: normalizeClockTime(getFirstSheetValue(item.bloodCultureTime, item.hemocultureTime, item.hemoCultureTime, item.HemocultureTime, item.HemoCultureTime, parsed.tasks?.[1]?.time))
      },
      2: { done: parseSheetBoolean(item.specimenDone ?? parsed.tasks?.[2]?.done), time: normalizeClockTime(item.specimenTime || parsed.tasks?.[2]?.time || "") },
      3: { done: parseSheetBoolean(item.foleyDone ?? parsed.tasks?.[3]?.done), time: normalizeClockTime(item.foleyTime || parsed.tasks?.[3]?.time || "") },
      4: { done: parseSheetBoolean(item.lactateDone ?? parsed.tasks?.[4]?.done), time: normalizeClockTime(item.lactateTime || parsed.tasks?.[4]?.time || "") },
      5: { done: parseSheetBoolean(item.fluidDone ?? parsed.tasks?.[5]?.done), time: normalizeClockTime(item.fluidTime || parsed.tasks?.[5]?.time || "") },
      6: {
        done: parseSheetBoolean(item.antibioticDone ?? item.atbDone ?? item.ATBDone ?? parsed.tasks?.[6]?.done),
        time: normalizeClockTime(getFirstSheetValue(item.antibioticTime, item.atbTime, item.ATBTime, item.antibioticGivenTime, item.atbGivenTime, parsed.tasks?.[6]?.time))
      },
      7: { done: parseSheetBoolean(item.evaluationDone ?? parsed.tasks?.[7]?.done), time: normalizeClockTime(item.evaluationTime || parsed.tasks?.[7]?.time || "") }
    }
  });
}

async function fetchSepsisFromGoogleSheet(historyItem) {
  const normalizedHistory = normalizeHistoryItem(historyItem || {});
  const caseId = getSepsisCaseIdFromHistory(normalizedHistory);
  const historyRecordKey = getHistoryRecordKey(normalizedHistory);
  const params = new URLSearchParams({
    mode: "sepsis",
    sheetName: "sepsis"
  });

  if (caseId) params.set("caseId", caseId);
  if (historyRecordKey) params.set("historyRecordKey", historyRecordKey);
  if (normalizedHistory.hn) params.set("hn", normalizedHistory.hn);
  if (normalizedHistory.assessmentTime) {
    params.set("startDateTime", formatAssessmentDateTimeForInput(normalizedHistory.assessmentTime));
  }

  const response = await fetch(`${SHEET_WEBAPP_URL}?${params.toString()}`, {
    method: "GET",
    mode: "cors",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (!payload || payload.ok !== true) {
    throw new Error(payload?.error || "Unable to load sepsis protocol");
  }

  return payload.item ? normalizeSepsisSheetItem(payload.item, normalizedHistory) : null;
}

function getDashboardDateValue(value) {
  if (!value) return "";
  const directMatch = String(value).match(/^(\d{4}-\d{2}-\d{2})/);
  if (directMatch) return directMatch[1];
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const adjusted = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return adjusted.toISOString().slice(0, 10);
}

function getDashboardFilters() {
  const dateTo = selectors.dashboardDateFilter?.value || "";
  let dateFrom = "";
  if (dateTo && dashboardState.rangeDays) {
    const end = new Date(`${dateTo}T00:00:00`);
    if (!Number.isNaN(end.getTime())) {
      const start = new Date(end);
      start.setDate(start.getDate() - Math.max(0, dashboardState.rangeDays - 1));
      dateFrom = new Date(start.getTime() - (start.getTimezoneOffset() * 60000)).toISOString().slice(0, 10);
    }
  }
  return {
    date: dateTo,
    dateFrom,
    dateTo,
    rangeDays: dashboardState.rangeDays,
    location: selectors.dashboardLocationFilter?.value || ""
  };
}

function setDefaultDashboardDate() {
  if (selectors.dashboardDateFilter && !selectors.dashboardDateFilter.value) {
    selectors.dashboardDateFilter.value = getTodayDateValue();
  }
}

function getDashboardHistoryItems() {
  const remoteItems = historyState.remoteLoaded ? historyState.remoteItems : [];
  return (remoteItems.length || historyState.remoteLoaded ? remoteItems : getHistory()).map(normalizeHistoryItem);
}

function isPositiveInfectionSource(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return Boolean(normalized) && !["no", "none", "ไม่พบ", "ไม่ใช่", "-"].includes(normalized);
}

function getDashboardHistoryMaps(items = getDashboardHistoryItems()) {
  const byKey = new Map();
  const byCaseId = new Map();
  items.forEach(item => {
    const historyRecordKey = getHistoryRecordKey(item);
    const caseId = getSepsisCaseIdFromHistory(item);
    if (historyRecordKey) byKey.set(historyRecordKey, item);
    if (caseId) byCaseId.set(caseId, item);
  });
  return { byKey, byCaseId };
}

function normalizeDashboardSepsisItem(item = {}, historyMaps = getDashboardHistoryMaps()) {
  const historyItem = historyMaps.byKey.get(item.historyRecordKey || "") || historyMaps.byCaseId.get(item.caseId || "") || null;
  const normalized = item.tasks ? normalizeSepsisCase(item) : normalizeSepsisSheetItem(item, historyItem);
  const metrics = calculateSepsisMetricsForCase(normalized);
  const completedSteps = Number.parseInt(item.completedSteps ?? metrics.completedSteps, 10);
  const totalSteps = Number.parseInt(item.totalSteps ?? SEPSIS_PROGRESS_TASKS.length, 10);
  const progressPercent = Number.parseInt(item.progressPercent ?? metrics.progressPercent, 10);
  const remainingMinutes = Number.parseInt(item.remainingMinutes ?? metrics.remainingMinutes, 10);
  const resolvedCompletedSteps = Number.isNaN(completedSteps) ? metrics.completedSteps : completedSteps;
  const resolvedTotalSteps = Number.isNaN(totalSteps) ? SEPSIS_PROGRESS_TASKS.length : totalSteps;
  const resolvedRemainingMinutes = Number.isNaN(remainingMinutes) ? metrics.remainingMinutes : remainingMinutes;
  const overTarget = parseSheetBoolean(item.overTarget) || (resolvedRemainingMinutes < 0 && resolvedCompletedSteps < resolvedTotalSteps);
  const onTime = parseSheetBoolean(item.onTime) || (resolvedCompletedSteps >= resolvedTotalSteps && resolvedRemainingMinutes >= 0);

  return {
    ...normalized,
    completedSteps: resolvedCompletedSteps,
    totalSteps: resolvedTotalSteps,
    progressPercent: Number.isNaN(progressPercent) ? metrics.progressPercent : progressPercent,
    targetMinutes: Number.parseInt(item.targetMinutes ?? metrics.targetMinutes, 10) || metrics.targetMinutes,
    elapsedMinutes: Number.parseInt(item.elapsedMinutes ?? metrics.elapsedMinutes, 10) || metrics.elapsedMinutes,
    remainingMinutes: resolvedRemainingMinutes,
    overTarget,
    onTime,
    savedAt: item.savedAt || normalized.updatedAt || normalized.createdAt || "",
    raw: item
  };
}

async function fetchSepsisListFromGoogleSheet() {
  const params = new URLSearchParams({
    mode: "sepsis",
    sheetName: "sepsis"
  });
  const filters = getDashboardFilters();
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.location) params.set("location", filters.location);
  const response = await fetch(`${SHEET_WEBAPP_URL}?${params.toString()}`, {
    method: "GET",
    mode: "cors",
    cache: "no-store"
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const payload = await response.json();
  if (!payload || payload.ok !== true || !Array.isArray(payload.items)) {
    throw new Error("Invalid sepsis dashboard response");
  }

  const historyMaps = getDashboardHistoryMaps();
  return payload.items.map(item => normalizeDashboardSepsisItem(item, historyMaps));
}

function getDashboardSepsisItems() {
  if (dashboardState.sepsisRemoteLoaded || dashboardState.sepsisItems.length) {
    return dashboardState.sepsisItems;
  }
  const historyMaps = getDashboardHistoryMaps();
  return readSepsisStore().cases.map(item => normalizeDashboardSepsisItem(item, historyMaps));
}

function filterDashboardHistoryItems(items, filters = getDashboardFilters()) {
  return items.filter(item => {
    const itemDate = getDashboardDateValue(item.assessmentTime || item.savedAt);
    const matchesDate = (!filters.dateFrom || itemDate >= filters.dateFrom) && (!filters.dateTo || itemDate <= filters.dateTo);
    const matchesLocation = !filters.location || String(item.location || "").trim() === filters.location;
    return matchesDate && matchesLocation;
  });
}

function filterDashboardSepsisItems(items, filters = getDashboardFilters()) {
  return items.filter(item => {
    const itemDate = getDashboardDateValue(item.startDateTime || item.updatedAt || item.savedAt);
    const matchesDate = (!filters.dateFrom || itemDate >= filters.dateFrom) && (!filters.dateTo || itemDate <= filters.dateTo);
    const matchesLocation = !filters.location || String(item.assessmentLocation || "").trim() === filters.location;
    return matchesDate && matchesLocation;
  });
}

function setDashboardText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function renderDashboardBarList(elementId, rows) {
  const element = document.getElementById(elementId);
  if (!element) return;
  const maxValue = Math.max(1, ...rows.map(row => row.value));
  element.innerHTML = rows.map(row => {
    const width = Math.max(4, Math.round((row.value / maxValue) * 100));
    return `
      <div class="dashboard-bar-row ${escapeHtml(row.theme || "")}">
        <div class="dashboard-bar-meta">
          <strong>${escapeHtml(row.label)}</strong>
          <span>${escapeHtml(String(row.value))}</span>
        </div>
        <div class="dashboard-bar-track">
          <span style="width:${width}%"></span>
        </div>
      </div>
    `;
  }).join("");
}

function getDashboardStepRate(items, predicate) {
  const copy = pageText().dashboard;
  if (!items.length) return { value: "-", hint: copy.noCases, numerator: 0, denominator: 0 };
  const numerator = items.filter(predicate).length;
  return {
    value: `${Math.round((numerator / items.length) * 100)}%`,
    hint: `(${numerator}/${items.length})`,
    numerator,
    denominator: items.length
  };
}

function getDashboardAtbWithinTargetRate(items) {
  const eligible = items.filter(item => item.startDateTime && item.tasks?.[6]?.time);
  if (!eligible.length) return { value: "-", hint: pageText().dashboard.noTimeData, numerator: 0, denominator: 0 };
  const numerator = eligible.filter(item => {
    const start = new Date(item.startDateTime);
    const antibioticAt = getDateTimeFromStartAndTime(start, item.tasks?.[6]?.time);
    if (!antibioticAt || Number.isNaN(start.getTime())) return false;
    const targetMinutes = getSepsisTargetMinutes(item.type);
    return Math.round((antibioticAt.getTime() - start.getTime()) / 60000) <= targetMinutes;
  }).length;
  return {
    value: `${Math.round((numerator / eligible.length) * 100)}%`,
    hint: `(${numerator}/${eligible.length})`,
    numerator,
    denominator: eligible.length
  };
}

function getDashboardAtbWithinMinutesStats(items, minutes) {
  const copy = pageText().dashboard;
  const eligible = items.filter(item => item.startDateTime && item.tasks?.[6]?.time);
  if (!eligible.length) return { count: 0, rate: "-", hint: copy.noTimeData, numerator: 0, denominator: 0 };
  const numerator = eligible.filter(item => {
    const start = new Date(item.startDateTime);
    const antibioticAt = getDateTimeFromStartAndTime(start, item.tasks?.[6]?.time);
    if (!antibioticAt || Number.isNaN(start.getTime())) return false;
    return Math.round((antibioticAt.getTime() - start.getTime()) / 60000) <= minutes;
  }).length;
  return {
    count: numerator,
    rate: `${Math.round((numerator / eligible.length) * 100)}%`,
    hint: `(${numerator}/${eligible.length} ${copy.caseUnit})`,
    numerator,
    denominator: eligible.length
  };
}

function formatDashboardAtbCountValue(stats) {
  return stats?.denominator ? String(stats.numerator) : "-";
}

function formatDashboardAtbRatioHint(stats) {
  const copy = pageText().dashboard;
  if (!stats?.denominator) return stats?.hint || copy.noTimeData;
  return `${stats.rate} (${stats.numerator}/${stats.denominator} ${copy.caseUnit})`;
}

function getDashboardQualityStats(items, predicate) {
  const copy = pageText().dashboard;
  const denominator = Array.isArray(items) ? items.length : 0;
  if (!denominator) return { rate: "-", hint: copy.noCases, numerator: 0, denominator: 0 };
  const numerator = items.filter(predicate).length;
  return {
    rate: `${Math.round((numerator / denominator) * 100)}%`,
    hint: `(${numerator}/${denominator})`,
    numerator,
    denominator
  };
}

function getDashboardTaskDateTime(item, step) {
  const start = new Date(item.startDateTime || "");
  if (Number.isNaN(start.getTime())) return null;
  const time = item.tasks?.[step]?.time || "";
  return time ? getDateTimeFromStartAndTime(start, time) : null;
}

function isDashboardBloodCultureBeforeAtb(item) {
  const bloodCultureAt = getDashboardTaskDateTime(item, 1);
  const antibioticAt = getDashboardTaskDateTime(item, 6);
  if (bloodCultureAt && antibioticAt) return bloodCultureAt.getTime() <= antibioticAt.getTime();
  return Boolean(item.tasks?.[1]?.done && item.tasks?.[6]?.done);
}

function isDashboardAtbWithinMinutes(item, minutes) {
  const start = new Date(item.startDateTime || "");
  const antibioticAt = getDashboardTaskDateTime(item, 6);
  if (!antibioticAt || Number.isNaN(start.getTime())) return false;
  return Math.round((antibioticAt.getTime() - start.getTime()) / 60000) <= minutes;
}

function normalizeDashboardSourceLabel(value) {
  const labels = pageText().dashboard.sourceLabels;
  const text = String(value || "").trim();
  const lower = text.toLowerCase();
  const compact = lower.replace(/[^a-z0-9]+/g, " ").trim();
  const sourceGroups = [
    { key: "urinary", label: labels.urinary, asset: "icon sepsis/Urinary tracy system.svg", terms: ["uti", "urinary tract infection"] },
    { key: "abdominal", label: labels.abdominal, asset: "icon sepsis/Intra-abdominal.svg", terms: ["gi", "liver abscess", "cholangitis"] },
    { key: "unknown", label: labels.unknown, asset: "icon sepsis/unknow source.svg", terms: ["unknow source", "unknown source", "unknown"] },
    { key: "other", label: labels.other, asset: "icon sepsis/other.svg", terms: ["arthritis", "wound", "encephalitis"] },
    { key: "respiratory", label: labels.respiratory, asset: "icon sepsis/Respiration.svg", terms: ["pneumonia", "tracheobronchitis"] },
    { key: "skin", label: labels.skin, asset: "icon sepsis/skin.svg", terms: ["posterior psoriasis", "cellilitis", "cellulitis", "skin"] },
    { key: "abdominal", label: labels.abdominal, asset: "icon sepsis/Intra-abdominal.svg", terms: ["intra abdominal infection", "intra-abdominal infection", "age", "acute gastroenteritis"] }
  ];
  const exactGroup = sourceGroups.find(group => group.terms.some(term => compact === term));
  if (exactGroup) return { key: exactGroup.key, label: exactGroup.label, asset: exactGroup.asset };
  if (!text) return { key: "other", label: labels.other, asset: "icon sepsis/other.svg" };
  if (lower.includes("resp") || lower.includes("ปอด")) return { key: "respiratory", label: labels.respiratory, asset: "icon sepsis/Respiration.svg" };
  if (lower.includes("urin") || lower.includes("ไต") || lower.includes("ปัสสาวะ")) return { key: "urinary", label: labels.urinary, asset: "icon sepsis/Urinary tracy system.svg" };
  if (lower.includes("abdominal") || lower.includes("ช่องท้อง") || lower.includes("gut")) return { key: "abdominal", label: labels.abdominal, asset: "icon sepsis/Intra-abdominal.svg" };
  if (lower.includes("unknown")) return { key: "unknown", label: labels.unknown, asset: "icon sepsis/unknow source.svg" };
  if (lower.includes("skin") || lower.includes("soft tissue") || lower.includes("ผิวหนัง")) return { key: "skin", label: labels.skin, asset: "icon sepsis/skin.svg" };
  return { key: "other", label: labels.other, asset: "icon sepsis/other.svg" };
}

function getDashboardSourceCategories() {
  const labels = pageText().dashboard.sourceLabels;
  return [
    { key: "respiratory", label: labels.respiratory, asset: "icon sepsis/Respiration.svg" },
    { key: "urinary", label: labels.urinary, asset: "icon sepsis/Urinary tracy system.svg" },
    { key: "abdominal", label: labels.abdominal, asset: "icon sepsis/Intra-abdominal.svg" },
    { key: "skin", label: labels.skin, asset: "icon sepsis/skin.svg" },
    { key: "unknown", label: labels.unknown, asset: "icon sepsis/unknow source.svg" },
    { key: "other", label: labels.other, asset: "icon sepsis/other.svg" }
  ];
}

function renderDashboardSourceRow(sepsisItems) {
  const element = document.getElementById("dashboardSourceRow");
  if (!element) return;

  const categories = getDashboardSourceCategories();
  const grouped = new Map(categories.map(category => [category.key, { ...category, count: 0 }]));
  let total = 0;

  sepsisItems.forEach(item => {
    if (!isPositiveInfectionSource(item.infectionSource)) return;
    const source = normalizeDashboardSourceLabel(item.infectionSource);
    const bucket = grouped.get(source.key) || grouped.get("other");
    bucket.count += 1;
    total += 1;
  });

  const rows = categories.map(category => grouped.get(category.key));
  element.innerHTML = rows.map(row => {
    const percent = total ? Math.round((row.count / total) * 100) : 0;
    return `
      <article class="dashboard-source-item sepsis-choice-card source">
        <span class="dashboard-source-icon sepsis-choice-icon" aria-hidden="true"><img class="sepsis-asset-icon" src="${escapeHtml(row.asset)}" alt="" /></span>
        <strong>${escapeHtml(row.label)}</strong>
        <span class="dashboard-source-percent">${escapeHtml(String(percent))}%</span>
      </article>
    `;
  }).join("");
}

function parseDashboardDateKey(value) {
  const key = getDashboardDateValue(value);
  if (!key) return null;
  const date = new Date(`${key}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDashboardDateKey(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  const adjusted = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
  return adjusted.toISOString().slice(0, 10);
}

function addDashboardDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addDashboardMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function getDashboardMonthKey(date) {
  return formatDashboardDateKey(date).slice(0, 7);
}

const DASHBOARD_THAI_MONTH_SHORT = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const DASHBOARD_EN_MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getDashboardMonthShortLabels() {
  return currentLanguage === "en" ? DASHBOARD_EN_MONTH_SHORT : DASHBOARD_THAI_MONTH_SHORT;
}

function formatDashboardDailyAxisLabel(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return `${String(date.getDate()).padStart(2, "0")} ${getDashboardMonthShortLabels()[date.getMonth()]}`;
}

function formatDashboardDailyLongLabel(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return `${String(date.getDate()).padStart(2, "0")} ${getDashboardMonthShortLabels()[date.getMonth()]} ${date.getFullYear()}`;
}

function formatDashboardMonthAxisLabel(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  return `${getDashboardMonthShortLabels()[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`;
}

function getDashboardTrendBuckets(filters, historyItems, sepsisItems, useDaily) {
  const itemDates = [
    ...historyItems.map(item => parseDashboardDateKey(item.assessmentTime || item.savedAt)),
    ...sepsisItems.map(item => parseDashboardDateKey(item.startDateTime || item.updatedAt || item.savedAt))
  ].filter(Boolean);
  const fallbackEnd = itemDates.length
    ? new Date(Math.max(...itemDates.map(date => date.getTime())))
    : parseDashboardDateKey(getTodayDateValue());
  const endDate = parseDashboardDateKey(filters.dateTo) || fallbackEnd;
  if (!endDate) return [];

  if (useDaily) {
    const dayCount = filters.rangeDays <= 7 ? 7 : 30;
    const startDate = addDashboardDays(endDate, -(dayCount - 1));
    return Array.from({ length: dayCount }, (_, index) => {
      const date = addDashboardDays(startDate, index);
      const key = formatDashboardDateKey(date);
      return { key, label: key.slice(5), displayLabel: formatDashboardDailyAxisLabel(date), longLabel: formatDashboardDailyLongLabel(date) };
    });
  }

  const monthCount = filters.rangeDays <= 90 ? 3 : 12;
  const endMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
  const startMonth = addDashboardMonths(endMonth, -(monthCount - 1));
  return Array.from({ length: monthCount }, (_, index) => {
    const date = addDashboardMonths(startMonth, index);
    const key = getDashboardMonthKey(date);
    const displayLabel = formatDashboardMonthAxisLabel(date);
    return { key, label: key, displayLabel, longLabel: `${getDashboardMonthShortLabels()[date.getMonth()]} ${date.getFullYear()}` };
  });
}

function renderDashboardTrendSvg(rows, metric, useDaily) {
  const width = 1000;
  const height = 330;
  const padding = { top: 38, right: 32, bottom: 64, left: 58 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const baselineY = padding.top + plotHeight;
  const maxValue = metric.maxValue || Math.max(1, ...rows.map(row => row[metric.key] || 0));
  const slotWidth = plotWidth / Math.max(1, rows.length);
  const barWidth = Math.min(useDaily ? 24 : 48, Math.max(10, slotWidth * .58));
  const xForIndex = index => padding.left + (slotWidth * index) + (slotWidth / 2);
  const yForValue = value => baselineY - ((value || 0) / maxValue) * plotHeight;
  const bars = rows
    .map((row, index) => {
      const value = row[metric.key];
      const hasValue = value !== null && value !== undefined;
      const y = yForValue(hasValue ? value : 0);
      const barHeight = Math.max(0, baselineY - y);
      return { row, value, hasValue, x: xForIndex(index), y, barHeight };
    });
  const yTicks = Array.from({ length: 5 }, (_, index) => {
    const value = Math.round((maxValue / 4) * index);
    return { value, y: yForValue(value) };
  }).reverse();
  const zoom = Math.min(2.5, Math.max(1, dashboardState.chartZoom || getDashboardBaseChartZoom()));
  const fallbackInterval = Math.max(1, Math.round((useDaily && rows.length > 12 ? 5 : 1) / zoom));
  const xLabels = rows
    .map((row, index) => ({ row, index, x: xForIndex(index) }))
    .filter(item => item.index === 0 || item.index === rows.length - 1 || item.index % fallbackInterval === 0);
  const zoomPercent = Math.round(zoom * 100);

  return `
    <div class="dashboard-trend-svg-wrap ${escapeHtml(metric.colorClass)}">
      <div class="dashboard-chart-toolbar" aria-label="X-axis label detail controls">
        <button type="button" data-dashboard-chart-zoom="out" aria-label="Show fewer x-axis labels">-</button>
        <span>${zoomPercent}%</span>
        <button type="button" data-dashboard-chart-zoom="in" aria-label="Show more x-axis labels">+</button>
        <button type="button" data-dashboard-chart-zoom="reset">Reset</button>
      </div>
      <div class="dashboard-trend-scroll">
        <svg class="dashboard-trend-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(metric.label)}" style="width:${zoomPercent}%;min-width:100%;">
          ${yTicks.map(tick => `
            <g class="dashboard-trend-gridline">
              <line x1="${padding.left}" x2="${width - padding.right}" y1="${tick.y.toFixed(1)}" y2="${tick.y.toFixed(1)}"></line>
              <text x="${padding.left - 10}" y="${(tick.y + 4).toFixed(1)}">${escapeHtml(metric.axisFormat(tick.value))}</text>
            </g>
          `).join("")}
          <line class="dashboard-trend-axis" x1="${padding.left}" x2="${width - padding.right}" y1="${baselineY}" y2="${baselineY}"></line>
          ${bars.map(bar => `
            <g
              class="dashboard-trend-bar-group ${bar.hasValue ? "" : "no-data"}"
              tabindex="0"
              role="img"
              aria-label="${escapeHtml(`${bar.row.longLabel}: ${bar.hasValue ? metric.format(bar.value) : "-"}`)}"
              data-tooltip-title="${escapeHtml(bar.row.longLabel)}"
              data-tooltip-value="${escapeHtml(bar.hasValue ? metric.format(bar.value) : "-")}"
              data-tooltip-label="${escapeHtml(metric.label)}"
            >
              <rect
                class="dashboard-trend-bar-svg"
                x="${(bar.x - (barWidth / 2)).toFixed(1)}"
                y="${bar.y.toFixed(1)}"
                width="${barWidth.toFixed(1)}"
                height="${bar.barHeight.toFixed(1)}"
                rx="7"
              ></rect>
              ${bar.value > 0 ? `<text x="${bar.x.toFixed(1)}" y="${(bar.y - 10).toFixed(1)}">${escapeHtml(metric.format(bar.value))}</text>` : ""}
            </g>
          `).join("")}
          ${xLabels.map(item => `
            <text class="dashboard-trend-x-label" x="${item.x.toFixed(1)}" y="${height - 25}">${escapeHtml(item.row.displayLabel || item.row.label)}</text>
          `).join("")}
        </svg>
      </div>
      <div class="dashboard-chart-tooltip" role="tooltip" hidden></div>
    </div>
  `;
}

function getDashboardHighchartColor(colorClass = "teal") {
  const colors = {
    teal: "#0f8ca4",
    green: "#16a34a",
    blue: "#2563eb",
    orange: "#f97316"
  };
  return colors[colorClass] || colors.teal;
}

function destroyDashboardTrendHighchart() {
  if (!dashboardTrendHighchart) return;
  dashboardTrendHighchart.destroy();
  dashboardTrendHighchart = null;
}

function getDashboardBaseChartZoom() {
  return window.matchMedia?.("(max-width: 767.98px)")?.matches ? 1.5 : 1;
}

function getDashboardXAxisTickPositions(rows) {
  if (!Array.isArray(rows) || rows.length <= 12) return null;
  const zoom = Math.min(2.5, Math.max(1, dashboardState.chartZoom || getDashboardBaseChartZoom()));
  const isCompactChart = window.matchMedia?.("(max-width: 767.98px)")?.matches;
  const positions = new Set([0, rows.length - 1]);
  const baseInterval = rows.length > 20 ? (isCompactChart ? 3 : 5) : 2;
  const interval = Math.max(1, Math.round(baseInterval / zoom));

  rows.forEach((row, index) => {
    if (index % interval === 0) positions.add(index);
    const previous = rows[index - 1];
    if (previous?.bucket && row?.bucket && previous.bucket.slice(0, 7) !== row.bucket.slice(0, 7)) {
      positions.add(index);
    }
  });

  return Array.from(positions).sort((a, b) => a - b);
}

function renderDashboardTrendHighchart(element, rows, metric) {
  if (!window.Highcharts) {
    dashboardTrendHighchart = null;
    return false;
  }

  destroyDashboardTrendHighchart();

  const color = getDashboardHighchartColor(metric.colorClass);
  const categories = rows.map(row => row.displayLabel || row.label);
  const tickPositions = getDashboardXAxisTickPositions(rows);
  const labelDetailPercent = Math.round(Math.min(2.5, Math.max(1, dashboardState.chartZoom || getDashboardBaseChartZoom())) * 100);
  const isCompactChart = window.matchMedia?.("(max-width: 767.98px)")?.matches;
  const mobileMinWidth = rows.length > 20 ? Math.max(760, rows.length * 34) : rows.length > 10 ? 620 : 0;
  const seriesData = rows.map(row => {
    const value = row[metric.key];
    return {
      y: value === null || value === undefined ? null : value,
      longLabel: row.longLabel,
      metricLabel: metric.label
    };
  });

  dashboardTrendHighchart = window.Highcharts.chart("dashboardTrendHighchart", {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      height: isCompactChart ? 330 : 270,
      spacing: isCompactChart ? [18, 10, 14, 4] : [14, 12, 8, 6],
      scrollablePlotArea: isCompactChart && mobileMinWidth ? {
        minWidth: mobileMinWidth,
        scrollPositionX: 0
      } : undefined,
      style: {
        fontFamily: '"Prompt", "Noto Sans Thai", sans-serif'
      }
    },
    title: { text: null },
    credits: { enabled: false },
    exporting: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories,
      tickPositions,
      crosshair: {
        color: "rgba(15, 140, 164, .12)"
      },
      lineColor: "rgba(22, 84, 111, .18)",
      tickColor: "rgba(22, 84, 111, .14)",
      labels: {
        autoRotation: [-25],
        step: 1,
        style: {
          color: "#6c8394",
          fontSize: isCompactChart ? "10px" : "8.5px",
          fontWeight: "700"
        }
      }
    },
    yAxis: {
      min: 0,
      max: metric.maxValue || null,
      title: { text: null },
      gridLineColor: "rgba(22, 84, 111, .1)",
      labels: {
        formatter: function () {
          return metric.axisFormat(this.value);
        },
        style: {
          color: "#7890a0",
          fontSize: isCompactChart ? "9.5px" : "8.25px",
          fontWeight: "700"
        }
      }
    },
    tooltip: {
      useHTML: true,
      backgroundColor: "rgba(15, 46, 74, .96)",
      borderWidth: 0,
      borderRadius: 10,
      shadow: false,
      padding: 0,
      formatter: function () {
        return `
          <div class="dashboard-highchart-tooltip">
            <strong>${escapeHtml(this.point.longLabel || this.x || "")}</strong>
            <span>${escapeHtml(this.point.metricLabel || metric.label)}</span>
            <em>${escapeHtml(metric.format(this.y))}</em>
          </div>
        `;
      }
    },
    plotOptions: {
      column: {
        borderWidth: 0,
        borderRadius: 7,
        color,
        pointPadding: .08,
        groupPadding: .14,
        minPointLength: 2,
        states: {
          hover: {
            color,
            brightness: .08
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y > 0 ? metric.format(this.y) : "";
          },
          style: {
            color: "#0b6d84",
            fontSize: isCompactChart ? "9.5px" : "8.5px",
            fontWeight: "800",
            textOutline: "3px rgba(255,255,255,.9)"
          }
        }
      }
    },
    series: [{
      name: metric.label,
      data: seriesData
    }],
    accessibility: {
      description: `X-axis label detail ${labelDetailPercent}%`
    }
  });

  return true;
}

function setDashboardChartZoom(action) {
  const currentZoom = dashboardState.chartZoom || getDashboardBaseChartZoom();
  let nextZoom = currentZoom;
  if (action === "in") nextZoom = currentZoom + 0.25;
  if (action === "out") nextZoom = currentZoom - 0.25;
  if (action === "reset") nextZoom = getDashboardBaseChartZoom();
  dashboardState.chartZoom = Math.min(2.5, Math.max(1, nextZoom));
  renderDashboard();
}

function getDashboardTooltipTarget(target) {
  return target?.closest?.(".dashboard-trend-bar-group[data-tooltip-title]");
}

function hideDashboardChartTooltip() {
  const tooltip = document.querySelector("#dashboardTrendChart .dashboard-chart-tooltip");
  if (!tooltip) return;
  tooltip.hidden = true;
}

function showDashboardChartTooltip(target, point = null) {
  const wrapper = target?.closest?.(".dashboard-trend-svg-wrap");
  const tooltip = wrapper?.querySelector?.(".dashboard-chart-tooltip");
  if (!wrapper || !tooltip) return;

  tooltip.innerHTML = `
    <strong>${escapeHtml(target.dataset.tooltipTitle || "")}</strong>
    <span>${escapeHtml(target.dataset.tooltipLabel || "")}</span>
    <em>${escapeHtml(target.dataset.tooltipValue || "-")}</em>
  `;
  tooltip.hidden = false;

  const wrapperRect = wrapper.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const x = point ? point.clientX - wrapperRect.left : targetRect.left + (targetRect.width / 2) - wrapperRect.left;
  const y = point ? point.clientY - wrapperRect.top : targetRect.top - wrapperRect.top;
  const tooltipRect = tooltip.getBoundingClientRect();
  const left = Math.min(Math.max(8, x + 12), Math.max(8, wrapperRect.width - tooltipRect.width - 8));
  const top = Math.min(Math.max(8, y - tooltipRect.height - 12), Math.max(8, wrapperRect.height - tooltipRect.height - 8));
  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function renderDashboardTrendChart(historyItems, sepsisItems) {
  const element = document.getElementById("dashboardTrendChart");
  if (!element) return;
  const copy = pageText().dashboard;
  const filters = getDashboardFilters();
  const useDaily = filters.rangeDays <= 30;
  const buckets = getDashboardTrendBuckets(filters, historyItems, sepsisItems, useDaily);

  if (!buckets.length || !sepsisItems.length) {
    destroyDashboardTrendHighchart();
    element.innerHTML = `<div class="dashboard-empty">${escapeHtml(copy.noTrend)}</div>`;
    return;
  }

  const rows = buckets.map(bucket => {
    const bucketSepsis = sepsisItems.filter(item => getDashboardDateValue(item.startDateTime || item.updatedAt || item.savedAt).startsWith(bucket.key));
    const atbRate = getDashboardAtbWithinTargetRate(bucketSepsis);
    const lactateRate = getDashboardStepRate(bucketSepsis, item => item.tasks?.[4]?.done);
    const fluidRate = getDashboardStepRate(bucketSepsis, item => item.tasks?.[5]?.done);
    return {
      bucket: bucket.key,
      label: bucket.label,
      displayLabel: bucket.displayLabel || bucket.label,
      longLabel: bucket.longLabel,
      sepsisCount: bucketSepsis.length,
      atbRate: atbRate.denominator ? Math.round((atbRate.numerator / atbRate.denominator) * 100) : null,
      lactateRate: lactateRate.denominator ? Math.round((lactateRate.numerator / lactateRate.denominator) * 100) : null,
      fluidRate: fluidRate.denominator ? Math.round((fluidRate.numerator / fluidRate.denominator) * 100) : null
    };
  });
  const metricMap = {
    sepsisCount: {
      key: "sepsisCount",
      label: copy.metricSepsisCountLong,
      colorClass: "teal",
      format: value => String(value),
      axisFormat: value => String(value)
    },
    atbRate: {
      key: "atbRate",
      label: "% ATB in target",
      colorClass: "green",
      format: value => value === null ? "-" : `${value}%`,
      axisFormat: value => `${value}%`,
      maxValue: 100
    },
    lactateRate: {
      key: "lactateRate",
      label: "% Lactate done",
      colorClass: "blue",
      format: value => value === null ? "-" : `${value}%`,
      axisFormat: value => `${value}%`,
      maxValue: 100
    },
    fluidRate: {
      key: "fluidRate",
      label: "% Fluid done",
      colorClass: "orange",
      format: value => value === null ? "-" : `${value}%`,
      axisFormat: value => `${value}%`,
      maxValue: 100
    }
  };
  const metric = metricMap[dashboardState.metric] || metricMap.sepsisCount;
  const hasMetricData = rows.some(row => row[metric.key] !== null && row[metric.key] !== undefined);

  if (!hasMetricData) {
    destroyDashboardTrendHighchart();
    element.innerHTML = `<div class="dashboard-empty">${escapeHtml(copy.noTrend)}</div>`;
    return;
  }

  element.innerHTML = `
    <div class="dashboard-trend-legend ${escapeHtml(metric.colorClass)}">
      <span class="${escapeHtml(metric.colorClass)}">${escapeHtml(metric.label)}</span>
    </div>
    <div class="dashboard-trend-highchart-wrap ${escapeHtml(metric.colorClass)}">
      <div class="dashboard-chart-toolbar" aria-label="X-axis label detail controls">
        <button type="button" data-dashboard-chart-zoom="out" aria-label="Show fewer x-axis labels">-</button>
        <span>${Math.round((dashboardState.chartZoom || getDashboardBaseChartZoom()) * 100)}%</span>
        <button type="button" data-dashboard-chart-zoom="in" aria-label="Show more x-axis labels">+</button>
        <button type="button" data-dashboard-chart-zoom="reset">Reset</button>
      </div>
      <div id="dashboardTrendHighchart" class="dashboard-trend-highchart"></div>
    </div>
  `;

  if (!renderDashboardTrendHighchart(element, rows, metric)) {
    element.innerHTML = `
      <div class="dashboard-trend-legend ${escapeHtml(metric.colorClass)}">
        <span class="${escapeHtml(metric.colorClass)}">${escapeHtml(metric.label)}</span>
      </div>
      ${renderDashboardTrendSvg(rows, metric, useDaily)}
    `;
  }
}

function renderDashboardProtocolQualityKpiList(element, sepsisItems) {
  const copy = pageText().dashboard;
  const standardSepsisItems = sepsisItems.filter(item => item.type !== "severe");
  const severeSepsisItems = sepsisItems.filter(item => item.type === "severe");
  const bloodCultureBeforeAtb = getDashboardQualityStats(sepsisItems, isDashboardBloodCultureBeforeAtb);
  const sepsisAtb3h = getDashboardQualityStats(standardSepsisItems, item => isDashboardAtbWithinMinutes(item, 180));
  const severeAtb1h = getDashboardQualityStats(severeSepsisItems, item => isDashboardAtbWithinMinutes(item, 60));
  const rows = [
    { label: copy.qualityBloodCulture, target: "≥ 90%", result: bloodCultureBeforeAtb.rate, hint: bloodCultureBeforeAtb.hint, theme: "blue", icon: "thermo" },
    { label: copy.qualityAtb3h, target: "≥ 90%", result: sepsisAtb3h.rate, hint: sepsisAtb3h.hint, theme: "teal", icon: "timer" },
    { label: copy.qualitySevereAtb1h, target: "≥ 90%", result: severeAtb1h.rate, hint: severeAtb1h.hint, theme: "green", icon: "shield" }
  ];

  element.innerHTML = `
    <div class="dashboard-quality-header">
      <span></span>
      <strong>${escapeHtml(copy.qualityHeaderIndicator)}</strong>
      <strong>${escapeHtml(copy.qualityHeaderTarget)}</strong>
      <strong>${escapeHtml(copy.qualityHeaderResult)}</strong>
    </div>
    ${rows.map((row, index) => `
    <div class="dashboard-quality-row ${escapeHtml(row.theme)}">
      <span class="dashboard-quality-number icon-${escapeHtml(row.icon)}" aria-hidden="true">${index + 1}</span>
      <div>
        <strong>${index + 1}. ${escapeHtml(row.label)}</strong>
        <div class="dashboard-quality-track"><span style="width:${row.result === "-" ? 0 : Number.parseInt(row.result, 10) || 0}%"></span></div>
      </div>
      <em>${escapeHtml(row.target)}</em>
      <strong>${escapeHtml(row.result)} <small>${escapeHtml(row.hint)}</small></strong>
    </div>
  `).join("")}
  `;
}

function renderDashboardKpiList(sepsisItems, historyItems) {
  const element = document.getElementById("dashboardKpiList");
  if (!element) return;
  renderDashboardProtocolQualityKpiList(element, sepsisItems);
  return;
  const atbRate = getDashboardAtbWithinTargetRate(sepsisItems);
  const lactateRate = getDashboardStepRate(sepsisItems, item => item.tasks?.[4]?.done);
  const fluidRate = getDashboardStepRate(sepsisItems, item => item.tasks?.[5]?.done);

  const rows = [
    { label: "ATB ภายใน 1 ชั่วโมง", target: "≥ 90%", result: atbRate.value, hint: atbRate.hint, theme: "teal" },
    { label: "เจาะ Lactate", target: "≥ 90%", result: lactateRate.value, hint: lactateRate.hint, theme: "blue" },
    { label: "ได้รับสารน้ำ IV", target: "≥ 90%", result: fluidRate.value, hint: fluidRate.hint, theme: "green" }
  ];

  element.innerHTML = rows.map((row, index) => `
    <div class="dashboard-quality-row ${escapeHtml(row.theme)}">
      <span class="dashboard-quality-number">${index + 1}</span>
      <div>
        <strong>${escapeHtml(row.label)}</strong>
        <div class="dashboard-quality-track"><span style="width:${row.result === "-" ? 0 : Number.parseInt(row.result, 10) || 0}%"></span></div>
      </div>
      <em>${escapeHtml(row.target)}</em>
      <strong>${escapeHtml(row.result)} <small>${escapeHtml(row.hint)}</small></strong>
    </div>
  `).join("");
}

function populateDashboardLocationOptions(historyItems, sepsisItems) {
  if (!selectors.dashboardLocationFilter) return;
  const selected = selectors.dashboardLocationFilter.value || "";
  const locations = Array.from(new Set([
    ...historyItems.map(item => String(item.location || "").trim()),
    ...sepsisItems.map(item => String(item.assessmentLocation || "").trim())
  ].filter(Boolean))).sort((a, b) => a.localeCompare(b, "th"));

  selectors.dashboardLocationFilter.innerHTML = [
    `<option value="">${escapeHtml(pageText().dashboard.allLocations)}</option>`,
    ...locations.map(location => `<option value="${escapeHtml(location)}">${escapeHtml(location)}</option>`)
  ].join("");
  selectors.dashboardLocationFilter.value = locations.includes(selected) ? selected : "";
}

function renderDashboard() {
  if (!selectors.dashboardView) return;
  const dashboardCopy = pageText().dashboard;
  const allHistoryItems = getDashboardHistoryItems();
  const allSepsisItems = getDashboardSepsisItems();
  populateDashboardLocationOptions(allHistoryItems, allSepsisItems);

  const filters = getDashboardFilters();
  const historyItems = filterDashboardHistoryItems(allHistoryItems, filters);
  const sepsisItems = filterDashboardSepsisItems(allSepsisItems, filters);
  const suspectedItems = historyItems.filter(item => isPositiveInfectionSource(item.infectionSource) && (item.score >= 5 || item.red));
  const standardSepsisItems = sepsisItems.filter(item => item.type !== "severe");
  const severeSepsisItems = sepsisItems.filter(item => item.type === "severe");
  const atb3hStats = getDashboardAtbWithinMinutesStats(standardSepsisItems, 180);
  const severeAtb1hStats = getDashboardAtbWithinMinutesStats(severeSepsisItems, 60);

  setDashboardText("dashboardSummarySepsisCount", String(sepsisItems.length || suspectedItems.length));
  setDashboardText("dashboardSummaryAtb3hCount", formatDashboardAtbCountValue(atb3hStats));
  setDashboardText("dashboardSummaryAtb3hHint", formatDashboardAtbRatioHint(atb3hStats));
  setDashboardText("dashboardSummarySevereAtbRate", formatDashboardAtbCountValue(severeAtb1hStats));
  setDashboardText("dashboardSummarySevereAtbHint", formatDashboardAtbRatioHint(severeAtb1hStats));
  renderDashboardSourceRow(sepsisItems);

  renderDashboardBarList("dashboardRiskBars", [
    { label: dashboardCopy.riskLow, value: historyItems.filter(item => item.score <= 4 && !item.red).length, theme: "low" },
    { label: dashboardCopy.riskWatch, value: historyItems.filter(item => item.score >= 5 && item.score <= 6 && !item.red).length, theme: "watch" },
    { label: dashboardCopy.riskHigh, value: historyItems.filter(item => item.score >= 7 && item.score <= 12 && !item.red).length, theme: "high" },
    { label: "≥13 / RED", value: historyItems.filter(item => item.score >= 13 || item.red).length, theme: "danger" }
  ]);

  renderDashboardTrendChart(historyItems, sepsisItems);
  renderDashboardKpiList(sepsisItems, historyItems);

  if (selectors.dashboardStatus) {
    const rangeText = filters.dateFrom && filters.dateTo
      ? `${filters.dateFrom} ${currentLanguage === "en" ? "to" : "ถึง"} ${filters.dateTo}`
      : dashboardCopy.allDates;
    const hasLoadError = Boolean(historyState.remoteFailed || dashboardState.sepsisRemoteFailed);
    selectors.dashboardStatus.textContent = hasLoadError
      ? `${dashboardCopy.range}: ${rangeText} • ${dashboardCopy.partialError}`
      : `${dashboardCopy.range}: ${rangeText}`;
    selectors.dashboardStatus.classList.toggle("error", hasLoadError);
  }
}

async function refreshDashboard(options = {}) {
  const { silent = false } = options;
  if (dashboardState.loading) return;
  dashboardState.loading = true;
  if (!silent && selectors.dashboardStatus) {
    selectors.dashboardStatus.textContent = pageText().dashboard.loading;
    selectors.dashboardStatus.classList.remove("error");
  }

  try {
    const filters = getDashboardFilters();
    historyState.remoteItems = await fetchHistoryFromGoogleSheet({
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      location: filters.location,
      hn: "",
      levelKey: "",
      red: "",
      limit: 500
    });
    historyState.remoteLoaded = true;
    historyState.remoteFailed = false;
  } catch (error) {
    historyState.remoteFailed = true;
    console.error(error);
  }

  try {
    dashboardState.sepsisItems = await fetchSepsisListFromGoogleSheet();
    dashboardState.sepsisRemoteLoaded = true;
    dashboardState.sepsisRemoteFailed = false;
  } catch (error) {
    dashboardState.sepsisItems = [];
    dashboardState.sepsisRemoteLoaded = false;
    dashboardState.sepsisRemoteFailed = true;
    console.error(error);
  } finally {
    dashboardState.loading = false;
    renderDashboard();
  }
}

function openSepsisCaseState(nextCase) {
  const normalized = normalizeSepsisCase(nextCase);
  if (!normalized.caseId) return false;

  const caseIndex = sepsisStore.cases.findIndex(item => item.caseId === normalized.caseId);
  if (caseIndex === -1) {
    sepsisStore.cases.unshift(normalized);
  } else {
    sepsisStore.cases[caseIndex] = normalized;
  }

  sepsisStore.activeCaseId = normalized.caseId;
  sepsisState = normalized;
  localStorage.setItem(SEPSIS_PROTOCOL_KEY, JSON.stringify(sepsisStore));
  sepsisHnSearchDraft = null;
  renderSepsisCaseList();
  renderSepsisProtocol();
  return true;
}

function hydrateSepsisFromHistoryItem(item) {
  if (!item) return false;
  if (!openSepsisCaseFromHistoryItem(item)) return false;

  const assessmentTime = item.assessmentTime || item.savedAt || "";
  const age = sanitizeAge(item.age || "");
  const patientSex = getSepsisSexValueFromHistory(item.gender || "");

  sepsisState.patientHn = sanitizeHN(item.hn || sepsisState.patientHn || "");
  if (age) {
    sepsisState.patientAge = age;
  }
  if (patientSex) {
    sepsisState.patientSex = patientSex;
  }
  if (item.location) {
    sepsisState.assessmentLocation = String(item.location).trim();
  }
  if (assessmentTime) {
    sepsisState.startDateTime = formatAssessmentDateTimeForInput(assessmentTime);
  }

  sepsisState.newsScore = Number.parseInt(item.score ?? 0, 10) || 0;
  sepsisState.newsLevel = getNewsLevelLabel(sepsisState.newsScore);
  persistSepsisState();
  renderSepsisProtocol();
  return true;
}

function setSepsisHistoryLookupPanel(state = "hidden") {
  const modalEl = ensureSepsisNewsRequiredModalMounted();
  const textEl = document.getElementById("sepsisHistoryLookupText");
  const goNewsBtn = document.getElementById("sepsisGoNewsBtn");
  if (!modalEl) return;

  const messages = {
    searching: "กำลังค้นหาประวัติ NEWS...",
    notFound: "ไม่พบประวัติ NEWS ของ HN นี้ กรุณากรอก NEWS ก่อน",
    error: "ยังไม่พบประวัติ NEWS ในเครื่อง หากมีข้อมูลใหม่ให้ลองรีเฟรช หรือกรอก NEWS ก่อน"
  };

  if (textEl) textEl.textContent = messages[state] || messages.notFound;
  if (goNewsBtn) goNewsBtn.hidden = state === "searching";

  if (typeof bootstrap === "undefined") {
    modalEl.hidden = state === "hidden" || state === "searching";
    return;
  }

  const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
  if (state === "hidden" || state === "searching") {
    modalInstance.hide();
    return;
  }
  modalEl.style.zIndex = "2010";
  modalInstance.show();
}

function ensureSepsisNewsRequiredModalMounted() {
  const modalEl = document.getElementById("sepsisNewsRequiredModal");
  if (!modalEl) return null;
  if (modalEl.parentElement !== document.body) {
    document.body.appendChild(modalEl);
  }
  return modalEl;
}

function forceCloseSepsisNewsRequiredModal() {
  const modalEl = ensureSepsisNewsRequiredModalMounted();
  if (!modalEl) return;

  if (typeof bootstrap !== "undefined") {
    bootstrap.Modal.getInstance(modalEl)?.hide();
  }

  modalEl.classList.remove("show");
  modalEl.setAttribute("aria-hidden", "true");
  modalEl.removeAttribute("aria-modal");
  modalEl.removeAttribute("role");
  modalEl.style.display = "none";
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => backdrop.remove());
  document.body.classList.remove("modal-open");
  document.body.style.removeProperty("overflow");
  document.body.style.removeProperty("padding-right");
}

function showAssessmentViewDirectly() {
  currentAppView = "assessment";
  setElementHiddenState(selectors.homeView, true);
  setElementHiddenState(selectors.assessmentView, false);
  setElementHiddenState(selectors.historyView, true);
  setElementHiddenState(selectors.sepsisView, true);
  setElementHiddenState(selectors.knowledgeView, true);
  updatePrototypeVisibility("assessment");
  updateMobileSaveBarVisibility("assessment");
  updateAppNavigationState("assessment");
  updateDesktopViewCopy("assessment");
}

function persistNewsRequiredNavigation(hn = "") {
  try {
    localStorage.setItem(NEWS_REQUIRED_NAV_KEY, sanitizeHN(hn || ""));
  } catch {}
}

function consumeNewsRequiredNavigation() {
  try {
    const storedHn = sanitizeHN(localStorage.getItem(NEWS_REQUIRED_NAV_KEY) || "");
    localStorage.removeItem(NEWS_REQUIRED_NAV_KEY);
    return storedHn;
  } catch {
    return "";
  }
}

function prepareAssessmentFormForSepsisHn(hn = "") {
  currentEditingRecord = null;
  setFormLocked(false);
  validationActive = false;
  document.querySelectorAll(".score-input, .tracked-input").forEach(el => {
    el.value = "";
    el.dataset.selectedOptionKey = "";
  });
  setLocation("");
  selectors.hn.value = hn;
  if (selectors.gender) selectors.gender.value = "";
  if (selectors.age) selectors.age.value = "";
  document.getElementById("scale1").checked = true;
  renderAllMetricButtons();
  setDefaultAssessmentTime();
  updateAssessmentValidation(false);
  updateUI();
  setStatus("กรอก NEWS สำหรับ HN นี้ต่อได้เลย", "info");
  sepsisNewsRequiredHn = "";
}

function getRequestedAppView() {
  const hashView = (window.location.hash || "").replace("#", "");
  const queryView = new URL(window.location.href).searchParams.get("view") || "";
  return hashView || queryView;
}

function updateAppViewUrl(view) {
  const nextView = view || "home";
  const url = new URL(window.location.href);
  url.searchParams.delete("view");
  url.hash = nextView;
  history.pushState(null, "", url.toString());
}

function syncViewFromHash() {
  const requestedView = getRequestedAppView();
  if (requestedView === "assessment") {
    forceCloseSepsisNewsRequiredModal();
    const pendingHn = consumeNewsRequiredNavigation();
    prepareAssessmentFormForSepsisHn(sanitizeHN(pendingHn || sepsisNewsRequiredHn || selectors.hn?.value || ""));
    setAppView("assessment");
    showAssessmentViewDirectly();
    selectors.assessmentCard?.scrollIntoView({ behavior: "smooth", block: "start" });
    selectors.assessmentTime?.focus();
    return true;
  }

  if (requestedView === "history" || requestedView === "sepsis" || requestedView === "home" || requestedView === "dashboard" || requestedView === "knowledge" || requestedView === "evaluation") {
    setAppView(requestedView, { scrollToTop: false });
    return true;
  }

  return false;
}

function mergeRemoteHistoryItems(items = []) {
  const merged = [];
  const seenKeys = new Set();

  [...items.map(normalizeHistoryItem), ...historyState.remoteItems.map(normalizeHistoryItem)].forEach(item => {
    const key = buildHistoryItemKeys(item).find(Boolean);
    if (!key || seenKeys.has(key)) return;
    seenKeys.add(key);
    merged.push(item);
  });

  historyState.remoteItems = merged;
  historyState.remoteLoaded = true;
  historyState.remoteFailed = false;
}

function clearSepsisHistoryDerivedFields() {
  sepsisState.patientAge = "";
  sepsisState.patientSex = "";
  sepsisState.assessmentLocation = "";
  sepsisState.newsScore = 0;
  sepsisState.newsLevel = "";
}

function setSepsisHnSearchDraft(hn = "") {
  sepsisHnSearchDraft = sanitizeHN(hn);
  setSepsisHistoryLookupPanel("hidden");
  renderSepsisProtocol();
  renderSepsisCurrentCaseSummary();
}

async function lookupSepsisHistoryByHn(hn) {
  const normalizedHn = sanitizeHN(hn);
  if (normalizedHn.length !== 9) {
    sepsisNewsRequiredHn = "";
    setSepsisHnSearchDraft(normalizedHn);
    return null;
  }
  sepsisHnSearchDraft = normalizedHn;

  const localOrLoadedMatch = findLatestHistoryItemByHn(normalizedHn);
  if (localOrLoadedMatch) {
    sepsisHnSearchDraft = null;
    sepsisNewsRequiredHn = "";
    setSepsisHistoryLookupPanel("hidden");
    return localOrLoadedMatch;
  }

  setSepsisHistoryLookupPanel("searching");
  try {
    const remoteItems = await fetchHistoryFromGoogleSheet({
      date: "",
      hn: normalizedHn,
      location: "",
      levelKey: "",
      red: ""
    });
    mergeRemoteHistoryItems(remoteItems);
    renderHistory();
  } catch (error) {
    historyState.remoteFailed = true;
    console.error(error);
  }

  const matchAfterRemote = findLatestHistoryItemByHn(normalizedHn);
  if (!matchAfterRemote) {
    sepsisNewsRequiredHn = normalizedHn;
    setSepsisHnSearchDraft(normalizedHn);
    renderSepsisProtocol();
  } else {
    sepsisHnSearchDraft = null;
    sepsisNewsRequiredHn = "";
  }
  setSepsisHistoryLookupPanel(matchAfterRemote ? "hidden" : (historyState.remoteFailed ? "error" : "notFound"));
  return matchAfterRemote;
}

function goToNewsAssessmentFromSepsisHn() {
  const hnInputValue = document.getElementById("sepsisPatientHnInput")?.value || "";
  const hn = sanitizeHN(hnInputValue || sepsisHnSearchDraft || sepsisNewsRequiredHn || sepsisState.patientHn || "");
  persistNewsRequiredNavigation(hn);
  forceCloseSepsisNewsRequiredModal();
  prepareAssessmentFormForSepsisHn(hn);
  setAppView("assessment");
  showAssessmentViewDirectly();
  selectors.assessmentCard?.scrollIntoView({ behavior: "smooth", block: "start" });
  selectors.assessmentTime?.focus();
  setStatus("กรอก NEWS สำหรับ HN นี้ต่อได้เลย", "info");

  history.pushState(null, "", `${window.location.pathname}?view=assessment#assessment`);
  syncViewFromHash();
}

window.goToNewsAssessmentFromSepsisHn = goToNewsAssessmentFromSepsisHn;

function restoreMetricSelection(inputId, value, preferredOptionKey = "") {
  const input = document.getElementById(inputId);
  if (!input) return;

  const normalizedValue = value === undefined || value === null ? "" : String(value);
  if (!normalizedValue) {
    input.value = "";
    input.dataset.selectedOptionKey = "";
    syncMetricButtons(inputId);
    return;
  }

  let optionKey = preferredOptionKey;
  if (optionKey && !document.querySelector(`[data-input-target="${inputId}"][data-option-key="${optionKey}"]`)) {
    optionKey = "";
  }

  if (!optionKey) {
    optionKey = document.querySelector(`[data-input-target="${inputId}"][data-score-value="${normalizedValue}"]`)?.dataset.optionKey || "";
  }

  input.value = normalizedValue;
  input.dataset.selectedOptionKey = optionKey;
  syncMetricButtons(inputId);
}

function loadHistoryItemIntoForm(item) {
  if (!item) return;

  const copy = t();
  const selectionKeys = item.selectionKeys || {};
  const spo2Scale = String(item.spo2Scale || "1");
  currentEditingRecord = {
    savedAt: item.savedAt || "",
    hn: sanitizeHN(item.hn || ""),
    assessmentTime: item.assessmentTime || ""
  };

  validationActive = false;
  document.querySelectorAll(".score-input, .tracked-input").forEach(input => {
    input.value = "";
    input.dataset.selectedOptionKey = "";
  });

  selectors.assessmentTime.value = formatAssessmentDateTimeForInput(item.assessmentTime || item.savedAt);
  selectors.hn.value = sanitizeHN(item.hn || "");
  if (selectors.gender) selectors.gender.value = normalizeGender(item.gender || "");
  if (selectors.age) selectors.age.value = sanitizeAge(item.age || "");
  setLocation(String(item.location || "").trim());

  const scaleInput = document.querySelector(`.spo2-scale[value="${spo2Scale}"]`);
  if (scaleInput) {
    scaleInput.checked = true;
  } else {
    document.getElementById("scale1").checked = true;
  }

  renderAllMetricButtons();

  restoreMetricSelection("respiratoryRate", item.respiratoryRate, selectionKeys.respiratoryRate || "");
  restoreMetricSelection("spo2", item.spo2, selectionKeys.spo2 || "");
  restoreMetricSelection("oxygenSupport", item.oxygenSupport, selectionKeys.oxygenSupport || "");
  restoreMetricSelection("temperature", item.temperature, selectionKeys.temperature || "");
  restoreMetricSelection("systolicBP", item.systolicBP, selectionKeys.systolicBP || "");
  restoreMetricSelection("heartRate", item.heartRate, selectionKeys.heartRate || "");
  restoreMetricSelection("consciousness", item.consciousness, selectionKeys.consciousness || "");
  restoreMetricSelection("infectionSource", item.infectionSource, selectionKeys.infectionSource || "");

  updateAssessmentValidation(false);
  updateUI();
  openSepsisCaseFromHistoryItem(item);
  setFormLocked(true);
  setStatus(copy.statuses.historyLoaded, "success");
  setAppView("assessment", { scrollToTop: false });
  selectors.assessmentCard?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function setSheetLoadingOverlay(isLoading, options = {}) {
  if (!selectors.sheetLoadingOverlay) return;

  if (selectors.sheetLoadingTitle && options.title) {
    selectors.sheetLoadingTitle.textContent = options.title;
  }
  if (selectors.sheetLoadingText && options.text) {
    selectors.sheetLoadingText.textContent = options.text;
  }

  selectors.sheetLoadingOverlay.hidden = !isLoading;
}

async function openHistorySepsisProtocol(item, triggerButton = null) {
  if (!item) return;

  if (triggerButton) triggerButton.disabled = true;
  setSheetLoadingOverlay(true, {
    title: "กำลังโหลดข้อมูล",
    text: "กำลังดึงข้อมูล Sepsis Protocol..."
  });
  setStatus("กำลังโหลด Sepsis Protocol...", "info");

  try {
    try {
      const sheetCase = await fetchSepsisFromGoogleSheet(item);
      if (sheetCase && openSepsisCaseState(sheetCase)) {
        setAppView("sepsis", { scrollToTop: true });
        setSepsisStatus("โหลด Sepsis Protocol แล้ว", "success");
        return;
      }
    } catch (error) {
      console.error(error);
    }

    const opened = openSepsisCaseFromHistoryItem(item);
    if (!opened) {
      setStatus("ไม่สามารถเปิด Sepsis Protocol จากประวัตินี้ได้", "error");
      return;
    }

    setAppView("sepsis", { scrollToTop: true });
    setSepsisStatus("ยังไม่พบข้อมูล Sepsis Protocol จึงเปิดเคสจากประวัติ NEWS", "info");
  } finally {
    setSheetLoadingOverlay(false);
    if (triggerButton) triggerButton.disabled = false;
  }
}

function formatDateTime(value) {
  if (!value) return "-";
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleString(currentLanguage === "th" ? "th-TH" : "en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function updateHistorySourceNote(source, itemCount) {
  const copy = t();
  if (!selectors.historySourceNote) return;
  const filters = getHistoryFilters();
  const hasFilters = Boolean(filters.date || filters.hn || filters.location || filters.levelKey || filters.red);

  let message = source === "google" ? copy.historySourceGoogle : copy.historySourceLocal;
  if (!itemCount) {
    message = hasFilters || historyState.remoteLoaded ? copy.historySourceEmpty : copy.noHistory;
  }

  selectors.historySourceNote.textContent = message;
  selectors.historySourceNote.classList.toggle("error", source !== "google" && Boolean(historyState.remoteFailed));
}

function updateHistoryResultCount(itemCount) {
  const copy = t();
  if (!selectors.historyResultCount) return;

  selectors.historyResultCount.textContent = itemCount
    ? copy.historyResultsCount.replace("{count}", String(itemCount))
    : copy.historyResultsCountZero;
}

function renderHistory() {
  const copy = t();
  const { items, source } = getDisplayedHistory();
  historyState.displayedItems = items;

  updateHistorySourceNote(source, items.length);
  updateHistoryResultCount(items.length);

  if (!items.length) {
    selectors.historyTable.innerHTML = `
      <tr class="history-empty-row">
        <td colspan="6" class="text-center text-secondary-light py-4">${escapeHtml(historyState.remoteLoaded ? copy.historySourceEmpty : copy.noHistory)}</td>
      </tr>
    `;
    return;
  }

  selectors.historyTable.innerHTML = items.map((item, index) => `
    <tr class="history-row" data-history-index="${index}">
      <td>${escapeHtml(item.location || "-")}</td>
      <td>${escapeHtml(item.hn || "-")}</td>
      <td><span class="badge text-bg-dark border">${item.score}</span></td>
      <td>${escapeHtml(copy.levelLabels[item.levelKey] || item.level || "-")}</td>
      <td>${escapeHtml(formatDateTime(item.assessmentTime || item.savedAt))}</td>
      <td class="history-action-cell">
        <button type="button" class="btn btn-outline-light btn-sm" data-view-news-index="${index}">${escapeHtml(pageText().desktopNav.assessment)}</button>
        <button type="button" class="btn btn-outline-info btn-sm" data-view-sepsis-index="${index}">Sepsis Protocol</button>
        ${isAdminLoggedIn() ? `<button type="button" class="btn btn-outline-danger btn-sm" data-delete-history-index="${index}">${escapeHtml(copy.adminDelete)}</button>` : ""}
      </td>
    </tr>
  `).join("");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(message, type = "info") {
  selectors.saveStatus.textContent = message;
  selectors.saveStatus.className = `save-status ${type}`;
}

async function fetchHistoryFromGoogleSheet(filters = getHistoryFilters()) {
  const params = new URLSearchParams({
    mode: "history",
    limit: String(filters.limit || HISTORY_FETCH_LIMIT)
  });

  if (filters.date) params.set("date", filters.date);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.hn) params.set("hn", filters.hn);
  if (filters.location) params.set("location", filters.location);
  if (filters.levelKey) params.set("levelKey", filters.levelKey);
  if (filters.red) params.set("red", filters.red);

  const response = await fetch(`${SHEET_WEBAPP_URL}?${params.toString()}`, {
    method: "GET",
    mode: "cors",
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (!payload || payload.ok !== true || !Array.isArray(payload.items)) {
    throw new Error("Invalid history response");
  }

  return mergeLocalHistoryMetadata(payload.items.map(normalizeHistoryItem));
}

async function refreshHistory(options = {}) {
  const { silent = false } = options;
  const copy = t();

  historyState.loading = true;
  if (!silent && selectors.historySourceNote) {
    selectors.historySourceNote.textContent = copy.historyLoading;
    selectors.historySourceNote.classList.remove("error");
  }

  try {
    historyState.remoteItems = await fetchHistoryFromGoogleSheet();
    historyState.remoteLoaded = true;
    historyState.remoteFailed = false;
  } catch (error) {
    historyState.remoteItems = [];
    historyState.remoteLoaded = false;
    historyState.remoteFailed = true;
    console.error(error);
  } finally {
    historyState.loading = false;
    syncSepsisCasesWithHistory();
    renderHistory();
  }
}

function scheduleHistoryRefresh() {
  window.clearTimeout(historyFilterTimer);
  historyFilterTimer = window.setTimeout(() => {
    refreshHistory({ silent: true });
  }, 250);
}

async function saveToGoogleSheet(payload) {
  await fetch(SHEET_WEBAPP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  return { ok: true };
}

async function postJsonToSheet(payload) {
  const response = await fetch(SHEET_WEBAPP_URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json();
}

async function loginAdmin() {
  const copy = t();
  const username = selectors.adminUsername?.value.trim() || "";
  const password = selectors.adminPassword?.value || "";

  try {
    const payload = await postJsonToSheet({
      mode: "login",
      username,
      password
    });

    if (!payload || payload.ok !== true || !payload.token) {
      throw new Error(payload?.error || copy.adminLoginFailed);
    }

    persistAdminAuth({
      token: payload.token,
      expiresAt: payload.expiresAt || null,
      username: payload.username || username
    });
    if (selectors.adminPassword) selectors.adminPassword.value = "";
    if (selectors.adminStatus) {
      selectors.adminStatus.textContent = copy.adminLoginSuccess;
      selectors.adminStatus.classList.remove("error");
    }
  } catch (error) {
    if (selectors.adminStatus) {
      selectors.adminStatus.textContent = copy.adminLoginFailed;
      selectors.adminStatus.classList.add("error");
    }
    console.error(error);
  }
}

async function deleteHistoryRecord(item) {
  const copy = t();

  if (!isAdminLoggedIn()) {
    setStatus(copy.adminRequired, "error");
    return;
  }

  if (!window.confirm(copy.adminDeleteConfirm)) return;

  try {
    const payload = await postJsonToSheet({
      mode: "delete",
      token: adminAuth.token,
      match: {
        savedAt: item.savedAt || "",
        hn: item.hn || "",
        assessmentTime: item.assessmentTime || ""
      }
    });

    if (!payload || payload.ok !== true) {
      throw new Error(payload?.error || copy.statuses.adminDeleteError);
    }

    deleteLocalHistory(item);
    syncSepsisCasesWithHistory();
    if (currentEditingRecord && isSameHistoryRecord(currentEditingRecord, item)) {
      resetForm();
    }
    await refreshHistory({ silent: true });
    setStatus(copy.adminDeleteSuccess, "success");
  } catch (error) {
    const message = String(error?.message || error);
    if (/expired|invalid token/i.test(message)) {
      persistAdminAuth(null);
      setStatus(copy.statuses.adminSessionExpired, "error");
    } else {
      setStatus(copy.statuses.adminDeleteError, "error");
    }
    console.error(error);
  }
}

function getEditingMatchPayload() {
  if (!currentEditingRecord) return null;
  return {
    savedAt: currentEditingRecord.savedAt || "",
    hn: currentEditingRecord.hn || "",
    assessmentTime: currentEditingRecord.assessmentTime || ""
  };
}

async function handleSave() {
  const copy = t();
  if (historyFormLocked) {
    setStatus(copy.statuses.historyLoaded, "info");
    return;
  }
  const score = calculateScore();
  const levelKey = getRiskLevel(score);
  const red = checkRedFlag();
  const location = selectors.location.value.trim();
  const assessmentTime = selectors.assessmentTime.value;
  const hn = sanitizeHN(selectors.hn.value);
  const gender = normalizeGender(selectors.gender?.value || "");
  const age = sanitizeAge(selectors.age?.value || "");

  selectors.hn.value = hn;
  if (selectors.age) selectors.age.value = age;
  validationActive = true;
  const validation = updateAssessmentValidation(true);

  if (validation.invalidTime) {
    setStatus(copy.statuses.assessmentTimeRequired, "error");
    selectors.assessmentTime.focus();
    return;
  }

  if (validation.invalidLocation) {
    setStatus(copy.statuses.locationRequired, "error");
    document.querySelector(".location-option")?.focus();
    return;
  }

  if (validation.invalidHn) {
    setStatus(copy.statuses.hnRequired, "error");
    selectors.hn.focus();
    return;
  }

  validationActive = false;
  updateAssessmentValidation(false);
  const editingMatch = getEditingMatchPayload();
  const savedAt = editingMatch?.savedAt || new Date().toISOString();

  const data = {
    location,
    hn,
    gender,
    age,
    assessmentTime,
    respiratoryRate: selectors.respiratoryRate.value || "",
    spo2: selectors.spo2.value || "",
    oxygenSupport: selectors.oxygenSupport.value || "",
    temperature: selectors.temperature.value || "",
    systolicBP: selectors.systolicBP.value || "",
    heartRate: selectors.heartRate.value || "",
    consciousness: selectors.consciousness.value || "",
    infectionSource: selectors.infectionSource.value || "",
    spo2Scale: document.querySelector(".spo2-scale:checked")?.value || "1",
    score,
    level: copy.levelLabels[levelKey],
    levelKey,
    red,
    savedAt,
    mode: editingMatch ? "update" : "create",
    match: editingMatch,
    selectionKeys: {
      respiratoryRate: selectors.respiratoryRate.dataset.selectedOptionKey || "",
      spo2: selectors.spo2.dataset.selectedOptionKey || "",
      oxygenSupport: selectors.oxygenSupport.dataset.selectedOptionKey || "",
      temperature: selectors.temperature.dataset.selectedOptionKey || "",
      systolicBP: selectors.systolicBP.dataset.selectedOptionKey || "",
      heartRate: selectors.heartRate.dataset.selectedOptionKey || "",
      consciousness: selectors.consciousness.dataset.selectedOptionKey || "",
      infectionSource: selectors.infectionSource.dataset.selectedOptionKey || ""
    }
  };

  saveLocal(data, editingMatch);
  openSepsisCaseFromHistoryItem(data);
  renderHistory();
  setStatus(copy.statuses.savePending, "info");

  try {
    await saveToGoogleSheet(data);
    setStatus(copy.statuses.saveSuccess, "success");
    currentEditingRecord = {
      savedAt: data.savedAt,
      hn: data.hn,
      assessmentTime: data.assessmentTime
    };
  } catch (error) {
    console.error(error);
    setStatus(copy.statuses.saveError, "error");
  } finally {
    await refreshHistory({ silent: true });
    openSepsisCaseFromHistoryItem(data);
  }
}

function resetForm() {
  const copy = t();
  currentEditingRecord = null;
  setFormLocked(false);
  validationActive = false;
  document.querySelectorAll(".score-input, .tracked-input").forEach(el => {
    el.value = "";
    el.dataset.selectedOptionKey = "";
  });
  setLocation("");
  selectors.hn.value = "";
  if (selectors.gender) selectors.gender.value = "";
  if (selectors.age) selectors.age.value = "";
  document.getElementById("scale1").checked = true;
  renderAllMetricButtons();
  setDefaultAssessmentTime();
  setStatus(copy.statuses.resetSuccess, "info");
  updateAssessmentValidation(false);
  updateUI();
}

function clearHistory() {
  const copy = t();
  currentEditingRecord = null;
  setFormLocked(false);
  localStorage.removeItem(STORAGE_KEY);
  syncSepsisCasesWithHistory();
  renderHistory();
  setStatus(copy.statuses.clearHistorySuccess, "info");
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./service-worker.js?v=20260610-readable-type-cache-fix").catch(console.error);
    });
  }
}

function setupInstallPrompt() {
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;
    selectors.installBtn.classList.remove("d-none");
  });

  selectors.installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    selectors.installBtn.classList.add("d-none");
  });
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "th";
  localStorage.setItem(LANGUAGE_KEY, currentLanguage);
  applyStaticTranslations();
  renderAllMetricButtons();
  renderHistory();
  renderDashboard();
  renderSepsisProtocol();
  renderSepsisCaseList();
  renderHomeSepsisCases();
  renderSmartEvaluation();
  updateDesktopViewCopy(currentAppView);
  updateUI();
  syncPanelHeights();
}

function syncPanelHeights() {
  syncNewsStickyPanel();
  syncSepsisStickyPanel();
}

function syncNewsStickyPanel() {
  if (!selectors.assessmentCard || !selectors.resultPanel || !selectors.stickyPanel || !selectors.stickyPanel.parentElement) return;

  const sidebarColumn = selectors.stickyPanel.parentElement;

  if (window.innerWidth < 992) {
    selectors.resultPanel.style.minHeight = "";
    selectors.stickyPanel.style.top = "";
    selectors.stickyPanel.style.left = "";
    selectors.stickyPanel.style.width = "";
    selectors.stickyPanel.style.maxHeight = "";
    sidebarColumn.style.minHeight = "";
    return;
  }

  const assessmentRect = selectors.assessmentCard.getBoundingClientRect();
  const sidebarRect = sidebarColumn.getBoundingClientRect();
  const assessmentHeight = assessmentRect.height;
  const advicePanel = selectors.stickyPanel.querySelectorAll("section")[1];
  const viewportTop = Math.max(16, Math.round(assessmentRect.top));
  const viewportBottomGap = 16;
  const availableHeight = Math.max(320, window.innerHeight - viewportTop - viewportBottomGap);

  selectors.resultPanel.style.minHeight = "";
  const naturalResultHeight = selectors.resultPanel.scrollHeight;
  const adviceHeight = advicePanel ? advicePanel.scrollHeight : 0;
  const gapHeight = advicePanel ? 16 : 0;
  const remainingForResult = Math.max(naturalResultHeight, availableHeight - adviceHeight - gapHeight);
  const resultHeight = Math.max(naturalResultHeight, Math.min(assessmentHeight, remainingForResult));

  selectors.stickyPanel.style.top = `${viewportTop}px`;
  selectors.stickyPanel.style.left = `${Math.round(sidebarRect.left)}px`;
  selectors.stickyPanel.style.width = `${Math.round(sidebarRect.width)}px`;
  selectors.stickyPanel.style.maxHeight = `${Math.ceil(availableHeight)}px`;
  selectors.resultPanel.style.minHeight = `${Math.ceil(resultHeight)}px`;
  sidebarColumn.style.minHeight = `${Math.ceil(availableHeight + viewportTop)}px`;
}

function syncSepsisStickyPanel() {
  const panel = selectors.sepsisStickyPanel;
  const sepsisView = selectors.sepsisView;
  if (!panel || !panel.parentElement) return;

  const sideColumn = panel.parentElement;

  if (window.innerWidth < 992 || sepsisView?.hasAttribute("hidden")) {
    panel.style.top = "";
    panel.style.left = "";
    panel.style.width = "";
    panel.style.maxHeight = "";
    sideColumn.style.minHeight = "";
    return;
  }

  const sideRect = sideColumn.getBoundingClientRect();
  const viewportTop = Math.max(16, Math.round(sideRect.top));
  const viewportBottomGap = 16;
  const availableHeight = Math.max(320, window.innerHeight - viewportTop - viewportBottomGap);

  panel.style.top = `${viewportTop}px`;
  panel.style.left = `${Math.round(sideRect.left)}px`;
  panel.style.width = `${Math.round(sideRect.width)}px`;
  panel.style.maxHeight = `${Math.ceil(availableHeight)}px`;
  sideColumn.style.minHeight = `${Math.ceil(availableHeight + viewportTop)}px`;
}

function setupInteractiveCards() {
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const cards = document.querySelectorAll(".app-card, .result-panel, .metric-card");

  cards.forEach(card => {
    card.classList.add("interactive-card");

    if (!supportsHover) return;

    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--pointer-x", `${x}%`);
      card.style.setProperty("--pointer-y", `${y}%`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--pointer-x", "50%");
      card.style.setProperty("--pointer-y", "50%");
    });
  });
}

function updateHomeClock() {
  const now = new Date();
  const locale = currentLanguage === "en" ? "en-US" : "th-TH";
  const timeText = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const dateText = now.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  const clockTime = document.getElementById("homeClockTime");
  const clockDate = document.getElementById("homeClockDate");
  if (clockTime) clockTime.textContent = timeText;
  if (clockDate) clockDate.textContent = dateText;
}

function getSepsisCaseProgressCounts(item = {}) {
  const metrics = calculateSepsisMetricsForCase(item);
  const savedCompletedSteps = Number.parseInt(item.completedSteps ?? "", 10);
  const savedTotalSteps = Number.parseInt(item.totalSteps ?? "", 10);
  const completedSteps = Number.isNaN(savedCompletedSteps) ? metrics.completedSteps : savedCompletedSteps;
  const totalSteps = Number.isNaN(savedTotalSteps) ? SEPSIS_PROGRESS_TASKS.length : savedTotalSteps;
  return { completedSteps, totalSteps };
}

function renderHomeSepsisCaseRow(item) {
  const copy = sepsisCopy();
  const progress = getSepsisCaseProgressCounts(item);
  const isComplete = progress.completedSteps >= progress.totalSteps;
  const timeText = getSepsisCaseSubtitle(item);
  const statusText = isComplete ? copy.currentCase.statusComplete : copy.currentCase.statusWorking;
  const progressText = `${progress.completedSteps}/${progress.totalSteps}`;
  return `
    <button class="home-patient-row ${isComplete ? "complete" : "in-progress"}" type="button" data-home-sepsis-case="${escapeHtml(item.caseId)}">
      <span class="home-patient-avatar ${isComplete ? "low" : "high"}">${getHomeSepsisCaseAvatarMarkup(item)}</span>
      <span class="home-patient-main"><strong>${escapeHtml(getSepsisCaseTitle(item))}</strong></span>
      <span class="home-patient-time">${escapeHtml(timeText)}</span>
      <span class="home-sepsis-status-pill ${isComplete ? "complete" : "in-progress"}"><small>SEPSIS ${escapeHtml(progressText)}</small><em>${escapeHtml(statusText)}</em></span>
      <span class="home-row-arrow" aria-hidden="true">›</span>
    </button>
  `;
}

function getHomeSepsisCaseAvatarMarkup(item = {}) {
  const patientSex = getSepsisSexValueFromHistory(getFirstSheetValue(
    item.patientSex,
    item.patientGender,
    item.sex,
    item.gender
  ));

  if (patientSex === "ชาย") {
    return `<img class="home-patient-avatar-img" src="icon sepsis/man.svg" alt="" />`;
  }

  if (patientSex === "หญิง") {
    return `<img class="home-patient-avatar-img" src="icon sepsis/woman.svg" alt="" />`;
  }

  return `<svg class="sepsis-svg-icon"><use href="#sp-user"></use></svg>`;
}

function readSmartEvaluation() {
  try {
    const raw = localStorage.getItem(SMART_EVALUATION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setSmartEvaluationStatus(message = "", type = "info") {
  if (!selectors.smartEvaluationStatus) return;
  selectors.smartEvaluationStatus.textContent = message;
  selectors.smartEvaluationStatus.className = `sepsis-save-status ${type}`;
}

function clearSmartEvaluationForm() {
  smartEvaluationValidationActive = false;
  localStorage.removeItem(SMART_EVALUATION_KEY);
  selectors.smartEvaluationForm?.reset();
  renderSmartEvaluation();
  updateSmartEvaluationSummary();
}

function showSmartEvaluationThankYouPopup() {
  const message = `${pageText().evaluation.thankTitle} ${pageText().evaluation.thankText}`;
  const modalEl = document.getElementById("smartEvaluationThankYouModal");

  if (!modalEl || typeof bootstrap === "undefined") {
    window.alert(message);
    return;
  }

  if (modalEl.parentElement !== document.body) {
    document.body.appendChild(modalEl);
  }

  modalEl.style.zIndex = "2030";
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function renderSmartEvaluation() {
  if (!selectors.smartEvaluationForm || !selectors.smartEvaluationQuestions) return;
  const saved = readSmartEvaluation();
  const answers = saved?.answers || {};
  const questions = smartEvaluationQuestions();

  selectors.smartEvaluationQuestions.innerHTML = questions.map((question, index) => {
    const number = index + 1;
    return `
      <article class="smart-evaluation-question">
        <div class="smart-evaluation-question-copy">
          <span>${number}</span>
          <strong>${escapeHtml(question)}</strong>
        </div>
        <div class="smart-evaluation-scale" role="radiogroup" aria-label="${escapeHtml(question)}">
          ${[1, 2, 3, 4, 5].map(score => `
            <label>
              <input type="radio" name="question-${number}" value="${score}" ${Number(answers[number]) === score ? "checked" : ""} />
              <span>${score}</span>
            </label>
          `).join("")}
        </div>
      </article>
    `;
  }).join("");

  if (saved?.position) {
    const positionInput = Array.from(selectors.smartEvaluationForm.querySelectorAll('[name="position"]')).find(input => input.value === saved.position);
    if (positionInput) positionInput.checked = true;
  }
  if (saved?.experience) {
    const experienceInput = Array.from(selectors.smartEvaluationForm.querySelectorAll('[name="experience"]')).find(input => input.value === saved.experience);
    if (experienceInput) experienceInput.checked = true;
  }
  const suggestionEl = document.getElementById("smartEvaluationSuggestion");
  if (suggestionEl) suggestionEl.value = saved?.suggestion || "";

  updateSmartEvaluationSummary();
  if (saved?.submittedAt) {
    setSmartEvaluationStatus(currentLanguage === "en"
      ? `Last saved ${formatDateTimeThai(saved.submittedAt)} answered ${Object.keys(saved.answers || {}).length}/${questions.length} items`
      : `บันทึกล่าสุด ${formatDateTimeThai(saved.submittedAt)} ตอบแล้ว ${Object.keys(saved.answers || {}).length}/${questions.length} ข้อ`, "success");
  }
}

function getSmartEvaluationFormData() {
  if (!selectors.smartEvaluationForm) return null;
  const formData = new FormData(selectors.smartEvaluationForm);
  const answers = {};
  let answered = 0;

  smartEvaluationQuestions().forEach((_, index) => {
    const number = index + 1;
    const score = Number.parseInt(formData.get(`question-${number}`) || "", 10);
    if (!Number.isNaN(score)) {
      answers[number] = score;
      answered += 1;
    }
  });

  return {
    position: formData.get("position") || "",
    experience: formData.get("experience") || "",
    suggestion: String(formData.get("suggestion") || "").trim(),
    answers,
    answered,
    totalQuestions: smartEvaluationQuestions().length
  };
}

function updateSmartEvaluationSummary() {
  const data = getSmartEvaluationFormData();
  if (!data) return;
  if (selectors.smartEvaluationAnswered) {
    selectors.smartEvaluationAnswered.textContent = `${data.answered}/${data.totalQuestions}`;
  }
  if (smartEvaluationValidationActive) {
    updateSmartEvaluationValidationHighlights(data);
  }
}

function createSmartEvaluationSheetPayload(data) {
  const submittedAt = new Date().toISOString();
  const answers = data.answers || {};
  const totalScore = Object.values(answers).reduce((sum, value) => sum + (Number(value) || 0), 0);
  const averageScore = data.totalQuestions ? (totalScore / data.totalQuestions).toFixed(2) : "";

  return {
    sheetName: SATISFACTION_SHEET_NAME,
    recordType: "satisfactionAssessment",
    submissionId: `satisfaction-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt,
    submittedDate: submittedAt.slice(0, 10),
    position: data.position || "",
    experience: data.experience || "",
    q01_screenDesign: answers[1] || "",
    q02_menuEasy: answers[2] || "",
    q03_easyToUse: answers[3] || "",
    q04_recordSpeed: answers[4] || "",
    q05_reduceScreeningTime: answers[5] || "",
    q06_clinicalDecision: answers[6] || "",
    q07_newsScoreEase: answers[7] || "",
    q08_protocolComplete: answers[8] || "",
    q09_reduceError: answers[9] || "",
    q10_continuousFollowUp: answers[10] || "",
    q11_guidelineAccess: answers[11] || "",
    q12_dataReliability: answers[12] || "",
    q13_erWorkBenefit: answers[13] || "",
    q14_overallSatisfaction: answers[14] || "",
    totalScore,
    averageScore,
    answered: data.answered,
    totalQuestions: data.totalQuestions,
    suggestion: data.suggestion || "",
    userAgent: navigator.userAgent || "",
    appVersion: APP_VERSION
  };
}

function clearSmartEvaluationInvalidHighlights() {
  if (!selectors.smartEvaluationForm) return;
  selectors.smartEvaluationForm
    .querySelectorAll(".smart-evaluation-field.invalid, .smart-evaluation-question.invalid")
    .forEach(element => element.classList.remove("invalid"));
}

function updateSmartEvaluationValidationHighlights(data) {
  if (!selectors.smartEvaluationForm) return;
  clearSmartEvaluationInvalidHighlights();

  if (!data.position) {
    selectors.smartEvaluationForm.querySelector('[name="position"]')
      ?.closest(".smart-evaluation-field")
      ?.classList.add("invalid");
  }

  if (!data.experience) {
    selectors.smartEvaluationForm.querySelector('[name="experience"]')
      ?.closest(".smart-evaluation-field")
      ?.classList.add("invalid");
  }

  smartEvaluationQuestions().forEach((_, index) => {
    const questionNumber = index + 1;
    if (data.answers[questionNumber]) return;

    selectors.smartEvaluationForm.querySelector(`[name="question-${questionNumber}"]`)
      ?.closest(".smart-evaluation-question")
      ?.classList.add("invalid");
  });
}

function scrollToSmartEvaluationMissingField(target) {
  if (!target || !selectors.smartEvaluationForm) return;

  const targetEl = target.closest(".smart-evaluation-question, .smart-evaluation-field, .smart-evaluation-card")
    || target;

  targetEl.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });

  window.setTimeout(() => {
    if (typeof target.focus === "function") {
      target.focus({ preventScroll: true });
    }
  }, 350);
}

function validateSmartEvaluationRequiredFields(data) {
  if (!selectors.smartEvaluationForm) return true;
  smartEvaluationValidationActive = true;
  updateSmartEvaluationValidationHighlights(data);

  if (!data.position) {
    setSmartEvaluationStatus(currentLanguage === "en"
      ? "Please select position in Section 1 before submitting"
      : "กรุณาเลือกตำแหน่งในส่วนที่ 1 ก่อนบันทึก", "error");
    scrollToSmartEvaluationMissingField(selectors.smartEvaluationForm.querySelector('[name="position"]'));
    return false;
  }

  if (!data.experience) {
    setSmartEvaluationStatus(currentLanguage === "en"
      ? "Please select work experience in Section 1 before submitting"
      : "กรุณาเลือกระยะเวลาการทำงานในส่วนที่ 1 ก่อนบันทึก", "error");
    scrollToSmartEvaluationMissingField(selectors.smartEvaluationForm.querySelector('[name="experience"]'));
    return false;
  }

  const missingQuestionIndex = smartEvaluationQuestions().findIndex((_, index) => !data.answers[index + 1]);
  if (missingQuestionIndex !== -1) {
    const questionNumber = missingQuestionIndex + 1;
    setSmartEvaluationStatus(currentLanguage === "en"
      ? `Please rate item ${questionNumber} in Section 2 before submitting`
      : `กรุณาให้คะแนนข้อที่ ${questionNumber} ในส่วนที่ 2 ก่อนบันทึก`, "error");
    scrollToSmartEvaluationMissingField(selectors.smartEvaluationForm.querySelector(`[name="question-${questionNumber}"]`));
    return false;
  }

  return true;
}

async function handleSmartEvaluationSubmit(event) {
  event.preventDefault();
  const data = getSmartEvaluationFormData();
  if (!data) return;

  if (!validateSmartEvaluationRequiredFields(data)) return;

  const payload = {
    ...data,
    submittedAt: new Date().toISOString()
  };
  const sheetPayload = createSmartEvaluationSheetPayload(data);
  localStorage.setItem(SMART_EVALUATION_KEY, JSON.stringify(payload));
  setSmartEvaluationStatus(currentLanguage === "en"
    ? `Assessment saved. Completed ${payload.answered}/${payload.totalQuestions} items`
    : `บันทึกแบบประเมินเรียบร้อย ตอบครบ ${payload.answered}/${payload.totalQuestions} ข้อ`, "success");

  setSmartEvaluationStatus(currentLanguage === "en"
    ? "Assessment saved locally. Sending to Google Sheet..."
    : "บันทึกแบบประเมินในเครื่องแล้ว กำลังส่งเข้า Google Sheet...", "info");

  try {
    await saveToGoogleSheet(sheetPayload);
    clearSmartEvaluationForm();
    setSmartEvaluationStatus(currentLanguage === "en"
      ? "Assessment submitted and the form is ready for a new response"
      : "ส่งแบบประเมินเรียบร้อย และล้างฟอร์มพร้อมสำหรับการประเมินใหม่แล้ว", "success");
    showSmartEvaluationThankYouPopup();
  } catch (error) {
    setSmartEvaluationStatus("บันทึกในเครื่องแล้ว แต่ส่งเข้า Google Sheet ไม่สำเร็จ", "error");
    console.error(error);
  }
}

function resetSmartEvaluation() {
  clearSmartEvaluationForm();
  setSmartEvaluationStatus("ล้างแบบประเมินแล้ว", "info");
}

function renderHomeSepsisCases(cases = sepsisStore.cases, options = {}) {
  const copy = sepsisCopy().homeCases;
  const listEl = document.getElementById("homeSepsisCaseList");
  if (!listEl) return;

  if (options.loading) {
    listEl.innerHTML = `<div class="home-patient-empty">${escapeHtml(copy.loading)}</div>`;
    return;
  }

  const casePool = sepsisState?.caseId ? [sepsisState, ...cases] : cases;
  const latestCases = mergeSepsisCases(casePool).slice(0, HOME_SEPSIS_CASE_LIMIT);
  const failedNotice = options.failed
    ? `<div class="home-patient-empty error">${escapeHtml(copy.failed)}</div>`
    : "";
  const caseRows = latestCases.length
    ? latestCases.map(renderHomeSepsisCaseRow).join("")
    : `<div class="home-patient-empty">${escapeHtml(copy.empty)}</div>`;

  listEl.innerHTML = `
    ${failedNotice}
    ${caseRows}
  `;
}

async function refreshHomeSepsisCases() {
  renderHomeSepsisCases(sepsisStore.cases, { loading: true });

  try {
    const params = new URLSearchParams({
      mode: "sepsis",
      sheetName: "sepsis"
    });
    params.set("limit", String(HOME_SEPSIS_CASE_LIMIT));
    const response = await fetch(`${SHEET_WEBAPP_URL}?${params.toString()}`, {
      method: "GET",
      mode: "cors",
      cache: "no-store"
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json();
    if (!payload || payload.ok !== true || !Array.isArray(payload.items)) {
      throw new Error("Invalid home sepsis response");
    }

    const historyMaps = getDashboardHistoryMaps();
    const sheetCases = payload.items.map(item => normalizeDashboardSepsisItem(item, historyMaps));
    persistSepsisStoreWithCases([sepsisState, ...sepsisStore.cases, ...sheetCases]);
    sepsisState = normalizeSepsisCase(getActiveSepsisCase() || sepsisState || createDefaultSepsisState());
    renderHomeSepsisCases(sepsisStore.cases);
    renderSepsisCaseList();
    renderSepsisCurrentCaseSummary();
  } catch (error) {
    console.error(error);
    renderHomeSepsisCases(sepsisStore.cases, { failed: true });
  }
}

function init() {
  applyStaticTranslations();
  setDefaultAssessmentTime();
  updateHomeClock();
  window.setInterval(updateHomeClock, 1000);
  setDefaultHistoryDate();
  renderAllMetricButtons();
  renderHistory();
  syncLocationButtons();
  setupInteractiveCards();
  setupSepsisProtocol();
  renderHomeSepsisCases(sepsisStore.cases);
  renderSmartEvaluation();
  refreshHomeSepsisCases();
  updateUI();
  registerServiceWorker();
  setupInstallPrompt();

  document.addEventListener("click", event => {
    const homeSepsisCaseButton = event.target.closest("[data-home-sepsis-case]");
    if (homeSepsisCaseButton) {
      const caseId = homeSepsisCaseButton.getAttribute("data-home-sepsis-case") || "";
      loadSepsisCase(caseId);
      updateAppViewUrl("sepsis");
      setAppView("sepsis", { scrollToTop: true });
      return;
    }

    if (historyFormLocked) return;

    const metricButton = event.target.closest(".metric-option-button");
    if (metricButton) {
      setMetricValue(
        metricButton.dataset.inputTarget,
        metricButton.dataset.scoreValue || "",
        metricButton.dataset.optionKey || ""
      );
      return;
    }

    const locationButton = event.target.closest(".location-option");
    if (locationButton) {
      const nextLocation = locationButton.dataset.location || "";
      setLocation(selectors.location.value === nextLocation ? "" : nextLocation);
    }
  });

  document.querySelectorAll(".spo2-scale").forEach(el => {
    el.addEventListener("change", event => {
      if (historyFormLocked) return;
      renderSpo2Options(event.target.value);
      updateUI();
    });
  });

  selectors.hn.addEventListener("input", () => {
    if (historyFormLocked) return;
    selectors.hn.value = sanitizeHN(selectors.hn.value);
    if (validationActive) updateAssessmentValidation(true);
  });

  selectors.age?.addEventListener("input", () => {
    if (historyFormLocked) return;
    selectors.age.value = sanitizeAge(selectors.age.value);
  });

  selectors.historyFilterHn?.addEventListener("input", () => {
    selectors.historyFilterHn.value = sanitizeHN(selectors.historyFilterHn.value);
    renderHistory();
    scheduleHistoryRefresh();
  });

  selectors.historyFilterDate?.addEventListener("change", () => {
    renderHistory();
    refreshHistory({ silent: true });
  });

  selectors.historyFilterLocation?.addEventListener("change", () => {
    renderHistory();
    refreshHistory({ silent: true });
  });

  selectors.historyFilterLevel?.addEventListener("change", () => {
    renderHistory();
    refreshHistory({ silent: true });
  });

  selectors.historyFilterRed?.addEventListener("change", () => {
    renderHistory();
    refreshHistory({ silent: true });
  });

  selectors.assessmentTime.addEventListener("input", () => {
    if (historyFormLocked) return;
    if (validationActive) updateAssessmentValidation(true);
  });

  selectors.langThBtn?.addEventListener("click", () => setLanguage("th"));
  selectors.langEnBtn?.addEventListener("click", () => setLanguage("en"));
  selectors.languageButtons.forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.language || "th"));
  });
  selectors.appNavItems.forEach(item => {
    item.addEventListener("click", () => {
      const nextView = item.dataset.appView || "home";
      updateAppViewUrl(nextView);
      setAppView(nextView);
    });
  });
  selectors.navViewButtons.forEach(item => {
    item.addEventListener("click", () => {
      const nextView = item.dataset.navView || "home";
      updateAppViewUrl(nextView);
      setAppView(nextView);
    });
  });
  selectors.knowledgeCards.forEach(item => {
    item.addEventListener("click", () => openKnowledgeImage(item));
  });
  selectors.smartEvaluationForm?.addEventListener("submit", handleSmartEvaluationSubmit);
  selectors.smartEvaluationForm?.addEventListener("change", updateSmartEvaluationSummary);
  selectors.smartEvaluationResetBtn?.addEventListener("click", resetSmartEvaluation);
  selectors.knowledgeZoomInBtn?.addEventListener("click", () => setKnowledgeImageZoom(knowledgeImageZoom + 0.25));
  selectors.knowledgeZoomOutBtn?.addEventListener("click", () => setKnowledgeImageZoom(knowledgeImageZoom - 0.25));
  selectors.knowledgeZoomResetBtn?.addEventListener("click", () => setKnowledgeImageZoom(1));
  selectors.knowledgeDownloadImageLink?.addEventListener("click", downloadKnowledgeImage);
  selectors.saveBtn.addEventListener("click", handleSave);
  selectors.mobileSaveBtn?.addEventListener("click", handleSave);
  selectors.resetBtn.addEventListener("click", resetForm);
  selectors.mobileResetBtn?.addEventListener("click", resetForm);
  selectors.resetBtnTop?.addEventListener("click", resetForm);
  selectors.clearHistoryBtn.addEventListener("click", clearHistory);
  selectors.refreshHistoryBtn?.addEventListener("click", () => {
    refreshHistory();
  });
  selectors.dashboardRefreshBtn?.addEventListener("click", () => {
    refreshDashboard();
  });
  selectors.dashboardDateFilter?.addEventListener("change", () => refreshDashboard());
  selectors.dashboardLocationFilter?.addEventListener("change", () => refreshDashboard());
  selectors.dashboardRangeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const nextRange = Number.parseInt(button.dataset.dashboardRange || "365", 10);
      dashboardState.rangeDays = Number.isNaN(nextRange) ? 365 : nextRange;
      selectors.dashboardRangeButtons.forEach(item => item.classList.toggle("active", item === button));
      refreshDashboard();
    });
  });
  selectors.dashboardMetricButtons.forEach(button => {
    button.addEventListener("click", () => {
      const nextMetric = button.dataset.dashboardMetric || "sepsisCount";
      dashboardState.metric = nextMetric;
      selectors.dashboardMetricButtons.forEach(item => item.classList.toggle("active", item === button));
      renderDashboard();
    });
  });
  document.getElementById("dashboardTrendChart")?.addEventListener("click", event => {
    const zoomAction = event.target?.closest?.("[data-dashboard-chart-zoom]")?.dataset.dashboardChartZoom;
    if (!zoomAction) return;
    setDashboardChartZoom(zoomAction);
  });
  document.getElementById("dashboardTrendChart")?.addEventListener("pointermove", event => {
    const target = getDashboardTooltipTarget(event.target);
    if (!target) {
      hideDashboardChartTooltip();
      return;
    }
    showDashboardChartTooltip(target, event);
  });
  document.getElementById("dashboardTrendChart")?.addEventListener("pointerleave", hideDashboardChartTooltip);
  document.getElementById("dashboardTrendChart")?.addEventListener("focusin", event => {
    const target = getDashboardTooltipTarget(event.target);
    if (target) showDashboardChartTooltip(target);
  });
  document.getElementById("dashboardTrendChart")?.addEventListener("focusout", hideDashboardChartTooltip);
  selectors.toggleAdminLoginBtn?.addEventListener("click", () => {
    selectors.adminLoginPanel?.classList.toggle("d-none");
  });
  selectors.adminLoginBtn?.addEventListener("click", loginAdmin);
  selectors.adminPassword?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      loginAdmin();
    }
  });
  selectors.adminLogoutBtn?.addEventListener("click", () => {
    persistAdminAuth(null);
    if (selectors.adminStatus) {
      selectors.adminStatus.textContent = "";
      selectors.adminStatus.classList.remove("error");
    }
  });
  selectors.historyTable?.addEventListener("click", event => {
    const newsButton = event.target.closest("[data-view-news-index]");
    if (newsButton) {
      const newsIndex = Number.parseInt(newsButton.dataset.viewNewsIndex || "-1", 10);
      if (!Number.isNaN(newsIndex) && newsIndex >= 0) {
        loadHistoryItemIntoForm(historyState.displayedItems[newsIndex]);
      }
      return;
    }

    const sepsisButton = event.target.closest("[data-view-sepsis-index]");
    if (sepsisButton) {
      const sepsisIndex = Number.parseInt(sepsisButton.dataset.viewSepsisIndex || "-1", 10);
      if (!Number.isNaN(sepsisIndex) && sepsisIndex >= 0) {
        openHistorySepsisProtocol(historyState.displayedItems[sepsisIndex], sepsisButton);
      }
      return;
    }

    const deleteButton = event.target.closest("[data-delete-history-index]");
    if (deleteButton) {
      const deleteIndex = Number.parseInt(deleteButton.dataset.deleteHistoryIndex || "-1", 10);
      if (!Number.isNaN(deleteIndex) && deleteIndex >= 0) {
        deleteHistoryRecord(historyState.displayedItems[deleteIndex]);
      }
      return;
    }

    const row = event.target.closest("[data-history-index]");
    if (!row) return;

    const index = Number.parseInt(row.dataset.historyIndex || "-1", 10);
    if (Number.isNaN(index) || index < 0) return;

    loadHistoryItemIntoForm(historyState.displayedItems[index]);
  });
  selectors.resetHistoryFiltersBtn?.addEventListener("click", () => {
    setDefaultHistoryDate();
    if (selectors.historyFilterHn) selectors.historyFilterHn.value = "";
    if (selectors.historyFilterLocation) selectors.historyFilterLocation.value = "";
    if (selectors.historyFilterLevel) selectors.historyFilterLevel.value = "";
    if (selectors.historyFilterRed) selectors.historyFilterRed.value = "";
    renderHistory();
    refreshHistory({ silent: true });
  });
  window.addEventListener("resize", syncPanelHeights);
  window.addEventListener("scroll", syncPanelHeights, { passive: true });
  window.addEventListener("hashchange", syncViewFromHash);
  requestAnimationFrame(syncPanelHeights);
  setDefaultDashboardDate();
  const applyInitialHashView = () => {
    if (!syncViewFromHash()) {
      setAppView("home", { scrollToTop: false });
    }
  };
  applyInitialHashView();
  window.setTimeout(applyInitialHashView, 0);
  window.addEventListener("load", applyInitialHashView, { once: true });
  if (!window.location.hash) {
    setAppView("home", { scrollToTop: false });
  }
  refreshHistory();
}

document.addEventListener("DOMContentLoaded", init);
