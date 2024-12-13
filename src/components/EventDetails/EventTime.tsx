// "use client";

// import { PlusCircle, MinusCircle } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { DateTimePicker } from "./date-time-picker";

// type EventTimeProps = {
//   timings: { startDate: any; endDate: any }[];
//   setTimings: any;
//   onAddTiming: () => void;
//   onRemoveTiming: (index: number) => void;
// };

// export function EventTime({
//   setTimings,
//   timings,
//   onAddTiming,
//   onRemoveTiming,
// }: EventTimeProps) {
//   return (
//     <Card x-chunk="dashboard-07-chunk-2">
//       <CardHeader>
//         <CardTitle>When is it happening?</CardTitle>
//       </CardHeader>
//       {timings.map((timing, index) => (
//         <CardContent key={index}>
//           <div key={index} className="grid gap-6 sm:grid-cols-2">
//             <div className="grid gap-3  ">
//               <Label htmlFor={`startDate-${index}`}>Start Date</Label>
//               <DateTimePicker
//                 onChange={(value) => {
//                   const startDate = value;
//                   const endDate = value;
//                   // Creating a new timing object with the extracted values
//                   const updatedTiming = { startDate, endDate };
//                   // Creating a copy of timings array
//                   const updatedTimings = [...timings];
//                   // Replacing the timing object at the specified index with the updated timing object
//                   updatedTimings[index] = updatedTiming;
//                   // Updating the state with the updated timings array
//                   setTimings(updatedTimings);
//                   // Logging the updated timings array
//                   console.log(updatedTimings);
//                 }}
//                 granularity={"minute"}
//               />
//             </div>

//             <div className="grid gap-3">
//               <Label htmlFor={`endDate-${index}`}>End Date</Label>
//               <DateTimePicker granularity={"minute"} />
//             </div>

//             <div className="grid gap-3 ">
//               <Button
//                 size="sm"
//                 variant="secondary"
//                 className="gap-1 w-fit"
//                 onClick={() => onRemoveTiming(index)} //Call the remove timing function with index
//               >
//                 <MinusCircle className="h-3.5 w-3.5" />
//                 Remove
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       ))}
//       <CardFooter className="justify-center border-t p-4">
//         <Button
//           size="sm"
//           variant="ghost"
//           className="gap-1"
//           onClick={onAddTiming} // Call the add timing function
//         >
//           <PlusCircle className="h-3.5 w-3.5" />
//           Add another timings
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import { PlusCircle, MinusCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DateTimePicker } from "./date-time-picker";
import { TimePicker } from "@/components/time-picker"; // Import TimePicker component
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
type EventTimeProps = {
  timings: { startDate: any; endDate: any }[];
  setTimings: any;
  onAddTiming: () => void;
  onRemoveTiming: (index: number) => void;
};
import { format } from "date-fns";
import { Separator } from "../ui/separator";

export function EventTime({
  setTimings,
  timings,
  onAddTiming,
  onRemoveTiming,
}: EventTimeProps) {
  const [date, setDate] = useState<Date>();

  return (
    <div className=" w-full" x-chunk="dashboard-07-chunk-2">
      <CardHeader>
        <CardTitle>When is it happening?</CardTitle>
      </CardHeader>

      {timings.map((timing, index) => (
        <CardContent key={index}>
          <div key={index} className="grid gap-6 sm:grid-cols-1">
            <div className="grid gap-3">
              <Label htmlFor="datetime">Event Date and Time</Label>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-col items-start w-full h-auto"
                    >
                      <span className="font-semibold uppercase text-[0.65rem]">
                        Date
                      </span>
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span className="  font-normal text-muted-foreground">
                          Pick a date
                        </span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 max-w-[276px]">
                    <div className="flex space-x-4 p-4">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </div>{" "}
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-col items-start w-full h-auto"
                      onClick={() => {}}
                    >
                      <span className="font-semibold uppercase text-[0.65rem]">
                        Time
                      </span>
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span className="  font-normal text-muted-foreground">
                          Pick a time
                        </span>
                      )}{" "}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 max-w-[276px]">
                    <div />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-3 ">
              <Button
                size="sm"
                variant="secondary"
                className="gap-1 w-fit"
                onClick={() => onRemoveTiming(index)} //Call the remove timing function with index
              >
                <MinusCircle className="h-3.5 w-3.5" />
                Remove
              </Button>
            </div>
            <Separator></Separator>
          </div>
        </CardContent>
      ))}
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={onAddTiming} // Call the add timing function
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add another timings
        </Button>
      </CardFooter>
    </div>
  );
}
