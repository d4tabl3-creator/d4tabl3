import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          ¿Listo para <span className="gradient-rainbow-text">escalar</span>?
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Hablemos de cómo dªtªblɛ puede transformar tu operación.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="lg"
            className="gradient-rainbow text-primary-foreground font-display font-semibold rounded-xl px-8 py-6 hover:opacity-90 transition-opacity"
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Iniciar chat con IA
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/60 font-display rounded-xl px-8 py-6"
            asChild
          >
            <a href="mailto:contacto@datable.com">
              <Mail className="mr-2 h-5 w-5" />
              contacto@datable.com
            </a>
          </Button>
        </motion.div>
      </div>

      <footer className="mt-24 text-center text-sm text-muted-foreground">
        <p className="font-display">
          <span className="gradient-rainbow-text font-semibold">dªtªblɛ</span> · Ciudad de México
        </p>
        <p className="mt-1">© {new Date().getFullYear()} dªtªblɛ. Todos los derechos reservados.</p>
      </footer>
    </section>
  );
}
