import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { Form, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { CheckCircle2, MessageCircleWarning } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Room {
    id: number;
    name: string;
}

interface Reservation {
    data: {
        id: number;
        room: Room;
        start_time: string;
        end_time: string;
        status?: string;
    }[];
}

interface Subscription {
    status: string;
    plan: {
        id: number;
        name: string;
    };
    start_date: string;
    end_date: string;
    remaining_hours_room: number;
    remaining_hours_desk: number;
}
export default function Dashboard() {
    const { reservations, userActiveSubscription, userActiveReservations } = usePage<{
        reservations: Reservation;
        userActiveReservations: Reservation;
        userActiveSubscription: Subscription;
    }>().props;
    const { flash } = usePage<{ flash: { success?: string; error?: string } }>().props;
    const [showSuccess, setShowSuccess] = useState(false);
    const [errorDialog, setErrorDialog] = useState<{ [key: number]: string }>({});
    const [confirmDialog, setConfirmDialog] = useState<number | null>(null);

    const activeReservations = userActiveReservations.data;
    const nextReservation = activeReservations[0];

    useEffect(() => {
        if (flash?.success) {
            setShowSuccess(true);
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    return (
        <AppLayout>
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

            <div className="m-6 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Próxima reserva</h3>
                        {nextReservation ? (
                            <>
                                <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{nextReservation.room.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {dayjs(nextReservation.start_time).format('DD/MM')} - {dayjs(nextReservation.start_time).format('HH:mm')} às{' '}
                                    {dayjs(nextReservation.end_time).format('HH:mm')}
                                </p>
                            </>
                        ) : (
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Nenhuma reserva próxima</p>
                        )}
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Assinatura</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Plano: {userActiveSubscription?.plan.name}</p>

                        <p
                            className={`mt-2 text-lg font-semibold ${userActiveSubscription?.status === 'active' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                        >
                            {userActiveSubscription?.status === 'active' ? 'Ativa' : 'Inativa'}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {userActiveSubscription?.start_date ? `Expira em ${dayjs(userActiveSubscription?.end_date).format('DD/MM')}` : ''}
                        </p>
                    </div>

                    {/* Horas */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">Horas restantes</h3>
                        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                            <div className="flex-1 rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900">
                                <p className="text-sm font-medium text-blue-700 dark:text-blue-200">Mesa</p>
                                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    {userActiveSubscription?.remaining_hours_desk ?? 0}
                                </p>
                            </div>

                            <div className="flex-1 rounded-lg bg-green-50 p-4 text-center dark:bg-green-900">
                                <p className="text-sm font-medium text-green-700 dark:text-green-200">Sala</p>
                                <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    {userActiveSubscription?.remaining_hours_room ?? 0}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Próximas reservas */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Próximas reservas</h3>
                        <ul className="space-y-3 text-sm">
                            {activeReservations.length > 0 ? (
                                activeReservations.map((reservation) => (
                                    <li key={reservation.id} className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                        <span className="text-gray-900 dark:text-gray-100">{reservation.room.name}</span>

                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {dayjs(reservation.start_time).format('DD/MM')} - {dayjs(reservation.start_time).format('HH:mm')}
                                            </span>

                                            {/* Botão que abre dialog de confirmação */}
                                            <button type="button" onClick={() => setConfirmDialog(reservation.id)} className="hover:text-gray-400">
                                                Cancelar
                                            </button>

                                            <Dialog open={confirmDialog === reservation.id} onOpenChange={() => setConfirmDialog(null)}>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Confirmar cancelamento</DialogTitle>
                                                    </DialogHeader>
                                                    <p>
                                                        Tem certeza que deseja cancelar a reserva da sala <strong>{reservation.room.name}</strong>?
                                                    </p>

                                                    <div className="mt-4 flex justify-end gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => setConfirmDialog(null)}
                                                            className="rounded-md border px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                                        >
                                                            Voltar
                                                        </button>

                                                        <Form
                                                            action="/reservations/cancel"
                                                            method="PATCH"
                                                            transform={(data) => ({
                                                                ...data,
                                                                reservation_id: reservation.id,
                                                            })}
                                                        >
                                                            {({ errors }) => {
                                                                const firstError =
                                                                    errors && Object.values(errors)[0]
                                                                        ? Array.isArray(Object.values(errors)[0])
                                                                            ? (Object.values(errors)[0] as string[])[0]
                                                                            : (Object.values(errors)[0] as string)
                                                                        : null;

                                                                // eslint-disable-next-line react-hooks/rules-of-hooks
                                                                useEffect(() => {
                                                                    if (firstError) {
                                                                        setErrorDialog((prev) => ({
                                                                            ...prev,
                                                                            [reservation.id]: firstError,
                                                                        }));
                                                                    }
                                                                }, [firstError]);

                                                                return (
                                                                    <button
                                                                        type="submit"
                                                                        className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
                                                                    >
                                                                        Confirmar
                                                                    </button>
                                                                );
                                                            }}
                                                        </Form>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Dialog
                                                open={!!errorDialog[reservation.id]}
                                                onOpenChange={() => setErrorDialog((prev) => ({ ...prev, [reservation.id]: '' }))}
                                            >
                                                <DialogContent>
                                                    <MessageCircleWarning className="text-red-700 duration-300 animate-in zoom-in" size={40} />
                                                    <DialogHeader>
                                                        <DialogTitle>Erro ao cancelar</DialogTitle>
                                                    </DialogHeader>
                                                    <p>{errorDialog[reservation.id]}</p>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500 dark:text-gray-400">Nenhuma reserva ativa</li>
                            )}
                        </ul>
                    </div>

                    {/* Histórico */}
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Histórico de reservas</h3>
                        <ul className="space-y-3 text-sm">
                            {reservations.data.filter((reservation) => reservation.status === 'completed' || reservation.status === 'canceled')
                                .length > 0 ? (
                                reservations.data
                                    .filter((reservation) => reservation.status === 'completed' || reservation.status === 'canceled')
                                    .map((reservation) => (
                                        <li key={reservation.id} className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                                            <span className="text-gray-900 dark:text-gray-100">{reservation.room.name}</span>
                                            <span className="text-gray-500 dark:text-gray-400">
                                                {dayjs(reservation.start_time).format('DD/MM')} -{' '}
                                                {reservation.status === 'completed' ? 'Concluída' : 'Cancelada'}
                                            </span>
                                        </li>
                                    ))
                            ) : (
                                <li className="text-gray-500 dark:text-gray-400">Nenhuma reserva concluída ou cancelada</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
