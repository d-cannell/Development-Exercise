import { ClauseItem } from "./ClauseItem";

export interface Clause {
  id: string;
  sourceId: string;
  title: string;
  items: ClauseItem[];
}
