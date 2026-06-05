declare module "lucide-react" {
  import type { FC, SVGProps } from "react";

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = FC<LucideProps>;

  export const BadgeHelp: LucideIcon;
  export const BookOpen: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const CircleUserRound: LucideIcon;
  export const Gamepad2: LucideIcon;
  export const Heart: LucideIcon;
  export const Home: LucideIcon;
  export const LayoutDashboard: LucideIcon;
  export const LogOut: LucideIcon;
  export const Menu: LucideIcon;
  export const PackageCheck: LucideIcon;
  export const Search: LucideIcon;
  export const Settings: LucideIcon;
  export const ShoppingBag: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const Truck: LucideIcon;
  export const UserRound: LucideIcon;
  export const X: LucideIcon;
}
