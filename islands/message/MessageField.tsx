import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import { generatePosition } from "./message.ts";
import { MessagePopup } from "./MessagePopup.tsx";
import { Message } from "../../routes/api/messages.ts";

export const MessageField: FunctionalComponent = () => {
  const [messages, setMessages] = useState<
    { message: Message; position: [x: number, y: number] }[]
  >([]);

  useEffect(() => {
    const source = new EventSource("/api/messages");
    source.addEventListener("message", (event) => {
      const message: Message = JSON.parse(event.data);
      const data = {
        message,
        position: generatePosition(),
      };
      setMessages((current) => [...current, data]);
    });

    return () => {
      source.close();
    };
  }, []);

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bounce {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          1% {
            opacity: 1;
          }
          40% {
            transform: scale(1);
          }
          80% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        `,
        }}
      />
      {messages.map((m) => (
        <MessagePopup
          message={m.message}
          position={m.position}
          key={m.message.id}
        />
      ))}
    </div>
  );
};
