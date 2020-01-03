import {
    NgModule
} from '@angular/core';
import {
    RouterModule
} from '@angular/router';
import {
    Giapha
} from './giapha';

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: '',
            component: Giapha
        }])
    ],
    exports: [
        RouterModule
    ]
})
export class GiaphaRoutingModule {}
