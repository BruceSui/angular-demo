import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss']
})
export class FormDemoComponent implements OnInit {

  name: string;

  constructor() { }

  ngOnInit() {
  }

  nameBlur(param) {
    console.log(param);
  }
  nameinput(target: any) {
    // this.name = target.value.replace(/[^0-9-]+/, '');
    const input = <HTMLInputElement>document.querySelector('.name');
    input.value = input.value.replace(/[^0-9-]+/, '');
    console.log(input);
  }
  file() {
  }
}
