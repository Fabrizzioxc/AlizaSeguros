"use client";

import React from "react";
import clsx from "clsx";

type BadgeProps = {
  text: string;
  variant?: "default" | "primary";
  size?: "sm" | "md";
  className?: string;
};

export function Badge({
  text,
  variant = "default",
  size = "md",
  className,
}: BadgeProps) {
  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {/* Dot */}
      <span
        className={clsx(
          "rounded-full",
          size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
          variant === "primary"
            ? "bg-[#B61F1F]"
            : "bg-black dark:bg-white"
        )}
      />

      {/* Text */}
      <span
        className={clsx(
          "font-bold uppercase tracking-[0.2em]",
          size === "sm" ? "text-[10px]" : "text-xs",
          variant === "primary"
            ? "text-[#B61F1F] dark:text-red-400"
            : "text-black dark:text-white"
        )}
      >
        {text}
      </span>
    </div>
  );
}