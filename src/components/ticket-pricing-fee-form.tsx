import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function TicketPricingFeesForm() {
  const [beatFeverFee, setBeatFeverFee] = useState("");
  const [creditCardFee, setCreditCardFee] = useState("");

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-xl">Ticket Pricing Fees</CardTitle>
        <CardDescription>Who will pay the ticketing fees?</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="beatFeverFee">BeatFever Fee</Label>
            <Select defaultValue={beatFeverFee} onValueChange={setBeatFeverFee}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">
                  Paid by user (added to ticket price)
                </SelectItem>
                <SelectItem value="organizer">
                  Paid by the organizer (cut from payout)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="creditCardFee">
              Credit Card Fee / Payment Gateway Fee
            </Label>
            <Select
              defaultValue={creditCardFee}
              onValueChange={setCreditCardFee}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">
                  Paid by user (added to ticket price)
                </SelectItem>
                <SelectItem value="organizer">
                  Paid by the organizer (cut from payout)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* <Button type="submit" className="w-full">
            Save Fee Settings
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
}
