import SiteHeader from "@/components/SiteHeader";
import { profile } from "@/lib/data";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1100px] overflow-x-clip px-6">
      <SiteHeader current="blog" />
      {children}
      <footer className="border-t border-line py-8 text-[13px] text-muted">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
