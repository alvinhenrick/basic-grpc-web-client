import {Component} from '@angular/core';
import * as grpcWeb from 'grpc-web';
import {NumberRequest, NumberResponse} from './calculator_pb';
import {CalculatorClient} from './CalculatorServiceClientPb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'basic-grpc-web-client';
  calculatedValue = 0 ;

  squareRoot(value) {
    console.log(value);
    const calculatorClient = new CalculatorClient('http://localhost:8080', null, null);

    const request = new NumberRequest();
    request.setValue(value);

    const call = calculatorClient.squareRoot(request, {'custom-header-1': 'value1'},
      (err: grpcWeb.Error, response: NumberResponse) => {
        this.calculatedValue = response.getValue()
        console.log(response.getValue());
      });
    call.on('status', (status: grpcWeb.Status) => {
      // ...
    });

  }
}
