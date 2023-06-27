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
        label: 'Clienti',
        link: ROUTES.client,
        image: 'Client',
    },
    {
        label: 'Fornitori',
        link: null,
        image: 'Supplier',
        subList: [
            {
                label: 'Voce 1', 
                link: ROUTES.example1,
            },
            {
                label: 'Voce 2', 
                link: ROUTES.example2,
            }
        ]
    },
    {
        label: 'Fornitori',
        link: null,
        image: 'Supplier',
        subList: [
            {
                label: 'Voce 1', 
                link: ROUTES.example1,
            },
            {
                label: 'Voce 2', 
                link: ROUTES.example2,
            }
        ]
    },
    {
        label: 'Fornitori',
        link: null,
        image: 'Supplier',
        subList: [
            {
                label: 'Voce 1', 
                link: ROUTES.example1,
            },
            {
                label: 'Voce 2', 
                link: ROUTES.example2,
            }
        ]
    },
    {
        label: 'Risorse',
        link: null,
        image: 'Resources',
        subList: [
            {
                label: 'Voce 1', 
                link: ROUTES.example1,
            },
            {
                label: 'Voce 3', 
                link: ROUTES.example3,
            }
        ]
    },
    {
        label: 'Abilità',
        link: ROUTES.skill,
        image: 'Skill',
    },
    {
        label: 'Tipo di pagamento',
        link: ROUTES.billing,
        image: 'Billing',
    },
]
