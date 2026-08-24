import Header from '../components/NavBar';
import Hero from '../components/Hero';
import CategoryChips from '../components/CategoryChips';
import Feed from '../components/Feed';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full pt-50 min-h-screen bg-surface">
        <div className="flex flex-col w-full px-4 md:px-8 max-w-[1600px] mx-auto">
          <Hero />
          <div className="w-full flex flex-col gap-xl pb-xl">
            <CategoryChips />
            <Feed />
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
