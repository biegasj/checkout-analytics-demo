import { Session } from "@remix-run/node";
import { v4 as uuidv4 } from "uuid";
import { getSession } from "~/sessions";

export async function getOrCreateSessionId(
  cookieHeader: string | null
): Promise<{ sessionId: string; session: Session }> {
  const session = await getSession(cookieHeader);
  let sessionId: string = session.get("sessionId");

  if (!sessionId) {
    sessionId = uuidv4();
    session.set("sessionId", sessionId);
  }

  return { sessionId, session };
}
