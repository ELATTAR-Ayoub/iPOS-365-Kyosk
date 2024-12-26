import { type ComponentProps } from "react";

interface IconProps extends ComponentProps<"svg"> {
  size?: number;
  viewBox?: string;
}

export function Icon({
  children,
  size = 24,
  viewBox = "0 0 24 24", // Make viewBox configurable
  ...props
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="0"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}
