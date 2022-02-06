import * as task from "./task";
import * as auth from "./auth";
import * as standings from "./standings";
import * as admin from "firebase-admin";

admin.initializeApp();

export { task, auth, standings };
