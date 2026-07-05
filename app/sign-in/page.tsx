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

export default function Signin() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-gray-200  shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-black">
            Sign In
          </CardTitle>
          <CardDescription className="text-gray-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form className="text-gray-600">
          <CardContent className="space-y-4">
            <div>
              {" "}
              <label htmlFor="email">Email</label>
              <Input
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
                id="password"
                type="password"
                placeholder="john Doe "
                minLength={8}
                required
                className="border-gray-300 focus:border-primary focus:ring-primary"
              />
            </div>
          </CardContent>

          <CardFooter  className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="cursor-pointer w-full bg-primary hover:bg-primary/90"
            >
              {" "}
              Sign In
            </Button>
            <p className="text-center text-sm text-gray-600 cursor-pointer">
              Dont have an account <Link href="/sign-up">Sign-Up</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
