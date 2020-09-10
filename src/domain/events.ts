import { PeopleEvents } from "./people";
import { OrganisationEvents } from "./organisations";
import { IdentityEvents } from "./identities";

export type Events = PeopleEvents | OrganisationEvents | IdentityEvents;
