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
    const { plans, user_subscription } = usePage<{ plans: Plan[]; user_subscription: UserSubscription }>().props;

    console.log(user_subscription);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-auto flex min-h-screen flex-col items-center justify-center p-4">
                <h1 className="bold text-5xl font-bold">Planos</h1>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {plans.map((plan) => {
                        const isActive = user_subscription && user_subscription.plan_id === plan.id;

                        return (
                            <li
                                key={plan.id.toString()}
                                className={`mt-10 flex flex-col justify-between gap-4 rounded-md py-5 ${isActive ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'}`}
                            >
                                <div>
                                    <h3 className="mx-5 mb-2 text-2xl font-semibold">
                                        {plan.name} - R${plan.price}
                                    </h3>

                                    <div className="mb-4 h-0.5 bg-gray-300 backdrop-blur-2xl" />

                                    <div className="mx-5 flex flex-col">
                                        <span className="my-2 font-medium">{plan.description}</span>
                                        <span className="flex justify-between">
                                            <span>Horas mesa: {plan.hours_desk}</span>
                                            <span>Horas sala: {plan.hours_room}</span>
                                        </span>

                                        <h3 className="mt-3 font-medium">Acessos:</h3>

                                        <div className="flex flex-col gap-2">
                                            {plan.rooms.map((room) => (
                                                <div key={room.id.toString()} className="flex flex-col">
                                                    <h2 className="font-semibold">{room.name}</h2>
                                                    <span>{room.description}</span>
                                                    <span>Capacidade: {room.capacity}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {isActive ? (
                                    <span className="rounded-md px-4 py-2 text-center font-semibold">Plano Ativo</span>
                                ) : (
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="mx-4 cursor-pointer rounded-sm bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">
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
                                                    <button className="rounded-sm bg-gray-300 px-4 py-2 font-semibold text-black hover:bg-gray-400">
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
                                                            className="rounded-sm bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
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
                            </li>
                        );
                    })}
                </ul>
            </div>
        </AppLayout>
    );
}
