import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface ChannelPageProps {
  params: Promise<{
    serverId: string;
    channelId: string;
  }>;
}

const ChannelPage = async ({ params }: ChannelPageProps) => {
  const { serverId, channelId } = await params;
  const { redirectToSignIn } = await auth();
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    return redirect("/");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        serverId={channel.serverId}
        name={channel.name}
        type="channel"
      />
      <div className="flex-1">Future Messages</div>
      <ChatInput
        apiUrl="/api/socket/messages"
        query={{ channelId: channel.id, serverId: channel.serverId }}
        name={channel.name}
        type="channel"
      />
    </div>
  );
};

export default ChannelPage;
