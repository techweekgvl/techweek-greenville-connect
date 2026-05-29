export type TicketTierId = "full_week" | "three_day" | "full_week_student" | "day_pass";

export interface TicketTier {
  id: TicketTierId;
  name: string;
  price: number;
  tagline: string;
  includes: string[];
  disclaimer?: string;
  paymentLinkUrl: string;
  highlighted?: boolean;
}

export const TICKET_TIERS: TicketTier[] = [
  {
    id: "full_week",
    name: "Full Week Pass",
    price: 125,
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
