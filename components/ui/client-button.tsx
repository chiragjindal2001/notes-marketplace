"use client";

import { useEffect, useState, ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from "@/lib/utils";

interface ClientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // Add any additional props specific to your button
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ClientButton = forwardRef<HTMLButtonElement, ClientButtonProps>(
  ({ 
    className, 
    variant = 'default',
    size = 'default',
    children,
    ...props 
  }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      // Return a div with matching dimensions during SSR
      return (
        <div 
          className={cn(
            "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:opacity-50 disabled:pointer-events-none",
            {
              'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
              'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
              'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
              'text-primary underline-offset-4 hover:underline': variant === 'link',
              'h-10 py-2 px-4': size === 'default',
              'h-9 px-3 rounded-md': size === 'sm',
              'h-11 px-8 rounded-md': size === 'lg',
              'h-10 w-10': size === 'icon',
            },
            className
          )}
        />
      );
    }

    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          {
            'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
            'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
            'text-primary underline-offset-4 hover:underline': variant === 'link',
            'h-10 py-2 px-4': size === 'default',
            'h-9 px-3 rounded-md': size === 'sm',
            'h-11 px-8 rounded-md': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        ref={ref}
        {...props}
        suppressHydrationWarning
      >
        {children}
      </button>
    );
  }
);

ClientButton.displayName = 'ClientButton';

export default ClientButton;
