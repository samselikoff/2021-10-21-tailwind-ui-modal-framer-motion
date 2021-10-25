import { Dialog, Transition } from "@headlessui/react";
import * as Icons from "@heroicons/react/outline";
import { Fragment, useState } from "react";
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

      <AddFavorite open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function AddFavorite({ open, onClose }) {
  let { data: users } = useSWR("/api/users");

  return (
    <Modal open={open} onClose={onClose}>
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

function Modal({ open, onClose, children }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="fixed inset-0 z-10" onClose={onClose}>
        <div className="flex flex-col justify-center h-full px-1 pt-4 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="z-0 flex flex-col w-full h-full bg-white rounded-t-lg shadow-xl">
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
