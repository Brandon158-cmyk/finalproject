import { Analytics } from "@vercel/analytics/react";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import { SpeedInsights } from "@vercel/speed-insights/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex h-screen bg-[#FCFBF9]'>
      {" "}
      {/* Use h-screen to cover the entire viewport height */}
      <div className='hidden md:flex flex-col h-full'>
        {" "}
        {/* Sidebar width and full height */}
        <Sidebar />
      </div>
      <div className='flex-1 flex flex-col h-full'>
        {" "}
        {/* Main content area */}
        <div className='h-[70px] w-full'>
          {" "}
          {/* Navbar height */}
          <Navbar />
        </div>
        <main className='flex-1 overflow-y-auto'>
          {" "}
          {/* Make the main content area scrollable */}
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
