import * as people from "./people";
import * as organisations from "./organisations";
import * as identities from "./identities";
import { combineActionPerformers } from "./framework";
export { addPerson, renamePerson } from "./people";
export { addOrganisation, renameOrganisation } from "./organisations";
export { addIdentity, deleteIdentity, addSecret } from "./identities";

export const performAction = combineActionPerformers([
  people.actionPerformerMap,
  organisations.actionPerformerMap,
  identities.actionPerformerMap,
]);
