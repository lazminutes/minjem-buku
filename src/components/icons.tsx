import {
  AvatarIcon,
  BookmarkIcon,
  ChevronLeftIcon,
  GearIcon,
  HomeIcon,
  ImageIcon,
  ReaderIcon,
} from "@radix-ui/react-icons"

export type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  menu: ({ ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      {...props}
    >
      <path
        d="M3 5H11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 12H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M3 19H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  dashboard: HomeIcon,
  avatar: AvatarIcon,
  placeholder: ImageIcon,
  settings: GearIcon,
  chevronLeft: ChevronLeftIcon,
  reader: ReaderIcon,
  bookmark: BookmarkIcon,
}
