import { useEffect, useState } from 'react';
import { fetchIssues } from '../services/civicData';

export function useLiveIssues(mineUserId) {
  const [state, setState] = useState({ issues: [], loading: true, error: '' });
  useEffect(() => {
    let active = true;
    setState({ issues: [], loading: true, error: '' });
    fetchIssues({ mineUserId }).then((issues) => {
      if (active) setState({ issues, loading: false, error: '' });
    }).catch((error) => {
      if (active) setState({ issues: [], loading: false, error: error.message || 'Unable to load reports. Please try again.' });
    });
    return () => { active = false; };
  }, [mineUserId]);
  return state;
}
