import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Feature } from "@/constants/landing";

interface FeatureCardProps {
  feature: Feature;
}

export function FeatureCard({ feature }: Readonly<FeatureCardProps>) {
  const Icon = feature.icon;

  return (
    <Card className="group border transition-all duration-200 hover:border-primary/50 hover:shadow-md">
      <CardHeader className="p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-base font-semibold text-foreground">
          {feature.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="text-sm leading-relaxed">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
