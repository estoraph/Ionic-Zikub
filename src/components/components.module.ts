import { NgModule } from '@angular/core';
import { IonicModule} from "ionic-angular";
import { MyMenuComponent } from './my-menu/my-menu';

@NgModule({
	declarations: [MyMenuComponent],
	imports: [IonicModule],
	exports: [MyMenuComponent]
})
export class ComponentsModule {}
