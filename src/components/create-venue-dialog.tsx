import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";

export function CreateVenuDialog({ isOpen, setIsOpen, closeDialog }: any) {
  const [venueName, setVenueName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [capacity, setCapacity] = useState("");
  const [mapsUrl, setMapsUrl] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      venueName,
      country,
      address,
      city,
      state,
      timeZone,
      capacity,
      mapsUrl,
    };

    try {
      const response = await axios.post("/api/venue/createVenue", data);
      console.log("Venue saved with ID:", response.data);
    } catch (error) {
      console.error("Error saving venue:", error);
    }
    closeDialog();
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="venue-name">Venue Name</Label>
              <Input
                id="venue-name"
                placeholder="Venue Name"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Select defaultValue={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  {/* Add more countries as needed */}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2 ">
                <Label htmlFor="state">State</Label>
                <Select defaultValue={state} onValueChange={setState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CA">California</SelectItem>
                    <SelectItem value="NY">New York</SelectItem>
                    <SelectItem value="TX">Texas</SelectItem>
                    {/* Add more states as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="time-zone">Time Zone</Label>
                <Select defaultValue={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PST">
                      Pacific Standard Time (PST)
                    </SelectItem>
                    <SelectItem value="EST">
                      Eastern Standard Time (EST)
                    </SelectItem>
                    <SelectItem value="CST">
                      Central Standard Time (CST)
                    </SelectItem>
                    {/* Add more time zones as needed */}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="1000"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maps-url">Maps URL</Label>
              <Input
                id="maps-url"
                placeholder="https://maps.google.com/..."
                value={mapsUrl}
                onChange={(e) => setMapsUrl(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
