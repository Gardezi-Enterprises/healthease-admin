import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getServices, saveServices, type Service } from '@/lib/localStorage';

interface ServicesContextType {
  services: Service[];
  updateServices: (newServices: Service[]) => void;
  refreshServices: () => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);

  const loadServices = () => {
    const loadedServices = getServices();
    setServices(loadedServices);
  };

  const updateServices = (newServices: Service[]) => {
    setServices(newServices);
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