import { signal } from "@preact/signals-core";

export const colorMap = {
  "red": "#dd3333",
  "orange": "#f29600",
  "yellow": "#ffd500",
  "green": "#61ae24",
  "cyan": "#00a1cb",
  "blue": "#2864bf",
  "purple": "#9a51e2",
  "pink": "#ef6ea2",
  "black": "#2c2c2c",
} as const;
export const colors = Object.keys(colorMap) as (keyof typeof colorMap)[];
export type Color = typeof colors[number];

export function getTextColorForBgColor(bgColor: Color) {
  if (bgColor === "yellow") {
    return colorMap["black"];
  } else {
    return "white";
  }
}

export const colorSignal = signal<Color>("black");
