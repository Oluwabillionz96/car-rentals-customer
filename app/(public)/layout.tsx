import MainLayout from "@/components/main-layout";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default PublicLayout;
