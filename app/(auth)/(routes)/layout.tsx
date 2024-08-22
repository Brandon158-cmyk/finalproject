import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="">{children}<Analytics /><SpeedInsights /></div>
    </div>
  );
};

export default AuthLayout;
