"use client";

import clsx from "clsx";
import React from "react";

type TabItem<T extends string> = {
  key: T;
  label: string;
  icon?: React.ReactNode;
};

type Props<T extends string> = {
  tabs: readonly TabItem<T>[];
  activeTab: T;
  onChange: (key: T) => void;
  className?: string;
};

export function CustomTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
  className,
}: Props<T>) {
  return (
    <div className={clsx("flex justify-center", className)}>
      
      <div
        className="
          w-full max-w-7xl
          bg-slate-100 border rounded-sm border-slate-200 p-1.5
          
          flex flex-row
          gap-2
        "
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              className={clsx(
                `
                flex items-center justify-center rounded-sm gap-2 sm:gap-3
                w-full sm:flex-1

                px-4 sm:px-8
                py-3 sm:py-4

                text-sm sm:text-base font-bold
                
                `,
                isActive
                  ? "bg-white text-black shadow-sm"
                  : "text-slate-500 hover:text-black"
              )}
            >
              {/* Icon responsive */}
              <span className="scale-90 sm:scale-100">
                {tab.icon}
              </span>

              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}