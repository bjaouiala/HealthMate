import {AbstractControl} from "@angular/forms";

export function passwordValidator(controller:AbstractControl){
  const password = controller.value
  if (password && (password.length < 8) || !/\d/.test(password) || !/[A-Z]/.test(password) ){
    return {passwordStrength: 'Password must be at least 8 characters long, contain at least one number, and one uppercase letter.'}
  }
  return null
}
