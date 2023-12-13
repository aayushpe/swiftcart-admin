import { CogIcon } from "lucide-react";

interface HeadingProps {
  title: String;
  description: String;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <div className="flex items-center">
        <CogIcon className="w-6 h-6 mr-2" />
        <h2 className="text-3xl font-bold tracking-tight inline-block">{title}</h2>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
