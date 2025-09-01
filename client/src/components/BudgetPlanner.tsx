import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import ExpenseSplitter from "./ExpenseSplitter";

type Category = { name: string; allocatedAmount: number };
type Participant = { user?: string; name?: string; email?: string };
type Budget = {
  _id?: string;
  tripName?: string;
  totalBudget: number;
  currency?: string;
  categories: Category[];
  participants: Participant[];
  notes?: string;
};

type Expense = {
  _id?: string;
  budget: string;
  amount: number;
  currency?: string;
  category?: string;
  description?: string;
  date?: string;
  paidBy: Participant;
  splitType?: "equal" | "custom";
  sharedWith: Participant[];
};

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const BudgetPlanner: React.FC = () => {
  const token = localStorage.getItem("token") || "";

  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [selectedBudgetId, setSelectedBudgetId] = useState<string | null>(null);
  const [form, setForm] = useState<Budget>({ totalBudget: 0, currency: "USD", categories: [], participants: [] });
  const [newCategory, setNewCategory] = useState<Category>({ name: "", allocatedAmount: 0 });
  const [newParticipant, setNewParticipant] = useState<Participant>({ name: "" });
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expenseForm, setExpenseForm] = useState<Expense>({ budget: "", amount: 0, currency: "USD", paidBy: {}, sharedWith: [], splitType: "equal" });
  const [summary, setSummary] = useState<any>(null);

  const authHeaders = useMemo(() => ({ Authorization: token ? `Bearer ${token}` : "" }), [token]);

  useEffect(() => {
    axios
      .get(`${API_BASE}/api/budgets`, { headers: authHeaders })
      .then((res) => setBudgets(res.data.data || []))
      .catch(() => {});
  }, [authHeaders]);

  useEffect(() => {
    if (!selectedBudgetId) return;
    axios
      .get(`${API_BASE}/api/budgets/${selectedBudgetId}`, { headers: authHeaders })
      .then((res) => {
        const { budget, expenses, settlement, totalSpent } = res.data.data || {};
        if (budget) setForm({
          totalBudget: budget.totalBudget,
          currency: budget.currency,
          categories: budget.categories || [],
          participants: budget.participants || [],
          tripName: budget.tripName,
          notes: budget.notes,
        });
        setExpenses(expenses || []);
        setSummary({ settlement, totalSpent });
        setExpenseForm((ef) => ({ ...ef, budget: selectedBudgetId }));
      })
      .catch(() => {});
  }, [selectedBudgetId, authHeaders]);

  const handleCreateBudget = async () => {
    const res = await axios.post(`${API_BASE}/api/budgets`, form, { headers: authHeaders });
    const created = res.data.data;
    setBudgets((prev) => [created, ...prev]);
    setSelectedBudgetId(created._id);
  };

  const handleUpdateBudget = async () => {
    if (!selectedBudgetId) return;
    const res = await axios.patch(`${API_BASE}/api/budgets/${selectedBudgetId}`, form, { headers: authHeaders });
    const updated = res.data.data;
    setBudgets((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
  };

  const handleDeleteBudget = async () => {
    if (!selectedBudgetId) return;
    await axios.delete(`${API_BASE}/api/budgets/${selectedBudgetId}`, { headers: authHeaders });
    setBudgets((prev) => prev.filter((b) => b._id !== selectedBudgetId));
    setSelectedBudgetId(null);
    setExpenses([]);
    setSummary(null);
  };

  const addCategory = () => {
    if (!newCategory.name) return;
    setForm((f) => ({ ...f, categories: [...f.categories, newCategory] }));
    setNewCategory({ name: "", allocatedAmount: 0 });
  };

  const removeCategory = (idx: number) => {
    setForm((f) => ({ ...f, categories: f.categories.filter((_, i) => i !== idx) }));
  };

  const addParticipant = () => {
    if (!newParticipant.name && !newParticipant.email) return;
    setForm((f) => ({ ...f, participants: [...f.participants, newParticipant] }));
    setNewParticipant({ name: "" });
  };

  const removeParticipant = (idx: number) => {
    setForm((f) => ({ ...f, participants: f.participants.filter((_, i) => i !== idx) }));
  };

  const createExpense = async () => {
    if (!expenseForm.budget || !expenseForm.amount || !expenseForm.paidBy) return;
    const res = await axios.post(`${API_BASE}/api/expenses`, expenseForm, { headers: authHeaders });
    const created = res.data.data;
    setExpenses((prev) => [created, ...prev]);
    // refresh summary
    const sum = await axios.get(`${API_BASE}/api/budgets/${expenseForm.budget}/summary`, { headers: authHeaders });
    setSummary(sum.data.data);
    setExpenseForm((ef) => ({ ...ef, amount: 0, description: "" }));
  };

  return (
    <div className="container my-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 className="m-0">Travel Budget Planner</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handleCreateBudget}>Create Budget</button>
          <button className="btn btn-outline-secondary" onClick={handleUpdateBudget} disabled={!selectedBudgetId}>Save</button>
          <button className="btn btn-outline-danger" onClick={handleDeleteBudget} disabled={!selectedBudgetId}>Delete</button>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card p-3">
            <h5>Budgets</h5>
            <ul className="list-group">
              {budgets.map((b) => (
                <li key={b._id} className={`list-group-item d-flex justify-content-between align-items-center ${selectedBudgetId === b._id ? "active" : ""}`} onClick={() => setSelectedBudgetId(b._id!)} style={{ cursor: "pointer" }}>
                  <span>{b.tripName || "Trip"}</span>
                  <span className="badge bg-secondary">{b.totalBudget} {b.currency || "USD"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card p-3 mb-3">
            <h5>Budget Details</h5>
            <div className="row g-2">
              <div className="col-md-4">
                <label className="form-label">Trip name</label>
                <input className="form-control" value={form.tripName || ""} onChange={(e) => setForm({ ...form, tripName: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Total budget</label>
                <input type="number" className="form-control" value={form.totalBudget} onChange={(e) => setForm({ ...form, totalBudget: Number(e.target.value || 0) })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Currency</label>
                <input className="form-control" value={form.currency || "USD"} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
              </div>
              <div className="col-12">
                <label className="form-label">Notes</label>
                <textarea className="form-control" value={form.notes || ""} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
            </div>
          </div>

          <div className="card p-3 mb-3">
            <h5>Categories</h5>
            <div className="d-flex gap-2 mb-2">
              <input placeholder="e.g., Food" className="form-control" value={newCategory.name} onChange={(e) => setNewCategory((c) => ({ ...c, name: e.target.value }))} />
              <input type="number" placeholder="Allocated" className="form-control" value={newCategory.allocatedAmount} onChange={(e) => setNewCategory((c) => ({ ...c, allocatedAmount: Number(e.target.value || 0) }))} />
              <button className="btn btn-outline-primary" onClick={addCategory}>Add</button>
            </div>
            <ul className="list-group">
              {form.categories.map((c, idx) => (
                <li key={`${c.name}-${idx}`} className="list-group-item d-flex align-items-center justify-content-between">
                  <span>{c.name}</span>
                  <div>
                    <span className="me-3">{c.allocatedAmount}</span>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => removeCategory(idx)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-3 mb-3">
            <h5>Participants</h5>
            <div className="row g-2 mb-2">
              <div className="col-md-4">
                <input placeholder="Name" className="form-control" value={newParticipant.name || ""} onChange={(e) => setNewParticipant((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div className="col-md-4">
                <input placeholder="Email (optional)" className="form-control" value={newParticipant.email || ""} onChange={(e) => setNewParticipant((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div className="col-md-4">
                <button className="btn btn-outline-primary w-100" onClick={addParticipant}>Add</button>
              </div>
            </div>
            <ul className="list-group">
              {form.participants.map((p, idx) => (
                <li key={`${p.email || p.name || idx}`} className="list-group-item d-flex align-items-center justify-content-between">
                  <span>{p.name || p.email}</span>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => removeParticipant(idx)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-3 mb-3">
            <h5>Log Expense</h5>
            <div className="row g-2">
              <div className="col-md-3">
                <label className="form-label">Amount</label>
                <input type="number" className="form-control" value={expenseForm.amount} onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value || 0) })} />
              </div>
              <div className="col-md-3">
                <label className="form-label">Category</label>
                <select className="form-select" value={expenseForm.category || ""} onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}>
                  <option value="">Select</option>
                  {form.categories.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Description</label>
                <input className="form-control" value={expenseForm.description || ""} onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Paid by</label>
                <select className="form-select" value={expenseForm.paidBy.email || expenseForm.paidBy.name || ""} onChange={(e) => {
                  const person = form.participants.find((p) => (p.email || p.name) === e.target.value) || {};
                  setExpenseForm({ ...expenseForm, paidBy: person });
                }}>
                  <option value="">Select</option>
                  {form.participants.map((p, idx) => (
                    <option key={idx} value={p.email || p.name || String(idx)}>{p.name || p.email}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Split</label>
                <select className="form-select" value={expenseForm.splitType} onChange={(e) => setExpenseForm({ ...expenseForm, splitType: e.target.value as any })}>
                  <option value="equal">Equal</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Shared With</label>
                <select multiple className="form-select" value={expenseForm.sharedWith.map((p) => p.email || p.name || "")} onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions).map((o) => o.value);
                  const selected = form.participants.filter((p) => values.includes(p.email || p.name || ""));
                  setExpenseForm({ ...expenseForm, sharedWith: selected });
                }}>
                  {form.participants.map((p, idx) => (
                    <option key={idx} value={p.email || p.name || String(idx)}>{p.name || p.email}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <button className="btn btn-success" onClick={createExpense} disabled={!selectedBudgetId}>Add Expense</button>
              </div>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-lg-6">
              <div className="card p-3 h-100">
                <h5>Expenses</h5>
                {expenses.length === 0 && <p className="text-muted">No expenses yet.</p>}
                <ul className="list-group">
                  {expenses.map((e) => (
                    <li key={e._id} className="list-group-item">
                      <div className="d-flex justify-content-between">
                        <div>
                          <div className="fw-semibold">{e.description || e.category || "Expense"}</div>
                          <div className="small text-muted">Paid by {e.paidBy.name || e.paidBy.email}</div>
                        </div>
                        <div className="fw-bold">{e.amount} {e.currency || form.currency || "USD"}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card p-3 h-100">
                <h5>Summary</h5>
                {summary ? (
                  <>
                    <div className="mb-2">Total spent: <strong>{summary.totalSpent}</strong></div>
                    <ul className="list-group">
                      {(summary.settlement || []).map((s: any) => (
                        <li key={s.person} className="list-group-item d-flex justify-content-between">
                          <span>{s.person}</span>
                          <span className={s.net > 0 ? "text-danger" : s.net < 0 ? "text-success" : ""}>{s.net > 0 ? `owes ${s.net}` : s.net < 0 ? `is owed ${Math.abs(s.net)}` : "settled"}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="text-muted">No summary available.</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3">
            <ExpenseSplitter budgetId={selectedBudgetId || undefined} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlanner;


