import { ComponentProps, ElementType, ReactNode } from "react";
import { NavLink as Link } from "react-router-dom";

interface NavLinkProps extends ComponentProps<typeof Link> {
  children?: ReactNode;
  icon: ElementType;
}

export function NavLink({ children, icon: Icon, ...rest }: NavLinkProps) {
  return (
    <Link
      className={({ isActive }) => {
        return isActive
          ? "flex items-center gap-4 p-2 rounded text-blue-400"
          : "flex items-center gap-4 dark:text-zinc-300 text-zinc-600 p-2 rounded hover:text-blue-400 hover:dark:text-blue-400 transition-all";
      }}
      {...rest}
    >
      <Icon className="text-xl" />
      <span className="font-semibold text-sm tracking-wide">{children}</span>
    </Link>
  );
}
