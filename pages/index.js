import * as Icons from "@heroicons/react/outline";
import { useState } from "react";
import useSWR from "swr";
import Modal from "../components/modal";

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
              <button className="mr-1 text-blue-500" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>

        {users && (
          <div className="flex-1 overflow-y-scroll">
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
          </div>
        )}
      </div>
    </Modal>
  );
}
