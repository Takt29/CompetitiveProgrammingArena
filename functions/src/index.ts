import * as task from "./task";
import * as auth from "./auth";
import * as standings from "./standings";
import * as notification from "./notification";
import * as admin from "firebase-admin";

admin.initializeApp();

process.env.TZ = "Asia/Tokyo";

export { task, auth, standings, notification };
