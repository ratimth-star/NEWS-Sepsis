# Smart Sepsis App / NEWS PWA

เว็บแอปสำหรับประเมิน **NEWS Score** และติดตาม **Sepsis Protocol** แบบ responsive ใช้งานได้ทั้งคอมพิวเตอร์ แท็บเล็ต และโทรศัพท์ รองรับ PWA, การบันทึกข้อมูลในเครื่อง และการเชื่อมต่อ Google Sheet ผ่าน Google Apps Script

> โครงการนี้เป็นเครื่องมือสนับสนุนการทำงานทางคลินิกและการติดตามคุณภาพการดูแลผู้ป่วย ควรใช้ร่วมกับดุลยพินิจของบุคลากรทางการแพทย์และแนวทางเวชปฏิบัติของหน่วยงาน

## ฟีเจอร์หลัก

- ประเมิน NEWS Score พร้อมระดับความเร่งด่วน
- บันทึกประวัติการประเมินผู้ป่วย
- ติดตามผู้ป่วยที่เข้าเกณฑ์ Sepsis Protocol
- บันทึกขั้นตอนสำคัญของ Sepsis care เช่น แจ้งแพทย์, hemoculture, lactate, IV fluid, antibiotic และติดตามอาการ
- เลือก Disposition ได้แก่ Admit Ward, Admit ICU, Refer และ Discharge
- Dashboard สรุปตัวชี้วัดคุณภาพ เช่น จำนวนผู้ป่วย sepsis และการได้รับ antibiotic ภายในเวลาที่กำหนด
- หน้าความรู้และแนวทางการดูแล Sepsis
- แบบประเมินความพึงพอใจ Smart Sepsis App
- รองรับภาษาไทยและภาษาอังกฤษ
- รองรับ PWA และ offline cache สำหรับไฟล์หลักของแอป
- เชื่อมต่อ Google Sheet ด้วย Google Apps Script สำหรับบันทึก/อ่านข้อมูลระยะยาว

## โครงสร้างไฟล์

```text
.
├── index.html              # หน้าเว็บหลัก
├── app.js                  # logic หลักของ NEWS, Sepsis Protocol, Dashboard และ sync ข้อมูล
├── styles.css              # style หลักของแอป
├── service-worker.js       # PWA cache
├── manifest.json           # PWA manifest
├── google_apps_script.gs   # Google Apps Script สำหรับเชื่อม Google Sheet
├── google_sheet_columns.csv
├── icons/                  # app icons
├── icon sepsis/            # icon สำหรับ sepsis workflow
└── image/                  # รูปภาพความรู้/แนวทาง sepsis
```

## การเปิดใช้งานบนเครื่อง

โปรเจกต์นี้เป็น static web app จึงเปิดได้โดยตรงจาก `index.html`

วิธีที่แนะนำสำหรับทดสอบ:

1. เปิดโฟลเดอร์โปรเจกต์
2. เปิด `index.html` ด้วย browser
3. หากต้องการทดสอบ PWA/service worker ให้รันผ่าน local server เช่น Live Server ใน VS Code

ตัวอย่างด้วย Python:

```bash
python -m http.server 8000
```

จากนั้นเปิด:

```text
http://localhost:8000
```

## การตั้งค่า Google Sheet

แอปใช้ `google_apps_script.gs` เป็น backend แบบ Google Apps Script เพื่ออ่าน/เขียนข้อมูลลง Google Sheet

Sheet ที่ใช้ในระบบ:

- `Sheet1` หรือ sheet หลักสำหรับประวัติ NEWS
- `sepsis` สำหรับข้อมูล Sepsis Protocol
- `Satisfaction Assessment Form` สำหรับแบบประเมินความพึงพอใจ

ขั้นตอนโดยสรุป:

1. สร้าง Google Sheet สำหรับเก็บข้อมูล
2. เปิด Extensions > Apps Script
3. วางโค้ดจาก `google_apps_script.gs`
4. Deploy เป็น Web app
5. ตั้งค่า Execute as เป็นบัญชีเจ้าของไฟล์
6. ตั้งค่า Who has access ตามรูปแบบการใช้งานของหน่วยงาน
7. คัดลอก Web app URL ไปใส่ใน `SHEET_WEBAPP_URL` ที่ไฟล์ `app.js`

```js
const SHEET_WEBAPP_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
```

## ข้อมูลที่บันทึก

ระบบมีการจัดเก็บข้อมูลทั้งใน browser และ Google Sheet

- `localStorage` ใช้เก็บข้อมูลชั่วคราว/ข้อมูลในเครื่อง เช่น ประวัติ, เคสที่กำลังทำ, ภาษา และสถานะการใช้งาน
- Google Sheet ใช้เป็นฐานข้อมูลกลางสำหรับประวัติ NEWS, Sepsis Protocol, dashboard และแบบประเมิน

ควรพิจารณานโยบายความปลอดภัยข้อมูลผู้ป่วยของหน่วยงานก่อนนำไปใช้งานจริง โดยเฉพาะข้อมูล HN, เวลาเข้ารับการประเมิน และรายละเอียดการดูแล

## หมายเหตุเรื่องสถานะเคส Sepsis

ในหน้าหลักส่วน “ผู้ป่วยที่ประเมิน sepsis protocol ล่าสุด” สถานะเคสอิงจากการเลือก **Disposition**

- เลือก Disposition แล้ว = `เสร็จสิ้น`
- ยังไม่ได้เลือก Disposition = `กำลังทำ`

ส่วนตัวเลข `SEPSIS x/8` หรือความคืบหน้าของขั้นตอนยังใช้แสดงจำนวนรายการดำเนินการที่บันทึกแล้ว ไม่ใช่ตัวตัดสินว่าเคสเสร็จสิ้น

## การ deploy บน GitHub Pages

1. Push ไฟล์ทั้งหมดขึ้น GitHub repository
2. ไปที่ Settings > Pages
3. เลือก branch ที่ต้องการ deploy เช่น `main`
4. เลือก root folder
5. เปิด URL ที่ GitHub Pages สร้างให้

หลัง deploy หากมีการแก้ `app.js` หรือ `styles.css` แล้ว browser ยังแสดงหน้าเก่า ให้เพิ่ม version query ใน `index.html` หรือเปลี่ยน `CACHE_NAME` ใน `service-worker.js`

## เทคโนโลยีที่ใช้

- HTML
- CSS
- JavaScript
- Bootstrap 5
- Google Apps Script
- Google Sheet
- PWA manifest และ service worker

## ข้อควรระวัง

- แอปนี้ไม่ใช่ระบบเวชระเบียนหลัก
- ไม่ควรใช้แทนคำสั่งการรักษาหรือการตัดสินใจของแพทย์
- ควรทดสอบการบันทึกข้อมูลและสิทธิ์ Google Apps Script ก่อนใช้งานจริง
- หากนำขึ้น public repository ควรตรวจสอบ URL, token, ข้อมูลตัวอย่าง และข้อมูลผู้ป่วยก่อนเผยแพร่

## ผู้พัฒนา

พัฒนาเพื่อสนับสนุนการประเมิน NEWS และการดูแลผู้ป่วยสงสัย Sepsis ในบริบทการใช้งานทางคลินิก
