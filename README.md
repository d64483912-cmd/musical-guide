# Nelson-GPT 🏥

**Trusted Pediatric AI** — A Perplexity-style knowledge assistant powered by the Nelson Textbook of Pediatrics.

![Nelson-GPT](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)

## 🎯 Overview

Nelson-GPT is a modern, AI-powered pediatric knowledge assistant that combines:
- **Perplexity-style UI** with warm medical branding
- **Dual-mode AI** (Academic & Clinical perspectives)
- **Real-time streaming** responses with citations
- **Semantic search** powered by vector embeddings
- **Professional design** with accessibility in mind

## ✨ Key Features

### 🎨 User Interface
- **Splash Screen** — Animated intro with typing effect
- **Welcome Screen** — Hero input with mode selection
- **Chat Interface** — Real-time streaming with markdown support
- **Footer Navigation** — Quick access to Chat, History, Settings, Profile
- **Responsive Design** — Works seamlessly on mobile and desktop

### 🧠 AI Capabilities
- **Academic Mode** — Detailed textbook explanations with evidence
- **Clinical Mode** — Practical diagnostic and treatment approaches
- **Citation System** — Direct references to Nelson Textbook chapters
- **Streaming Responses** — Real-time text generation for better UX

### 🛠️ Technical Features
- **State Management** — Zustand for predictable state
- **Type Safety** — Full TypeScript support
- **PWA Ready** — Installable as standalone app
- **Dark Mode** — Light and dark theme support
- **Accessibility** — WCAG compliant components

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nelson-gpt.git
cd nelson-gpt

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
nelson-gpt/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts              # Chat streaming endpoint
│   ├── layout.tsx                    # Root layout with metadata
│   ├── page.tsx                      # Main page
│   └── globals.css                   # Global styles
├── components/
│   ├── app-container.tsx             # Main app wrapper
│   ├── splash-screen.tsx             # Animated intro
│   ├── welcome-screen.tsx            # Hero input
│   ├── chat-interface.tsx            # Chat UI
│   ├── chat-message.tsx              # Message bubbles
│   ├── footer-menubar.tsx            # Bottom navigation
│   ├── history-panel.tsx             # Chat history
│   ├── settings-panel.tsx            # Settings
│   ├── profile-panel.tsx             # User profile
│   └── ui/                           # shadcn/ui components
├── lib/
│   ├── store.ts                      # Zustand state management
│   └── utils.ts                      # Utility functions
├── public/
│   ├── manifest.json                 # PWA manifest
│   └── icons/                        # App icons
└── docs/
    ├── PROJECT_SUMMARY.md            # Detailed project overview
    ├── QUICKSTART.md                 # Quick start guide
    └── SETUP.md                      # Setup instructions
```

## 🎨 Design System

### Color Palette

**Light Mode:**
- Background: `#fefbf7` (Ivory)
- Primary: `#b45309` (Warm Amber)
- Accent: `#d97706` (Bright Amber)
- Text: `#1a1410` (Deep Brown)

**Dark Mode:**
- Background: `#0f0d0a` (Deep Charcoal)
- Primary: `#f59e0b` (Light Amber)
- Accent: `#fbbf24` (Pale Amber)
- Text: `#f5f1ed` (Light Beige)

### Typography
- **Font Family:** Inter (Google Fonts)
- **Headings:** Bold, warm amber
- **Body:** Regular, professional
- **Code:** Monospace, gray background

## 🔧 Configuration

### Environment Variables

```bash
# Mistral API
MISTRAL_API_KEY=your_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
SUPABASE_SERVICE_ROLE_KEY=your_key

# OpenAI (for embeddings)
OPENAI_API_KEY=your_key

# App Config
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📚 API Integration

### Chat Endpoint

**POST** `/api/chat`

```json
{
  "message": "What is the treatment for fever in infants?",
  "mode": "clinical",
  "sessionId": "session-123"
}
```

**Response:** Server-Sent Events (streaming text)

## 🗄️ Database Schema

### Nelson Textbook Chunks (Supabase)

```sql
CREATE TABLE nelson_textbook_chunks (
  id BIGSERIAL PRIMARY KEY,
  chapter TEXT NOT NULL,
  page_number INTEGER,
  content TEXT NOT NULL,
  embedding vector(1536),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON nelson_textbook_chunks 
  USING ivfflat (embedding vector_cosine_ops);
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📦 Dependencies

### Core
- `next@15.5.6` — React framework
- `react@19` — UI library
- `typescript@5.9` — Type safety

### UI & Styling
- `tailwindcss@4` — Utility CSS
- `shadcn/ui` — Component library
- `lucide-react` — Icons
- `framer-motion` — Animations

### State & Data
- `zustand` — State management
- `react-markdown` — Markdown rendering
- `remark-gfm` — GitHub-flavored markdown

### API & Backend
- `mistral-sdk` — Mistral API client
- `@supabase/supabase-js` — Supabase client
- `openai` — Embeddings API

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t nelson-gpt .

# Run container
docker run -p 3000:3000 nelson-gpt
```

## 📖 Documentation

- [Project Summary](./PROJECT_SUMMARY.md) — Detailed architecture and features
- [Quick Start](./QUICKSTART.md) — 5-minute setup guide
- [Setup Instructions](./SETUP.md) — Comprehensive setup guide

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is provided for educational purposes.

## ⚠️ Medical Disclaimer

Nelson-GPT provides educational information only and should not replace professional medical advice. Always consult qualified healthcare providers for clinical decisions.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide React](https://lucide.dev)
- Animations with [Framer Motion](https://www.framer.com/motion)

## 📞 Support

For issues, questions, or suggestions:
- Open an [Issue](https://github.com/yourusername/nelson-gpt/issues)
- Start a [Discussion](https://github.com/yourusername/nelson-gpt/discussions)
- Email: support@nelson-gpt.dev

---

**Made with ❤️ for pediatric education and clinical excellence**
