import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Plus, Mail, Link2, GitBranch, FileText, Code, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Collaborator {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "owner" | "editor" | "viewer";
}

const suggestedCollaborators = [
  { id: "1", name: "Priya Sharma", email: "priya.s@vit.edu", department: "AI/ML" },
  { id: "2", name: "Rahul Kumar", email: "rahul.k@vit.edu", department: "CS" },
  { id: "3", name: "Sneha Reddy", email: "sneha.r@vit.edu", department: "Data Science" },
  { id: "4", name: "Aditya Singh", email: "aditya.s@vit.edu", department: "ECE" },
];

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<"project" | "paper" | "snippet">("project");
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuggestions = suggestedCollaborators.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addCollaborator = (person: typeof suggestedCollaborators[0]) => {
    if (!collaborators.find((c) => c.id === person.id)) {
      setCollaborators([
        ...collaborators,
        { ...person, role: "editor" as const },
      ]);
    }
    setSearchQuery("");
  };

  const removeCollaborator = (id: string) => {
    setCollaborators(collaborators.filter((c) => c.id !== id));
  };

  const updateCollaboratorRole = (id: string, role: Collaborator["role"]) => {
    setCollaborators(
      collaborators.map((c) => (c.id === id ? { ...c, role } : c))
    );
  };

  const sendEmailInvite = () => {
    if (inviteEmail && inviteEmail.includes("@")) {
      setCollaborators([
        ...collaborators,
        {
          id: `email-${Date.now()}`,
          name: inviteEmail.split("@")[0],
          email: inviteEmail,
          role: "editor",
        },
      ]);
      setInviteEmail("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Add a new project, paper, or code snippet to your repository
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`h-0.5 w-12 mx-2 transition-colors ${
                    step > s ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
          <div className="ml-4 text-sm text-muted-foreground">
            {step === 1 && "Basic Info"}
            {step === 2 && "Add Collaborators"}
            {step === 3 && "Review & Create"}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div>
                <Label>Project Type</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {[
                    { value: "project", icon: Code, label: "Project" },
                    { value: "paper", icon: FileText, label: "Paper" },
                    { value: "snippet", icon: GitBranch, label: "Snippet" },
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setProjectType(type.value as typeof projectType)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                        projectType === type.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <type.icon className={`h-6 w-6 ${projectType === type.value ? "text-primary" : "text-muted-foreground"}`} />
                      <span className={`text-sm font-medium ${projectType === type.value ? "text-primary" : "text-foreground"}`}>
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter project title..." className="mt-1" />
              </div>

              <div>
                <Label htmlFor="abstract">Description</Label>
                <Textarea
                  id="abstract"
                  placeholder="Describe your project..."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="github">GitHub URL (Optional)</Label>
                <div className="relative mt-1">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="github" placeholder="https://github.com/..." className="pl-10" />
                </div>
              </div>

              <div>
                <Label>Tags</Label>
                <Input placeholder="Add tags separated by commas..." className="mt-1" />
              </div>
            </motion.div>
          )}

          {/* Step 2: Collaborators */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Add Collaborators</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Invite peers to collaborate on this project. They'll be able to contribute and share credit.
                </p>
              </div>

              {/* Search for collaborators */}
              <div>
                <Label>Search Peers</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 border rounded-lg divide-y">
                    {filteredSuggestions.map((person) => (
                      <button
                        key={person.id}
                        onClick={() => addCollaborator(person)}
                        className="flex items-center gap-3 w-full p-3 hover:bg-accent/50 transition-colors text-left"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {person.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{person.name}</p>
                          <p className="text-xs text-muted-foreground">{person.email}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {person.department}
                        </Badge>
                        <UserPlus className="h-4 w-4 text-primary" />
                      </button>
                    ))}
                    {filteredSuggestions.length === 0 && (
                      <p className="p-3 text-sm text-muted-foreground text-center">No peers found</p>
                    )}
                  </div>
                )}
              </div>

              {/* Invite by email */}
              <div>
                <Label>Invite by Email</Label>
                <div className="flex gap-2 mt-1">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter email address..."
                      className="pl-10"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <Button onClick={sendEmailInvite} disabled={!inviteEmail.includes("@")}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Added Collaborators */}
              {collaborators.length > 0 && (
                <div>
                  <Label>Added Collaborators ({collaborators.length})</Label>
                  <div className="mt-2 space-y-2">
                    {collaborators.map((collab) => (
                      <div
                        key={collab.id}
                        className="flex items-center gap-3 p-3 rounded-lg border bg-card"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-primary text-sm">
                            {collab.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{collab.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{collab.email}</p>
                        </div>
                        <Select
                          value={collab.role}
                          onValueChange={(value) => updateCollaboratorRole(collab.id, value as Collaborator["role"])}
                        >
                          <SelectTrigger className="w-24 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeCollaborator(collab.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {collaborators.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No collaborators added yet</p>
                  <p className="text-xs">Search for peers or invite by email</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-accent/50 border">
                <h4 className="font-medium text-foreground mb-2">Project Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge>{projectType}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Collaborators:</span>
                    <span className="font-medium">{collaborators.length} people</span>
                  </div>
                </div>
              </div>

              {collaborators.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="gap-1">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      You (Owner)
                    </Badge>
                    {collaborators.map((collab) => (
                      <Badge key={collab.id} variant="secondary" className="gap-1">
                        {collab.name} ({collab.role})
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                By creating this project, collaborators will receive an email invitation
                and can start contributing once they accept.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => (step > 1 ? setStep(step - 1) : onOpenChange(false))}
          >
            {step > 1 ? "Back" : "Cancel"}
          </Button>
          <Button
            onClick={() => (step < 3 ? setStep(step + 1) : onOpenChange(false))}
            className="gap-2"
          >
            {step < 3 ? "Next" : "Create Project"}
            {step === 3 && <Plus className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}