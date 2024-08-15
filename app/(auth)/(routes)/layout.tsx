const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-8 flex items-center justify-center">
      <div className="">{children}</div>
    </div>
  );
};

export default AuthLayout;
