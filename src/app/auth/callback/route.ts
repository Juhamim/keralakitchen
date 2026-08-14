import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/book';
  const linkBookingId = searchParams.get('link_booking');

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error && data.session?.user) {
        const user = data.session.user;

        // Upsert user profile
        await supabase.from('profiles').upsert({
          id: user.id,
          auth_user_id: user.id,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'Customer',
          email: user.email,
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
          updated_at: new Date().toISOString(),
        });

        // Link guest booking to account if link_booking token parameter is present
        if (linkBookingId) {
          await supabase
            .from('bookings')
            .update({
              user_id: user.id,
              is_guest: false,
              updated_at: new Date().toISOString(),
            })
            .eq('id', linkBookingId);
        }
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}${next}`);
}
