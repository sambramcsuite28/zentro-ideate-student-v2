import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Send, MessageSquare, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CollaborationRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: string;
    title: string;
    author: string;
    tags: string[];
  } | null;
}

export function CollaborationRequestModal({
  open,
  onOpenChange,
  project,
}: CollaborationRequestModalProps) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onOpenChange(false);
      setSubmitted(false);
      setMessage("");
    }, 2000);
  };

  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Request to Collaborate
              </DialogTitle>
              <DialogDescription>
                Send a collaboration request to the project owner
              </DialogDescription>
            </DialogHeader>

            {/* Project Info */}
            <div className="p-4 rounded-lg bg-accent/50 border">
              <h4 className="font-medium text-foreground text-sm mb-1">
                {project.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                    {project.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>by {project.author}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Your Message
              </Label>
              <Textarea
                id="message"
                placeholder="Explain why you'd like to collaborate on this project..."
                className="mt-2 min-h-[120px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                A thoughtful message increases your chances of being accepted
              </p>
            </div>

            {/* Skills you bring */}
            <div>
              <Label className="text-sm">Skills you can contribute</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Python", "React", "ML", "Data Analysis", "UI/UX"].map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Click to add your relevant skills
              </p>
            </div>

            {/* Submit */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="gap-2"
              >
                <Send className="h-4 w-4" />
                Send Request
              </Button>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="h-8 w-8 text-success" />
            </motion.div>
            <h3 className="font-semibold text-foreground mb-2">
              Request Sent!
            </h3>
            <p className="text-sm text-muted-foreground">
              {project.author} will receive your collaboration request.
              You'll be notified when they respond.
            </p>
            <div className="flex items-center justify-center gap-1 mt-4 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Usually responds within 24-48 hours</span>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}