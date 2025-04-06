import CardChangePassword from "@/components/molecules/card/CardChangePassword";
import CardUpdateAccount from "@/components/molecules/card/CardUpdateAccount";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function AuthUpdateAccountWrapper() {
  const session = await getServerSession(authOptions);
  return (
    <Tabs defaultValue="information" className="w-full">
      <TabsList className="mb-2 grid w-fit grid-cols-2">
        <TabsTrigger value="information">Informasi Akun</TabsTrigger>
        <TabsTrigger value="change-password">Ganti Password</TabsTrigger>
      </TabsList>
      <TabsContent value="information">
        <CardUpdateAccount session={session!} />
      </TabsContent>
      <TabsContent value="change-password">
        <CardChangePassword />
      </TabsContent>
    </Tabs>
  );
}
