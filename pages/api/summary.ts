import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, duration } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Sei un assistente che riassume film senza spoiler.',
        },
        {
          role: 'user',
          content: `Puoi farmi un riassunto senza spoiler del film "${title}" in massimo ${duration} minuti?`,
        },
      ],
    });

    res.status(200).json({ summary: completion.choices[0].message.content });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: 'Errore durante la generazione del riassunto.' });
  }
}
