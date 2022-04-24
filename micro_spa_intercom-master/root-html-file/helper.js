
import { ReplaySubject, Subscription } from 'https://dev.jspm.io/rxjs@6/_esm2015';
import { filter, map } from 'https://dev.jspm.io/rxjs@6/_esm2015/operators';

export class EventBusService {
   

  constructor() {this.subject$ = new ReplaySubject(); }

  emit(event) {
    console.log("inside emit function-->"+event.data.name);
    this.subject$.next(event);
  }

  on(eventName, action) {
    console.log("eventname and action-->"+eventName, +action);
    return this.subject$.pipe(
      filter( (e) => e.name === eventName),
      map( (e) => e["data"])).subscribe(action);
  }
}

var EventBus= new EventBusService;



System.import('single-spa').then(function (singleSpa) {

    singleSpa.registerApplication(
      'app1',
      function () {
        return System.import('app1');
      },
      function (location) {
        //return true;
        return location.pathname.startsWith('/app1');
      },
      
      { EventBus: EventBus }
    );

    singleSpa.registerApplication(
      'app2',
      function () {
        return System.import('app2');
      },
      function (location) {
      // return true
         return location.pathname.startsWith('/app2');
      },
      { EventBus: EventBus }
    )

    singleSpa.start();
  })