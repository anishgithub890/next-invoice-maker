'use client';

interface HeadingThemeProps {
  title: string;
  description?: string;
  center?: boolean;
}

export const HeadingTheme: React.FC<HeadingThemeProps> = ({
  title,
  description,
  center,
}) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
        {title}
      </h2>
      <p className="text-sm font-light text-muted-foreground text-zinc-500 dark:text-white">
        {description}
      </p>
    </div>
  );
};
