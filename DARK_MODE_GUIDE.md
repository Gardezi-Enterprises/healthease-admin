# Dark Mode Implementation Guide

## Overview
The application includes a complete dark mode implementation with the following features:

- ✅ **Light mode as default** - The application starts in light mode by default
- ✅ **Theme toggle** - Users can switch between light and dark modes using the toggle button
- ✅ **Persistent preference** - User's theme choice is saved in localStorage
- ✅ **Responsive design** - Theme toggle works on both desktop and mobile
- ✅ **Complete styling** - All components are styled for both light and dark modes

## How It Works

### 1. Theme Context (`src/contexts/ThemeContext.tsx`)
The theme state is managed by a React Context that:
- Defaults to light mode (`isDark: false`)
- Saves user preference to localStorage
- Applies the `dark` class to the document root element
- Provides a `toggleTheme` function to switch themes

### 2. Theme Toggle Button (`src/components/Navigation.tsx`)
The navigation component includes theme toggle buttons:
- **Desktop**: Located in the top navigation bar
- **Mobile**: Located in the mobile menu
- **Icons**: Sun icon for dark mode, Moon icon for light mode
- **Accessibility**: Proper button styling and hover states

### 3. CSS Variables (`src/index.css`)
Complete color scheme defined for both themes:
- **Light mode**: Professional medical theme with deep blue and teal
- **Dark mode**: Dark backgrounds with brighter accent colors
- **CSS Variables**: All colors use HSL values for easy customization

### 4. Tailwind Configuration (`tailwind.config.ts`)
- Dark mode is configured with `darkMode: ["class"]`
- This allows manual control of dark mode via the `dark` class

## Usage

### For Users
1. Click the theme toggle button (Sun/Moon icon) in the navigation
2. The theme will switch immediately
3. Your preference will be remembered for future visits

### For Developers
The theme context is available throughout the app:

```tsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className="bg-background text-foreground">
      <button onClick={toggleTheme}>
        {isDark ? 'Switch to Light' : 'Switch to Dark'}
      </button>
    </div>
  );
}
```

## Styling Guidelines

### Using Theme-Aware Classes
Always use Tailwind's theme-aware classes:
- `bg-background` instead of `bg-white`
- `text-foreground` instead of `text-black`
- `border-border` for consistent borders
- `bg-card` for card backgrounds

### CSS Variables
The theme system uses CSS custom properties:
- `--background`: Main background color
- `--foreground`: Main text color
- `--primary`: Primary brand color
- `--secondary`: Secondary accent color
- `--muted`: Muted text and backgrounds
- `--border`: Border colors

## Customization

### Adding New Colors
1. Add the color to both `:root` and `.dark` sections in `src/index.css`
2. Use HSL format: `hsl(hue saturation lightness)`
3. Add to Tailwind config if needed

### Modifying Theme Logic
The theme logic is centralized in `src/contexts/ThemeContext.tsx`:
- Change default theme by modifying the initial state
- Add system preference detection if needed
- Modify localStorage key name if required

## Browser Support
- Modern browsers with CSS custom properties support
- localStorage for preference persistence
- CSS Grid and Flexbox for layout

## Performance
- Theme switching is instant with CSS variables
- No re-renders required for theme changes
- Minimal JavaScript overhead 