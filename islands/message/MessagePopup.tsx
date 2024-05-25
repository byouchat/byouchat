import { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import StyleTransition from "./transition/StyleTransition.tsx";
import { colorMap } from "../../libs/color-pallete.ts";
import { Message } from "../../routes/api/messages.ts";
import { getTextColorForBgColor } from "../../libs/color-pallete.ts";

type Props = {
  message: Message;
  position: [x: number, y: number];
  onExited: (messageId: string) => void;
};

export const MessagePopup: FunctionalComponent<Props> = (
  { message, position, onExited },
) => {
  const [isShown, setShown] = useState(true);

  useEffect(() => {
    const job = setTimeout(() => {
      setShown(false);
    }, 3000);

    return () => {
      clearTimeout(job);
    };
  }, []);

  return (
    <StyleTransition
      alwaysMounted
      in={isShown}
      duration={390}
      styles={{
        appear: {
          opacity: 0,
        },
        appearActive: {
          animation: "bounce 0.4s",
          opacity: 1,
        },
        appearDone: {
          opacity: 1,
        },
        exit: {
          opacity: 1,
        },
        exitActive: {
          animation: "bounce 0.4s reverse",
        },
        exitDone: {
          opacity: 0,
        },
      }}
      appear
      onExited={() => onExited(message.id)}
    >
      <div
        class="p-8 absolute"
        style={{
          "left": `${position[0]}px`,
          "top": `${position[1]}px`,
          "backgroundColor": colorMap[message.color],
          "color": getTextColorForBgColor(message.color),
        }}
      >
        {message.body}
      </div>
    </StyleTransition>
  );
};
