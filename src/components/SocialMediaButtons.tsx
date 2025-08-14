import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialMediaButtonsProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

const SocialMediaButtons = ({ 
  variant = "outline", 
  size = "sm", 
  className = "" 
}: SocialMediaButtonsProps) => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/pratham-goyal-7a970529a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/campus-connect",
      color: "hover:text-pink-500"
    }
  ];

  return (
    <div className={`flex gap-3 ${className}`}>
      {socialLinks.map((social) => (
        <Button
          key={social.name}
          variant={variant}
          size={size}
          asChild
          className={`transition-colors ${social.color}`}
          aria-label={`Follow us on ${social.name}`}
        >
          <a 
            href={social.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <social.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{social.name}</span>
          </a>
        </Button>
      ))}
    </div>
  );
};

export default SocialMediaButtons;