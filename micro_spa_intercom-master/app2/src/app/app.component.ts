import { Component,OnInit,ChangeDetectorRef, NgZone } from '@angular/core';

import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app2';
  msgFromMicro="";
  titleToPass="";
  singleSpaProps: SingleSpaProps;
  subscription: Subscription;
  constructor(private ChangeDetectorRef:ChangeDetectorRef, private zone:NgZone){
  }
  ngOnInit(): void {
    //console.log("calling ngOnInit on app2");
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props;
        console.log(props);
        console.log("this.singleSpaProps on app2-->"+this.singleSpaProps);
        this.lookForEvents();
      }
    );
  }


  lookForEvents(){
    console.log("lookForEvents on app2");
    this.singleSpaProps['EventBus'].on('msgFrmMicro1',(data)=>{
      this.msgFromMicro=data;
      console.log("this.msgFromMicro on app2-->"+this.msgFromMicro);
      this.ChangeDetectorRef.detectChanges();
    });
  }
  sendMsg(){
    console.log("inside sendmsg on app2")
   alert(this.titleToPass);
   //debugger;
   this.singleSpaProps['EventBus'].emit({name:'msgFrmMicro2', data:this.titleToPass});
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
