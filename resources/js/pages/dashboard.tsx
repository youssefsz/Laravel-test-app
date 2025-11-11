import { Button } from '@/components/ui/button';
import { logout } from '@/routes';
import { Head, Link, router } from '@inertiajs/react';

export default function Dashboard() {
    const handleLogout = () => {
        router.post(logout().url);
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-semibold text-black">
                        Thank you for logging in
                    </h1>
                    <p className="mb-8 text-xl text-gray-600">
                        New features coming soon.
                    </p>
                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white"
                    >
                        Logout
                    </Button>
                </div>
            </div>
        </>
    );
}
