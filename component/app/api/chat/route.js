import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  const { message } = await request.json();

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'text-davinci-003',
      prompt: message,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const reply = response.data.choices[0].text.trim();
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: 'Error with OpenAI API', details: error.message }, { status: 500 });
  }
}
