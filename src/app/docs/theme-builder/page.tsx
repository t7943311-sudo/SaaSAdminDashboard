import { Callout } from '@/components/docs/callout';
import { CodeBlock } from '@/components/docs/code-block';
import Link from 'next/link';

export default function ThemeBuilderPage() {
  return (
    <>
      <h1 id="theme-builder">Theme Builder</h1>
      <p className="lead">
        The Theme Builder is a powerful no-code tool that allows for deep customization of your application's visual appearance.
      </p>

      <h2 id="how-it-works">How It Works</h2>
      <p>
        The application's theme is defined using CSS variables in <code>src/app/globals.css</code>. The Theme Builder, located at <code>/dashboard/theme</code>, provides a user-friendly interface to modify these variables in real-time.
      </p>
      <ul>
        <li><strong>Live Preview:</strong> As you adjust colors or layout properties in the control panel, the changes are instantly applied to a preview area.</li>
        <li><strong>CSS Generation:</strong> When you're satisfied with your changes, you can click "Get CSS Code" to generate a complete CSS stylesheet.</li>
        <li><strong>Applying the Theme:</strong> To make your changes permanent, copy the generated code and replace the entire content of your <code>src/app/globals.css</code> file.</li>
      </ul>

      <h2 id="customization-options">Customization Options</h2>
      <p>The Theme Builder allows you to control:</p>
      <ul>
          <li><strong>Colors:</strong> Adjust the HSL (Hue, Saturation, Lightness) values for all core colors, including primary, secondary, accent, background, and text colors.</li>
          <li><strong>Layout:</strong> Modify the global border-radius to make components more or less rounded.</li>
      </ul>

      <Callout>
        The Theme Builder is designed to be safe. It only allows you to change a predefined set of CSS variables, preventing you from accidentally breaking the application's layout.
      </Callout>
      
      <h2 id="extending-the-builder">Extending the Builder</h2>
      <p>
        You can easily add more customization options to the Theme Builder.
      </p>
      <ol>
        <li>Define a new CSS variable in <code>:root</code> inside <code>src/app/globals.css</code>.</li>
        <li>Update the initial theme state in <code>src/app/dashboard/theme/page.tsx</code> to include your new variable.</li>
        <li>Add a new control component (e.g., a slider or switch) to one of the control panels (e.g., <code>src/components/dashboard/theme/layout-controls.tsx</code>).</li>
        <li>Ensure the control updates the theme state, which will automatically apply the change and include it in the generated CSS.</li>
      </ol>

      <div className="mt-12 flex justify-end">
        <Link href="/docs/api-reference" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground no-underline hover:bg-primary/90">
            Next: API Reference
        </Link>
      </div>
    </>
  );
}
