import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Fix: Import firebase compat to access namespaced APIs like `firebase.firestore.FieldValue`.
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { auth, firestore, storage } from '../firebase';

const OnboardingPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [firmName, setFirmName] = useState('');
    const [sealFile, setSealFile] = useState<File | null>(null);
    const [consent, setConsent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) return;
        // Fix: Use v8 compat API for observing auth state.
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // Pre-fill full name from auth profile if available (from Google or signup form)
                if (user.displayName) {
                    setFullName(user.displayName);
                }
            } else {
                 // If no user is logged in, redirect to login
                 navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [navigate]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSealFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) {
            alert('You must agree to the terms to continue.');
            return;
        }
        if (!sealFile) {
            alert('Please upload your lawyer identification or seal.');
            return;
        }
        if (!auth || !firestore || !storage) {
            alert("Firebase is not configured correctly. Please check the console for details.");
            return;
        }

        setIsSubmitting(true);
        
        const user = auth.currentUser;

        if (!user) {
            alert("You are not logged in. Please log in to continue.");
            navigate('/login');
            setIsSubmitting(false);
            return;
        }

        try {
            // 1. Upload file to Firebase Storage
            // Fix: Use v8 compat API for storage references and file uploads.
            const sealFileRef = storage.ref(`seals/${user.uid}/${sealFile.name}`);
            const uploadResult = await sealFileRef.put(sealFile);
            const sealUrl = await uploadResult.ref.getDownloadURL();

            // Special handling for admin and pre-verified lawyer
            let status = 'pending';
            let role = 'lawyer';

            if (user.email === 'Ogunseun7@gmail.com') {
                status = 'verified';
                role = 'admin';
            } else if (user.email === 'ogunseun8@gmail.com') {
                status = 'verified';
            }

            // 2. Save onboarding data to Firestore 'onboarding' collection
            const onboardingData = {
                userId: user.uid,
                email: user.email,
                fullName,
                phone,
                firmName,
                sealUrl,
                status,
                // Fix: Use v8 compat API for server-side timestamps.
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            // Fix: Use v8 compat API to set a document.
            await firestore.collection('onboarding').doc(user.uid).set(onboardingData);

            // 3. Create/update user profile in 'users' collection
            const userData: { [key: string]: any } = {
                uid: user.uid,
                email: user.email,
                displayName: fullName,
                status: status === 'verified' ? 'verified' : 'pending_verification',
                role: role
            };
            // Fix: Use v8 compat API to set a document with merge options.
            await firestore.collection('users').doc(user.uid).set(userData, { merge: true });

            setSubmitted(true);
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);

        } catch (error) {
            console.error("Error submitting onboarding data:", error);
            alert("An error occurred. Please try again.");
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
                            <label className="block mb-2 text-sm font-medium text-gray-300">Lawyer Identification / Seal</label>
                            <label htmlFor="seal-upload" className="flex items-center justify-center w-full p-2.5 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700">
                                <span className="text-sm text-gray-400">{sealFile ? sealFile.name : 'Click to upload (PDF, PNG, <2MB)'}</span>
                                <input id="seal-upload" type="file" accept=".pdf,.png" onChange={handleFileChange} className="hidden" required />
                            </label>
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