// app/customers/[id]/edit/page.tsx

import { customerSsr } from "@/lib/api/customer/index";
import { notFound } from "next/navigation";
import type { CustomerDetail } from "@/types/customer";
import EditForm from "@/components/features/customers/forms/EditForm";

type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  let customer: CustomerDetail;

  try {
    customer = await customerSsr.fetchCustomerById(params.id);
  } catch {
    notFound();
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">顧客編集</h1>
      <EditForm customer={customer} />
    </div>
  );
}
