import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SchoolClassComponent } from './school-class/school-class.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, HomeRoutingModule, ReactiveFormsModule],
  declarations: [HomeComponent, SchoolClassComponent],
})
export class HomeModule {}
