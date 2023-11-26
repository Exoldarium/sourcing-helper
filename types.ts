import { Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface TestDatabase {
  test_table: PersonTable;
}

export interface PersonTable {
  user_id: Generated<string>;
  name: string;
  year: number;
}

export type Person = Selectable<PersonTable>;
export type NewPerson = Insertable<PersonTable>;
export type PersonUpdate = Updateable<PersonTable>;