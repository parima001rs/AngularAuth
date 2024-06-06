import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validator function to check if the value is a valid GUID
export function guidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const isValidGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
    return isValidGuid ? null : { invalidGuid: { value: value } };
  };
}
