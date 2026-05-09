/\*\*

- FOOTER COMPONENT DOCUMENTATION
-
- Comprehensive guide for the Footer component implementation.
- Includes structure, customization, and asset management.
  \*/

# Footer Component Guide

## Overview

The Footer component is a professional, fully-responsive footer section for the New Generation Health Center website. It includes clinic information, quick links, contact details, social media, and legal links.

## Component Location

- **File**: `src/components/Footer.tsx`
- **Exports**: `Footer` (React.FC with ref support)
- **Import**: `import { Footer } from '@/components'`

## Structure

### Layout (Responsive)

#### Desktop (1024px+)

```
[Logo & About] [Services] [Company] [Contact & Hours]
[Copyright]    [Legal Links]
```

- 4-column grid layout
- Full-width footer
- Divider between main content and bottom section

#### Tablet (641px - 1023px)

```
[Logo & About] [Services]
[Company]      [Contact & Hours]
[Copyright]    [Legal Links]
```

- 2-column grid layout

#### Mobile (320px - 640px)

```
[Logo & About]
[Services]
[Company]
[Contact & Hours]
[Copyright]
[Legal Links]
```

- Single column, stacked vertically

### Sections

#### 1. About Section (Column 1)

- **Logo**: Circular badge with "G" icon (40px)
- **Clinic Name**: "New Generation Health Center" (18px, semibold)
- **Description**: Brief clinic tagline (14px, secondary text)
- **Social Icons**: 4 icons in a row (24px each)
  - Facebook
  - Twitter
  - LinkedIn
  - Instagram
- **Styling**: Icons in 40px rounded squares with hover effects

#### 2. Services Section (Column 2)

- **Heading**: "Services" (16px, semibold)
- **Links**:
  - General Checkup
  - Dental Care
  - Surgery
  - Laboratory
- **Styling**: Text links with hover color change (to primary blue)

#### 3. Company Section (Column 3)

- **Heading**: "Company" (16px, semibold)
- **Links**:
  - About Us
  - Our Team
  - Careers
  - Blog
- **Styling**: Text links with hover color change (to primary blue)

#### 4. Contact Section (Column 4)

- **Contact Information** (with icons):
  - **Phone**: "+1 (234) 567-890" (phone icon)
  - **Email**: "info@newgen-health.com" (email icon)
  - **Address**: "123 Health Street, Medical City, MC 12345" (location icon)
- **Operating Hours**:
  - Mon - Fri: 8:00 AM - 6:00 PM
  - Sat - Sun: Closed
- **Styling**: Icons (20px) with text labels and values

#### 5. Bottom Section

- **Left**: Copyright notice
- **Right**: Legal links
  - Privacy Policy
  - Terms of Service
  - Cookie Policy
- **Divider**: Horizontal line above (subtle)

## Styling Details

### Colors

