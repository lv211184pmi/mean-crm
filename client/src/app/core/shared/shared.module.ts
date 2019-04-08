import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/private/components/loader/loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [LoaderComponent],
  exports: [LoaderComponent, FormsModule],
})
export class SharedModule {}
