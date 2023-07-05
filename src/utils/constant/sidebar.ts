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

export const SIDEBAR: Sidebar[] = [
    {
        label: 'Home',
        link: ROUTES.dashboard,
        image: 'Home',
    },
    {
        label: 'Inserimento veloce',
        link: ROUTES.dashboard,
        image: 'Resources',
    },
    {
        label: 'Commesse',
        link: null,
        image: 'Billing',
        subList: [
            {
                label: 'Commesse', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Ordini', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Attività', 
                link: ROUTES.dashboard,
            },
        ]
    },
    {
        label: 'Anagrafiche',
        link: null,
        image: 'Client',
        subList: [
            {
                label: 'Clienti', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Fornitori', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Risorse', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Skills delle risorse', 
                link: ROUTES.dashboard,
            },
        ]
    },
    {
        label: 'Acquisti',
        link: null,
        image: 'Billing',
        subList: [
            {
                label: 'Fattura di acquisto', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Fattura di acquisto attività', 
                link: ROUTES.dashboard,
            }
        ]
    },
    {
        label: 'Vendite',
        link: null,
        image: 'Billing',
        subList: [
            {
                label: 'Fatture di vendita', 
                link: ROUTES.dashboard,
            },
        ]
    },
    {
        label: 'Scadenziario',
        link: null,
        image: 'Billing',
        subList: [
            {
                label: 'Scadenze', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Pianificazione', 
                link: ROUTES.dashboard,
            }
        ]
    },
    {
        label: 'Impostazioni',
        link: null,
        image: 'Setting',
        subList: [
            {
                label: 'Skills', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Tipi di pagamento', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Utenti', 
                link: ROUTES.users,
            },
        ]
    },
    {
        label: 'Timesheet',
        link: null,
        image: 'Clock',
        subList: [
            {
                label: 'Timesheet', 
                link: ROUTES.dashboard,
            },
            {
                label: 'Report', 
                link: ROUTES.dashboard,
            }
        ]
    },
]
