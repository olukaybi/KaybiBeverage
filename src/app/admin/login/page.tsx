'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient as createBrowserClient } from '@/lib/supabase/client';
import KayoraWordmark from '@/components/KayoraWordmark';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') ?? '/admin/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    router.push(next);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-kayora-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <KayoraWordmark variant="dark" className="text-[2.5rem] block mx-auto mb-1" />
          <p className="text-sm text-kayora-stone">Admin portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-kayora-mist rounded-2xl p-8 space-y-5">
          <h1 className="font-display text-xl font-semibold text-kayora-ink">Sign in</h1>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-kayora-graphite mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-kayora-graphite mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-kayora-mist rounded-lg px-4 py-2.5 text-sm text-kayora-ink focus:outline-none focus:ring-2 focus:ring-kayora-blue-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center min-h-[48px] bg-kayora-blue-900 text-kayora-cream text-sm font-semibold rounded-lg hover:bg-kayora-blue-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kayora-blue-500 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
