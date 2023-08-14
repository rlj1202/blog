import { Metadata } from 'next';

import Config from '@/config';

import Heading from '@/components/theme/Heading';
import Container from '@/components/theme/Container';
import Footer from '@/components/theme/Footer';
import Topbar from '@/components/theme/Topbar';

export const metadata: Metadata = {
  title: `About - ${Config.title}`,
};

export default function Page() {
  return (
    <>
      <div className="relative">
        <div className="absolute left-0 top-0 w-full">
          <Container>
            <Topbar />
          </Container>
        </div>
      </div>

      <div className="h-screen overflow-y-auto snap-y snap-mandatory">
        <div className="snap-start snap-always even:bg-gray-100 even:dark:bg-gray-800">
          <Container>
            <div className="h-screen flex flex-row items-center">
              <div>
                <div className="mb-16">
                  <Heading>About</Heading>
                </div>

                <div className="prose dark:prose-invert">
                  <p>me</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <div className="snap-start snap-always even:bg-gray-100 even:dark:bg-gray-800">
          <Container>
            <div className="h-screen flex flex-row items-center">
              <div>
                <Heading>대충 멋있는 말</Heading>
              </div>
            </div>
          </Container>
        </div>

        <div className="snap-start snap-always even:bg-gray-100 even:dark:bg-gray-800">
          <Container>
            <div className="h-screen flex flex-row items-center">
              <div>
                <Heading>쥰내 멋있어</Heading>
              </div>
            </div>
          </Container>
        </div>

        <div className="snap-start snap-always flex even:bg-gray-100 even:dark:bg-gray-800">
          <Container>
            <Footer />
          </Container>
        </div>
      </div>
    </>
  );
}
