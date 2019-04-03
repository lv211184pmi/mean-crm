import { Component, OnInit, Input } from '@angular/core';
import { PositionService } from 'src/app/core/services/assortment/position.service';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss'],
})
export class PositionFormComponent implements OnInit {
  @Input() categoryId: string;
  constructor(private posService: PositionService) {}

  ngOnInit() {
    this.posService
      .getPositions(this.categoryId)
      .subscribe(data => console.log(data));
  }
}
