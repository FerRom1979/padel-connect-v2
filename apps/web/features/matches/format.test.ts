import { dayKey, formatDayLabel, groupByDay } from './format';

function at(daysFromNow: number, hour: number) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, 0, 0, 0);

  return date.toISOString();
}

// ponytail: assert pelado, sin framework.
// Corre con: ../api/node_modules/.bin/tsx features/matches/format.test.ts
function check(label: string, condition: boolean) {
  if (!condition) {
    throw new Error(`FALLA: ${label}`);
  }
  console.log(`ok · ${label}`);
}

check('hoy se llama Hoy', formatDayLabel(at(0, 20)) === 'Hoy');
check('mañana se llama Mañana', formatDayLabel(at(1, 9)) === 'Mañana');
check(
  'pasado usa el día de la semana',
  !['Hoy', 'Mañana'].includes(formatDayLabel(at(3, 20))),
);

check(
  'dos horarios del mismo día comparten clave',
  dayKey(at(2, 9)) === dayKey(at(2, 23)),
);

const grouped = groupByDay([
  { playedAt: at(0, 19) },
  { playedAt: at(0, 21) },
  { playedAt: at(1, 10) },
]);

check('agrupa en dos días', grouped.length === 2);
check('el primer grupo tiene los dos de hoy', grouped[0].matches.length === 2);
check('respeta el orden de entrada', grouped[0].label === 'Hoy');

console.log('\ntodo ok');
