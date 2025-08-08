import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props extends SharedData {
    userCredit?: {
        balance: number;
    };
    recentServers?: Array<{
        id: number;
        name: string;
        status: string;
        server_plan: {
            name: string;
        };
    }>;
    recentTransactions?: Array<{
        id: number;
        type: string;
        amount: number;
        description: string;
        created_at: string;
    }>;
    [key: string]: unknown;
}

export default function Dashboard() {
    const { auth, userCredit, recentServers = [], recentTransactions = [] } = usePage<Props>().props;
    const balance = userCredit?.balance || 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">🖥️ Server Dashboard</h1>
                    <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Account Balance</div>
                        <div className="text-2xl font-bold text-green-600">{balance.toFixed(2)} Credits</div>
                    </div>
                </div>

                <div className="mb-8">
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Welcome back, <span className="font-semibold">{auth.user.name}</span>! 
                        Ready to manage your servers? 🚀
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <Link
                        href={route('servers.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 text-center transition-colors group"
                    >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🚀</div>
                        <div className="font-semibold">Rent New Server</div>
                        <div className="text-sm opacity-90">Deploy instantly</div>
                    </Link>

                    <Link
                        href={route('credits.index')}
                        className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-6 text-center transition-colors group"
                    >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">💳</div>
                        <div className="font-semibold">Buy Credits</div>
                        <div className="text-sm opacity-90">Add funds</div>
                    </Link>

                    <Link
                        href={route('servers.index')}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-6 text-center transition-colors group"
                    >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖥️</div>
                        <div className="font-semibold">My Servers</div>
                        <div className="text-sm opacity-90">Manage all</div>
                    </Link>

                    <Link
                        href={route('transactions.index')}
                        className="bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-6 text-center transition-colors group"
                    >
                        <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                        <div className="font-semibold">Transactions</div>
                        <div className="text-sm opacity-90">View history</div>
                    </Link>
                </div>

                {/* Recent Activity */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Servers */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">🖥️ Recent Servers</h2>
                            <Link
                                href={route('servers.index')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                View all →
                            </Link>
                        </div>
                        {recentServers.length > 0 ? (
                            <div className="space-y-3">
                                {recentServers.slice(0, 5).map((server) => (
                                    <div key={server.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 dark:border-gray-600">
                                        <div>
                                            <div className="font-medium">{server.name}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{server.server_plan.name}</div>
                                        </div>
                                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            server.status === 'running' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                            server.status === 'stopped' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                        }`}>
                                            {server.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center py-8 dark:text-gray-400">
                                <div className="text-4xl mb-2">🚀</div>
                                <p>No servers rented yet</p>
                                <Link
                                    href={route('servers.create')}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Rent your first server
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Recent Transactions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">📊 Recent Transactions</h2>
                            <Link
                                href={route('transactions.index')}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                View all →
                            </Link>
                        </div>
                        {recentTransactions.length > 0 ? (
                            <div className="space-y-3">
                                {recentTransactions.slice(0, 5).map((transaction) => (
                                    <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 dark:border-gray-600">
                                        <div>
                                            <div className="font-medium">{transaction.description}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(transaction.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className={`font-semibold ${
                                            transaction.type === 'credit_purchase' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {transaction.type === 'credit_purchase' ? '+' : '-'}{transaction.amount.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500 text-center py-8 dark:text-gray-400">
                                <div className="text-4xl mb-2">💳</div>
                                <p>No transactions yet</p>
                                <Link
                                    href={route('credits.index')}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Purchase your first credits
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}