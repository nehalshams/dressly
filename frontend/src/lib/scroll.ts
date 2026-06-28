export function scrollToWaitlist() {
  document
    .getElementById("waitlist")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}
