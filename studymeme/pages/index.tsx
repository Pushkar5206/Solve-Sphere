import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

export default function Home() {
  const router = useRouter();

  // Check if the user is already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/'); // Redirect to home if already logged in
      }
    };
    checkUser();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Navigation Bar */}
      <nav className="p-4 bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">StudyMeme</h1>
          <div className="space-x-4">
            <Link href="/signin" className="text-purple-600 hover:text-purple-800">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Learn, Laugh, and Level Up
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          StudyMeme makes learning fun with AI-powered explanations, memes, and quizzes.
        </p>
        <div className="space-x-4">
          <Link
            href="/signup"
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Get Started
          </Link>
          <Link
            href="/features"
            className="bg-transparent text-purple-600 px-6 py-3 rounded-lg border border-purple-600 hover:bg-purple-50"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Why Choose StudyMeme?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-purple-600 mb-4">AI-Powered Learning</h3>
              <p className="text-gray-600">
                Get simple explanations and personalized study plans powered by AI.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Fun Memes</h3>
              <p className="text-gray-600">
                Learn with memes that make studying enjoyable and relatable.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-green-600 mb-4">Practice Quizzes</h3>
              <p className="text-gray-600">
                Test your knowledge with AI-generated quizzes and track your progress.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 StudyMeme. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}