// import { ChevronDownIcon } from "@radix-ui/react-icons";

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// export function SelectVenue() {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Team Members</CardTitle>
//         <CardDescription>
//           Invite your team members to collaborate.
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="grid gap-6">
//         <div className="flex items-center justify-between space-x-4">
//           <div className="flex items-center space-x-4">
//             <Avatar>
//               <AvatarImage src="/avatars/01.png" />
//               <AvatarFallback>OM</AvatarFallback>
//             </Avatar>
//             <div>
//               <p className="text-sm font-medium leading-none">Sofia Davis</p>
//               <p className="text-sm text-muted-foreground">m@example.com</p>
//             </div>
//           </div>
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Owner{" "}
//                 <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="p-0" align="end">
//               <Command>
//                 <CommandInput placeholder="Select new role..." />
//                 <CommandList>
//                   <CommandEmpty>No roles found.</CommandEmpty>
//                   <CommandGroup>
//                     <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
//                       <p>Viewer</p>
//                       <p className="text-sm text-muted-foreground">
//                         Can view and comment.
//                       </p>
//                     </CommandItem>
//                     <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
//                       <p>Developer</p>
//                       <p className="text-sm text-muted-foreground">
//                         Can view, comment and edit.
//                       </p>
//                     </CommandItem>
//                     <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
//                       <p>Billing</p>
//                       <p className="text-sm text-muted-foreground">
//                         Can view, comment and manage billing.
//                       </p>
//                     </CommandItem>
//                     <CommandItem className="teamaspace-y-1 flex flex-col items-start px-4 py-2">
//                       <p>Owner</p>
//                       <p className="text-sm text-muted-foreground">
//                         Admin-level access to all resources.
//                       </p>
//                     </CommandItem>
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CreateVenuDialog } from "./create-venue-dialog";

// Mock venues data
const venues = [
  {
    id: 1,
    name: "Venue A",
    address: "1234 Long Address Avenue, City, State, Zip",
  },
  {
    id: 2,
    name: "Venue B",
    address: "5678 Another Long Address Road, City, State, Zip",
  },
  {
    id: 3,
    name: "Venue C",
    address: "91011 Yet Another Long Address Blvd, City, State, Zip",
  },
];

export function SelectVenue({ onSelectVenue }: any) {
  const [selectedVenue, setSelectedVenue] = useState<{
    id: number;
    name: string;
    address: string;
  } | null>(null);

  const handleSelectVenue = (venue: {
    id: number;
    name: string;
    address: string;
  }) => {
    setSelectedVenue(venue);
    onSelectVenue(venue.id); // Pass the selected venue ID to the parent form
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  const handleCreateVenue = () => {
    console.log("clicked");
    openDialog();
  };

  return (
    <div className="">
      <CardHeader>
        <CardTitle>Select Venue</CardTitle>
        <CardDescription>Select a venue for your event.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          {selectedVenue && (
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>{selectedVenue.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {selectedVenue.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedVenue.address}
                </p>
              </div>
            </div>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-auto">
                {selectedVenue ? "Change Venue" : "Select Venue"}
                <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Command>
                <CommandInput placeholder="Search venues..." />
                <CommandList>
                  <CommandEmpty>No venues found.</CommandEmpty>
                  <CommandGroup>
                    {venues.map((venue) => (
                      <CommandItem
                        key={venue.id}
                        onSelect={() => handleSelectVenue(venue)}
                        className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                      >
                        <p>{venue.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {venue.address}
                        </p>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup className=" border-t">
                    <CommandItem
                      onSelect={handleCreateVenue}
                      className="teamaspace-y-1 flex flex-col items-start px-4 py-2"
                    >
                      <p className="text-primary">Create Venue</p>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <CreateVenuDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          closeDialog={closeDialog}
        />
      </CardContent>
    </div>
  );
}
