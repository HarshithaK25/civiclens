import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import LocationPicker from '../components/LocationPicker';
import { createIssue, getPriorityInsight } from '../services/civicData';

const categories = ['Pothole', 'Streetlight', 'Water', 'Drainage', 'Traffic', 'Garbage', 'Other'];
const severities = ['Low', 'Medium', 'High', 'Critical'];

export default function ReportPage({ user }) {
  const [form, setForm] = useState({ title: '', description: '', category: '', severity: '', location: '', photo: null });
  const [coordinates, setCoordinates] = useState(null);
  const [state, setState] = useState({ loading: false, error: '', success: '', issue: null });
  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!user) return setState({ loading: false, error: 'Please sign in before submitting a civic report.', success: '', issue: null });
    if (!form.title.trim() || form.title.trim().length < 8) return setState({ loading: false, error: 'Title must be at least 8 characters.', success: '', issue: null });
    if (!form.description.trim() || form.description.trim().length < 15) return setState({ loading: false, error: 'Description must be at least 15 characters.', success: '', issue: null });
    if (!form.category || !form.severity || !form.location.trim()) return setState({ loading: false, error: 'Category, severity, and locality are required.', success: '', issue: null });
    if (!coordinates) return setState({ loading: false, error: 'Select the exact issue location before submitting.', success: '', issue: null });
    setState({ loading: true, error: '', success: '', issue: null });
    try {
      const issue = await createIssue({ userId: user.id, ...form, latitude: coordinates[0], longitude: coordinates[1] });
      setState({ loading: false, error: '', success: 'Your report was submitted successfully.', issue });
      setForm({ title: '', description: '', category: '', severity: '', location: '', photo: null });
      setCoordinates(null);
    } catch (error) {
      setState({ loading: false, error: error.message || 'Unable to submit your report. Please try again.', success: '', issue: null });
    }
  };

  const insight = form.category && form.severity ? getPriorityInsight({ category: form.category, severity: form.severity }) : null;
  return (
    <div className="page-shell narrow">
      <PageHeader eyebrow="REPORT A CIVIC ISSUE" title="Tell us what needs attention" subtitle="Submit a real report with an exact location so your community can act on it." />
      <motion.form onSubmit={submit} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="panel form-panel">
        <div className="form-grid two-up">
          <Field label="Issue title" value={form.title} onChange={(value) => update('title', value)} placeholder="Large pothole near college entrance" />
          <label className="form-field"><span>Category</span><select value={form.category} onChange={(event) => update('category', event.target.value)}><option value="">Select category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
        </div>
        <Field label="Description" value={form.description} onChange={(value) => update('description', value)} placeholder="Deep pothole causing difficulty for two-wheelers." textarea />
        <div className="form-grid two-up">
          <label className="form-field"><span>Severity</span><select value={form.severity} onChange={(event) => update('severity', event.target.value)}><option value="">Select severity</option>{severities.map((severity) => <option key={severity}>{severity}</option>)}</select></label>
          <Field label="Locality or landmark" value={form.location} onChange={(value) => update('location', value)} placeholder="Describe the nearby locality" />
        </div>
        <LocationPicker value={coordinates} onChange={setCoordinates} />
        {insight && <div className="priority-insight"><strong>CivicLens Priority Insight</strong><p>{insight.reason}</p><small>The final score also considers public-safety category rules and community support after submission.</small></div>}
        <label className="upload-box"><UploadCloud size={22} /><span>{form.photo ? form.photo.name : 'Upload photo evidence (optional)'}</span><input type="file" accept="image/*" onChange={(event) => update('photo', event.target.files?.[0] ?? null)} /></label>
        {state.error && <div className="inline-error">{state.error}</div>}
        {state.success && <div className="location-success">{state.success} {state.issue && `Priority ${state.issue.priority_score}/100.`}</div>}
        <button type="submit" className="primary-button submit-button" disabled={state.loading}>{state.loading ? 'Submitting report...' : 'Submit civic report'}</button>
      </motion.form>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea = false }) {
  return <label className="form-field"><span>{label}</span>{textarea ? <textarea rows={5} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /> : <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />}</label>;
}
