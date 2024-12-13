import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const ticketStatuses = [
  {
    value: "Active",
    label: "Active",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Used",
    label: "Used",
    icon: CheckCircledIcon,
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    icon: CrossCircledIcon,
  },
  {
    value: "Refunded",
    label: "Refunded",
    icon: CrossCircledIcon,
  },
];
// export const orderStatuses = [
//   {
//     value: "confirmed",
//     label: "Confirmed",
//     icon: CheckCircledIcon,
//   },
//   {
//     value: "pending",
//     label: "Pending",
//     icon: QuestionMarkCircledIcon,
//   },
//   {
//     value: "cancelled",
//     label: "Cancelled",
//     icon: CrossCircledIcon,
//   },
// ];
