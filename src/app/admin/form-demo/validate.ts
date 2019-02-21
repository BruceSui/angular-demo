import { ValidatorFn, AbstractControl } from "@angular/forms";

export function phoneNumberBlur(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        const forbidden = !/^1[3456789]\d{9}$/.test(control.value);
        return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
}