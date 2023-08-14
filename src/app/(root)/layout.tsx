import Container from '@/components/theme/Container';
import Footer from '@/components/theme/Footer';
import Topbar from '@/components/theme/Topbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Topbar />

      {children}

      <Footer />
    </Container>
  );
}
