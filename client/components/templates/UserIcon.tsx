/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Fragment } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import { FaUser } from 'react-icons/fa';
import { ImBooks } from 'react-icons/im';
import { FiLogOut } from 'react-icons/fi';
/* libs */
import { logout } from '../../libs/auth';
/* entity */
import { User } from 'entities/user';

type Props = {
  user: User;
};
function UserIcon({ user }: Props) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="border-b-2 border-purple-500 border-opacity-0 px-4 pt-4 pb-3 hover:border-opacity-100 hover:text-purple-500">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              className="block h-10 w-10 rounded-full"
              alt={user.name}
            />
          ) : (
            <img
              src="/assets/images/user_account.svg"
              className="block h-9 w-9"
              alt="user account"
            />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  )}
                >
                  <Link href="/myalbums" passHref>
                    <button className="block w-full px-4 py-2 text-left text-sm">
                      <ImBooks className="mr-1 inline-block h-6 w-6" />
                      アルバム
                    </button>
                  </Link>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  )}
                >
                  <Link href="/mypage" passHref>
                    <button className="block w-full px-4 py-2 text-left text-sm">
                      <FaUser className="mr-1 inline-block h-5 w-5" />
                      プロフィール
                    </button>
                  </Link>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => logout()}
                  className={clsx(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm',
                  )}
                >
                  <FiLogOut className="mr-1 inline-block h-5 w-5" />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default UserIcon;
