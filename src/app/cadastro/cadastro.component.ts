import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ConsultaCepService } from "../service/consulta-cep.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(
    private router: Router,
    private consultaCepService: ConsultaCepService
  ) {}

  ngOnInit(): void {}

  consultaCEP(ev: any, f: NgForm, cepIsValid: boolean) {
    const cep = ev.target.value;

    if (cep !== "" && cepIsValid) {
      return this.consultaCepService
        .getConsultaCep(cep)
        .subscribe((resultado) => {
          this.populandoEndereco(resultado, f);
        });
    }

    return;
  }

  populandoEndereco(dados: any, f: NgForm) {
    f.form.patchValue({
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf,
    });
  }

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["/sucesso"]);
    } else {
      alert("formulario invalido");
    }
    console.log(form.controls);
  }
}
