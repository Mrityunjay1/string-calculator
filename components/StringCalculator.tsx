"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
      console.log("Calculating with input:", input);
      const sum = add(input);
      console.log("Sum returned from add function:", sum);
      setResult(sum);
      setError(null);
    } catch (err) {
      console.error("Error in calculation:", err);
      setError(err instanceof Error ? err.message : String(err));
      setResult(null);
    }
  };

  const formatInput = (input: string) => {
    return input.replace(/\n/g, "\\n");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleCalculate();
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">String Calculator</CardTitle>
        <CardDescription>
          Enter numbers separated by commas or newlines. Use custom delimiters
          with //[delimiter]\n
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Textarea
              id="input"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="e.g., 1,2,3 or 1\n2,3 or //;\n1;2;3"
              className="w-full h-24"
              aria-label="Enter numbers separated by commas or custom delimiters"
            />
          </div>
          <Button
            onClick={handleCalculate}
            className="w-full"
            aria-label="Calculate sum"
          >
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
