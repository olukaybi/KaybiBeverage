import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/ratelimit';
import { hashEmail, watTimestamp, esc, htmlRow, EMAIL_STYLES, storeLeadBestEffort } from '@/lib/leadEmail';
import { LEAD_SEGMENTS } from '@/lib/leadSegments';

const schema = z.object({
  fullName: z.string().min(2).max(100).trim(),
  businessName: z.string().min(2).max(150).trim(),
  businessType: z.enum(['Retailer', 'Wholesaler', 'Event Supplier', 'HoReCa', 'Other']),
  city: z.string().min(2).max(100).trim(),
  lga: z.string().min(2).max(100).trim(),
  state: z.string().min(2).max(100).trim(),
  phone: z.string().min(10).max(30).trim(),
  whatsapp: z.string().max(30).optional(),
  email: z.string().email().max(200).trim(),
  monthlyVolume: z.string().min(1).max(200).trim(),
  currentFootprint: z.string().min(2).max(300).trim(),
  storageLogistics: z.string().min(2).max(300).trim(),
  yearsInBusiness: z.string().max(100).optional(),
  websiteOrSocial: z.string().max(200).optional(),
  existingBrands: z.string().max(300).optional(),
  preferredTerritory: z.string().max(200).optional(),
  anythingElse: z.string().max(2000).optional(),
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  utm_content: z.string().max(100).optional(),
  utm_term: z.string().max(100).optional(),
  source_page: z.string().max(100).optional(),
  _hp: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!checkRateLimit(ip, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: 'Validation failed.', issues: result.error.issues }, { status: 422 });
  }

  const {
    fullName, businessName, businessType,
    city, lga, state,
    phone, whatsapp, email,
    monthlyVolume, currentFootprint, storageLogistics,
    yearsInBusiness, websiteOrSocial, existingBrands, preferredTerritory, anythingElse,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term, source_page,
    _hp,
  } = result.data;
  const campaignLabel = [utm_source, utm_medium, utm_campaign].filter(Boolean).join(' / ');

  // Honeypot: filled means bot — silently succeed
  if (_hp) return NextResponse.json({ success: true });

  const segmentConfig = LEAD_SEGMENTS.distributor;
  const ts = watTimestamp();
  console.log(`[distributor-application] received name="${fullName}" state="${state}" email=${hashEmail(email)}`);

  await storeLeadBestEffort({
    segment: 'distributor',
    source_page: source_page ?? 'distribution',
    email,
    full_name: fullName,
    phone,
    location: `${city}, ${lga} LGA, ${state} State`,
    enquiry_type: businessType,
    lifecycle_stage: segmentConfig.lifecycleStage,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    payload: result.data,
  });

  const htmlBody = `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>${EMAIL_STYLES}</style>
</head>
<body>
<h2>Distributor application — kayorawater.com</h2>
<p class="meta">Received: ${ts} · Segment: distributor · Lifecycle: ${segmentConfig.lifecycleStage}</p>
<table>
  <tr><td class="section" colspan="2">Applicant</td></tr>
  ${htmlRow('Name', esc(fullName))}
  ${htmlRow('Email', `<a href="mailto:${esc(email)}">${esc(email)}</a>`)}
  ${htmlRow('Phone', esc(phone))}
  ${htmlRow('WhatsApp', esc(whatsapp || '—'))}

  <tr><td class="section" colspan="2">Business</td></tr>
  ${htmlRow('Business Name', esc(businessName))}
  ${htmlRow('Business Type', esc(businessType))}
  ${htmlRow('Location', esc(`${city}, ${lga} LGA, ${state} State`))}
  ${htmlRow('Current Footprint', esc(currentFootprint))}
  ${htmlRow('Storage / Logistics', esc(storageLogistics))}
  ${websiteOrSocial ? htmlRow('Website / Social', esc(websiteOrSocial)) : ''}
  ${existingBrands ? htmlRow('Existing FMCG Brands', esc(existingBrands)) : ''}
  ${preferredTerritory ? htmlRow('Preferred Territory', esc(preferredTerritory)) : ''}

  <tr><td class="section" colspan="2">Distribution</td></tr>
  ${htmlRow('Est. Monthly Volume', esc(monthlyVolume))}
  ${htmlRow('Years in Business', esc(yearsInBusiness || '—'))}

  <tr><td class="section" colspan="2">Additional Info</td></tr>
  <tr><td colspan="2" class="val msg">${esc(anythingElse || '(none provided)')}</td></tr>
  ${campaignLabel ? `<tr><td class="section" colspan="2">Campaign</td></tr>${htmlRow('Source', esc(campaignLabel))}` : ''}
</table>
<p style="margin-top:24px;font-size:12px;color:#888">
  Reply-To is set to the applicant's address — reply directly from your email client.
</p>
</body></html>`;

  const textBody = `Distributor application — kayorawater.com
Received: ${ts}

APPLICANT
  Name:              ${fullName}
  Email:             ${email}
  Phone:             ${phone}
  WhatsApp:          ${whatsapp || '—'}

BUSINESS
  Business Name:     ${businessName}
  Business Type:     ${businessType}
  Location:          ${city}, ${lga} LGA, ${state} State
  Current Footprint: ${currentFootprint}
  Storage/Logistics: ${storageLogistics}

DISTRIBUTION
  Est. Monthly Vol:  ${monthlyVolume}
  Years in Business: ${yearsInBusiness || '—'}

ADDITIONAL INFO
${anythingElse || '(none provided)'}
${campaignLabel ? `\nCAMPAIGN: ${campaignLabel}\n` : ''}
---
Reply-To is set to the applicant's address.`;

  const { error: sendError } = await resend.emails.send({
    from: 'Kayora Water <noreply@kayorawater.com>',
    to: segmentConfig.notifyEmail,
    replyTo: email,
    subject: `[Kayora] Distributor application — ${fullName}, ${state}`,
    html: htmlBody,
    text: textBody,
  });

  if (sendError) {
    console.error(`[distributor-application] send failed email=${hashEmail(email)}`, sendError);
    return NextResponse.json({ error: 'Email delivery failed.' }, { status: 500 });
  }

  console.log(`[distributor-application] sent ok email=${hashEmail(email)}`);
  return NextResponse.json({ success: true });
}
