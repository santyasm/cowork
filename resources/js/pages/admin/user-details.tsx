import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

interface Subscription {
    id: number;
    status: string;
    start_date: string;
    end_date: string;
    plan: {
        id: number;
        name: string;
        price: number;
    };
}

interface Reservation {
    id: number;
    status: string;
    start_time: string;
    end_time: string;
    hours_used: number;
    room: {
        id: number;
        name: string;
        capacity: number;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    subscriptions: Subscription[];
    reservations: Reservation[];
}

interface Props {
    user: User;
}

const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
    expired: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    canceled: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    pending: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
    completed: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

const formatDateTime = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const UserDetails = ({ user }: Props) => {
    const activeSubscription = user.subscriptions.find((s) => s.status === 'active');
    const subscriptionHistory = user.subscriptions.filter((s) => s.status !== 'active');

    return (
        <AppLayout>
            <div className="m-6 space-y-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Nome</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{user.name}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Email</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{user.email}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Data de Criação</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-semibold">{new Date(user.created_at).toLocaleDateString()}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-2 border-green-400 dark:border-green-700">
                    <CardHeader>
                        <CardTitle>Assinatura Ativa</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {activeSubscription ? (
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-semibold">
                                        {activeSubscription.plan.name} — R${activeSubscription.plan.price}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {activeSubscription.start_date} → {activeSubscription.end_date}
                                    </p>
                                </div>
                                <span
                                    className={`rounded-md px-2 py-1 text-xs font-semibold ${
                                        statusColors[activeSubscription.status] || 'bg-gray-200 text-gray-800'
                                    }`}
                                >
                                    {activeSubscription.status}
                                </span>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">Nenhuma assinatura ativa</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Histórico de Assinaturas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Plano</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Período</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Preço</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {subscriptionHistory.map((sub) => (
                                        <tr key={sub.id}>
                                            <td className="px-4 py-2">{sub.plan.name}</td>
                                            <td className="px-4 py-2">
                                                {formatDate(sub.start_date)} → {formatDate(sub.end_date)}
                                            </td>
                                            <td className="px-4 py-2">R${sub.plan.price}</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`rounded-md px-2 py-1 text-xs font-semibold ${
                                                        statusColors[sub.status] || 'bg-gray-200 text-gray-800'
                                                    }`}
                                                >
                                                    {sub.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Reservas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Sala</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Período</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Horas Usadas</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {user.reservations.map((res) => (
                                        <tr key={res.id}>
                                            <td className="px-4 py-2">{res.room.name}</td>
                                            <td className="px-4 py-2">
                                                {formatDateTime(res.start_time)} → {formatDateTime(res.end_time)}
                                            </td>
                                            <td className="px-4 py-2">{res.hours_used}h</td>
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`rounded-md px-2 py-1 text-xs font-semibold ${
                                                        statusColors[res.status] || 'bg-gray-200 text-gray-800'
                                                    }`}
                                                >
                                                    {res.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default UserDetails;
