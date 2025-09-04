import { Form, usePage } from '@inertiajs/react';

interface Plan {
    id: number;
    name: string;
    price: number;
    description: string;
    hours_desk: number;
    hours_room: number;
}

export default function Index() {
    const { plans } = usePage<{ plans: Plan[] }>().props;

    return (
        <div className="m-auto flex min-h-screen flex-col items-center justify-center">
            <h1 className="bold text-5xl font-bold">Planos</h1>
            <ul className="flex flex-col">
                {plans.map((plan) => (
                    <li key={plan.id} className="mt-10 flex flex-col gap-4 rounded-md bg-gray-100 p-5 dark:bg-gray-700">
                        <div>
                            <h3 className="mb-4 text-2xl font-semibold">
                                {plan.id}: {plan.name} - R${plan.price} <br />
                            </h3>
                            {plan.description} <br />
                            Horas mesa: {plan.hours_desk} <br />
                            Horas sala: {plan.hours_room}
                        </div>

                        <Form action="/subscriptions" transform={(data) => ({ ...data, plan_id: plan.id })} disableWhileProcessing method="POST">
                            {({ processing, errors }) => (
                                <div className="flex flex-col gap-4">
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
    );
}
