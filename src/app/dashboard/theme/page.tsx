'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Code, Palette, Droplets, Paintbrush, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { ColorControls } from '@/components/dashboard/theme/color-controls';
import { LayoutControls } from '@/components/dashboard/theme/layout-controls';
import { ComponentPreview } from '@/components/dashboard/theme/component-preview';
import { CodeGenerationDialog } from '@/components/dashboard/theme/code-generation-dialog';

// Initial theme state, parsed from default globals.css
const initialTheme = {
  background: { h: 220, s: 39, l: 8 },
  foreground: { h: 210, s: 20, l: 98 },
  card: { h: 220, s: 39, l: 12 },
  cardForeground: { h: 210, s: 20, l: 98 },
  popover: { h: 220, s: 39, l: 8 },
  popoverForeground: { h: 210, s: 20, l: 98 },
  primary: { h: 239, s: 84, l: 69 },
  primaryForeground: { h: 210, s: 20, l: 98 },
  secondary: { h: 220, s: 13, l: 18 },
  secondaryForeground: { h: 210, s: 20, l: 98 },
  muted: { h: 220, s: 13, l: 18 },
  mutedForeground: { h: 220, s: 9, l: 46 },
  accent: { h: 187, s: 85, l: 53 },
  accentForeground: { h: 220, s: 39, l: 8 },
  destructive: { h: 0, s: 63, l: 31 },
  destructiveForeground: { h: 210, s: 20, l: 98 },
  border: { h: 220, s: 13, l: 18 },
  input: { h: 220, s: 13, l: 18 },
  ring: { h: 239, s: 84, l: 69 },
  radius: 1.0,
};

type Theme = typeof initialTheme;

export default function ThemeBuilderPage() {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [isClient, setIsClient] = useState(false);
  const [showCodeDialog, setShowCodeDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    for (const key in theme) {
      const property = `--${key}`;
      const value = theme[key as keyof Theme];
      if (typeof value === 'object' && value !== null && 'h' in value) {
        document.documentElement.style.setProperty(property, `${value.h} ${value.s}% ${value.l}%`);
      } else if (key === 'radius') {
        document.documentElement.style.setProperty(property, `${value}rem`);
      }
    }
  }, [theme, isClient]);
  
  const handleColorChange = (colorName: keyof Theme, newHsl: { h: number; s: number; l: number; }) => {
    setTheme(prev => ({ ...prev, [colorName]: newHsl }));
  };
  
  const handleRadiusChange = (newRadius: number) => {
    setTheme(prev => ({...prev, radius: newRadius}));
  };

  const handleReset = () => {
    setTheme(initialTheme);
    toast({ title: 'Theme Reset', description: 'The theme has been reset to its default values.' });
  };
  
  const generatedCss = useMemo(() => {
    let css = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n`;
    for (const key in theme) {
      const property = `--${key}`;
      const value = theme[key as keyof Theme];
      if (typeof value === 'object' && value !== null && 'h' in value) {
        css += `    ${property}: ${value.h} ${value.s}% ${value.l}%;\n`;
      } else if (key === 'radius') {
        css += `    ${property}: ${value}rem;\n`;
      }
    }
    css += `  }\n\n  .dark {\n`;
    css += `    --background: 0 0% 100%;\n`;
    css += `    --foreground: 224 71% 4%;\n`;
    css += `    --card: 0 0% 100%;\n`;
    css += `    --card-foreground: 224 71% 4%;\n`;
    css += `    --popover: 0 0% 100%;\n`;
    css += `    --popover-foreground: 224 71% 4%;\n`;
    css += `    --primary: 239 84% 69%;\n`;
    css += `    --primary-foreground: 210 20% 98%;\n`;
    css += `    --secondary: 210 40% 96.1%;\n`;
    css += `    --secondary-foreground: 222.2 84% 4.9%;\n`;
    css += `    --muted: 210 40% 96.1%;\n`;
    css += `    --muted-foreground: 215.4 16.3% 46.9%;\n`;
    css += `    --accent: 210 40% 96.1%;\n`;
    css += `    --accent-foreground: 222.2 84% 4.9%;\n`;
    css += `    --destructive: 0 84.2% 60.2%;\n`;
    css += `    --destructive-foreground: 0 0% 98%;\n`;
    css += `    --border: 214.3 31.8% 91.4%;\n`;
    css += `    --input: 214.3 31.8% 91.4%;\n`;
    css += `    --ring: 239 84% 69%;\n`;
    css += `  }\n}\n\n@layer base {\n  * {\n    @apply border-border;\n  }\n  body {\n    @apply bg-background text-foreground;\n  }\n}\n`;
    return css;
  }, [theme]);

  return (
    <>
      <CodeGenerationDialog 
        isOpen={showCodeDialog}
        onOpenChange={setShowCodeDialog}
        cssCode={generatedCss}
      />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2"><Palette /> Theme Builder</h1>
            <p className="text-muted-foreground">Customize the look and feel of your application.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}><RotateCcw /> Reset</Button>
            <Button onClick={() => setShowCodeDialog(true)}><Code /> Get CSS Code</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ---- CONTROLS PANEL ---- */}
          <div className="lg:col-span-4 xl:col-span-3">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Customize</CardTitle>
                <CardDescription>Modify the visual properties of your UI.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="colors" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="colors"><Droplets className="mr-2"/> Colors</TabsTrigger>
                    <TabsTrigger value="layout"><Paintbrush className="mr-2"/> Layout</TabsTrigger>
                  </TabsList>
                  <TabsContent value="colors" className="pt-4">
                    <ColorControls theme={theme} onColorChange={handleColorChange} />
                  </TabsContent>
                   <TabsContent value="layout" className="pt-4">
                    <LayoutControls theme={theme} onRadiusChange={handleRadiusChange} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* ---- PREVIEW PANEL ---- */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>Components will update as you make changes.</CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentPreview />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
