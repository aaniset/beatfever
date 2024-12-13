
// // Mock function to simulate a GET request
// const fetchData = () => {
//   return {
//     overviewData: [
//       {
//         name: "Jan",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Feb",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Mar",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Apr",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "May",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Jun",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Jul",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Aug",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Sep",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Oct",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Nov",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//       {
//         name: "Dec",
//         total: Math.floor(Math.random() * 5000) + 1000,
//       },
//     ],

//     totalRevenue: "$45,231.89",
//     receivedTickets: 2350,
//     pendingPayouts: "$12,234",
//     totalEvents: 10,
//     revenueChange: "+20.1%",
//     transactions: [
//       {
//         customer: "Liam Johnson",
//         email: "liam@example.com",
//         type: "Ticket Purchase",
//         status: "Approved",
//         date: "2023-06-23",
//         amount: "$250.00",
//       },
//       {
//         customer: "Olivia Smith",
//         email: "olivia@example.com",
//         type: "Refund",
//         status: "Declined",
//         date: "2023-06-24",
//         amount: "$150.00",
//       },
//       {
//         customer: "Noah Williams",
//         email: "noah@example.com",
//         type: "Subscription",
//         status: "Approved",
//         date: "2023-06-25",
//         amount: "$350.00",
//       },
//       {
//         customer: "Emma Brown",
//         email: "emma@example.com",
//         type: "Ticket Purchase",
//         status: "Approved",
//         date: "2023-06-26",
//         amount: "$450.00",
//       },
//       {
//         customer: "Liam Johnson",
//         email: "liam@example.com",
//         type: "Ticket Purchase",
//         status: "Approved",
//         date: "2023-06-27",
//         amount: "$550.00",
//       },
//     ],
//   };
// };

// export default function EventDashboard() {
//   const data = fetchData();

//   return (
//     <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
//       <div className="flex items-center justify-between space-y-2">
//         <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
//         <div className="flex items-center space-x-2">
//           < CalendarDateRangePicker />
//           <Button>Download</Button>
//         </div>
//       </div>
//       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//         <Card x-chunk="dashboard-01-chunk-0">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{data.totalRevenue}</div>
//             <p className="text-xs text-muted-foreground">
//               {data.revenueChange} from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-1">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Awaiting</CardTitle>
//             <Ticket className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">+{data.receivedTickets}</div>
//             <p className="text-xs text-muted-foreground">
//               <a href="/" className="underline">
//                 View last payout
//               </a>
//             </p>
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-2">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Pending Payouts
//             </CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{data.pendingPayouts}</div>
//             <p className="text-xs text-muted-foreground">
//               <a href="/" className="underline">
//                 View upcoming payout
//               </a>
//             </p>
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-3">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Events</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{data.totalEvents}</div>
//             <p className="text-xs text-muted-foreground">
//               Overview of all events hosted this year.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//       <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
//         <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
//           <CardHeader className="flex flex-row items-center">
//             <div className="grid gap-2">
//               <CardTitle>Sales Overview</CardTitle>
//               <CardDescription>
//                 Recent ticket sales and transactions.
//               </CardDescription>
//             </div>
//             <Button asChild size="sm" className="ml-auto gap-1">
//               <Link href="#">
//                 Analytics
//                 <ArrowUpRight className="h-4 w-4" />
//               </Link>
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <Overview data={data.overviewData} />
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-5">
//           <CardHeader className="flex flex-row items-center">
//             <div className="grid gap-2">
//               <CardTitle>Recent Transactions</CardTitle>
//               <CardDescription>
//                 Details of recent ticket purchases.
//               </CardDescription>
//             </div>
//             <Button asChild size="sm" className="ml-auto gap-1">
//               <Link href="#">
//                 View All
//                 <ArrowUpRight className="h-4 w-4" />
//               </Link>
//             </Button>
//           </CardHeader>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Customer</TableHead>
//                   <TableHead className="hidden xl:table-column">Type</TableHead>
//                   <TableHead className="hidden xl:table-column">
//                     Status
//                   </TableHead>
//                   <TableHead className="hidden xl:table-column">Date</TableHead>
//                   <TableHead className="text-right">Amount</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {data.transactions.map((transaction, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <div className="font-medium">{transaction.customer}</div>
//                       <div className="hidden text-sm text-muted-foreground md:inline">
//                         {transaction.email}
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       {transaction.type}
//                     </TableCell>
//                     <TableCell className="hidden xl:table-column">
//                       <Badge className="text-xs" variant="outline">
//                         {transaction.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
//                       {transaction.date}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       {transaction.amount}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// }
