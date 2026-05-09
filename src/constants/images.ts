/**
 * Image Assets Configuration
 *
 * Centralized management of all image URLs used throughout the application.
 * All images are sourced from Unsplash (free, high-quality, professional)
 * Medical/healthcare theme with clinic-appropriate imagery.
 *
 * EASY REPLACEMENT GUIDE:
 * To replace any image, update the corresponding URL below.
 * Each image is labeled with its purpose, placement, and expected dimensions.
 */

export const IMAGES = {
  // ============================================================================
  // HERO SECTION IMAGES
  // ============================================================================

  /**
   * Hero Background or Hero Section Image
   * Purpose: Main hero visual
   * Position: Full width hero section at top of page
   * Aspect Ratio: 16:9 (1920x1080px recommended)
   * Size: Full viewport width, 500-600px height
   * Theme: Modern healthcare facility, welcoming clinic atmosphere
   */
  hero: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=1200&q=80",

  // ============================================================================
  // DOCTOR & TEAM IMAGES
  // ============================================================================

  /**
   * Doctor Profile - Primary
   * Purpose: Featured doctor in team section or hero
   * Position: Hero section or team showcase
   * Aspect Ratio: 1:1 (square) or 4:5 (portrait)
   * Size: 300-400px
   * Theme: Professional doctor, medical setting
   */
  doctorPrimary:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",

  /**
   * Doctor Profile - Secondary
   * Purpose: Team member showcase
   * Position: Team section grid
   * Aspect Ratio: 1:1 (square)
   * Size: 250-300px
   * Theme: Professional healthcare provider
   */
  doctorSecondary:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",

  /**
   * Doctor Profile - Tertiary
   * Purpose: Additional team member
   * Position: Team section grid
   * Aspect Ratio: 1:1 (square)
   * Size: 250-300px
   * Theme: Medical professional
   */
  doctorTertiary:
    "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=600&q=80",

  /**
   * Doctor Profile - Quaternary
   * Purpose: Additional team member
   * Position: Team section grid
   * Aspect Ratio: 1:1 (square)
   * Size: 250-300px
   * Theme: Healthcare worker
   */
  doctorQuaternary:
    "https://images.unsplash.com/photo-1485972153145-c7e4a2014f91?auto=format&fit=crop&w=600&q=80",

  // ============================================================================
  // SERVICE/FEATURE ICONS & IMAGES
  // ============================================================================

  /**
   * Service Image - General Checkup
   * Purpose: Service card or feature section
   * Position: Service grid or feature section
   * Aspect Ratio: 16:9 or 4:3
   * Size: 300-400px width
   * Theme: Medical consultation, patient care
   */
  serviceCheckup:
    "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=700&q=80",

  /**
   * Service Image - Dental Care
   * Purpose: Service card or feature section
   * Position: Service grid
   * Aspect Ratio: 16:9 or 4:3
   * Size: 300-400px width
   * Theme: Dental examination, oral health
   */
  serviceDental:
    "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=700&q=80",

  /**
   * Service Image - Surgery/Procedure
   * Purpose: Service card or feature section
   * Position: Service grid
   * Aspect Ratio: 16:9 or 4:3
   * Size: 300-400px width
   * Theme: Medical procedure, operating room
   */
  serviceSurgery:
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=700&q=80",

  /**
   * Service Image - Laboratory
   * Purpose: Service card or feature section
   * Position: Service grid
   * Aspect Ratio: 16:9 or 4:3
   * Size: 300-400px width
   * Theme: Lab testing, diagnostics
   */
  serviceLab:
    "https://images.unsplash.com/photo-1519494026892-80bbd2651601?auto=format&fit=crop&w=700&q=80",

  // ============================================================================
  // ABOUT SECTION IMAGES
  // ============================================================================

  /**
   * About Section Image
   * Purpose: About us section visual
   * Position: Left or right side of about text
   * Aspect Ratio: 4:5 (portrait) or 3:2 (landscape)
   * Size: 300-500px width
   * Theme: Clinic exterior, patient care, welcoming environment
   */
  aboutClinic:
    "https://images.unsplash.com/photo-1470115636492-6d2b56b6c6f1?auto=format&fit=crop&w=900&q=80",

  // ============================================================================
  // TESTIMONIAL/SUCCESS STORY IMAGES
  // ============================================================================

  /**
   * Patient Testimonial Avatar 1
   * Purpose: Patient testimonial section
   * Position: Small circle avatar next to quote
   * Aspect Ratio: 1:1 (square/circle)
   * Size: 60-80px
   * Theme: Patient photo (diverse, inclusive)
   */
  patientAvatar1:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",

  /**
   * Patient Testimonial Avatar 2
   * Purpose: Patient testimonial section
   * Position: Small circle avatar next to quote
   * Aspect Ratio: 1:1 (square/circle)
   * Size: 60-80px
   * Theme: Patient photo (diverse, inclusive)
   */
  patientAvatar2:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",

  /**
   * Patient Testimonial Avatar 3
   * Purpose: Patient testimonial section
   * Position: Small circle avatar next to quote
   * Aspect Ratio: 1:1 (square/circle)
   * Size: 60-80px
   * Theme: Patient photo (diverse, inclusive)
   */
  patientAvatar3:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",

  // ============================================================================
  // BACKGROUND & DECORATIVE IMAGES
  // ============================================================================

  /**
   * Medical Background Pattern
   * Purpose: Page background or section background
   * Position: Behind main content
   * Aspect Ratio: Any (tiling pattern)
   * Size: Full viewport
   * Theme: Medical, healthcare, minimal pattern
   */
  backgroundMedical:
    "https://images.unsplash.com/photo-1576091160569-2173f7f868f6?w=1920&q=80",

  /**
   * Clinic Interior
   * Purpose: Background image for sections
   * Position: Section background
   * Aspect Ratio: 16:9 or wider
   * Size: Full width
   * Theme: Modern clinic interior, healthcare facility
   */
  clinicInterior:
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80",

  // ============================================================================
  // APPOINTMENT/CTA SECTION IMAGES
  // ============================================================================

  /**
   * Appointment CTA Image
   * Purpose: Call-to-action section for booking
   * Position: Appointment section hero
   * Aspect Ratio: 16:9
   * Size: Full width, 400px height
   * Theme: Friendly healthcare professional, appointment booking
   */
  appointmentCTA:
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",

  contactHero:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",

  contactMap:
    "https://staticmap.openstreetmap.de/staticmap.php?center=4.1482,9.2428&zoom=14&size=1200x800&maptype=mapnik&markers=4.1482,9.2428,lightblue1",

  // ============================================================================
  // LOCATION & COMMUNITY IMAGES
  // ============================================================================

  /**
   * Contact Location 1
   * Purpose: Location card in contact section
   * Aspect Ratio: 4:3
   */
  location1:
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",

  /**
   * Contact Location 2
   * Purpose: Location card in contact section
   * Aspect Ratio: 4:3
   */
  location2:
    "https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=900&q=80",

  /**
   * Contact Location 3
   * Purpose: Location card in contact section
   * Aspect Ratio: 4:3
   */
  location3:
    "https://images.unsplash.com/photo-1513442542250-4b6a0f8a78f0?auto=format&fit=crop&w=900&q=80",

  /**
   * Community Image 1
   * Purpose: Community section card
   * Aspect Ratio: 4:3
   */
  community1:
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80",

  /**
   * Community Image 2
   * Purpose: Community section card
   * Aspect Ratio: 4:3
   */
  community2:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",

  /**
   * Community Image 3
   * Purpose: Community section card
   * Aspect Ratio: 4:3
   */
  community3:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",

  /**
   * Community Image 4
   * Purpose: Community section card
   * Aspect Ratio: 4:3
   */
  community4:
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",

  // ============================================================================
  // ARTICLE & RESOURCE IMAGES
  // ============================================================================

  /**
   * Insight Article Image 1
   * Purpose: Insights grid
   * Aspect Ratio: 4:3
   */
  article1:
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=900&q=80",

  /**
   * Insight Article Image 2
   * Purpose: Insights grid
   * Aspect Ratio: 4:3
   */
  article2:
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=80",

  /**
   * Insight Article Image 3
   * Purpose: Insights grid
   * Aspect Ratio: 4:3
   */
  article3:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=900&q=80",

  /**
   * Insight Article Image 4
   * Purpose: Insights grid
   * Aspect Ratio: 4:3
   */
  article4:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",

  // ============================================================================
  // SERVICES PAGE IMAGES
  // ============================================================================

  /**
   * Services Page Hero Image
   * Purpose: Services page hero header
   * Aspect Ratio: 16:9
   */
  servicesHero:
    "https://images.unsplash.com/photo-1580281657521-2ac6cd1307bc?auto=format&fit=crop&w=800&q=80",

  /**
   * Purpose Section Image
   * Purpose: Our purpose and commitment section
   * Aspect Ratio: 4:3
   */
  purposeImage:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",

  /**
   * Quote Section Image
   * Purpose: Quote and testimonial section
   * Aspect Ratio: 4:5
   */
  quoteForm:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",

  /**
   * Timeline 1999 Image
   * Purpose: Timeline milestone card
   * Aspect Ratio: 4:3
   */
  timeline1999:
    "https://images.unsplash.com/photo-1485209418256-4f2915a95746?auto=format&fit=crop&w=600&q=80",

  /**
   * Timeline 2005 Image
   * Purpose: Timeline milestone card
   * Aspect Ratio: 4:3
   */
  timeline2005:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80",

  /**
   * Timeline 2025 Image
   * Purpose: Timeline milestone card
   * Aspect Ratio: 4:3
   */
  timeline2025:
    "https://images.unsplash.com/photo-1495427513690-1d4af6ce8b6d?auto=format&fit=crop&w=600&q=80",

  /**
   * Timeline 2035 Image
   * Purpose: Timeline milestone card
   * Aspect Ratio: 4:3
   */
  timeline2035:
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",

  /**
   * Facility Image 1
   * Purpose: Private rooms and suites card
   * Aspect Ratio: 4:3
   */
  facility1:
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",

  /**
   * Facility Image 2
   * Purpose: Wellness and therapy center card
   * Aspect Ratio: 4:3
   */
  facility2:
    "https://images.unsplash.com/photo-1492724441997-5dc865305da4?auto=format&fit=crop&w=600&q=80",

  /**
   * Facility Image 3
   * Purpose: Memory care wing card
   * Aspect Ratio: 4:3
   */
  facility3:
    "https://images.unsplash.com/photo-1513442542250-4b6a0f8a78f0?auto=format&fit=crop&w=600&q=80",

  /**
   * Facility Image 4
   * Purpose: Dining hall and nutrition services card
   * Aspect Ratio: 4:3
   */
  facility4:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",

  /**
   * Caregiver 1
   * Purpose: Caregiver profile photo
   * Aspect Ratio: 3:4
   */
  caregiver1:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",

  /**
   * Caregiver 2
   * Purpose: Caregiver profile photo
   * Aspect Ratio: 3:4
   */
  caregiver2:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",

  /**
   * Caregiver 3
   * Purpose: Caregiver profile photo
   * Aspect Ratio: 3:4
   */
  caregiver3:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80",

  /**
   * Caregiver 4
   * Purpose: Caregiver profile photo
   * Aspect Ratio: 3:4
   */
  caregiver4:
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",

  /**
   * Caregiver 5
   * Purpose: Caregiver profile photo
   * Aspect Ratio: 3:4
   */
  caregiver5:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",

  /**
   * Caregiver 6
   * Purpose: Caregiver profile photo
   * Aspect Ratio: 3:4
   */
  caregiver6:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",

  // ============================================================================
  // LOGO & BRANDING
  // ============================================================================

  /**
   * Clinic Logo
   * Purpose: Navbar, footer, headers
   * Position: Top left of navbar, footer
   * Aspect Ratio: 1:1 or 4:1 (depending on logo style)
   * Size: 40-60px (navbar), 100-150px (footer)
   * Theme: Medical clinic, healthcare brand
   * NOTE: Currently using text + colored square - replace with actual logo
   */
  logoSmall: "placeholder:logo-small",
  logoLarge: "placeholder:logo-large",

  // ============================================================================
  // SOCIAL MEDIA ICONS
  // ============================================================================
  // SVG Data URIs for social media icons
  // These are easily replaceable - just update the URLs
  // All icons sized for consistent 24px display

  /**
   * Facebook Icon
   * Purpose: Social media link in footer
   * Size: 24px (will scale with CSS)
   * Color: Primary blue (#2E4BFF)
   */
  iconFacebook:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%232E4BFF'%3E%3Cpath d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/%3E%3C/svg%3E",

  /**
   * Twitter/X Icon
   * Purpose: Social media link in footer
   * Size: 24px
   * Color: Primary blue (#2E4BFF)
   */
  iconTwitter:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%232E4BFF'%3E%3Cpath d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'/%3E%3C/svg%3E",

  /**
   * LinkedIn Icon
   * Purpose: Social media link in footer
   * Size: 24px
   * Color: Primary blue (#2E4BFF)
   */
  iconLinkedIn:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%232E4BFF'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.439-.103.25-.13.599-.13.948v5.418h-3.554s.05-8.736 0-9.646h3.554v1.364c.43-.665 1.199-1.61 2.925-1.61 2.136 0 3.74 1.398 3.74 4.402v5.49zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.704 0-.951.77-1.704 1.963-1.704 1.192 0 1.912.753 1.937 1.704 0 .946-.745 1.704-1.985 1.704zm1.946 11.597H3.392V9.806h3.891v10.646zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'/%3E%3C/svg%3E",

  /**
   * Instagram Icon
   * Purpose: Social media link in footer
   * Size: 24px
   * Color: Primary blue (#2E4BFF)
   */
  iconInstagram:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%232E4BFF'%3E%3Crect x='2' y='2' width='20' height='20' rx='5' ry='5' fill='none' stroke='%232E4BFF' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='4' fill='none' stroke='%232E4BFF' stroke-width='2'/%3E%3Ccircle cx='17' cy='7' r='1' fill='%232E4BFF'/%3E%3C/svg%3E",

  /**
   * Email/Contact Icon
   * Purpose: Contact link in footer
   * Size: 24px
   * Color: Primary blue (#2E4BFF)
   */
  iconEmail:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%232E4BFF'%3E%3Cpath d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'/%3E%3C/svg%3E",

  /**
   * Phone Icon
   * Purpose: Contact link in footer
   * Size: 24px
   * Color: Primary blue (#2E4BFF)
   */
  iconPhone:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%232E4BFF'%3E%3Cpath d='M17.707 12.293l-5.293-5.293a1 1 0 00-1.414 0l-5.293 5.293a1 1 0 001.414 1.414L6 9.414V19a2 2 0 002 2h8a2 2 0 002-2V9.414l3.586 3.586a1 1 0 001.414-1.414zM11 3a2 2 0 110 4 2 2 0 010-4z' transform='rotate(90 12 12)' opacity='0.8'/%3E%3C/svg%3E",

  /**
   * Map/Location Icon
   * Purpose: Address link in footer
   * Size: 24px
   * Color: Primary blue (#2E4BFF)
   */
  iconLocation:
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%232E4BFF'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5z'/%3E%3C/svg%3E",
};

