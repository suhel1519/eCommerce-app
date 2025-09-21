import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  width?: string;
  showShortcut?: boolean;
  shortcutText?: string;
  onSearch?: (value: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  width = "w-64",
  showShortcut = true,
  shortcutText = "⌘/",
  onSearch,
  className = ""
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        className={`pl-10 ${showShortcut ? 'pr-12' : 'pr-4'} h-9 ${width} bg-muted/30 border-border text-card-foreground placeholder:text-muted-foreground rounded-lg`}
        aria-label="Search"
      />
      {showShortcut && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
          {shortcutText}
        </div>
      )}
    </div>
  );
};
