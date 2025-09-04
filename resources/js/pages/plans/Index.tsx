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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Planos',
        href: '/plans',
    },
];

export default function Index() {
    const { plans } = usePage<{ plans: Plan[] }>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="m-auto flex min-h-screen flex-col items-center justify-center p-4">
                <h1 className="bold text-5xl font-bold">Planos</h1>
                <ul className="grid grid-cols-2 gap-6">
                    {plans.map((plan) => (
                        <li
                            key={plan.id.toString()}
                            className="mt-10 flex flex-col justify-between gap-4 rounded-md bg-gray-100 py-5 dark:bg-gray-700"
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

                            <Form action="/subscriptions" transform={(data) => ({ ...data, plan_id: plan.id })} disableWhileProcessing method="POST">
                                {({ processing, errors }) => (
                                    <div className="mx-5 flex flex-col gap-4">
                                        <button
                                            className="cursor-pointer rounded-sm bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700"
                                            type="submit"
                                        >
                                            {processing ? 'Aguarde...' : 'Assinar'}
                                        </button>

                                        {errors &&
                                            Object.entries(errors).map(([field, messages]) =>
                                                Array.isArray(messages) ? (
                                                    messages.map((msg, i) => (
                                                        <span key={`${field}-${i}`} className="text-md font-medium text-red-600">
                                                            {msg}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span key={field} className="text-md font-medium text-red-600">
                                                        {messages}
                                                    </span>
                                                ),
                                            )}
                                    </div>
                                )}
                            </Form>
                        </li>
                    ))}
                </ul>
            </div>
        </AppLayout>
    );
}
