import { Handlers } from "$fresh/server.ts";

const encoder = new TextEncoder();

export const handler: Handlers = {
  async POST(req) {
    const body = await req.json();

    const kv = await Deno.openKv();

    const id = crypto.randomUUID();
    kv.set(["latestMessage"], { id, message: body.message }, {
      expireIn: 5000,
    });

    setTimeout(async () => {
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
                "ここはインターネットのチャット掲示板です。メッセージに対して30文字以内の日本語で返事してください。2chのような口調で、少しぶっきらぼうで、タメ口で答えてください。",
            },
            { "role": "user", "content": body.message },
          ],
        }),
      });

      const llmBody = await res.json();
      const llmMessage = llmBody?.choices?.at(0)?.message?.content;
      if (llmMessage) {
        const id = crypto.randomUUID();
        kv.set(["latestMessage"], { id, message: llmMessage }, {
          expireIn: 5000,
        });
      }
    }, 1500);

    return new Response(JSON.stringify({ ok: "ok" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async GET() {
    const kv = await Deno.openKv();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const [message] of kv.watch([["latestMessage"]])) {
          const data = encoder.encode(
            `data: ${JSON.stringify(message.value)}\n\n`,
          );
          controller.enqueue(data);
        }
      },
      cancel() {
        kv?.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream; charset=utf-8" },
    });
  },
};
