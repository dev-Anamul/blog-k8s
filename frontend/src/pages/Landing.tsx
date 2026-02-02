import { useBlogs } from "@/hooks/use-blogs";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { RecentBlogsSection } from "@/components/landing/RecentBlogsSection";
import { CTASection } from "@/components/landing/CTASection";

const RECENT_BLOGS_COUNT = 4;

export function Landing() {
  const { blogs } = useBlogs();
  const recentBlogs = blogs.slice(0, RECENT_BLOGS_COUNT);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <RecentBlogsSection blogs={recentBlogs} />
      <CTASection />
    </div>
  );
}
