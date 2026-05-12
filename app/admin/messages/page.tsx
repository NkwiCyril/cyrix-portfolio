import { adminClient } from "@/utils/supabase/admin";
import { Mail, MailOpen } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import { MarkReadButton } from "@/components/admin/mark-read-button";

export const revalidate = 0;

export default async function AdminMessagesPage() {
  const { data: messages, error } = await adminClient
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-lg border border-red-800 bg-red-950/20 p-6">
        <h2 className="text-lg font-bold text-red-400">Error loading messages</h2>
        <p className="mt-2 text-sm text-red-300">{error.message}</p>
      </div>
    );
  }

  const unreadCount = messages?.filter((m) => !m.is_read).length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <p className="mt-1 text-sm text-gray-400">
          Contact-form submissions
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex items-center rounded-full bg-accent/20 px-2 py-0.5 text-xs font-bold text-accent">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      {messages && messages.length > 0 ? (
        <div className="space-y-3">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`rounded-lg border p-6 transition-colors ${
                message.is_read
                  ? "border-gray-800 bg-[#0f0f0f]"
                  : "border-accent/40 bg-accent/5"
              }`}
            >
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  {message.is_read ? (
                    <MailOpen size={18} className="mt-0.5 text-gray-500" />
                  ) : (
                    <Mail size={18} className="mt-0.5 text-accent" />
                  )}
                  <div>
                    <h2 className="font-semibold text-white">
                      {message.subject}
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                      <span className="font-medium text-gray-300">
                        {message.name}
                      </span>{" "}
                      &lt;
                      <a
                        href={`mailto:${message.email}?subject=${encodeURIComponent(
                          "Re: " + message.subject
                        )}`}
                        className="text-accent hover:underline"
                      >
                        {message.email}
                      </a>
                      &gt;
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="mr-2 text-xs text-gray-500">
                    {new Date(message.created_at).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <MarkReadButton id={message.id} isRead={message.is_read} />
                  <DeleteButton
                    id={message.id}
                    endpoint="/api/messages"
                    itemName={`Message from ${message.name}`}
                  />
                </div>
              </header>

              <p className="mt-4 whitespace-pre-wrap border-t border-gray-800 pt-4 text-sm leading-relaxed text-gray-300">
                {message.message}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-gray-800 bg-[#0f0f0f] p-12 text-center">
          <Mail size={32} className="mx-auto text-gray-600" />
          <p className="mt-3 text-gray-400">No messages yet.</p>
          <p className="mt-1 text-xs text-gray-500">
            Submissions from the contact form will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
