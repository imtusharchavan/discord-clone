import { auth } from "@clerk/nextjs/server";

import { db } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null; // User is not authenticated
  }

  const profile = await db.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile; // Return the profile or null if not found
};
