import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatExpansionModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [HeaderComponent]
})
export class CustomCommonModule { }
