/\*\*

- IMAGE PLACEMENTS & ASSET MAP
-
- This document maps all image placements in the design with exact specifications.
- Use this as a reference guide for implementing UI components.
-
- Format: [IMAGE_CONSTANT] | Position | Size | Aspect Ratio | Purpose
  \*/

# IMAGE PLACEMENT GUIDE

## HERO SECTION

| Image         | Position                           | Size                        | Aspect Ratio | Purpose                                         |
| ------------- | ---------------------------------- | --------------------------- | ------------ | ----------------------------------------------- |
| `images.hero` | Full-width background, top of page | 100vw × 500-600px (desktop) | 16:9         | Main hero visual, welcoming healthcare facility |

**Responsive Sizes:**

- Mobile: 100vw × 300-400px
- Tablet: 100vw × 400-500px
- Desktop: 100vw × 500-600px

---

## NAVBAR & HEADER

| Image              | Position           | Size    | Aspect Ratio | Purpose              |
| ------------------ | ------------------ | ------- | ------------ | -------------------- |
| `images.logoSmall` | Top left of navbar | 40-50px | 1:1 or 4:1   | Clinic logo/branding |

---

## TEAM / DOCTORS SECTION

| Image                     | Position                         | Size            | Aspect Ratio | Purpose                |
| ------------------------- | -------------------------------- | --------------- | ------------ | ---------------------- |
| `images.doctorPrimary`    | Featured doctor (left or center) | 300-400px width | 1:1 or 4:5   | Primary doctor profile |
| `images.doctorSecondary`  | Team grid, column 1              | 250-300px width | 1:1          | Team member profile    |
| `images.doctorTertiary`   | Team grid, column 2              | 250-300px width | 1:1          | Team member profile    |
| `images.doctorQuaternary` | Team grid, column 3              | 250-300px width | 1:1          | Team member profile    |

**Grid Layout:**

- Mobile: 1 column, full width with padding
- Tablet: 2 columns, equal width
- Desktop: 3-4 columns, equal width
- Gap: 24px (md) to 32px (lg)

---

## SERVICES SECTION

| Image                   | Position                         | Size            | Aspect Ratio | Purpose           |
| ----------------------- | -------------------------------- | --------------- | ------------ | ----------------- |
| `images.serviceCheckup` | Service card 1 (General Checkup) | 300-400px width | 16:9 or 4:3  | Service highlight |
| `images.serviceDental`  | Service card 2 (Dental Care)     | 300-400px width | 16:9 or 4:3  | Service highlight |
| `images.serviceSurgery` | Service card 3 (Surgery)         | 300-400px width | 16:9 or 4:3  | Service highlight |
| `images.serviceLab`     | Service card 4 (Laboratory)      | 300-400px width | 16:9 or 4:3  | Service highlight |

**Card Layout:**

- Mobile: 1 column, full width with padding
- Tablet: 2 columns, equal width
- Desktop: 3-4 columns, equal width
- Gap: 24px (md) to 32px (lg)
- Position: Top of card, above title and description
- Height: Auto-scale based on aspect ratio

---

## ABOUT SECTION

| Image                | Position                             | Size            | Aspect Ratio | Purpose                       |
| -------------------- | ------------------------------------ | --------------- | ------------ | ----------------------------- |
| `images.aboutClinic` | Right side on desktop, top on mobile | 300-500px width | 4:5 or 3:2   | Clinic interior or team photo |

**Layout:**

- Desktop: 2-column (text left, image right) or (image left, text right)
- Tablet: 2-column with adjusted sizing
- Mobile: Stacked vertically (image above or below text)
- Margin: 24px to 48px from text

---

## TESTIMONIALS SECTION

| Image                   | Position                 | Size    | Aspect Ratio | Purpose                        |
| ----------------------- | ------------------------ | ------- | ------------ | ------------------------------ |
| `images.patientAvatar1` | Above or left of quote 1 | 60-80px | 1:1          | Patient avatar (circular crop) |
| `images.patientAvatar2` | Above or left of quote 2 | 60-80px | 1:1          | Patient avatar (circular crop) |
| `images.patientAvatar3` | Above or left of quote 3 | 60-80px | 1:1          | Patient avatar (circular crop) |

**Layout:**

