import { type ComponentProps } from "react";

interface IconProps extends ComponentProps<"svg"> {
  size?: number;
}

export function Icon({ children, size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      {...props}
    >
      {children}
    </svg>
  );
}
