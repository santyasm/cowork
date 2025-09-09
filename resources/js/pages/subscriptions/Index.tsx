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
    const pastSubscriptions = subscriptions.filter((subscription) => subscription.status !== 'active');

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Assinaturas',
            href: '/subscriptions',
        },
    ];

    const hasNoSubscriptions = activeSubscriptions.length === 0 && pastSubscriptions.length === 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-6 space-y-12">
                {hasNoSubscriptions ? (
                    <div className="rounded-lg border p-10 text-center text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <p>Você ainda não possui nenhuma assinatura.</p>
                    </div>
                ) : (
                    <>
                        {/* Ativas */}
                        <div>
                            <h1 className="mb-6 text-4xl font-bold">Assinaturas ativas</h1>

                            {activeSubscriptions.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {activeSubscriptions.map((subscription) => (
                                        <div
                                            className="flex flex-col rounded-2xl border border-green-400 bg-green-50 p-6 shadow-lg dark:border-green-600 dark:bg-green-900/30"
                                            key={subscription.id}
                                        >
                                            <div className="mb-4 flex items-center justify-between">
                                                <h2 className="text-2xl font-semibold">{subscription.plan.name}</h2>
                                                <span className="text-lg font-bold text-green-700 dark:text-green-400">
                                                    R${subscription.plan.price}
                                                </span>
                                            </div>

                                            <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                                <p>Início: {subscription.start_date}</p>
                                                <p>Fim: {subscription.end_date}</p>
                                                <p>
                                                    Status:{' '}
                                                    <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-semibold text-white">
                                                        {subscription.status}
                                                    </span>
                                                </p>
                                            </div>

                                            <div className="mt-6 flex justify-end">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
                                                            Cancelar assinatura
                                                        </button>
                                                    </DialogTrigger>

                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Tem certeza que deseja cancelar?</DialogTitle>
                                                            <DialogDescription>
                                                                Ao cancelar sua assinatura, você perderá acesso imediato às salas vinculadas ao seu
                                                                plano. Essa ação não poderá ser desfeita.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <Form
                                                            method="PATCH"
                                                            action="/subscriptions/cancel"
                                                            transform={(data) => ({
                                                                ...data,
                                                                id: subscription.id,
                                                            })}
                                                        >
                                                            <button className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700">
                                                                Sim, cancelar
                                                            </button>
                                                        </Form>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-4 text-gray-500">Nenhuma assinatura ativa no momento.</p>
                            )}
                        </div>

                        {/* Histórico */}
                        <div>
                            <h2 className="mb-6 text-3xl font-bold">Histórico de assinaturas</h2>

                            {pastSubscriptions.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2">
                                    {pastSubscriptions.map((subscription) => (
                                        <div
                                            className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800/40"
                                            key={subscription.id}
                                        >
                                            <h3 className="text-lg font-semibold">
                                                {subscription.plan.name} - R${subscription.plan.price}
                                            </h3>
                                            <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                                                <p>Início: {subscription.start_date}</p>
                                                <p>Fim: {subscription.end_date}</p>
                                                <p>Status: {subscription.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-4 text-gray-500">Nenhuma assinatura anterior encontrada.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
