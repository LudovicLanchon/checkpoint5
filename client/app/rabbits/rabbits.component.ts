import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { RabbitService } from '../services/rabbit.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Rabbit } from '../shared/models/rabbit.model';

@Component({
  selector: 'app-rabbits',
  templateUrl: './rabbits.component.html',
  styleUrls: ['./rabbits.component.css'],
})
export class RabbitsComponent implements OnInit {

  rabbit = new Rabbit();
  rabbits: Rabbit[] = [];
  isLoading = true;
  isEditing = false;

  addRabbitForm: FormGroup;
  name = new FormControl('', Validators.required);
  age = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);
  color = new FormControl('', Validators.required);

  constructor(private rabbitService: RabbitService,
    private formBuilder: FormBuilder,
    public toast: ToastComponent) { }

  ngOnInit() {
    this.getRabbits();
    this.addRabbitForm = this.formBuilder.group({
      name: this.name,
      age: this.age,
      weight: this.weight,
      color: this.color,
    });
  }

  getRabbits() {
    this.rabbitService.getRabbits().subscribe(
      data => this.rabbits = data,
      error => console.log(error),
      () => this.isLoading = false,
    );
  }

  addRabbit() {
    this.rabbitService.addRabbit(this.addRabbitForm.value).subscribe(
      (res) => {
        this.rabbits.push(res);
        this.addRabbitForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  enableEditing(rabbit: Rabbit) {
    this.isEditing = true;
    this.rabbit = rabbit;
  }

  cancelEditing() {
    this.isEditing = false;
    this.rabbit = new Rabbit();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the rabbits to reset the editing
    this.getRabbits();
  }

  editRabbit(rabbit: Rabbit) {
    this.rabbitService.editRabbit(rabbit).subscribe(
      () => {
        this.isEditing = false;
        this.rabbit = rabbit;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error),
    );
  }

  deleteRabbit(rabbit: Rabbit) {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.rabbitService.deleteRabbit(rabbit).subscribe(
        () => {
          const pos = this.rabbits.map(elem => elem._id).indexOf(rabbit._id);
          this.rabbits.splice(pos, 1);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error),
      );
    }
  }

}
