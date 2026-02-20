'use client';

import { useState, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';

type Category = 'Work' | 'Atlas' | 'Personal';
type ColumnId = 'todo' | 'doing' | 'done';

interface Task {
  id: string;
  name: string;
  category: Category;
  description?: string;
}

interface Column {
  id: ColumnId;
  title: string;
  accent: string;
  bg: string;
}

const COLUMNS: Column[] = [
  { id: 'todo', title: 'To-Do', accent: '#F59E0B', bg: 'rgba(245,158,11,0.04)' },
  { id: 'doing', title: 'Doing', accent: '#0080FF', bg: 'rgba(0,128,255,0.04)' },
  { id: 'done', title: 'Done', accent: '#00d4aa', bg: 'rgba(0,212,170,0.04)' },
];

const CATEGORY_COLORS: Record<Category, string> = {
  Work: '#0080FF',
  Atlas: '#A855F7',
  Personal: '#F59E0B',
};

const INITIAL_DATA: Record<ColumnId, Task[]> = {
  todo: [
    { id: 't1', name: 'Work project tracker', category: 'Work', description: 'Log contributions for self-assessment' },
    { id: 't2', name: 'Personal portfolio web app', category: 'Atlas', description: 'Showcase achievements and work history' },
    { id: 't3', name: 'Budget setup', category: 'Atlas' },
    { id: 't4', name: 'New truck cameras', category: 'Personal' },
    { id: 't5', name: 'Clean white shoes', category: 'Personal' },
    { id: 't6', name: 'Register EZ tag', category: 'Personal' },
    { id: 't7', name: 'Jeep hanging light', category: 'Personal' },
    { id: 't8', name: 'Declaration document', category: 'Personal', description: 'Insurance' },
  ],
  doing: [
    { id: 'd1', name: 'Mission Control UI Upgrade', category: 'Atlas', description: 'Design system overhaul' },
    { id: 'd2', name: 'MO-210 Study: Formulas & Functions', category: 'Work' },
  ],
  done: [
    { id: 'c1', name: 'EA Launch', category: 'Atlas', description: 'Feb 17, 2026' },
    { id: 'c2', name: 'OpenClaw Setup', category: 'Atlas', description: 'Tailscale + Gateway' },
    { id: 'c3', name: 'iMessage Integration', category: 'Atlas' },
  ],
};

export default function ProjectsPage() {
  const [columns, setColumns] = useState<Record<ColumnId, Task[]>>(INITIAL_DATA);
  const [draggedTask, setDraggedTask] = useState<{ task: Task; sourceCol: ColumnId } | null>(null);
  const [dragOverCol, setDragOverCol] = useState<ColumnId | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  function handleDragStart(e: DragEvent, task: Task, sourceCol: ColumnId) {
    setDraggedTask({ task, sourceCol });
    e.dataTransfer.effectAllowed = 'move';
    // Needed for Firefox
    e.dataTransfer.setData('text/plain', task.id);
  }

  function handleDragOver(e: DragEvent, colId: ColumnId, index?: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverCol(colId);
    if (index !== undefined) {
      setDragOverIndex(index);
    }
  }

  function handleDragLeave(e: DragEvent, colId: ColumnId) {
    // Only clear if actually leaving the column
    const relatedTarget = e.relatedTarget as HTMLElement | null;
    const currentTarget = e.currentTarget as HTMLElement;
    if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
      if (dragOverCol === colId) {
        setDragOverCol(null);
        setDragOverIndex(null);
      }
    }
  }

  function handleDrop(e: DragEvent, targetCol: ColumnId) {
    e.preventDefault();
    if (!draggedTask) return;

    const { task, sourceCol } = draggedTask;

    setColumns(prev => {
      const newCols = { ...prev };
      // Remove from source
      newCols[sourceCol] = prev[sourceCol].filter(t => t.id !== task.id);
      // Insert into target at the right position
      const targetList = [...newCols[targetCol]];
      const insertAt = dragOverIndex !== null ? dragOverIndex : targetList.length;
      targetList.splice(insertAt, 0, task);
      newCols[targetCol] = targetList;
      return newCols;
    });

    setDraggedTask(null);
    setDragOverCol(null);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    setDraggedTask(null);
    setDragOverCol(null);
    setDragOverIndex(null);
  }

  const totalTasks = Object.values(columns).reduce((s, c) => s + c.length, 0);
  const doneCount = columns.done.length;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title="Projects" />
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">

        {/* KPI Row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'To-Do', value: String(columns.todo.length), color: '#F59E0B' },
            { label: 'In Progress', value: String(columns.doing.length), color: '#0080FF' },
            { label: 'Completed', value: String(doneCount), color: '#00d4aa' },
          ].map((kpi, i) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="text-xs text-muted mb-1">{kpi.label}</div>
              <div className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ minHeight: 'calc(100vh - 280px)' }}>
          {COLUMNS.map((col, colIndex) => {
            const tasks = columns[col.id];
            const isOver = dragOverCol === col.id;

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24 + colIndex * 0.1 }}
                className="flex flex-col rounded-xl border transition-colors duration-200 overflow-hidden"
                style={{
                  background: isOver ? col.bg.replace('0.04', '0.08') : col.bg,
                  borderColor: isOver ? col.accent + '40' : '#252525',
                }}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={(e) => handleDragLeave(e, col.id)}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: col.accent }}
                    />
                    <h2
                      className="text-sm font-semibold tracking-wide font-[family-name:var(--font-oxanium)]"
                      style={{ color: col.accent }}
                    >
                      {col.title}
                    </h2>
                  </div>
                  <span className="text-xs text-muted bg-background/50 px-2 py-0.5 rounded-full">
                    {tasks.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                  <AnimatePresence mode="popLayout">
                    {tasks.map((task, taskIndex) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: colIndex * 0.1 + taskIndex * 0.05 }}
                        draggable
                        onDragStart={(e) => handleDragStart(e as unknown as DragEvent<Element>, task, col.id)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragOverCol(col.id);
                          setDragOverIndex(taskIndex);
                        }}
                        onDragEnd={handleDragEnd}
                        className={`
                          bg-card border border-border rounded-lg p-3 cursor-grab active:cursor-grabbing
                          hover:border-white/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/20
                          transition-all duration-150
                          ${draggedTask?.task.id === task.id ? 'opacity-40' : ''}
                        `}
                      >
                        <div className="font-medium text-sm mb-1.5">{task.name}</div>
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: CATEGORY_COLORS[task.category] }}
                          />
                          <span
                            className="text-xs font-medium"
                            style={{ color: CATEGORY_COLORS[task.category] }}
                          >
                            {task.category}
                          </span>
                        </div>
                        {task.description && (
                          <div className="text-xs text-muted mt-1.5 leading-relaxed">
                            {task.description}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Drop zone indicator when column is empty or at bottom */}
                  {isOver && tasks.length === 0 && (
                    <div
                      className="border-2 border-dashed rounded-lg h-20 flex items-center justify-center transition-colors"
                      style={{ borderColor: col.accent + '50' }}
                    >
                      <span className="text-xs text-muted">Drop here</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
