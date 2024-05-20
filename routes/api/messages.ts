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
