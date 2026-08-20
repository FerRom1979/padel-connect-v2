# Decisiones

Por qué el código es como es. Está en castellano igual que los comentarios del
código; el README queda en inglés.

Lo que se puede leer del código no está acá. Esto es el "por qué" que no
sobrevive en un diff: qué se descartó, qué se dejó a medias a propósito y qué
todavía nadie miró funcionando.

---

## Categorías de jugador

Antes era `level Int` (1 a 10). Ahora es un enum `PlayerCategory`:
**C1–C8 para caballeros, D1–D7 para damas**.

**El número más bajo es el mejor jugador.** C1 y D1 son profesionales, C8 y D7
principiantes. El modelo anterior no solo ignoraba que son dos escalas
distintas: tenía el orden invertido. Cada punta se explica en el propio
selector (`C8 · principiante`) para que nadie tenga que adivinar la dirección.

Consecuencia: **no existe un orden total entre categorías.** C5 y D3 no se
pueden comparar. Por eso `Match.categories` y `Tournament.categories` son
**listas de categorías aceptadas y no rangos** — un rango obligaría a elegir
una sola escala y dejaría afuera los partidos mixtos.

## Partidos

El pádel es 2v2, así que **todo partido tiene exactamente 4 lugares** y el
organizador ocupa uno. `MATCH_SIZE` es una constante, no una columna.

Lo que **no** se guarda porque es derivable:

- "completo" es `players.length >= 4`
- "ya pasó" es `playedAt < now`

La única bandera real es `cancelledAt`, que no se deduce de nada.

**Cómo se entra: el que llega primero.** Sin estados de solicitud ni pantalla de
aprobación. Si aparece gente que no cae, ahí recién vale la pena agregar
aprobación del organizador.

### La carrera por el último lugar

`join` corre en una transacción **Serializable**. Sin eso, dos personas tocando
"Sumarme" al mismo tiempo entran las dos al último lugar y el partido termina
con 5 jugadores.

Pero Serializable **aborta** las transacciones en conflicto, y Prisma no
reintenta: la primera versión devolvía `500 Internal server error` a dos de
cuatro personas y encima dejaba el lugar libre. Ahora hay reintento sobre el
código `P2034`, que es el camino previsto para ese error. Probado con cuatro
pedidos simultáneos sobre tres lugares: entran tres, la cuarta recibe un 400
honesto, el partido llega a 4.

## Sedes

Un partido o torneo dice dónde se juega de dos formas: **un `Club` cargado en la
app, o el nombre del lugar escrito a mano**. En la UI es un solo campo: buscás,
y si el club aparece lo elegís; si no, queda lo que tipeaste. Dos campos
separados obligarían a decidir antes de saber si el club existe.

Toda la lógica vive en `resolveVenue` (`src/common/venue/`), con tests propios.
Dos reglas:

- **Si hay club, manda el club**: su nombre y su ciudad ganan sobre lo que mande
  el cliente. Si no, nada impediría publicar un club de Lomas dentro del listado
  de Avellaneda.
- **`venueName` queda desnormalizado a propósito.** Si el club se renombra, los
  eventos viejos conservan el nombre que tenían — para un histórico es lo
  correcto. El link al club sigue vivo por `clubId`.

## Clubes

**Los carga cualquier jugador**, no un admin. La idea es que el mapa lo llene la
comunidad. `@@unique([name, cityId])` evita que el mismo club entre dos veces.

Quedó afuera a propósito: gestión de canchas y disponibilidad horaria. Eso es
reservas, que es un producto entero aparte.

## Torneos

**La inscripción es individual y el compañero es texto libre.** El pádel se
juega en parejas, pero exigir que el compañero ya tenga cuenta dejaría afuera
media inscripción.

El cupo **no se puede bajar por debajo de las parejas ya anotadas**: dejaría
gente colgada sin saberlo.

## Route groups

Tres grupos, cada uno con un trabajo:

| Grupo          | Guard                    | Rutas            |
| -------------- | ------------------------ | ---------------- |
| `(auth)`       | `AuthRedirectGuard`      | login, register  |
| `(onboarding)` | `AuthGuard`, sin shell   | complete-profile |
| `(protected)`  | `AuthGuard` + `AppShell` | todo lo demás    |

**Esto no es cosmético.** `complete-profile` vivía en `(auth)`, cuyo guard manda
a `/dashboard` a cualquier usuario logueado; `/dashboard` manda a
`/complete-profile` si el perfil está incompleto. **Todo usuario que se
registraba entraba en un loop de redirects infinito.** El onboarding no
funcionaba. Separar los grupos es lo que lo arregla.

`ProfileCompletionGuard` era un duplicado exacto de la lógica de `AuthGuard` y
se eliminó.

## Privacidad y acceso

Cuatro endpoints de `/users` estaban **sin autenticación**:

