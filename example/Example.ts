import Validator, { Min, Max, Required, Numeric, Email, RequiredIf, RequiredWith, Pattern } from '../src/FormValidator';

let form: HTMLFormElement = document.querySelector('#form-test') as HTMLFormElement;

Validator.use([Required, RequiredIf, RequiredWith, Min, Max, Numeric, Email, Pattern])

let validator = new Validator(form);

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let results = validator.validate({
        'name': 'required',
        'age': 'required|numeric|min:12',
        'power': 'min:100'
    });

    console.log(results)
})


