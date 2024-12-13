// import { z } from "zod";

// // We're keeping a simple non-relational schema here.
// // IRL, you will have a schema for your data models.

// export const ticketSchema = z.object({
//   ticketId: z.string(), // Unique identifier for the ticket
//   orderId: z.string(), // Reference to the order ID (foreign key)
//   eventId: z.string(), // Reference to the event ID (foreign key)
//   eventName: z.string(), // Name of the event
//   eventDate: z.date(), // Date of the event
//   eventVenue: z.string(), // Venue of the event
//   ticketType: z.string(), // Type of ticket (e.g., General Admission, VIP, etc.)
//   ticketPrice: z.number(), // Price of the ticket
//   seatNumber: z.string().optional(), // Seat number (if applicable)
//   issuedAt: z.date(), // Date and time when the ticket was issued
//   issuedTo: z.string(), // Name of the person the ticket was issued to
//   issuedBy: z.string(), // Name or ID of the user who issued the ticket
//   ticketStatus: z.enum(["Active", "Used", "Cancelled", "Refunded"]), // Status of the ticket
//   qrCode: z.string().optional(), // QR code or barcode for ticket validation
// });
// export type Ticket = z.infer<typeof ticketSchema>;

// export const tickets: Ticket[] = [
//   {
//     ticketId: "TICK12345",
//     orderId: "ORD12345",
//     eventId: "EVT001",
//     eventName: "Concert in the Park",
//     eventDate: new Date("2024-06-15"),
//     eventVenue: "Central Park, NY",
//     ticketType: "VIP",
//     ticketPrice: 150.0,
//     seatNumber: "A12",
//     issuedAt: new Date("2024-05-01T10:30:00Z"),
//     issuedTo: "John Doe",
//     issuedBy: "User123",
//     ticketStatus: "Active",
//     qrCode: "QRCODE12345",
//   },
//   {
//     ticketId: "TICK12346",
//     orderId: "ORD12346",
//     eventId: "EVT002",
//     eventName: "Tech Conference 2024",
//     eventDate: new Date("2024-07-20"),
//     eventVenue: "San Francisco Convention Center",
//     ticketType: "General Admission",
//     ticketPrice: 250.0,
//     issuedAt: new Date("2024-05-05T14:00:00Z"),
//     issuedTo: "Jane Smith",
//     issuedBy: "User124",
//     ticketStatus: "Active",
//     qrCode: "QRCODE12346",
//   },
//   {
//     ticketId: "TICK12347",
//     orderId: "ORD12347",
//     eventId: "EVT003",
//     eventName: "Broadway Show",
//     eventDate: new Date("2024-08-10"),
//     eventVenue: "Broadway Theatre, NY",
//     ticketType: "Balcony",
//     ticketPrice: 120.0,
//     seatNumber: "B5",
//     issuedAt: new Date("2024-05-10T09:45:00Z"),
//     issuedTo: "Alice Johnson",
//     issuedBy: "User125",
//     ticketStatus: "Active",
//     qrCode: "QRCODE12347",
//   },
//   {
//     ticketId: "TICK12348",
//     orderId: "ORD12348",
//     eventId: "EVT004",
//     eventName: "Football Championship",
//     eventDate: new Date("2024-09-15"),
//     eventVenue: "Stadium, LA",
//     ticketType: "VIP",
//     ticketPrice: 300.0,
//     seatNumber: "VIP10",
//     issuedAt: new Date("2024-05-15T11:00:00Z"),
//     issuedTo: "Michael Brown",
//     issuedBy: "User126",
//     ticketStatus: "Active",
//     qrCode: "QRCODE12348",
//   },
//   {
//     ticketId: "TICK12349",
//     orderId: "ORD12349",
//     eventId: "EVT005",
//     eventName: "Art Exhibition",
//     eventDate: new Date("2024-10-05"),
//     eventVenue: "Modern Art Gallery, LA",
//     ticketType: "General Admission",
//     ticketPrice: 50.0,
//     issuedAt: new Date("2024-05-20T15:30:00Z"),
//     issuedTo: "Emma White",
//     issuedBy: "User127",
//     ticketStatus: "Active",
//     qrCode: "QRCODE12349",
//   },
// ];
