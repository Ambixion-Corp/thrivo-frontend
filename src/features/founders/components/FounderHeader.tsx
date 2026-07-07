import { Founder } from "../types";
import { MapPin, Globe, Twitter, Linkedin } from "lucide-react";

interface FounderHeaderProps {
  founder: Founder;
}

export function FounderHeader({ founder }: FounderHeaderProps) {
  return (
    <div className="relative rounded-3xl bg-card border border-border shadow-sm overflow-hidden mb-6">
      {/* Decorative Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C6D8]/10 via-transparent to-[#8DEE5F]/10 opacity-50" />
      
      <div className="relative p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
        {/* Avatar Placeholder */}
        <div className="shrink-0">
          <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-tr from-[#00C6D8] to-[#8DEE5F] p-1 shadow-lg shadow-[#00C6D8]/20">
            <div className="h-full w-full rounded-full bg-background flex items-center justify-center border-4 border-background">
              {founder.avatarUrl ? (
                <img src={founder.avatarUrl} alt={founder.name} className="h-full w-full rounded-full object-cover" />
              ) : (
                <span className="text-3xl sm:text-5xl font-bold text-foreground">
                  {founder.name.charAt(0)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
                {founder.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mt-1 font-medium">
                {founder.headline}
              </p>
            </div>
            
            {/* Actions / Socials */}
            <div className="flex items-center gap-3">
              {founder.socials.twitter && (
                <a href={founder.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {founder.socials.linkedin && (
                <a href={founder.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {founder.socials.website && (
                <a href={founder.socials.website} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <MapPin className="h-4 w-4" />
            <span>{founder.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
