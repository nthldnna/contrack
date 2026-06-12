"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";

import {
  getDashboardStats,
  getStockChartData,
  getCategoryDistribution,
  getTopMaterials,
  getSupplierDistribution,
} from "@/src/lib/modules/dashboard";
import Link from "next/link";
import { Box, Tags, Truck, Ruler } from "lucide-react";

const COLORS = ["#0d323b", "#1e5a6b", "#2d7a8b", "#4a9fb8", "#6eb5d1"];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [stockChart, setStockChart] = useState<any[]>([]);
  const [categoryChart, setCategoryChart] = useState<any[]>([]);
  const [topMaterials, setTopMaterials] = useState<any[]>([]);
  const [supplierChart, setSupplierChart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [s, stock, cat, top, suppliers] = await Promise.all([
        getDashboardStats(),
        getStockChartData(),
        getCategoryDistribution(),
        getTopMaterials(),
        getSupplierDistribution(),
      ]);

      setStats(s);
      setStockChart(stock);
      setCategoryChart(cat);
      setTopMaterials(top);
      setSupplierChart(suppliers);
      setLoading(false);
    };

    load();
  }, []);

  const StatCard = ({ label, value }: any) => (
    <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm hover:shadow-md transition">
      <p className="text-xs text-slate-500 mb-2">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">
        {loading ? "—" : value || 0}
      </p>
    </div>
  );

  const ChartCard = ({ title, children }: any) => (
    <div className="rounded-2xl bg-white border border-slate-100 p-5 shadow-sm">
      <h2 className="text-sm font-medium text-slate-700 mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto px-5 py-8 space-y-6">
        {/* HEADER */}
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
            Inventory Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Real-time warehouse analytics and insights
          </p>
        </div>


        {/* KEY METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-2xl p-6 shadow-md">
            <p className="text-sm font-medium text-green-700 opacity-70 mb-2">
              Stock In
            </p>
            <p className="text-3xl font-bold text-green-700">
              {loading ? "—" : stats?.totalStockIn || 0}
            </p>
            <p className="text-xs text-green-600 mt-3 opacity-70">
              Total incoming stock
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-2xl p-6 shadow-md">
            <p className="text-sm font-medium text-red-700 opacity-70 mb-2">
              Stock Out
            </p>
            <p className="text-3xl font-bold text-red-700">
              {loading ? "—" : stats?.totalStockOut || 0}
            </p>
            <p className="text-xs text-red-600 mt-3 opacity-70">
              Total outgoing stock
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white border border-black/10 rounded-2xl p-6 shadow-md">
            <p className="text-sm font-medium dark-blue opacity-70 mb-2">
              Current Stock
            </p>
            <p className="text-3xl font-bold dark-blue">
              {loading ? "—" : stats?.currentStock || 0}
            </p>
            <p className="text-xs dark-blue mt-3 opacity-60">
              Available inventory
            </p>
          </div>
        </div>
        {/* TOP SECTION: STATS + CHART (2x2 PREMIUM GRID) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">



          {/* RIGHT SIDE - STOCK MOVEMENT CHART */}
          <ChartCard title="Stock Movement Trend">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stockChart}>

                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#64748b" opacity={0.6} />
                <YAxis stroke="#64748b" opacity={0.6} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  }}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="in"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="Stock In"
                />

                <Line
                  type="monotone"
                  dataKey="out"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                  name="Stock Out"
                />

              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <div className="grid grid-cols-2 gap-3 h-full">

            {/* MATERIALS */}
            <Link href="/materials" className="group">
              <div className="h-full min-h-[110px] rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Materials
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {loading ? "—" : stats?.totalMaterials || 0}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Box className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Link>

            {/* CATEGORIES */}
            <Link href="/categories" className="group">
              <div className="h-full min-h-[110px] rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Categories
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {loading ? "—" : stats?.totalCategories || 0}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Tags className="w-6 h-6 text-violet-600" />
                </div>
              </div>
            </Link>

            {/* SUPPLIERS */}
            <Link href="/suppliers" className="group">
              <div className="h-full min-h-[110px] rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Suppliers
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {loading ? "—" : stats?.totalSuppliers || 0}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Truck className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </Link>

            {/* UNITS */}
            <Link href="/units" className="group">
              <div className="h-full min-h-[110px] rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Units
                  </p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">
                    {loading ? "—" : stats?.totalUnits || 0}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <Ruler className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </Link>

          </div>
        </div>


        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* PIE CHART */}
          <ChartCard title="Category Distribution">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={categoryChart}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={110}
                  fill="#0d323b"
                  dataKey="value"
                >
                  {categoryChart.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* BAR CHART */}
          <ChartCard title="Top Materials">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={topMaterials}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0d323b" />
                    <stop offset="100%" stopColor="#4a9fb8" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dceaff" />
                <XAxis
                  dataKey="material_name"
                  stroke="#64748b"
                  opacity={0.6}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#64748b" opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                  }}
                />
                <Bar
                  dataKey="quantity"
                  fill="url(#colorBar)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
