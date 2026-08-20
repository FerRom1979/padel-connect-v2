/**
 * Los listados devuelven un tope de filas. Antes cortaban en silencio; ahora
 * avisan si quedó algo afuera, para que el usuario sepa que tiene que filtrar.
 */
export type Paginated<T> = {
  items: T[];
  hasMore: boolean;
};

export const EMPTY_PAGE = { items: [], hasMore: false };
