import SidebarLeft from "@/components/SidebarLeft";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <SidebarLeft/>
        {children}
        right bar
    </main>
  );
}
