"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Package2, Star, X, ChevronDown, ChevronUp, Image, MapPin, Clock, Users, Dumbbell, Shield, Globe, Search } from "lucide-react";
import { packagesApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Package, PackageCategory, PackageDifficulty, PackagePhysicalRating, ItineraryDay, PackageFAQ } from "@/types";
import { slugify } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils";

const CATEGORIES: PackageCategory[] = [
  "adventure", "family", "honeymoon", "pilgrimage", "luxury", "budget",
  "wildlife", "beach", "hill_station", "cultural"
];

const DIFFICULTIES: PackageDifficulty[] = ["easy", "moderate", "challenging", "extreme"];

const PHYSICAL_RATINGS: PackagePhysicalRating[] = ["low", "moderate", "high", "very_high"];

const emptyPackage: Partial<Package> = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  category: "adventure",
  duration: "",
  coverImage: "",
  images: [],
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  active: true,
  showOnHomepage: false,
  destination: "",
  startLocation: "",
  endLocation: "",
  difficulty: "easy",
  physicalRating: "low",
  minGroupSize: 1,
  maxGroupSize: 20,
  minAge: undefined,
  maxAge: undefined,
  accommodation: "",
  meals: "",
  transport: "",
  cancellationPolicy: "",
  bookingPolicy: "",
  freeCancellation: false,
  cancellationDaysBefore: undefined,
  highlights: [],
  inclusions: [],
  exclusions: [],
  itinerary: [],
  faqs: [],
};

function ItineraryDayForm({
  day,
  index,
  onChange,
  onRemove,
}: {
  day: ItineraryDay;
  index: number;
  onChange: (index: number, field: keyof ItineraryDay, value: unknown) => void;
  onRemove: (index: number) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="bg-muted/30 border-border">
      <CardHeader className="pb-2" onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {day.day}
            </span>
            <CardTitle className="text-base">{day.title || `Day ${day.day}`}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} />
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onRemove(index); }}>
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn("space-y-4", !expanded && "hidden")}>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor={`itinerary-day-${index}-day`}>Day Number</Label>
            <Input
              id={`itinerary-day-${index}-day`}
              type="number"
              min={1}
              value={day.day}
              onChange={(e) => onChange(index, "day", Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor={`itinerary-day-${index}-title`}>Title</Label>
            <Input
              id={`itinerary-day-${index}-title`}
              value={day.title ?? ""}
              onChange={(e) => onChange(index, "title", e.target.value)}
              placeholder="Day title"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`itinerary-day-${index}-description`}>Description</Label>
          <Textarea
            id={`itinerary-day-${index}-description`}
            rows={3}
            value={day.description ?? ""}
            onChange={(e) => onChange(index, "description", e.target.value)}
            placeholder="What happens on this day..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`itinerary-day-${index}-activities`}>Activities</Label>
          <ArrayInput
            id={`itinerary-day-${index}-activities`}
            value={day.activities ?? []}
            onChange={(v) => onChange(index, "activities", v)}
            placeholder="Add activity..."
            itemLabel="Activity"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor={`itinerary-day-${index}-accommodation`}>Accommodation</Label>
            <Input
              id={`itinerary-day-${index}-accommodation`}
              value={day.accommodation ?? ""}
              onChange={(e) => onChange(index, "accommodation", e.target.value)}
              placeholder="Hotel name & type"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`itinerary-day-${index}-meals`}>Meals</Label>
            <Input
              id={`itinerary-day-${index}-meals`}
              value={day.meals ?? ""}
              onChange={(e) => onChange(index, "meals", e.target.value)}
              placeholder="B, L, D"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`itinerary-day-${index}-transport`}>Transport</Label>
            <Input
              id={`itinerary-day-${index}-transport`}
              value={day.transport ?? ""}
              onChange={(e) => onChange(index, "transport", e.target.value)}
              placeholder="Private car, flight, etc."
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FAQForm({
  faq,
  index,
  onChange,
  onRemove,
}: {
  faq: PackageFAQ;
  index: number;
  onChange: (index: number, field: keyof PackageFAQ, value: unknown) => void;
  onRemove: (index: number) => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Card className="bg-muted/30 border-border">
      <CardHeader className="pb-2" onClick={() => setExpanded(!expanded)} style={{ cursor: "pointer" }}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">FAQ #{index + 1}: {faq.question?.slice(0, 50) || "New FAQ"}</CardTitle>
          <div className="flex items-center gap-2">
            <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} />
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onRemove(index); }}>
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className={cn("space-y-4", !expanded && "hidden")}>
        <div className="space-y-1.5">
          <Label htmlFor={`faq-${index}-question`}>Question <span className="text-destructive">*</span></Label>
          <Input
            id={`faq-${index}-question`}
            value={faq.question ?? ""}
            onChange={(e) => onChange(index, "question", e.target.value)}
            placeholder="What is included in the package?"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor={`faq-${index}-answer`}>Answer <span className="text-destructive">*</span></Label>
          <Textarea
            id={`faq-${index}-answer`}
            rows={3}
            value={faq.answer ?? ""}
            onChange={(e) => onChange(index, "answer", e.target.value)}
            placeholder="Answer to the question..."
          />
        </div>
      </CardContent>
    </Card>
  );
}

