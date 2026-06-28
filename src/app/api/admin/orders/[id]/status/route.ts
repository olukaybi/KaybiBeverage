import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient, createServiceClient } from '@/lib/supabase/server';
import { SHOP_ENABLED } from '@/lib/flags';

const BodySchema = z.object({
  status: z.enum(['pending_payment', 'paid', 'scheduled', 'dispatched', 'delivered', 'cancelled']),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!SHOP_ENABLED) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const { id } = await params;

  // Verify admin session
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 });
  }

  const parse = BodySchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid status.' }, { status: 422 });
  }

  const serviceSupabase = createServiceClient();
  const { error } = await serviceSupabase
    .from('orders')
    .update({ status: parse.data.status })
    .eq('id', id);

  if (error) {
    console.error('Status update error:', error);
    return NextResponse.json({ error: 'Failed to update status.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
