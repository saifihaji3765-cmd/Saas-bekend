export function saasGuard(user) {
  if (!user) throw new Error("Unauthorized");

  if (user.plan === "free" && user.requests_used >= 3) {
    throw new Error("Free plan limit reached");
  }

  return true;
}
