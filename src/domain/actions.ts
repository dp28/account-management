import * as people from "./people";
import { combineActionPerformers } from "./framework";
export { addPerson, renamePerson } from "./people";

export const performAction = combineActionPerformers([
  people.actionPerformerMap,
]);
