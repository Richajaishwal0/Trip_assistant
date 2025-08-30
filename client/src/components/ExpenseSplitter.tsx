import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

type Participant = { user?: string; name?: string; email?: string };

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const ExpenseSplitter: React.FC<{ budgetId?: string }> = ({ budgetId }) => {
  const token = localStorage.getItem("token") || "";
  const authHeaders = useMemo(() => ({ Authorization: token ? `Bearer ${token}` : "" }), [token]);

  const [participants, setParticipants] = useState<Participant[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [paidBy, setPaidBy] = useState<Participant | null>(null);
  const [sharedWith, setSharedWith] = useState<Participant[]>([]);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    if (!budgetId) return;
    axios.get(`${API_BASE}/api/budgets/${budgetId}`, { headers: authHeaders }).then((res) => {
      setParticipants(res.data?.data?.budget?.participants || []);
    });
    axios.get(`${API_BASE}/api/budgets/${budgetId}/summary`, { headers: authHeaders }).then((res) => setSummary(res.data.data));
  }, [budgetId, authHeaders]);

  const addExpense = async () => {
    if (!budgetId || !amount || !paidBy || sharedWith.length === 0) return;
    await axios.post(
      `${API_BASE}/api/expenses`,
      {
        budget: budgetId,
        amount,
        paidBy,
        sharedWith,
        splitType: "equal",
      },
      { headers: authHeaders }
    );
    const res = await axios.get(`${API_BASE}/api/budgets/${budgetId}/summary`, { headers: authHeaders });
    setSummary(res.data.data);
    setAmount(0);
    setPaidBy(null);
    setSharedWith([]);
  };

  return (
    <div className="card p-3">
      <h5>Quick Expense Splitter</h5>
      <div className="row g-2">
        <div className="col-md-4">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(Number(e.target.value || 0))} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Paid by</label>
          <select className="form-select" value={paidBy?.email || paidBy?.name || ""} onChange={(e) => setPaidBy(participants.find((p) => (p.email || p.name) === e.target.value) || null)}>
            <option value="">Select</option>
            {participants.map((p, idx) => (
              <option key={idx} value={p.email || p.name || String(idx)}>{p.name || p.email}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Shared with</label>
          <select multiple className="form-select" value={sharedWith.map((p) => p.email || p.name || "")} onChange={(e) => {
            const values = Array.from(e.target.selectedOptions).map((o) => o.value);
            setSharedWith(participants.filter((p) => values.includes(p.email || p.name || "")));
          }}>
            {participants.map((p, idx) => (
              <option key={idx} value={p.email || p.name || String(idx)}>{p.name || p.email}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" onClick={addExpense} disabled={!budgetId}>Split</button>
        </div>
      </div>

      <div className="mt-3">
        <h6>Settlement</h6>
        {summary ? (
          <ul className="list-group">
            {(summary.settlement || []).map((s: any) => (
              <li key={s.person} className="list-group-item d-flex justify-content-between">
                <span>{s.person}</span>
                <span className={s.net > 0 ? "text-danger" : s.net < 0 ? "text-success" : ""}>{s.net > 0 ? `owes ${s.net}` : s.net < 0 ? `is owed ${Math.abs(s.net)}` : "settled"}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No data</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseSplitter;


