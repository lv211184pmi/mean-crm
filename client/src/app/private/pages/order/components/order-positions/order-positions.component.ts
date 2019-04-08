import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PositionService } from './../../../../../core/services/assortment/position.service';
import { Position } from './../../../../../core/models/assortment/position.model';
import { OrderHelperService } from 'src/app/core/services/order/order-helper.service';
import { MaterialService } from 'src/app/core/services/material-utils/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss'],
})
export class OrderPositionsComponent implements OnInit {
  public positions$: Observable<Position[]>;

  constructor(
    private route: ActivatedRoute,
    private positionService: PositionService,
    private orderService: OrderHelperService,
  ) {}

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionService.getPositions(params['id']);
      }),
      map((positions: Position[]) => {
        return positions.map(pos => {
          pos.quantity = 1;
          return pos;
        });
      }),
    );
  }

  public addToOrder(position: Position) {
    this.orderService.add(position);
    MaterialService.alert(
      `Added ${position.quantity} item${position.quantity > 1 ? 's' : ''}`,
    );
  }
}
