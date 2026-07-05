"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "radix-ui";
import { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
    } catch (err) {
      setError("An Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-gray-200  shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign Up
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create an account to start tracking your job applications
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="text-gray-600">
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {" "}
              <label htmlFor="name" className="text-gray-700">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                placeholder="john Doe "
                required
              />
            </div>

            <div>
              {" "}
              <label htmlFor="email">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="john@example.com"
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>

            <div>
              {" "}
              <label htmlFor="password">Password</label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="john Doe "
                minLength={8}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="cursor-pointer w-full bg-primary hover:bg-primary/90"
            >
              {" "}
              Sign Up
            </Button>
            <p className="text-center text-sm text-gray-600 cursor-pointer">
              Already have an account <Link href="/sign-in">Sign-In</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
