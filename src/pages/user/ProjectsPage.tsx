import { useEffect, useState, type FormEvent } from 'react'

type Project = {
  id: number
  name: string
  description: string
  createdAt: string
  members: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setProjects([
      {
        id: 1,
        name: 'Marketing Website Revamp',
        description: 'Refresh landing pages and improve conversion-focused UI sections.',
        createdAt: '2026-01-12T00:00:00.000Z',
        members: 5,
      },
      {
        id: 2,
        name: 'Mobile App MVP',
        description: 'Build core user auth, dashboard, and notification modules.',
        createdAt: '2026-02-03T00:00:00.000Z',
        members: 8,
      },
      {
        id: 3,
        name: 'Billing Automation',
        description: 'Set up invoice flows, webhook handling, and plan lifecycle tracking.',
        createdAt: '2026-02-18T00:00:00.000Z',
        members: 4,
      },
      {
        id: 4,
        name: 'Admin Analytics',
        description: 'Create admin-level reports for users, subscriptions, and growth trends.',
        createdAt: '2026-03-01T00:00:00.000Z',
        members: 6,
      },
    ])
  }, [])

  const openCreateModal = () => {
    setEditingProjectId(null)
    setName('')
    setDescription('')
    setError('')
    setIsModalOpen(true)
  }

  const openEditModal = (project: Project) => {
    setEditingProjectId(project.id)
    setName(project.name)
    setDescription(project.description)
    setError('')
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProjectId(null)
    setName('')
    setDescription('')
    setError('')
  }

  const onSaveProject = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!name.trim()) return

    if (editingProjectId) {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === editingProjectId
            ? {
                ...project,
                name: name.trim(),
                description: description.trim(),
              members: project.members,
              }
            : project,
        ),
      )
      closeModal()
      return
    }

    const newProject: Project = {
      id: Date.now(),
      name: name.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
      members: 1,
    }
    setProjects((prev) => [newProject, ...prev])
    closeModal()
  }

  const onDelete = (id: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== id))
  }

  return (
    <section className="space-y-4">
      <div className="card flex items-center justify-between">
        <h2 className="text-lg font-semibold">Projects</h2>
        <button type="button" className="btn-primary" onClick={openCreateModal}>
          Create
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="card space-y-3">
            <div>
              <h3 className="text-base font-semibold">{project.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{project.description || 'No description'}</p>
            </div>
            <p className="text-xs text-slate-500">
              Created: {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs text-slate-500">
              No. of members: {project.members}
            </p>
            <div className="flex gap-2">
              <button type="button" className="btn-secondary" onClick={() => openEditModal(project)}>
                Edit
              </button>
              <button type="button" className="btn-secondary" onClick={() => onDelete(project.id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <form onSubmit={onSaveProject} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">{editingProjectId ? 'Edit Project' : 'Create Project'}</h3>
            {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
            <div className="space-y-3">
              <input
                className="input"
                placeholder="Project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <textarea
                className="input"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" className="btn-secondary" onClick={closeModal}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingProjectId ? 'Save' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  )
}
