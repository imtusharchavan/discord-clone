import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";
const InviteCodePage = async ({
  params,
}: { params: Promise<{ inviteCode: string }> }) => {
  const {inviteCode} = await params;
  const { redirectToSignIn } = await auth()
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!inviteCode) {
    return redirect("/");
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
