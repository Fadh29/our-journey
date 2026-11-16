import React from 'react';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  subtitle,
  title,
  description,
  centered = true,
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      {subtitle && (
        <p className="font-script text-2xl md:text-3xl text-blush-600 mb-2 tracking-wide">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
      <div className={`flex items-center gap-3 my-4 ${centered ? 'justify-center' : 'justify-start'}`}>
        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-blush-300" />
        <span className="text-blush-400 text-sm">✦ 💍 ✦</span>
        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-blush-300" />
      </div>
      {description && (
        <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
