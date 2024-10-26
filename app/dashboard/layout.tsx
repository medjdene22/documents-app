import Header from "@/components/header";
import { currentUser } from "@/lib/auth-lib";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

export default async function dashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await currentUser();


  return (
    <QueryProvider>
      <SheetProvider/>
      <div>
        <Header image={user?.image} userName={user?.name}/>
        <main className='px-3 lg:px-14'>{children}</main>
      </div>
    </QueryProvider>
      
  );
}
