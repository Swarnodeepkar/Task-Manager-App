export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type TaskStatus = 'pending' | 'completed';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskPayload {
  title: string;
  description?: string;
  status?: TaskStatus;
}
