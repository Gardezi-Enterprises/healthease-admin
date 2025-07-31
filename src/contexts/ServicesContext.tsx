import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getServices, saveServices, type Service } from '@/lib/localStorage';
import { supabase } from '@/integrations/supabase/client';

interface ServicesContextType {
  services: Service[];
  updateServices: (newServices: Service[]) => void;
  refreshServices: () => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);

  const loadServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error loading services from Supabase:', error);
        // Fallback to localStorage if Supabase fails
        const localServices = getServices();
        setServices(localServices);
      } else {
        setServices(data || []);
      }
    } catch (error) {
      console.error('Failed to load services:', error);
      // Fallback to localStorage
      const localServices = getServices();
      setServices(localServices);
    }
  };

  const updateServices = (newServices: Service[]) => {
    setServices(newServices);
    // Keep localStorage as backup
    saveServices(newServices);
  };

  const refreshServices = () => {
    loadServices();
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <ServicesContext.Provider value={{ services, updateServices, refreshServices }}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServicesContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
} 