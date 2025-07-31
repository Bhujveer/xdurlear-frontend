import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Lock, Mail } from 'lucide-react';

export function handleLogout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('isVendor');
    const router = window.location; 
    router.href = '/vendor/login'; 
  }
}

export default function VendorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('isVendor') === 'true') {
      router.push('/vendor');
    }
  }, [router]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login check – replace with real logic later
    if (email === 'vendor@example.com' && password === 'vendor123') {
      localStorage.setItem('isvendor', 'true');
      router.push('/vendor');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Vendor Login</h2>
        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Email</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="email"
                className="w-full focus:outline-none"
                placeholder="vendor@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-600 text-sm">Password</label>
            <div className="flex items-center border rounded-md px-3 py-2">
              <Lock className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="password"
                className="w-full focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
