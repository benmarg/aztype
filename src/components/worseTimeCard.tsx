import * as React from "react";

import { Button } from "src/@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/@/components/ui/card";
import { Input } from "src/@/components/ui/input";
import { Label } from "src/@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/@/components/ui/select";

type WorseTimeCardProps = {
  previousTime: number | undefined;
  currentTime: number;
};

export function WorseTimeCard({
  previousTime,
  currentTime,
}: WorseTimeCardProps) {
  return (
    <Card className="w-[350px] border-primary bg-secondary shadow-lg shadow-slate-400">
      <CardHeader>
        <CardTitle className="text-slate-700">
          Your didn&apos;t quite beat your previous time!
        </CardTitle>
        <CardDescription className="pt-4">
          Your time was {(currentTime - previousTime!).toFixed(3)} seconds
          slower. Please try again!
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
