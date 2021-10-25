import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";

export default function Modal({ onClose, children }) {
  return (
    <Dialog static open={true} className="fixed inset-0 z-10" onClose={onClose}>
      <div className="flex flex-col justify-center h-full px-1 pt-4 text-center sm:block sm:p-0">
        <Dialog.Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { ease: [0.36, 0.66, 0.04, 1], duration: 0.4 },
          }}
          exit={{
            opacity: 0,
            transition: { ease: [0.36, 0.66, 0.04, 1], duration: 0.3 },
          }}
          className="fixed inset-0 bg-black/40"
        />

        <motion.div
          initial={{ y: "100%" }}
          animate={{
            y: 0,
            transition: { ease: [0.36, 0.66, 0.04, 1], duration: 0.4 },
          }}
          exit={{
            y: "100%",
            transition: { ease: [0.36, 0.66, 0.04, 1], duration: 0.3 },
          }}
          className="z-0 flex flex-col w-full h-full bg-white rounded-t-lg shadow-xl"
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
