"use client";

import { useEffect, useState, InputHTMLAttributes, forwardRef } from 'react';
import { cn } from "@/lib/utils";

interface ClientInputProps extends InputHTMLAttributes<HTMLInputElement> {
  // Add any additional props specific to your input
}

export const ClientInput = forwardRef<HTMLInputElement, ClientInputProps>(
  ({ className, type, ...props }, ref) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      // Return a div with matching dimensions during SSR
      return (
        <div 
          className={cn(
            "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm",
            className
          )}
        />
      );
    }

    return (
      <input
        type={type}
        className={cn(
          "block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        ref={ref}
        {...props}
        suppressHydrationWarning
      />
    );
  }
);

ClientInput.displayName = 'ClientInput';

export default ClientInput;
