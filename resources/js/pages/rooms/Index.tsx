import { DateTimePicker } from '@/components/ui/date-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Form, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
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
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const [hoursUsed, setHoursUsed] = useState<number>(1);

    const { rooms } = usePage<{ rooms: Room[] }>().props;
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;

    const [showSuccess, setShowSuccess] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Salas', href: '/plans' }];

    const formatDateForMySQL = (date: Date) => {
        const pad = (n: number) => String(n).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:00`;
    };

    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setHoursUsed(value);

        const numValue = parseInt(value);
        if (!isNaN(numValue) && startTime) {
            setEndTime(new Date(startTime.getTime() + numValue * 60 * 60 * 1000));
        }
    };

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
                                        className="aspect-video max-h-[10vh] w-full rounded-md object-cover md:max-h-[20vh]"
                                    />
                                    <p className="mt-3 text-gray-700 dark:text-gray-300">Capacidade: {room.capacity}</p>
                                    <p className="mt-2 text-gray-600 dark:text-gray-400">{room.description}</p>

                                    <Form
                                        action="/reservations"
                                        method="POST"
                                        transform={(data) => ({
                                            ...data,
                                            room_id: room.id,
                                            start_time: startTime ? formatDateForMySQL(startTime) : '',
                                            end_time: endTime ? formatDateForMySQL(endTime) : '',
                                        })}
                                        disableWhileProcessing
                                    >
                                        {({ processing, errors }) => (
                                            <div className="mt-6 flex flex-col gap-4">
                                                {/* Start Time Picker */}
                                                <div>
                                                    <label className="mb-1 block font-medium">Início da reserva</label>

                                                    <DateTimePicker
                                                        value={startTime}
                                                        onChange={(newDate) => {
                                                            setStartTime(newDate);
                                                            setEndTime(new Date(newDate.getTime() + hoursUsed * 60 * 60 * 1000));
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-1 block font-medium">Quantidade de horas</label>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        step={1}
                                                        value={hoursUsed}
                                                        onChange={handleHoursChange}
                                                        className="w-24 rounded-md border p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="mb-1 block font-medium">Fim da reserva</label>
                                                    <Button variant="outline" className="w-full text-left" disabled>
                                                        {endTime ? format(endTime, 'yyyy-MM-dd HH:mm') : '-'}
                                                    </Button>
                                                </div>

                                                <button
                                                    className="mt-2 w-full rounded-md bg-green-600 px-4 py-2 font-semibold text-white transition hover:bg-green-700"
                                                    type="submit"
                                                    disabled={processing || !startTime}
                                                >
                                                    {processing ? 'Aguarde...' : 'Confirmar Reserva'}
                                                </button>

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
