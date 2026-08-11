import { contacts as mockContacts } from "@/data/mock/enquiries";
import { successResponse } from "@/lib/api/server-utils";
import type { ContactSubmission } from "@/types";

const contacts = [...mockContacts];

export async function POST(request: Request) {
  const body = await request.json();
  const newContact: ContactSubmission = {
    ...body,
    id: `con-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  contacts.push(newContact);
  return successResponse(newContact, 201);
}
