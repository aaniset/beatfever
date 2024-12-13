import UserAccountNav from "@/components/user-account-nav";
// import { EventsTable } from "@/components/dashboard";
import { VendorPayoutsTable } from "@/components/payouts-table";

export default function Dashboard({ active }: any) {
  // Dummy data for the promocodes table

  // Dummy data for the vendor payouts table
  const dummyPayouts = [
    {
      id: "P001",
      date: "2024-01-15",
      amount: 1500,
      status: "Completed",
      description: "Payout for ticket sales in January",
    },
    {
      id: "P002",
      date: "2024-02-15",
      amount: 2000,
      status: "Completed",
      description: "Payout for ticket sales in February",
    },
    {
      id: "P003",
      date: "2024-03-15",
      amount: 2500,
      status: "Pending",
      description: "Payout for ticket sales in March",
    },
    {
      id: "P004",
      date: "2024-04-15",
      amount: 1000,
      status: "Failed",
      description: "Payout for ticket sales in April",
    },
    {
      id: "P005",
      date: "2024-05-15",
      amount: 3000,
      status: "Completed",
      description: "Payout for ticket sales in May",
    },
    {
      id: "P006",
      date: "2024-06-15",
      amount: 1800,
      status: "Completed",
      description: "Payout for ticket sales in June",
    },
    {
      id: "P007",
      date: "2024-07-15",
      amount: 2200,
      status: "Pending",
      description: "Payout for ticket sales in July",
    },
    {
      id: "P008",
      date: "2024-08-15",
      amount: 1700,
      status: "Failed",
      description: "Payout for ticket sales in August",
    },
    {
      id: "P009",
      date: "2024-09-15",
      amount: 2100,
      status: "Completed",
      description: "Payout for ticket sales in September",
    },
    {
      id: "P010",
      date: "2024-10-15",
      amount: 2300,
      status: "Pending",
      description: "Payout for ticket sales in October",
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <UserAccountNav active="payouts"></UserAccountNav>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <VendorPayoutsTable payouts={dummyPayouts}></VendorPayoutsTable>
      </div>
    </div>
  );
}
