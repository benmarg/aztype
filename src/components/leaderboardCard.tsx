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

export function LeaderboardCard() {
  return (
    <Card className="w-[350px] border-primary bg-secondary shadow-lg shadow-slate-400">
      <CardHeader>
        <CardTitle className="text-slate-700">
          Add your time to the leaderboard!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your Nickname" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex">
        <Button type="submit" className="w-full" variant="outline">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
