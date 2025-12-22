import { Sidebar } from '@/components/navigation/Sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/* Add left margin on desktop to account for fixed sidebar */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">{children}</main>
    </div>
  );
}
