import { NgModule } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { MailsModule } from './mails/mails.module';
import { NewMailModule } from './new-mail/new-mail.module';

import { routing } from './app.routes';
import { AppService } from './app.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        // NgbModule.forRoot(),
        CoreModule.forRoot(),
        SharedModule.forRoot(),
        HomeModule,
        MailsModule,
        NewMailModule,
        NgbModule.forRoot()
    ],
    providers: [
        AppService
    ],
    exports: [
        SharedModule,
        // NgbModule
    ]
})
export class AppModuleShared { }
