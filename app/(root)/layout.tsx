import MobileNav from "@/components/MobileNav";
import SidebarLeft from "@/components/SidebarLeft";
import SidebarRight from "@/components/SidebarRight";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex flex-col">
        <section className="relative flex bg-black-3">
            <SidebarLeft/>
            
            <div className="flex flex-1 flex-col min-h-screen p-4 sm:p-14">
                <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
                    <div className="flex h-16 items-center justify-between md:hidden">
                        <Image src={"/icons/logo.svg"} alt="logo" width={30} height={30}/>
                        
                        <MobileNav/>
                    </div>
                    <div className="flex flex-col md:pb-14">
                        /* toast */
                        {children}
                    </div>
                </div>
            </div>

            <SidebarRight/>
        </section>
    </main>
  );
}
