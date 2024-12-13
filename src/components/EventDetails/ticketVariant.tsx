import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, MinusCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type TicketVariantProps = {
  variants: {
    name: string;
    stock: number;
    price: number;
    description: string;
  }[];
  onAddVariant: () => void;
  onInputChange: (index: number, field: string, value: string | number) => void;
  onDeleteVariant: (index: number) => void;
};

export default function TicketVariant({
  variants,
  onAddVariant,
  onInputChange,
  onDeleteVariant,
}: TicketVariantProps) {
  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Ticket Variants</CardTitle>
        <CardDescription>
          Add different ticket options for your event.
        </CardDescription>
      </CardHeader>
      {variants.map((variant, index) => (
        <CardContent key={index}>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor={`name-${index}`}>Name</Label>
              <Input
                id={`name-${index}`}
                type="text"
                className="w-full"
                value={variant.name}
                onChange={(e) => onInputChange(index, "name", e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                value={variant.description}
                onChange={(e) =>
                  onInputChange(index, "description", e.target.value)
                }
                className="min-h-16"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                <Label htmlFor={`stock-${index}`}>Stock</Label>
                <Input
                  id={`stock-${index}`}
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    onInputChange(index, "stock", parseInt(e.target.value))
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor={`price-${index}`}>Price</Label>
                <Input
                  id={`price-${index}`}
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    onInputChange(index, "price", parseFloat(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="grid gap-3 ">
              <Button
                size="sm"
                variant="secondary"
                className="gap-1 w-fit"
                onClick={() => onDeleteVariant(index)}
              >
                <MinusCircle className="h-3.5 w-3.5" />
                Remove Variant
              </Button>
            </div>
          </div>
        </CardContent>
      ))}
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={onAddVariant}
        >
          <PlusCircle className="h-3.5 w-3.5" />
          Add Variant
        </Button>
      </CardFooter>
    </Card>
  );
}
