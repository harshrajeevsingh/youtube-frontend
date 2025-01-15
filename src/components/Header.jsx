import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Link,
} from '@nextui-org/react';
import { NavLink } from 'react-router-dom';
import { Search } from 'lucide-react';

import { Logo } from './icons/logo.jsx';
import Login from './ui/loginbtn.jsx';
import UserDropDown from './ui/userDropDown.jsx';
import { useUserStoreSelectors } from '../store/userSlice.js';

export default function Header() {
  const user = useUserStoreSelectors.use.user();

  return (
    <Navbar
      isBordered
      isBlurred={false}
      maxWidth="full"
      className="navbar gap-1 md:gap-4"
    >
      <NavbarContent justify="start" className="md:px-10">
        <NavLink to="/">
          <NavbarBrand className="md:mr-4 grow-0 md:grow">
            <Logo />
            <p className="hidden sm:block font-bold text-inherit">STREAMIFY</p>
          </NavbarBrand>
        </NavLink>
      </NavbarContent>

      <NavbarContent className="flex-1 basis-32" justify="center">
        <div className="w-full max-w-full md:px-4 ">
          <Input
            classNames={{
              base: 'w-full h-10 drop-shadow-lg',
              mainWrapper: 'h-full',
              input:
                'text-small placeholder:text-slate-600 dark:placeholder:text-gray-400',
              inputWrapper:
                'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ',
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<Search />}
            type="search"
            radius="full"
          />
        </div>
      </NavbarContent>
      {user ? (
        <UserDropDown />
      ) : (
        <NavbarContent justify="end" className="md:px-10 md:gap-4 gap-2">
          <NavbarItem className='hidden sm:block'>
            <Button
              as={Link}
              href="/signup"
              radius="full"
              variant="faded"
              className="px-0 md:px-4"
            >
              Register
            </Button>
          </NavbarItem>
          <NavbarItem>
            {' '}
            <Login />
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
