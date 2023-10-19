import { ElementType } from "react";
import { buttonStyles } from "./Buttons";
import { twMerge } from "tailwind-merge";

export type SmallSidebarItemProps = {
  title: string;
  Icon: ElementType;
  url: string;
  isActive?: boolean;
};
const SmallSidebarItem = ({ Icon, title, url }: SmallSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost", size: "default" }),
        "py-3 rounded-lg flex flex-col items-center px-0"
      )}
    >
      <Icon className='w-6 h-6' />
      <div className='text-xs'>{title}</div>
    </a>
  );
};

export default SmallSidebarItem;
