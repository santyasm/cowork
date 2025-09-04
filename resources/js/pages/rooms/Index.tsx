import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

interface Room {
    id: number;
    name: string;
    type: string;
}

export default function Index() {
    const { rooms } = usePage<{ rooms: Room[] }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Planos',
            href: '/plans',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div>
                <h1>Salas</h1>
                <ul>
                    {rooms.map((plan) => (
                        <li key={plan.id}>
                            {plan.name} - {plan.type}
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
