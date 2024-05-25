import { Handlers } from "$fresh/server.ts";
import { createMessage, getMessages, watchMessage } from "../../libs/kv.ts";
import { generateReply } from "../../libs/llm.ts";

const encoder = new TextEncoder();

export type Message = {
  id: string;
  body: string;
};

export type PostMessageBody = {
  message: string;
};

export const handler: Handlers = {
  async POST(req) {
    const body: PostMessageBody = await req.json();

    const message = await createMessage(body.message, "USER");

    setTimeout(async () => {
      const messages = await getMessages(message.id);
      const llmReply = await generateReply(message.body, messages);

      await createMessage(llmReply, "BOT");
    }, 1500);

    return new Response(JSON.stringify({ ok: "ok" }), {
      headers: { "Content-Type": "application/json" },
    });
  },
  GET() {
    let closeKv: (() => void) | undefined;
    const stream = new ReadableStream({
      async start(controller) {
        await watchMessage((message) => {
          const data = {
            id: message.id,
            body: message.body,
          } satisfies Message;
          const encoded = encoder.encode(
            `data: ${JSON.stringify(data)}\n\n`,
          );
          controller.enqueue(encoded);
        });
      },
      cancel() {
        closeKv?.();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream; charset=utf-8" },
    });
  },
};
