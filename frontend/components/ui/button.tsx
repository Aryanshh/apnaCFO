import React from 'react';

export function Button({ 
  children, 
  className = '', 
  variant = 'default', 
  size = 'default', 
  ...props 
}: any) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  const variants: any = {
    default: 'bg-emerald-600 text-white hover:bg-emerald-700',
    ghost: 'hover:bg-slate-100 text-slate-700',
  };
  const sizes: any = {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
}
