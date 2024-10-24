import { auth } from "@/auth";
import Header from "@/components/header";
import { currentUser } from "@/lib/auth-lib";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { SessionProvider } from "next-auth/react";

export default async function dashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()


  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <SheetProvider/>
        <div>
          <Header image={session?.user?.image} userName={session?.user?.name}/>
          <main className='px-3 lg:px-14'>{children}</main>
        </div>
      </QueryProvider>
    </SessionProvider>
  
  );
}
