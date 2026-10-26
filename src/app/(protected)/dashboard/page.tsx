"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
  CartesianGrid,
} from "recharts";
import { Plus } from "lucide-react";

import {
  getDashboardStats,
  getStockChartData,
  getCategoryDistribution,
  getTopMaterials,
  getLowestMaterials,
  getRecentStockMovements,
} from "@/src/lib/modules/dashboard";
import Marquee from "@/src/app/components/brand/Marquee";

const INK = "#1E1E1C";
const CATEGORY_COLORS = ["#FBEFA6", "#CDE7EE", "#F9C9D4", "#CFDDA6", "#E5DED2", "#F6D2B8"];

const tooltipStyle = {
  backgroundColor: "#fff",
  border: `2px solid ${INK}`,
  borderRadius: "10px",
  boxShadow: `3px 3px 0 ${INK}`,
  fontSize: 12,
};

const axisTick = { fontSize: 10, fill: "#55524C", fontFamily: "var(--font-jetbrains)" };

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [stockChart, setStockChart] = useState<any[]>([]);
  const [categoryChart, setCategoryChart] = useState<any[]>([]);
  const [topMaterials, setTopMaterials] = useState<any[]>([]);
  const [lowest, setLowest] = useState<any[]>([]);
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [s, stock, cat, top, low, moves] = await Promise.all([
        getDashboardStats(),
        getStockChartData(),
        getCategoryDistribution(),
        getTopMaterials(),
        getLowestMaterials(),
        getRecentStockMovements(),
      ]);

      setStats(s);
      setStockChart(stock.slice(-10));
      setCategoryChart(cat);
      setTopMaterials(top);
      setLowest(low);
      setRecent(moves);
      setLoading(false);
    };

    load();
  }, []);

  const value = (n?: number) => (loading ? "—" : (n ?? 0).toLocaleString());
  const categoryTotal = categoryChart.reduce((a, c) => a + c.value, 0);
  const topMax = Math.max(1, ...topMaterials.map((m) => m.quantity || 0));

  const tickerItems = lowest.map((m) => `Lowest stock · ${m.material_name} · ${m.quantity ?? 0} left`);

  return (
    <div className="min-h-screen">
      {tickerItems.length > 0 && (
        <Marquee
          items={tickerItems}
          label="Lowest stock levels"
          className="bg-ink text-paper"
          separator={<span className="text-blush-deep">✦</span>}
        />
      )}

      <div className="px-4 md:px-6 py-5 space-y-4">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-end gap-3">
          <div className="flex flex-col gap-1">
            <span className="label text-[10px] text-muted" suppressHydrationWarning>
              {new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short", year: "numeric" })}
            </span>
            <h1 className="font-serif text-[clamp(34px,3.6vw,46px)] leading-[0.95] tracking-[-0.035em]" suppressHydrationWarning>
              {greeting()}, site office
            </h1>
          </div>
          <Link href="/stocks" className="pill pill-dark">
            <Plus size={16} strokeWidth={2.5} />
            Log stock
          </Link>
        </div>

        {/* STAT TILES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatTile
            href="/materials"
            bg="bg-butter"
            label="Materials"
            value={value(stats?.totalMaterials)}
            note={loading ? "" : `${stats.totalCategories} categories · ${stats.totalUnits} units`}
          />
          <StatTile href="/suppliers" bg="bg-powder" label="Suppliers" value={value(stats?.totalSuppliers)} note="Linked to your materials" />
          <StatTile href="/stocks" bg="bg-sage" label="Stock in" value={value(stats?.totalStockIn)} note="Units received, all time" />
          <StatTile
            href="/stocks"
            bg="bg-blush"
            label="Stock out"
            value={value(stats?.totalStockOut)}
            note={loading ? "" : `${stats.currentStock.toLocaleString()} units on hand`}
          />
        </div>

        {/* CHARTS */}
        <div className="grid gap-3 lg:grid-cols-3">
          <Panel title="Stock movement" className="lg:col-span-2" aside={<Legend />}>
            {stockChart.length === 0 ? (
              <Empty loading={loading} text="Log a delivery or a pull to see movement here." />
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={stockChart} barGap={3} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#EAE6DD" />
                  <XAxis dataKey="date" tick={axisTick} tickLine={false} axisLine={{ stroke: INK, strokeWidth: 2 }} />
                  <YAxis tick={axisTick} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(30,30,28,0.05)" }} />
                  <Bar dataKey="in" name="Stock in" fill="#6BB5C9" stroke={INK} strokeWidth={1.5} radius={[5, 5, 0, 0]} maxBarSize={22} />
                  <Bar dataKey="out" name="Stock out" fill="#F38FA8" stroke={INK} strokeWidth={1.5} radius={[5, 5, 0, 0]} maxBarSize={22} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Panel>

          <Panel title="Materials by category">
            {categoryChart.length === 0 ? (
              <Empty loading={loading} text="Add materials with a category to see the split." />
            ) : (
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative w-36 h-36 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryChart}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={38}
                        outerRadius={68}
                        stroke={INK}
                        strokeWidth={2}
                        isAnimationActive={false}
                      >
                        {categoryChart.map((_, i) => (
                          <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={tooltipStyle} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 grid place-items-center text-center leading-none">
                    <span className="font-display font-extrabold text-xl tabular-nums">
                      {categoryTotal}
                      <span className="block label text-[8px] font-normal mt-0.5">items</span>
                    </span>
                  </div>
                </div>
                <ul className="flex-1 min-w-[130px] space-y-1.5 text-[13px]">
                  {categoryChart.map((c, i) => (
                    <li key={c.name} className="flex items-center gap-2">
                      <i
                        className="w-3 h-3 rounded-[3px] border-[1.5px] border-ink shrink-0"
                        style={{ background: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
                      />
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="font-semibold tabular-nums">{c.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Panel>
        </div>

        {/* LISTS */}
        <div className="grid gap-3 lg:grid-cols-3">
          <Panel title="Lowest stock" aside={<PanelLink href="/materials">See all</PanelLink>}>
            {lowest.length === 0 ? (
              <Empty loading={loading} text="No materials yet." />
            ) : (
              <ul>
                {lowest.map((m) => (
                  <li key={m.material_name} className="flex justify-between items-baseline gap-3 py-2 border-t-[1.5px] border-rule first:border-t-0 text-[13px]">
                    <span className="font-medium truncate">{m.material_name}</span>
                    <span className={`chip ${(m.quantity ?? 0) <= 0 ? "bg-blush" : "bg-butter"}`}>{m.quantity ?? 0} left</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Most stocked" aside={<PanelLink href="/materials">Materials</PanelLink>}>
            {topMaterials.length === 0 ? (
              <Empty loading={loading} text="No materials yet." />
            ) : (
              <ul className="space-y-2.5">
                {topMaterials.map((m) => (
                  <li key={m.material_name} className="text-[13px]">
                    <div className="flex justify-between gap-3 mb-1">
                      <span className="font-medium truncate">{m.material_name}</span>
                      <span className="font-semibold tabular-nums">{(m.quantity ?? 0).toLocaleString()}</span>
                    </div>
                    <div className="h-2.5 border-[1.5px] border-ink rounded-full bg-paper overflow-hidden">
                      <div
                        className="h-full bg-sage border-r-[1.5px] border-ink"
                        style={{ width: `${Math.max(4, ((m.quantity || 0) / topMax) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="Recent activity" aside={<PanelLink href="/stocks">Stock log</PanelLink>}>
            {recent.length === 0 ? (
              <Empty loading={loading} text="Stock movements will show up here." />
            ) : (
              <ul>
                {recent.map((r) => {
                  const isIn = (r.quantity_in || 0) >= (r.quantity_out || 0);
                  const qty = isIn ? r.quantity_in : r.quantity_out;
                  return (
                    <li key={r.id} className="flex items-center gap-2.5 py-2 border-t-[1.5px] border-rule first:border-t-0 text-[13px]">
                      <span className={`chip w-11 justify-center ${isIn ? "bg-powder" : "bg-blush"}`}>{isIn ? "In" : "Out"}</span>
                      <span className="flex-1 min-w-0 truncate">
                        <span className="font-semibold tabular-nums">
                          {isIn ? "+" : "−"}
                          {qty || 0}
                        </span>{" "}
                        {r.material_name}
                      </span>
                      <span className="label text-[9px] text-muted shrink-0">
                        {r.created_at ? new Date(r.created_at).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : ""}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "morning";
  if (h < 18) return "afternoon";
  return "evening";
}

function StatTile({ href, bg, label, value, note }: { href: string; bg: string; label: string; value: string; note: string }) {
  return (
    <Link
      href={href}
      className={`${bg} border-2 border-ink rounded-2xl px-4 py-3.5 flex flex-col gap-1 transition-[transform,box-shadow] hover:-translate-x-px hover:-translate-y-px hover:shadow-[3px_3px_0_var(--ink)]`}
    >
      <span className="label text-[10px]">{label}</span>
      <span className="font-display font-extrabold text-[34px] leading-none tracking-[-0.03em] tabular-nums">{value}</span>
      <span className="text-xs text-[#3B3934] min-h-4">{note}</span>
    </Link>
  );
}

function Panel({
  title,
  aside,
  className = "",
  children,
}: {
  title: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`card p-4 flex flex-col gap-3 min-w-0 ${className}`}>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="font-display font-bold text-base tracking-[-0.02em]">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

function PanelLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="label text-[10px] underline underline-offset-4 hover:text-muted">
      {children}
    </Link>
  );
}

function Legend() {
  return (
    <div className="label text-[10px] flex gap-3">
      <span className="inline-flex items-center gap-1.5">
        <i className="w-2.5 h-2.5 rounded-[3px] bg-powder-deep border-[1.5px] border-ink" />
        In
      </span>
      <span className="inline-flex items-center gap-1.5">
        <i className="w-2.5 h-2.5 rounded-[3px] bg-blush-deep border-[1.5px] border-ink" />
        Out
      </span>
    </div>
  );
}

function Empty({ loading, text }: { loading: boolean; text: string }) {
  return (
    <p className="py-6 text-center text-[13px] text-muted">{loading ? "Loading..." : text}</p>
  );
}
