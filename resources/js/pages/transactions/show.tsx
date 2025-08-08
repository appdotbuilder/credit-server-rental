import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface RentedServer {
    id: number;
    name: string;
    server_plan: {
        name: string;
    };
}

interface Transaction {
    id: number;
    type: string;
    amount: number;
    status: string;
    description: string;
    created_at: string;
    metadata: Record<string, unknown> | null;
    rented_server?: RentedServer | null;
}

interface Props extends SharedData {
    transaction: Transaction;
    [key: string]: unknown;
}

export default function ShowTransaction() {
    const { transaction } = usePage<Props>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Transactions',
            href: '/transactions',
        },
        {
            title: `Transaction #${transaction.id}`,
            href: `/transactions/${transaction.id}`,
        },
    ];

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'credit_purchase':
                return '💳';
            case 'server_rental':
                return '🖥️';
            case 'refund':
                return '↩️';
            default:
                return '📄';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'credit_purchase':
                return 'text-green-600';
            case 'server_rental':
                return 'text-red-600';
            case 'refund':
                return 'text-blue-600';
            default:
                return 'text-gray-600';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'failed':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Transaction #${transaction.id}`} />
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="text-4xl">{getTypeIcon(transaction.type)}</div>
                        <div>
                            <h1 className="text-3xl font-bold">Transaction #{transaction.id}</h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {transaction.description}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Amount</div>
                        <div className={`text-3xl font-bold ${getTypeColor(transaction.type)}`}>
                            {transaction.type === 'credit_purchase' ? '+' : '-'}
                            {transaction.amount.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Credits</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Transaction Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Transaction Details</h2>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-3 dark:text-gray-400">
                                        Basic Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Transaction ID:</span>
                                            <span className="font-mono">{transaction.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Type:</span>
                                            <span className="capitalize">{transaction.type.replace('_', ' ')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                {transaction.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Amount:</span>
                                            <span className={`font-semibold ${getTypeColor(transaction.type)}`}>
                                                {transaction.type === 'credit_purchase' ? '+' : '-'}
                                                {transaction.amount.toFixed(2)} credits
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-3 dark:text-gray-400">
                                        Timing
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Date:</span>
                                            <span>{new Date(transaction.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Time:</span>
                                            <span>{new Date(transaction.created_at).toLocaleTimeString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Timestamp:</span>
                                            <span className="font-mono text-sm">
                                                {new Date(transaction.created_at).toISOString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Related Server */}
                            {transaction.rented_server && (
                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-3 dark:text-gray-400">
                                        Related Server
                                    </h3>
                                    <div className="bg-blue-50 rounded-lg p-4 dark:bg-blue-900/20">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                                                    {transaction.rented_server.name}
                                                </h4>
                                                <p className="text-sm text-blue-700 dark:text-blue-300">
                                                    {transaction.rented_server.server_plan.name}
                                                </p>
                                            </div>
                                            <Link
                                                href={route('servers.show', transaction.rented_server.id)}
                                                className="text-blue-600 hover:text-blue-800 font-medium"
                                            >
                                                View Server →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Metadata */}
                            {transaction.metadata && Object.keys(transaction.metadata).length > 0 && (
                                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-3 dark:text-gray-400">
                                        Additional Information
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
                                        <pre className="text-sm font-mono overflow-x-auto">
                                            {JSON.stringify(transaction.metadata, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Actions Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Actions</h2>
                            <div className="space-y-3">
                                <Link
                                    href={route('transactions.index')}
                                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                                >
                                    ← Back to Transactions
                                </Link>
                                
                                {transaction.type === 'credit_purchase' && transaction.status === 'completed' && (
                                    <Link
                                        href={route('servers.create')}
                                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                                    >
                                        🚀 Rent a Server
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Transaction Summary */}
                        <div className="bg-gray-50 rounded-lg p-4 mt-6 dark:bg-gray-700">
                            <h3 className="font-semibold mb-2">💡 Transaction Summary</h3>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {transaction.type === 'credit_purchase' && (
                                    <p>You purchased {transaction.amount.toFixed(2)} credits for your account.</p>
                                )}
                                {transaction.type === 'server_rental' && (
                                    <p>Credits were deducted for server rental usage.</p>
                                )}
                                {transaction.type === 'refund' && (
                                    <p>Credits were refunded to your account.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}