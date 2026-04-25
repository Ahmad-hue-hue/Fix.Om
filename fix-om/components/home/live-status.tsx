"use client";

import { motion } from "framer-motion";
import { useLiveStatus } from "@/lib/hooks/use-live-status";

export function LiveStatusBadge() {
  const { isOpen, statusText, nextOpenTime } = useLiveStatus();

  return (
    <motion.div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
        isOpen
          ? "bg-green-open/20 text-green-open"
          : "bg-closed/20 text-closed"
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.span
        className={`w-2 h-2 rounded-full ${
          isOpen ? "bg-green-open" : "bg-closed"
        }`}
        animate={isOpen ? { scale: [1, 1.2, 1] } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <span>
        {isOpen ? statusText : `${statusText} — Opens at ${nextOpenTime}`}
      </span>
    </motion.div>
  );
}