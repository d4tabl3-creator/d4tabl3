import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy, X, Phone, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SOSButton() {
  const [open, setOpen] = useState(false);

  const actions = [
    { icon: MessageCircle, label: "Chat de soporte", href: "/dashboard/support" },
    { icon: Phone, label: "Llamar ahora", href: "tel:+525512345678" },
    { icon: Mail, label: "Enviar correo", href: "mailto:soporte@d4tabl3.com" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="mb-3 space-y-2"
          >
            {actions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-lg hover:bg-muted/50 transition-colors"
              >
                <action.icon className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm font-medium">{action.label}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        size="lg"
        onClick={() => setOpen(!open)}
        className={`h-14 w-14 rounded-full shadow-lg ${open ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}`}
      >
        {open ? <X className="h-6 w-6" /> : <LifeBuoy className="h-6 w-6" />}
      </Button>
    </div>
  );
}
