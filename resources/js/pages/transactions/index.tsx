import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

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
    rented_server?: RentedServer | null;
}

interface PaginatedTransactions {
    data: Transaction[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

interface Props extends SharedData {
    transactions: PaginatedTransactions;
    [key: string]: unknown;
}

export default function TransactionsIndex() {
    const { transactions } = usePage<Props>().props;

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
            <Head title="Transaction History" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">📊 Transaction History</h1>
                    <Link
                        href={route('credits.index')}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        💳 Purchase Credits
                    </Link>
                </div>

                {transactions.data.length > 0 ? (
                    <>
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6 dark:bg-gray-800 dark:border-gray-700">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                                Transaction
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                                Related Server
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {transactions.data.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="text-2xl mr-3">
                                                            {getTypeIcon(transaction.type)}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                {transaction.description}
                                                            </div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                ID: {transaction.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="capitalize text-sm text-gray-900 dark:text-gray-100">
                                                        {transaction.type.replace('_', ' ')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`text-sm font-semibold ${getTypeColor(transaction.type)}`}>
                                                        {transaction.type === 'credit_purchase' ? '+' : '-'}
                                                        {transaction.amount.toFixed(2)}
                                                    </span>
                                                    <span className="text-xs text-gray-500 ml-1 dark:text-gray-400">credits</span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                    <div>
                                                        {new Date(transaction.created_at).toLocaleDateString()}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {new Date(transaction.created_at).toLocaleTimeString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {transaction.rented_server ? (
                                                        <div>
                                                            <Link
                                                                href={route('servers.show', transaction.rented_server.id)}
                                                                className="text-blue-600 hover:text-blue-900 font-medium"
                                                            >
                                                                {transaction.rented_server.name}
                                                            </Link>
                                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                                {transaction.rented_server.server_plan.name}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-gray-400 dark:text-gray-500">N/A</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link
                                                        href={route('transactions.show', transaction.id)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Pagination */}
                        {transactions.last_page > 1 && (
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Showing {transactions.from} to {transactions.to} of {transactions.total} transactions
                                </div>
                                <div className="flex gap-2">
                                    {transactions.prev_page_url && (
                                        <Link
                                            href={transactions.prev_page_url}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    <span className="px-4 py-2 text-sm">
                                        Page {transactions.current_page} of {transactions.last_page}
                                    </span>
                                    {transactions.next_page_url && (
                                        <Link
                                            href={transactions.next_page_url}
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📊</div>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">No transactions yet</h2>
                        <p className="text-gray-600 mb-8 dark:text-gray-400">
                            Start by purchasing credits or renting your first server!
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href={route('credits.index')}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                            >
                                💳 Purchase Credits
                            </Link>
                            <Link
                                href={route('servers.create')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                            >
                                🚀 Rent Server
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}