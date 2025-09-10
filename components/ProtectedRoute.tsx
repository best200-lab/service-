import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, firestore } from '../firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !firestore) {
      setLoading(false);
      setIsAdmin(false);
      return;
    }
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const userDocRef = firestore.collection('users').doc(user.uid);
        userDocRef.get().then(doc => {
          if (doc.exists && doc.data()?.role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
          setLoading(false);
        }).catch(() => {
          setIsAdmin(false);
          setLoading(false);
        });
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;