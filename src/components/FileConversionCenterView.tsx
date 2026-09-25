import React, { useRef, useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileAudio, 
  FileVideo, 
  Filter, 
  Loader2, 
  Play, 
  Radio, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Tag, 
  Upload, 
  UserCheck, 
  Video 
} from 'lucide-react';
import { useCommandCenter } from '../context/CommandCenterContext';
import { TranscriptionJob } from '../types';

export const FileConversionCenterView: React.FC = () => {
  const { transcriptionJobs, createTranscriptionJob } = useCommandCenter();
  const [selectedJob, setSelectedJob] = useState<TranscriptionJob>(transcriptionJobs[0]);
  const [isUploading, setIsUploading] = useState(false);
  const [transcriptSearch, setTranscriptSearch] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setIsUploading(true);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
    await createTranscriptionJob(file.name, sizeMb);
    setIsUploading(false);
  };

  const handleSampleUpload = async () => {
    setIsUploading(true);
    await createTranscriptionJob('ChristianPrep_Preps2Press_Broadcaster_Briefing.mp4', '64.2 MB');
    setIsUploading(false);
  };

  const filteredSegments = selectedJob?.segments.filter(seg => 
    seg.text.toLowerCase().includes(transcriptSearch.toLowerCase()) ||
    seg.speaker.toLowerCase().includes(transcriptSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900/90 via-emerald-950/30 to-cyan-950/40 border border-cyan-500/20 p-6 rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono-code">
              <Radio className="w-4 h-4" />
              <span>ASSEMBLYAI PIPELINE • ASYNCHRONOUS JOB PATTERN & BRIGHTCOVE SYNC</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Conversational Intel & <span className="text-cyan-400">Audio/Video Studio</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Drop sales calls, combine tapes, or podcast interviews. Audio/video files bypass Netlify 10-second timeout limits via asynchronous serverless webhooks, delivering speaker-diarized transcripts (Agent vs. Athlete vs. Scout) synced to Brightcove video IDs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono-code text-slate-300">
              <span className="text-emerald-400 font-bold">AssemblyAI:</span> Speaker Diarization v3
            </div>
          </div>
        </div>
      </div>

      {/* Upload Zone & Job Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Dropzone */}
        <div className="executive-card p-6 lg:col-span-1 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-cyan-400" />
              File Conversion Center
            </h2>
            <p className="text-xs text-slate-400 mb-4">
              Drop audio/video files (.mp4, .wav, .mp3, .m4a) for asynchronous speaker identification and PII redaction.
            </p>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-700 hover:border-cyan-400 rounded-xl p-6 text-center cursor-pointer transition bg-slate-900/50 hover:bg-slate-900/80 group"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,video/*,.mp4,.wav,.mp3,.m4a"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 mx-auto flex items-center justify-center mb-3 group-hover:scale-110 transition">
                {isUploading ? <Loader2 className="w-6 h-6 animate-spin" /> : <FileVideo className="w-6 h-6" />}
              </div>
              <div className="text-xs font-bold text-white mb-1">
                {isUploading ? 'Uploading to Storage Bucket...' : 'Drag & Drop or Click to Upload'}
              </div>
              <div className="text-[11px] text-slate-500">
                Supports up to 500MB • Auto-chunks via Netlify Blobs
              </div>
            </div>

            <button
              onClick={handleSampleUpload}
              disabled={isUploading}
              className="w-full mt-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Simulate Upload: Prep Broadcast Tape (.mp4)
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
            <span>PII Redaction: <strong className="text-emerald-400">Enabled</strong></span>
            <span>Timeout Guard: <strong className="text-cyan-400">Async Webhook</strong></span>
          </div>
        </div>

        {/* Recent Jobs List */}
        <div className="executive-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileAudio className="w-4 h-4 text-emerald-400" />
              Asynchronous Processing Pipeline Queue
            </h2>
            <span className="text-xs text-slate-400 font-mono-code">{transcriptionJobs.length} Jobs</span>
          </div>

          <div className="space-y-3">
            {transcriptionJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  selectedJob?.id === job.id
                    ? 'bg-cyan-950/40 border-cyan-500/50 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-white truncate max-w-xs">{job.filename}</span>
                    <span className={`px-2 py-0.2 text-[9px] font-bold rounded uppercase font-mono-code ${
                      job.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : job.status === 'diarizing'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800 animate-pulse'
                        : 'bg-sky-950 text-sky-400 border border-sky-800 animate-pulse'
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span>{job.fileSize}</span>
                    <span>•</span>
                    <span>Duration: {job.duration}</span>
                    {job.brightcoveVideoId && (
                      <>
                        <span>•</span>
                        <span className="text-amber-400 font-mono-code flex items-center gap-1">
                          <Video className="w-3 h-3" /> Brightcove ID: {job.brightcoveVideoId}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap gap-1">
                    {job.speakers.map((spk, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {spk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Transcript Viewer & Diarization */}
      {selectedJob && (
        <div className="executive-card p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-code text-cyan-400 uppercase font-bold">Interactive Diarized Transcript</span>
                {selectedJob.brightcoveVideoId && (
                  <span className="px-2 py-0.5 text-[10px] rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono-code font-bold">
                    Brightcove Sync Active
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-white mt-1">{selectedJob.filename}</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                {selectedJob.summary}
              </p>
            </div>

            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={transcriptSearch}
                onChange={(e) => setTranscriptSearch(e.target.value)}
                placeholder="Search dialogue keywords..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Diarized speech bubbles */}
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {filteredSegments && filteredSegments.length > 0 ? (
              filteredSegments.map((seg, idx) => {
                const isAgent = seg.speaker === 'Agent';
                const isAthlete = seg.speaker === 'Athlete';
                const isScout = seg.speaker === 'Scout';

                return (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-xl border transition ${
                      isAgent 
                        ? 'bg-slate-900/80 border-cyan-500/30 ml-0 mr-12' 
                        : isAthlete
                        ? 'bg-amber-950/20 border-amber-500/30 ml-6 mr-6'
                        : isScout
                        ? 'bg-violet-950/20 border-violet-500/30 ml-12 mr-0'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md uppercase font-mono-code ${
                          isAgent 
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-700' 
                            : isAthlete
                            ? 'bg-amber-950 text-amber-300 border border-amber-700'
                            : isScout
                            ? 'bg-violet-950 text-violet-300 border border-violet-700'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          {seg.speaker}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono-code text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {seg.time}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      {seg.text}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                {selectedJob.status !== 'completed' 
                  ? 'AssemblyAI speech diarization is actively processing in the background...'
                  : 'No dialogue segments matched your search query.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
