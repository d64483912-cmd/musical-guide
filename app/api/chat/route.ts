import { NextRequest, NextResponse } from 'next/server'

interface NelsonContextItem {
  id: string
  chapter_title: string | null
  page_number: number | null
  source_file: string | null
  book_title: string | null
  snippet: string | null
  age_groups?: string | null
  medical_specialty?: string | null
  clinical_relevance_score?: number | null
  keywords?: string | null
}

interface NelsonAnswerResponse {
  context: NelsonContextItem[]
  citations?: Array<{
    chapter_title: string | null
    page_number: number | null
    source_file: string | null
    book_title: string | null
    age_groups?: string | null
  }>
  meta?: any
}

function buildAnswer(mode: 'academic' | 'clinical', userMessage: string, res: NelsonAnswerResponse) {
  const header = `# Response from Nelson-GPT\n\n`
  const intro = mode === 'academic'
    ? `Academic mode provides detailed textbook-style explanations with comprehensive evidence and citations.\n\n`
    : `Clinical mode focuses on practical diagnostic and treatment approaches for clinical decision-making.\n\n`

  const context = res.context || []
  const bullets = context.map((c, i) => {
    const title = c.chapter_title || 'Untitled section'
    const page = c.page_number ? ` (p. ${c.page_number})` : ''
    const book = c.book_title || 'Nelson Textbook of Pediatrics'
    const snip = (c.snippet || '').trim()
    const trimmed = snip.length > 600 ? snip.slice(0, 600) + '…' : snip
    return `- ${title}${page} — ${trimmed}\n  Source: ${book}${c.source_file ? ` • ${c.source_file}` : ''}`
  }).join('\n\n')

  const citations = (res.citations || []).slice(0, 10).map((c) => {
    const title = c.chapter_title || 'Untitled section'
    const page = c.page_number ? `p. ${c.page_number}` : ''
    return `- ${title}${page ? ` (${page})` : ''}`
  }).join('\n')

  const footer = `\n\n---\n\nSources:\n${citations || '- See context above'}`

  return `${header}## Mode: ${mode === 'academic' ? 'Academic' : 'Clinical'}\n\n> ${userMessage}\n\n${intro}${bullets}${footer}`.trim()
}

export async function POST(request: NextRequest) {
  try {
    const { message, mode, sessionId } = await request.json()

    if (!message || !mode || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const baseUrl = process.env.NELSON_API_URL || 'http://localhost:3000'

    let answerText = ''
    try {
      const r = await fetch(`${baseUrl}/mcp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'godzilla_answer',
          q: message,
          k: mode === 'academic' ? 12 : 8,
          specialty: 'pediatrics'
        })
      })

      if (!r.ok) {
        throw new Error(`Nelson-GPT API error: ${r.status}`)
      }

      const data: NelsonAnswerResponse = await r.json()
      answerText = buildAnswer(mode, message, data)
    } catch (e: any) {
      answerText = [
        '# Response from Nelson-GPT',
        '',
        'I could not reach the Nelson-GPT API. Showing a placeholder response.',
        '',
        `Mode: ${mode === 'academic' ? 'Academic' : 'Clinical'}`,
        '',
        'Please verify NELSON_API_URL is set and the service is reachable.'
      ].join('\n')
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const chunks = answerText.split(' ')
          for (const chunk of chunks) {
            controller.enqueue(encoder.encode(chunk + ' '))
            await new Promise((resolve) => setTimeout(resolve, 8))
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
