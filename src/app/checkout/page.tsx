// {
//     "_id": {
//       "$oid": "668722ba7728615009d46415"
//     },
//     "eventName": "Advanced bottom-line internet solution",
//     "eventDescription": "Accommodo nam ulterius dignissimos ea cultellus aliqua eaque sodalitas. Temeritas dicta amplitudo rerum alter tempore vito culpa quod avaritia. Adficio cohaero creo sunt.",
//     "eventFlyer": "https://picsum.photos/seed/Gvp2G/640/480",
//     "timings": [
//       {
//         "date": {
//           "$date": "2024-10-07T20:32:11.839Z"
//         },
//         "startTime": "13:56",
//         "endTime": "10:05"
//       }
//     ],
//     "userId": {
//       "$oid": "6681971d54bbd146fcee3741"
//     },
//     "step": 3,
//     "createdAt": {
//       "$date": "2024-02-13T15:55:38.213Z"
//     },
//     "updatedAt": {
//       "$date": "2024-07-04T00:46:19.238Z"
//     },
//     "status": "draft",
//     "eventId": "668722ba7728615009d46416",
//     "paymentGatewayFee": "organizer",
//     "platformFee": "organizer",
//     "ticketVariants": [
//       {
//         "type": "General Entry",
//         "description": "Standard admission ticket",
//         "quantity": 334,
//         "remaining": 98,
//         "price": 82
//       },
//       {
//         "type": "VIP Access",
//         "description": "VIP ticket with exclusive perks",
//         "quantity": 179,
//         "remaining": 36,
//         "price": 85
//       }
//     ],
//     "venueId": {
//       "$oid": "668722ba7728615009d4640c"
//     }
//   }

"use client";
import { useTheme } from "next-themes";
import { SiteHeader } from "@/components/site-header";
import { Checkout } from "@/components/checkout";

export default function CheckoutPage({ active }: any) {
  const { theme: mode } = useTheme();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SiteHeader />
      <Checkout />
      {/* <EventHomeDetails /> */}
    </div>
  );
}
