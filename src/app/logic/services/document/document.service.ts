import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Document } from '../../models/document';


@Injectable()
export class DocumentService {

  constructor(private http: HttpClient) { }

  public postNewDocument(file: File, name: string, tags: string[], fields: string[]): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('tags', JSON.stringify(tags));
    formData.append('fields', JSON.stringify(fields));
    formData.append('name', name);
    return this.http.post<Document>('/documents', formData);
  }

  public postDocumentVersion(documentId: string, file: File, tags: string[], fields: string[]): Observable<Document> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('tags', JSON.stringify(tags));
    formData.append('fields', JSON.stringify(fields));
    return this.http.post<Document>(`/documents/${documentId}/versions`, formData);
  }

  public getDocuments(): Observable<Document[]> {
    return this.http.get<Document[]>('/documents');
  }

  public postDocumentRegistration(documentId: string, versionId: string, data: {}): Observable<Document> {
    const body = {
      versionId: versionId,
      data: data
    };
    return this.http.post<Document>(`/documents/${documentId}/registrations`, body);
  }

  public deleteDocument(documentId: string): Observable<Document> {
    return this.http.delete<Document>(`/documents/${documentId}`);
  }

  public deleteDocumentVersion(documentId: string, versionId: string): Observable<Document> {
    return this.http.delete<Document>(`/documents/${documentId}/versions/${versionId}`);
  }

  // TODO delete from here
  public downloadDoc(fileName: string): Observable<Blob> {
    const options = {
      observe: 'body' as 'body',
      responseType: 'blob' as 'blob',
    };
    return this.http.get(`/files/${fileName}`, options);
  }

}
