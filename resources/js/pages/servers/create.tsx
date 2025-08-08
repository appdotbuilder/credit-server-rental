import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';

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
        title: 'Rent New Server',
        href: '/servers/create',
    },
];

interface ServerPlan {
    id: number;
    name: string;
    description: string;
    cpu: number;
    ram: number;
    storage: number;
    hourly_cost: number;
}

interface UserCredit {
    balance: number;
}

interface Props extends SharedData {
    plans: ServerPlan[];
    userCredit: UserCredit | null;
    [key: string]: unknown;
}



export default function CreateServer() {
    const { plans, userCredit } = usePage<Props>().props;
    const balance = userCredit?.balance || 0;

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        server_plan_id: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('servers.store'));
    };

    const selectedPlan = plans.find(plan => plan.id === data.server_plan_id);
    const canAfford = selectedPlan ? balance >= selectedPlan.hourly_cost : false;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rent New Server" />
            <div className="p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">🚀 Rent New Server</h1>
                    <div className="flex items-center gap-4">
                        <div className="text-gray-600 dark:text-gray-400">
                            Current Balance:
                        </div>
                        <div className="text-2xl font-bold text-green-600">
                            {balance.toFixed(2)} Credits
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Server Configuration Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Server Configuration</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                        Server Name
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="My Awesome Server"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                {selectedPlan && (
                                    <div className="bg-blue-50 rounded-lg p-4 dark:bg-blue-900/20">
                                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                                            Selected: {selectedPlan.name}
                                        </h3>
                                        <p className="text-sm text-blue-700 mt-1 dark:text-blue-300">
                                            {selectedPlan.cpu} CPU • {selectedPlan.ram}GB RAM • {selectedPlan.storage}GB Storage
                                        </p>
                                        <p className="text-sm font-medium text-blue-900 mt-2 dark:text-blue-100">
                                            ${selectedPlan.hourly_cost.toFixed(4)} per hour
                                        </p>
                                        {!canAfford && (
                                            <p className="text-sm text-red-600 mt-2 dark:text-red-400">
                                                ⚠️ Insufficient credits for this plan
                                            </p>
                                        )}
                                    </div>
                                )}

                                {errors.server_plan_id && errors.server_plan_id.includes('credits') && (
                                    <div className="bg-red-50 rounded-lg p-4 dark:bg-red-900/20">
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.server_plan_id}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing || data.server_plan_id === 0 || !canAfford}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                >
                                    {processing ? 'Creating Server...' : '🖥️ Rent Server Now'}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Server Plans */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-6">Choose Your Server Plan</h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            {plans.map((plan) => {
                                const canAffordPlan = balance >= plan.hourly_cost;
                                const isSelected = data.server_plan_id === plan.id;
                                
                                return (
                                    <div
                                        key={plan.id}
                                        onClick={() => setData('server_plan_id', plan.id)}
                                        className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
                                            isSelected
                                                ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                                                : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800'
                                        } ${
                                            !canAffordPlan ? 'opacity-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-semibold">{plan.name}</h3>
                                                {!canAffordPlan && (
                                                    <span className="text-sm text-red-600 dark:text-red-400">
                                                        Insufficient credits
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-blue-600">
                                                    ${plan.hourly_cost.toFixed(4)}/hr
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    ~${(plan.hourly_cost * 24 * 30).toFixed(2)}/month
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 mb-4 dark:text-gray-400">
                                            {plan.description}
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">🖥️ CPU:</span>
                                                <span className="text-sm">{plan.cpu} Core{plan.cpu > 1 ? 's' : ''}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">🧠 RAM:</span>
                                                <span className="text-sm">{plan.ram}GB</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">💾 Storage:</span>
                                                <span className="text-sm">{plan.storage}GB SSD</span>
                                            </div>
                                        </div>
                                        
                                        {isSelected && (
                                            <div className="mt-4 text-center">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    ✓ Selected
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}