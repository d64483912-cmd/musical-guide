# Nelson-GPT Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
cd /home/code/nelson-gpt
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env.local
# Edit .env.local with your API keys
```

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📱 What You'll See

### Splash Screen (2-3 seconds)
- Animated "Nelson-GPT" text
- "Trusted Pediatric AI" subtitle
- Warm amber gradient background

### Welcome Screen
- Large hero input box
- Mode toggle: Academic (amber) or Clinical (green)
- Send button with paper plane icon

### Chat Interface
- Real-time streaming responses
- Markdown formatting
- Citations from Nelson Textbook
- Footer navigation (Chat, History, Settings, Profile)

---

## 🎯 Key Interactions

### Send a Message
1. Type your question in the input box
2. Select Academic or Clinical mode
3. Press Enter or click Send button
4. Watch the response stream in real-time

### Switch Modes
- Click "Academic" for detailed textbook explanations
- Click "Clinical" for practical diagnostic approaches

### Navigate
- **Chat**: View current conversation
- **History**: See past sessions, rename/delete
- **Settings**: Toggle dark mode, adjust font size
- **Profile**: View user info, export data

---

## 🔧 Configuration

### Theme Colors
Edit `app/globals.css` to customize colors:
```css
:root {
  --primary: #b45309;      /* Warm amber */
  --accent: #d97706;       /* Bright amber */
  --background: #fefbf7;   /* Off-white */
}
```

### Font Size
Change in Settings panel or edit `lib/store.ts`

### API Endpoints
Modify `app/api/chat/route.ts` for backend integration

---

## 📚 Project Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main entry point |
| `components/app-container.tsx` | App wrapper |
| `components/chat-interface.tsx` | Chat UI |
| `lib/store.ts` | State management |
| `app/globals.css` | Global styles |
| `public/manifest.json` | PWA config |

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -i :3000
kill -9 <PID>
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Styling Issues
```bash
# Rebuild Tailwind
npm run build -- --clean
```

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Zustand State Management](https://github.com/pmndrs/zustand)

---

## ✅ Next Steps

1. **Test the UI** - Interact with all screens and features
2. **Customize Colors** - Adjust theme to your preference
3. **Set Up Backend** - Configure Mistral API and Supabase
4. **Deploy** - Push to Vercel or your hosting platform

---

**Happy coding! 🎉**
