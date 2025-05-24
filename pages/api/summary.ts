import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, timestamp } = req.body;

  const prompt = `Riassumi in 5 frasi senza spoiler quello che accade nel film "${title}" fino al minuto ${timestamp}. Non svelare colpi di scena o dettagli chiave. Scrivi in tono coinvolgente ma neutrale, in italiano.`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const summary = completion.data.choices[0].message?.content;
    res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella generazione del riassunto.' });
  }
}
