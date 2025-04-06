import { Card, CardContent } from "@/components/ui/card";
import FormViewPersonalInformation from "../form/personal-information/FormViewPersonalInformation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheck } from "lucide-react";

interface CardPersonalInformationSuccessProps {
  id: string;
}

export default function CardPersonalInformationSuccess({
  id,
}: CardPersonalInformationSuccessProps) {
  return (
    <div className="space-y-4">
      <Alert variant={"success"} className="w-full md:w-fit">
        <CircleCheck className="!text-green-600" />
        <AlertTitle>Sudah Mengisi</AlertTitle>
        <AlertDescription>
          Anda sudah mengisi informasi pribadi, silahkan klik tombol selanjutnya
          dibawah untuk mengerjakan screening.
        </AlertDescription>
      </Alert>
      <Card>
        <CardContent>
          <FormViewPersonalInformation id={id} />
        </CardContent>
      </Card>
    </div>
  );
}
