import openai from "openai";
import * as fs from "fs";
import consola from "consola";

const openAiApiKey = process.env.OPEN_AI_API_KEY;

if (openAiApiKey === undefined) {
  consola.error("OPEN_AI_API_KEY is missing from .env");
  process.exit(1);
}

const openAiClient = new openai.OpenAI({
  apiKey: openAiApiKey,
});

let promptBuffer: Buffer;
try {
  promptBuffer = fs.readFileSync("./prompt.txt");
} catch (e) {
  consola.error("Could not read 'prompt.txt'.");
  console.error(e);
  process.exit(1);
}

const prompt = promptBuffer.toString();

export const messages: openai.Chat.ChatCompletionMessageParam[] = [
  {
    role: "user",
    content: prompt,
  },
];

consola.info("Loading");
const response = await openAiClient.chat.completions.create({
  messages,
  model: "gpt-3.5-turbo",
});

const content = response.choices[0]?.message.content;
if (!content) {
  throw new Error("Chat completion failed, got no message back.");
}
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
fs.writeFileSync("./public/index.html", content);

consola.success("Result written to index.html");

process.exit(0);
