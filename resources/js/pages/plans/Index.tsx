import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Form, usePage } from '@inertiajs/react';

interface Plan {
    id: number;
    name: string;
    price: number;
    description: string;
    hours_desk: number;
    hours_room: number;
    rooms: {
        id: number;
        name: string;
        description: string;
        type: string;
        capacity: number;
    }[];
}

interface UserSubscription {
    id: number;
    plan_id: number;
    user_id: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planos',
        href: '/plans',
    },
];

export default function Index() {
    const { plans, user_subscription } = usePage<{
        plans: Plan[];
        user_subscription: UserSubscription;
    }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="mx-auto max-w-6xl p-6">
                <h1 className="mb-10 text-center text-5xl font-extrabold tracking-tight">Planos</h1>

                <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {plans.map((plan) => {
                        const isActive = user_subscription && user_subscription.plan_id === plan.id;

                        return (
                            <li
                                key={plan.id}
                                className={`flex flex-col justify-between rounded-2xl border p-6 shadow-lg transition hover:shadow-xl ${
                                    isActive
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30'
                                        : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800'
                                }`}
                            >
                                {/* Cabeçalho */}
                                <div>
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-2xl font-semibold">{plan.name}</h3>
                                        <span className="text-xl font-bold text-green-600 dark:text-green-400">R${plan.price}</span>
                                    </div>

                                    <p className="mb-4 text-gray-600 dark:text-gray-300">{plan.description}</p>

                                    <div className="mb-4 h-px bg-gray-200 dark:bg-gray-600" />

                                    {/* Infos */}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span>Horas mesa:</span>
                                            <span className="font-medium">{plan.hours_desk}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Horas sala:</span>
                                            <span className="font-medium">{plan.hours_room}</span>
                                        </div>
                                    </div>

                                    {/* Acessos */}
                                    <h4 className="mt-5 mb-2 text-lg font-medium">Acessos:</h4>
                                    <div className="space-y-3">
                                        {plan.rooms.map((room) => (
                                            <div key={room.id} className="rounded-lg border border-gray-200 p-3 text-sm dark:border-gray-600">
                                                <h5 className="font-semibold">{room.name}</h5>
                                                <p className="text-gray-600 dark:text-gray-300">{room.description}</p>
                                                <span className="block text-xs text-gray-500">Capacidade: {room.capacity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Rodapé */}
                                <div className="mt-6 flex justify-center">
                                    {isActive ? (
                                        <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">Plano Ativo</span>
                                    ) : (
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="w-full rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700">
                                                    Assinar
                                                </button>
                                            </DialogTrigger>

                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Confirmar assinatura</DialogTitle>
                                                </DialogHeader>

                                                <p>
                                                    Deseja realmente assinar o plano <span className="font-semibold">{plan.name}</span> por{' '}
                                                    <span className="font-semibold">R${plan.price}</span>?
                                                </p>

                                                <DialogFooter className="mt-4 flex justify-end gap-3">
                                                    <DialogTrigger asChild>
                                                        <button className="rounded-md bg-gray-300 px-4 py-2 font-semibold text-black hover:bg-gray-400">
                                                            Cancelar
                                                        </button>
                                                    </DialogTrigger>

                                                    <Form
                                                        action="/subscriptions"
                                                        transform={(data) => ({ ...data, plan_id: plan.id })}
                                                        disableWhileProcessing
                                                        method="POST"
                                                    >
                                                        {({ processing }) => (
                                                            <button
                                                                className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                                                                type="submit"
                                                                disabled={processing}
                                                            >
                                                                {processing ? 'Aguarde...' : 'Confirmar'}
                                                            </button>
                                                        )}
                                                    </Form>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </AppLayout>
    );
}
