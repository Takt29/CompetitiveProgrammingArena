import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const verifyAccount = functions.https.onCall(async (data, context) => {
  const AuthError = () => {
    return new functions.https.HttpsError(
      "failed-precondition",
      "The function must be called while authenticated."
    );
  };

  const InvalidCodeError = () => {
    return new functions.https.HttpsError(
      "invalid-argument",
      "registrationCode is invalid."
    );
  };

  try {
    const db = admin.firestore();

    const uid = context?.auth?.uid;
    const registrationCode = data?.registrationCode;

    if (!uid) {
      throw AuthError();
    }

    if (typeof registrationCode !== "string" || registrationCode.length === 0) {
      throw InvalidCodeError();
    }

    await db.runTransaction(async (tx) => {
      const doc = await tx.get(
        db.collection("registrationCodes").doc(registrationCode)
      );

      const data = await doc.data();

      if (!doc.exists || !data) {
        throw InvalidCodeError();
      }

      const expiredAt = data.expiredAt as admin.firestore.Timestamp;

      if (expiredAt.toMillis() < new Date().getTime()) {
        throw InvalidCodeError();
      }

      await admin.auth().setCustomUserClaims(uid, { verified: true });

      tx.delete(doc.ref);
    });
  } catch (e) {
    console.log(e);

    if (e instanceof functions.https.HttpsError) {
      throw e;
    }

    throw new functions.https.HttpsError("aborted", "internal server error");
  }
});
