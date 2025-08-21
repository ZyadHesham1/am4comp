import type { LucideIcon } from "lucide-react"; // Import the type for icons

interface ValueCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export function ValueCard({ Icon, title, description }: ValueCardProps) {
  return (
    // The main card container. We use `group` to allow the icon to react on hover.
    // The magic happens in the `shadow-[...]` class.
    <div 
      className="
        group
        p-8 rounded-xl 
        bg-gray-50/50  // A very light, slightly transparent background
        transition-all duration-300
        hover:-translate-y-1 // A subtle lift on hover
        shadow-[-5px_-5px_12px_rgba(255,255,255,0.8),5px_5px_12px_rgba(0,0,0,0.08)]
      "
    >
      <div className="flex justify-center mb-4">
        <div className="p-4 bg-white rounded-full shadow-inner">
           {/* The icon will change color when the parent card is hovered */}
           <Icon className="h-8 w-8 text-gray-500 transition-colors duration-300 group-hover:text-blue-600" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}