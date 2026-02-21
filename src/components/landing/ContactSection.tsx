import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

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
          ¿Te gustó tu Blueprint? <span className="gradient-rainbow-text">Hablemos.</span>
        </motion.h2>
        <motion.p
          className="text-muted-foreground mb-10 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Tu Automation Blueprint es gratis. Si quieres que lo implementemos, platiquemos sin compromiso.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="lg"
            className="gradient-rainbow text-primary-foreground font-display font-bold rounded-2xl px-10 py-6 hover:opacity-90 transition-all hover:scale-105 text-lg"
            asChild
          >
            <a href="mailto:contacto@datable.com">
              <Mail className="mr-2 h-5 w-5" />
              Escríbenos — es gratis platicar
            </a>
          </Button>
        </motion.div>
        <motion.p
          className="mt-4 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Sin compromiso · Sin vendedores molestos · Respuesta en menos de 24h
        </motion.p>
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
