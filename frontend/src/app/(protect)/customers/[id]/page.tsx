import { customerSsr } from "@/lib/api/customer/index";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, User, Phone, Mail, Calendar } from "lucide-react";
import { CiMemoPad } from "react-icons/ci";
import type { CustomerDetail } from "@/types/customer";
import { notFound } from "next/navigation";

type CustomerID = {
  params: {
    id: string;
  };
};

export default async function CustomerPage({ params }: CustomerID) {
  let customer: CustomerDetail;

  try {
    customer = await customerSsr.fetchCustomerById(params.id);
  } catch (error) {
    console.error(error);
    notFound();
  }

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <User className="h-6 w-6" />
          </h1>
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            顧客ID: {customer.id}
          </span>
        </div>
      </header>

      <div className="flex flex-wrap gap-3 p-4">
        <Button asChild variant="default" className="flex-1 min-w-[140px]">
          <Link
            href={`/customers/${customer.id}/edit`}
            className="flex items-center justify-center"
          >
            <Edit className="mr-2 h-4 w-4" />
            編集する
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        <section className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Item
              label=""
              value={`${customer.family_name} ${customer.given_name}`}
              icon={<User className="h-4 w-4" />}
            />

            <Item
              label=""
              value={`${customer.family_name_kana || ""} ${
                customer.given_name_kana || ""
              }`}
              icon={<User className="h-4 w-4" />}
            />

            <Item
              label=""
              value={customer.phone1 || "-"}
              icon={<Phone className="h-4 w-4" />}
            />

            <Item
              label=""
              value={customer.phone2 || "-"}
              icon={<Phone className="h-4 w-4" />}
            />

            <Item
              label=""
              value={customer.email || "-"}
              icon={<Mail className="h-4 w-4" />}
            />

            <Item
              label=""
              value={
                customer.birthday
                  ? new Date(customer.birthday).toLocaleDateString("ja-JP")
                  : "-"
              }
              icon={<Calendar className="h-4 w-4" />}
            />
          </div>
        </section>

        {customer.memo && (
          <section className="space-y-4">
            <CiMemoPad />
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="whitespace-pre-wrap text-sm">{customer.memo}</p>
            </div>
          </section>
        )}

        <section className="space-y-4 pt-6 border-t">
          <h2 className="text-sm font-medium text-muted-foreground">
            システム情報
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="font-medium">作成日時</div>
              <div className="text-muted-foreground">
                {customer.created_at
                  ? new Date(customer.created_at).toLocaleString("ja-JP")
                  : "-"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">更新日時</div>
              <div className="text-muted-foreground">
                {customer.updated_at
                  ? new Date(customer.updated_at).toLocaleString("ja-JP")
                  : "-"}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Item({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {label}
      </div>
      <div className="rounded-lg border bg-background p-3">{value || "-"}</div>
    </div>
  );
}
