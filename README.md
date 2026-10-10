# 🚀 Joo Door AI IDE - منصة تطوير ذكية متكاملة

## ✨ المميزات

### 1️⃣ محرر أكواد ذكي
- Monaco Editor (محرر VSCode)
- Syntax highlighting لكل اللغات
- AI autofix + code suggestions
- Multi-file support
- Dark/Light theme

### 2️⃣ معاينة فعالة
- Live preview HTML/CSS/JS
- Real-time updates
- Responsive design preview
- Console output display

### 3️⃣ Terminal متقدم
- Command execution
- npm/node support
- File system operations
- Output streaming
- History management

### 4️⃣ AI Assistant
- Chat interface عربي/إنجليزي
- Code generation
- Bug fixing
- Code explanation
- Optimization suggestions

### 5️⃣ مولد محتوى
- صور (DALL-E/Midjourney)
- فيديو (قصير)
- منشورات (Instagram/Twitter)
- جداول ديناميكية
- تصاميم احترافية

### 6️⃣ إدارة المشاريع
- Create/Save/Delete projects
- Git integration
- Deploy to Vercel/Netlify
- Project sharing
- Version control

## 🔧 التثبيت

```bash
git clone https://github.com/alkatby671-ctrl/joo-door-ai-terminal
cd joo-door-ai-terminal
npm install
cp .env.example .env.local
# أضف مفاتيح API الخاصة بك
npm run dev
```

ثم افتح http://localhost:3000

## 📚 الهيكل

```
src/
├── app/
│   ├── api/
│   │   ├── chat/         # AI Chat API
│   │   ├── code/         # Code execution
│   │   ├── generate/     # Content generation
│   │   └── projects/     # Project management
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Editor/
│   ├── Preview/
│   ├── Terminal/
│   ├── ChatWidget/
│   └── ContentGenerator/
├── lib/
│   ├── ai/
│   ├── db/
│   └── utils/
└── styles/
```

## 🎯 الاستخدام

1. افتح المنصة
2. اختر نوع المشروع
3. ابدأ بكتابة الكود أو طلب من AI
4. شوف المعاينة الحية
5. استخدم Terminal للأوامر
6. اطلب منشورات/صور/جداول
7. احفظ وانشر المشروع

## 🔐 الأمان

- Code execution في sandbox
- API key validation
- Rate limiting
- File restrictions
- CORS enabled

## 📄 الترخيص

MIT License
