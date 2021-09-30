import { User } from './user';

export interface DocumentRegistration {
  _id: string;
  version: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface DocumentVersion {
  _id: string;
  majorVersion: number;
  minorVersion: number;
  originalName: string;
  serverName: string;
  tags: string[];
  fields: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  _id: string;
  author: User;
  name: string;
  versions: DocumentVersion[];
  registrations: DocumentRegistration[];
  createdAt: Date;
  updatedAt: Date;
}
