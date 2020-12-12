# Form Validator powered by NekoDev

Validator is an extensible class for form validation.

## Getting Start

```javascript

import Validator, { Required, Numeric, Min } from 'FormValidator';

Validator.use([Required, Numeric, Min])

let form = document.getElementById('form-test');
let validator = new Validator(form);

form.addEventListener('submit', function (e) {
    e.preventDefault()
    let results = validator.validate({
        'name': 'required',
        'age': 'required|numeric|min:18',
    });

    console.log(results)
})

```

You can chain rules with a pipe like this :

`'age': 'required|numeric|min:18'`  

----

## Using a validation rule

For using a validation rule, you need import it :

```javascript
import Validator, { Required, Max, Min } from 'FormValidator'

Validator.use(Required)
Validator.use(Max)
Validator.use(Min)
```

You can inline the `user` method like this :

```javascript
Validator.user([ Required, Min, Max ])
```

For debugging, you can console.log the Rule description :

```javascript
console.log(Required.Description)
```

You can customize the Rule error message :

```javascript
Required.ErrorMessage = "My custom message"
```

----
## Create a custom validation rule

```javascript

import { Rule } from "FormValidator";

export default class CustomRule extends Rule {

    static Description = `La valeur du champs doit être "TEST".` // Developper Help Message
    static ErrorMessage = `La valeur du champs est incorrect !` // Error Message

    constructor() {
        super('customRule') // Rule name
    }

    applyRule() {
        this.setErrorMessage(CustomRule.ErrorMessage)
        if (this.input != "TEST") return this.error()
    }

}

```

A validation rule must extends of `Rule` class.   
In the constructor, your must call `super` method ans pass the custom rule name.  
It's recommanded to set startics `Description` and `ErrorMessage`.  
The `applyRule` method contains the logic of your validation rule. In the applyRule method, call the `error` method when the rule fail.

----
## Create custom validation with paramters

```javascript

import { Rule } from "FormValidator";

export default class CustomRule extends Rule {

    static Description = `La valeur du champs doit être égale à la valeur passé en paramètre.` // Developper Help Message
    static ErrorMessage = `La valeur du champs est incorrect !` // Error Message

    constructor() {
        super('customRule') // Rule name
    }

    applyRule(params) {
        this.setErrorMessage(CustomRule.ErrorMessage)
        if (this.input != params) return this.error()
    }

}

```

On the front you can use the rule like this :

```javascript

import Validator from 'FormValidator'
import CustomRule from './Rules/CustomRule'

Validator.use(CustomRule)

let validator = new Validotor(document.getElementById('my-form'))

let results = validator.validate({
    name: 'customRule:TEST'
})

```

The value expected in this exemple is the content after the `:`. `customRule` is the name of the rule and all after the `:` is the value expected (`TEST`).

----

## Default Rule list


| Rule          | Description                                                                                                                                                                        | Exemple                                     |
|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| Required      | The input cannot be null                                                                                                                                                           | 'name' : 'required'                         |
| Required_if   | The input cannot be null if the input in parameter is not null or true                                                                                                             | 'name' : 'required_if:newsletter'           |
| Required_with | The input cannot be null if all input passed in parameter are not null or true                                                                                                     | 'name' : 'required_with:address,phone'      |
| Min           | If the input is a string, the length must be greeter or equal by the value in parameter.  If the input is a number, the value must be greeter or equal by the value in parameter.  | 'password' : 'min:8', 'age'      : 'min:18' |
| Max           | If the input is a string, the length must be lower or equal by the value in parameter.  If the input is a number, the value must be lower or equal by the value in parameter.      | 'password' : 'max:8', 'age'      : 'max:18' |
| Numeric       | The input must contain a numeric value (even if the type of the input is text)                                                                                                     | 'age' : 'numeric'                           |
| Email         | The input must be a valid email                                                                                                                                                    | 'email' : 'email'                           |
| Pattern       | The input value must match with the regex pattern pass in parameter                                                                                                                | 'username' : '/^Neko_/'                     |



You can add `nullable` rule for input not required but if not null, must match with a specific rule :


```javascript

form.validate({

    'age' : 'numeric|min:18|nullable'

})

```

Powered with :heart: By NekoDev !

[Follow me on Twitter](@ChibaneTahar)
