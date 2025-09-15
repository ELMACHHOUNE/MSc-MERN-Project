"use client";
import React from "react";
import { motion } from "motion/react";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const cn = (...cls) => cls.filter(Boolean).join(" ");

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
  className,
  label,
}) => {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className={cn("relative text-xs tracking-wide font-medium", className)}
    >
      <motion.p
        transition={{ duration: 0.25 }}
        className={cn(
          "cursor-pointer select-none px-3 py-1.5 rounded-md flex items-center justify-center",
          active === item
            ? "bg-slate-900/80 text-white shadow-sm"
            : "text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5"
        )}
      >
        {label || item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%+1.1rem)] left-1/2 -translate-x-1/2 pt-3">
              <motion.div
                transition={transition}
                layoutId="active"
                className="rounded-2xl overflow-hidden border border-white/[0.15] dark:border-white/[0.18] bg-gradient-to-br from-slate-800 via-slate-800/90 to-slate-900 backdrop-blur-md shadow-2xl"
              >
                <motion.div layout className="w-max max-w-xs p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children, className }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative flex w-full items-start rounded-2xl border border-transparent dark:bg-[#0F172B] dark:border-white/10 bg-white/70 backdrop-blur shadow-input px-4 py-5 gap-2",
        className
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <a href={href} className="flex space-x-2">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-md shadow-2xl"
      />
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </a>
  );
};

export const HoveredLink = ({ children, ...rest }) => {
  return (
    <a
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition"
    >
      {children}
    </a>
  );
};
