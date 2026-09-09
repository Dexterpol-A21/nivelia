# Glyv — Requerimientos de tienda (v1)

Stack: Astro (server) + Supabase + Stripe.
Esto es la primera tienda. El corte es brutal a propósito.

Stripe y Supabase **sí facilitan** cobro, usuarios y datos. No facilitan envíos, stock, emails, ni un admin bonito. Eso se construye.

---

## Qué construimos vs qué no

### Comprador (sí)

| Pieza | Qué es | v1 |
|-------|--------|----|
| Cuentas | Login (magic link / email) | Sí. Sin cuenta no hay suscripción usable. |
| Catálogo | Lista + ficha de producto | Sí |
| Carrito | Elegir producto y cantidad | Sí. En el navegador hasta el checkout. |
| Checkout | Pagar | Sí. **Stripe Checkout** (página de Stripe). No armar formulario de tarjeta. |
| Procesar compra | Confirmar pago y crear pedido | Sí. **Webhook de Stripe** → guardar pedido en Supabase. |
| Página de cuenta | Ver pedido, suscripción, cancelar/pausar | Sí. Delgada. “Mis pedidos” + botón a **Stripe Customer Portal**. |
| Gracias / error de pago | Post-compra | Sí |

### Comprador (no en v1)

- Wishlist
- Cupones complejos
- Chat
- Perfil con 10 campos
- Carrito sincronizado entre dispositivos

### Dueño de Glyv / tu cliente freelance (dashboard)

**No construyas un dashboard a medida en v1.**

| Necesidad | Dónde se resuelve |
|-----------|-------------------|
| Ver cobros, fallos, reembolsos | Stripe Dashboard |
| Pausar / cancelar suscripciones | Stripe Dashboard + Customer Portal del comprador |
| Ver pedidos | Tabla `orders` en Supabase (Table Editor) |
| Cambiar precio / crear producto | Stripe (precio) + una fila en Supabase (ficha) |
| Admin web propio (`/admin`) | **v2**, si duele de verdad |

Un “panel del cliente” hecho a mano es otro producto (login staff, roles, gráficos, filtros). Eso se come el mes.

---

## Páginas v1

1. Home
2. Productos
3. Ficha de producto
4. Cómo funciona la reposición
5. Carrito
6. Login / cuenta
7. Checkout → Stripe (no es página nuestra)
8. `/cuenta` — pedidos + gestionar suscripción
9. Gracias
10. Contacto
11. Legales: privacidad, términos, envíos/devoluciones

---

## Flujo de compra (el único que importa)

```
Producto → carrito → login (si no hay sesión)
        → Stripe Checkout (suscripción)
        → webhook Stripe
        → pedido + suscripción en Supabase
        → email de Stripe
        → /cuenta
```

Reposición periódica = **Stripe Subscription**, no un recordatorio para que vuelvan a apretar “comprar”.

---

## Tablas mínimas (Supabase)

- `profiles` — usuario
- `products` — ficha (nombre, slug, foto, copy)
- `orders` — pedido (total, status, stripe_session_id)
- `order_items`
- `subscriptions` — espejo de Stripe (status, current_period_end)

Precios y cobro viven en Stripe. Supabase guarda catálogo y el historial. RLS en todo.

---

## Lo que hay que tener claro antes de codear

- ¿Un solo producto o varios?
- ¿La suscripción es mensual fija?
- ¿Envío a todo México? ¿precio de envío?
- ¿El dueño de Glyv entra a Stripe o quieres `/admin` sí o sí en v1?
