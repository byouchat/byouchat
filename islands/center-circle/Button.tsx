import { ComponentProps, FunctionalComponent } from "preact";

export const Button: FunctionalComponent<ComponentProps<"button">> = (
  props,
) => {
  return (
    <button {...props} class="text-sm px-3 py-2 border border-white rounded" />
  );
};
