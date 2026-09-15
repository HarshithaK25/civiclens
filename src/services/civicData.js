import { isSupabaseConfigured, supabase } from '../supabase';

function requireSupabase() {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to your environment.');
}

const severityScores = { Low: 20, Medium: 45, High: 70, Critical: 90 };
const categoryScores = { Pothole: 12, Streetlight: 10, Water: 14, Drainage: 14, Traffic: 16, Garbage: 8, Other: 5 };

export function calculatePriorityScore({ severity, category }) {
  const publicSafetyScore = ['Traffic', 'Pothole', 'Water', 'Drainage'].includes(category) ? 10 : 4;
  return Math.min(100, (severityScores[severity] ?? 20) + (categoryScores[category] ?? 5) + publicSafetyScore);
}

export function getPriorityInsight({ severity, category, priorityScore = calculatePriorityScore({ severity, category }) }) {
  const reasons = [];
  if ((severityScores[severity] ?? 0) >= 70) reasons.push('the reported severity is high');
  if (['Traffic', 'Pothole', 'Water', 'Drainage'].includes(category)) reasons.push('the issue affects public infrastructure');
  if (!reasons.length) reasons.push('the submitted category and severity were assessed');
  return { score: priorityScore, reason: `Priority is ${priorityScore}/100 because ${reasons.join(' and ')}.` };
}

export async function fetchIssues({ mineUserId } = {}) {
  requireSupabase();
    let query = supabase.from('issues').select('*');
  if (mineUserId) query = query.eq('reporter_id', mineUserId);
  const { data, error } = await query;
  if (error) throw error;
    return (data ?? [])
      .sort((left, right) => new Date(right.created_at || 0) - new Date(left.created_at || 0))
      .map((issue) => ({ ...issue, supportCount: 0 }));
}

export async function createIssue({ userId, title, description, category, severity, location, latitude, longitude, photo }) {
  requireSupabase();
  let photoUrl = null;
  if (photo) {
    const extension = photo.name.split('.').pop() || 'jpg';
    const path = `${userId}/${crypto.randomUUID()}.${extension}`;
    const upload = await supabase.storage.from('issue-photos').upload(path, photo, { upsert: false });
    if (upload.error) throw upload.error;
    photoUrl = supabase.storage.from('issue-photos').getPublicUrl(path).data.publicUrl;
  }
  const priorityScore = calculatePriorityScore({ severity, category });
  const { data, error } = await supabase.from('issues').insert({ reporter_id: userId, title: title.trim(), description: description.trim(), category, severity, location: location.trim(), latitude, longitude, photo_url: photoUrl, priority_score: priorityScore, status: 'Reported' }).select('*').single();
  if (error) throw error;
  return data;
}

export async function toggleIssueSupport(issueId, userId, isSupported) {
  requireSupabase();
  const result = isSupported
    ? await supabase.from('issue_supports').delete().match({ issue_id: issueId, user_id: userId })
    : await supabase.from('issue_supports').insert({ issue_id: issueId, user_id: userId });
  if (result.error) throw result.error;
  return !isSupported;
}

export function summarizeIssues(items) {
  return {
    total: items.length,
    active: items.filter((issue) => issue.status !== 'Resolved').length,
    resolved: items.filter((issue) => issue.status === 'Resolved').length,
    highPriority: items.filter((issue) => Number(issue.priority_score) >= 70).length,
    supports: items.reduce((sum, issue) => sum + Number(issue.supportCount ?? 0), 0),
  };
}
