import CustomerForm from "@/components/features/customers/forms/CustomerNew";

export default async function CustomerNewPage() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">新規顧客登録</h1>
      <CustomerForm />
    </div>
  );
}
