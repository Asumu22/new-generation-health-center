/\*\*

- DESIGN SYSTEM QUICK START GUIDE
-
- This file provides quick reference examples for using the design system.
  \*/

// ============================================================================
// 1. IMPORT COMPONENTS
// ============================================================================

/\*
import {
Button,
Container,
Section,
Card,
Heading,
Paragraph,
Label,
Caption,
} from '@/components';

import { COLORS, TYPOGRAPHY, SPACING } from '@/design/tokens';
import { cn, getResponsiveGrid } from '@/design/utils';
\*/

// ============================================================================
// 2. BASIC BUTTON USAGE
// ============================================================================

/\*
<Button variant="primary" size="md">
Click Me
</Button>

<Button variant="secondary" size="lg">
  Secondary
</Button>

<Button variant="outline" size="sm">
  Outline
</Button>

<Button variant="ghost">
  Ghost
</Button>

<Button isLoading>
  Loading...
</Button>
*/

// ============================================================================
// 3. TYPOGRAPHY SYSTEM
// ============================================================================

/\*
// Headings
<Heading level="h1" size="3xl" weight="bold">
Main Page Title
</Heading>

<Heading level="h2" size="2xl" weight="semibold">
  Section Title
</Heading>

<Heading level="h3" size="lg" weight="medium">
  Subsection
</Heading>

// Paragraphs
<Paragraph size="base" color="primary">
Primary text
</Paragraph>

<Paragraph size="md" color="secondary">
  Secondary text with more detail
</Paragraph>

// Labels and Captions
<Label size="md" weight="medium">
Form Label
</Label>

<Caption color="tertiary">
  Small caption text
</Caption>
*/

// ============================================================================
// 4. LAYOUT STRUCTURE
// ============================================================================

/\*

<Section variant="default" paddingY="lg">
  <Container size="lg">
    <Heading level="h2" size="2xl">
      Section Title
    </Heading>
    <Paragraph>
      Section description
    </Paragraph>
  </Container>
</Section>

// Or with cards

<Section variant="secondary" paddingY="lg">
  <Container size="lg">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="default" padding="md">
        <Heading level="h3" size="md">
          Card Title
        </Heading>
        <Paragraph>
          Card content
        </Paragraph>
      </Card>
    </div>
  </Container>
</Section>
*/

// ============================================================================
// 5. LAYOUT COMPOSITIONS
// ============================================================================

/\*
import {
HeroSection,
GridCardLayout,
FeatureListSection,
CTASection,
} from '@/components/layouts';

// Hero Section
<HeroSection
title="Welcome to Our Service"
subtitle="Get started today"
description="This is a powerful service designed to help you."
cta={{ label: "Get Started", onClick: () => {} }}
secondaryCta={{ label: "Learn More", onClick: () => {} }}
/>

// Grid of Cards
<GridCardLayout
title="Our Features"
description="Everything you need in one place"
cards={[
{
id: '1',
title: 'Feature 1',
description: 'Description of feature',
icon: <Icon />,
},
]}
columns={3}
/>

// Feature List
<FeatureListSection
title="Why Choose Us"
features={[
{
title: 'Easy to use',
description: 'Simple and intuitive interface',
icon: <Icon />,
},
]}
/>

// CTA Section
<CTASection
title="Ready to get started?"
description="Join thousands of users"
primaryAction={{ label: 'Sign Up', onClick: () => {} }}
variant="primary"
/>
\*/

// ============================================================================
// 6. COLORS & DESIGN TOKENS
// ============================================================================

/\*
import { COLORS, SPACING } from '@/design/tokens';

// Direct color usage
const primaryColor = COLORS.primary; // #2E4BFF

// In Tailwind classes
className="bg-primary text-white p-4"

// Responsive classes
className="text-base sm:text-lg lg:text-xl"
className="p-4 sm:p-6 lg:p-8"
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
\*/

// ============================================================================
// 7. COMPONENT PROPS REFERENCE
// ============================================================================

/\*
BUTTON:

- variant: 'primary' | 'secondary' | 'outline' | 'ghost'
- size: 'sm' | 'md' | 'lg'
- isLoading: boolean
- isDisabled: boolean

TYPOGRAPHY (Heading, Paragraph, Label, Caption):

- size/level: varies by component
- weight: 'normal' | 'medium' | 'semibold' | 'bold'
- color: 'primary' | 'secondary' | 'tertiary'
- className: string (additional classes)

CONTAINER:

- size: 'sm' | 'md' | 'lg' | 'xl' | 'full'

SECTION:

- variant: 'default' | 'secondary' | 'accent'
- paddingY: 'sm' | 'md' | 'lg' | 'xl'

CARD:

- variant: 'default' | 'outlined' | 'elevated'
- padding: 'sm' | 'md' | 'lg'
- rounded: 'md' | 'lg' | 'xl'
  \*/

// ============================================================================
// 8. COLOR PALETTE
// ============================================================================

/\*
PRIMARY: #2E4BFF
PRIMARY HOVER: #1E3AD8
PRIMARY LIGHT: #EBF0FF

SECONDARY: #0F172A
SECONDARY HOVER: #0A0F1A

SURFACE: #F8FAFF
SURFACE SECONDARY: #F1F5FB

ACCENT: #4B6BFF
ACCENT LIGHT: #F0F4FF

SUCCESS: #10B981
WARNING: #F59E0B
ERROR: #EF4444

TEXT PRIMARY: #0F172A
TEXT SECONDARY: #475569
TEXT TERTIARY: #64748B

BORDER: #E2E8F0
\*/

// ============================================================================
// 9. SPACING SCALE (8px base)
// ============================================================================

/\*
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
3xl: 4rem (64px)
...and more

Usage: p-4, m-8, gap-6, etc.
\*/

// ============================================================================
// 10. RESPONSIVE DESIGN
// ============================================================================

/\*
Mobile-first approach:

sm: 640px (small devices)
md: 768px (tablets)
lg: 1024px (desktops)
xl: 1280px (large desktops)
2xl: 1536px (extra large)

Example:
className="text-sm sm:text-base md:text-lg lg:text-xl"
className="p-4 sm:p-6 md:p-8 lg:p-12"
className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
\*/

export {};
