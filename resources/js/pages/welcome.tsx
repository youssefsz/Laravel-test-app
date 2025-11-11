import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Book, Database, FileCode, Menu, X, Package, Server, Settings, Terminal } from 'lucide-react';
import { useState } from 'react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Head title="Welcome to Laravel Demo App" />
            <div className="min-h-screen bg-background selection:bg-secondary/30 selection:text-foreground">
                {/* Header Navigation */}
                <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <FileCode className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                                <h1 className="font-serif text-base sm:text-xl font-bold text-foreground">Laravel Demo App</h1>
                            </div>
                            
                            {/* Desktop Navigation */}
                            <nav className="hidden sm:flex items-center gap-3">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                            className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-all"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all"
                                    >
                                        Register
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="sm:hidden rounded-md p-2 text-foreground hover:bg-muted transition-colors"
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        {mobileMenuOpen && (
                            <div className="sm:hidden py-4 border-t border-border">
                                <nav className="flex flex-col gap-2">
                                    {auth.user ? (
                                        <Link
                                            href={dashboard()}
                                            className="rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all text-center"
                                        >
                                            Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={login()}
                                                className="rounded-md border border-border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-all text-center"
                                            >
                                                Log in
                                            </Link>
                                            {canRegister && (
                                                <Link
                                                    href={register()}
                                                    className="rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-all text-center"
                                                >
                                                    Register
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </nav>
                            </div>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
                    {/* Hero Section */}
                    <div className="text-center mb-20">
                        <Book className="h-12 w-12 text-primary mx-auto mb-6" />
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Laravel Demo Application
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A full-stack demo application built with Laravel, Inertia.js, React, and TypeScript.
                            Perfect for learning, testing, and exploring modern Laravel development.
                        </p>
                    </div>

                    {/* Overview Section */}
                    <section className="mb-20">
                        <h3 className="font-serif text-3xl font-bold text-foreground mb-6">
                            Project Overview
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                            This application demonstrates a complete CRUD (Create, Read, Update, Delete) system 
                            with user authentication, post management, and image uploads. It's designed as a 
                            learning resource and testing ground for Laravel best practices.
                        </p>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex items-start gap-3">
                                <Package className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Features</h4>
                                    <p className="text-muted-foreground">
                                        User authentication, post CRUD operations, image uploads, and responsive UI
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Settings className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-foreground mb-2">Tech Stack</h4>
                                    <p className="text-muted-foreground">
                                        Laravel 11, Inertia.js, React, TypeScript, Tailwind CSS
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Database Section */}
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-6">
                            <Database className="h-8 w-8 text-primary" />
                            <h3 className="font-serif text-3xl font-bold text-foreground">
                                Database Configuration
                            </h3>
                        </div>
                        
                        <div className="space-y-8">
                            <div>
                                <h4 className="font-semibold text-foreground text-lg mb-3">Supported Databases</h4>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    This application supports multiple database systems. By default, it uses <strong>SQLite</strong> for 
                                    easy local development, but you can easily switch to:
                                </p>
                                <ul className="space-y-2 text-muted-foreground ml-6">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>SQLite</strong> - Zero configuration, perfect for development</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>MySQL</strong> - Popular open-source database</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>PostgreSQL</strong> - Advanced open-source database</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><strong>SQL Server</strong> - Microsoft's enterprise database</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border-l-2 border-primary pl-6">
                                <h4 className="font-semibold text-foreground text-lg mb-4">Database Setup</h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-3">1. Configure your <code className="px-2 py-1 bg-muted rounded text-primary font-mono text-xs">.env</code> file:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-4 text-sm overflow-x-auto">
<code className="text-foreground font-mono">{`# For SQLite (default)
DB_CONNECTION=sqlite

# For MySQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=

# For PostgreSQL
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=laravel
DB_USERNAME=postgres
DB_PASSWORD=`}</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-foreground text-lg mb-3">Database Schema</h4>
                                <p className="text-muted-foreground mb-4">
                                    The application includes the following tables:
                                </p>
                                <ul className="space-y-2 text-muted-foreground ml-6">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><code className="text-primary font-mono text-sm">users</code> - User accounts and authentication</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><code className="text-primary font-mono text-sm">posts</code> - Blog posts with title, description, and images</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><code className="text-primary font-mono text-sm">password_reset_tokens</code> - Password recovery</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span><code className="text-primary font-mono text-sm">sessions</code> - User session management</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Local Setup Section */}
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-6">
                            <Terminal className="h-8 w-8 text-primary" />
                            <h3 className="font-serif text-3xl font-bold text-foreground">
                                Local Development Setup
                            </h3>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="font-semibold text-foreground text-lg mb-3">Prerequisites</h4>
                                <ul className="space-y-2 text-muted-foreground ml-6">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>PHP 8.2 or higher</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Composer</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Node.js 18+ and npm/pnpm</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Database (SQLite/MySQL/PostgreSQL)</span>
                                </li>
                                </ul>
                            </div>

                            <div className="border-l-2 border-primary pl-6">
                                <h4 className="font-semibold text-foreground text-lg mb-5">Installation Steps</h4>
                                <div className="space-y-5">
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">1. Clone the repository:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">{`git clone <repository-url>
cd simpletestapp`}</code>
                                        </pre>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">2. Install PHP dependencies:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">composer install</code>
                                        </pre>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">3. Install Node dependencies:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">npm install
# or
pnpm install</code>
                                        </pre>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">4. Copy environment file:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">cp .env.example .env</code>
                                        </pre>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">5. Generate application key:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">php artisan key:generate</code>
                                        </pre>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">6. Create database and run migrations:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">{`# For SQLite (creates database.sqlite automatically)
php artisan migrate

# For MySQL/PostgreSQL (create database first, then run)
php artisan migrate`}</code>
                                        </pre>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">7. Create storage symbolic link:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">php artisan storage:link</code>
                                        </pre>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">8. Start the development servers:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">{`# Terminal 1 - Laravel server
php artisan serve

# Terminal 2 - Vite dev server
npm run dev`}</code>
                                        </pre>
                                    </div>

                                    <div className="pt-4">
                                        <p className="text-foreground font-semibold mb-2">Access the application:</p>
                                        <a 
                                            href="http://localhost:8000" 
                                            target="_blank"
                                            className="text-primary hover:text-primary/80 underline underline-offset-4 font-mono"
                                        >
                                            http://localhost:8000
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Management Section */}
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-6">
                            <Server className="h-8 w-8 text-primary" />
                            <h3 className="font-serif text-3xl font-bold text-foreground">
                                Application Management
                            </h3>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="font-semibold text-foreground text-lg mb-4">Common Commands</h4>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">Clear application cache:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">php artisan cache:clear</code>
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">Run database seeders (optional):</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">php artisan db:seed</code>
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">Refresh database:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">php artisan migrate:fresh</code>
                                        </pre>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-2">Build for production:</p>
                                        <pre className="bg-muted/50 border border-border rounded p-3 text-sm overflow-x-auto">
<code className="text-foreground font-mono">npm run build</code>
                                        </pre>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-foreground text-lg mb-4">Project Structure</h4>
                                <pre className="bg-muted/50 border border-border rounded p-4 text-sm text-muted-foreground overflow-x-auto">
<code className="font-mono">{`simpletestapp/
├── app/
│   ├── Http/Controllers/     # Application controllers
│   └── Models/               # Eloquent models
├── database/
│   └── migrations/           # Database migrations
├── resources/
│   ├── js/                   # React/TypeScript frontend
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Inertia pages
│   │   └── layouts/          # Page layouts
│   └── css/                  # Stylesheets
├── routes/
│   └── web.php               # Application routes
└── storage/
    └── app/public/posts/     # Uploaded images`}</code>
                                </pre>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="mb-20">
                        <h3 className="font-serif text-3xl font-bold text-foreground mb-8">
                            Key Features
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Authentication</h4>
                                <p className="text-muted-foreground">
                                    Complete user registration, login, and password reset functionality
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Post Management</h4>
                                <p className="text-muted-foreground">
                                    Create, read, update, and delete posts with rich text descriptions
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Image Uploads</h4>
                                <p className="text-muted-foreground">
                                    Upload and manage images for posts with automatic storage handling
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Modern UI</h4>
                                <p className="text-muted-foreground">
                                    Beautiful, responsive interface built with Tailwind CSS and shadcn/ui
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Real-time Updates</h4>
                                <p className="text-muted-foreground">
                                    Instant UI updates without page refresh using Inertia.js
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Authorization</h4>
                                <p className="text-muted-foreground">
                                    Users can only edit and delete their own posts
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="text-center py-12">
                        <h3 className="font-serif text-3xl font-bold text-foreground mb-4">
                            Ready to Get Started?
                        </h3>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-lg">
                            {auth.user 
                                ? "You're logged in! Head to your dashboard to start creating posts."
                                : "Create an account to start posting and exploring the application."}
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="rounded-md bg-primary px-8 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                                        >
                                            Get Started
                                        </Link>
                                    )}
                                    <Link
                                        href={login()}
                                        className="rounded-md border-2 border-primary px-8 py-3 text-base font-semibold text-primary hover:bg-primary/5 transition-all"
                                    >
                                        Log In
                                    </Link>
                                </>
                            )}
                        </div>
                    </section>
                    </main>

                {/* Footer */}
                <footer className="border-t border-border mt-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center text-muted-foreground">
                            <p className="mb-2">Built with Laravel, Inertia.js, React, and TypeScript</p>
                            <p className="text-sm">
                                A demo application for learning and testing Laravel development
                            </p>
                        </div>
                </div>
                </footer>
            </div>
        </>
    );
}
