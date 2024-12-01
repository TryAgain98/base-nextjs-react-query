import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  headerTitle: string;
}
function Layout({ children, headerTitle }: LayoutProps) {
  return (
    <div className="flex justify-center bg-slate-300 h-screen">
      <div className="w-[390px] bg-background">
        <Header title={headerTitle} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
