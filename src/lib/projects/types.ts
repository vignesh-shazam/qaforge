export type ProjectStatus = "Active" | "Draft" | "Archived" | "Testing" | "Planned";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  targetUrl: string | null;
  status: ProjectStatus;
  thumbnail: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStats {
  testCases: number;
  bugs: number;
  automationRuns: number;
  testDataSets: number;
}