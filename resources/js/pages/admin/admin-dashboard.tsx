import { BreadcrumbItem } from '@/types';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AppLayout from '../../layouts/app-layout';

type Reservation = {
    id: number;
    status: 'active' | 'canceled' | 'completed';
    room: { name: string };
    start_time: string;
    end_time: string;
};

type Props = {
    allReservations: Reservation[];
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Reservas',
        href: '/admin/dashboard',
    },
];

const COLORS = ['#4ade80', '#60a5fa', '#f87171'];

const AdminDashboard = ({ allReservations }: Props) => {
    const stats = {
        active: allReservations.filter((r) => r.status === 'active').length,
        canceled: allReservations.filter((r) => r.status === 'canceled').length,
        completed: allReservations.filter((r) => r.status === 'completed').length,
    };

    const pieData = [
        { name: 'Ativas', value: stats.active },
        { name: 'Concluídas', value: stats.completed },
        { name: 'Canceladas', value: stats.canceled },
    ];

    const barData = [
        { name: 'Ativas', value: stats.active },
        { name: 'Concluídas', value: stats.completed },
        { name: 'Canceladas', value: stats.canceled },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            {/* Cards */}
            <div className="m-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-green-500 bg-white p-6 shadow-lg dark:bg-slate-900">
                    <h2 className="text-lg font-medium tracking-tight">Reservas Ativas</h2>
                    <p className="mt-3 text-4xl font-bold">{stats.active}</p>
                </div>
                <div className="rounded-2xl border border-blue-500 bg-white p-6 shadow-lg dark:bg-slate-900">
                    <h2 className="text-lg font-medium tracking-tight">Reservas Concluídas</h2>
                    <p className="mt-3 text-4xl font-bold">{stats.completed}</p>
                </div>
                <div className="rounded-2xl border border-red-500 bg-white p-6 shadow-lg dark:bg-slate-900">
                    <h2 className="text-lg font-medium tracking-tight">Reservas Canceladas</h2>
                    <p className="mt-3 text-4xl font-bold">{stats.canceled}</p>
                </div>
            </div>

            {/* Gráficos */}
            <div className="m-6 mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
                    <h2 className="mb-6 text-lg font-semibold text-slate-800 dark:text-slate-100">Distribuição de Reservas</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                                {pieData.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '0.5rem', border: 'none' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-900">
                    <h2 className="mb-6 text-lg font-semibold text-slate-800 dark:text-slate-100">Visão Geral</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ borderRadius: '0.5rem', border: 'none' }} />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AppLayout>
    );
};

export default AdminDashboard;
