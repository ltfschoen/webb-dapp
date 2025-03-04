import { AccordionTrigger } from '@radix-ui/react-accordion';
import {
  ArrowRight,
  ChevronDown,
  CloseCircleLineIcon,
  Menu,
} from '@webb-tools/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@webb-tools/webb-ui-components/components/Accordion';
import { Button } from '@webb-tools/webb-ui-components/components/Button';
import {
  Dropdown,
  DropdownBasicButton,
  DropdownBody,
} from '@webb-tools/webb-ui-components/components/Dropdown';
import { MenuItem } from '@webb-tools/webb-ui-components/components/MenuItem';
import { Typography } from '@webb-tools/webb-ui-components/typography/Typography';

import cx from 'classnames';
import Link from 'next/link';

import { PropsWithChildren } from 'react';
import { BRIDGE_URL } from '../constants';

interface NavItem {
  /**
   * The label of the link
   */
  label: string;

  /**
   * The url of the link
   */
  url: string;

  /**
   * If true, the link will use the Next.js link component
   */
  isInternal?: boolean;
}

const isNavItem = (item: any): item is NavItem => {
  return 'label' in item && 'url' in item;
};

const navItems: Array<NavItem | { [label: string]: Array<NavItem> }> = [
  {
    protocols: [
      {
        label: 'Shielded Pool Protocols',
        url: '#',
      },
      {
        label: 'Shielded Identity Protocols',
        url: '#',
      },
    ],
  },
  { label: 'research', url: '#', isInternal: true },
  { label: 'community', url: '#' },
  { label: 'developer', url: '#' },
];

const Navbar = () => {
  return (
    <nav>
      <ul className="flex items-center space-x-6">
        {navItems.map((item, idx) => (
          <li className="hidden md:block" key={idx}>
            {isNavItem(item) ? (
              <NavLink url={item.url} isInternal={item.isInternal}>
                <Typography
                  className="capitalize"
                  variant="body1"
                  fw="bold"
                  component="span"
                >
                  {item.label}
                </Typography>
              </NavLink>
            ) : (
              <Dropdown>
                <DropdownBasicButton className="flex items-center space-x-2 group">
                  <Typography className="capitalize" variant="body1" fw="bold">
                    {Object.keys(item)[0]}
                  </Typography>

                  <ChevronDown className="mx-2 transition-transform duration-300 ease-in-out group-radix-state-open:-rotate-180" />
                </DropdownBasicButton>

                <DropdownBody
                  isPorttal={false}
                  className="p-4 mt-4 space-y-4 w-[374px]"
                  size="sm"
                  align="start"
                >
                  {Object.values(item)[0].map((subItem, idx) => (
                    <NavLink
                      key={idx}
                      url={subItem.url}
                      isInternal={subItem.isInternal}
                    >
                      <MenuItem
                        className="px-4 py-2 rounded-lg hover:text-blue-70"
                        icon={
                          <ArrowRight className="!fill-current" size="lg" />
                        }
                      >
                        {subItem.label}
                      </MenuItem>
                    </NavLink>
                  ))}
                </DropdownBody>
              </Dropdown>
            )}
          </li>
        ))}

        <li>
          <Button href={BRIDGE_URL} target="_blank" rel="noreferrer">
            Bridge
          </Button>
        </li>

        <li className="flex items-center justify-center md:hidden">
          <MobileNav />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

const NavLink = ({
  url,
  isInternal,
  children,
}: PropsWithChildren<Omit<NavItem, 'label'>>) => {
  return isInternal ? (
    <Link href={url} className="!text-inherit block">
      {children}
    </Link>
  ) : (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="!text-inherit block"
    >
      {children}
    </a>
  );
};

const MobileNav = () => {
  return (
    <Dropdown>
      <DropdownBasicButton className="flex items-center justify-center group">
        <Menu className="block group-radix-state-open:hidden" size="lg" />

        <CloseCircleLineIcon
          className="hidden group-radix-state-open:block"
          size="lg"
        />
      </DropdownBasicButton>

      <DropdownBody
        isPorttal={false}
        className="mt-4 p-4 space-y-4 w-screen sm:w-[374px]"
        size="sm"
        align="start"
      >
        {navItems.map((item, idx) =>
          isNavItem(item) ? (
            <NavLink key={idx} {...item}>
              <MenuItem
                className={cx('px-4 py-2 rounded-lg', {
                  'hover:!bg-transparent': !isNavItem(item),
                })}
                icon={
                  isNavItem(item) ? (
                    <ArrowRight className="!fill-current" size="lg" />
                  ) : undefined
                }
              >
                {item.label}
              </MenuItem>
            </NavLink>
          ) : (
            <Accordion key={idx} type={'single'} collapsible>
              <AccordionItem className="p-0" value={Object.keys(item)[0]}>
                <AccordionTrigger
                  className={cx(
                    'flex items-center justify-between w-full capitalize',
                    'group hover:bg-blue-0 dark:hover:bg-blue-120',
                    'px-4 py-2 rounded-lg'
                  )}
                >
                  <span>{Object.keys(item)[0]}</span>

                  <ChevronDown
                    size="lg"
                    className="block duration-300 ease-in-out transform group-radix-state-open:rotate-180"
                  />
                </AccordionTrigger>

                <AccordionContent className="pt-0 pb-4 pl-4 pr-0 mt-4 space-y-4 border-b-2 border-mono-200">
                  {Object.values(item)[0].map((subItem, idx) => (
                    <NavLink key={idx} {...subItem}>
                      <MenuItem
                        className="px-4 py-2 rounded-lg hover:text-blue-70"
                        icon={
                          <ArrowRight className="!fill-current" size="lg" />
                        }
                        key={`${subItem.label}-${idx}`}
                      >
                        {subItem.label}
                      </MenuItem>
                    </NavLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )
        )}
      </DropdownBody>
    </Dropdown>
  );
};
