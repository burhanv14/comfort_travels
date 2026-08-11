import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminSettingsRoute() {
  return (
    <div className="space-y-4">
      <h1 className="text-base font-semibold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Environment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-muted-foreground">
          <p>Configure environment variables in .env.local for secure production credentials.</p>
          <p>Rotate JWT secret periodically and avoid committing sensitive values.</p>
          <p>Use ADMIN_EMAIL and ADMIN_PASSWORD only in development/staging workflows.</p>
        </CardContent>
      </Card>
    </div>
  );
}
