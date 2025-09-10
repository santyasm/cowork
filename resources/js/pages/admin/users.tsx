import { router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
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

type Props = {
    allUsers: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
};

const Users = ({ allUsers }: Props) => {
    const [filter, setFilter] = useState<'all' | 'active'>('all');
    const [search, setSearch] = useState('');

    const handlePageChange = (url: string | null) => {
        if (!url) return;
        router.get(url);
    };

    const handleSearchChange = (value: string) => {
        setSearch(value);
        router.get('/admin/users', { search: value, filter }, { preserveState: true });
    };

    const handleFilterChange = (value: 'all' | 'active') => {
        setFilter(value);
        router.get('/admin/users', { search, filter: value }, { preserveState: true });
    };

    const statusColors: Record<string, string> = {
        active: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100',
        expired: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100',
        cancelled: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100',
    };

    return (
        <AppLayout>
            <div className="flex-1 p-6">
                <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-gray-100">Usuários</h1>

                <div className="mb-6 flex flex-col items-start justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                        <Button variant={filter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterChange('all')}>
                            Todos
                        </Button>
                        <Button variant={filter === 'active' ? 'default' : 'outline'} size="sm" onClick={() => handleFilterChange('active')}>
                            Com assinatura Ativa
                        </Button>
                    </div>

                    <input
                        type="text"
                        placeholder="Buscar por nome ou email..."
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="w-3/4 rounded-md border border-gray-300 px-3 py-1 text-gray-900 lg:w-1/3 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {allUsers.data.map((user) => (
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

            <div className="mt-6 mb-6 flex flex-wrap justify-center gap-2">
                {allUsers.links.map((link, i) => (
                    <button
                        key={i}
                        disabled={!link.url}
                        onClick={() => handlePageChange(link.url)}
                        className={`rounded-lg border px-4 py-2 transition-colors duration-200 ${
                            link.active
                                ? 'border-blue-500 bg-blue-500 text-white dark:border-blue-600 dark:bg-blue-600 dark:text-white'
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''} `}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </AppLayout>
    );
};

export default Users;