- **Background**: Secondary (#0F172A) - dark navy
- **Text Primary**: White
- **Text Secondary**: #475569 (for labels)
- **Accent**: Primary (#2E4BFF) - on hover
- **Border**: #E2E8F0 with 20% opacity

### Spacing

- **Top Padding**: 64px (mobile), 80px (tablet), 96px (desktop)
- **Bottom Padding**: 32px
- **Column Gap**: 32px
- **Link Spacing**: 12px between items
- **Icon Gap**: 12px between social icons
- **Section Divider**: 32px top and bottom

### Typography

- **Headings**: 16px, semibold, white
- **Links**: 14px, regular, secondary text, hover to primary
- **Labels**: 12px, secondary text
- **Copyright**: 14px, secondary text

### Hover Effects

- **Links**: Smooth color transition (200ms) to primary blue (#2E4BFF)
- **Social Icons**: Background changes to primary blue, icon brightness increases
- **Contact Links**: Color change to primary blue on hover

## Props

```typescript
interface FooterProps {
  clinicName?: string; // Default: "New Generation Health Center"
  clinicDescription?: string; // Default: clinic tagline
  onContactClick?: () => void; // Callback for contact interactions
}
```

### Usage Examples

#### Basic Usage

```tsx
<Footer />
```

#### Custom Clinic Name

```tsx
<Footer
  clinicName="Custom Health Center"
  clinicDescription="Your health is our priority"
/>
```

#### With Contact Handler

```tsx
<Footer
  onContactClick={() => {
    console.log("Contact section clicked");
  }}
/>
```

## Images & Icons

All icons are sourced from the centralized `IMAGES` constant in `src/constants/images.ts`.

### Icon List

- `IMAGES.iconFacebook` - Facebook social icon
- `IMAGES.iconTwitter` - Twitter social icon
- `IMAGES.iconLinkedIn` - LinkedIn social icon
- `IMAGES.iconInstagram` - Instagram social icon
- `IMAGES.iconEmail` - Email/contact icon
- `IMAGES.iconPhone` - Phone/contact icon
- `IMAGES.iconLocation` - Location/address icon

### Easy Replacement

To replace any icon:

1. **Open** `src/constants/images.ts`
2. **Find** the icon constant (e.g., `iconFacebook`)
3. **Replace** the URL with your new icon
4. **Save** - all components automatically use the new icon

Example:

```typescript
// Before
iconFacebook: "data:image/svg+xml,%3Csvg...",

// After (using new URL)
iconFacebook: "https://your-icon-url.com/facebook.svg",
```

### Icon Specifications

All icons follow these standards:

- **Format**: SVG (scalable, no pixelation)
- **Size**: 24px (auto-scales with CSS)
- **Color**: Primary blue (#2E4BFF) in the SVG code
- **Style**: Solid, clean, professional medical theme

## Customization

### Change Clinic Information

```tsx
<Footer
  clinicName="Your Clinic Name"
  clinicDescription="Your clinic's mission statement"
/>
```

### Change Links

Edit the component to modify:

- Service links (line ~47)
- Company links (line ~54)
- Legal links (line ~61)

### Change Contact Information

Edit hardcoded values (lines ~129-152):

- Phone: `+1 (234) 567-890`
- Email: `info@newgen-health.com`
- Address: `123 Health Street, Medical City, MC 12345`
- Hours: Operating hours

### Change Social Media Links

Update the `href` attributes in social icon anchors (lines ~80-116).

## Responsive Behavior

### Mobile Optimization

- Single column layout
- Full-width sections
- Touch-friendly icon sizes (40px)
- Stacked footer sections
- Bottom section: Stacked vertically (copyright above legal)

### Tablet Optimization

- 2-column grid
- Adjusted spacing
- Contact section spans full width or combines with company

### Desktop Optimization

- 4-column grid
- Full spacing restored
- Side-by-side copyright and legal links

## Accessibility

- **Alt Text**: All icons have descriptive alt text
- **ARIA Labels**: Social icons have `aria-label` attributes
- **Semantic HTML**: Uses proper footer, heading, and link elements
- **Color Contrast**: Meets WCAG AA standards
- **Focus States**: Links are keyboard accessible with visible focus rings

## Performance

- **SVG Icons**: Embedded as data URIs (no extra HTTP requests)
- **Lazy Loading**: Not needed (all content visible in footer)
- **CSS**: Tailwind classes (tree-shaken at build time)
- **Bundle Impact**: Minimal (~5KB gzipped)

## Integration with App

### In App.tsx

```tsx
import { Footer } from "./components";

function App() {
  const handleContactClick = () => {
    // Handle contact interactions
  };

  return (
    <>
      <Navbar />
      <main>{/* Page content */}</main>
      <Footer onContactClick={handleContactClick} />
    </>
  );
}
```

## Common Tasks

### Change Footer Background Color

Update the className on the footer element:

```tsx
// Current
className = "bg-secondary...";

// To change to white
className = "bg-white...";
```

### Add More Social Media Icons

1. Add new icon to `IMAGES` constant
2. Add new anchor link in the social icons section
3. Include alt text and aria-label

### Modify Operating Hours

Find and update the hours section (lines ~154-157):

```tsx
<p className="text-sm text-white">Mon - Fri: 8:00 AM - 6:00 PM</p>
<p className="text-sm text-white">Sat - Sun: Closed</p>
```

### Add Newsletter Signup

Add a new section or extend the contact column with a form element.

### Change Footer Link Structure

Modify the arrays at the beginning of the component:

- `serviceLinks`
- `companyLinks`
- `legalLinks`

## Design System Integration

The Footer uses the following design system components and tokens:

### Colors

- Primary: `#2E4BFF` (hover effects)
- Secondary: `#0F172A` (background)
- Text Secondary: `#475569` (labels)

### Typography

- Font Family: Inter
- Font Sizes: 12px, 14px, 16px, 18px
- Font Weights: regular (400), semibold (600)

### Spacing

- Uses standard spacing scale (4px, 8px, 12px, 16px, 32px)

### Shadows

- No shadows (clean, modern footer)

### Borders

- Subtle divider line with reduced opacity

## Browser Support

- Chrome/Edge: ✓
- Firefox: ✓
- Safari: ✓
- Mobile browsers: ✓
- IE11: ✗ (not supported)

## Testing Checklist

- [ ] Footer renders on all pages
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] All links are clickable
- [ ] Social media icons display correctly
- [ ] Contact icons display correctly
- [ ] Hover effects work smoothly
- [ ] Colors match design system
- [ ] Spacing is consistent
- [ ] Copyright text is current year
- [ ] No console errors

## Future Enhancements

- [ ] Newsletter subscription form
- [ ] Contact form integration
- [ ] Dynamic social media links from backend
- [ ] Multi-language support
- [ ] Footer widget system
- [ ] Analytics tracking on footer links
- [ ] Footer customization per page
