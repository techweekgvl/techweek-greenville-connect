export type TicketTierId = "full_week" | "three_day" | "full_week_student" | "day_pass";

export interface TicketTier {
  id: TicketTierId;
  name: string;
  price: number;
  /** Display-only anchor price, rendered struck through. Does not affect checkout. */
  compareAtPrice?: number;
  /** Display-only note rendered under the price. */
  priceNote?: string;
  tagline: string;
  includes: string[];
  disclaimer?: string;
  paymentLinkUrl: string;
  highlighted?: boolean;
}

/**
 * Partner event with its own Eventbrite registration, not covered by a pass.
 * Shared so the schedule card and the tickets page can't drift apart.
 */
export const I4_SERIES_EVENT = {
  name: "Hired for What, Exactly?",
  subtitle: "AI, Education & the Workforce SC Is Building",
  day: "Thursday, Sept 24",
  eventbriteUrl:
    "https://www.eventbrite.com/e/hired-for-what-exactly-ai-education-the-workforce-sc-is-building-tickets-1997724953112",
};

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "full_week",
    name: "Full Week Pass",
    price: 125,
    compareAtPrice: 210,
    tagline: "Every event, every day.",
    includes: [
      "Access to all 11 events Sept 20–26",
      "Networking mixers & socials",
      "Panels, pitch night, & awards",
      "Food & beverages throughout the week",
    ],
    paymentLinkUrl: "https://buy.stripe.com/8x214mgUG7f9100dw42wU09",
    highlighted: true,
  },
  {
    id: "three_day",
    name: "3-Day Pass",
    price: 50,
    tagline: "Pick your three days.",
    includes: [
      "Choose any 3 days during Tech Week",
      "Full access on selected days",
      "Networking, panels & socials",
      "Food & beverages on event days",
    ],
    paymentLinkUrl: "https://buy.stripe.com/5kQ8wO0VIdDx8ss8bK2wU0a",
  },
  {
    id: "full_week_student",
    name: "Student Full Week",
    price: 60,
    tagline: "Full week, student rate.",
    includes: [
      "Access to all 11 events Sept 20–26",
      "Networking mixers & socials",
      "Panels, pitch night, & awards",
      "Food & beverages throughout the week",
    ],
    disclaimer: "Must show valid student ID at credential pickup.",
    paymentLinkUrl: "https://buy.stripe.com/9B6eVc8oabvpeQQbnW2wU0b",
  },
  {
    id: "day_pass",
    name: "Day Pass",
    price: 25,
    priceNote: "Includes access to Tuesday",
    tagline: "Drop in for a day.",
    includes: [
      "Pick the day at checkout",
      "Full access on selected day",
      "Networking & programming that day",
      "Food & beverages at that event",
    ],
    paymentLinkUrl: "https://buy.stripe.com/6oU7sK1ZM7f98sseA82wU0c",
  },
];
