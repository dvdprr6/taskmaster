import Appbar from './appbar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <div style={{ marginBottom: '10px' }}>
        <Appbar />
      </div>
      {children}
    </section>
  );
}
