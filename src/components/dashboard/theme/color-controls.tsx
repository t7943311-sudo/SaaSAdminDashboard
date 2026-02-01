'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ColorControl } from "./color-control";

interface ColorControlsProps {
    theme: any;
    onColorChange: (colorName: any, newHsl: { h: number; s: number; l: number; }) => void;
}

const coreColors = ['primary', 'secondary', 'accent', 'destructive'];
const backgroundColors = ['background', 'foreground', 'card', 'cardForeground', 'popover', 'popoverForeground'];
const utilityColors = ['muted', 'mutedForeground', 'border', 'input', 'ring'];


export function ColorControls({ theme, onColorChange }: ColorControlsProps) {
    return (
        <Accordion type="multiple" defaultValue={['core', 'backgrounds']} className="w-full">
            <AccordionItem value="core">
                <AccordionTrigger>Core Palette</AccordionTrigger>
                <AccordionContent className="space-y-4">
                    {coreColors.map(name => (
                        <ColorControl key={name} name={name} value={theme[name]} onChange={(hsl) => onColorChange(name, hsl)} />
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="backgrounds">
                <AccordionTrigger>Surfaces & Text</AccordionTrigger>
                <AccordionContent className="space-y-4">
                     {backgroundColors.map(name => (
                        <ColorControl key={name} name={name} value={theme[name]} onChange={(hsl) => onColorChange(name, hsl)} />
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="utility">
                <AccordionTrigger>Utility & Borders</AccordionTrigger>
                <AccordionContent className="space-y-4">
                    {utilityColors.map(name => (
                        <ColorControl key={name} name={name} value={theme[name]} onChange={(hsl) => onColorChange(name, hsl)} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
