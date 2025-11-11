<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display all posts from all users.
     */
    public function index()
    {
        $posts = Post::with('user')
            ->latest()
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'description' => $post->description,
                    'image_url' => $post->image_url,
                    'author' => $post->user->name,
                    'is_owner' => $post->user_id === auth()->id(),
                    'created_at' => $post->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('dashboard', [
            'posts' => $posts,
            'view' => 'all',
        ]);
    }

    /**
     * Display posts for authenticated user only.
     */
    public function myPosts()
    {
        $posts = auth()->user()
            ->posts()
            ->latest()
            ->get()
            ->map(function ($post) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'description' => $post->description,
                    'image_url' => $post->image_url,
                    'author' => auth()->user()->name,
                    'is_owner' => true,
                    'created_at' => $post->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('dashboard', [
            'posts' => $posts,
            'view' => 'my',
        ]);
    }

    /**
     * Store a new post.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg,bmp,tiff,ico|max:5120', // 5MB max
        ]);

        $imagePath = null;
        
        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('posts', 'public');
        }

        auth()->user()->posts()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'image_path' => $imagePath,
        ]);

        return back()->with('success', 'Post created successfully!');
    }

    /**
     * Update an existing post.
     */
    public function update(Request $request, Post $post)
    {
        // Ensure user owns the post
        if ($post->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,svg,bmp,tiff,ico|max:5120', // 5MB max
        ]);

        // Handle new image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($post->image_path) {
                Storage::disk('public')->delete($post->image_path);
            }
            $post->image_path = $request->file('image')->store('posts', 'public');
        }

        $post->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);

        return back()->with('success', 'Post updated successfully!');
    }

    /**
     * Delete a post.
     */
    public function destroy(Post $post)
    {
        // Ensure user owns the post
        if ($post->user_id !== auth()->id()) {
            abort(403);
        }

        // Delete image if exists
        if ($post->image_path) {
            Storage::disk('public')->delete($post->image_path);
        }

        $post->delete();

        return back()->with('success', 'Post deleted successfully!');
    }
}
