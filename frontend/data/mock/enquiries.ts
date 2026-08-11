import type { Enquiry, ContactSubmission } from "@/types";

export const enquiries: Enquiry[] = [
  {
    id: "enq-1",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 98765 43210",
    destination: "Bali",
    travellers: 2,
    travelDate: "2024-08-15",
    budget: "50000",
    message: "Looking for a honeymoon package to Bali in August.",
    type: "package",
    status: "pending",
    createdAt: "2024-06-28T10:00:00Z",
  },
  {
    id: "enq-2",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 87654 32109",
    destination: "Dubai",
    travellers: 4,
    message: "Family trip to Dubai during Diwali holidays.",
    type: "general",
    status: "contacted",
    createdAt: "2024-06-25T14:30:00Z",
  },
];

export const contacts: ContactSubmission[] = [
  {
    id: "con-1",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 76543 21098",
    subject: "Corporate travel inquiry",
    message: "We need travel arrangements for a team of 30 people.",
    createdAt: "2024-06-20T09:00:00Z",
  },
];
