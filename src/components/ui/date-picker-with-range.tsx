//  "use client";
import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<Date>();

  const [time, setTime] = React.useState<string>("00:00");

  return (
    <div className={cn("grid gap-2 sm:grid-cols-1", className)}>
      <div className="grid grid-cols-3 gap-3">
        <div className="grid gap-3 w-fit">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-3 w-fit">
          {/* <Label htmlFor="role">Role</Label> */}
          <Select defaultValue="AM">
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <div className="grid gap-3">
        {/* <Label htmlFor="role">Role</Label> */}
        <Select defaultValue="AM">
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* <div>
         <Label htmlFor="time" className="sr-only">
           Time
         </Label>
         <Input
           type="time"
           value={time}
           defaultValue={"pick a time "}
           onChange={(e) => setTime(e.target.value)}
           className="w-[150px] text-black bg-white border border-gray-300 rounded-md p-2"
           id="time"
         />
       </div> */}
    </div>
  );
}
//  "use client";
// "use client";// "use client";
// import * as React from "react";
// import { addDays, format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export default function DatePickerWithRange({
//   className,
//   onChange,
// }: {
//   className?: string;
//   onChange: (date: Date, time: string) => void;
// }) {
//   const [date, setDate] = React.useState<Date | undefined>(undefined);
//   const [time, setTime] = React.useState<string>("00:00");
//   const [ampm, setAmPm] = React.useState<string>("AM");

//   // Function to handle date selection
//   const handleDateChange = (newDate: Date | undefined) => {
//     setDate(newDate);
//     if (newDate) {
//       onChange(newDate, `${time} ${ampm}`);
//     }
//   };

//   // Function to handle time selection
//   const handleTimeChange = (newTime: string) => {
//     setTime(newTime);
//     onChange(date || new Date(), `${newTime} ${ampm}`);
//   };

//   // Function to handle AM/PM selection
//   const handleAmPmChange = (newAmPm: string) => {
//     setAmPm(newAmPm);
//     onChange(date || new Date(), `${time} ${newAmPm}`);
//   };

//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             variant={"outline"}
//             className={cn(
//               "w-[280px] justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date ? format(date, "PPP") : <span>Pick a date</span>}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0">
//           <Calendar
//             mode="single"
//             selected={date}
//             onSelect={handleDateChange}
//             initialFocus
//           />
//         </PopoverContent>
//       </Popover>
//       <InputOTP maxLength={4}>
//         <InputOTPGroup>
//           <InputOTPSlot index={0} />
//           <InputOTPSlot index={1} />
//         </InputOTPGroup>
//         <InputOTPSeparator />
//         <InputOTPGroup>
//           <InputOTPSlot index={2} />
//           <InputOTPSlot index={3} />
//         </InputOTPGroup>
//         <Select>
//           <SelectTrigger
//             className="w-fit"
//             id="status"
//             aria-label="Select status"
//           >
//             <SelectValue placeholder="AM" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="AM" onClick={() => handleAmPmChange("AM")}>
//               AM
//             </SelectItem>
//             <SelectItem value="PM" onClick={() => handleAmPmChange("PM")}>
//               PM
//             </SelectItem>
//           </SelectContent>
//         </Select>
//       </InputOTP>
//     </div>
//   );
// }
// // "use client";
// // import * as React from "react";
// // import { addDays, format } from "date-fns";
// // import { Calendar as CalendarIcon } from "lucide-react";
// // import {
// //   InputOTP,
// //   InputOTPGroup,
// //   InputOTPSeparator,
// //   InputOTPSlot,
// // } from "@/components/ui/input-otp";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import { Calendar } from "@/components/ui/calendar";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";

// // export default function DatePickerWithRange({
// //   className,
// //   onChange,
// // }: {
// //   className?: string;
// //   onChange: (date: Date, time: string) => void;
// // }) {
// //   const [date, setDate] = React.useState<Date | undefined>(undefined);
// //   const [time, setTime] = React.useState<string>("00:00");
// //   const [ampm, setAmPm] = React.useState<string>("AM");

// //   // Function to handle date selection
// //   const handleDateChange = (newDate: Date | undefined) => {
// //     setDate(newDate);
// //     if (newDate) {
// //       onChange(newDate, `${time} ${ampm}`);
// //     }
// //   };

// //   // Function to handle time selection
// //   const handleTimeChange = (newTime: string) => {
// //     setTime(newTime);
// //     onChange(date || new Date(), `${newTime} ${ampm}`);
// //   };

// //   // Function to handle AM/PM selection
// //   const handleAmPmChange = (newAmPm: string) => {
// //     setAmPm(newAmPm);
// //     onChange(date || new Date(), `${time} ${newAmPm}`);
// //   };

// //   return (
// //     <div className={cn("grid gap-2", className)}>
// //       <Popover>
// //         <PopoverTrigger asChild>
// //           <Button
// //             variant={"outline"}
// //             className={cn(
// //               "w-[280px] justify-start text-left font-normal",
// //               !date && "text-muted-foreground"
// //             )}
// //           >
// //             <CalendarIcon className="mr-2 h-4 w-4" />
// //             {date ? format(date, "PPP") : <span>Pick a date</span>}
// //           </Button>
// //         </PopoverTrigger>
// //         <PopoverContent className="w-auto p-0">
// //           <Calendar
// //             mode="single"
// //             selected={date}
// //             onSelect={handleDateChange}
// //             initialFocus
// //           />
// //         </PopoverContent>
// //       </Popover>
// //       <InputOTP maxLength={4}>
// //         <InputOTPGroup>
// //           <InputOTPSlot index={0} />
// //           <InputOTPSlot index={1} />
// //         </InputOTPGroup>
// //         <InputOTPSeparator />
// //         <InputOTPGroup>
// //           <InputOTPSlot index={2} />
// //           <InputOTPSlot index={3} />
// //         </InputOTPGroup>
// //       </InputOTP>
// //       <Select>
// //         <SelectTrigger className="w-fit" id="status" aria-label="Select status">
// //           <SelectValue placeholder="AM" />
// //         </SelectTrigger>
// //         <SelectContent>
// //           <SelectItem value="AM" onClick={() => handleAmPmChange("AM")}>
// //             AM
// //           </SelectItem>
// //           <SelectItem value="PM" onClick={() => handleAmPmChange("PM")}>
// //             PM
// //           </SelectItem>
// //         </SelectContent>
// //       </Select>
// //     </div>
// //   );
// // }
