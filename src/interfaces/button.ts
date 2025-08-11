import { ReactNode } from "react";

export interface LinkStyleProps {
  isCenter?: boolean;
  variant?: "mint" | "outline" | "dark" | "white" | "blue";
  hovered?: boolean;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "cust";
}

export interface ButtonProps extends LinkStyleProps {
  children: ReactNode;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  showLoading?: boolean;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => void;
}
