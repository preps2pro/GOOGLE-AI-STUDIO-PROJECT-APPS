/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CommandCenterProvider, useCommandCenter } from './context/CommandCenterContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { FootballNetworkView } from './components/FootballNetworkView';
import { VentureCapitalView } from './components/VentureCapitalView';
import { CrmSystemOfRecordView } from './components/CrmSystemOfRecordView';
import { IntelligenceCenterView } from './components/IntelligenceCenterView';
import { AiWorkforceTrainingView } from './components/AiWorkforceTrainingView';
import { FileConversionCenterView } from './components/FileConversionCenterView';
import { PhilanthropyView } from './components/PhilanthropyView';
import { BlestoAccessModal } from './components/BlestoAccessModal';
import { AppLauncherModal } from './components/AppLauncherModal';
import { AddContactModal } from './components/AddContactModal';
import { SettingsModal } from './components/SettingsModal';

const MainLayout: React.FC = () => {
  const { activeTab } = useCommandCenter();

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Mega-Menu & Strategic Glass Header */}
      <Header />

      {/* Main App Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Tactical Glassmorphic Sidebar */}
        <Sidebar />

        {/* Dynamic Scrollable Content Workspace */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'football' && <FootballNetworkView />}
          {(activeTab === 'venture' || activeTab === 'ventureCapital') && <VentureCapitalView />}
          {(activeTab === 'crm' || activeTab === 'staging') && <CrmSystemOfRecordView />}
          {activeTab === 'intelligence' && <IntelligenceCenterView />}
          {activeTab === 'training' && <AiWorkforceTrainingView />}
          {activeTab === 'transcription' && <FileConversionCenterView />}
          {activeTab === 'philanthropy' && <PhilanthropyView />}
        </main>
      </div>

      {/* Global Modals & Interaction Drawers */}
      <BlestoAccessModal />
      <AppLauncherModal />
      <AddContactModal />
      <SettingsModal />
    </div>
  );
};

export default function App() {
  return (
    <CommandCenterProvider>
      <MainLayout />
    </CommandCenterProvider>
  );
}
