
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        if (!supabase) {
            setError("Supabase client is not available.");
            setLoading(false);
            return;
        }

        // Construct the redirect URL for the password reset link, compatible with HashRouter
        const resetPasswordURL = `${window.location.origin}/#/reset-password`;

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: resetPasswordURL,
        });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Check your email for the password reset link.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-jm-green mb-4">Forgot Password</h1>
                <p className="text-gray-400 mb-8">Enter your email and we'll send you a link to reset your password.</p>
                
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-2xl">
                    {message ? (
                        <p className="text-green-400">{message}</p>
                    ) : (
                        <form onSubmit={handlePasswordReset} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 text-left">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" 
                                    required 
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <button 
                                type="submit" 
                                disabled={loading}
                                className="w-full bg-jm-green text-black font-bold py-3 px-5 rounded-lg text-lg shadow-[0_4px_14px_rgba(0,237,100,0.3)] hover:shadow-[0_6px_20px_rgba(0,237,100,0.4)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    )}
                </div>
                <p className="mt-6 text-gray-500">
                    Remember your password? <Link to="/login" className="text-jm-teal hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
