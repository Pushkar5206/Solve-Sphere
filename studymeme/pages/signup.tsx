import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    setError(null);
    setSuccess(false);

    // Step 1: Sign up the user
    const { data: { user }, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    // Step 2: Insert user data into the `profiles` table
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: user.id, email }]);

      if (profileError) {
        setError(profileError.message);
      } else {
        setSuccess(true);
        router.push('/'); // Redirect to home page after successful sign-up
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-purple-600 mb-6">Sign Up</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">
            Check your email to confirm your signup!
          </p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-purple-600 text-white p-2 rounded hover:bg-purple-700"
        >
          Sign Up
        </button>
        <p className="text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/signin" className="text-purple-600 hover:text-purple-800">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}