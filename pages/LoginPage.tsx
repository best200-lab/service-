
import React, { useState } from 'react';
// FIX: Split imports between react-router and react-router-dom to resolve missing export errors.
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { supabase } from '../supabase';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const checkOnboardingAndRedirect = async (userId: string) => {
    if (!supabase) return;
    
    const { data } = await supabase
      .from('onboarding')
      .select('user_id')
      .eq('user_id', userId)
      .single();

    if (data) {
      navigate('/dashboard');
    } else {
      navigate('/onboarding');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setNeedsConfirmation(false);
    setLoading(true);

    if (!supabase) {
      setError("Supabase is not configured correctly.");
      setLoading(false);
      return;
    }
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      if (data.user) {
        await checkOnboardingAndRedirect(data.user.id);
      }
    } catch (err: any) {
      if (err.message && err.message.includes('Email not confirmed')) {
        setError('Your email address has not been confirmed. Please check your inbox.');
        setNeedsConfirmation(true);
      } else {
        setError("Invalid email or password. Please try again.");
      }
      console.error("Error during email login:", err);
    } finally {
        setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setError(null);
    setInfoMessage(null);
    setLoading(true);
    if (!supabase) {
        setError("Supabase is not configured correctly.");
        setLoading(false);
        return;
    }
    
    const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email: email,
    });

    if (resendError) {
        setError(resendError.message);
    } else {
        setInfoMessage("A new confirmation email has been sent. Please check your inbox.");
        setNeedsConfirmation(false);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setInfoMessage(null);
    setLoading(true);
    if (!supabase) {
      setError("Supabase is not configured correctly.");
      setLoading(false);
      return;
    }
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (err: any) {
      setError("An error occurred during Google login. Please try again.");
      console.error("Error during Google login:", err);
    } finally {
        setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-jm-green mb-4">Welcome Back</h1>
        <p className="text-gray-400 mb-8">Log in to access your dashboard.</p>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-2xl">
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 text-left">Email</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" required />
              </div>
              <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                    <Link to="/forgot-password" className="text-sm text-jm-teal hover:underline">
                        Forgot password?
                    </Link>
                </div>
                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" required />
              </div>
              {infoMessage && <p className="text-green-400 text-sm text-center">{infoMessage}</p>}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}
              {needsConfirmation && (
                  <button type="button" onClick={handleResendConfirmation} disabled={loading} className="text-sm text-jm-teal hover:underline disabled:opacity-50">
                      Resend confirmation email
                  </button>
              )}
              <button type="submit" disabled={loading} className="w-full bg-jm-green text-black font-bold py-3 px-5 rounded-lg text-lg shadow-[0_4px_14px_rgba(0,237,100,0.3)] hover:shadow-[0_6px_20px_rgba(0,237,100,0.4)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
            
            <div className="my-6 flex items-center">
                <div className="flex-grow border-t border-gray-600"></div>
                <span className="flex-shrink mx-4 text-gray-400">OR</span>
                <div className="flex-grow border-t border-gray-600"></div>
            </div>

            <button 
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center bg-white text-black font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50"
            >
                <svg className="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691c-1.946 3.639-3.09 7.868-3.09 12.309c0 .692.036 1.378.102 2.059l8.356-6.554l-5.368-7.814z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-8.356 6.554C7.946 41.345 15.485 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.574l6.19 5.238C42.058 36.471 44 30.637 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
                Continue with Google
            </button>
        </div>
        <p className="mt-6 text-gray-500">
            Don't have an account? <Link to="/signup" className="text-jm-teal hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
