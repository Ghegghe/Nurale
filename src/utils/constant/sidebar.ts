import { ROUTES } from "."
import { icons } from "../../ui/atoms/Icons";

interface Sidebar {
    label: string;
    link: string | null;
    image: icons;
    subList?: {
        label: string;
        link: string;
    }[];
}

const base = 'sidebar.top-sidebar.'

export const SIDEBAR: Sidebar[] = [
    {
        label: base+'home',
        link: ROUTES.dashboard,
        image: 'Home',
    },
    {
        label: base+'quick-insert',
        link: ROUTES.dashboard,
        image: 'Resources',
    },
    {
        label: base+'jobs',
        link: null,
        image: 'Billing',
        subList: [
            {
                label: base+'jobs', 
                link: ROUTES.dashboard,
            },
            {
                label: base+'orders', 
                link: ROUTES.dashboard,
            },
            {
                label: base+'activities', 
                link: ROUTES.dashboard,
            },
        ]
    },
    {
        label: base+'personal-data',
        link: null,
        image: 'Client',
        subList: [
            {
                label: base+'customers', 
                link: ROUTES.dashboard,
            },
            {
                label: base+'suppliers', 
                link: ROUTES.dashboard,
            },
            {
                label: base+'resources', 
                link: ROUTES.dashboard,
            },
            {
                label: base+'resource-skill', 
                link: ROUTES.dashboard,
            },
        ]
    },
    {
        label: base+'purchases',
        link: null,
        image: 'Billing',
        subList: [
            {
                label: base+'purchase-invoice', 
                link: ROUTES.dashboard,
            },
            {
                label: base+'purchase-invoice-activity', 
                link: ROUTES.dashboard,
            }
        ]
    },
    {
        label: base+'sales',
        link: null,
        image: 'Billing',
        subList: [
            {
                label: base+'sales-invoices', 
                link: ROUTES.dashboard,
            },
        ]
    },
    {
        label: base+'timetable',
        link: null,
        image: 'Billing',
        subList: [
            {
                label: base+'scheduled-payments', 
                link: ROUTES.dashboard,
            },
            {
                label: base+'scheduled-values', 
                link: ROUTES.dashboard,
            }
        ]
    },
    {
        label: base+'settings',
        link: null,
        image: 'Setting',
        subList: [
            {
                label: base+'skills', 
                link: ROUTES.skills,
            },
            {
                label: base+'type-of-payment', 
                link: ROUTES.typeOfPayments,
            },
            {
                label: base+'users', 
                link: ROUTES.users,
            },
        ]
    },
    {
        label: base+'timesheet',
        link: null,
        image: 'Clock',
        subList: [
            {
                label: base+'timesheet', 
                link: ROUTES.dashboard,
            },
            {
                label: base+'report', 
                link: ROUTES.dashboard,
            }
        ]
    },
]
