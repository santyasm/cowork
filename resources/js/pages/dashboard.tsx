import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

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

    const activeReservations = userActiveReservations.data;
    const nextReservation = activeReservations[0];

    return (
        <AppLayout>
            <div className="m-6 space-y-6">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                                        <span className="text-gray-500 dark:text-gray-400">
                                            {dayjs(reservation.start_time).format('DD/MM')} - {dayjs(reservation.start_time).format('HH:mm')}
                                        </span>
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
