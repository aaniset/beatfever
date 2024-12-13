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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { PlusCircle as PlusIcon, Trash as TrashIcon } from "lucide-react";

interface PromoCode {
  code: string;
  discountType: "flat" | "percent";
  discountValue: number;
  maxDiscount?: number;
  minOrderValue?: number;
}

export function PromoCodeForm() {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    { code: "", discountType: "flat", discountValue: 0 },
  ]);

  const addPromoCode = () => {
    setPromoCodes([
      ...promoCodes,
      { code: "", discountType: "flat", discountValue: 0 },
    ]);
  };

  const removePromoCode = (index: number) => {
    const newPromoCodes = [...promoCodes];
    newPromoCodes.splice(index, 1);
    setPromoCodes(newPromoCodes);
  };

  const updatePromoCode = (index: number, updatedPromoCode: Partial<PromoCode>) => {
    const newPromoCodes = [...promoCodes];
    newPromoCodes[index] = { ...newPromoCodes[index], ...updatedPromoCode };
    setPromoCodes(newPromoCodes);
  };

  return (
    <Card className="mx-auto max-w-lg">
      <CardHeader>
        <CardTitle className="text-xl">Add Promo Codes</CardTitle>
        <CardDescription>
          Add multiple promo codes for your event
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {promoCodes.map((promoCode, index) => (
            <div key={index} className="grid gap-4 p-4 border rounded">
              <div className="flex justify-between">
                <div className="grid gap-2">
                  <Label htmlFor={`promo-code-${index}`}>Promo Code</Label>
                  <Input
                    id={`promo-code-${index}`}
                    placeholder="PROMO2024"
                    value={promoCode.code}
                    onChange={(e) =>
                      updatePromoCode(index, { code: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  variant="ghost"
                  className="mt-6"
                  onClick={() => removePromoCode(index)}
                >
                  <TrashIcon className="w-5 h-5 text-red-500" />
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`discount-type-${index}`}>Discount Type</Label>
                <Select
                  defaultValue={promoCode.discountType}
                  onValueChange={(value) =>
                    updatePromoCode(index, { discountType: value as "flat" | "percent" })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flat">Flat Rate</SelectItem>
                    <SelectItem value="percent">Percentage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`discount-value-${index}`}>Discount Value</Label>
                <Input
                  id={`discount-value-${index}`}
                  type="number"
                  placeholder="0"
                  value={promoCode.discountValue}
                  onChange={(e) =>
                    updatePromoCode(index, { discountValue: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`max-discount-${index}`}>Maximum Discount Allowed</Label>
                <Input
                  id={`max-discount-${index}`}
                  type="number"
                  placeholder="0"
                  value={promoCode.maxDiscount || ""}
                  onChange={(e) =>
                    updatePromoCode(index, { maxDiscount: Number(e.target.value) })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`min-order-value-${index}`}>Minimum Order Value</Label>
                <Input
                  id={`min-order-value-${index}`}
                  type="number"
                  placeholder="0"
                  value={promoCode.minOrderValue || ""}
                  onChange={(e) =>
                    updatePromoCode(index, { minOrderValue: Number(e.target.value) })
                  }
                />
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={addPromoCode}>
            <PlusIcon className="w-5 h-5 mr-2" /> Add Another Promo Code
          </Button>
          <Button type="submit" className="w-full mt-4">
            Save Promo Codes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
