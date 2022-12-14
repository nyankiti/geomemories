import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
/* components */
import UserIcon from 'components/templates/UserIcon';
import { BiLogIn } from 'react-icons/bi';
import { FaPhotoVideo } from 'react-icons/fa';
import { BsVectorPen } from 'react-icons/bs';
/* hooks */
import { useAuth } from '../../context/authContext';

function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow sm:px-6 md:px-12">
      <div className="flex h-16 items-center justify-between px-2 font-semibold">
        <h1 className="w-3/12">
          <Link href="/" passHref>
            <h1 className="cursor-pointer text-3xl font-bold duration-200 hover:text-purple-500">
              GeoMemories
            </h1>
          </Link>
        </h1>

        <nav className="nav">
          <ul className="flex items-center">
            <Link href="/quote" passHref>
              <div className="relative block cursor-pointer pl-2 pr-7 hover:text-purple-500">
                <FaPhotoVideo className="block" size={30} />
                <p
                  className="absolute -translate-x-3 whitespace-nowrap font-bold"
                  style={{
                    fontSize: '0.5rem',
                    lineHeight: '0.1rem',
                    marginTop: '2px',
                  }}
                >
                  アルバムを作る
                </p>
              </div>
            </Link>
            {!user ? (
              <Link href="/login" passHref>
                <div className="relative mb-2 block cursor-pointer px-2 hover:text-purple-500">
                  <BiLogIn className="-mb-2 block" size={36} />
                  <p
                    role="button"
                    className=" absolute whitespace-nowrap pl-4 text-xs"
                  >
                    login
                  </p>
                </div>
              </Link>
            ) : (
              <UserIcon user={user} />
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