// Reusable array input component for better UX
function ArrayInput({
  id,
  value,
  onChange,
  placeholder,
  itemLabel = "Item",
}: {
  id: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder: string;
  itemLabel?: string;
}) {
  const [newItem, setNewItem] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      onChange([...value, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          id={`${id}-new`}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button size="sm" onClick={addItem} variant="outline">
          <Plus className="size-4" />
        </Button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <Badge key={`${id}-${index}`} variant="secondary" className="gap-1.5">
              {item}
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 p-0 hover:bg-destructive/10 hover:text-destructive"
                onClick={() => removeItem(index)}
              >
                <X className="size-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// Reusable section component for consistent spacing
function FormSection({ title, description, children, icon }: {
  title: string;
  description?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <Card className="bg-background border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {icon && <span className="text-primary">{icon}</span>}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
}

// Reusable field wrapper for consistent spacing
function FormField({ label, required, children, description }: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}

function PackageFormModal({
  open,
  onClose,
  initialData,
  onSave,
  isSaving,
}: {
  open: boolean;
  onClose: () => void;
  initialData: Partial<Package>;
  onSave: (data: Partial<Package>) => void;
  isSaving: boolean;
}) {
  const [form, setForm] = useState<Partial<Package>>(initialData);
  const [activeTab, setActiveTab] = useState("basic");

  const set = (key: keyof Package, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const isEdit = !!(initialData as Package).id;

  // Itinerary handlers
  const addItineraryDay = () => {
    const newDay: ItineraryDay = {
      day: (form.itinerary?.length ?? 0) + 1,
      title: "",
      description: "",
      activities: [],
      accommodation: "",
      meals: "",
      transport: "",
    };
    set("itinerary", [...(form.itinerary ?? []), newDay]);
  };

  const updateItineraryDay = (index: number, field: keyof ItineraryDay, value: unknown) => {
    setForm((prev) => {
      const newItinerary = [...(prev.itinerary ?? [])];
      newItinerary[index] = { ...newItinerary[index], [field]: value };
      return { ...prev, itinerary: newItinerary };
    });
  };

  const removeItineraryDay = (index: number) => {
    setForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary?.filter((_, i) => i !== index) ?? [],
    }));
  };

  // FAQ handlers
  const addFAQ = () => {
    const newFAQ: PackageFAQ = { question: "", answer: "" };
    set("faqs", [...(form.faqs ?? []), newFAQ]);
  };

  const updateFAQ = (index: number, field: keyof PackageFAQ, value: unknown) => {
    setForm((prev) => {
      const newFAQs = [...(prev.faqs ?? [])];
      newFAQs[index] = { ...newFAQs[index], [field]: value };
      return { ...prev, faqs: newFAQs };
    });
  };

  const removeFAQ = (index: number) => {
    setForm((prev) => ({
      ...prev,
      faqs: prev.faqs?.filter((_, i) => i !== index) ?? [],
    }));
  };

  // Array field helpers - now using ArrayInput component
  const updateArrayField = (key: "highlights" | "inclusions" | "exclusions" | "images", value: string[]) => {
    set(key, value);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-shrink-0 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle>{isEdit ? "Edit Package" : "Create Package"}</DialogTitle>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
          <TabsList className="flex-shrink-0 flex-wrap gap-1 p-1 bg-muted/50 rounded-lg w-full justify-center">
            <TabsTrigger value="basic" className="px-3 py-1.5 text-sm"><Package2 className="size-3.5 mr-1.5" />Basic</TabsTrigger>
            <TabsTrigger value="policies" className="px-3 py-1.5 text-sm"><Shield className="size-3.5 mr-1.5" />Policies</TabsTrigger>
            <TabsTrigger value="location" className="px-3 py-1.5 text-sm"><MapPin className="size-3.5 mr-1.5" />Location</TabsTrigger>
            <TabsTrigger value="details" className="px-3 py-1.5 text-sm"><Dumbbell className="size-3.5 mr-1.5" />Details</TabsTrigger>
            <TabsTrigger value="itinerary" className="px-3 py-1.5 text-sm"><Clock className="size-3.5 mr-1.5" />Itinerary</TabsTrigger>
            <TabsTrigger value="faqs" className="px-3 py-1.5 text-sm"><Shield className="size-3.5 mr-1.5" />FAQs</TabsTrigger>
            <TabsTrigger value="seo" className="px-3 py-1.5 text-sm"><Search className="size-3.5 mr-1.5" />SEO</TabsTrigger>
          </TabsList>

          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* BASIC INFO TAB */}
              <TabsContent value="basic" className="space-y-4 animate-in fade-in">
                <FormSection title="Basic Information" description="Core package details that appear in listings and search results" icon={<Package2 className="size-5" />}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Title" required>
                      <Input
                        value={form.title ?? ""}
                        onChange={(e) => {
                          set("title", e.target.value);
                          if (!isEdit) set("slug", slugify(e.target.value));
                        }}
                        placeholder="Package title"
                      />
                    </FormField>
                    <FormField label="Slug" required description="Auto-generated from title, used in URLs">
                      <Input
                        value={form.slug ?? ""}
                        onChange={(e) => set("slug", e.target.value)}
                        placeholder="url-friendly-slug"
                      />
                    </FormField>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-4">
                    <FormField label="Category" required>
                      <Select
                        value={form.category ?? "adventure"}
                        onValueChange={(v) => set("category", v as PackageCategory)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((c) => (
                            <SelectItem key={c} value={c} className="capitalize">
                              {c.charAt(0).toUpperCase() + c.slice(1).replace("_", " ")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Duration" description="e.g. 5D/4N">
                      <Input
                        value={form.duration ?? ""}
                        onChange={(e) => set("duration", e.target.value)}
                        placeholder="5D/4N"
                      />
                    </FormField>
                  </div>
                </FormSection>

                <FormSection title="Images" description="Cover image and additional gallery images" icon={<Image className="size-5" />}>
                  <FormField label="Cover Image URL" description="Main image shown in listings and detail page">
                    <Input value={form.coverImage ?? ""} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://..." />
                  </FormField>
                  <FormField label="Additional Images" description="One image per entry">
                    <ArrayInput
                      id="pkg-images"
                      value={form.images ?? []}
                      onChange={(v) => updateArrayField("images", v)}
                      placeholder="Add image URL..."
                      itemLabel="Image"
                    />
                  </FormField>
                </FormSection>

                <FormSection title="Descriptions" description="Content shown to customers" icon={<Globe className="size-5" />}>
                  <FormField label="Short Description" description="Brief summary for cards and listings (max 200 chars)">
                    <Input value={form.shortDescription ?? ""} onChange={(e) => set("shortDescription", e.target.value)} placeholder="Brief summary for cards/listings" maxLength={200} />
                  </FormField>
                  <FormField label="Full Description" required description="Detailed package description">
                    <Textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={5} placeholder="Full package description..." />
                  </FormField>
                </FormSection>

                <FormSection title="Highlights, Inclusions & Exclusions" description="Key selling points and what's included/excluded" icon={<Star className="size-5" />}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField label="Highlights" description="Key selling points shown prominently">
                      <ArrayInput
                        id="pkg-highlights"
                        value={form.highlights ?? []}
                        onChange={(v) => updateArrayField("highlights", v)}
                        placeholder="Add highlight..."
                        itemLabel="Highlight"
                      />
                    </FormField>
                    <FormField label="Inclusions" description="What's included in the package price">
                      <ArrayInput
                        id="pkg-inclusions"
                        value={form.inclusions ?? []}
                        onChange={(v) => updateArrayField("inclusions", v)}
                        placeholder="Add inclusion..."
                        itemLabel="Inclusion"
                      />
                    </FormField>
                    <FormField label="Exclusions" description="What's NOT included in the package price">
                      <ArrayInput
                        id="pkg-exclusions"
                        value={form.exclusions ?? []}
                        onChange={(v) => updateArrayField("exclusions", v)}
                        placeholder="Add exclusion..."
                        itemLabel="Exclusion"
                      />
                    </FormField>
                  </div>
                </FormSection>

                <FormSection title="Visibility & Status" description="Control where and how this package appears" icon={<Shield className="size-5" />}>
                  <div className="flex flex-wrap items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox id="pkg-active" checked={form.active ?? true} onCheckedChange={(v) => set("active", !!v)} />
                      <span className="text-sm font-medium">Active</span>
                      <span className="text-xs text-muted-foreground">Visible in packages section</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Checkbox id="pkg-show-homepage" checked={!!form.showOnHomepage} onCheckedChange={(v) => set("showOnHomepage", !!v)} />
                      <span className="text-sm font-medium">Homepage</span>
                      <span className="text-xs text-muted-foreground">Show on homepage</span>
                    </label>
                  </div>
                </FormSection>
              </TabsContent>

              {/* POLICIES TAB */}
              <TabsContent value="policies" className="space-y-4 animate-in fade-in">
                <FormSection title="Policies" description="Cancellation and booking policies shown to customers" icon={<Shield className="size-5" />}>
                  <FormField label="Cancellation Policy">
                    <Textarea value={form.cancellationPolicy ?? ""} onChange={(e) => set("cancellationPolicy", e.target.value)} rows={4} placeholder="Free cancellation up to 7 days before departure..." />
                  </FormField>
                  <FormField label="Booking Policy">
                    <Textarea value={form.bookingPolicy ?? ""} onChange={(e) => set("bookingPolicy", e.target.value)} rows={4} placeholder="50% advance payment required to confirm booking..." />
                  </FormField>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Free Cancellation">
                      <Select value={form.freeCancellation ? "true" : "false"} onValueChange={(v) => set("freeCancellation", v === "true")}>
                        <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Yes</SelectItem>
                          <SelectItem value="false">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Cancellation Days Before" description="Days before departure for free cancellation">
                      <Input type="number" min={0} value={form.cancellationDaysBefore ?? ""} onChange={(e) => set("cancellationDaysBefore", e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g. 7" />
                    </FormField>
                  </div>
                </FormSection>
              </TabsContent>

              {/* LOCATION TAB */}
              <TabsContent value="location" className="space-y-4 animate-in fade-in">
                <FormSection title="Location Details" description="Where the package starts, ends, and covers" icon={<MapPin className="size-5" />}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField label="Destination" description="Primary destination (e.g. Bali, Kerala)">
                      <Input value={form.destination ?? ""} onChange={(e) => set("destination", e.target.value)} placeholder="e.g. Goa, Kerala, Bali" />
                    </FormField>
                    <FormField label="Start Location" description="Where the tour begins (e.g. Mumbai, Delhi)">
                      <Input value={form.startLocation ?? ""} onChange={(e) => set("startLocation", e.target.value)} placeholder="e.g. Mumbai, Delhi" />
                    </FormField>
                    <FormField label="End Location" description="Where the tour ends (e.g. Mumbai, Delhi)">
                      <Input value={form.endLocation ?? ""} onChange={(e) => set("endLocation", e.target.value)} placeholder="e.g. Mumbai, Delhi" />
                    </FormField>
                  </div>
                </FormSection>
              </TabsContent>

              {/* DETAILS TAB */}
              <TabsContent value="details" className="space-y-4 animate-in fade-in">
                <FormSection title="Difficulty & Physical Rating" description="Help customers understand the physical demands" icon={<Dumbbell className="size-5" />}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField label="Difficulty" required>
                      <Select value={form.difficulty ?? "easy"} onValueChange={(v) => set("difficulty", v as PackageDifficulty)}>
                        <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
                        <SelectContent>
                          {DIFFICULTIES.map((d) => (
                            <SelectItem key={d} value={d} className="capitalize">{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                    <FormField label="Physical Rating" required>
                      <Select value={form.physicalRating ?? "low"} onValueChange={(v) => set("physicalRating", v as PackagePhysicalRating)}>
                        <SelectTrigger><SelectValue placeholder="Select rating" /></SelectTrigger>
                        <SelectContent>
                          {PHYSICAL_RATINGS.map((r) => (
                            <SelectItem key={r} value={r} className="capitalize">{r.replace("_", " ")}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormField>
                  </div>
                </FormSection>

                <FormSection title="Group Size & Age Limits" description="Define who can join this package" icon={<Users className="size-5" />}>
                  <div className="grid gap-4 sm:grid-cols-4">
                    <FormField label="Min Group Size">
                      <Input type="number" min={1} value={form.minGroupSize ?? 1} onChange={(e) => set("minGroupSize", Number(e.target.value))} />
                    </FormField>
                    <FormField label="Max Group Size">
                      <Input type="number" min={1} value={form.maxGroupSize ?? 20} onChange={(e) => set("maxGroupSize", Number(e.target.value))} />
                    </FormField>
                    <FormField label="Min Age" description="Optional minimum age">
                      <Input type="number" min={0} value={form.minAge ?? ""} onChange={(e) => set("minAge", e.target.value ? Number(e.target.value) : undefined)} placeholder="Optional" />
                    </FormField>
                    <FormField label="Max Age" description="Optional maximum age">
                      <Input type="number" min={0} value={form.maxAge ?? ""} onChange={(e) => set("maxAge", e.target.value ? Number(e.target.value) : undefined)} placeholder="Optional" />
                    </FormField>
                  </div>
                </FormSection>

                <FormSection title="Accommodation, Meals & Transport" description="General information about what's provided" icon={<Globe className="size-5" />}>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <FormField label="Accommodation Type" description="e.g. 3-star hotels, luxury resorts">
                      <Input value={form.accommodation ?? ""} onChange={(e) => set("accommodation", e.target.value)} placeholder="e.g. 3-star hotels, luxury resorts" />
                    </FormField>
                    <FormField label="Meals Included" description="e.g. Breakfast & Dinner, Full board">
                      <Input value={form.meals ?? ""} onChange={(e) => set("meals", e.target.value)} placeholder="e.g. Breakfast & Dinner" />
                    </FormField>
                    <FormField label="Transport" description="e.g. Private AC vehicle, flights included">
                      <Input value={form.transport ?? ""} onChange={(e) => set("transport", e.target.value)} placeholder="e.g. Private AC vehicle" />
                    </FormField>
                  </div>
                </FormSection>
              </TabsContent>

              {/* ITINERARY TAB */}
              <TabsContent value="itinerary" className="space-y-4 animate-in fade-in">
                <FormSection title="Daily Itinerary" description="Add day-by-day breakdown of activities, accommodation, and meals" icon={<Clock className="size-5" />}>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="font-medium">Itinerary Days</Label>
                    <Button variant="outline" size="sm" onClick={addItineraryDay}>
                      <Plus className="size-4 mr-1" />
                      Add Day
                    </Button>
                  </div>
                  {(form.itinerary ?? []).length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                      <Clock className="size-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg mb-2">No itinerary days added yet</p>
                      <p className="text-sm text-muted-foreground">Click "Add Day" to start building your itinerary</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {(form.itinerary ?? []).map((day, index) => (
                        <ItineraryDayForm
                          key={day.id ?? index}
                          day={day}
                          index={index}
                          onChange={updateItineraryDay}
                          onRemove={removeItineraryDay}
                        />
                      ))}
                    </div>
                  )}
                </FormSection>
              </TabsContent>

              {/* FAQs TAB */}
              <TabsContent value="faqs" className="space-y-4 animate-in fade-in">
                <FormSection title="Frequently Asked Questions" description="Common questions and answers to help customers" icon={<Shield className="size-5" />}>
                  <div className="flex items-center justify-between mb-4">
                    <Label className="font-medium">FAQs</Label>
                    <Button variant="outline" size="sm" onClick={addFAQ}>
                      <Plus className="size-4 mr-1" />
                      Add FAQ
                    </Button>
                  </div>
                  {(form.faqs ?? []).length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                      <Shield className="size-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground text-lg mb-2">No FAQs added yet</p>
                      <p className="text-sm text-muted-foreground">Click "Add FAQ" to start adding common questions</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {(form.faqs ?? []).map((faq, index) => (
                        <FAQForm
                          key={faq.id ?? index}
                          faq={faq}
                          index={index}
                          onChange={updateFAQ}
                          onRemove={removeFAQ}
                        />
                      ))}
                    </div>
                  )}
                </FormSection>
              </TabsContent>

              {/* SEO TAB */}
              <TabsContent value="seo" className="space-y-4 animate-in fade-in">
                <FormSection title="SEO Settings" description="Optimize for search engines" icon={<Search className="size-5" />}>
                  <FormField label="Meta Title" description="Max 60 characters for best results">
                    <Input id="pkg-meta-title" value={form.metaTitle ?? ""} onChange={(e) => set("metaTitle", e.target.value)} placeholder="SEO title (max 60 chars)" maxLength={60} />
                  </FormField>
                  <FormField label="Meta Description" description="Max 160 characters for best results">
                    <Textarea id="pkg-meta-description" rows={3} value={form.metaDescription ?? ""} onChange={(e) => set("metaDescription", e.target.value)} placeholder="SEO description (max 160 chars)" maxLength={160} />
                  </FormField>
                  <FormField label="Meta Keywords" description="Comma-separated keywords">
                    <Input id="pkg-meta-keywords" value={form.metaKeywords ?? ""} onChange={(e) => set("metaKeywords", e.target.value)} placeholder="travel, package, vacation, tour" />
                  </FormField>
                </FormSection>
              </TabsContent>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 border-t pt-4 gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button
              onClick={() => onSave(form)}
              disabled={isSaving || !form.title || !form.slug}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : isEdit ? (
                "Update Package"
              ) : (
                "Create Package"
              )}
            </Button>
          </DialogFooter>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminPackagesPage() {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Package | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Package | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "packages"],
    queryFn: () => packagesApi.getAll({ page: 1, limit: 100 }),
  });

  const createMutation = useMutation({
    mutationFn: (d: Partial<Package>) => packagesApi.create(d),
    onSuccess: async () => {
      toast.success("Package created successfully");
      await queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
      setFormOpen(false);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to create package"),
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<Package> }) =>
      packagesApi.update(slug, data),
    onSuccess: async () => {
      toast.success("Package updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
      setEditTarget(null);
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed to update package"),
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => packagesApi.delete(slug),
    onSuccess: async () => {
      toast.success("Package deleted");
      await queryClient.invalidateQueries({ queryKey: ["admin", "packages"] });
      setDeleteTarget(null);
    },
    onError: () => toast.error("Failed to delete package"),
  });

  const packages = data?.data ?? [];
  const isMutating = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Package2 className="size-5 text-primary" />
            Packages
          </h1>
          <p className="text-sm text-muted-foreground">{packages.length} total packages</p>
        </div>
        <Button
          id="create-package-btn"
          onClick={() => setFormOpen(true)}
          className="gap-2"
        >
          <Plus className="size-4" />
          New Package
        </Button>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  <Loader2 className="size-5 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && packages.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No packages yet. Click "New Package" to create one.
                </TableCell>
              </TableRow>
            )}
            {packages.map((pkg) => (
              <TableRow key={pkg.id}>
                <TableCell className="font-medium max-w-[200px] truncate">{pkg.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {pkg.category.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{pkg.duration || "—"}</TableCell>
                <TableCell>
                  <div className="flex gap-1.5 items-center">
                    {pkg.active ? (
                      <Badge variant="default" className="text-xs bg-emerald-600 hover:bg-emerald-700">Active</Badge>
                    ) : (
                      <Badge variant="destructive" className="text-xs">Inactive</Badge>
                    )}
                    {pkg.showOnHomepage && (
                      <Badge variant="outline" className="text-xs border-amber-500 text-amber-700 dark:text-amber-400">
                        Homepage
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setEditTarget(pkg)}
                    >
                      <Pencil className="size-3.5" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => setDeleteTarget(pkg)}
                    >
                      <Trash2 className="size-3.5" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Create modal */}
      <PackageFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialData={emptyPackage}
        onSave={(d) => createMutation.mutate(d)}
        isSaving={createMutation.isPending}
      />

      {/* Edit modal */}
      {editTarget && (
        <PackageFormModal
          open
          onClose={() => setEditTarget(null)}
          initialData={editTarget}
          onSave={(d) => updateMutation.mutate({ slug: editTarget.slug, data: d })}
          isSaving={updateMutation.isPending}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(v) => !v && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Package</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteTarget?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && deleteMutation.mutate(deleteTarget.slug)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}