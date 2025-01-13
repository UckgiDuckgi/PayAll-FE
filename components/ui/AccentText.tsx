import { cn } from '@/lib/utils';

interface AccentTextProps {
  prefix: string;
  accent: string;
  suffix: string;
  accentColor?: string;
  accentSize?: string;
  className?: string;
}

export function AccentText({
  prefix,
  accent,
  suffix,
  accentColor = 'text-main',
  accentSize = 'text-[20px]',
  className,
}: AccentTextProps) {
  return (
    <div className={cn('text-sm items-end font-regular', className)}>
      <span>{prefix}</span>
      <span className={`${accentColor} ${accentSize} font-bold`}>{accent}</span>
      <span>{suffix}</span>
    </div>
  );
}
