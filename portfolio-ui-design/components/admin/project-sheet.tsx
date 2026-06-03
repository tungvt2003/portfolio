'use client'

import { useState, useEffect } from 'react'
import { X, Plus, Trash2, Link2, ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { type Project, statusOptions, availableTags } from '@/lib/admin-types'
import { cn } from '@/lib/utils'

interface ProjectSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: Project | null
  onSave: (data: Partial<Project>) => Promise<void> | void
}

export function ProjectSheet({
  open,
  onOpenChange,
  project,
  onSave,
}: ProjectSheetProps) {
  const isEditing = !!project

  // Form state
  const [titleEn, setTitleEn] = useState('')
  const [titleVi, setTitleVi] = useState('')
  const [summaryEn, setSummaryEn] = useState('')
  const [summaryVi, setSummaryVi] = useState('')
  const [problemEn, setProblemEn] = useState('')
  const [problemVi, setProblemVi] = useState('')
  const [solutionEn, setSolutionEn] = useState('')
  const [solutionVi, setSolutionVi] = useState('')
  const [impactEn, setImpactEn] = useState('')
  const [impactVi, setImpactVi] = useState('')
  const [repoUrl, setRepoUrl] = useState('')
  const [demoUrl, setDemoUrl] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [status, setStatus] = useState<Project['status']>('draft')
  const [order, setOrder] = useState(1)
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [galleryUrls, setGalleryUrls] = useState<string[]>([])
  const [tagPickerOpen, setTagPickerOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Reset form when project changes
  useEffect(() => {
    if (project) {
      setTitleEn(project.title.en)
      setTitleVi(project.title.vi)
      setSummaryEn(project.summary.en)
      setSummaryVi(project.summary.vi)
      setProblemEn(project.problem?.en || '')
      setProblemVi(project.problem?.vi || '')
      setSolutionEn(project.solution?.en || '')
      setSolutionVi(project.solution?.vi || '')
      setImpactEn(project.impact?.en || '')
      setImpactVi(project.impact?.vi || '')
      setRepoUrl(project.repoUrl)
      setDemoUrl(project.demoUrl)
      setSelectedTags(project.tags)
      setStatus(project.status)
      setOrder(project.order)
      setThumbnailUrl(project.thumbnailUrl)
      setGalleryUrls(project.galleryUrls)
    } else {
      // Reset to defaults for new project
      setTitleEn('')
      setTitleVi('')
      setSummaryEn('')
      setSummaryVi('')
      setProblemEn('')
      setProblemVi('')
      setSolutionEn('')
      setSolutionVi('')
      setImpactEn('')
      setImpactVi('')
      setRepoUrl('')
      setDemoUrl('')
      setSelectedTags([])
      setStatus('draft')
      setOrder(1)
      setThumbnailUrl('')
      setGalleryUrls([])
    }
    setErrors({})
  }, [project, open])

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!titleEn.trim()) newErrors.titleEn = 'English title is required'
    if (!titleVi.trim()) newErrors.titleVi = 'Vietnamese title is required'
    if (!summaryEn.trim()) newErrors.summaryEn = 'English summary is required'
    if (!summaryVi.trim()) newErrors.summaryVi = 'Vietnamese summary is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return

    setIsSaving(true)

    const data: Partial<Project> = {
      title: { en: titleEn, vi: titleVi },
      summary: { en: summaryEn, vi: summaryVi },
      problem: problemEn || problemVi ? { en: problemEn, vi: problemVi } : undefined,
      solution: solutionEn || solutionVi ? { en: solutionEn, vi: solutionVi } : undefined,
      impact: impactEn || impactVi ? { en: impactEn, vi: impactVi } : undefined,
      repoUrl,
      demoUrl,
      tags: selectedTags,
      status,
      order,
      thumbnailUrl,
      galleryUrls,
    }

    try {
      await onSave(data)
    } finally {
      setIsSaving(false)
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const addGalleryUrl = () => {
    setGalleryUrls([...galleryUrls, ''])
  }

  const updateGalleryUrl = (index: number, value: string) => {
    const updated = [...galleryUrls]
    updated[index] = value
    setGalleryUrls(updated)
  }

  const removeGalleryUrl = (index: number) => {
    setGalleryUrls(galleryUrls.filter((_, i) => i !== index))
  }

  const getStatusBadge = (s: Project['status']) => {
    const variants: Record<Project['status'], string> = {
      published: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      draft: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
      archived: 'bg-muted text-muted-foreground border-border',
    }
    return variants[s]
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col glass border-l border-border/50">
        {/* Header */}
        <SheetHeader className="px-6 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <SheetTitle className="flex-1">
              {isEditing ? titleEn || 'Edit Project' : 'New Project'}
            </SheetTitle>
            <Badge variant="outline" className={getStatusBadge(status)}>
              {statusOptions.find((o) => o.value === status)?.label}
            </Badge>
          </div>
          <SheetDescription>
            {isEditing
              ? 'Update project details and content'
              : 'Create a new portfolio project'}
          </SheetDescription>
        </SheetHeader>

        {/* Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Language Tabs */}
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-secondary/30">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
              </TabsList>

              {/* English Content */}
              <TabsContent value="en" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title-en">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title-en"
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="Enter project title..."
                    className={cn(
                      'bg-secondary/30 border-border/50',
                      errors.titleEn && 'border-destructive'
                    )}
                  />
                  {errors.titleEn && (
                    <p className="text-xs text-destructive">{errors.titleEn}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary-en">
                    Summary <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="summary-en"
                    value={summaryEn}
                    onChange={(e) => setSummaryEn(e.target.value)}
                    placeholder="Brief project description..."
                    rows={2}
                    className={cn(
                      'bg-secondary/30 border-border/50 resize-none',
                      errors.summaryEn && 'border-destructive'
                    )}
                  />
                  {errors.summaryEn && (
                    <p className="text-xs text-destructive">{errors.summaryEn}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem-en">Problem</Label>
                  <Textarea
                    id="problem-en"
                    value={problemEn}
                    onChange={(e) => setProblemEn(e.target.value)}
                    placeholder="What problem does this solve?"
                    rows={2}
                    className="bg-secondary/30 border-border/50 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution-en">Solution</Label>
                  <Textarea
                    id="solution-en"
                    value={solutionEn}
                    onChange={(e) => setSolutionEn(e.target.value)}
                    placeholder="How did you solve it?"
                    rows={2}
                    className="bg-secondary/30 border-border/50 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact-en">Impact</Label>
                  <Textarea
                    id="impact-en"
                    value={impactEn}
                    onChange={(e) => setImpactEn(e.target.value)}
                    placeholder="What was the result/impact?"
                    rows={2}
                    className="bg-secondary/30 border-border/50 resize-none"
                  />
                </div>
              </TabsContent>

              {/* Vietnamese Content */}
              <TabsContent value="vi" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="title-vi">
                    Tiêu đề <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title-vi"
                    value={titleVi}
                    onChange={(e) => setTitleVi(e.target.value)}
                    placeholder="Nhập tiêu đề dự án..."
                    className={cn(
                      'bg-secondary/30 border-border/50',
                      errors.titleVi && 'border-destructive'
                    )}
                  />
                  {errors.titleVi && (
                    <p className="text-xs text-destructive">{errors.titleVi}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary-vi">
                    Tóm tắt <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="summary-vi"
                    value={summaryVi}
                    onChange={(e) => setSummaryVi(e.target.value)}
                    placeholder="Mô tả ngắn gọn về dự án..."
                    rows={2}
                    className={cn(
                      'bg-secondary/30 border-border/50 resize-none',
                      errors.summaryVi && 'border-destructive'
                    )}
                  />
                  {errors.summaryVi && (
                    <p className="text-xs text-destructive">{errors.summaryVi}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="problem-vi">Vấn đề</Label>
                  <Textarea
                    id="problem-vi"
                    value={problemVi}
                    onChange={(e) => setProblemVi(e.target.value)}
                    placeholder="Dự án giải quyết vấn đề gì?"
                    rows={2}
                    className="bg-secondary/30 border-border/50 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="solution-vi">Giải pháp</Label>
                  <Textarea
                    id="solution-vi"
                    value={solutionVi}
                    onChange={(e) => setSolutionVi(e.target.value)}
                    placeholder="Bạn đã giải quyết như thế nào?"
                    rows={2}
                    className="bg-secondary/30 border-border/50 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impact-vi">Kết quả</Label>
                  <Textarea
                    id="impact-vi"
                    value={impactVi}
                    onChange={(e) => setImpactVi(e.target.value)}
                    placeholder="Kết quả/tác động là gì?"
                    rows={2}
                    className="bg-secondary/30 border-border/50 resize-none"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Separator className="bg-border/50" />

            {/* Additional Fields */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Additional Details</h3>

              {/* URLs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="repo-url">Repository URL</Label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="repo-url"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="pl-9 bg-secondary/30 border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="demo-url">Demo URL</Label>
                  <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="demo-url"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://demo.example.com"
                      className="pl-9 bg-secondary/30 border-border/50"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>Tags</Label>
                <Popover open={tagPickerOpen} onOpenChange={setTagPickerOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-secondary/30 border-border/50 h-auto min-h-10 py-2"
                    >
                      {selectedTags.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {selectedTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleTag(tag)
                              }}
                            >
                              {tag}
                              <X className="ml-1 h-3 w-3" />
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">Select tags...</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 glass" align="start">
                    <Command>
                      <CommandInput placeholder="Search tags..." />
                      <CommandList>
                        <CommandEmpty>No tags found.</CommandEmpty>
                        <CommandGroup>
                          {availableTags.map((tag) => (
                            <CommandItem
                              key={tag}
                              onSelect={() => toggleTag(tag)}
                              className={cn(
                                selectedTags.includes(tag) && 'bg-primary/10'
                              )}
                            >
                              <div
                                className={cn(
                                  'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                                  selectedTags.includes(tag)
                                    ? 'bg-primary text-primary-foreground'
                                    : 'opacity-50'
                                )}
                              >
                                {selectedTags.includes(tag) && (
                                  <span className="text-xs">✓</span>
                                )}
                              </div>
                              {tag}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Status & Order */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={status}
                    onValueChange={(v) => setStatus(v as Project['status'])}
                  >
                    <SelectTrigger className="bg-secondary/30 border-border/50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass">
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    min={1}
                    value={order}
                    onChange={(e) => setOrder(parseInt(e.target.value) || 1)}
                    className="bg-secondary/30 border-border/50"
                  />
                </div>
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="thumbnail"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="/projects/thumbnail.jpg"
                    className="pl-9 bg-secondary/30 border-border/50"
                  />
                </div>
              </div>

              {/* Gallery URLs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Gallery Images</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={addGalleryUrl}
                    className="h-8"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {galleryUrls.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={url}
                        onChange={(e) => updateGalleryUrl(index, e.target.value)}
                        placeholder="/projects/gallery-image.jpg"
                        className="bg-secondary/30 border-border/50"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeGalleryUrl(index)}
                        className="shrink-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {galleryUrls.length === 0 && (
                    <p className="text-sm text-muted-foreground py-2">
                      No gallery images added yet
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <SheetFooter className="px-6 py-4 border-t border-border/50">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
          >
            {isSaving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Project'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
