// import { z } from "zod"

// // We're keeping a simple non-relational schema here.
// // IRL, you will have a schema for your data models.
// // export const taskSchema = z.object({
// //   id: z.string(),
// //   title: z.string(),
// //   status: z.string(),
// //   label: z.string(),
// //   priority: z.string(),
// // })

// // export type Task = z.infer<typeof taskSchema>

// export const orderSchema = z.object({
//   orderId: z.string(), // Unique identifier for the order
//   orderDate: z.date(), // The date when the order was placed
//   customerName: z.string(), // The name of the customer who placed the order
//   eventName: z.string(), // The name of the event for which the ticket was purchased
//   amountPaid: z.number(), // The total amount paid for the order
//   // paymentStatus: z.enum(['Pending', 'Completed', 'Failed']), // The status of the payment
//   paymentStatus: z.string(), // The status of the payment

//   // orderStatus: z.enum(['Confirmed', 'Pending', 'Cancelled']) // The status of the order
//   orderStatus: z.string() // The status of the order

// });

// export type Order = z.infer<typeof orderSchema>
