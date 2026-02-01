'use client';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface LayoutControlsProps {
    theme: any;
    onRadiusChange: (newRadius: number) => void;
}

export function LayoutControls({ theme, onRadiusChange }: LayoutControlsProps) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor="radius">Border Radius</Label>
                    <span className="text-sm w-12 text-right">{theme.radius.toFixed(2)}rem</span>
                </div>
                <Slider 
                    id="radius" 
                    min={0} max={2} step={0.05} 
                    value={[theme.radius]} 
                    onValueChange={(val) => onRadiusChange(val[0])} 
                />
                 <p className="text-xs text-muted-foreground">Controls the roundness of components like cards and buttons.</p>
            </div>
        </div>
    );
}
