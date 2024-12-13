import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, MapPin, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
export default function EventCard({ event }:any) {
  return (
    <Card className="flex flex-row p-4 items-center">
      <img
        src="/placeholder.svg"
        alt="Event Image"
        className="w-16 h-16 object-cover rounded-md"
      />
      <div className="ml-4 flex flex-col flex-grow">
        <CardHeader className="p-0 flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg font-bold">{event.name}</CardTitle>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="p-0">
          <CardDescription className="text-sm text-muted-foreground flex items-center">
            <Calendar className="mr-1 h-4 w-4" /> {event.time}
          </CardDescription>
          <CardDescription className="text-sm text-muted-foreground flex items-center">
            <MapPin className="mr-1 h-4 w-4" /> {event.location}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
}

// Example usage of EventCard component with mock data
export function EventDashboard() {
  const event = {
    name: "Rock Concert",
    time: "June 29, 2024, 7:00 PM",
    location: "Madison Square Garden, NY",
  };
  <EventCard event={event} />;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <EventCard event={event} />
      {/* Other components and content */}
    </main>
  );
}
