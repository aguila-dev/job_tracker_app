# Job Tracker UI Style Guide

This document outlines the design system and UI components for the Job Tracker application.

## Colors

We use a consistent color palette throughout the application, defined in `tailwind.config.js`:

- **Primary**: `#4F46E5` (Indigo-600) - Main brand color, used for primary actions, active states, and key UI elements
- **Secondary**: `#0EA5E9` (Sky-500) - Used for secondary actions and complementary UI elements
- **Accent**: `#8B5CF6` (Violet-500) - Used sparingly for highlighting important elements
- **Neutral**: `#F3F4F6` (Gray-100) - Used for page backgrounds and subtle UI elements
- **Light Background**: `#FFFFFF` - Used for cards, containers, and content areas
- **Light Text**: `#1F2937` (Gray-800) - Primary text color

## Typography

- **Base Font**: System font stack
- **Headings**: Font weight 700 (bold)
- **Body Text**: Font weight 400 (regular)
- **Font Sizes**:
  - Headings: text-xl to text-3xl
  - Body: text-sm to text-base
  - Small text: text-xs

## Components

### Buttons

Primary Button:
```jsx
<button className="rounded-xl bg-primary px-4 py-2 font-medium text-white shadow-sm transition-all duration-200 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
  Button Text
</button>
```

Secondary Button:
```jsx
<button className="rounded-xl bg-white px-4 py-2 font-medium text-primary shadow-sm transition-all duration-200 hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50">
  Button Text
</button>
```

Outline Button:
```jsx
<button className="rounded-xl border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50">
  Button Text
</button>
```

### Cards

Standard Card:
```jsx
<div className="rounded-xl bg-white p-6 shadow-card">
  Card Content
</div>
```

Interactive Card:
```jsx
<div className="rounded-xl bg-white p-3 shadow-card transition-shadow hover:shadow-hover">
  Card Content
</div>
```

### Tables

Table Container:
```jsx
<table className="min-w-full overflow-hidden rounded-xl border-collapse shadow-card">
  <thead>
    <tr className="bg-neutral">
      <th className="border-b p-3 text-left font-semibold text-gray-700">Header</th>
    </tr>
  </thead>
  <tbody>
    <tr className="cursor-pointer transition-colors duration-150 hover:bg-neutral">
      <td className="border-b p-3 font-medium">Content</td>
    </tr>
  </tbody>
</table>
```

### Form Elements

Input Field:
```jsx
<input
  type="text"
  className="min-h-12 w-full rounded-xl border-none bg-neutral px-4 py-3 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
/>
```

Checkbox:
```jsx
<input
  type="checkbox"
  className="h-5 w-5 rounded text-primary focus:ring-primary"
/>
```

### Notifications

Success:
```jsx
<div className="rounded-xl bg-green-50 p-6 text-green-600 shadow-card">
  <div className="flex items-center">
    <svg className="mr-3 h-6 w-6 text-green-500" />
    <p className="font-medium">Success message</p>
  </div>
</div>
```

Error:
```jsx
<div className="rounded-xl bg-red-50 p-6 text-red-600 shadow-card">
  <div className="flex items-center">
    <svg className="mr-3 h-6 w-6 text-red-500" />
    <p className="font-medium">Error message</p>
  </div>
</div>
```

## Spacing

- Use multiples of 4 for spacing (p-4, m-4, etc.)
- Use consistent spacing between related elements

## Borders and Shadows

- Rounded corners: rounded-xl (1rem)
- Card shadow: shadow-card
- Hover shadow: shadow-hover

## Animations and Transitions

- Use transitions for hover and focus states
- Keep animations subtle and functional
- Standard transition: transition-all duration-150

## Accessibility

- Ensure sufficient color contrast
- Use proper semantic HTML elements
- Include focus states for keyboard navigation
- Add aria attributes where needed

### Navigation

Navigation Link:
```jsx
<NavLink
  to="/path"
  end={true}
  className={({ isActive }) =>
    `rounded-xl px-4 py-2 font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary text-white'
        : 'text-gray-700 hover:bg-neutral'
    }`
  }
>
  Link Text
</NavLink>
```

## Best Practices

1. **Consistency**: Use the defined color palette and component styles
2. **Simplicity**: Keep UI clean and focused
3. **Responsiveness**: Design for mobile first, then expand for larger screens
4. **Performance**: Minimize unnecessary animations and effects
5. **Maintainability**: Use Tailwind classes in a consistent manner
6. **Navigation**: Always add the `end={true}` prop to NavLink components for proper active state highlighting