/**
 * IMAGE PLACEMENT DOCUMENTATION
 *
 * This section documents where each image should be placed in the design.
 * Use this as a reference for component development.
 *
 * HERO SECTION
 * ├─ images.hero: Full-width background (16:9 aspect ratio)
 * │  Position: Top of page, behind heading and description
 * │  Size: 100vw × 500-600px
 * └─ Optional overlay with gradient for text readability
 *
 * NAVBAR
 * └─ Clinic logo: Top left
 *    Position: Left of clinic name
 *    Size: 40-50px square
 *
 * TEAM/DOCTORS SECTION
 * ├─ images.doctorPrimary: Featured doctor
 * │  Position: Left or center, larger size
 * │  Size: 300-400px (1:1 square or 4:5 portrait)
 * ├─ images.doctorSecondary through Quaternary: Team grid
 * │  Position: Grid layout (2-4 columns)
 * │  Size: 250-300px each (1:1 square)
 * └─ Layout: Mobile 1 col, Tablet 2 cols, Desktop 3-4 cols
 *
 * SERVICES SECTION
 * ├─ images.serviceCheckup
 * ├─ images.serviceDental
 * ├─ images.serviceSurgery
 * └─ images.serviceLab
 *    Position: Service card grid
 *    Size: 300-400px width, 16:9 aspect ratio
 *    Layout: Mobile 1 col, Tablet 2 cols, Desktop 3-4 cols
 *
 * ABOUT SECTION
 * ├─ Left Column: images.aboutClinic (right side of text on desktop)
 * │  Position: Image on left/right, text on right/left
 * │  Size: 300-500px width, 4:5 aspect ratio
 * └─ Two-column layout: Responsive stacking on mobile
 *
 * TESTIMONIALS SECTION
 * ├─ images.patientAvatar1-3: Small circular avatars
 * │  Position: Above testimonial quote or beside name
 * │  Size: 60-80px circular
 * └─ Layout: Testimonial cards with avatar, quote, name
 *
 * APPOINTMENT CTA SECTION
 * └─ images.appointmentCTA: Background image
 *    Position: Section background (possibly with overlay)
 *    Size: Full width × 400-500px height
 *    Use: Behind heading and CTA button
 *
 * FOOTER
 * └─ Clinic logo: Bottom left or center
 *    Position: Footer top
 *    Size: 100-150px or as brand guideline
 *
 * BACKGROUND & OVERLAYS
 * └─ images.backgroundMedical: Page or section background
 *    Position: Behind main content (low opacity)
 *    Opacity: 5-10% for subtle effect
 *
 * RESPONSIVE BREAKPOINTS
 * Mobile (320px - 640px):
 * ├─ Hero: 100vw × 300-400px
 * ├─ Doctor cards: 1 column
 * ├─ Service cards: 1 column
 * └─ About: Stacked vertically
 *
 * Tablet (641px - 1024px):
 * ├─ Hero: 100vw × 400-500px
 * ├─ Doctor cards: 2 columns
 * ├─ Service cards: 2 columns
 * └─ About: Side-by-side
 *
 * Desktop (1025px+):
 * ├─ Hero: 100vw × 500-600px
 * ├─ Doctor cards: 3-4 columns
 * ├─ Service cards: 3-4 columns
 * └─ About: Full 2-column layout
 *
 * ACCESSIBILITY
 * - All images must have descriptive alt text
 * - Example: alt="Dr. Sarah Johnson, Cardiologist at New Generation Health Center"
 * - Avoid: alt="image", alt="doctor", etc.
 *
 * PERFORMANCE
 * - Images should be optimized for web (compressed)
 * - Unsplash automatically provides optimized versions
 * - Consider using next/image component for optimization if using Next.js
 * - Lazy load images below the fold for better performance
 *
 * REPLACEMENT WORKFLOW
 * 1. Identify the image constant to replace (e.g., images.hero)
 * 2. Get new image URL from Unsplash/Pexels
 * 3. Verify aspect ratio matches the documented ratio
 * 4. Update the URL in this file
 * 5. Test in browser to ensure proper sizing and display
 * 6. No component changes needed - automatic update
 */

/**
 * IMAGE UTILITY FUNCTION
 * Use this to ensure consistent image loading and error handling
 */
export const getImageUrl = (imageKey: keyof typeof IMAGES): string => {
  const url = IMAGES[imageKey];
  if (!url || url.startsWith("placeholder:")) {
    console.warn(
      `Image not configured: ${imageKey}. Using placeholder. Please update IMAGES constant.`,
    );
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e2e8f0' width='400' height='300'/%3E%3Ctext x='50%' y='50%' font-size='16' text-anchor='middle' dominant-baseline='middle' fill='%2364748b'%3EImage Placeholder%3C/text%3E%3C/svg%3E";
  }
  return url;
};

/**
 * IMAGE QUICK REFERENCE
 *
 * To use in components:
 *
 * import { IMAGES, getImageUrl } from '@/constants/images';
 *
 * // Direct usage
 * <img src={IMAGES.hero} alt="Healthcare hero" />
 *
 * // Safe usage with fallback
 * <img src={getImageUrl('hero')} alt="Healthcare hero" />
 *
 * // In styled component
 * background-image: url(${IMAGES.hero});
 */
