'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Pencil,
  Copy,
  Archive,
  Trash2,
  ArrowUpDown,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { Skeleton } from '@/components/ui/skeleton'
import { statusOptions, availableTags, type Project } from '@/lib/admin-types'
import {
  createAdminProject,
  deleteAdminProject,
  fetchAdminProjects,
  getAdminAccessToken,
  updateAdminProject,
} from '@/lib/admin-api'
import { ProjectSheet } from '@/components/admin/project-sheet'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

type SortField = 'order' | 'updatedAt'
type SortDirection = 'asc' | 'desc'

export default function ProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [tagFilter, setTagFilter] = useState<string>('all')
  const [sortField, setSortField] = useState<SortField>('order')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)
  const [titleLang, setTitleLang] = useState<'en' | 'vi'>('en')
  const [isLoading, setIsLoading] = useState(true)

  const loadProjects = async () => {
    setIsLoading(true)

    try {
      const data = await fetchAdminProjects()
      setProjects(data)
    } catch {
      toast.error('Failed to load projects from API')
      setProjects([])
      if (!getAdminAccessToken()) {
        router.replace('/admin/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadProjects()
  }, [router])

  const filteredProjects = useMemo(() => {
    let result = [...projects]

    if (search) {
      const searchLower = search.toLowerCase()
      result = result.filter(
        (project) =>
          project.title.en.toLowerCase().includes(searchLower) ||
          project.title.vi.toLowerCase().includes(searchLower) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      )
    }

    if (statusFilter !== 'all') {
      result = result.filter((project) => project.status === statusFilter)
    }

    if (tagFilter !== 'all') {
      result = result.filter((project) => project.tags.includes(tagFilter))
    }

    result.sort((a, b) => {
      let comparison = 0
      if (sortField === 'order') {
        comparison = a.order - b.order
      } else {
        comparison = a.updatedAt.getTime() - b.updatedAt.getTime()
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })

    return result
  }, [projects, search, statusFilter, tagFilter, sortField, sortDirection])

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProjects.length) {
      setSelectedIds([])
      return
    }

    setSelectedIds(filteredProjects.map((project) => project.id))
  }

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    )
  }

  const handleCreateNew = () => {
    setEditingProject(null)
    setSheetOpen(true)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setSheetOpen(true)
  }

  const handleDuplicate = async (project: Project) => {
    try {
      await createAdminProject({
        ...project,
        title: {
          en: `${project.title.en} (Copy)`,
          vi: `${project.title.vi} (Ban sao)`,
        },
        status: 'draft',
        order: projects.length + 1,
      })
      toast.success('Project duplicated successfully')
      await loadProjects()
    } catch {
      toast.error('Failed to duplicate project')
      if (!getAdminAccessToken()) {
        router.replace('/admin/login')
      }
    }
  }

  const handleArchive = async (project: Project) => {
    try {
      await updateAdminProject(project, { status: 'archived' })
      toast.success('Project archived')
      await loadProjects()
    } catch {
      toast.error('Failed to archive project')
      if (!getAdminAccessToken()) {
        router.replace('/admin/login')
      }
    }
  }

  const handleDelete = (project: Project) => {
    setProjectToDelete(project)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!projectToDelete) {
      return
    }

    try {
      await deleteAdminProject(projectToDelete.id)
      toast.success('Project deleted')
      setDeleteDialogOpen(false)
      setProjectToDelete(null)
      await loadProjects()
    } catch {
      toast.error('Failed to delete project')
      if (!getAdminAccessToken()) {
        router.replace('/admin/login')
      }
    }
  }

  const handleSaveProject = async (data: Partial<Project>) => {
    try {
      if (editingProject) {
        const updatedProject = await updateAdminProject(editingProject, data)
        toast.success(
          updatedProject.status === 'draft'
            ? 'Project updated (draft: not visible on public page)'
            : 'Project updated successfully'
        )
      } else {
        const createdProject = await createAdminProject({
          ...data,
          order: data.order || projects.length + 1,
        })
        toast.success(
          createdProject.status === 'draft'
            ? 'Project created (draft: not visible on public page)'
            : 'Project created successfully'
        )
      }

      setSheetOpen(false)
      await loadProjects()
    } catch {
      toast.error('Failed to save project')
      if (!getAdminAccessToken()) {
        router.replace('/admin/login')
      }
    }
  }

  const getStatusBadge = (status: Project['status']) => {
    const variants: Record<Project['status'], { className: string; label: string }> = {
      published: {
        className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        label: 'Published',
      },
      draft: { className: 'bg-amber-500/10 text-amber-500 border-amber-500/20', label: 'Draft' },
      archived: { className: 'bg-muted text-muted-foreground border-border', label: 'Archived' },
    }
    return variants[status]
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button
          onClick={handleCreateNew}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-9 bg-secondary/30 border-border/50"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] bg-secondary/30 border-border/50">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="glass">
              <SelectItem value="all">All Status</SelectItem>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-[140px] bg-secondary/30 border-border/50">
              <SelectValue placeholder="Tags" />
            </SelectTrigger>
            <SelectContent className="glass max-h-60">
              <SelectItem value="all">All Tags</SelectItem>
              {availableTags.map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="glass rounded-xl border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedIds.length === filteredProjects.length && filteredProjects.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="w-16">
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8"
                  onClick={() => toggleSort('order')}
                >
                  Order
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  Title
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-1.5"
                    onClick={() => setTitleLang(titleLang === 'en' ? 'vi' : 'en')}
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    {titleLang.toUpperCase()}
                  </Button>
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8"
                  onClick={() => toggleSort('updatedAt')}
                >
                  Updated
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index} className="border-border/50">
                  <TableCell>
                    <Skeleton className="h-4 w-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))
            ) : filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="text-muted-foreground">
                    No projects found
                    {search ? (
                      <Button variant="link" className="ml-1 px-0" onClick={() => setSearch('')}>
                        Clear search
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => {
                const statusBadge = getStatusBadge(project.status)

                return (
                  <TableRow
                    key={project.id}
                    className={cn(
                      'border-border/50 group',
                      selectedIds.includes(project.id) && 'bg-primary/5'
                    )}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.includes(project.id)}
                        onCheckedChange={() => toggleSelect(project.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {project.order}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-foreground">{project.title[titleLang]}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {project.summary[titleLang]}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusBadge.className}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 2 ? (
                          <Badge variant="secondary" className="text-xs">
                            +{project.tags.length - 2}
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {project.updatedAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass w-48">
                          <DropdownMenuItem onClick={() => handleEdit(project)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(project)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => void handleDuplicate(project)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {project.status !== 'archived' ? (
                            <DropdownMenuItem onClick={() => void handleArchive(project)}>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                          ) : null}
                          <DropdownMenuItem
                            onClick={() => handleDelete(project)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-3 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            {selectedIds.length > 0
              ? `${selectedIds.length} of ${filteredProjects.length} selected`
              : `${filteredProjects.length} projects`}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" disabled>
              Next
            </Button>
          </div>
        </div>
      </div>

      <ProjectSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        project={editingProject}
        onSave={handleSaveProject}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="glass">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{projectToDelete?.title.en}&quot;? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void confirmDelete()}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
