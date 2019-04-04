import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { Position } from './../../../../../core/models/assortment/position.model';
import { PositionService } from './../../../../../core/services/assortment/position.service';
import {
  MaterialService,
  MaterialInstance,
} from '../../../../../core/services/material-utils/material.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss'],
})
export class PositionFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryId: string;
  @ViewChild('modal') modalRef: ElementRef;

  private positionId: string;
  private modal: MaterialInstance;
  public positions: Position[] = [];
  public loading: boolean = false;
  public form: FormGroup;

  constructor(private posService: PositionService) {}

  ngOnInit() {
    this.loadPositions();
    this.initForm();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public get cost(): AbstractControl {
    return this.form.get('cost');
  }

  private loadPositions() {
    this.loading = true;
    this.posService
      .getPositions(this.categoryId)
      .subscribe((positions: Position[]) => {
        this.positions = positions;
        this.loading = false;
      });
  }

  public onAddPosition() {
    this.positionId = null;
    this.form.reset();
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  public onCancel() {
    this.modal.close();
  }

  public onSelectPosition({ name, cost, _id }: Position) {
    this.positionId = _id;
    this.modal.open();
    this.form.patchValue({ name, cost });
    MaterialService.updateTextInputs();
  }

  public onDeletePosition(event: Event, { name, _id }: Position) {
    event.stopPropagation();
    const decision = window.confirm(`Do you want to remove position ${name}`);
    if (decision) {
      this.posService
        .removePosition(_id)
        .subscribe(
          () => (this.positions = this.positions.filter(p => p._id !== _id)),
        );
    }
  }

  public onSubmit({ name, cost }) {
    this.form.disable();
    const newPosition = new Position({
      name,
      cost,
      category: this.categoryId,
      _id: this.positionId,
    });

    if (this.positionId) {
      this.posService.updatePosition(newPosition).subscribe(
        (position: Position) => {
          const index = this.positions.findIndex(p => p._id === position._id);
          this.positions.splice(index, 1, position);
        },
        null,
        () => this.completed(),
      );
    } else {
      this.posService.createPosition(newPosition).subscribe(
        (position: Position) => {
          this.positions.push(position);
        },
        null,
        () => this.completed(),
      );
    }
  }

  private completed() {
    this.form.enable();
    this.form.reset();
    this.modal.close();
  }
}
