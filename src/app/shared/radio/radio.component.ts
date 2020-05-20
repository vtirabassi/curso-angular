import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from './rodio-option-model';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]

  value: any
  onChange: any;

  constructor() { }

  //funcao para passar um valor para componente atraves das diretivas
  writeValue(obj: any): void {
    this.value = obj
  }

  //passam a funcao que temos que chamar sempre quando o valor interno do componente mudar
  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  //se voce quiser registrar quando o usuario entrou no componente
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  ngOnInit() {
  }

  setValue(value: any){
    this.value = value
    this.onChange(this.value)
  }
}
