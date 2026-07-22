import Link from "next/link";
import { ArrowRight, Briefcase, CheckCircle2, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import ImageTabs from "@/components/ui/image-tabs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1 ">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-32 ">
          <div className="mx-auto max-x-4xl  text-center">
            <h1 className="text-black mb-6 text-4xl font-bold">
              {" "}
              A better Way to track your job application{" "}
            </h1>
            <p className="text-muted-foreground  mb-10 text-xl">
              Capture, Organize , and manage your job search in one place.
            </p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/sign-up" className=" ">
                <Button
                  size="lg"
                  className="h-12 px-8 text-lg font-medium cursor-pointer  "
                >
                  Start for free <ArrowRight className="ml-2 " />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">
                Free forever. No credit card required
              </p>
            </div>
          </div>
        </section>

        {/* Hero images Section with Tabs */}

        <ImageTabs />

        {/* Features Section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 rounded-lg items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Organize Applications
                </h3>
                <p className="text-muted-foreground">
                  Create custom boards and columns to track your job
                  applications at every stage of the process.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Track Progress
                </h3>
                <p className="text-muted-foreground">
                  Monitor your application status from applied to interview and
                  offer with visual Kanban boards.
                </p>
              </div>

              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Stay Organized
                </h3>
                <p className="text-muted-foreground">
                  Never lose track of an application. Keep all your job search
                  activity in one place.
                </p>

                <div className="mt-6 flex flex-col items-start gap-4">
                  <Link
                    href="/sign-up"
                    className="inline-flex items-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-white hover:bg-primary/90"
                  >
                    Start for free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>

                  <p className="text-sm text-muted-foreground">
                    Free forever. No credit card required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
