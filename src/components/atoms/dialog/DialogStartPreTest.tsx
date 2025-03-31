import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

interface DialogStartPreTestProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export default function DialogStartPreTest({
  open,
  setOpen,
  id,
}: DialogStartPreTestProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kerjakan Pre Test?</DialogTitle>
        </DialogHeader>
        <div className="text-muted-foreground">
          <p
            id="radix-:r2k:"
            className="text-muted-foreground list-outside list-decimal text-sm leading-6"
            data-sentry-element="AlertDialogDescription"
            data-sentry-source-file="StartTryoutAlertDialog.tsx"
          >
            <li>Pastikan koneksi internet anda stabil.</li>
            <li>
              Anda hanya memiliki 1 (satu) kali kesempatan mengerjakan tryout.
            </li>
            <li>
              Anda dapat menekan tombol pause di layar bagian kanan atas apabila
              ingin keluar sementara dari tryout.
            </li>
            <li>
              Begitu pula jika koneksi internet anda terputus, anda dapat
              melanjutkan kembali tanpa mengulang dari awal.
            </li>
            <li>
              Gambar dapat anda zoom dengan pinch di smartphone/tablet, dan
              fitur zoom in di browser laptop/pc anda
            </li>
            <li>
              Anda dapat menandai soal dengan menekan tombol flag di atas soal.
            </li>
            <li>
              Navigasi seluruh soal tryout anda ada di bawah soal (pengguna
              smartphone/tablet) atau di samping soal (pengguna laptop/pc).
            </li>
            <li>
              Anda dapat menggunakan mengaktifkan menu Auto Scroll untuk next
              secara otomatis setiap selesai menjawab soal
            </li>
            <li>
              Setelah anda pilih Selesai &gt; Selesai dan Kumpulkan untuk
              dinilai, tryout dianggap selesai dan tidak dapat diulang. Anda
              akan mendapat penilaian dan jawaban benar.
            </li>
            <li>Jawaban dapat anda lihat setelah selesai mengerjakan.</li>
          </p>
        </div>
        <DialogFooter>
          <Link href={`/work/pre-test/${id}`}>
            <Button>Kerjakan Sekarang</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
