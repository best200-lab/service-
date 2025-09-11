
import React, { useState } from 'react';
// FIX: Split imports between react-router and react-router-dom to resolve missing export errors.
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { supabase } from '../supabase';

const SignupPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!supabase) {
            setError("Supabase is not configured correctly.");
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: fullName, // Pass full name in metadata
                    }
                }
            });

            if (error) throw error;

            // If user exists but session is null, email confirmation is needed
            if (data.user && !data.session) {
                setSignupSuccess(true);
            } else if (data.user && data.session) {
                // If user is created and logged in (e.g., auto-confirmation is on)
                navigate('/onboarding');
            }

        } catch (err: any) {
            setError(err.message || "Failed to create an account. Please try again.");
            console.error("Error during signup:", err);
        } finally {
            setLoading(false);
        }
    };

    if (signupSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-3xl font-bold text-jm-green mb-4">Check Your Email</h1>
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-2xl">
                        <p className="text-gray-300">
                            We've sent a confirmation link to <span className="font-bold text-white">{email}</span>.
                            Please click the link in the email to activate your account.
                        </p>
                    </div>
                    <p className="mt-6 text-gray-500">
                        Already confirmed? <Link to="/login" className="text-jm-teal hover:underline">Log In</Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="w-full max-w-md text-center">
                <h1 className="text-3xl font-bold text-jm-green mb-4">Create Your Account</h1>
                <p className="text-gray-400 mb-8">Sign up to start your journey with Juristmind.</p>
                
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-2xl">
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-300 text-left">Full Name</label>
                            <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 text-left">Email</label>
                            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" required />
                        </div>
                        <div>
                            <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-300 text-left">Password</label>
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" minLength={6} required />
                        </div>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                        <button type="submit" disabled={loading} className="w-full bg-jm-green text-black font-bold py-3 px-5 rounded-lg text-lg shadow-[0_4px_14px_rgba(0,237,100,0.3)] hover:shadow-[0_6px_20px_rgba(0,237,100,0.4)] transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>
                </div>
                <p className="mt-6 text-gray-500">
                    Already have an account? <Link to="/login" className="text-jm-teal hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
