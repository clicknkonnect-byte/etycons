import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Phone,
  Building2,
  MessageSquare,
  Clock,
  Inbox,
  Loader2,
  RefreshCw,
  Lock,
  LogIn,
} from "lucide-react";
import { SEO } from "@/components/seo";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ContactSubmission } from "@shared/schema";

function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (pw: string) => {
      const res = await apiRequest("POST", "/api/admin/login", { password: pw });
      return res.json();
    },
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      toast({
        title: "Incorrect password",
        description: "Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <Card className="p-8 w-full max-w-sm overflow-visible">
        <div className="flex items-center justify-center mb-6">
          <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-center mb-1">Admin Access</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Enter your admin password to view enquiries.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate(password);
          }}
          className="space-y-4"
        >
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="input-admin-password"
          />
          <Button type="submit" className="w-full" disabled={loginMutation.isPending} data-testid="button-admin-login">
            {loginMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin mr-1.5" />
            ) : (
              <LogIn className="w-4 h-4 mr-1.5" />
            )}
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return (
      <div className="flex flex-col">
        <SEO title="Admin Login" description="Admin login page." />
        <LoginGate onSuccess={() => setAuthenticated(true)} />
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const { data: submissions, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
    refetchInterval: 30000,
  });

  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
  }

  function formatDate(dateStr: string | Date) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col">
      <SEO title="Admin - Customer Enquiries" description="View customer enquiries and contact form submissions." />

      <section className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Badge variant="outline" className="mb-2">Admin Dashboard</Badge>
              <h1 className="text-2xl sm:text-3xl font-bold" data-testid="text-admin-title">
                Customer Enquiries
              </h1>
              <p className="mt-1 text-muted-foreground text-sm">
                {submissions ? `${submissions.length} total submission${submissions.length !== 1 ? "s" : ""}` : "Loading..."}
              </p>
            </div>
            <Button variant="outline" onClick={handleRefresh} data-testid="button-refresh">
              <RefreshCw className="w-4 h-4 mr-1.5" />
              Refresh
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            </div>
          ) : !submissions || submissions.length === 0 ? (
            <Card className="p-12 text-center overflow-visible">
              <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-1">No Enquiries Yet</h2>
              <p className="text-sm text-muted-foreground">
                Customer submissions from the contact form will appear here.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <Card
                  key={sub.id}
                  className="p-5 sm:p-6 overflow-visible"
                  data-testid={`card-submission-${sub.id}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-semibold text-base" data-testid={`text-name-${sub.id}`}>
                        {sub.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Mail className="w-3.5 h-3.5" />
                          {sub.email}
                        </span>
                        {sub.phone && (
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Phone className="w-3.5 h-3.5" />
                            {sub.phone}
                          </span>
                        )}
                        {sub.company && (
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Building2 className="w-3.5 h-3.5" />
                            {sub.company}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {sub.service && (
                        <Badge variant="secondary" className="text-xs">
                          {sub.service}
                        </Badge>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDate(sub.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-muted/50 rounded-md p-3">
                    <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed" data-testid={`text-message-${sub.id}`}>
                      {sub.message}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
