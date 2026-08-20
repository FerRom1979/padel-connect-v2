import { formatPrice, formatTournamentDates } from './format';

// ponytail: assert pelado, sin framework.
// Corre con: ../api/node_modules/.bin/tsx features/tournaments/format.test.ts
function check(label: string, condition: boolean) {
  if (!condition) throw new Error(`FALLA: ${label}`);
  console.log(`ok · ${label}`);
}

const oct10 = new Date(2026, 9, 10, 9).toISOString();
const oct12 = new Date(2026, 9, 12, 21).toISOString();
const nov02 = new Date(2026, 10, 2, 21).toISOString();

check(
  'un solo día no arma rango',
  !formatTournamentDates(oct10, null).includes('al'),
);
check(
  'mismo día en inicio y fin tampoco',
  !formatTournamentDates(oct10, oct10).includes('al'),
);
check(
  'mismo mes no repite el mes',
  formatTournamentDates(oct10, oct12) === '10 al 12 de octubre de 2026',
);
check(
  'cruce de mes nombra los dos',
  formatTournamentDates(oct10, nov02).includes('octubre') &&
    formatTournamentDates(oct10, nov02).includes('noviembre'),
);

check('gratis se dice gratis', formatPrice(0) === 'Gratis');
check('sin precio no inventa', formatPrice(null) === null);
check(
  'con precio aclara que es por pareja',
  formatPrice(25000)!.includes('por pareja'),
);

console.log('\ntodo ok');
