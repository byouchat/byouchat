import { FunctionalComponent } from "preact";
import { Input } from "./Input.tsx";
import { Button } from "./Button.tsx";
import { ComponentProps } from "preact";
import { PostMessageBody } from "../../routes/api/messages.ts";
import { CurrentTimeText } from "./CurrentTimeText.tsx";
import { useState } from "preact/hooks";
import { ColorPalette } from "../color-palette/ColorPalette.tsx";
import {
  colorMap,
  colorSignal,
  getTextColorForBgColor,
} from "../../libs/color-pallete.ts";

export const CenterCircle: FunctionalComponent = () => {
  const color = colorSignal.value;
  const [isPaletteOpen, setPaletteOpen] = useState(false);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (
    e,
  ) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const message = formData.get("message")?.toString();
    if (message) {
      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify(
          {
            message,
            color,
          } satisfies PostMessageBody,
        ),
      });
    }

    target?.reset();
  };
  const openPalette = () => {
    setPaletteOpen(true);
  };

  return (
    <>
      <div
        class="w-96 h-96 rounded-full p-8 flex flex-col items-center gap-4 bg-byou-green"
        style={{
          "backgroundColor": colorMap[color],
          "color": getTextColorForBgColor(color),
        }}
      >
        <div>
          <div class="text-5xl font-bold py-3">- 秒 -</div>
          <div class="text-sm">3秒で消えるSNS</div>
        </div>
        <div class="text-sm">
          <CurrentTimeText />
        </div>
        <form class="w-full flex flex-col gap-4 px-3" onSubmit={onSubmit}>
          <Input name="message" placeholder="ここにテキストを入力" />
          <div class="w-full flex justify-between items-center">
            <button onClick={openPalette} type="button">
              <img
                className="w-10 h-10 cursor-pointer"
                src="/palette-button.png"
              />
            </button>
            <Button
              type="submit"
              style={{ borderColor: getTextColorForBgColor(color) }}
            >
              送信
            </Button>
          </div>
        </form>
        <div class="flex flex-col-reverse flex-grow text-sm">
          <a
            href="https://github.com/byouchat/byouchat"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
        </div>
      </div>
      {isPaletteOpen && (
        <ColorPalette
          onExited={() => {
            setPaletteOpen(false);
          }}
        />
      )}
    </>
  );
};
