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
import axios from "axios";

export const paymentStatuses = [
  {
    value: "pending",
    label: "Pending",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "failed",
    label: "Failed",
    icon: CrossCircledIcon,
  },
];

export const orderStatuses = [
  {
    value: "confirmed",
    label: "Confirmed",
    icon: CheckCircledIcon,
  },
  {
    value: "pending",
    label: "Pending",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: CrossCircledIcon,
  },
];
