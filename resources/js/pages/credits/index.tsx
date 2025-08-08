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
        title: 'Credits',
        href: '/credits',
    },
];

interface UserCredit {
    balance: number;
}

interface Props extends SharedData {
    userCredit: UserCredit | null;
    [key: string]: unknown;
}



export default function CreditsIndex() {
    const { userCredit } = usePage<Props>().props;
    const balance = userCredit?.balance || 0;

    const { data, setData, post, processing, errors } = useForm({
        amount: 10,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('credits.store'));
    };

    const quickAmounts = [5, 10, 25, 50, 100, 200];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Purchase Credits" />
            <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">💳 Purchase Credits</h1>
                    <div className="text-right">
                        <div className="text-sm text-gray-600 dark:text-gray-400">Current Balance</div>
                        <div className="text-3xl font-bold text-green-600">{balance.toFixed(2)} Credits</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Purchase Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="text-xl font-semibold mb-6">Add Credits to Account</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
                                        Amount (Credits)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="1000"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={e => setData('amount', parseFloat(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                                        required
                                    />
                                    {errors.amount && (
                                        <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
                                    )}
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 dark:bg-gray-700">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Credits:</span>
                                        <span className="font-medium">{data.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-600 dark:text-gray-400">Cost (1:1 ratio):</span>
                                        <span className="font-medium">${data.amount.toFixed(2)}</span>
                                    </div>
                                    <hr className="my-2 border-gray-300 dark:border-gray-600" />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total:</span>
                                        <span>${data.amount.toFixed(2)}</span>
                                    </div>
                                </div>

                                {errors.amount && errors.amount.includes('payment') && (
                                    <div className="bg-red-50 rounded-lg p-4 dark:bg-red-900/20">
                                        <p className="text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing || data.amount <= 0}
                                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                >
                                    {processing ? 'Processing Payment...' : '💳 Purchase Credits'}
                                </button>

                                <p className="text-xs text-gray-500 text-center dark:text-gray-400">
                                    🔒 Secure payment processing • Mock payment for demo
                                </p>
                            </form>
                        </div>
                    </div>

                    {/* Quick Purchase Options */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xl font-semibold mb-6">Quick Purchase Options</h2>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-8">
                            {quickAmounts.map((amount) => (
                                <button
                                    key={amount}
                                    onClick={() => setData('amount', amount)}
                                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                                        data.amount === amount
                                            ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                                            : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800'
                                    }`}
                                >
                                    <div className="text-2xl font-bold">{amount}</div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">Credits</div>
                                    <div className="text-sm font-medium text-green-600">${amount}.00</div>
                                </button>
                            ))}
                        </div>

                        {/* Credit Usage Guide */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="text-lg font-semibold mb-4">💡 How Credits Work</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">⚡</span>
                                    <div>
                                        <h4 className="font-medium">Pay-as-you-go</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Credits are deducted hourly based on server usage. No upfront commitments.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">🔄</span>
                                    <div>
                                        <h4 className="font-medium">Auto-scaling billing</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Only pay when servers are running. Stopped servers don't consume credits.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl">📊</span>
                                    <div>
                                        <h4 className="font-medium">Transparent pricing</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Track usage and costs in real-time. View detailed transaction history.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Server Cost Examples */}
                        <div className="bg-blue-50 rounded-lg p-6 mt-6 dark:bg-blue-900/20">
                            <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">
                                💰 Server Cost Examples
                            </h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Basic VPS</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        $0.015/hour • ~$11/month for 24/7 usage
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Performance VPS</h4>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        $0.119/hour • ~$86/month for 24/7 usage
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}