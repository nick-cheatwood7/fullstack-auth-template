/* eslint-disable @typescript-eslint/no-misused-promises */
import { Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { api } from "../../utils/api";

export default function AccountDropdown({ name }: { name: string }) {
  const utils = api.useContext();
  const mutation = api.auth.logout.useMutation();

  const handleLogout = async () => {
    try {
      await mutation.mutateAsync();
      await utils.auth.me.invalidate();
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex flex-row items-center p-2 hover:rounded-md hover:bg-gray-700 hover:bg-opacity-70">
          Hello, {name}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-slate-500"
            aria-hidden="true"
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-rightdivide-y absolute right-0 mt-1 w-56  rounded-md bg-white px-2 py-1 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              <div className="flex items-center justify-start rounded-md p-2 text-red-500 hover:cursor-pointer hover:bg-gray-100">
                <button
                  className="flex w-full flex-row items-center"
                  onClick={handleLogout}
                >
                  <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5" />
                  Log Out
                </button>
              </div>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
