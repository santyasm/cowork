import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from '@inertiajs/react';

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

interface Props {
    plans: Plan[];
}

export function PricesSection({ plans }: Props) {
    return (
        <section className="my-20 flex min-h-screen w-full items-center justify-center px-6 md:px-12 lg:px-20 dark:bg-[#0a0a0a]" id="prices">
            <div className="w-full max-w-7xl text-center">
                <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Planos e Preços</h2>

                <p className="mb-20 text-sm tracking-tight text-gray-900 dark:text-gray-400">
                    Encontre o plano perfeito para gerenciar seu coworking com simplicidade e eficiência.
                </p>

                <div className="grid gap-8 md:grid-cols-3">
                    {plans.map((plan, i) => (
                        <div
                            key={i}
                            className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900"
                        >
                            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                R${plan.price} <span className="text-base font-normal text-gray-600 dark:text-gray-400">/mês</span>
                            </p>
                            <div className="flex justify-center gap-6 font-medium text-gray-700 dark:text-gray-300">
                                <span>{plan.hours_desk}h de mesa</span>
                                <span>{plan.hours_room}h de sala</span>
                            </div>
                            <h4 className="mt-4 text-start font-medium text-gray-900 dark:text-gray-100">Com esse plano você tem acesso a:</h4>{' '}
                            <ul className="flex-1 space-y-2 text-gray-600 dark:text-gray-400">
                                {plan.rooms.map((room, idx) => (
                                    <li key={idx} className="flex flex-col gap-6 text-start">
                                        • {room.name}
                                        {/* Dialog Trigger */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <img
                                                    src={`/images/rooms/${room.id}.jpg`}
                                                    alt={room.name}
                                                    className="h-20 w-[100%] rounded-md object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                                />
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                                <DialogHeader>
                                                    <DialogTitle>{room.name}</DialogTitle>
                                                </DialogHeader>
                                                <p>{room.description}</p>
                                                <img src={`/images/rooms/${room.id}.jpg`} className="w-[100%]mt-4 rounded-md object-cover" alt="" />

                                                <p className="font-medium">Capacidade: {room.capacity} pessoas</p>
                                            </DialogContent>
                                        </Dialog>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/plans">
                                <Button className="mt-4 w-full bg-green-500 font-semibold text-white hover:bg-green-400">Assinar</Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
