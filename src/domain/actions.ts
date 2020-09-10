import * as people from "./people";
import * as organisations from "./organisations";
import { combineActionPerformers } from "./framework";
export { addPerson, renamePerson } from "./people";
export { addOrganisation, renameOrganisation } from "./organisations";
export { addIdentity, deleteIdentity } from "./identities";

export const performAction = combineActionPerformers([
  people.actionPerformerMap,
  organisations.actionPerformerMap,
]);
