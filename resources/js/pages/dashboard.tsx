import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { logout } from '@/routes';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Edit, Menu, Plus, Trash2, User, X } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

interface Post {
    id: number;
    title: string;
    description: string;
    image_url: string | null;
    author: string;
    is_owner: boolean;
    created_at: string;
}
 
interface DashboardProps {
    posts: Post[];
    view: 'all' | 'my';
}

export default function Dashboard({ posts = [], view = 'all' }: DashboardProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const editFileInputRef = useRef<HTMLInputElement>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [createImagePreview, setCreateImagePreview] = useState<string | null>(null);
    const [editImagePreview, setEditImagePreview] = useState<string | null>(null);

    const { data: createData, setData: setCreateData, post, processing: createProcessing, reset: createReset, errors: createErrors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
    });

    const { data: editData, setData: setEditData, post: editPost, processing: editProcessing, reset: editReset, errors: editErrors } = useForm({
        title: '',
        description: '',
        image: null as File | null,
        _method: 'PUT' as const,
    });

    const handleLogout = () => {
        router.post(logout().url);
    };

    const handleCreateImageChange = (file: File | null) => {
        setCreateData('image', file);
        
        // Clean up old preview URL
        if (createImagePreview) {
            URL.revokeObjectURL(createImagePreview);
        }
        
        // Create new preview URL
        if (file) {
            setCreateImagePreview(URL.createObjectURL(file));
        } else {
            setCreateImagePreview(null);
        }
    };

    const handleCreateSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        
        post('/posts', {
            onSuccess: () => {
                createReset();
                setIsCreateModalOpen(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                if (createImagePreview) {
                    URL.revokeObjectURL(createImagePreview);
                    setCreateImagePreview(null);
                }
            },
        });
    };

    const handleEditImageChange = (file: File | null) => {
        setEditData('image', file);
        
        // Clean up old preview URL
        if (editImagePreview && !editImagePreview.startsWith('/storage')) {
            URL.revokeObjectURL(editImagePreview);
        }
        
        // Create new preview URL
        if (file) {
            setEditImagePreview(URL.createObjectURL(file));
        } else if (editingPost?.image_url) {
            setEditImagePreview(editingPost.image_url);
        } else {
            setEditImagePreview(null);
        }
    };

    const handleEditClick = (post: Post) => {
        setEditingPost(post);
        setEditData({
            title: post.title,
            description: post.description,
            image: null,
            _method: 'PUT',
        });
        // Set initial preview to existing image
        setEditImagePreview(post.image_url);
    };

    const handleEditSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (editingPost) {
            editPost(`/posts/${editingPost.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    editReset();
                    setEditingPost(null);
                    if (editFileInputRef.current) {
                        editFileInputRef.current.value = '';
                    }
                    if (editImagePreview && !editImagePreview.startsWith('/storage')) {
                        URL.revokeObjectURL(editImagePreview);
                    }
                    setEditImagePreview(null);
                },
            });
        }
    };

    const handleEditModalClose = () => {
        setEditingPost(null);
        if (editImagePreview && !editImagePreview.startsWith('/storage')) {
            URL.revokeObjectURL(editImagePreview);
        }
        setEditImagePreview(null);
    };

    const handleDelete = (postId: number) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(`/posts/${postId}`);
        }
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-background selection:bg-secondary/30 selection:text-foreground">
                {/* Header */}
                <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 sm:h-20 items-center justify-between">
                            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground">The Chronicle</h1>
                            
                            {/* Desktop Actions */}
                            <div className="hidden sm:flex items-center gap-4">
                                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:shadow-lg gap-2">
                                            <Plus className="h-4 w-4" />
                                            New Post
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-card max-w-2xl border-border shadow-2xl">
                                        <DialogHeader>
                                            <DialogTitle className="text-card-foreground font-serif text-2xl font-bold">Create New Post</DialogTitle>
                                        </DialogHeader>
                                        <form onSubmit={handleCreateSubmit} className="space-y-5">
                                            <div>
                                                <Label htmlFor="create-title" className="text-foreground font-medium text-sm">Title</Label>
                                                <Input
                                                    id="create-title"
                                                    type="text"
                                                    value={createData.title}
                                                    onChange={(e) => setCreateData('title', e.target.value)}
                                                    className="mt-2 bg-background text-foreground border-input placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                                                    placeholder="Enter an engaging title"
                                                />
                                                {createErrors.title && (
                                                    <p className="mt-2 text-sm text-destructive">{createErrors.title}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="create-description" className="text-foreground font-medium text-sm">Description</Label>
                                                <Textarea
                                                    id="create-description"
                                                    value={createData.description}
                                                    onChange={(e) => setCreateData('description', e.target.value)}
                                                    className="mt-2 bg-background text-foreground border-input placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                                                    rows={5}
                                                    placeholder="Share your story..."
                                                />
                                                {createErrors.description && (
                                                    <p className="mt-2 text-sm text-destructive">{createErrors.description}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="create-image" className="text-foreground font-medium text-sm">Image (optional)</Label>
                                                <Input
                                                    ref={fileInputRef}
                                                    id="create-image"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff,image/x-icon"
                                                    onChange={(e) => handleCreateImageChange(e.target.files?.[0] || null)}
                                                    className="mt-2 bg-background text-foreground border-input file:text-foreground file:border-0 file:bg-muted file:mr-4 file:px-4 file:py-2 file:rounded-md file:font-medium hover:file:bg-muted/80"
                                                />
                                                {createImagePreview && (
                                                    <div className="mt-4 relative rounded-lg overflow-hidden border-2 border-border">
                                                        <img
                                                            src={createImagePreview}
                                                            alt="Preview"
                                                            className="w-full h-auto max-h-64 object-contain bg-muted"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                handleCreateImageChange(null);
                                                                if (fileInputRef.current) {
                                                                    fileInputRef.current.value = '';
                                                                }
                                                            }}
                                                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:bg-destructive/90 transition-colors shadow-lg"
                                                            aria-label="Remove image"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                {createErrors.image && (
                                                    <p className="mt-2 text-sm text-destructive">{createErrors.image}</p>
                                                )}
                                            </div>

                                            <div className="flex gap-3 pt-4">
                                                <Button
                                                    type="submit"
                                                    disabled={createProcessing}
                                                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all"
                                                >
                                                    {createProcessing ? 'Creating...' : 'Create Post'}
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setIsCreateModalOpen(false)}
                                                    className="bg-background border border-border text-foreground hover:bg-muted"
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    onClick={handleLogout}
                                    variant="outline"
                                    className="bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
                                >
                                    Logout
                                </Button>
                            </div>

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

                        {/* Mobile Menu */}
                        {mobileMenuOpen && (
                            <div className="sm:hidden pb-4 pt-2 border-t border-border">
                                <div className="flex flex-col gap-2">
                                    <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                                        <DialogTrigger asChild>
                                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all gap-2">
                                                <Plus className="h-4 w-4" />
                                                New Post
                                            </Button>
                                        </DialogTrigger>
                                        {/* Dialog content remains the same */}
                                    </Dialog>
                                    <Button
                                        onClick={handleLogout}
                                        variant="outline"
                                        className="w-full bg-background border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* Navigation Tabs */}
                        <div className="flex gap-4 sm:gap-8 -mb-px overflow-x-auto">
                            <Link
                                href="/dashboard"
                                prefetch
                                
                                className={`pb-3 sm:pb-4 px-2 border-b-2 font-serif text-xs sm:text-sm tracking-wide font-medium transition-all whitespace-nowrap ${
                                    view === 'all'
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                                }`}
                            >
                                All Posts
                            </Link>
                            <Link
                                href="/my-posts"
                                prefetch
                                
                                className={`pb-3 sm:pb-4 px-2 border-b-2 font-serif text-xs sm:text-sm tracking-wide font-medium transition-all whitespace-nowrap ${
                                    view === 'my'
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                                }`}
                            >
                                My Posts
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
                    {posts.length === 0 ? (
                        <div className="text-center py-12 sm:py-20">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6 shadow-sm">
                                <Plus className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                                {view === 'my' ? 'No posts yet' : 'No posts available'}
                            </h3>
                            <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
                                {view === 'my' 
                                    ? 'Begin your chronicle by creating your first post' 
                                    : 'Be the first to share your story with the world'}
                            </p>
                            <Button 
                                onClick={() => setIsCreateModalOpen(true)}
                                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:shadow-lg gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Create Post
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-xl hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    {post.image_url && (
                                        <div className="aspect-[4/3] overflow-hidden bg-muted">
                                            <img
                                                src={post.image_url}
                                                alt={post.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="flex-1">
                                            <h3 className="font-serif text-xl font-bold text-card-foreground mb-3 line-clamp-2 leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                                                {post.description}
                                            </p>
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <User className="h-3.5 w-3.5 text-primary" />
                                                </div>
                                                <span className="font-medium">{post.author}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground/70">{post.created_at}</span>
                                        </div>

                                        {/* Actions (Only in My Posts view) */}
                                        {view === 'my' && (
                                            <div className="flex gap-2 mt-4">
                                                <Button
                                                    onClick={() => handleEditClick(post)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 bg-background border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-all gap-2"
                                                >
                                                    <Edit className="h-3 w-3" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    onClick={() => handleDelete(post.id)}
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 bg-background border border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all gap-2"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Delete
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </main>

                {/* Edit Modal */}
                <Dialog open={editingPost !== null} onOpenChange={(open) => !open && handleEditModalClose()}>
                    <DialogContent className="bg-card max-w-2xl border-border shadow-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-card-foreground font-serif text-2xl font-bold">Edit Post</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleEditSubmit} className="space-y-5">
                            <div>
                                <Label htmlFor="edit-title" className="text-foreground font-medium text-sm">Title</Label>
                                <Input
                                    id="edit-title"
                                    type="text"
                                    value={editData.title}
                                    onChange={(e) => setEditData('title', e.target.value)}
                                    className="mt-2 bg-background text-foreground border-input placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                                    placeholder="Enter post title"
                                />
                                {editErrors.title && (
                                    <p className="mt-2 text-sm text-destructive">{editErrors.title}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="edit-description" className="text-foreground font-medium text-sm">Description</Label>
                                <Textarea
                                    id="edit-description"
                                    value={editData.description}
                                    onChange={(e) => setEditData('description', e.target.value)}
                                    className="mt-2 bg-background text-foreground border-input placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
                                    rows={5}
                                    placeholder="Enter post description"
                                />
                                {editErrors.description && (
                                    <p className="mt-2 text-sm text-destructive">{editErrors.description}</p>
                                )}
                            </div>

                                            <div>
                                                <Label htmlFor="edit-image" className="text-foreground font-medium text-sm">
                                                    Image {editImagePreview ? '(click to change)' : '(optional)'}
                                                </Label>
                                                {editImagePreview && (
                                                    <div className="mt-4 relative rounded-lg overflow-hidden border-2 border-border mb-3">
                                                        <img
                                                            src={editImagePreview}
                                                            alt="Current image"
                                                            className="w-full h-auto max-h-64 object-contain bg-muted"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                handleEditImageChange(null);
                                                                if (editFileInputRef.current) {
                                                                    editFileInputRef.current.value = '';
                                                                }
                                                            }}
                                                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1.5 hover:bg-destructive/90 transition-colors shadow-lg"
                                                            aria-label="Remove image"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                )}
                                                <Input
                                                    ref={editFileInputRef}
                                                    id="edit-image"
                                                    type="file"
                                                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml,image/bmp,image/tiff,image/x-icon"
                                                    onChange={(e) => handleEditImageChange(e.target.files?.[0] || null)}
                                                    className="mt-2 bg-background text-foreground border-input file:text-foreground file:border-0 file:bg-muted file:mr-4 file:px-4 file:py-2 file:rounded-md file:font-medium hover:file:bg-muted/80"
                                                />
                                                {editErrors.image && (
                                                    <p className="mt-2 text-sm text-destructive">{editErrors.image}</p>
                                                )}
                                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="submit"
                                    disabled={editProcessing}
                                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all"
                                >
                                    {editProcessing ? 'Updating...' : 'Update Post'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditingPost(null)}
                                    className="bg-background border border-border text-foreground hover:bg-muted"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}
