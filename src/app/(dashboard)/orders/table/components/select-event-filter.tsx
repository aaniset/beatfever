// import * as React from "react";
// import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
// import { useRouter,useSearchParams } from 'next/navigation'; // Assuming you're using Next.js

// import { cn } from "@/lib/utils";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Separator } from "@/components/ui/separator";

// interface DataTableFacetedFilterProps {
//   title?: string;
//   options: {
//     label: string;
//     value: string;
//     icon?: React.ComponentType<{ className?: string }>;
//   }[];
// }

// export function SelectEventFilter({
//   title,
//   options,
// }) {
//   const router = useRouter();
//   const [selectedValues, setSelectedValues] = React.useState<Set<string>>(new Set());
//   const searchParams = useSearchParams();
//   const eventId = searchParams.get("eventId");
//   if(eventId){
//     options.map((option)=>{
//         if(option.value == eventId){
//             setSelectedValues(option.value)
//         }
//     })
//   }
//   const updateUrl = (selectedValues: Set<string>) => {
//     if (selectedValues.size === 0) {
//       router.push("/orders");
//     } else {
//       const eventId = Array.from(selectedValues)[0]; // Assuming only one event can be selected
//           router.push(`/orders?eventId=${eventId}`);
//     }
//   };

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button variant="outline" size="sm" className="h-8 border-dashed">
//           <PlusCircledIcon className="mr-2 h-4 w-4" />
//           {title}
//           {selectedValues.size > 0 && (
//             <>
//               <Separator orientation="vertical" className="mx-2 h-4" />
//               <Badge
//                 variant="secondary"
//                 className="rounded-sm px-1 font-normal lg:hidden"
//               >
//                 {selectedValues.size}
//               </Badge>
//               <div className="hidden space-x-1 lg:flex">
//                 {selectedValues.size > 2 ? (
//                   <Badge
//                     variant="secondary"
//                     className="rounded-sm px-1 font-normal"
//                   >
//                     {selectedValues.size} selected
//                   </Badge>
//                 ) : (
//                   Array.from(selectedValues).map((value) => {
//                     const option = options.find((opt) => opt.value === value);
//                     return option ? (
//                       <Badge
//                         variant="secondary"
//                         key={option.value}
//                         className="rounded-sm px-1 font-normal"
//                       >
//                         {option.label}
//                       </Badge>
//                     ) : null;
//                   })
//                 )}
//               </div>
//             </>
//           )}
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0" align="start">
//         <Command>
//           <CommandInput placeholder={title} />
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup>
//               {options.map((option) => {
//                 const isSelected = selectedValues.has(option.value);
//                 return (
//                   <CommandItem
//                     key={option.value}
//                     onSelect={() => {
//                       const newSelectedValues = new Set(selectedValues);
//                       if (isSelected) {
//                         newSelectedValues.delete(option.value);
//                       } else {
//                         newSelectedValues.clear();
//                         newSelectedValues.add(option.value);
//                       }
//                       setSelectedValues(newSelectedValues);
//                       updateUrl(newSelectedValues);
//                     }}
//                   >
//                     <div
//                       className={cn(
//                         "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
//                         isSelected
//                           ? "bg-primary text-primary-foreground"
//                           : "opacity-50 [&_svg]:invisible"
//                       )}
//                     >
//                       <CheckIcon className={cn("h-4 w-4")} />
//                     </div>
//                     {option.icon && (
//                       <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
//                     )}
//                     <span>{option.label}</span>
//                   </CommandItem>
//                 );
//               })}
//             </CommandGroup>
//             {selectedValues.size > 0 && (
//               <>
//                 <CommandSeparator />
//                 <CommandGroup>
//                   <CommandItem
//                     onSelect={() => {
//                       setSelectedValues(new Set());
//                       updateUrl(new Set());
//                     }}
//                     className="justify-center text-center"
//                   >
//                     Clear filters
//                   </CommandItem>
//                 </CommandGroup>
//               </>
//             )}
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
import * as React from "react";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from 'next/navigation'; // Assuming you're using Next.js

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

interface DataTableFacetedFilterProps {
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function SelectEventFilter({
  title,
  options,
}: DataTableFacetedFilterProps) {
  const router = useRouter();
  const [selectedValues, setSelectedValues] = React.useState<Set<string>>(new Set());
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  React.useEffect(() => {
    if (eventId) {
      const selectedOption = options.find((option) => option.value === eventId);
      if (selectedOption) {
        setSelectedValues(new Set([eventId]));
      }
    }else{
        // setSelectedValues(new Set([options[0].value]));
    }
  }, [eventId, options]);

  const updateUrl = (selectedValues: Set<string>) => {
    if (selectedValues.size === 0) {
      router.push("/orders");
    } else {
      const eventId = Array.from(selectedValues)[0]; // Assuming only one event can be selected
      router.push(`/orders?eventId=${eventId}`);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  Array.from(selectedValues).map((value) => {
                    const option = options.find((opt) => opt.value === value);
                    return option ? (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ) : null;
                  })
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newSelectedValues = new Set(selectedValues);
                      if (isSelected) {
                        newSelectedValues.delete(option.value);
                      } else {
                        newSelectedValues.clear();
                        newSelectedValues.add(option.value);
                      }
                      setSelectedValues(newSelectedValues);
                      updateUrl(newSelectedValues);
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.icon && (
                      <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setSelectedValues(new Set());
                      updateUrl(new Set());
                    }}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}