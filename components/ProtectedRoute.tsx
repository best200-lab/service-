
import React, { useState, useEffect } from 'react';
// FIX: Changed import of `Navigate` from `react-router-dom` to `react-router` to fix module export error.
import { Navigate } from 'react-router';
import { supabase } from '../supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setIsAdmin(false);
      return;
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
        
        if (error) {
            console.error('Error fetching user role', error);
            setIsAdmin(false);
        // FIX: Added explicit null check for `data` to prevent potential runtime error.
        // FIX: Cast `data` to the expected type to resolve the 'never' type inference issue and access the 'role' property.
        } else if (data && (data as { role: string }).role === 'admin') {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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
