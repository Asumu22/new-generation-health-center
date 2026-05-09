import React from "react";
import { Container, Section, Card, Heading, Paragraph, Button } from "./index";

/**
 * Layout Composition Examples
 * These are reusable layout patterns that can be used across pages
 */

// Hero Section Layout
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  cta?: {
    label: string;
    onClick: () => void;
  };
  secondaryCta?: {
    label: string;
    onClick: () => void;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  cta,
  secondaryCta,
}) => {
  return (
    <Section variant="default" paddingY="xl">
      <Container size="lg">
        <div className="text-center max-w-3xl mx-auto">
          {subtitle && (
            <Paragraph
              size="sm"
              color="tertiary"
              className="mb-3 font-semibold"
            >
              {subtitle}
            </Paragraph>
          )}
          <Heading level="h1" size="3xl" className="mb-6">
            {title}
          </Heading>
          {description && (
            <Paragraph size="lg" color="secondary" className="mb-8">
              {description}
            </Paragraph>
          )}
          {(cta || secondaryCta) && (
            <div className="flex gap-4 justify-center flex-wrap">
              {cta && (
                <Button variant="primary" size="lg" onClick={cta.onClick}>
                  {cta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={secondaryCta.onClick}
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

// Featured Cards Grid Layout
interface GridCardLayoutProps {
  title?: string;
  description?: string;
  cards: Array<{
    id: string;
    title: string;
    description: string;
    icon?: React.ReactNode;
  }>;
  columns?: 2 | 3 | 4;
}

export const GridCardLayout: React.FC<GridCardLayoutProps> = ({
  title,
  description,
  cards,
  columns = 3,
}) => {
  const gridColsMap = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "lg:grid-cols-4",
  };

  return (
    <Section variant="secondary" paddingY="lg">
      <Container size="lg">
        {title && (
          <>
            <Heading level="h2" size="2xl" className="mb-3 text-center">
              {title}
            </Heading>
            {description && (
              <Paragraph
                size="lg"
                color="secondary"
                className="mb-12 text-center max-w-2xl mx-auto"
              >
                {description}
              </Paragraph>
            )}
          </>
        )}
        <div
          className={`grid grid-cols-1 ${gridColsMap[columns]} gap-6 sm:gap-8`}
        >
          {cards.map((card) => (
            <Card key={card.id} variant="default" padding="lg">
              {card.icon && <div className="mb-4">{card.icon}</div>}
              <Heading level="h3" size="md" className="mb-3">
                {card.title}
              </Heading>
              <Paragraph size="md" color="secondary">
                {card.description}
              </Paragraph>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};

// Two Column Layout
interface TwoColumnLayoutProps {
  title?: string;
  content: React.ReactNode;
  sidebar: React.ReactNode;
  reverse?: boolean;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  title,
  content,
  sidebar,
  reverse = false,
}) => {
  return (
    <Section variant="default" paddingY="lg">
      <Container size="lg">
        {title && (
          <Heading level="h2" size="2xl" className="mb-12">
            {title}
          </Heading>
        )}
        <div
          className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${
            reverse ? "lg:direction-rtl" : ""
          }`}
        >
          <div className={`lg:col-span-2 ${reverse ? "lg:order-2" : ""}`}>
            {content}
          </div>
          <div className={`${reverse ? "lg:order-1" : ""}`}>{sidebar}</div>
        </div>
      </Container>
    </Section>
  );
};

// CTA Section
interface CTASectionProps {
  title: string;
  description?: string;
  primaryAction: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  variant?: "default" | "primary" | "secondary";
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "default",
}) => {
  const bgMap = {
    default: "bg-white",
    primary: "bg-primary",
    secondary: "bg-secondary",
  };

  const textColorMap = {
    default: "text-text-primary",
    primary: "text-white",
    secondary: "text-white",
  };

  return (
    <Section className={bgMap[variant]} paddingY="lg">
      <Container size="md">
        <div className="text-center">
          <Heading
            level="h2"
            size="2xl"
            className="mb-4"
            color={variant === "default" ? "primary" : "secondary"}
          >
            {title}
          </Heading>
          {description && (
            <Paragraph
              size="lg"
              color={variant === "default" ? "secondary" : "tertiary"}
              className="mb-8"
            >
              {description}
            </Paragraph>
          )}
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant={variant === "default" ? "primary" : "outline"}
              size="lg"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
            {secondaryAction && (
              <Button
                variant={variant === "default" ? "outline" : "ghost"}
                size="lg"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Feature List Section
interface FeatureListItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface FeatureListSectionProps {
  title?: string;
  features: FeatureListItem[];
}

export const FeatureListSection: React.FC<FeatureListSectionProps> = ({
  title,
  features,
}) => {
  return (
    <Section variant="secondary" paddingY="lg">
      <Container size="lg">
        {title && (
          <Heading level="h2" size="2xl" className="mb-12">
            {title}
          </Heading>
        )}
        <div className="space-y-6">
          {features.map((feature, idx) => (
            <div key={idx} className="flex gap-6">
              {feature.icon && (
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary-light rounded-lg">
                  {feature.icon}
                </div>
              )}
              <div>
                <Heading level="h3" size="md" className="mb-2">
                  {feature.title}
                </Heading>
                <Paragraph size="md" color="secondary">
                  {feature.description}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};
