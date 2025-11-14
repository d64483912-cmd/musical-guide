import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/chat
 * Handles chat message processing with Nelson-GPT MCP Server integration
 * 
 * Request body:
 * - message: string - User's message
 * - mode: 'academic' | 'clinical' - Response mode
 * - sessionId: string - Current session ID
 * 
 * Response: Streaming text response with context from MCP server
 */
export async function POST(request: NextRequest) {
  try {
    const { message, mode, sessionId } = await request.json()

    // Validate input
    if (!message || !mode || !sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get MCP server URL from environment
    const mcpServerUrl = process.env.MCP_SERVER_URL || 'http://localhost:3001'

    // Query the MCP server for relevant context
    let contextData: any[] = []
    let citations: any[] = []
    
    try {
      const mcpResponse = await fetch(`${mcpServerUrl}/mcp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'godzilla_answer',
          q: message,
          k: 5, // Get top 5 relevant chunks
        }),
      })

      if (mcpResponse.ok) {
        const data = await mcpResponse.json()
        contextData = data.context || []
        citations = data.citations || []
      } else {
        console.warn('MCP server returned error:', mcpResponse.status)
      }
    } catch (error) {
      console.error('Error fetching from MCP server:', error)
      // Continue with empty context if MCP server is unavailable
    }

    // Generate response based on mode and context
    const response = generateResponse(message, mode, contextData, citations)

    // Create a ReadableStream for streaming response
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Stream the response word by word for better UX
          const words = response.split(' ')
          for (const word of words) {
            controller.enqueue(encoder.encode(word + ' '))
            // Small delay to simulate natural streaming
            await new Promise((resolve) => setTimeout(resolve, 15))
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

/**
 * Generate response based on retrieved context and mode
 */
function generateResponse(
  query: string,
  mode: 'academic' | 'clinical',
  contextData: any[],
  citations: any[]
): string {
  const hasContext = contextData.length > 0

  if (!hasContext) {
    return `
# Response from Nelson-GPT

I couldn't find specific information in the Nelson Textbook of Pediatrics database for your query: "${query}"

This could be because:
- The MCP server is not currently running
- The database doesn't contain relevant information for this query
- The connection to the MCP server failed

Please try rephrasing your question or check that the MCP server is running at http://localhost:3001

## Mode: ${mode === 'academic' ? 'Academic' : 'Clinical'}
    `.trim()
  }

  // Build response with context
  let response = `# Response from Nelson-GPT\n\n`

  if (mode === 'academic') {
    response += `## Academic Perspective\n\n`
    response += `Based on the Nelson Textbook of Pediatrics, here's a comprehensive academic overview:\n\n`
  } else {
    response += `## Clinical Perspective\n\n`
    response += `Here's a practical clinical approach based on the Nelson Textbook of Pediatrics:\n\n`
  }

  // Add summarized context
  contextData.slice(0, 3).forEach((item, index) => {
    if (item.snippet) {
      response += `### Context ${index + 1}\n\n`
      response += `${item.snippet.slice(0, 300)}...\n\n`
    }
  })

  // Add citations section
  if (citations.length > 0) {
    response += `\n---\n\n## References\n\n`
    citations.forEach((citation, index) => {
      const parts = []
      if (citation.chapter_title) parts.push(citation.chapter_title)
      if (citation.page_number) parts.push(`Page ${citation.page_number}`)
      if (citation.book_title) parts.push(citation.book_title)
      
      if (parts.length > 0) {
        response += `${index + 1}. ${parts.join(', ')}\n`
      }
    })
  }

  // Add mode-specific guidance
  response += `\n---\n\n`
  if (mode === 'academic') {
    response += `**Academic Note:** This response provides detailed textbook-style information with comprehensive citations from the Nelson Textbook of Pediatrics.\n`
  } else {
    response += `**Clinical Note:** This response focuses on practical clinical decision-making based on evidence from the Nelson Textbook of Pediatrics. Always consider individual patient circumstances and consult with appropriate specialists when needed.\n`
  }

  return response.trim()
}
