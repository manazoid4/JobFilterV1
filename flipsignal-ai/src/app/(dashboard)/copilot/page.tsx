"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CopilotResult } from "@/lib/ai/copilot";

export default function CopilotPage() {
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState<CopilotResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, description }),
      });
      if (!res.ok) throw new Error(await res.text());
      setResult(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold">Flip Copilot</h1>
      <p className="text-sm text-muted-foreground">
        Paste a listing URL and/or description to get true product identification, market value range,
        safe offer price, resale channels, risk flags, and a negotiation strategy.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input placeholder="Listing URL (optional)" value={url} onChange={(e) => setUrl(e.target.value)} />
        <textarea
          className="w-full rounded-md border border-border bg-background p-3 text-sm"
          rows={4}
          placeholder="Listing description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Run Copilot"}
        </Button>
      </form>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>{result.productId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>
              Market value range: {(result.marketValueRange.min / 100).toFixed(2)} - {(result.marketValueRange.max / 100).toFixed(2)}
            </p>
            <p>Safe offer: {(result.safeOfferCents / 100).toFixed(2)}</p>
            <p>Max buy: {(result.maxBuyCents / 100).toFixed(2)}</p>
            <p>Resale channels: {result.resaleChannels.join(", ")}</p>
            <p>Risk flags: {result.riskFlags.length ? result.riskFlags.join(", ") : "None"}</p>
            <p>Negotiation strategy: {result.negotiationStrategy}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
