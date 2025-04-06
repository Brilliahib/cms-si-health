import WorkScreeningPersonalInformationWrapper from "@/components/organisms/work/WorkScreeningPersonalInformationWrapper";

interface WorkScreeningPersonalInformationProps {
  params: Promise<{ id: string }>;
}

export default async function WorkScreeningPersonalInformationPage({
  params,
}: WorkScreeningPersonalInformationProps) {
  const { id } = await params;
  return (
    <section>
      <WorkScreeningPersonalInformationWrapper id={id} />
    </section>
  );
}
