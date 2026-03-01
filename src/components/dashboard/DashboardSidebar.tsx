import { Zap, BarChart3, CheckCircle, LogOut, CreditCard, Home, HelpCircle, ShoppingBag, Briefcase, Gift, Sparkles } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNav = [
  { title: "Resumen", url: "/dashboard", icon: Home, emoji: "🏠", color: "var(--rainbow-4)" },
  { title: "Automatizaciones", url: "/dashboard/automations", icon: Zap, emoji: "⚡", color: "var(--rainbow-3)" },
  { title: "Métricas", url: "/dashboard/metrics", icon: BarChart3, emoji: "📊", color: "var(--rainbow-5)" },
  { title: "Procesos", url: "/dashboard/processes", icon: CheckCircle, emoji: "✅", color: "var(--rainbow-6)" },
  { title: "Bolsa de Trucos", url: "/dashboard/add-ons", icon: ShoppingBag, emoji: "✨", color: "var(--rainbow-2)" },
];

const secondaryNav = [
  { title: "Ventas", url: "/dashboard/sales", icon: Briefcase, emoji: "💼", color: "var(--fun-coral)" },
  { title: "Referidos", url: "/dashboard/referrals", icon: Gift, emoji: "🎁", color: "var(--fun-pink)" },
  { title: "Suscripción", url: "/dashboard/billing", icon: CreditCard, emoji: "💳", color: "var(--fun-sky)" },
  { title: "Soporte", url: "/dashboard/support", icon: HelpCircle, emoji: "🛟", color: "var(--fun-mint)" },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl gradient-rainbow flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-display font-bold text-sm">d</span>
          </div>
          {!collapsed && (
            <span className="font-display font-bold text-lg tracking-tight gradient-rainbow-text">
              d4tabl3
            </span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
            🎮 Plataforma
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                      activeClassName="text-foreground font-medium"
                      style={location.pathname === item.url ? { backgroundColor: `hsl(${item.color} / 0.1)` } : {}}
                    >
                      <span className="text-base">{item.emoji}</span>
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60">
            👤 Cuenta
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                      activeClassName="text-foreground font-medium"
                      style={location.pathname === item.url ? { backgroundColor: `hsl(${item.color} / 0.1)` } : {}}
                    >
                      <span className="text-base">{item.emoji}</span>
                      {!collapsed && <span className="text-sm">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <div className="rounded-xl bg-muted/30 p-3 mb-2">
            <p className="text-xs text-muted-foreground truncate">📧 {user?.email}</p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive rounded-xl"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="text-sm">Cerrar sesión</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
