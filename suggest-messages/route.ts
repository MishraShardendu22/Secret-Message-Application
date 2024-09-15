// AI Integration failed due to lack of proper API

// import fetch from 'node-fetch';
// import { NextResponse } from 'next/server';

// const apiKey = process.env.HUGGING_FACE_API_KEY;

// export const runtime = 'edge';

// export async function POST() {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction.";

//     const response = await fetch(
//       'https://api-inference.huggingface.co/models/openai-community/gpt2',
//       {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//         method: 'POST',
//         body: JSON.stringify({ inputs: prompt }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result: { generated_text?: string } = await response.json() as { generated_text?: string };
//     const generatedText = result.generated_text || 'No result generated';

//     return NextResponse.json({ generatedText });
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message || 'Unexpected error occurred' },
//       { status: 500 }
//     );
//   }
// }
