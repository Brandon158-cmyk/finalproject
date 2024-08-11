import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary:
            "text-[#11DD7B] bg-primary hover:bg-[#11DD7B] hover:text-primary text-sm",
        },
      }}
    />
  );
}
