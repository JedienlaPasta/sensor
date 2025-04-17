"use client";
import { formatDate } from "../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Status } from "./site-status-history";

type StatusTileProps = {
  interval: Status | null;
  index: number;
};

export default function StatusTile({ interval, index }: StatusTileProps) {
  if (!interval) {
    return (
      <motion.div
        key={index}
        className="w-[0.375rem] h-9 rounded-[1.5px] bg-gray-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.01 }}
      ></motion.div>
    );
  }
  const statusColor = {
    0: "bg-gray-300",
    200: "bg-teal-400",
    500: "bg-rose-500/80",
  };

  const hoverColor = {
    0: "hover:bg-gray-300",
    200: "hover:bg-teal-600",
    500: "hover:bg-rose-600",
  };

  const tileColor =
    interval.status === 200 ? statusColor[200] : statusColor[500];

  const tileHoverColor =
    interval.status === 200 ? hoverColor[200] : hoverColor[500];

  return (
    <motion.div
      key={index}
      className={`w-[0.375rem] h-9 group rounded-[1.5px] hover:bg-teal-600 ${tileColor} ${tileHoverColor}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.01 }}
    >
      <AnimatePresence>
        {/* Tooltip that appears on hover */}
        <motion.div
          className="absolute -top-7 z-10 hidden -translate-x-[50%] whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white group-hover:flex"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {formatDate(interval.created_at)}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
