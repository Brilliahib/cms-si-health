import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function HomeScreeningInvitation() {
  return (
    <Card className="mt-24 border-0 shadow-xl md:p-8">
      <CardContent>
        <div className="flex h-full flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <div className="lg:w-1/2">
            <div className="flex flex-col gap-6">
              <h1 className="font-paytone text-primary text-3xl">
                Ayo Cek Kesehatan Anda!
              </h1>
              <p className="text-md text-muted-foreground">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. In ex,
                praesentium facere reprehenderit laboriosam quia nisi quae at,
                doloremque animi neque repellat quisquam vitae provident quod
                excepturi beatae repudiandae unde?
              </p>
              <Link href={"/dashboard/screening"} className="w-full">
                <Button className="md:max-w-[200px]">Mulai Sekarang</Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:w-1/2">
            <Image
              src={"/images/assets/doctor.png"}
              alt="Doctor"
              width={1024}
              height={1024}
              className="max-w-[250px] md:max-w-[350px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