- Position: Circular crop (border-radius: 50%)
- Above testimonial quote or beside author name
- Margin: 8-16px from text
- Border: Optional 2-3px border in primary color

---

## APPOINTMENT/CTA SECTION

| Image                   | Position                           | Size                   | Aspect Ratio  | Purpose                       |
| ----------------------- | ---------------------------------- | ---------------------- | ------------- | ----------------------------- |
| `images.appointmentCTA` | Background (possibly with overlay) | Full width × 400-500px | 16:9 or wider | Call-to-action section visual |

**Implementation:**

- Use as background-image with CSS
- Optional gradient overlay (rgba) for text contrast
- Overlay opacity: 40-60% for readability
- Text layers: Heading and CTA button on top

---

## FOOTER

| Image                  | Position                   | Size                     | Aspect Ratio | Purpose               |
| ---------------------- | -------------------------- | ------------------------ | ------------ | --------------------- |
| `images.logoLarge`     | Bottom left or center      | 100-150px                | 1:1 or 4:1   | Clinic logo/branding  |
| `images.iconFacebook`  | Social links row, Column 1 | 24px (in 40px container) | 1:1          | Facebook social link  |
| `images.iconTwitter`   | Social links row, Column 1 | 24px (in 40px container) | 1:1          | Twitter/X social link |
| `images.iconLinkedIn`  | Social links row, Column 1 | 24px (in 40px container) | 1:1          | LinkedIn social link  |
| `images.iconInstagram` | Social links row, Column 1 | 24px (in 40px container) | 1:1          | Instagram social link |
| `images.iconEmail`     | Contact section, Column 4  | 20px inline              | 1:1          | Email contact link    |
| `images.iconPhone`     | Contact section, Column 4  | 20px inline              | 1:1          | Phone contact link    |
| `images.iconLocation`  | Contact section, Column 4  | 20px inline              | 1:1          | Address/location link |

**Footer Layout Structure:**

Desktop (1024px+):

```
┌─────────────────────────────────────────────────────────┐
│ [LOGO] [Services]    [Company]     [Contact & Hours]    │
│ Name   Gen Checkup   About Us      Phone                │
│ Desc   Dental Care   Our Team      Email                │
│ [●●●●] Surgery       Careers       Address              │
│        Lab           Blog          Hours                │
├─────────────────────────────────────────────────────────┤
│ © 2024 ...           Privacy | Terms | Cookie           │
└─────────────────────────────────────────────────────────┘
```

Tablet (641px - 1023px):

```
┌──────────────────────────────┐
│ [LOGO] [Services] [Company]  │
│ Name   Gen Checkup About Us  │
│ Desc   Dental Care Our Team  │
│ [●●●●] Surgery     Careers   │
│        Lab         Blog      │
├──────────────────────────────┤
│ [Contact & Hours]            │
│ Phone, Email, Address, Hours │
├──────────────────────────────┤
│ © 2024 ...                   │
│ Privacy | Terms | Cookie     │
└──────────────────────────────┘
```

Mobile (320px - 640px):

```
┌──────────────────────┐
│ [LOGO]               │
│ Name                 │
│ Description          │
│ [● ● ● ●]           │
├──────────────────────┤
│ Services             │
│ Gen Checkup          │
│ Dental Care          │
│ Surgery              │
│ Lab                  │
├──────────────────────┤
│ Company              │
│ About Us             │
│ Our Team             │
│ Careers              │
│ Blog                 │
├──────────────────────┤
│ Contact & Hours      │
│ Phone ...            │
│ Email ...            │
│ Address ...          │
│ Hours ...            │
├──────────────────────┤
│ © 2024 ...           │
│ Privacy              │
│ Terms                │
│ Cookie               │
└──────────────────────┘
```

**Social Icons Container:**

- Size: 40px × 40px rounded square
- Background: Primary light with 10% opacity (hover: full primary)
- Icon: 24px centered SVG (primary blue)
- Gap between icons: 12px
- Hover effect: Background becomes primary blue

**Contact Icons:**

