import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { AddBtnComponent } from './add-btn/add-btn.component';

@NgModule({
  imports: [CommonModule, NgbModule, AuthModule, RouterModule],
  declarations: [HeaderComponent, ShellComponent, AddBtnComponent],
})
export class ShellModule {}
