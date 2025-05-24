import { JSX } from 'react';

export type SidebarMenu = {
    name: string;
    icon: JSX.Element;
    to: string;
};

export type HeaderMenu = {
    name: string;
    action: () => void;
};
