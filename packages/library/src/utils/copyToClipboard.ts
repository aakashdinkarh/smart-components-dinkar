import { toast } from "@components/Toast";

export async function copyToClipboard(
  text = ""
): Promise<{ success: true; error: null } | { success: false; error: string }> {
  try {
    await window.navigator.clipboard.writeText(text);
    toast.success("Copied !", {
      closeAfter: 2,
      closeButton: { showCloseIcon: false },
      timerStrip: { showTimerStrip: false },
    });
    return {
      success: true,
      error: null,
    };
  } catch (e) {
    toast.error("! Could not copy !", {
      closeAfter: 2,
      closeButton: { showCloseIcon: false },
      timerStrip: { showTimerStrip: false },
    });
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}
