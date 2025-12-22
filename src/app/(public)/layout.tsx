import { Header } from '@/components/navigation/Header';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto">{children}</main>
    </>
  );
}