| Antes                                                           | Ahora                                  |
| --------------------------------------------------------------- | -------------------------------------- |
| `GET /users` listaba todos los usuarios                         | requiere sesión                        |
| `GET /users/:id` devolvía email, teléfono, whatsapp e instagram | requiere sesión, sin datos de contacto |
| `PATCH /users/:id` modificaba cualquier cuenta                  | ruta eliminada                         |
| `DELETE /users/:id` **borraba cualquier cuenta**                | ruta eliminada                         |

`PATCH` y `DELETE` por id se eliminaron en vez de protegerse: no los llamaba
nadie, y "editá o borrá el usuario que quieras" no es una funcionalidad del
producto. Si hace falta un panel de admin, se construye con chequeo de rol.

El perfil público de un jugador (`userDetailSelect`) **no expone datos de
contacto**. Cómo te contactan es decisión de cada uno y todavía no hay forma de
expresarla. La coordinación pasa por el partido.

## Listados

Todos devuelven `{ items, hasMore }`. Se pide **una fila de más** que el tope
para saber si quedó algo afuera sin contar la tabla entera.

**Esto no es paginación**: no se puede avanzar a la página siguiente. Solo hace
visible un corte que antes era silencioso. La paginación real está en el
roadmap; construirla con los datos actuales sería adivinar la forma.

## Frontend

**Tokens de color en `globals.css`.** Nada de `gray-*`, `bg-white` ni colores
literales en componentes: rompen el modo oscuro. El dark mode sigue
`prefers-color-scheme`, sin toggle — nadie lo pidió y agrega estado que
persistir. El verde de marca se aclara a `#2ea043` en oscuro porque el original
no llega a 4.5:1 contra el fondo.

**Dos tipografías.** Geist para todo; Barlow Condensed **solo** para el wordmark
y los títulos de página. Es la condensada de marcador deportivo.

**La cancha de pádel es la marca.** Un SVG (`components/brand/court.tsx`) que se
usa como logo, como panel a sangre en el login y como marca en los estados
vacíos. Una idea, tres lugares.

**Los partidos se agrupan por día** con encabezados "Hoy" / "Mañana" / fecha, y
la tarjeta muestra solo la hora, grande. Saber si un partido es hoy o dentro de
tres semanas tiene que resolverse de un vistazo. Reloj de 24 horas: acá nadie
dice "8 p. m.".

**Voseo en todo el texto de interfaz.** Y nada de adjetivos con género para
hablarle al usuario: decía "¿Listo para jugar hoy?" a todo el mundo.

## Convención `ponytail:`

Los comentarios que empiezan con `ponytail:` marcan un atajo deliberado y su
techo conocido — no una omisión. Ejemplo: el filtro de disponibilidad se
resuelve en memoria sobre 100 filas porque `COUNT(players) < 4` no se puede
poner en el `where` de Prisma; el comentario dice cuándo hay que pasarlo a SQL.

## Tests

- `apps/api`: Jest. 31 tests sobre la lógica que puede romperse en silencio —
  capacidad y concurrencia de `join`, reglas de edición de torneos, resolución
  de sede.
- `apps/web`: no hay framework de tests. Los helpers de fecha tienen
  self-checks con `assert` pelado (`features/*/format.test.ts`), porque
  "Hoy"/"Mañana" se calcula por día calendario y se rompe callado al cruzar
  medianoche. Se corren con
  `../api/node_modules/.bin/tsx features/matches/format.test.ts`.

Se borraron dos specs generados por scaffolding (`users.controller.spec.ts` y
`users.service.spec.ts`) que solo verificaban "should be defined" y estaban
rotos desde que se generaron. Hacían fallar `pnpm test` en todo el repo.

---

## Sin verificación visual

Todo esto compila, responde 200 y tiene su API probada con curl, pero **nadie lo
vio funcionando en pantalla**: la extensión de Chrome dejó de responder a los
screenshots a mitad del trabajo.

- El campo de sede (que al elegir un club desaparezca el campo de ciudad)
- Las pantallas de Clubes
- Las pantallas de edición de partido y torneo
- Los filtros de historial

Sí se verificaron en el navegador: login, registro, onboarding completo,
dashboard, partidos (crear, sumarse, salirse, cancelar), perfil, jugadores y
torneos.

## Qué sigue

1. Mirar lo de arriba en un navegador.
2. **Notificaciones**: si te cancelan un partido o torneo te enterás solo si
   entrás a mirar.
3. **Paginación real** cuando haya volumen que la justifique.
4. **Recuperar contraseña**: no hay endpoint. `emailVerified` existe en el
   modelo y no lo usa nadie.
5. **Cercanía**: `User` ya tiene `latitude`, `longitude` y `travelDistanceKm`
   sin usar. Ahora que hay clubes con dirección, ordenar por distancia
   empieza a tener sentido.
