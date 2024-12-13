// // "use client";

// import * as React from "react";

// export function TimePicker({ value, onChange }) {
//   const [hours, setHours] = React.useState(0);
//   const [minutes, setMinutes] = React.useState(0);

//   React.useEffect(() => {
//     if (value) {
//       const date = new Date(value);
//       setHours(date.getHours());
//       setMinutes(date.getMinutes());
//     }
//   }, [value]);

//   const handleHoursChange = (event) => {
//     const newHours = parseInt(event.target.value);
//     setHours(newHours);
//     onChange(new Date(0, 0, 0, newHours, minutes));
//   };

//   const handleMinutesChange = (event) => {
//     const newMinutes = parseInt(event.target.value);
//     setMinutes(newMinutes);
//     onChange(new Date(0, 0, 0, hours, newMinutes));
//   };

//   return (
//     <div className="flex items-center space-x-2">
//       <select
//         value={hours}
//         onChange={handleHoursChange}
//         className="border border-gray-300 rounded-md px-2 py-1"
//       >
//         {[...Array(24).keys()].map((hour) => (
//           <option key={hour} value={hour}>
//             {hour.toString().padStart(2, "0")}
//           </option>
//         ))}
//       </select>
//       <span className="font-bold">:</span>
//       <select
//         value={minutes}
//         onChange={handleMinutesChange}
//         className="border border-gray-300 rounded-md px-2 py-1"
//       >
//         {[...Array(60).keys()].map((minute) => (
//           <option key={minute} value={minute}>
//             {minute.toString().padStart(2, "0")}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
  const hours = Math.floor(i / 2);
  const minutes = (i % 2) * 30;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
});
type TimePickerProps = {
  value: string | undefined;
  onChange: (value: string) => void;
  label: string;
};

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  label,
}) => (
  <div className="flex flex-col w-full">
    <span className="font-semibold uppercase text-[0.65rem]">{label}</span>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Pick a time" />
      </SelectTrigger>
      <SelectContent>
        {timeOptions.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
