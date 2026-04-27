'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendResult = { success: true } | { success: false; error: string };

export async function sendInquiry(formData: FormData): Promise<SendResult> {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim();
  const company = (formData.get('company') as string)?.trim();
  const website = (formData.get('website') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !email || !company || !message) {
    return { success: false, error: 'Please complete all required fields.' };
  }

  try {
    await resend.emails.send({
      from: 'Draper Norwood <hello@drapernorwood.com>',
      to: 'hello@drapernorwood.com',
      replyTo: email,
      subject: `Inquiry from ${name} at ${company}`,
      html: `
        <table style="font-family:-apple-system,sans-serif;max-width:560px;margin:0 auto;color:#0B0C0E;">
          <tr><td style="padding:40px 0 24px;">
            <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.15em;color:#999;">New inquiry</p>
            <h1 style="margin:0;font-size:22px;font-weight:400;">${name}</h1>
            <p style="margin:6px 0 0;font-size:14px;color:#666;">${email}</p>
          </td></tr>
          <tr><td style="padding:20px 0;border-top:1px solid #E6E4DD;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:8px 0;width:130px;font-size:10px;text-transform:uppercase;letter-spacing:0.14em;color:#aaa;vertical-align:top;">Company</td>
                <td style="padding:8px 0;font-size:14px;">${company}</td>
              </tr>
              ${website ? `<tr>
                <td style="padding:8px 0;font-size:10px;text-transform:uppercase;letter-spacing:0.14em;color:#aaa;vertical-align:top;">Website</td>
                <td style="padding:8px 0;font-size:14px;"><a href="${website}" style="color:#2E5D4B;">${website}</a></td>
              </tr>` : ''}
            </table>
          </td></tr>
          <tr><td style="padding:24px 0;border-top:1px solid #E6E4DD;">
            <p style="margin:0 0 12px;font-size:10px;text-transform:uppercase;letter-spacing:0.14em;color:#aaa;">What they're looking to improve</p>
            <p style="margin:0;font-size:15px;line-height:1.65;color:#333;">${message.replace(/\n/g, '<br>')}</p>
          </td></tr>
        </table>
      `,
    });
    return { success: true };
  } catch (err) {
    console.error('Resend error:', err);
    return { success: false, error: 'Failed to send. Please try again or email us directly.' };
  }
}
