import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ShieldAlert, LogOut } from 'lucide-react';

const api = axios.create({ baseURL: '/api' });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

function Login({ setAuth }) {
  const [email, setEmail] = useState('admin@cyberintel.gov.in');
  const [password, setPassword] = useState('admin123');
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      setAuth(res.data.access_token);
    } catch { alert('Login Failed!'); }
  };
  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={login} className="bg-panel p-8 rounded-xl w-96 flex flex-col space-y-4 shadow-lg border border-gray-800">
        <div className="flex justify-center mb-4"><ShieldAlert size={48} className="text-primary" /></div>
        <h2 className="text-2xl font-bold text-center tracking-widest">AURA COMMAND</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="p-3 bg-[#0B0F19] rounded border border-gray-700" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="p-3 bg-[#0B0F19] rounded border border-gray-700" />
        <button className="bg-primary p-3 font-bold rounded mt-4">ACCESS SYSTEM</button>
      </form>
    </div>
  );
}

function Sidebar({ setAuth }) {
  const logout = () => { localStorage.removeItem('token'); setAuth(null); };
  return (
    <div className="w-64 bg-panel border-r border-gray-800 h-screen p-6 flex flex-col">
      <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2"><ShieldAlert /> AURA</h2>
      <Link to="/" className="text-gray-300 py-3 hover:text-white border-b border-gray-800">Dashboard</Link>
      <Link to="/complaints" className="text-gray-300 py-3 hover:text-white border-b border-gray-800">New Complaint</Link>
      <Link to="/map" className="text-gray-300 py-3 hover:text-white border-b border-gray-800">Risk Map</Link>
      <Link to="/alerts" className="text-gray-300 py-3 hover:text-white border-b border-gray-800">Alerts</Link>
      <button onClick={logout} className="mt-auto flex items-center gap-2 text-danger"><LogOut size={18}/> Logout</button>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState({});
  useEffect(() => { api.get('/dashboard/stats').then(res => setStats(res.data)); }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Command Dashboard</h1>
      <div className="flex gap-6">
        <div className="bg-panel p-6 rounded-xl flex-1 border border-gray-800">
          <p className="text-gray-400">Total Cases</p>
          <h2 className="text-4xl font-bold mt-2 text-primary">{stats.total_complaints || 0}</h2>
        </div>
        <div className="bg-panel p-6 rounded-xl flex-1 border border-gray-800">
          <p className="text-gray-400">Active Alerts</p>
          <h2 className="text-4xl font-bold mt-2 text-danger">{stats.active_alerts || 0}</h2>
        </div>
      </div>
    </div>
  );
}

function ComplaintEntry() {
  const [form, setForm] = useState({ crime_category: 'Card Cloning', transaction_amount: 50000, district: 'New Delhi', suspected_lat: 28.6139, suspected_lon: 77.2090 });
  const [pred, setPred] = useState(null);
  const submit = async (e) => { e.preventDefault(); const res = await api.post('/complaints', form); setPred(res.data); };
  
  if (pred) return (
    <div className="bg-panel p-8 rounded-xl max-w-xl text-center border-t-4 border-primary">
      <h2 className="text-2xl font-bold mb-4">Intelligence Logged</h2>
      <p>Risk Level: <span className="text-danger font-bold">{pred.risk_level} ({pred.risk_score.toFixed(1)})</span></p>
      <p className="mt-2 text-gray-400">Predicted Cashout Area: {pred.predicted_lat.toFixed(4)}, {pred.predicted_lon.toFixed(4)}</p>
      <button onClick={() => setPred(null)} className="mt-6 bg-gray-700 px-6 py-2 rounded">New Entry</button>
    </div>
  );

  return (
    <form onSubmit={submit} className="bg-panel p-8 rounded-xl space-y-4 max-w-xl border border-gray-800">
      <h1 className="text-2xl font-bold mb-4">Inject Intelligence</h1>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="text-sm text-gray-400">Category</label><input value={form.crime_category} onChange={e=>setForm({...form, crime_category: e.target.value})} className="w-full p-2 bg-[#0B0F19] rounded mt-1" /></div>
        <div><label className="text-sm text-gray-400">Amount (₹)</label><input type="number" value={form.transaction_amount} onChange={e=>setForm({...form, transaction_amount: +e.target.value})} className="w-full p-2 bg-[#0B0F19] rounded mt-1" /></div>
        <div><label className="text-sm text-gray-400">District</label><input value={form.district} onChange={e=>setForm({...form, district: e.target.value})} className="w-full p-2 bg-[#0B0F19] rounded mt-1" /></div>
      </div>
      <button className="w-full bg-primary p-3 rounded font-bold mt-4">SUBMIT & PREDICT</button>
    </form>
  );
}

function RiskMap() {
  const [locs, setLocs] = useState([]);
  useEffect(() => { api.get('/risk-locations').then(res => setLocs(res.data)); }, []);
  return (
    <div className="h-full pb-10">
      <h1 className="text-3xl font-bold mb-6">Risk Matrix Map</h1>
      <div className="h-full rounded-xl overflow-hidden border border-gray-800">
        <MapContainer center={[28.6139, 77.2090]} zoom={11} style={{ height: '100%', width: '100%', filter: 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
          {locs.map((l, i) => <CircleMarker key={i} center={[l.lat, l.lng]} pathOptions={{ color: l.risk_level === 'Critical' ? '#EF4444' : '#F59E0B' }} radius={8}><Popup><div className="text-black font-bold">{l.category} - {l.risk_level}</div></Popup></CircleMarker>)}
        </MapContainer>
      </div>
    </div>
  );
}

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  useEffect(() => { api.get('/alerts').then(res => setAlerts(res.data)); }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">System Alerts</h1>
      {alerts.map(a => <div key={a.id} className="bg-panel p-4 mb-3 rounded-lg border-l-4 border-danger"><span className="text-danger font-bold text-sm">{a.severity}</span><p className="mt-1">{a.message}</p></div>)}
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  useEffect(() => {
    if(!token) return;
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}/api/ws/dashboard`);
    ws.onmessage = (e) => console.log(e.data);
    return () => ws.close();
  }, [token]);

  if (!token) return <Login setAuth={setToken} />;
  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar setAuth={setToken} />
        <main className="flex-1 p-8 overflow-y-auto"><Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/complaints" element={<ComplaintEntry />} />
          <Route path="/map" element={<RiskMap />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes></main>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);