- Size: 20px inline with text
- Color: Primary blue (#2E4BFF)
- Alignment: Left-aligned with text beside
- Gap: 12px between icon and text

**Spacing:**

- Top padding: 64px (mobile), 80px (tablet), 96px (desktop)
- Column gap: 32px
- Row gap: 32px
- Bottom padding: 32px
- Divider margin: 32px top/bottom
- Between sections (mobile): 24px

**Colors & Styling:**

- Background: Secondary (#0F172A)
- Text: White
- Labels: Secondary text (#475569)
- Icons: Primary blue (#2E4BFF)
- Hover: Icons/links change to primary blue
- Divider: Border color with 20% opacity

**Easy Icon Replacement:**

To replace any social or contact icon:

1. Open `src/constants/images.ts`
2. Find the icon constant (e.g., `iconFacebook`)
3. Replace the SVG data URI with new URL
4. Icons automatically update across the footer

All icon URLs must be HTTPS SVG format.

---

## BACKGROUND & DECORATIVE

| Image                      | Position                                 | Size          | Aspect Ratio | Purpose                   |
| -------------------------- | ---------------------------------------- | ------------- | ------------ | ------------------------- |
| `images.backgroundMedical` | Page or section background (low opacity) | Full viewport | Any (tiles)  | Subtle background pattern |

**Implementation:**

- Use with low opacity (5-10%) as background
- Tile if pattern
- Position: Fixed or absolute, behind main content

---

## RESPONSIVE BREAKPOINTS REFERENCE

### Mobile (320px - 640px)

- Hero: 100vw × 300-400px
- Doctor cards: 1 column, full width
- Service cards: 1 column, full width
- About section: Stacked vertically
- Avatars: 50-60px
- All images: max-width: 100%

### Tablet (641px - 1024px)

- Hero: 100vw × 400-500px
- Doctor cards: 2 columns
- Service cards: 2 columns
- About section: Side-by-side with adjustments
- Avatars: 60-70px
- Card images: 250-350px width

### Desktop (1025px - 1280px)

- Hero: 100vw × 500-600px
- Doctor cards: 3 columns
- Service cards: 3-4 columns
- About section: Full 2-column layout
- Avatars: 60-80px
- Card images: 300-400px width

### Extra Large (1281px+)

- Hero: 100vw × 600px
- Doctor cards: 4 columns
- Service cards: 4 columns
- About section: Full 2-column with larger images
- Container max-width: 1280px

---

## IMPLEMENTATION CHECKLIST

When building components, ensure:

- [ ] All images imported from `@/constants/images`
- [ ] Images use correct aspect ratio for their placement
- [ ] Responsive sizing implemented at all breakpoints
- [ ] Alt text provided for accessibility
- [ ] Images lazy-loaded for performance
- [ ] Placeholder shown while loading
- [ ] Image links are HTTPS (Unsplash provides these)
- [ ] No hardcoded image URLs in components

### Example Import:

```typescript
import { IMAGES, getImageUrl } from "@/constants/images";

const imageUrl = getImageUrl("hero"); // Safe with fallback
const directUrl = IMAGES.hero; // Direct URL
```

---

## STYLING PATTERNS

### Card Image

```css
.card-image {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 0.75rem;
}
```

### Avatar Image

```css
.avatar-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
```

### Hero Background

```css
.hero-background {
  background-image: url(...);
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* optional parallax */
}
```

---

## COLOR OVERLAYS

For text contrast over images:

### Light Overlay (for dark text)

```css
background: rgba(255, 255, 255, 0.1);
```

### Dark Overlay (for light text)

```css
background: rgba(15, 23, 42, 0.4); /* rgba(secondary, 0.4) */
```

### Primary Color Overlay

```css
background: rgba(46, 75, 255, 0.2); /* rgba(primary, 0.2) */
```

---

## ACCESSIBILITY

- **Alt Text Format**: `[Type] - [Description] at [Location]`
  - Good: "Doctor - Sarah Johnson, Cardiologist at New Generation Health Center"
  - Bad: "image", "doctor", "photo"
- **Decorative Images**: Use empty alt="" only for purely decorative images
- **Loading States**: Show skeleton or placeholder while image loads
- **Color Contrast**: Ensure text on images has sufficient contrast (WCAG AA minimum)

---

## PERFORMANCE OPTIMIZATION

- Unsplash URLs automatically provide optimized versions
- Use `?w=XXX&q=80` parameters for width and quality
- Lazy load images below the fold
- Consider using picture element for responsive images
- Compress images before deployment

---

**Last Updated**: April 19, 2026
**Next Steps**: Create component implementations following this guide
