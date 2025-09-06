import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Form, usePage } from '@inertiajs/react';

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

                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="group relative mr-4 cursor-pointer">
                                        <span className="relative z-10">Cancelar Assinatura</span>
                                        <span className="absolute bottom-0 left-0 block h-[2px] w-0 bg-gray-700 transition-all duration-300 ease-in-out group-hover:w-full dark:bg-gray-100" />
                                    </button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Tem certeza que deseja cancelar?</DialogTitle>
                                        <DialogDescription>
                                            Ao cancelar sua assinatura, você perderá acesso imediato às salas vinculadas ao seu plano. Essa ação não
                                            poderá ser desfeita.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form method="PATCH" action="/subscriptions/cancel" transform={(data) => ({ ...data, id: subscription.id })}>
                                        <button className="group relative cursor-pointer text-red-600">
                                            <span className="relative z-10">Sim, cancelar</span>
                                            <span className="absolute bottom-0 left-0 block h-[2px] w-0 bg-red-600 transition-all duration-300 ease-in-out group-hover:w-full" />
                                        </button>
                                    </Form>
                                </DialogContent>
                            </Dialog>
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
