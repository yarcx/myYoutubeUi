import { twMerge } from "tailwind-merge";
import Buttons, { buttonStyles } from "./Buttons";
import { Children, ElementType, ReactNode, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};
type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

export function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className='mt-2 mb-1 ml-4 text-lg'>{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Buttons
          onClick={() => setIsExpanded((e) => !e)}
          variant='ghost'
          className='flex items-center w-full gap-4 p-3 rounded-lg'
        >
          <ButtonIcon className='w-6 h-6' />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Buttons>
      )}
    </div>
  );
}

export function LargeSidebarItem({ IconOrImgUrl, title, url, isActive }: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className='w-6 h-6 rounded-full' />
      ) : (
        <IconOrImgUrl className='w-6 h-6' />
      )}
      <div className='overflow-hidden whitespace-nowrap text-ellipsis'>{title}</div>
    </a>
  );
}
