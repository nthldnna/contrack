import { createClient } from "@/src/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireUser() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return { user, supabase };
}