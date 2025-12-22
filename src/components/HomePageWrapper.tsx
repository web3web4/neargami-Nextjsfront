"use client";

import ClientSpeedLinesProvider from "@/components/SpeedLines/ClientSpeedLines";

interface HomePageWrapperProps {
  children: React.ReactNode;
}

const HomePageWrapper: React.FC<HomePageWrapperProps> = ({ children }) => {
  return (
    <ClientSpeedLinesProvider>
      {children}
    </ClientSpeedLinesProvider>
  );
};

export default HomePageWrapper;
