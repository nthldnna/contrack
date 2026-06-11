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
} from "recharts";

import {
  getDashboardStats,
  getStockChartData,
  getCategoryDistribution,
  getTopMaterials,
} from "@/src/lib/modules/dashboard";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [stockChart, setStockChart] = useState<any[]>([]);
  const [categoryChart, setCategoryChart] = useState<any[]>([]);
  const [topMaterials, setTopMaterials] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const [s, stock, cat, top] = await Promise.all([
        getDashboardStats(),
        getStockChartData(),
        getCategoryDistribution(),
        getTopMaterials(),
      ]);

      setStats(s);
      setStockChart(stock);
      setCategoryChart(cat);
      setTopMaterials(top);
    };

    load();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Inventory Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Real-time warehouse analytics
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Materials", value: stats?.totalMaterials },
          { label: "Categories", value: stats?.totalCategories },
          { label: "Suppliers", value: stats?.totalSuppliers },
          { label: "Units", value: stats?.totalUnits },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white p-4 rounded-xl border shadow-sm"
          >
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-2xl font-bold text-gray-800">{s.value}</p>
          </div>
        ))}
      </div>

      {/* STOCK SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Stock In</p>
          <p className="text-green-600 text-xl font-semibold">
            {stats?.totalStockIn}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Stock Out</p>
          <p className="text-red-500 text-xl font-semibold">
            {stats?.totalStockOut}
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border">
          <p className="text-sm text-gray-500">Current Stock</p>
          <p className="text-blue-600 text-xl font-semibold">
            {stats?.currentStock}
          </p>
        </div>
      </div>

      {/* LINE CHART - STOCK MOVEMENT */}
      <div className="bg-white p-4 rounded-xl border">
        <h2 className="font-semibold mb-4">Stock Movement Trend</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockChart}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="in" stroke="#10b981" />
            <Line type="monotone" dataKey="out" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* PIE + BAR GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PIE CHART */}
        <div className="bg-white p-4 rounded-xl border">
          <h2 className="font-semibold mb-4">Category Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryChart}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {categoryChart.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div className="bg-white p-4 rounded-xl border">
          <h2 className="font-semibold mb-4">Top Materials</h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topMaterials}>
              <XAxis dataKey="material_name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantity" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}