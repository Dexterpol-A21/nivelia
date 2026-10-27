# Ekilia — Design system

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

Cuatro valores de marca. Detalle en `docs/05-paleta.md`.

| Color | Rol | Hex | CSS | Uso |
| --- | --- | --- | --- | --- |
| Hueso | Claridad | `#F6F3EE` | `--cream` | Fondo, riel del menú y del scroll |
| Azul | Confianza | `#0E6E9E` | `--forest` | Primario. Menú, Centia |
| Turquesa | Naturaleza | `#0F6468` | `--turquoise` / `--band` | Franja, flora, bloom |
| Mora | Equilibrio | `#3E2770` | `--petroleum` | Nervia |

Tinta `#1A1228`. Apoyos: hueso profundo `#E6DFD4`, turquesa profundo `#0B4C50`, mora profunda `#2A1B4D`.

**Combinaciones**

- Hueso + tinta (wordmark y cuerpo)
- Azul + hueso (Centia, menú)
- Turquesa + hueso (franja de reposición)
- Mora + hueso (Nervia)

**No entra:** rosa, naranja, terracota, amarillo de marca, verde bosque de la paleta anterior.

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
| Wordmark | Fraunces | `clamp(4.6rem, 18vw, 9.5rem)` | 600 | 0.78 | Ekilia en el hero |
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

Componente: `src/components/ui/EkiliaButtons.astro`.

- Alto `2.75rem` (`--cta-h`)
- `border-radius: 0`
- Van sobre **azul**, **mora** o **turquesa**, con trazo hueso.
- Sobre **hueso** el trazo hueso desaparece. Ahí el botón es tinta `#1A1228`.

### Bloom (primario)

Contorno de 2px. Al hover, tres círculos crecen. El relleno final es el color de las letras y la palabra toma el color del fondo.

- Sobre azul, mora o turquesa las letras son hueso, así que el relleno queda hueso `#F6F3EE` y la palabra queda del color de la placa.
- Sobre hueso, *Entrar* lleva letras tinta. El relleno queda tinta `#1A1228` y la palabra queda hueso `#E6DFD4`, el color del fondo.
- Capa 1: el color de la placa. Sobre hueso, tinta.
- Capas 2 y 3: el color de las letras.
- Ease: `cubic-bezier(0.19, 1, 0.22, 1)` (~1.2s), capas 2 y 3 con 0.12s y 0.24s
- Copy sobre color: *Empezar reposición*. Sobre hueso: *Entrar*.

Sobre hueso el trazo en reposo es tinta `#1A1228`. Al hover el relleno queda tinta y la palabra queda hueso `#E6DFD4`.

### Tinta (secundario)

Subrayado que entra de izquierda a derecha, la palabra sube y se sustituye, flecha de `-50°` a `0°`.

- Ease de la línea y la flecha: `cubic-bezier(0.4, 0, 0.2, 1)` (`--ease-ekilia`, 0.48s)
- La palabra usa el mismo ease del bloom
- Sobre color: texto hueso. Copy: *Ver fórmula* / *Ver Centia*
- Sobre hueso: texto tinta. Copy: *Crear cuenta*. Si el formulario ya está en crear, dice *Ya tengo cuenta*

Con `prefers-reduced-motion`, el bloom no anima los círculos: el recuadro pasa al color de las letras y la palabra queda en el color del fondo. Sobre hueso, relleno tinta y palabra `#E6DFD4`.

### Menú

Mismo alto y cero radio. Azul + blanco. Al abrir: blanco + azul, con × a la izquierda de *Cerrar*. En escritorio se abre al hover; en táctil, al toque.

---

## Layout

Punto de corte: **900px**.

### Hero

```
┌─────────────┬─────────────┐
│ Hueso        │ Azul        │
│ Ekilia      │ H1 + cuerpo │
│             │ + CTAs      │
├─────────────┴─────────────┤
│ Turquesa · reposición     │
└───────────────────────────┘
```

Columnas `1fr 1fr`. Franja de turquesa a todo el ancho. Enredaderas (`EkiliaFlora`) en azul sobre hueso y en hueso sobre color, en el corte de color, no sobre el tipo.

### Productos

- **Centia:** foto hueso | copy azul. Flora azul detrás de la foto, hueso sobre el azul.
- **Nervia:** copy mora | foto mora profunda. Nervios solo en el copy, franja ~34% a la derecha.

Las placas entran desde los lados (`xPercent`, `power3.out`, 1.15s, una vez). Host: `data-slide-host`. Pane: `data-slide="left|right"`. Cada placa apilada es su propio host. Hero no entra.

### Menú

No copia el hero.

```
┌──────────┬────────────────┐
│ Hueso     │ Azul           │
│ Ekilia   │ Índice         │
│ Mora     │ (enlaces)      │
│ + CTAs   │                │
└──────────┴────────────────┘
```

Riel `minmax(16rem, 22rem)` + `1fr`.

### Scroll

Barra nativa oculta en `html`. Barra propia a la derecha: riel hueso, pulgar azul, hover turquesa. Se oculta con el menú abierto.

---

## Movimiento

| Token | Valor | Uso |
| --- | --- | --- |
| `--ease-ekilia` | `cubic-bezier(0.4, 0, 0.2, 1)` | Tinta, menú, UI |
| `--ease-bloom` | `cubic-bezier(0.19, 1, 0.22, 1)` | Bloom |
| Placas | `power3.out`, 1.15s | Toda placa de color (`data-slide`) |
| Flora / nervios | 3.4s, delay 0.55s / 0.95s | Trazos SVG |

Lenis en scroll (no si `prefers-reduced-motion`). Un momento orquestado al entrar; el hover de botones y el menú sí responden a la persona.

Con `prefers-reduced-motion`: sin Lenis, sin draw de flora, bloom pasa a relleno sólido.

---

## Voz

- Tono: salud y claridad. No milagro, no farmacia, no clínica.
- CTAs fijos: *Empezar reposición*, *Ver fórmula*, *Ver Centia*.
- Productos: **Centia** (glucosa), **Nervia** (mente). Línea de etiqueta EQUILIA si hace falta en empaque; en web, Ekilia.

---

## No entra

- Rosa, naranja o terracota
- Amarillo de marca
- Verde bosque de la paleta anterior
- Botones redondos, sombras suaves, cards SaaS
- Hamburguesa genérica
- Sidebar fijo que rompa el corte de color
- Enredaderas encima de la foto o del tipo
- Un hero de estudio (Botánico, Monografía, Campos, Clínica) como página viva

---

## Archivos

| Qué | Dónde |
| --- | --- |
| Paleta | `docs/05-paleta.md` |
| Tokens CSS | `src/styles/global.css` |
| Copy y paleta | `src/utils/constants.ts` (`HERO`, `PRODUCTS`, `SYSTEM`) |
| Botones | `src/components/ui/EkiliaButtons.astro` |
| Menú | `src/components/global/Nav.astro` |
| Scroll | `src/components/global/Scrollbar.astro` |
| Hero | `src/components/home/HeroEkilia.astro` |
| Productos | `src/components/home/Products.astro` |
| Página viva | `/sistema` |
