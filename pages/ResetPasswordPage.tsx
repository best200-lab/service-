
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabase';

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isValidSession, setIsValidSession] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!supabase) return;
        
        // This event fires when the user clicks the link in the password reset email
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "PASSWORD_RECOVERY") {
                setIsValidSession(true);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        if (!supabase) {
            setError("Supabase client is not available.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            setError(error.message);
        } else {
            setMessage('Password updated successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-jm-green mb-4">Reset Your Password</h1>
                <p className="text-gray-400 mb-8">Enter your new password below. This link is valid for a short time.</p>
                
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-2xl">
                    {message ? (
                        <p className="text-green-400">{message}</p>
                    ) : (
                        <form onSubmit={handlePasswordUpdate} className="space-y-6">
                            <div>
                                <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-300 text-left">New Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)} 
                                    className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword"  className="block mb-2 text-sm font-medium text-gray-300 text-left">Confirm New Password</label>
                                <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    value={confirmPassword} 
                                    onChange={e => setConfirmPassword(e.target.value)} 
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
                                {loading ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
