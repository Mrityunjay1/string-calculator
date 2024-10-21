"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { add } from "../utils/calculator";

export default function StringCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = () => {
    try {
      const sum = add(input.trim());
      setResult(sum);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  const formatInput = (input: string) => {
    return input.replace(/\n/g, "\\n");
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">String Calculator</CardTitle>
        <CardDescription>
          Enter numbers separated by commas or custom delimiters
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Input
              id="input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., 1,2,3 or //;\n1;2;3"
              className="w-full"
            />
          </div>
          <Button onClick={handleCalculate} className="w-full">
            Calculate
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start w-full">
        {result !== null && (
          <Alert className="w-full">
            <AlertTitle>Result</AlertTitle>
            <AlertDescription>
              Input: {formatInput(input)}
              <br />
              Sum: {result}
            </AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert variant="destructive" className="w-full mt-2">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
}
