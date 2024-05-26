import { FunctionalComponent } from "preact";
import { createPortal, useState } from "preact/compat";
import StyleTransition from "../message/transition/StyleTransition.tsx";
import {
  Color,
  colorMap,
  colors,
  colorSignal,
} from "../../libs/color-pallete.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";

type Props = {
  onExited: () => void;
};

export const ColorPalette: FunctionalComponent<Props> = (
  { onExited },
) => {
  const [isOpen, setOpen] = useState(true);

  if (!IS_BROWSER) {
    return null;
  }

  const close = () => {
    setOpen(false);
  };

  const onClickPalette = (color: Color) => {
    colorSignal.value = color;
    close();
  };

  return createPortal(
    <div
      class="absolute h-screen w-srceen z-30 inset-0 flex justify-center items-center"
      onClick={close}
    >
      <StyleTransition
        in={isOpen}
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
        onExited={onExited}
      >
        <div class="flex flex-wrap w-96 h-96 rounded-lg overflow-hidden cursor-pointer">
          {colors.map((color) => {
            return (
              <div
                key={color}
                class={`w-1/3`}
                style={{
                  backgroundColor: colorMap[color],
                }}
                onClick={() => onClickPalette(color)}
              />
            );
          })}
        </div>
      </StyleTransition>
    </div>,
    // deno-lint-ignore no-extra-non-null-assertion
    document.getElementById("color-palette")!!,
  );
};
