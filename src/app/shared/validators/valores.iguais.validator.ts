import { AbstractControl, ValidationErrors } from "@angular/forms";

export function ValoresIguaisValidator(
  controle_1: string,
  controle_2: string
) {
  return (group: AbstractControl): ValidationErrors | null => {
    let controleValor1: string = group.get(controle_1)?.value.toString();
    let controleValor2: string = group.get(controle_2)?.value.toString();

    if (controleValor1 != null && controleValor1 != "" && controleValor2 != null && controleValor2 != "") {
      if (controleValor1 != controleValor2) {
        group.get(controle_2)?.setErrors({ diferentes: true});

        return { diferentes: true };
      } else {
        group.get(controle_2)?.setErrors(null);
      }
    }

    return null;
  }
};