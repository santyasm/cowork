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

    const [startTime, setStartTime] = useState(() => formatDateTimeLocal(getNow()));
    const [endTime, setEndTime] = useState(() => {
        const plusOneHour = new Date(getNow().getTime() + 60 * 60 * 1000);
        return formatDateTimeLocal(plusOneHour);
    });

    const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStart = new Date(e.target.value);
        setStartTime(e.target.value);

        // recalcula end se ele ficar inválido
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
                    <DialogContent>
                        <CheckCircle2 className="text-green-600 duration-300 animate-in zoom-in" size={40} />
                        <DialogHeader>
                            <DialogTitle>Sucesso!</DialogTitle>
                        </DialogHeader>

                        <p>{flash.success}</p>
                    </DialogContent>
                </Dialog>
            )}
            <div className="m-5">
                <h1 className="mb-4 text-2xl font-semibold">Salas</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {rooms.map((room) => (
                        <div key={room.id} className="flex flex-col justify-between gap-6 rounded-md border p-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">{room.name} </h3>

                                <span className="text-gray-300">{room.type}</span>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <img
                                        src={`/images/rooms/${room.id}.jpg`}
                                        alt=""
                                        className="h-[200px] w-full cursor-pointer rounded-md object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                                    />
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{room.name}</DialogTitle>
                                    </DialogHeader>

                                    <img
                                        src={`/images/rooms/${room.id}.jpg`}
                                        alt=""
                                        className="aspect-video h-[300px] w-auto bg-amber-100 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <p>Capacidade: {room.capacity}</p>
                                    <p className="mt-2 text-gray-600">{room.description}</p>
                                </DialogContent>
                            </Dialog>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <button
                                        className="cursor-pointer rounded-sm bg-green-600 p-1 px-4 font-medium text-white hover:bg-green-700"
                                        type="submit"
                                    >
                                        {'Reservar'}
                                    </button>
                                </DialogTrigger>

                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>{room.name}</DialogTitle>
                                    </DialogHeader>

                                    <img
                                        src={`/images/rooms/${room.id}.jpg`}
                                        alt=""
                                        className="aspect-video h-[300px] w-auto bg-amber-100 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <p>Capacidade: {room.capacity}</p>
                                    <p className="mt-2 text-gray-600">{room.description}</p>

                                    <Form
                                        action="/reservations"
                                        method="POST"
                                        transform={(data) => ({ ...data, room_id: room.id, start_time: startTime, end_time: endTime })}
                                        disableWhileProcessing
                                    >
                                        {({ processing, errors }) => (
                                            <div className="mt-4 flex flex-col gap-2">
                                                <label className="font-medium">Início da reserva</label>
                                                <input
                                                    type="datetime-local"
                                                    name="start_time"
                                                    value={startTime}
                                                    min={formatDateTimeLocal(getNow())}
                                                    onChange={handleStartChange}
                                                    className="rounded-md border p-2"
                                                    required
                                                />

                                                <label className="mt-2 font-medium">Fim da reserva</label>
                                                <input
                                                    type="datetime-local"
                                                    name="end_time"
                                                    value={endTime}
                                                    min={minEndTime}
                                                    onChange={(e) => setEndTime(e.target.value)}
                                                    className="rounded-md border p-2"
                                                    required
                                                />

                                                <button
                                                    className="mt-4 cursor-pointer rounded-sm bg-green-600 p-1 px-4 font-medium text-white hover:bg-green-700"
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    {processing ? 'Aguarde...' : 'Reservar'}
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
                                </DialogContent>
                            </Dialog>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
