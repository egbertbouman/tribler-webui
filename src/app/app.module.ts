import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { OrderModule } from 'ngx-order-pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { FileSizePipe } from './shared/file-size.pipe';
import { AbbreviatePipe } from './shared/abbreviate.pipe';
import { VideofilePipe } from './shared/videofile.pipe';
import { DownloadStatusPipe } from './shared/download-status.pipe';
import { AppComponent } from './app.component';
import { ChannelComponent } from './channel/channel.component';
import { AllChannelComponent } from './allchannel/allchannel.component';
import { HomeComponent } from './home/home.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { DownloadDetailsComponent } from './downloads/download-details.component';
import { PiecesComponent } from './shared/pieces.component';
import { MyChannelComponent } from './mychannel/mychannel.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { VideomenuComponent } from './videoplayer/videomenu.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { TorrentListItemComponent } from './list/torrent-list-item.component';
import { HealthComponent } from './shared/health.component';
import { ChannelListItemComponent } from './list/channel-list-item.component';
import { ListComponent } from './list/list.component';
import { RandomBackgroundColorDirective } from './shared/random-background-color.directive';
import { SearchbarComponent } from './search/searchbar.component';
import { SearchresultsComponent } from './search/searchresults.component';
import { TorrentDownloadComponent } from './list/torrent-download.component';
import { TrustchainComponent } from './trustchain/trustchain.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchresultsComponent },
    { path: 'channels', component: AllChannelComponent },
    { path: 'channels/:id', component: ChannelComponent },
    { path: 'mychannel', component: MyChannelComponent },
    { path: 'subscriptions', component: SubscriptionsComponent },
    { path: 'downloads', component: DownloadsComponent },
    { path: 'videoplayer', component: VideoplayerComponent},
    { path: 'videoplayer/:id1/:id2', component: VideoplayerComponent},
    { path: 'trustchain', component: TrustchainComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        ChannelComponent,
        AllChannelComponent,
        HomeComponent,
        DownloadsComponent,
        DownloadDetailsComponent,
        PiecesComponent,
        MyChannelComponent,
        SubscriptionsComponent,
        VideomenuComponent,
        VideoplayerComponent,
        TorrentListItemComponent,
        HealthComponent,
        ChannelListItemComponent,
        FileSizePipe,
        AbbreviatePipe,
        VideofilePipe,
        DownloadStatusPipe,
        ListComponent,
        RandomBackgroundColorDirective,
        SearchbarComponent,
        SearchresultsComponent,
        TorrentDownloadComponent,
        TrustchainComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        InfiniteScrollModule,
        NgxDatatableModule,
        NgbModule.forRoot(),
        ChartsModule,
        OrderModule
    ],
    providers: [
        Location,
        VideofilePipe,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    entryComponents: [
        TorrentDownloadComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
