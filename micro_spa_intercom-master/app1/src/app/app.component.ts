import { Component, OnInit ,ChangeDetectorRef, NgZone} from '@angular/core';
import { assetUrl } from 'src/single-spa/asset-url';
import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app1-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  singleSpaProps: SingleSpaProps;
  subscription: Subscription;
  title = 'app1';
  yoshiUrl = assetUrl("yoshi.png");
  msgFromMicro="";
  titleToPass="";
  constructor(private ChangeDetectorRef:ChangeDetectorRef, private zone:NgZone){
  }
  ngOnInit(): void {
    console.log("inside ngOnInit call");
    this.subscription = singleSpaPropsSubject.subscribe(
      props => {
        this.singleSpaProps = props;
        console.log(props);
        console.log("singleSpaProps-->"+this.singleSpaProps);
        this.lookForEvents();
      }
    );
  }
  
  lookForEvents(){
    console.log("lookForEvents function call");
    this.singleSpaProps['EventBus'].on('msgFrmMicro2',(data)=>{
      this.msgFromMicro=data;
      console.log("this.msgFromMicro--->"+this.msgFromMicro);
      this.ChangeDetectorRef.detectChanges();
      
    });
  }
  sendMsg(){
    console.log("sendMsg function call");
   alert(this.titleToPass);
   //debugger;
   this.singleSpaProps['EventBus'].emit({name:'msgFrmMicro1',data:this.titleToPass});

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
