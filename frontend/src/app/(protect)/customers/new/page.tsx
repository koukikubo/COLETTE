import CustomerForm from "@/components/View/customers/RegistrationsForm";

export default async function CustomerNewPage() {
  // const ranks = await fetchRanks();
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">新規顧客登録</h1>
      <CustomerForm />
    </div>
  );
}
