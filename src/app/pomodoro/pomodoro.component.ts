import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pomodoro',
  templateUrl: './pomodoro.component.html',
  styleUrls: ['./pomodoro.component.css']
})
export class PomodoroComponent implements OnInit {

  botaoSelecionado:string = "pomodoro";
  tempoSelecionado:number = 0;
  async executarCronometro(){
    this.tempoSelecionado = (this.tempo as any)[this.botaoSelecionado];
    console.log(this.tempoSelecionado)

    while (this.tempoSelecionado > 0) {
      await this.delay(1000, this.tempoSelecionado); // Aguarda 1 segundo

      console.log(this.tempoSelecionado);
      this.tempoSelecionado = this.tempoSelecionado - 1000;
    }
  }

  delay(ms: number, tempo:number) {
    (this.tempo as any)[this.botaoSelecionado] = this.converterSegundosParaMinutosESegundos(tempo/1000)
    console.log((this.tempo as any)[this.botaoSelecionado])
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  tempo:any ={
    "longBreak" : 10*60*1000,
    "shortBreak": 5*60*1000,
    "pomodoro": 1*60*1000
  }
  eventoSelecionado(eventSelecionado:string){
    this.botaoSelecionado = eventSelecionado
  }

  converterSegundosParaMinutosESegundos(segundos:number) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    return { minutos, segundosRestantes };
  }

  aplicaConfiguracoes(){
    const modal:any = document.querySelector("dialog")
    modal.close()
  }

  configuracoes(){
    const modal:any = document.querySelector("dialog")
    modal.showModal()
  }
  constructor() { }

  ngOnInit(): void {
  }

}
