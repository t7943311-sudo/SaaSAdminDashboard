export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#1E293B_1px,transparent_1px)] [background-size:32px_32px]"></div>
        {children}
    </div>
  );
}
