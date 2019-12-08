import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  url = " http://localhost:5000/tasks" ; 

  constructor(private http:HttpClient) { }

  findAll()
  {
    return this.http.get<Task[]>(this.url);
  }

  delete(id)
  {
    return this.http.delete(this.url+"/"+id);
  }

  persist(task)
  {
    return this.http.post<Task>(this.url,task);
  }

  Updatecompleted(id,cmplted)
  {
      return this.http.patch(this.url+"/"+id , {completed : !cmplted })
  }

  editTask(task)
  {
    return this.http.put(this.url+"/"+task.id ,task);
  }

}
