import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  headerTitle: string;
}
function Layout({ children, headerTitle }: LayoutProps) {
  return (
    <div className="flex justify-center">
      <div className="w-[390px]">
        <Header title={headerTitle} />
        {children}
      </div>
    </div>
  );
}

export default Layout;
