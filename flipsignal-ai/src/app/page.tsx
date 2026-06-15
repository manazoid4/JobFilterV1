import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TIERS = [
  {
    name: "Free",
    price: "£0",
    features: ["Limited searches", "Basic alerts", "Manual deal scoring"],
  },
  {
    name: "Pro",
    price: "£19/mo",
    features: ["AI deal discovery", "Profit engine", "Daily opportunity feed", "Portfolio tracking", "Listing generator", "Negotiation assistant"],
  },
  {
    name: "Elite",
    price: "£49/mo",
    features: ["Full automation", "Predictive sourcing engine", "Category intelligence", "Telegram/Discord alerts", "AI flipping copilot", "Batch deal analysis"],
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">FlipSignal AI</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          AI-powered marketplace arbitrage engine. Find undervalued items, predict resale value, and turn
          marketplace browsing into structured profit decisions.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/sign-up">
            <Button size="lg">Get started free</Button>
          </Link>
          <Link href="/sign-in">
            <Button size="lg" variant="outline">Sign in</Button>
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-6 sm:grid-cols-3">
        {TIERS.map((tier) => (
          <Card key={tier.name}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <p className="text-2xl font-bold">{tier.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {tier.features.map((f) => (
                  <li key={f}>&bull; {f}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
