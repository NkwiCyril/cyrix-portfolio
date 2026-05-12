"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2, Mail } from "lucide-react";

interface MarkReadButtonProps {
  id: string;
  isRead: boolean;
}

export function MarkReadButton({ id, isRead }: MarkReadButtonProps) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const toggle = async () => {
    setPending(true);
    try {
      const response = await fetch(`/api/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: !isRead }),
      });
      if (!response.ok) throw new Error("Failed to update");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update message");
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={pending}
      title={isRead ? "Mark as unread" : "Mark as read"}
      className="rounded p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-accent disabled:opacity-50"
    >
      {pending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isRead ? (
        <Mail size={16} />
      ) : (
        <Check size={16} />
      )}
    </button>
  );
}
