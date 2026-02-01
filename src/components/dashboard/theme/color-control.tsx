'use client';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface ColorControlProps {
    name: string;
    value: { h: number; s: number; l: number };
    onChange: (newHsl: { h: number; s: number; l: number }) => void;
}

export function ColorControl({ name, value, onChange }: ColorControlProps) {
    const handleSliderChange = (type: 'h' | 's' | 'l') => (newValue: number[]) => {
        onChange({ ...value, [type]: newValue[0] });
    };

    return (
        <div className="space-y-4 rounded-lg border p-4">
            <div className="flex justify-between items-center">
                <Label className="capitalize font-semibold">{name.replace(/-/g, ' ')}</Label>
                <div style={{ backgroundColor: `hsl(${value.h}, ${value.s}%, ${value.l}%)` }} className="w-8 h-8 rounded-md border" />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor={`${name}-h`} className="text-xs">Hue</Label>
                    <span className="text-xs w-12 text-right">{value.h}°</span>
                </div>
                <Slider id={`${name}-h`} min={0} max={360} step={1} value={[value.h]} onValueChange={handleSliderChange('h')} />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center justify-between">
                    <Label htmlFor={`${name}-s`} className="text-xs">Saturation</Label>
                    <span className="text-xs w-12 text-right">{value.s}%</span>
                </div>
                <Slider id={`${name}-s`} min={0} max={100} step={1} value={[value.s]} onValueChange={handleSliderChange('s')} />
            </div>
            <div className="grid gap-2">
                 <div className="flex items-center justify-between">
                    <Label htmlFor={`${name}-l`} className="text-xs">Lightness</Label>
                    <span className="text-xs w-12 text-right">{value.l}%</span>
                </div>
                <Slider id={`${name}-l`} min={0} max={100} step={1} value={[value.l]} onValueChange={handleSliderChange('l')} />
            </div>
        </div>
    );
}
