import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EventCapacityForm() {
  const [capacity, setCapacity] = useState<number | undefined>(undefined);

  const handleCapacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCapacity(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle submission logic here
    console.log("Capacity submitted:", capacity);
  };

  return (
    <Card className="mx-auto w-full ">
      <CardHeader>
        <CardTitle className="text-xl">Event Capacity</CardTitle>
        <CardDescription>
          Enter the maximum capacity of the event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Enter capacity"
                value={capacity || ""}
                onChange={handleCapacityChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Save Capacity
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
