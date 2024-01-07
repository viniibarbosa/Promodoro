import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {

  abaSelecionada:string = "pomodoro";
  Milisegundos:number = 0;
  iniciar:boolean = true;

  cronometro:any ={
    "longBreak" : {"minutos" :3, "segundosRestantes": "00"},
    "shortBreak": {"minutos" :2, "segundosRestantes": "00"},
    "pomodoro": {"minutos" :1, "segundosRestantes": "00"}
  }
  tempoConfigurar:any ={
    "longBreak" :3,
    "shortBreak":2,
    "pomodoro":1
  }


  async executarCronometro(){
    this.Milisegundos = this.converterMinutosESegundosparaMili((this.cronometro as any)[this.abaSelecionada]['minutos'], Number((this.cronometro as any)[this.abaSelecionada]['segundosRestantes']))
    this.alterarPlay()
    while (this.Milisegundos > 0 && this.iniciar == false) {
      await this.delay(1000, this.Milisegundos); // Aguarda 1 segundo
      this.Milisegundos -= 1000;
    }
    if(!this.iniciar){
      (this.cronometro as any)[this.abaSelecionada]['segundosRestantes'] = '00';
      (this.cronometro as any)[this.abaSelecionada]['minutos'] = (this.tempoConfigurar as any)[this.abaSelecionada];
    }
    this.alterarPlay()
  }

  delay(ms: number, Milisegundos:number) {
    (this.cronometro as any)[this.abaSelecionada] = this.converterSegundosParaMinutosESegundos(Milisegundos/1000)
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  converterMinutosESegundosparaMili(minutos:number, segundos:number){
    return (minutos*60*1000)+(segundos*1000)
  }

  converterSegundosParaMinutosESegundos(segundos:number) {
    const minutos = Math.floor(segundos / 60);
    let segundosRestantes = (segundos % 60).toString().padStart(2, '0');
    return { minutos, segundosRestantes };
  }

  eventoSelecionado(eventSelecionado:string){
    this.abaSelecionada = eventSelecionado
    console.log(this.abaSelecionada)
  }



  aplicaConfiguracoes(){
    (this.cronometro as any)['pomodoro']['minutos'] = (this.tempoConfigurar as any)['pomodoro'];
    (this.cronometro as any)['pomodoro']['segundosRestantes'] = "00";

    (this.cronometro as any)['shortBreak']['minutos'] = (this.tempoConfigurar as any)['shortBreak'];
    (this.cronometro as any)['shortBreak']['segundosRestantes'] = "00";

    (this.cronometro as any)['longBreak']['minutos'] = (this.tempoConfigurar as any)['longBreak'];
    (this.cronometro as any)['longBreak']['segundosRestantes'] = "00";


    const modal:any = document.querySelector("dialog")
    modal.close()

  }
  alterarPlay(){
    this.iniciar = !this.iniciar
  }


  configuracoes(){
    const modal:any = document.querySelector("dialog")
    modal.showModal()
  }
  constructor() { }

  ngOnInit(): void {
  }

}
