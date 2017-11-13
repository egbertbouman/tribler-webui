import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FileSizePipe } from './file-size.pipe';
import { AbbreviatePipe } from './abbreviate.pipe';
import { AppComponent } from './app.component';
import { ChannelComponent } from './channel/channel.component';
import { AllChannelComponent } from './allchannel/allchannel.component';
import { HomeComponent } from './home/home.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { DownloadDetailsComponent } from './details/download-details.component';
import { MyChannelComponent } from './mychannel/mychannel.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { VideoplayerComponent } from './videoplayer/videoplayer.component';
import { TorrentListItemComponent } from './list/torrent-list-item.component';
import { ChannelListItemComponent } from './list/channel-list-item.component';
import { ListComponent } from './list/list.component';
import { RandomBackgroundColorDirective } from './random-background-color.directive';
import { SearchbarComponent } from './search/searchbar.component';
import { SearchresultsComponent } from './search/searchresults.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchresultsComponent },
    { path: 'channels', component: AllChannelComponent },
    { path: 'channels/:id', component: ChannelComponent },
    { path: 'mychannel', component: MyChannelComponent },
    { path: 'subscriptions', component: SubscriptionsComponent },
    { path: 'downloads', component: DownloadsComponent },
    { path: 'videoplayer', component: VideoplayerComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        ChannelComponent,
        AllChannelComponent,
        HomeComponent,
        DownloadsComponent,
        DownloadDetailsComponent,
        MyChannelComponent,
        SubscriptionsComponent,
        VideoplayerComponent,
        TorrentListItemComponent,
        ChannelListItemComponent,
        FileSizePipe,
        AbbreviatePipe,
        ListComponent,
        RandomBackgroundColorDirective,
        SearchbarComponent,
        SearchresultsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        InfiniteScrollModule,
        NgxDatatableModule,
        NgbModule.forRoot()
    ],
    providers: [Location,
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
