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
    this.tempoSelecionado = (this.tempo as any)[this.botaoSelecionado]['minutos'];
    const minutos = this.tempoSelecionado
    this.tempoSelecionado = this.tempoSelecionado*60*1000
    console.log(this.tempoSelecionado)
    while (this.tempoSelecionado > 0 ) {
      console.log(this.tempoSelecionado)
      await this.delay(1000, this.tempoSelecionado); // Aguarda 1 segundo

      console.log((this.tempo as any)[this.botaoSelecionado]);
      this.tempoSelecionado = this.tempoSelecionado - 1000;
    }
    (this.tempo as any)[this.botaoSelecionado]['segundosRestantes'] = '00';
    (this.tempo as any)[this.botaoSelecionado]['minutos'] = minutos;
  }

  delay(ms: number, tempo:number) {
    (this.tempo as any)[this.botaoSelecionado] = this.converterSegundosParaMinutosESegundos(tempo/1000)
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  tempo:any ={
    "longBreak" : {"minutos" :3, "segundosRestantes": "00"},
    "shortBreak": {"minutos" :2, "segundosRestantes": "00"},
    "pomodoro": {"minutos" :1, "segundosRestantes": "00"}
  }
  eventoSelecionado(eventSelecionado:string){
    this.botaoSelecionado = eventSelecionado
    console.log(this.botaoSelecionado)
  }



  converterSegundosParaMinutosESegundos(segundos:number) {
    const minutos = Math.floor(segundos / 60);
    let segundosRestantes = (segundos % 60).toString().padStart(2, '0');
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
