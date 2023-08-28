import * as React from "react";

import { Button } from "src/@/components/ui/button";
import { type Score } from "@prisma/client";
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

type LeaderboardCardProps = {
  fasterTimes: Score[];
  slowerTimes: Score[];
  currentTime: number;
  rank: number;
};

export function ScoreboardCard({
  fasterTimes,
  slowerTimes,
  currentTime,
  rank,
}: LeaderboardCardProps) {
  return (
    <Card className="w-[350px] border-primary bg-secondary shadow-lg shadow-slate-400">
      <CardHeader>
        <CardTitle className="text-slate-700">
          Check out your position on the leaderboard!
        </CardTitle>
        <CardDescription>You are currently ranked {rank} in the world!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <p>Times:</p>
            <ol>
              {fasterTimes?.map((score, index) => (
                <li key={index}>{score.time}</li>
              ))}
              <li>{currentTime}</li>
              {slowerTimes?.map((score, index) => (
                <li key={index}>{score.time}</li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex">
        <Button type="submit" className="w-full" variant="outline">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
