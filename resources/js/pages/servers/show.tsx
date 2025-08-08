import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';

interface ServerPlan {
    id: number;
    name: string;
    description: string;
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
    stopped_at: string | null;
    terminated_at: string | null;
    total_cost: number;
    server_plan: ServerPlan;
}

interface Props extends SharedData {
    server: Server;
    [key: string]: unknown;
}

export default function ShowServer() {
    const { server } = usePage<Props>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'My Servers',
            href: '/servers',
        },
        {
            title: server.name,
            href: `/servers/${server.id}`,
        },
    ];

    const handleAction = (action: string) => {
        router.patch(route('servers.update', server.id), 
            { action },
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    const handleTerminate = () => {
        if (confirm('Are you sure you want to terminate this server? This action cannot be undone.')) {
            router.delete(route('servers.destroy', server.id));
        }
    };

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

    const canStart = server.status === 'stopped';
    const canStop = server.status === 'running';
    const canRestart = ['running', 'stopped'].includes(server.status);
    const canTerminate = !['terminated'].includes(server.status);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Server: ${server.name}`} />
            <div className="p-6">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">🖥️ {server.name}</h1>
                        <div className="flex items-center gap-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(server.status)}`}>
                                {server.status}
                            </span>
                            <span className="text-gray-600 dark:text-gray-400">
                                ID: {server.id}
                            </span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Total Cost</div>
                        <div className="text-2xl font-bold text-red-600">{server.total_cost.toFixed(2)} Credits</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Server Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Basic Info */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Server Information</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-2 dark:text-gray-400">
                                        Server Details
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Name:</span>
                                            <span className="font-medium">{server.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">IP Address:</span>
                                            <span className="font-mono">{server.server_ip || 'Not assigned'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(server.status)}`}>
                                                {server.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500 uppercase mb-2 dark:text-gray-400">
                                        Timestamps
                                    </h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Started:</span>
                                            <span className="text-sm">
                                                {server.started_at 
                                                    ? new Date(server.started_at).toLocaleString()
                                                    : 'Never'
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Stopped:</span>
                                            <span className="text-sm">
                                                {server.stopped_at 
                                                    ? new Date(server.stopped_at).toLocaleString()
                                                    : 'Never'
                                                }
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 dark:text-gray-400">Terminated:</span>
                                            <span className="text-sm">
                                                {server.terminated_at 
                                                    ? new Date(server.terminated_at).toLocaleString()
                                                    : 'Never'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Plan Details */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Server Plan: {server.server_plan.name}</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🖥️</div>
                                    <div className="text-2xl font-bold">{server.server_plan.cpu}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        CPU Core{server.server_plan.cpu > 1 ? 's' : ''}
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🧠</div>
                                    <div className="text-2xl font-bold">{server.server_plan.ram}GB</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">RAM</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl mb-2">💾</div>
                                    <div className="text-2xl font-bold">{server.server_plan.storage}GB</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">SSD Storage</div>
                                </div>
                            </div>
                            <div className="mt-6 text-center">
                                <div className="text-sm text-gray-600 dark:text-gray-400">Hourly Cost</div>
                                <div className="text-xl font-bold text-blue-600">
                                    ${server.server_plan.hourly_cost.toFixed(4)} per hour
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Server Actions</h2>
                            <div className="space-y-3">
                                <button
                                    onClick={() => handleAction('start')}
                                    disabled={!canStart}
                                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                        canStart
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                                    }`}
                                >
                                    ▶️ Start Server
                                </button>
                                
                                <button
                                    onClick={() => handleAction('stop')}
                                    disabled={!canStop}
                                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                        canStop
                                            ? 'bg-red-600 hover:bg-red-700 text-white'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                                    }`}
                                >
                                    ⏹️ Stop Server
                                </button>
                                
                                <button
                                    onClick={() => handleAction('restart')}
                                    disabled={!canRestart}
                                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                        canRestart
                                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                                    }`}
                                >
                                    🔄 Restart Server
                                </button>
                                
                                <div className="border-t pt-3 mt-6">
                                    <button
                                        onClick={handleTerminate}
                                        disabled={!canTerminate}
                                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                                            canTerminate
                                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                                        }`}
                                    >
                                        🗑️ Terminate Server
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2 dark:text-gray-400">
                                        This action cannot be undone
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Cost Information */}
                        <div className="bg-yellow-50 rounded-lg p-4 mt-6 dark:bg-yellow-900/20">
                            <h3 className="font-semibold text-yellow-800 mb-2 dark:text-yellow-200">
                                💰 Billing Information
                            </h3>
                            <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                This server costs <strong>${server.server_plan.hourly_cost.toFixed(4)}</strong> per hour when running.
                            </p>
                            <p className="text-sm text-yellow-700 mt-1 dark:text-yellow-300">
                                Total spent: <strong>{server.total_cost.toFixed(2)} credits</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}