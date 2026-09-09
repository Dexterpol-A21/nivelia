# Glyv — Design system

Suplementos para diabetes. Reposición cada mes. Campos de color, tipo editorial, botones cuadrados. Esto es lo que se usa; lo demás no entra.

Página viva (no indexada): `/sistema`. Tokens en `src/styles/global.css`.

---

## Principios

- Placas, no tarjetas. Cero radio.
- Dos familias: Fraunces para lo que se lee como título, Outfit para lo que se usa.
- El corte de color es la estructura. No se decora con sombras.
- Las enredaderas no se montan sobre el texto ni encima de la foto.
- Un CTA dice lo que ocurre: *Empezar reposición*, no *Enviar*.

---

## Color

Seis valores. Tres campos (crema, bosque, petróleo) y tres apoyos.

| Token | Hex | CSS | Uso |
| --- | --- | --- | --- |
| Crema | `#F4EFE6` | `--cream` / `--color-cream` | Campos claros, foto de Centia, riel del menú, riel del scroll |
| Crema profunda | `#EBE4D4` | `--cream-deep` / `--color-cream-deep` | Primera capa del bloom. Nunca como marca sola |
| Bosque | `#1E4A32` | `--forest` / `--color-forest` | Texto sobre crema, placa de Centia, botón Menú, pulgar del scroll |
| Petróleo | `#0B4F6C` | `--petroleum` / `--color-petroleum` | Nervia, franja de reposición, hover de la barra |
| Petróleo profundo | `#083D54` | `--petroleum-deep` / `--color-petroleum-deep` | Fondo de la foto de Nervia. Un tono, no una paleta extra |
| Tinta | `#1A2A22` | `--ink` / `--color-ink` | Wordmark y cuerpo sobre crema |

Texto atenuado: `#4A5C52`. Borde: `#D9D2C6`.

**Combinaciones**

- Crema + tinta (wordmark)
- Bosque + crema (Centia, menú, bloom)
- Petróleo + crema (Nervia, franja)

**No entra:** rosa, morado, amarillo de marca, naranja, terracota.

---

## Tipografía

| Rol | Familia | Pesos |
| --- | --- | --- |
| Display / títulos | Fraunces | 500, 600 |
| UI / cuerpo / botones | Outfit | 400, 600 |

Google Fonts: Fraunces (opsz 9–144) + Outfit.

### Escala

| Nombre | Familia | Tamaño | Peso | Interlineado | Uso |
| --- | --- | --- | --- | --- | --- |
| Wordmark | Fraunces | `clamp(4.6rem, 18vw, 9.5rem)` | 600 | 0.78 | Glyv en el hero |
| Título de producto | Fraunces | `clamp(2.6rem, 8vw, 5.2rem)` | 500 | 0.9 | Centia, Nervia |
| H1 | Fraunces | `clamp(2.15rem, 6vw, 4.2rem)` | 500 | 1.02 | Hero bosque |
| Índice | Fraunces | `clamp(2.6rem, 4.6vw, 4.4rem)` | 500 | 1.05 | Enlaces del menú |
| Claim | Fraunces | `clamp(1.25rem, 3vw, 1.85rem)` | 500 | 1.2 | Frase bajo el nombre |
| Banda | Fraunces | `clamp(1.35rem, 3.4vw, 2rem)` | 500 | 1.15 | *Cada mes, en tu puerta.* |
| Cuerpo | Outfit | `1.05rem` | 400 | 1.55 | Párrafo del hero |
| CTA | Outfit | `0.85rem` | 600 | — | Botones, Menú |
| Spec label | Outfit | `0.65rem` | 600 | — | dt de la franja (uppercase) |

Alineación a la izquierda. Wordmark y H1 con tracking negativo (`-0.04em` a `-0.05em`). Cuerpo máximo ~28rem / ~34ch en ingredientes.

---

## Botones

Componente: `src/components/ui/GlyvButtons.astro`.

- Alto `2.75rem` (`--cta-h`)
- `border-radius: 0`
- Van sobre **bosque** o **petróleo**. Sobre crema el trazo crema desaparece.

### Bloom (primario)

