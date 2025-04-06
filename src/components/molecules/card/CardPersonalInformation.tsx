import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import FormCreatePersonalInformation from "../form/personal-information/FormPersonalInformation";
import { TriangleAlert } from "lucide-react";

interface CardPersonalInformationProps {
  id: string;
}

export default function CardPersonalInformation({
  id,
}: CardPersonalInformationProps) {
  return (
    <div className="space-y-4">
      <Alert variant={"warning"} className="w-full md:w-fit">
        <TriangleAlert className="!text-yellow-600" />
        <AlertTitle>Belum Mengisi</AlertTitle>
        <AlertDescription>
          Anda belum mengisi informasi pribadi, silahkan isi terlebih dahulu
          sebelum mengerjakan screening.
        </AlertDescription>
      </Alert>
      <FormCreatePersonalInformation id={id} />
    </div>
  );
}
