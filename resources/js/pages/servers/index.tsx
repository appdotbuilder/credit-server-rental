import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'My Servers',
        href: '/servers',
    },
];

interface ServerPlan {
    id: number;
    name: string;
    cpu: number;
    ram: number;
    storage: number;
    hourly_cost: number;
}

interface Server {
    id: number;
    name: string;
    server_ip: string | null;
    status: string;
    started_at: string | null;
    total_cost: number;
    server_plan: ServerPlan;
}

interface Props extends SharedData {
    servers: Server[];
    [key: string]: unknown;
}

export default function ServersIndex() {
    const { servers } = usePage<Props>().props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'running':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'stopped':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'starting':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'terminated':
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Servers" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">🖥️ My Servers</h1>
                    <Link
                        href={route('servers.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                        🚀 Rent New Server
                    </Link>
                </div>

                {servers.length > 0 ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Server
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Plan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            IP Address
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Total Cost
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-300">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    {servers.map((server) => (
                                        <tr key={server.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                        {server.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        ID: {server.id}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900 dark:text-gray-100">
                                                    {server.server_plan.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {server.server_plan.cpu} CPU • {server.server_plan.ram}GB RAM • {server.server_plan.storage}GB
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {server.server_ip || 'Not assigned'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 text-xs font-semibold rounded-full ${getStatusColor(server.status)}`}>
                                                    {server.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                                                {server.total_cost.toFixed(2)} credits
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    href={route('servers.show', server.id)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Manage
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🖥️</div>
                        <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100">No servers yet</h2>
                        <p className="text-gray-600 mb-8 dark:text-gray-400">
                            Rent your first server to get started with your hosting journey!
                        </p>
                        <Link
                            href={route('servers.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                        >
                            🚀 Rent Your First Server
                        </Link>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}