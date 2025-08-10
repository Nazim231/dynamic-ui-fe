import { cn } from '@/lib/utils';

type SectionWithTitleProps = {
  title: string;
  children?: React.ReactNode;
  classNames?: { container?: string; header?: string; content?: string };
};

export function SectionWithTitle({ title, children, classNames }: SectionWithTitleProps) {
  return (
    <div className={cn('border rounded', classNames?.container)}>
      <div className={cn('p-2 border-b', classNames?.header)}>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <div className={cn('block p-2', classNames?.content)}>{children}</div>
    </div>
  );
}
