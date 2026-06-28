"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/lib/language";

export function Waitlist() {
  const { hi } = useLanguage();
  const [email, setEmail] = useState("");

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error(hi ? "Sahi email likhiye" : "Please enter a valid email");
      return;
    }
    toast.success(hi ? "Aap list mein add ho gaye hain!" : "You're on the list! We'll be in touch soon.");
    setEmail("");
  };

  return (
    <section id="waitlist" className="px-6 pb-24 md:pb-32">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-plum p-10 shadow-card md:p-16">
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blush/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="reveal relative mx-auto max-w-2xl text-center text-primary-foreground">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] opacity-80">Join the waitlist</p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl">Join the Dressly Waitlist</h2>
          <p className="mt-4 text-base opacity-85">
            Get early access, exclusive boutique drops, and a founding-member discount on your first order.
          </p>
          {hi && (
            <p className="mt-2 font-sans italic text-sm opacity-80">
              Sabse pehle Dressly ka access paaiye aur naye offers miss mat kijiye.
            </p>
          )}

          <form
            onSubmit={handleJoin}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <Input
              type="email"
              required
              placeholder={hi ? "Apna email likhiye" : "you@example.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-full border-white/20 bg-white/10 px-5 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-blush"
            />
            <Button
              type="submit"
              className="h-12 rounded-full bg-background px-7 text-plum hover:bg-blush"
            >
              Join Waitlist
            </Button>
          </form>
          <p className="mt-3 text-xs opacity-70">Free registration • No spam</p>
          {hi && (
            <p className="mt-1 font-sans italic text-xs opacity-70">
              Free registration • Koi spam nahi.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