Contorno crema de 2px. Al hover, tres círculos crecen y rellenan el recuadro; el texto baja y pasa a bosque.

- Capa 1: crema profunda `#EBE4D4`
- Capas 2 y 3: crema
- Ease: `cubic-bezier(0.19, 1, 0.22, 1)` (~1.2s)
- Copy: *Empezar reposición* → `/contacto`

### Tinta (secundario)

Texto crema, subrayado que entra de izquierda a derecha, letras que suben y se sustituyen, flecha de `-50°` a `0°`.

- Ease: `cubic-bezier(0.4, 0, 0.2, 1)` (`--ease-glyv`, 0.48s)
- Copy: *Ver fórmula* / *Ver Centia*

### Menú

Mismo alto y cero radio. Bosque + crema. Al abrir: crema + bosque, con × a la izquierda de *Cerrar*. En escritorio se abre al hover; en táctil, al toque.

---

## Layout

Punto de corte: **900px**.

### Hero

```
┌─────────────┬─────────────┐
│ Crema       │ Bosque      │
│ Glyv        │ H1 + cuerpo │
│             │ + CTAs      │
├─────────────┴─────────────┤
│ Petróleo · reposición     │
└───────────────────────────┘
```

Columnas `1fr 1fr`. Franja de petróleo a todo el ancho. Enredaderas (`GlyvFlora`) en el corte de color, no sobre el tipo.

### Productos

- **Centia:** foto crema | copy bosque. Flora detrás de la foto, visible en el bosque.
- **Nervia:** copy petróleo | foto petróleo profundo. Nervios solo en el copy, franja ~34% a la derecha.

Las placas entran desde los lados (`xPercent`, `power3.out`, una vez).

### Menú

No copia el hero.

```
┌──────────┬────────────────┐
│ Crema    │ Bosque         │
│ Glyv     │ Índice         │
│ Petróleo │ (enlaces)      │
│ + CTAs   │                │
└──────────┴────────────────┘
```

Riel `minmax(16rem, 22rem)` + `1fr`.

### Scroll

Barra nativa oculta en `html`. Barra propia a la derecha: riel crema, pulgar bosque, hover petróleo. Se oculta con el menú abierto.

---

## Movimiento

| Token | Valor | Uso |
| --- | --- | --- |
| `--ease-glyv` | `cubic-bezier(0.4, 0, 0.2, 1)` | Tinta, menú, UI |
| `--ease-bloom` | `cubic-bezier(0.19, 1, 0.22, 1)` | Bloom |
| Placas | `power3.out`, ~1.15s | Productos |
| Flora / nervios | 3.4s, delay 0.55s / 0.95s | Trazos SVG |

Lenis en scroll (no si `prefers-reduced-motion`). Un momento orquestado al entrar; el hover de botones y el menú sí responden a la persona.

Con `prefers-reduced-motion`: sin Lenis, sin draw de flora, bloom pasa a relleno sólido.

---

## Voz

- Tono: salud y claridad. No milagro, no farmacia, no clínica.
- CTAs fijos: *Empezar reposición*, *Ver fórmula*, *Ver Centia*.
- Productos: **Centia** (glucosa), **Nervia** (mente). Línea de etiqueta EQUILIA si hace falta en empaque; en web, Glyv.

---

## No entra

- Rosa o morado
- Amarillo de marca
- Naranja o terracota
- Botones redondos, sombras suaves, cards SaaS
- Hamburguesa genérica
- Sidebar fijo que rompa el corte de color
- Enredaderas encima de la foto o del tipo
- Un hero de estudio (Botánico, Monografía, Campos, Clínica) como página viva

---

## Archivos

| Qué | Dónde |
| --- | --- |
| Tokens CSS | `src/styles/global.css` |
| Copy y paleta | `src/utils/constants.ts` (`HERO`, `PRODUCTS`, `SYSTEM`) |
| Botones | `src/components/ui/GlyvButtons.astro` |
| Menú | `src/components/global/Nav.astro` |
| Scroll | `src/components/global/Scrollbar.astro` |
| Hero | `src/components/home/HeroGlyv.astro` |
| Productos | `src/components/home/Products.astro` |
| Página viva | `/sistema` |
