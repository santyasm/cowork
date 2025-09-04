import { usePage } from '@inertiajs/react';

interface Room {
    id: number;
    name: string;
    type: string;
}

export default function Index() {
    const { rooms } = usePage<{ rooms: Room[] }>().props;

    return (
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
    );
}
