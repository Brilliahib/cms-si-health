import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface DialogStartScreeningProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogStartScreening({
  open,
  setOpen,
  id,
}: DialogStartScreeningProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mulai Screening?</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground">
          <p className="text-muted-foreground text-sm leading-6">
            Kuesioner ini bertujuan untuk mengidentifikasi tanda-tanda atau
            faktor risiko yang mungkin mengarah pada masalah ginjal. Untuk hasil
            yang lebih akurat, pemeriksaan lebih lanjut oleh dokter atau
            spesialis diperlukan.
          </p>
          <ul className="list-outside list-decimal pl-5 text-sm leading-6">
            <li>Pastikan koneksi internet Anda stabil.</li>
            <li>
              Anda hanya memiliki 1 (satu) kali kesempatan untuk mengisi
              screening ini.
            </li>
            <li>
              Jika koneksi internet Anda terputus, Anda harus mengerjakan
              kembali dari awal.
            </li>
            <li>
              Jawaban yang Anda berikan akan digunakan untuk analisis awal dan
              tidak dapat diubah setelah dikumpulkan.
            </li>
            <li>
              Tidak ada jawaban benar atau salah dalam screening ini. Jawablah
              dengan jujur sesuai dengan kondisi Anda.
            </li>
            <li>
              Setelah Anda menekan tombol “Selesai & Kumpulkan”, screening akan
              dianggap selesai.
            </li>
          </ul>
        </div>
        <DialogFooter>
          <Link href={`/work/screening/${id}/personal`}>
            <Button>Kerjakan Sekarang</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
