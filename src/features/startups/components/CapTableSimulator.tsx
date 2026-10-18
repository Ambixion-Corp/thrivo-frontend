"use client";

import { useState, useMemo } from "react";
import {
  PieChart,
  TrendingDown,
  DollarSign,
  Users,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  Sparkles,
  Calculator,
  ArrowRight,
} from "lucide-react";
import {
  useCapTableStore,
  ShareholderRole,
  ShareClass,
} from "@/store/capTableStore";

interface CapTableSimulatorProps {
  startupId: string;
  startupName: string;
}

export function CapTableSimulator({
  startupId,
  startupName,
}: CapTableSimulatorProps) {
  const {
    getCapTable,
    addShareholder,
    removeShareholder,
    updateSimulation,
    resetCapTable,
  } = useCapTableStore();

  const capTable = getCapTable(startupId);
  const { shareholders, simulation } = capTable;

  // New Shareholder state
  const [isAddingShareholder, setIsAddingShareholder] = useState(false);
  const [newShareholderName, setNewShareholderName] = useState("");
  const [newShareholderRole, setNewShareholderRole] =
    useState<ShareholderRole>("Founder");
  const [newShareholderClass, setNewShareholderClass] =
    useState<ShareClass>("Common");
  const [newShareholderShares, setNewShareholderShares] = useState("500000");

  // Mathematical Dilution Calculations
  const totalExistingShares = useMemo(() => {
    return shareholders.reduce((acc, s) => acc + s.shares, 0);
  }, [shareholders]);

  const calculations = useMemo(() => {
    const preMoney = Math.max(1, simulation.preMoneyValuation);
    const investment = Math.max(0, simulation.investmentAmount);
    const postMoney = preMoney + investment;

    // Price per share based on pre-money and pre-round shares
    const effectivePricePerShare = preMoney / totalExistingShares;

    // New shares to issue to incoming investor
    const investorShares =
      effectivePricePerShare > 0 ? investment / effectivePricePerShare : 0;

    // ESOP expansion shares: calculated to reach the desired target % of post-money
    // If target % is P, then (existingESOP + newESOP) / totalPost = P
    const esopExpansionPct = simulation.optionPoolExpansionPercent / 100;
    // Total shares before ESOP expansion
    const basePostShares = totalExistingShares + investorShares;
    // Shares to add so that esop expansion reaches target % of final total:
    const newEsopShares =
      esopExpansionPct > 0
        ? (basePostShares * esopExpansionPct) / (1 - esopExpansionPct)
        : 0;

    const totalPostRoundShares = basePostShares + newEsopShares;

    const investorOwnershipPct =
      totalPostRoundShares > 0
        ? (investorShares / totalPostRoundShares) * 100
        : 0;

    const newEsopOwnershipPct =
      totalPostRoundShares > 0
        ? (newEsopShares / totalPostRoundShares) * 100
        : 0;

    // Computed stakeholder rows
    const stakeholderRows = shareholders.map((s) => {
      const preOwnershipPct = (s.shares / totalExistingShares) * 100;
      const postOwnershipPct = (s.shares / totalPostRoundShares) * 100;
      const dilutionPct =
        preOwnershipPct > 0
          ? ((preOwnershipPct - postOwnershipPct) / preOwnershipPct) * 100
          : 0;
      const postValue = s.shares * effectivePricePerShare;

      return {
        ...s,
        preOwnershipPct,
        postOwnershipPct,
        dilutionPct,
        postValue,
      };
    });

    return {
      preMoney,
      investment,
      postMoney,
      effectivePricePerShare,
      investorShares,
      newEsopShares,
      totalPostRoundShares,
      investorOwnershipPct,
      newEsopOwnershipPct,
      stakeholderRows,
    };
  }, [shareholders, simulation, totalExistingShares]);

  const handleAddShareholderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShareholderName.trim()) return;

    const sharesNum = parseInt(newShareholderShares, 10) || 100000;
    const colors = [
      "#38BDF8",
      "#F472B6",
      "#C084FC",
      "#FB923C",
      "#4ADE80",
      "#FACC15",
    ];
    const pickedColor = colors[shareholders.length % colors.length];

    addShareholder(startupId, {
      name: newShareholderName,
      role: newShareholderRole,
      shareClass: newShareholderClass,
      shares: sharesNum,
      color: pickedColor,
    });

    setNewShareholderName("");
    setNewShareholderShares("500000");
    setIsAddingShareholder(false);
  };

  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(
        JSON.stringify(
          {
            startupId,
            startupName,
            simulation,
            calculations: {
              preMoneyValuation: calculations.preMoney,
              investmentAmount: calculations.investment,
              postMoneyValuation: calculations.postMoney,
              effectivePricePerShare: calculations.effectivePricePerShare,
              totalPreShares: totalExistingShares,
              totalPostShares: calculations.totalPostRoundShares,
              investorOwnership: `${calculations.investorOwnershipPct.toFixed(2)}%`,
            },
            shareholders: calculations.stakeholderRows,
          },
          null,
          2,
        ),
      );
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `${startupName.toLowerCase().replace(/\s+/g, "_")}_captable_scenario.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-10">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#00C6D8]" /> Total Shares Issued
          </span>
          <p className="text-2xl font-black text-white font-mono">
            {totalExistingShares.toLocaleString()}
          </p>
          <p className="text-xs text-zinc-400">100% Authorized Equity</p>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#8DEE5F]" /> Pre-Money
            Valuation
          </span>
          <p className="text-2xl font-black text-white font-mono">
            ${(calculations.preMoney / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-zinc-400">
            Share Price: ${calculations.effectivePricePerShare.toFixed(3)}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-purple-400" /> Planned Round
          </span>
          <p className="text-2xl font-black text-white font-mono">
            +${(calculations.investment / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-zinc-400">{simulation.roundName}</p>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-1">
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Post-Money
            Valuation
          </span>
          <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] font-mono">
            ${(calculations.postMoney / 1000000).toFixed(2)}M
          </p>
          <p className="text-xs text-zinc-400">
            Investor: {calculations.investorOwnershipPct.toFixed(1)}% ownership
          </p>
        </div>
      </div>

      {/* Interactive Simulation Controls Panel */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900/60 to-zinc-900/30 border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#00C6D8]" /> Funding Round
              Dilution Simulator
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Adjust valuation and investment parameters to simulate cap table
              dilution and option pool expansion
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => resetCapTable(startupId)}
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Export JSON
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Round & Target */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Round Title
              </label>
              <input
                type="text"
                value={simulation.roundName}
                onChange={(e) =>
                  updateSimulation(startupId, { roundName: e.target.value })
                }
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C6D8]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Lead Investor Name
              </label>
              <input
                type="text"
                value={simulation.targetInvestorName}
                onChange={(e) =>
                  updateSimulation(startupId, {
                    targetInvestorName: e.target.value,
                  })
                }
                className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00C6D8]"
              />
            </div>
          </div>

          {/* Pre-Money Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-zinc-400 uppercase tracking-widest">
                Pre-Money Valuation
              </label>
              <span className="font-mono font-bold text-[#8DEE5F]">
                ${(simulation.preMoneyValuation / 1000000).toFixed(2)}M
              </span>
            </div>
            <input
              type="range"
              min="1000000"
              max="50000000"
              step="500000"
              value={simulation.preMoneyValuation}
              onChange={(e) =>
                updateSimulation(startupId, {
                  preMoneyValuation: Number(e.target.value),
                })
              }
              className="w-full accent-[#00C6D8] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>$1.0M</span>
              <span>$25.0M</span>
              <span>$50.0M</span>
            </div>
          </div>

          {/* Investment Amount Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold text-zinc-400 uppercase tracking-widest">
                Investment Capital
              </label>
              <span className="font-mono font-bold text-[#00C6D8]">
                ${(simulation.investmentAmount / 1000000).toFixed(2)}M
              </span>
            </div>
            <input
              type="range"
              min="250000"
              max="15000000"
              step="250000"
              value={simulation.investmentAmount}
              onChange={(e) =>
                updateSimulation(startupId, {
                  investmentAmount: Number(e.target.value),
                })
              }
              className="w-full accent-[#00C6D8] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>$250K</span>
              <span>$7.5M</span>
              <span>$15.0M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ownership Visualizer: Pre vs Post Round Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Dilution Breakdown Bars */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Stakeholder Ownership & Dilution
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Comparison of equity stake before vs. after round execution
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#00C6D8]">
              {simulation.roundName}
            </span>
          </div>

          <div className="space-y-5">
            {calculations.stakeholderRows.map((stakeholder) => (
              <div key={stakeholder.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: stakeholder.color }}
                    />
                    <span className="font-bold text-white">
                      {stakeholder.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 px-2 py-0.5 rounded-full bg-white/5 font-medium">
                      {stakeholder.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-zinc-400">
                      {stakeholder.preOwnershipPct.toFixed(1)}%
                    </span>
                    <ArrowRight className="w-3 h-3 text-zinc-600" />
                    <span className="font-bold text-white">
                      {stakeholder.postOwnershipPct.toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-rose-400 flex items-center">
                      <TrendingDown className="w-2.5 h-2.5 mr-0.5" />-
                      {stakeholder.dilutionPct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Comparative Bar */}
                <div className="w-full h-3 bg-black rounded-full overflow-hidden flex border border-zinc-800/80">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${stakeholder.postOwnershipPct}%`,
                      backgroundColor: stakeholder.color,
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Incoming Investor Row */}
            <div className="space-y-1.5 pt-3 border-t border-zinc-800/60">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00C6D8]" />
                  <span className="font-bold text-[#00C6D8]">
                    {simulation.targetInvestorName} (New Investor)
                  </span>
                  <span className="text-[10px] text-[#00C6D8] px-2 py-0.5 rounded-full bg-[#00C6D8]/10 font-medium">
                    Preferred (Round Lead)
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-zinc-500">0.0%</span>
                  <ArrowRight className="w-3 h-3 text-zinc-600" />
                  <span className="font-bold text-[#00C6D8]">
                    {calculations.investorOwnershipPct.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="w-full h-3 bg-black rounded-full overflow-hidden flex border border-zinc-800/80">
                <div
                  className="h-full bg-[#00C6D8] transition-all duration-500 rounded-full"
                  style={{ width: `${calculations.investorOwnershipPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Pie Distribution Overview */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-6">
          <div className="pb-4 border-b border-zinc-800">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#8DEE5F]" /> Post-Round Equity
              Split
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Target capitalization structure breakdown
            </p>
          </div>

          <div className="space-y-3 text-xs">
            {calculations.stakeholderRows.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="font-semibold text-white truncate max-w-[150px]">
                    {s.name}
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-white">
                    {s.postOwnershipPct.toFixed(1)}%
                  </span>
                  <span className="text-[11px] text-zinc-500 block">
                    ${(s.postValue / 1000000).toFixed(2)}M
                  </span>
                </div>
              </div>
            ))}

            {/* Investor Slice */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#00C6D8]/10 border border-[#00C6D8]/20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00C6D8] shrink-0" />
                <span className="font-bold text-[#00C6D8] truncate max-w-[150px]">
                  {simulation.targetInvestorName}
                </span>
              </div>
              <div className="text-right font-mono">
                <span className="font-bold text-[#00C6D8]">
                  {calculations.investorOwnershipPct.toFixed(1)}%
                </span>
                <span className="text-[11px] text-zinc-400 block">
                  ${(calculations.investment / 1000000).toFixed(2)}M
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Shareholder Ledger Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Shareholder Ledger
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Authorized and issued shares by class and stakeholder role
            </p>
          </div>

          <button
            onClick={() => setIsAddingShareholder(!isAddingShareholder)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00C6D8] to-[#8DEE5F] text-black font-extrabold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Stakeholder
          </button>
        </div>

        {/* Add Stakeholder Form */}
        {isAddingShareholder && (
          <form
            onSubmit={handleAddShareholderSubmit}
            className="p-4 sm:p-6 rounded-2xl bg-black border border-zinc-800 space-y-4 animate-in fade-in slide-in-from-top-2"
          >
            <h4 className="text-sm font-bold text-white">New Stakeholder</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase text-[10px]">
                  Name / Entity
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Jane Doe (Advisor)"
                  value={newShareholderName}
                  onChange={(e) => setNewShareholderName(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00C6D8]"
                />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase text-[10px]">
                  Role
                </label>
                <select
                  value={newShareholderRole}
                  onChange={(e) =>
                    setNewShareholderRole(e.target.value as ShareholderRole)
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00C6D8]"
                >
                  <option value="Founder">Founder</option>
                  <option value="Investor">Investor</option>
                  <option value="Employee">Employee / Advisor</option>
                  <option value="Option Pool">Option Pool</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase text-[10px]">
                  Share Class
                </label>
                <select
                  value={newShareholderClass}
                  onChange={(e) =>
                    setNewShareholderClass(e.target.value as ShareClass)
                  }
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00C6D8]"
                >
                  <option value="Common">Common</option>
                  <option value="Preferred">Preferred</option>
                  <option value="Options">Options</option>
                  <option value="SAFE">SAFE Note</option>
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 mb-1 font-bold uppercase text-[10px]">
                  Shares
                </label>
                <input
                  type="number"
                  min="1000"
                  step="10000"
                  value={newShareholderShares}
                  onChange={(e) => setNewShareholderShares(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00C6D8]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingShareholder(false)}
                className="px-4 py-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-zinc-200"
              >
                Save Stakeholder
              </button>
            </div>
          </form>
        )}

        {/* Table */}
        <div className="border border-zinc-800 rounded-2xl overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/60 border-b border-zinc-800 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-4">Stakeholder</th>
                <th className="p-4">Role</th>
                <th className="p-4">Class</th>
                <th className="p-4 text-right">Shares</th>
                <th className="p-4 text-right">Pre-Round %</th>
                <th className="p-4 text-right">Post-Round %</th>
                <th className="p-4 text-right">Dilution</th>
                <th className="p-4 text-right">Post Value</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {calculations.stakeholderRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: row.color }}
                    />
                    <span className="font-bold text-white">{row.name}</span>
                  </td>
                  <td className="p-4 text-zinc-400">{row.role}</td>
                  <td className="p-4 text-zinc-400">{row.shareClass}</td>
                  <td className="p-4 text-right font-mono text-zinc-200">
                    {row.shares.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-mono text-zinc-300">
                    {row.preOwnershipPct.toFixed(2)}%
                  </td>
                  <td className="p-4 text-right font-mono font-bold text-white">
                    {row.postOwnershipPct.toFixed(2)}%
                  </td>
                  <td className="p-4 text-right font-mono text-rose-400">
                    -{row.dilutionPct.toFixed(1)}%
                  </td>
                  <td className="p-4 text-right font-mono text-[#8DEE5F]">
                    ${(row.postValue / 1000000).toFixed(2)}M
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => removeShareholder(startupId, row.id)}
                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                      title="Remove Stakeholder"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
