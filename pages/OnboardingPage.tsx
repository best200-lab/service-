import React, { useState, useEffect } from 'react';
// FIX: Split imports between react-router and react-router-dom to resolve missing export errors.
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
// FIX: Import Database type for strong typing of Supabase payloads.
import { supabase, type Database } from '../supabase';

const OnboardingPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [firmName, setFirmName] = useState('');
    const [enrolmentNumber, setEnrolmentNumber] = useState('');
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!supabase) return;
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                 // Pre-fill full name from auth metadata if available (from Google or signup form)
                if (session.user.user_metadata?.full_name) {
                    setFullName(session.user.user_metadata.full_name);
                }
            } else {
                 // If no user is logged in, redirect to login
                 navigate('/login');
            }
        });

        return () => {
            subscription.unsubscribe()
        };
    }, [navigate]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) {
            alert('You must agree to the terms to continue.');
            return;
        }
        if (!enrolmentNumber) {
            alert('Please enter your enrolment number.');
            return;
        }
        if (!supabase) {
            alert("Supabase is not configured correctly. Please check the console for details.");
            return;
        }

        setIsSubmitting(true);
        
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("You are not logged in. Please log in to continue.");
            navigate('/login');
            setIsSubmitting(false);
            return;
        }

        try {
            const { error } = await supabase.rpc('handle_onboarding', {
                p_full_name: fullName,
                p_phone: phone,
                p_firm_name: firmName || null,
                p_enrolment_number: enrolmentNumber,
            });

            if (error) throw error;
            
            setSubmitted(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);

        } catch (error: any) {
            console.error("Full error submitting onboarding data:", error);
            let errorMessage = "An unknown error occurred. Please try again.";
            if (error.message) {
                if (error.message.includes('duplicate key value violates unique constraint')) {
                    errorMessage = "This enrolment number has already been registered. Please check your details or contact support.";
                } else {
                    errorMessage = error.message;
                }
            }
            alert(`Submission Failed: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
                <div className="w-full max-w-md text-center">
                     <h1 className="text-3xl font-bold text-jm-green mb-4">Details Submitted!</h1>
                     <p className="text-gray-300">Your application is awaiting admin verification. You will be notified via email upon approval.</p>
                     <p className="text-gray-400 mt-4">Redirecting you to the dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-jm-green mb-2">Join Juristmind</h1>
                    <p className="text-gray-400">Complete your registration to get started.</p>
                </div>
                
                <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div>
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-300">Full Legal Name</label>
                            <input type="text" id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" required />
                        </div>
                         <div>
                            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-300">Phone Number</label>
                            <input type="tel" id="phone" pattern="^(?:\+234|0)[7-9][0-1][0-9]{8}$" title="Enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)" value={phone} onChange={e => setPhone(e.target.value)} className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" required />
                        </div>
                        <div>
                            <label htmlFor="firmName" className="block mb-2 text-sm font-medium text-gray-300">Law Firm Name (Optional)</label>
                            <input type="text" id="firmName" value={firmName} onChange={e => setFirmName(e.target.value)} className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" />
                        </div>
                        <div>
                            <label htmlFor="enrolmentNumber" className="block mb-2 text-sm font-medium text-gray-300">Enrolment Number</label>
                            <input 
                                type="text" 
                                id="enrolmentNumber" 
                                value={enrolmentNumber} 
                                onChange={e => setEnrolmentNumber(e.target.value)} 
                                className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-jm-teal focus:border-jm-teal block w-full p-2.5" 
                                placeholder="e.g., scn1450000" 
                                required 
                            />
                        </div>
                         <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="consent" type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="w-4 h-4 border border-gray-600 rounded bg-gray-800 focus:ring-3 focus:ring-jm-teal" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="consent" className="text-gray-400">I agree to the Juristmind <a href="#" className="text-jm-teal hover:underline">Terms of Service</a> and Privacy Policy.</label>
                            </div>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full bg-jm-green text-black font-bold py-3 px-5 rounded-lg text-lg shadow-[0_4px_14px_rgba(0,237,100,0.3)] hover:shadow-[0_6px_20px_rgba(0,237,100,0.4)] transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:shadow-none disabled:cursor-not-allowed">
                            {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                        </button>
                    </form>
                </div>
                <p className="mt-6 text-center text-gray-500">
                    Already have an account? <Link to="/login" className="text-jm-teal hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default OnboardingPage;