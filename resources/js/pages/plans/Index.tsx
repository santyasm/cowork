import { usePage } from '@inertiajs/react';

export default function Index() {
    const { plans } = usePage().props;

    return (
        <div>
            <h1>Planos</h1>
            <ul>
                {plans?.map((plan) => (
                    <li key={plan.id}>
                        {plan.name} - R${plan.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}
