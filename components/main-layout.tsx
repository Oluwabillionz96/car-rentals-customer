import Header from "./header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen bg-slate-50">
      <Header />
      <main className="md:pt-32 pt-18 flex flex-col gap-10 md:gap-20 px-4 md:px-20 pb-20">
        {children}
      </main>
    </section>
  );
};

export default MainLayout;
