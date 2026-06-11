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

  const StatCard = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value: number | undefined;
    icon?: React.ReactNode;
  }) => (
    <div className="bg-gradient-to-br from-white-blue via-white to-white border border-light-blue rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-dark-blue opacity-70 mb-2">
            {label}
          </p>
          <p className="text-3xl font-bold dark-blue">
            {loading ? "—" : value || 0}
          </p>
        </div>
        {Icon && <div className="text-light-blue opacity-30">{Icon}</div>}
      </div>
    </div>
  );

  const ChartCard = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-light-blue rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300">
      <h2 className="text-lg font-semibold dark-blue mb-6">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white-blue via-white to-white-blue">
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
        {/* HEADER */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold dark-blue">Inventory Dashboard</h1>
          <p className="text-dark-blue opacity-60 text-base">
            Real-time warehouse analytics and insights
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard label="Total Materials" value={stats?.totalMaterials} />
          <StatCard label="Categories" value={stats?.totalCategories} />
          <StatCard label="Suppliers" value={stats?.totalSuppliers} />
          <StatCard label="Units" value={stats?.totalUnits} />
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

          <div className="bg-gradient-to-br from-blue-50 to-white border border-light-blue rounded-2xl p-6 shadow-md">
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

        {/* STOCK MOVEMENT & SUPPLIER DISTRIBUTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* STOCK MOVEMENT TREND */}
          <ChartCard title="Stock Movement Trend">
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={stockChart}>
                <defs>
                  <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dceaff" />
                <XAxis dataKey="date" stroke="#0d323b" opacity={0.6} />
                <YAxis stroke="#0d323b" opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #dceaff",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
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

          {/* SUPPLIER DISTRIBUTION */}
          <ChartCard title="Supplier Distribution">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={supplierChart} layout="vertical">
                <defs>
                  <linearGradient id="colorSupplier" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6eb5d1" />
                    <stop offset="100%" stopColor="#0d323b" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#dceaff" />
                <XAxis type="number" stroke="#0d323b" opacity={0.6} />
                <YAxis
                  dataKey="supplier_name"
                  type="category"
                  stroke="#0d323b"
                  opacity={0.6}
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #dceaff",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#colorSupplier)"
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
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
                    `${name}: ${(percent * 100).toFixed(0)}%`
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
                    backgroundColor: "#ffffff",
                    border: "1px solid #dceaff",
                    borderRadius: "8px",
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
                  stroke="#0d323b"
                  opacity={0.6}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis stroke="#0d323b" opacity={0.6} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #dceaff",
                    borderRadius: "8px",
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
