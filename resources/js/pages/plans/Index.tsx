import { usePage } from '@inertiajs/react';

interface Plan {
    id: number;
    name: string;
    price: number;
}

export default function Index() {
    const { plans } = usePage<{ plans: Plan[] }>().props;

    return (
        <div>
            <h1>Planos</h1>
            <ul>
                {plans.map((plan) => (
                    <li key={plan.id}>
                        {plan.name} - R${plan.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
