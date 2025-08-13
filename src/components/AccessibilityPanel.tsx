import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Accessibility, 
  Volume2, 
  Eye, 
  Type, 
  Underline, 
  Pause,
  X
} from "lucide-react";

interface AccessibilitySettings {
  readThisPage: boolean;
  highContrast: boolean;
  largerText: boolean;
  dyslexiaFont: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
}

const AccessibilityPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    readThisPage: false,
    highContrast: false,
    largerText: false,
    dyslexiaFont: false,
    underlineLinks: false,
    reduceMotion: false
  });
  
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);
  const currentUtterance = useRef<SpeechSynthesisUtterance | null>(null);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }

    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.current = window.speechSynthesis;
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  // Apply settings to document
  const applySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('accessibility-high-contrast');
    } else {
      root.classList.remove('accessibility-high-contrast');
    }

    // Larger text
    if (settings.largerText) {
      root.classList.add('accessibility-large-text');
    } else {
      root.classList.remove('accessibility-large-text');
    }

    // Dyslexia-friendly font
    if (settings.dyslexiaFont) {
      root.classList.add('accessibility-dyslexia-font');
    } else {
      root.classList.remove('accessibility-dyslexia-font');
    }

    // Underline links
    if (settings.underlineLinks) {
      root.classList.add('accessibility-underline-links');
    } else {
      root.classList.remove('accessibility-underline-links');
    }

    // Reduce motion
    if (settings.reduceMotion) {
      root.classList.add('accessibility-reduce-motion');
    } else {
      root.classList.remove('accessibility-reduce-motion');
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
      
      if (isOpen && e.key === 'Tab') {
        const focusableElements = panelRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleToggle = (key: keyof AccessibilitySettings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      
      // Handle text-to-speech
      if (key === 'readThisPage') {
        if (!prev[key]) {
          startReading();
        } else {
          stopReading();
        }
      }
      
      return newSettings;
    });
  };

  const startReading = () => {
    if (!speechSynthesis.current) return;
    
    // Stop any current speech
    speechSynthesis.current.cancel();
    
    // Get page text content
    const content = document.body.innerText;
    const utterance = new SpeechSynthesisUtterance(content);
    
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => {
      setIsReading(false);
      setSettings(prev => ({ ...prev, readThisPage: false }));
    };
    utterance.onerror = () => {
      setIsReading(false);
      setSettings(prev => ({ ...prev, readThisPage: false }));
    };
    
    currentUtterance.current = utterance;
    speechSynthesis.current.speak(utterance);
  };

  const stopReading = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel();
    }
    setIsReading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const accessibilityOptions = [
    {
      key: 'readThisPage' as keyof AccessibilitySettings,
      label: 'Read This Page',
      description: 'Text-to-speech for page content',
      icon: isReading ? Pause : Volume2
    },
    {
      key: 'highContrast' as keyof AccessibilitySettings,
      label: 'High Contrast',
      description: 'Increase color contrast for better visibility',
      icon: Eye
    },
    {
      key: 'largerText' as keyof AccessibilitySettings,
      label: 'Larger Text',
      description: 'Increase font size across the site',
      icon: Type
    },
    {
      key: 'dyslexiaFont' as keyof AccessibilitySettings,
      label: 'Dyslexia-Friendly Font',
      description: 'Use OpenDyslexic font for better readability',
      icon: Type
    },
    {
      key: 'underlineLinks' as keyof AccessibilitySettings,
      label: 'Underline Links',
      description: 'Add underlines to all clickable links',
      icon: Underline
    },
    {
      key: 'reduceMotion' as keyof AccessibilitySettings,
      label: 'Reduce Motion',
      description: 'Minimize animations and transitions',
      icon: Pause
    }
  ];

  return (
    <>
      {/* Accessibility Button */}
      <Button
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg glass"
        size="icon"
        aria-label="Open accessibility panel"
        aria-expanded={isOpen}
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleClose}
            aria-hidden="true"
          />
          
          {/* Panel */}
          <div className="fixed bottom-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
            <Card ref={panelRef} className="glass p-6" role="dialog" aria-label="Accessibility Settings">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Accessibility Options
                </h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleClose}
                  aria-label="Close accessibility panel"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {accessibilityOptions.map((option) => (
                  <div key={option.key} className="flex items-center justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <option.icon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <Label 
                          htmlFor={option.key}
                          className="text-sm font-medium text-foreground cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {option.description}
                        </p>
                      </div>
                    </div>
                    <Switch
                      id={option.key}
                      checked={settings[option.key]}
                      onCheckedChange={() => handleToggle(option.key)}
                      aria-describedby={`${option.key}-description`}
                    />
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Settings are saved automatically and persist across sessions
              </p>
            </Card>
          </div>
        </>
      )}

      {/* Live region for announcements */}
      <div 
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
        role="status"
      >
        {isReading && "Page reading started"}
      </div>

      {/* Skip link */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded"
      >
        Skip to main content
      </a>
    </>
  );
};

export default AccessibilityPanel;