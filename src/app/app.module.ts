import { FormsModule } from '@angular/forms';
import { CurrencyconverterComponent } from './currencyconverter/currencyconverter.component';
import { ExpensedataService } from './services/expensedata.service';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as Hammer from 'hammerjs';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


export class CustomHammerConfig extends HammerGestureConfig{
 overrides = {
   'press': {
     time : 800,
     threshold:1
   }
  }

}

@NgModule({
  declarations: [AppComponent,CurrencyconverterComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule, IonicModule.forRoot(), AppRoutingModule,FormsModule],
  
  providers: [
    HammerGestureConfig,
    ExpensedataService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy,
    
    },
    { provide:HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig,
    
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
