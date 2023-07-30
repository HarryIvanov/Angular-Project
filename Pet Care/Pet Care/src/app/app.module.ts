import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CardModule } from './card/card.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appInterceptProvider } from './app.interceptor';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { UserModule } from './user/user.module';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    HomeComponent,
    WelcomeComponent,
    AuthenticateComponent
  ],
  imports: [BrowserModule, AppRoutingModule, CoreModule, HttpClientModule, SharedModule, CardModule, UserModule],
  providers: [appInterceptProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
