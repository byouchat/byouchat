import { StoredMessage } from "./kv.ts";

export async function generateReply(message: string, history: StoredMessage[]) {
  const messages = history.map((h) => ({
    role: h.kind === "USER" ? "user" : "assistant",
    content: h.body,
  }));

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${Deno.env.get("OPEN_ROUTER_API_TOKEN")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "model": "meta-llama/llama-3-8b-instruct:free",
      "messages": [
        {
          "role": "system",
          "content":
            "あなたは暇つぶしのチャットの相手です。メッセージに対して30文字以内の日本語で返事してください。2chのような煽り気味の口調で、少しぶっきらぼうで、タメ口で話します。絵文字は使わないでください。",
        },
        ...messages,
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  const llmBody = await res.json();
  const llmMessage = llmBody?.choices?.at(0)?.message?.content;

  if (!llmMessage || typeof llmMessage !== "string") {
    console.error(llmBody);
    return null;
  }

  return llmMessage;
}
