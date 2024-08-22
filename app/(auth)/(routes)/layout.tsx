import { Analytics } from "@vercel/analytics/react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="">{children}<Analytics /></div>
    </div>
  );
};

export default AuthLayout;
