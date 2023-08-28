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
        <CardDescription>
          You are currently rank {rank} in the world!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center">
          <div className="flex flex-col space-y-1.5 overflow-hidden">
            <p>Times:</p>
            <ol>
              {fasterTimes?.map((score, index) => (
                <li key={index}>
                  {rank - Math.abs(index - fasterTimes.length)}. {score.time}{" "}
                  {score.nickname}
                </li>
              ))}
              <li className="text-[#A4AC96]">
                {rank}. {currentTime} Your High Score
              </li>
              {slowerTimes?.map((score, index) => (
                <li key={index}>
                  {rank + (index + 1)}. {score.time} {score.nickname}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
