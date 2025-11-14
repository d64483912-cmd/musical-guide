# Nelson-GPT Setup Guide

## 🚀 Quick Start

Nelson-GPT is a Perplexity-style pediatric knowledge assistant powered by the Nelson Textbook of Pediatrics.

### Prerequisites

- Node.js 18+ and npm/bun
- Mistral API key (for LLM responses)
- Supabase account with pgvector extension (for semantic search)
- OpenAI API key (for embeddings) - optional, can use Mistral embeddings

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (`.env.local`):
   ```bash
   # Mistral API
   MISTRAL_API_KEY=your_mistral_api_key

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

   # OpenAI (for embeddings)
   OPENAI_API_KEY=your_openai_api_key

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**:
   Navigate to `http://localhost:3000`

## 🔧 Backend Integration

### 1. Set Up Supabase

1. Create a Supabase project at https://supabase.com
2. Enable pgvector extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

3. Create the textbook chunks table:
   ```sql
   CREATE TABLE nelson_textbook_chunks (
     id BIGSERIAL PRIMARY KEY,
     chapter TEXT NOT NULL,
     page_number INTEGER,
     content TEXT NOT NULL,
     embedding vector(1536),
     created_at TIMESTAMP DEFAULT NOW()
   );

   CREATE INDEX ON nelson_textbook_chunks USING ivfflat (embedding vector_cosine_ops);
   ```

### 2. Load Textbook Data

Populate the `nelson_textbook_chunks` table with ~20,000 chunks from the Nelson Textbook of Pediatrics.

Each chunk should include:
- `chapter`: Chapter title/number
- `page_number`: Page reference
- `content`: Text content
- `embedding`: Vector embedding (1536 dimensions for OpenAI)

### 3. Configure Mistral API

1. Get API key from https://console.mistral.ai
2. Add to `.env.local`:
   ```
   MISTRAL_API_KEY=your_key
   ```

### 4. Configure Embeddings

Choose one:

**Option A: OpenAI Embeddings** (Recommended)
```bash
npm install openai
```

**Option B: Mistral Embeddings**
```bash
# Use Mistral API for embeddings
```

## 📱 Features

### Welcome Screen
- Hero input box with mode toggle
- Academic vs Clinical mode selection
- Smooth transition to chat interface

### Chat Interface
- Real-time streaming responses
- Markdown rendering with syntax highlighting
- Citation linking to Nelson Textbook
- Copy-to-clipboard for responses
- Mode toggle during conversation

### Footer Menubar
- **Chat**: Current conversation
- **History**: Past sessions with rename/delete
- **Settings**: Theme, font size, AI behavior
- **Profile**: User info, export data, help

### Academic Mode
- Detailed textbook-style explanations
- Comprehensive evidence and citations
- Multiple source references

### Clinical Mode
- Practical diagnostic approaches
- Treatment recommendations
- Clinical decision-making focus

## 🎨 Customization

### Theme Colors

Edit `app/globals.css` to customize:
- Primary color: `--primary` (currently warm amber)
- Background: `--background` (currently ivory)
- Accent: `--accent` (currently bright amber)

### Fonts

Default: Inter (from Google Fonts)

Change in `app/layout.tsx`:
```typescript
import { YourFont } from 'next/font/google'
const font = YourFont({ subsets: ['latin'] })
```

## 🔐 Security

- Never commit `.env.local` to git
- Use environment variables for all secrets
- Validate all user inputs on backend
- Implement rate limiting for API calls
- Use HTTPS in production

## 📦 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Other Platforms

Ensure Node.js 18+ support and set environment variables.

## 🧪 Testing

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Production
```bash
npm start
```

## 📚 API Endpoints

### POST /api/chat

Handles chat messages and streaming responses.

**Request**:
```json
{
  "message": "What is the treatment for fever in infants?",
  "mode": "clinical",
  "sessionId": "session-id-123"
}
```

**Response**: Streaming text (Server-Sent Events)

## 🐛 Troubleshooting

### Dev server won't start
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Styling issues
- Clear Tailwind cache: `npm run build -- --clean`
- Check `globals.css` for syntax errors

### API errors
- Verify environment variables are set
- Check Mistral API key validity
- Ensure Supabase connection works

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Mistral API](https://docs.mistral.ai)
- [Supabase](https://supabase.com/docs)

## 📄 License

Nelson-GPT is provided for educational purposes.

## ⚠️ Medical Disclaimer

Nelson-GPT provides educational information only and should not replace professional medical advice. Always consult qualified healthcare providers for clinical decisions.

---

**Questions?** Check the FAQ or contact support.
