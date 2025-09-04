import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

interface Subscription {
    id: number;
    status: string;
    start_date: string;
    end_date: string;
    plan: {
        id: number;
        name: string;
        price: number;
    };
}

export default function Index() {
    const { subscriptions } = usePage<{ subscriptions: Subscription[] }>().props;

    const activeSubscriptions = subscriptions.filter((subscription) => subscription.status === 'active');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assinaturas',
            href: '/subscriptions',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6">
                <h1 className="text-4xl font-bold">Assinaturas ativas</h1>

                {activeSubscriptions.map((subscription) => (
                    <div className="my-4 flex flex-col rounded-md border p-3" key={subscription.id}>
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                {subscription.plan.name} - R${subscription.plan.price}
                            </h2>
                            <button className="mr-4 inline-block w-auto cursor-pointer underline underline-offset-2 hover:text-blue-800">
                                Cancelar Assinatura
                            </button>
                        </div>
                        <span>Início: {subscription.start_date}</span>
                        <span>Fim: {subscription.end_date}</span>
                        <span>{subscription.status}</span>
                        <div className="flex"></div>
                    </div>
                ))}
            </div>
        </AppLayout>
    );
}
