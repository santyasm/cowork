import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Form, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Room {
    id: number;
    name: string;
    type: string;
    description: string;
    capacity: number;
}

export default function Index() {
    const { rooms } = usePage<{ rooms: Room[] }>().props;
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;

    const [showSuccess, setShowSuccess] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Salas',
            href: '/plans',
        },
    ];

    const getNow = () => {
        const now = new Date();
        now.setSeconds(0, 0);
        return now;
    };

    const formatDateTimeLocal = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [startTime, setStartTime] = useState(() => {
        const plusTenMinutes = new Date(getNow().getTime() + 10 * 60 * 1000);
        return formatDateTimeLocal(plusTenMinutes);
    });

    const [endTime, setEndTime] = useState(() => {
        const plusOneHour = new Date(new Date(getNow().getTime() + 10 * 60 * 1000).getTime() + 60 * 60 * 1000);
        return formatDateTimeLocal(plusOneHour);
    });

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStart = new Date(e.target.value);
        setStartTime(e.target.value);

        const minEnd = new Date(newStart.getTime() + 60 * 60 * 1000);
        if (new Date(endTime) < minEnd) {
            setEndTime(formatDateTimeLocal(minEnd));
        }
    };

    const minEndTime = formatDateTimeLocal(new Date(new Date(startTime).getTime() + 60 * 60 * 1000));

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash?.success]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {showSuccess && (
                <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
                    <DialogContent className="flex flex-col items-center gap-3 text-center">
                        <CheckCircle2 className="text-green-600 duration-300 animate-in zoom-in" size={48} />
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-green-600">Sucesso!</DialogTitle>
                        </DialogHeader>
                        <p className="text-gray-600">{flash.success}</p>
                    </DialogContent>
                </Dialog>
            )}

            <div className="m-5">
                <h1 className="mb-6 text-3xl font-bold">Salas</h1>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="flex flex-col justify-between gap-6 rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-gray-900"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">{room.name}</h3>
                                <span className="text-sm text-gray-400">{room.type}</span>
                            </div>

                            {/* Imagem com zoom */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <img
                                        src={`/images/rooms/${room.id}.jpg`}
                                        alt={room.name}
                                        className="h-[220px] w-full cursor-pointer rounded-lg object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                                    />
                                </DialogTrigger>

                                <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold">{room.name}</DialogTitle>
                                    </DialogHeader>
                                    <img
                                        src={`/images/rooms/${room.id}.jpg`}
                                        alt={room.name}
                                        className="aspect-video w-full rounded-md object-cover"
                                    />
                                    <p className="mt-3 text-gray-700 dark:text-gray-300">Capacidade: {room.capacity}</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{room.description}</p>
                                </DialogContent>
                            </Dialog>

                            {/* Reserva */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="w-full rounded-md bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700">
                                        Reservar
                                    </button>
                                </DialogTrigger>

                                <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-2xl font-bold">{room.name}</DialogTitle>
                                    </DialogHeader>

                                    <img
                                        src={`/images/rooms/${room.id}.jpg`}
                                        alt={room.name}
                                        className="aspect-video w-full rounded-md object-cover"
                                    />

                                    <p className="mt-3 text-gray-700 dark:text-gray-300">Capacidade: {room.capacity}</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{room.description}</p>

                                    <Form
                                        action="/reservations"
                                        method="POST"
                                        transform={(data) => ({
                                            ...data,
                                            room_id: room.id,
                                            start_time: startTime,
                                            end_time: endTime,
                                        })}
                                        disableWhileProcessing
                                    >
                                        {({ processing, errors }) => (
                                            <div className="mt-6 flex flex-col gap-4">
                                                <div>
                                                    <label className="mb-1 block font-medium">Início da reserva</label>
                                                    <input
                                                        type="datetime-local"
                                                        name="start_time"
                                                        value={startTime}
                                                        min={formatDateTimeLocal(getNow())}
                                                        onChange={handleStartChange}
                                                        className="w-full rounded-md border p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-1 block font-medium">Fim da reserva</label>
                                                    <input
                                                        type="datetime-local"
                                                        name="end_time"
                                                        value={endTime}
                                                        min={minEndTime}
                                                        onChange={(e) => setEndTime(e.target.value)}
                                                        className="w-full rounded-md border p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                        required
                                                    />
                                                </div>

                                                <button
                                                    className="mt-2 w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    {processing ? 'Aguarde...' : 'Confirmar Reserva'}
                                                </button>

                                                {/* Erros */}
                                                {errors &&
                                                    Object.entries(errors).map(([field, messages]) =>
                                                        Array.isArray(messages) ? (
                                                            messages.map((msg, i) => (
                                                                <span key={`${field}-${i}`} className="text-sm font-medium text-red-600">
                                                                    {msg}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span key={field} className="text-sm font-medium text-red-600">
                                                                {messages}
                                                            </span>
                                                        ),
                                                    )}
                                            </div>
                                        )}
                                    </Form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
