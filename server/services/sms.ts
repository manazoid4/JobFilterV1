type SmsPayload = {
  score: number;
  jobType: string;
  area: string;
};

export async function triggerGoldLeadSms(payload: SmsPayload) {
  console.log('[sms/gold-lead]', {
    title: 'NEW GOLD LEAD',
    job: payload.jobType,
    area: payload.area,
    score: payload.score,
  });

  return { triggered: true, provider: 'stub' };
}
