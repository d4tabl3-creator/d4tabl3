import { Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardSupport() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold">Soporte</h1>
        <p className="text-sm text-muted-foreground mt-1">Nuestro equipo está aquí para ayudarte.</p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-border bg-card/50 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Correo electrónico</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Escríbenos y te responderemos en menos de 24 horas hábiles.
              </p>
              <Button variant="outline" size="sm" className="mt-3" asChild>
                <a href="mailto:contacto@datable.com">contacto@datable.com</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card/50 p-6">
          <div className="flex items-start gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <MessageSquare className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Asistencia en plataforma</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Tu suscripción incluye soporte directo de nuestro equipo de implementación para ayudarte a configurar y optimizar cada módulo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
