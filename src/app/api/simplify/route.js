export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { technicalText, audienceLevel } = body;

    if (!technicalText) {
      return Response.json(
        { error: "Technical text is required" },
        { status: 400 }
      );
    }

    // 🔑 Get API key (OpenRouter)
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error("❌ OPENROUTER API KEY NOT FOUND");

      return Response.json(
        { error: "API key missing. Check .env.local" },
        { status: 500 }
      );
    }

    const audienceDescriptions = {
      executive: "C-level executives",
      manager: "team managers",
      client: "external clients",
      general: "general audience",
    };

    const systemPrompt = `You are an expert technical communicator who works with multiple languages.

IMPORTANT: Detect the language of the input text and ALWAYS respond in the SAME language as the input.

Simplify technical briefings for ${
      audienceDescriptions[audienceLevel] || "executives"
    }.

Focus on:
- Business impact
- Clear non-technical language
- Risks and next steps
- Concise structured summary

Remember: Your response MUST be in the same language as the user's input text.`;

    // 🔥 Call OpenRouter API (Claude via OpenRouter)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "Technical Briefing Simplifier",
      },
      body: JSON.stringify({
        model: "anthropic/claude-3.5-sonnet",
        max_tokens: 800,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: technicalText,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const simplifiedText = data.choices?.[0]?.message?.content || "No summary generated";

    return Response.json({
      success: true,
      simplifiedText,
      originalLength: technicalText.length,
      simplifiedLength: simplifiedText.length,
    });

  } catch (error) {
    console.error("🔥 OPENROUTER ERROR:", error);

    return Response.json(
      {
        error: error.message || "API request failed",
      },
      { status: 500 }
    );
  }
}
