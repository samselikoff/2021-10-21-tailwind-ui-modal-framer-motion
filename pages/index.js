import { Dialog } from "@headlessui/react";
import * as Icons from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useSWR from "swr";
import { Spinner } from "../components/icons";

export default function Example() {
  let [open, setOpen] = useState(false);

  return (
    <>
      <div className="relative p-4 border-b">
        <h1 className="text-xl font-semibold text-center">Favorites</h1>
        <div className="absolute inset-y-0 flex items-center justify-center left-4">
          <button onClick={() => setOpen(true)} className="text-blue-500">
            <Icons.PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && <AddFavorite onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function AddFavorite({ onClose }) {
  let { data: users } = useSWR("/api/users");

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col h-full pt-3">
        <div className="px-3 pb-4 shadow-sm">
          <p className="text-xs">Choose a contact to add to Favorites</p>

          <div className="relative mt-5 text-center">
            <span className="font-medium">Contacts</span>
            <div className="absolute inset-y-0 right-0">
              <button
                className="mr-1 text-blue-500 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-scroll">
          {!users ? (
            <div className="flex items-center justify-center pt-12">
              <Spinner />
            </div>
          ) : (
            <>
              <ul className="px-3 text-left">
                {users.map((user) => (
                  <li key={user.id} className="py-2 border-b border-gray-100">
                    {user.name}
                  </li>
                ))}
              </ul>

              <p className="pt-4 pb-10 font-medium text-center text-gray-400">
                {users.length} Contacts
              </p>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

function Modal({ onClose, children }) {
  return (
    <Dialog className="fixed inset-0 z-10" onClose={onClose} open={true}>
      <div className="flex flex-col justify-center h-full px-1 pt-4 text-center sm:block sm:p-0">
        <Dialog.Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="fixed inset-0 bg-black/40"
        />

        <motion.div
          initial={{ y: "100%" }}
          animate={{
            y: 0,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
          }}
          exit={{
            y: "100%",
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
          }}
          className="z-0 flex flex-col w-full h-full bg-white rounded-t-lg shadow-xl"
        >
          {children}
        </motion.div>
      </div>
    </Dialog>
  );
}
