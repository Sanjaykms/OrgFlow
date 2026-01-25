import {
  Wrench,
  Megaphone,
  Users,
  HelpCircle,
  Folder,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "./ui/accordion";
import ForumIcon from "@mui/icons-material/Forum";

interface SidebarProps {
  onDepartmentChange: (department: string) => void;
}

export const Sidebar = ({ onDepartmentChange }: SidebarProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState("My Questions");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const departments = [
    { name: "Engineering", icon: Wrench, value: "Engineering" },
    { name: "Marketing", icon: Megaphone, value: "Marketing" },
    { name: "Initiative Y", icon: Users, value: "Initiative Y" },
    { name: "My Questions", icon: HelpCircle, value: "My Questions" },
    { name: "Project", icon: Folder, value: "Project" },
    { name: "Unanswered", icon: MessageSquare, value: "Unanswered" },
  ];

  const handleDepartmentClick = (dept: string) => {
    setSelectedDepartment(dept);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("dept", dept);
    setSearchParams(newParams);
    onDepartmentChange(dept);
  };
  localStorage.setItem("gemini_prompt", "");
  useEffect(() => {
    const dept = searchParams.get("dept") ?? "My Questions";
    const newParams = new URLSearchParams(searchParams);
    newParams.set("dept", dept);
    setSearchParams(newParams);
  }, [searchParams]);

  return (
    <aside className="w-64 bg-card border-r border-border p-4">
      <div className="mb-6">
        <Accordion
          className="AccordionRoot"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          <AccordionItem className="AccordionItem" value="item-1">
            <AccordionTrigger>Department</AccordionTrigger>
            <AccordionContent>
              {departments.map((dept) => (
                <div
                  key={dept.value}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    selectedDepartment === dept.value
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  )}
                  onClick={() => handleDepartmentClick(dept.value)}
                >
                  <dept.icon className="h-4 w-4" />
                  <span>{dept.name}</span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="space-y-1 mt-4">
          <button
            onClick={() => {
              localStorage.setItem("gemini_prompt", "");
              navigate("/ai-chat");
            }}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors"
            )}
          >
            <ForumIcon
              style={{
                fontSize: "20px",
                cursor: "pointer",
              }}
            />{" "}
            AI Chat
          </button>
        </div>
      </div>
    </aside>
  );
};
 