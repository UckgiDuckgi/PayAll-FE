import { cn } from '@/lib/utils';

interface AccentTextProps {
  prefix: string;
  accent: string;
  suffix: string;
  icon?: React.ReactNode;
  accentColor?: string;
  accentSize?: string;
  className?: string;
}

export function AccentText({
  prefix,
  accent,
  suffix,
  icon,
  accentColor = 'text-main',
  accentSize = 'text-[1.25rem]',
  className,
}: AccentTextProps) {
  return (
    <div
      className={cn(
        'text-[0.85rem] items-end font-bold flex gap-[0.15rem]',
        className
      )}
    >
      <span>{prefix}</span>
      <span
        className={`${accentColor} ${accentSize} font-bold flex items-center gap-1 text-[0.85rem]`}
      >
        {icon} {accent}
      </span>
      <span>{suffix}</span>
    </div>
  );
}
