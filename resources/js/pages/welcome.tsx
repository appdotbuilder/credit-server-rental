import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="ServerRent - Rent Servers with Credits">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-6 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="text-2xl">🖥️</div>
                            <span className="text-xl font-bold">ServerRent</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="w-full max-w-6xl">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            🚀 Rent Servers Instantly with Credits
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto dark:text-gray-300">
                            Launch your applications on powerful VPS servers using our flexible credit system. 
                            Purchase credits, choose your configuration, and deploy in seconds.
                        </p>
                        {!auth.user && (
                            <div className="flex gap-4 justify-center">
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Start Renting Now 🎯
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-lg border border-gray-300 px-8 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Sign In
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">💳</div>
                            <h3 className="text-xl font-semibold mb-3">Credit System</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Purchase credits securely and use them to rent servers. Pay only for what you use with transparent hourly billing.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">⚡</div>
                            <h3 className="text-xl font-semibold mb-3">Instant Deployment</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Launch VPS servers instantly with various configurations. From basic development to enterprise-grade solutions.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">🎛️</div>
                            <h3 className="text-xl font-semibold mb-3">Full Control</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Start, stop, restart, and manage your servers with ease. Monitor usage and costs in real-time.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-semibold mb-3">Transaction History</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Track all your credit purchases and server rentals with detailed transaction history and receipts.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">🔒</div>
                            <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Integrated payment gateway for secure credit purchases. Multiple payment methods supported.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                            <div className="text-4xl mb-4">⚙️</div>
                            <h3 className="text-xl font-semibold mb-3">Multiple Plans</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Choose from Basic, Standard, Performance, and Enterprise VPS plans to match your needs and budget.
                            </p>
                        </div>
                    </div>

                    {/* Pricing Preview */}
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center dark:bg-gray-800 dark:border-gray-700">
                        <h2 className="text-3xl font-bold mb-6">💰 Simple, Transparent Pricing</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="border border-gray-200 rounded-lg p-6 dark:border-gray-600">
                                <h4 className="font-semibold text-lg mb-2">Basic VPS</h4>
                                <div className="text-2xl font-bold text-blue-600 mb-2">$0.015/hr</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">1 CPU • 1GB RAM • 20GB Storage</div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-6 dark:border-gray-600">
                                <h4 className="font-semibold text-lg mb-2">Standard VPS</h4>
                                <div className="text-2xl font-bold text-blue-600 mb-2">$0.030/hr</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">2 CPU • 2GB RAM • 50GB Storage</div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-6 dark:border-gray-600">
                                <h4 className="font-semibold text-lg mb-2">Performance VPS</h4>
                                <div className="text-2xl font-bold text-blue-600 mb-2">$0.119/hr</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">4 CPU • 8GB RAM • 160GB Storage</div>
                            </div>
                            <div className="border border-gray-200 rounded-lg p-6 dark:border-gray-600">
                                <h4 className="font-semibold text-lg mb-2">Enterprise VPS</h4>
                                <div className="text-2xl font-bold text-blue-600 mb-2">$0.238/hr</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">8 CPU • 16GB RAM • 320GB Storage</div>
                            </div>
                        </div>
                    </div>
                </main>

                <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                    Built with ❤️ using Laravel + React • Secure server rental platform
                </footer>
            </div>
        </>
    );
}