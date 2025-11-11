import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-4 sm:p-6 md:p-10 selection:bg-secondary/30 selection:text-foreground">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link
                            href={home()}
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="mb-1 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="h-8 w-8 sm:h-9 sm:w-9 fill-current text-primary" />
                            </div>
                            <span className="sr-only">{title}</span>
                        </Link>

                        <div className="space-y-2 text-center px-4">
                            <h1 className="font-serif text-xl sm:text-2xl font-bold text-foreground">{title}</h1>
                            <p className="text-center text-xs sm:text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
