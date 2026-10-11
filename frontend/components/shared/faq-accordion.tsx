"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  return (
    <Accordion className="w-full space-y-3" type="multiple">
      {faqs.map((faq, index) => (
        <AccordionItem key={faq.id} value={faq.id} className="border border-border/50 rounded-xl overflow-hidden bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-sm">
          <AccordionTrigger className="flex items-center justify-between w-full px-6 py-4 text-left font-medium text-base hover:bg-accent/50 transition-colors [&[data-state=open]>svg]:rotate-180">
            <span className="pr-4">{faq.question}</span>
            <ChevronDown className="size-5 text-muted-foreground flex-shrink-0 transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed animate-accordion-down">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
