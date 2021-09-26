import { Clause } from "./Clause";
import { ClauseItem } from "./ClauseItem";

export class ClauseManager {

  /**
   * This is the primary method of the ClauseManager class, and will filter and display duplicate values detected in a list of clauses.
   * @param clauses A list of clauses to output (providing they have duplicates)
   */
  static outputClauses(clauses: Clause[]) {
    const duplicates = ClauseManager.findDuplicates(clauses);

    duplicates.forEach((clause) => {
      ClauseManager.displayClause(clause);
    });
    console.error(
      "\x1b[31m%s\x1b[0m", // This string colours the text red in the console.
      `${duplicates.length === 0 ? "No" : duplicates.length} duplicates found`
    );
  }

  /**
   * Find duplicates in a list of clauses, the 'sourceId', 'title' and 'items' are checked (the 'id' is NOT checked).
   * @param clauses An array containing a list of clauses.
   * @returns An array containing a list of clauses with duplicate entries.
   */
  private static findDuplicates = (clauses: Clause[]): Clause[] => {
    let duplicates: Clause[] = [];
    const clonedClauses = clauses;

    clauses.forEach((currentClause, index) => {
      if (
        clonedClauses.some(
          (clause) =>
            clause.sourceId === currentClause.sourceId &&
            clause.title === currentClause.title &&
            clause.id !== currentClause.id &&
            ClauseManager.checkItems(currentClause, clause)
        )
      ) {
        duplicates.push(currentClause);
      }
    });

    return duplicates;
  };

  /**
   * This method is for comparing the items in two clauses and returns a boolean value based upon if they match or not.
   * @param clauseA The primary clause that is to be compared with another.
   * @param clauseB The clause to compare with.
   * @returns True if the items in both clauses match.
   */
  private static checkItems = (clauseA: Clause, clauseB: Clause): boolean => {
    if (clauseA.items.length !== clauseB.items.length) return false;

    const itemsA: ClauseItem[] = clauseA.items.sort((itemA, itemB) =>
      itemA.title > itemB.title ? 1 : -1
    );
    const itemsB: ClauseItem[] = clauseB.items.sort((itemA, itemB) =>
      itemA.title > itemB.title ? 1 : -1
    );

    for (let i = 0; i < itemsA.length; i++) {
      if (itemsA[i].title === itemsB[i].title) {
        if (itemsA[i].value === itemsB[i].value) {
          return true;
        }
      }
    }
    return false;
  };

  /**
   * Formats and logs a clause (duplicate) to the console.
   * @param clause The dusplicate clause which needs to be displayed.
   */
  private static displayClause = (clause: Clause): void => {
    console.log("This clause is a duplicate!");
    console.info("\x1b[33m%s\x1b[0m", `ID: ${clause.id}`); // The big mess of a string at the start colours the output yellow
    console.info("\x1b[33m%s\x1b[0m", `Title: ${clause.title}`);
    console.info("\x1b[33m%s\x1b[0m", `Number of items: ${clause.items.length}`);
    console.log("");
  };
}
