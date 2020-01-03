import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    Giapha
} from './giapha';
import {
    GiaphaRoutingModule
} from './giapha-routing.module';
import {
    OrganizationChartModule
} from 'primeng/organizationchart';
import {
    ToastModule
} from 'primeng/toast';
import {
    PanelModule
} from 'primeng/panel';
import {
    TabViewModule
} from 'primeng/tabview';
import {
    CodeHighlighterModule
} from 'primeng/codehighlighter';
import { Ng2PanZoomModule } from 'ng2-panzoom';

@NgModule({
    imports: [
        CommonModule,
        GiaphaRoutingModule,
        OrganizationChartModule,
        ToastModule,
        PanelModule,
        TabViewModule,
		CodeHighlighterModule,
		Ng2PanZoomModule
    ],
    declarations: [
        Giapha
    ]
})
export class GiaphaModule {}
