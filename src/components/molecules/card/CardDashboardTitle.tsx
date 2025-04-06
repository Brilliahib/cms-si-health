import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Book, LucideProps } from "lucide-react";
import Link from "next/link";

interface CardDashboardTitleProps {
  title: string;
  icon?: React.ComponentType<LucideProps>;
  iconProps?: LucideProps;
  link: string;
}

export default function CardDashboardTitle({
  title,
  icon: Icon = Book, // default Book
  iconProps,
  link,
}: CardDashboardTitleProps) {
  return (
    <div>
      <Link href={`/dashboard/${link}`}>
        <Card>
          <CardHeader>
            <div className="w-fit rounded-md border p-4 shadow">
              <Icon className="text-primary" {...iconProps} />
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-lg font-semibold">{title}</h1>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
