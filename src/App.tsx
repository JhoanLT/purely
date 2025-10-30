import React, { useEffect, useState } from 'react';
import { api } from './api';

type Item = { _id: string; name: string; description?: string };

export default function App() {
    const [items, setItems] = useState<Item[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editing, setEditing] = useState<Item | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const base = '/api/items';

    const load = async () => {
        setLoading(true);
        try {
            const { data } = await api.get<Item[]>(base);
            setItems(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const resetForm = () => {
        setEditing(null);
        setName('');
        setDescription('');
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editing) {
                await api.put(`${base}/${editing._id}`, { name, description });
            } else {
                await api.post(base, { name, description });
            }
            resetForm();
            load();
        } finally {
            setSubmitting(false);
        }
    };

    const onEdit = (it: Item) => {
        setEditing(it);
        setName(it.name);
        setDescription(it.description || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const onDelete = async (id: string) => {
        if (!confirm('¿Eliminar este ítem?')) return;
        await api.delete(`${base}/${id}`);
        load();
    };

    return (
        <div className="min-h-dvh bg-gray-50 text-gray-900">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="container flex items-center justify-between py-4">
                    <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
                        Gym stuff manager
                    </h1>
                    <span className="text-sm text-gray-500">
            {items.length} ítem{items.length === 1 ? '' : 's'}
          </span>
                </div>
            </header>

            {/* Main */}
            <main className="container py-8">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Form */}
                    <section className="lg:col-span-1">
                        <div className="rounded-2xl border bg-white shadow-sm">
                            <div className="border-b px-5 py-4">
                                <h2 className="text-lg font-medium">
                                    {editing ? 'Editar ítem' : 'Crear nuevo ítem'}
                                </h2>
                                <p className="text-sm text-gray-500">Completa los campos y guarda.</p>
                            </div>

                            <form onSubmit={submit} className="px-5 py-5 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Nombre <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-white"
                                        placeholder="Mancuernas"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Descripción</label>
                                    <input
                                        className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 bg-white"
                                        placeholder="Par 10kg"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:opacity-60"
                                    >
                                        {submitting ? 'Guardando…' : editing ? 'Actualizar' : 'Crear'}
                                    </button>
                                    {editing && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="inline-flex items-center justify-center rounded-xl border px-4 py-2 font-medium hover:bg-gray-50"
                                        >
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </section>

                    {/* List */}
                    <section className="lg:col-span-2">
                        <div className="rounded-2xl border bg-white shadow-sm">
                            <div className="border-b px-5 py-4 flex items-center justify-between">
                                <h2 className="text-lg font-medium">Ítems</h2>
                                <button
                                    className="text-sm rounded-lg border px-3 py-1.5 hover:bg-gray-50"
                                    onClick={load}
                                >
                                    Refrescar
                                </button>
                            </div>

                            <div className="p-5">
                                {loading ? (
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <div key={i} className="animate-pulse rounded-xl border p-4">
                                                <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
                                                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                                                <div className="mt-4 flex gap-2">
                                                    <div className="h-8 w-20 bg-gray-200 rounded"></div>
                                                    <div className="h-8 w-24 bg-gray-200 rounded"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : items.length === 0 ? (
                                    <div className="text-center py-12 text-gray-500">
                                        No hay ítems aún. Crea el primero.
                                    </div>
                                ) : (
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        {items.map((it) => (
                                            <article key={it._id} className="rounded-xl border p-4">
                                                <h3 className="font-semibold">{it.name}</h3>
                                                <p className="text-gray-600">{it.description || '—'}</p>
                                                <div className="mt-4 flex gap-2">
                                                    <button
                                                        onClick={() => onEdit(it)}
                                                        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => onDelete(it._id)}
                                                        className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}