import { Badge } from "@/components/ui/badge";

/** Colored 0-100 score badge: green >= 70, amber >= 40, red otherwise. */
export function ScoreBadge({ score, label }: { score: number; label?: string }) {
  const variant = score >= 70 ? "success" : score >= 40 ? "warning" : "destructive";
  return (
    <Badge variant={variant}>
      {label ? `${label}: ` : ""}
      {score}/100
    </Badge>
  );
}
