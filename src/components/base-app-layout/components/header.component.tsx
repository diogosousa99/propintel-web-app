import { useUserSessionQuery } from '@store';
import { useState, useEffect, useRef } from 'react';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import clsx from 'clsx';
import { HeaderMenu } from '@types';

type Props = {
    menu: HeaderMenu[];
};

export function Header({ menu }: Props) {
    const [open, _setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { data } = useUserSessionQuery();

    const initials = data?.name
        ?.split(' ')
        .map((name) => name.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);

    const _handleToggle = () => {
        _setOpen((prev) => !prev);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
                _setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="flex items-center gap-1 justify-end h-16 w-full bg-primary-content text-white p-4">
            <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-6 rounded-full">
                    <span className="text-xs">{initials}</span>
                </div>
            </div>
            <div className="relative" ref={dropdownRef}>
                <div className="flex items-center gap-1 cursor-pointer" onClick={_handleToggle}>
                    <p className="text-sm">{data?.name}</p>
                    {open ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                </div>
                <ul
                    className={clsx(
                        'absolute right-0 mt-2 w-52 rounded-box bg-base-100 shadow-sm p-2 z-10 menu text-black',
                        {
                            hidden: !open,
                            block: open,
                        },
                    )}
                >
                    {menu.map(({ name, action }) => (
                        <li key={name} onClick={action}>
                            <a>{name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
}
