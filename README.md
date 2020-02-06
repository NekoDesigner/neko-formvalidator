# FormValidator
_Powered by Hayaku_

FormValidator is a JavaScript Module for validation form.

## Installation

`npm install --save neko-formvalidator`

## Basic Usage

**Javascript**

```javascript
/**
 * Using ES6
*/
import FormValidator from 'neko-formvalidator'

const form = document.querySelector("#my-form");

let validator = new FormValidator(form, [
    {
        element: form.querySelector('#my-input'),
        rules: 'required|min:4',
        messages: {
            required: "The :attr is needed !",
            min: "The length must be greater than 3 !"
        }
    }
]);

form.addEventListener('submit', evt => {
    evt.preventDefault();
    let result = validator.validate();
});

```

**HTML**

```html
<form id="my-form">
    <input type="text" id="my-input">
    <button type="submit">Enjoy</button>
</form>
```
You can see full example from `example` folder in this package.

## Rules List

| rules       | Description                                                               | Usage                           |
|-------------|---------------------------------------------------------------------------|---------------------------------|
| required    | The element can't be empty                                                | rules: 'required'               |
| required_if | The element is required if other element is not empty                     | rules: 'required_if:input_name' |
| min         | The element must have string length or number greater or equal min value  | rules: 'min:4'                  |
| max         | The element must have string length or number inferior or equal max value | rules: 'max:10'                 |
| number      | The element value must be a number                                        | rules: 'number'                 |

You can chain rules with `|`.

## Methods

**validate** _@return FormResult object_  
Check if rules are respected. If errors and you specified errors messages, it return an array of object with this structure :
```ts
interface FormResult {
    isValid: boolean,
    messages: Array<FormError>
    getMessage: Function
}
```
If you specified any rules messages, it returning true or false.

**add** _@return void_
argument: _FormElement_
Add element to rules

**remove** _@return void_
argument: _HTMLElement_
Specify the input element that must be deleted from validator

**getMessage** _@return string_
Return the string message that you specify. If you use `:attr` in your string message,
that change to the input name. Just pass the ForError Element as parameter

```ts
let result = validator.validate()
if(!result.isValid) {
    result.messages.forEach(message => console.log(result.getMessage(message)))
}
```