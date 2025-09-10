import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AppLayout from '../../layouts/app-layout';

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

interface User {
    id: number;
    name: string;
    email: string;
    subscriptions: Subscription[];
}

const Users = () => {
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAllUsers = async () => {
        try {
            const { data } = await axios.get('/api/users');
            setAllUsers(data);
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
            setError('Não foi possível carregar os dados dos usuários.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'cancelled'>('all');
    const [search, setSearch] = useState('');

    const statusColors: Record<string, string> = {
        active: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
        expired: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    };

    const filteredUsers = allUsers.filter((user: User) => {
        if (filter !== 'all') {
            const hasStatus = user.subscriptions.some((sub) => sub.status === filter);
            if (!hasStatus) return false;
        }

        const searchLower = search.toLowerCase();
        if (user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower)) {
            return true;
        }

        return false;
    });

    if (loading) {
        return (
            <AppLayout>
                <div className="flex justify-center p-8">Carregando...</div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <div className="flex justify-center p-8 text-red-500">{error}</div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="p-6">
                <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Usuários</h1>

                <div className="mb-6 flex flex-col items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('all')}>
                            Todos
                        </Button>
                        <Button variant={filter === 'active' ? 'default' : 'outline'} size="sm" onClick={() => setFilter('active')}>
                            Com assinatura Ativa
                        </Button>
                    </div>

                    <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-3/4 rounded-md border border-gray-300 px-3 py-1 text-gray-900 lg:w-1/3 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-md dark:bg-gray-800">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{user.name}</h2>
                                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>

                                <div className="mt-3">
                                    <h3 className="font-medium text-gray-700 dark:text-gray-200">Assinaturas:</h3>
                                    {user.subscriptions.length > 0 ? (
                                        <ul className="mt-1 space-y-1">
                                            {user.subscriptions
                                                .filter((sub) => sub.status === 'active')
                                                .map((sub) => (
                                                    <li key={sub.id} className="flex items-center gap-2">
                                                        <span
                                                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColors[sub.status]}`}
                                                        >
                                                            {sub.status}
                                                        </span>
                                                        <span className="text-sm text-gray-600 dark:text-gray-300">{sub.plan.name}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    ) : (
                                        <span className="text-sm text-gray-500 dark:text-gray-400">Nenhuma</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm">
                                    Editar
                                </Button>
                                <Button variant="destructive" size="sm">
                                    Deletar
                                </Button>
                                <Button variant="ghost" size="sm">
                                    Detalhes
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Users;
