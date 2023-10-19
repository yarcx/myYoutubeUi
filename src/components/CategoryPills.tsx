import { ChevronLeft, ChevronRight } from "lucide-react";
import Buttons from "./Buttons";
import { useEffect, useRef, useState } from "react";

type CategoryPillProps = {
  categories: Array<string>;
  onSelectCategory: (category: string) => void;
  selectedCategories: string;
};

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({ categories, selectedCategories, onSelectCategory }: CategoryPillProps) => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [translate, setTranslate] = useState(0);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) return;

    const observer = new ResizeObserver((entries) => {
      const container = entries[0]?.target;
      if (container == null) return;

      setIsLeftVisible(translate > 0);

      setIsRightVisible(translate + container.clientWidth < container.scrollWidth);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div className='relative p-2 overflow-x-hidden ' ref={containerRef}>
      <div
        className='flex whitespace-nowrap gap-3 transition-transform w-[max-content]'
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Buttons
            onClick={() => onSelectCategory(category)}
            key={category}
            variant={selectedCategories === category ? "dark" : "default"}
            className='px-3 py-1 rounded-lg whitespace-nowrap justify-self-center'
          >
            {category}
          </Buttons>
        ))}
      </div>
      {isLeftVisible && (
        <div className='absolute left-0 -translate-y-1/2 top-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full'>
          <Buttons
            onClick={() =>
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate < 0) return 0;
                return newTranslate;
              })
            }
            variant='ghost'
            size='icon'
            className='h-full aspect-square w-auto p-1.5'
          >
            <ChevronLeft />
          </Buttons>
        </div>
      )}
      {isRightVisible && (
        <div className='absolute right-0 -translate-y-1/2 top-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end'>
          <Buttons
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current === null) return translate;
                const newTranslate = translate + TRANSLATE_AMOUNT;
                const width = containerRef.current.scrollWidth;
                const edge = containerRef.current.clientWidth;
                if (newTranslate + edge >= width) return newTranslate;
                return newTranslate;
              });
            }}
            variant='ghost'
            size='icon'
            className='h-full aspect-square w-auto p-1.5'
          >
            <ChevronRight />
          </Buttons>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
