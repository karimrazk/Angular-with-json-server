import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  searchText ='';
buttonEdit = false;
ShowForm = false;
mynewTask : Task =
{
  label : '',
  completed : false
}
tasks :Task[] = []; 
resultTasks :Task[] = []; 

  constructor(private taskService:TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks()
  {
    this.taskService.findAll().subscribe(tasks=>this.resultTasks=this.tasks=tasks)
  }
  ondeletetask(id)
  {
    this.taskService.delete(id).subscribe(()=> { this.tasks = this.tasks.filter(task => task.id !=id) })
  }
  persistTask()
  {
    this.taskService.persist(this.mynewTask)
    .subscribe((task) =>
    {
      this.tasks = [task,...this.tasks];
      this.ViderTask();
      this.ShowForm = false;
    })

  }

  ViderTask()
  {
    this.mynewTask =
    {
      label : '',
      completed : false      
    }
  }
  completedUpdate(task)
  {
    this.taskService.Updatecompleted(task.id,task.completed)
    .subscribe(()=> 
    task.completed = !task.completed
    )
  }
  editTask(task)
  {
    this.mynewTask= task;
    this.buttonEdit = true;
    this.ShowFormTask();
  }
  updatetask()
  {
    this.taskService.editTask(this.mynewTask)
    .subscribe(()=>
    {
      this.ViderTask();
      this.buttonEdit=false;
      this.ShowForm = false;
    })
  }
  ShowFormTask()
  {
    this.ShowForm = true;
  }
  searchTasks()
  {
    this.resultTasks = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()) )
  }
}
