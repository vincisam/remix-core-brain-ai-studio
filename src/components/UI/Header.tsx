import React from "react";
import { CoreBrainLogo } from "./CoreBrainLogo";
import { Menu } from "lucide-react";
import { CodeFile, UiTheme } from "../../types";

interface HeaderProps {
  files: CodeFile[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
  onTriggerRefactor: () => void;
  onTriggerGenerateTests: () => void;
  onTriggerExplain: () => void;
  onOpenDiffModal: () => void;
  onOpenGetCode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAiProcessing: boolean;
  currentTheme: UiTheme;
  onThemeChange: (theme: UiTheme) => void;
  onOpenAuthModal: () => void;
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  files,
  activeFileId,
  onSelectFile,
  activeTab,
  setActiveTab,
  currentTheme,
  onThemeChange,
  onOpenAuthModal,
  onToggleMobileMenu,
}) => {
  return (
    <nav id="header-nav" className="h-14 border-b border-border-color bg-header-bg flex items-center justify-between px-3 md:px-6 select-none shrink-0 font-sans shadow-sm z-50">
      {/* Left section: empty for balance */}
      <div className="flex-1 flex items-center">
        {onToggleMobileMenu && (
          <button 
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 text-text-muted hover:text-text-main transition mr-2"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {/* Center section: CORE_BRAIN Brand Logo */}
      <div className="flex justify-center items-center">
        <CoreBrainLogo size="md" showText={true} showSubtitle={false} />
      </div>

      {/* Right section: Auth */}
      <div className="flex-1 flex justify-end items-center space-x-3">
        <button 
          onClick={onOpenAuthModal}
          className="text-xs font-semibold text-text-muted hover:text-text-main transition px-3 py-1.5"
        >
          Log In
        </button>
        <button 
          onClick={onOpenAuthModal}
          className="text-xs font-semibold bg-accent-color text-white hover:opacity-90 transition px-4 py-1.5 rounded-xl"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};
