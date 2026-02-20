'use client';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, right }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-oxanium)]">
            <span className="text-accent">Atlas</span>
            <span className="inline-block w-px h-7 bg-white/40 mx-3 align-middle"></span>
            {title}
          </h1>
          {subtitle && <p className="text-muted mt-1 text-sm">{subtitle}</p>}
        </div>
        {right && <div>{right}</div>}
      </div>
    </div>
  );
}
