import { ComponentProps, ReactNode } from "react";

interface FabButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  activeColor?: string;
}

export function FabButton({ children, activeColor, ...rest }: FabButtonProps) {
  const color = activeColor ?? "red";
  return (
    <button
      className={`text-lg dark:bg-zinc-800 border-[1px] dark:border-zinc-700 w-10 h-10 grid place-content-center rounded-full hover:text-${color}-400`}
      {...rest}
    >
      {children}
    </button>
  );
}
