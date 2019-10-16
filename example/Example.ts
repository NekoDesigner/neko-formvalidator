import FormValidator from '../src/FormValidator';

let form: HTMLFormElement = document.querySelector('#form-test') as HTMLFormElement;
let name: HTMLInputElement = form.querySelector('#name') as HTMLInputElement;
let age: HTMLInputElement = form.querySelector('#age') as HTMLInputElement;
let power: HTMLInputElement = form.querySelector('#power') as HTMLInputElement;

const validator = new FormValidator(form, [
    {
        element: name,
        rules: "required",
        messages: {
            required: "The field :attr is required !"
        },
    },
    {
        element: age,
        rules: "required_if:name",
        messages: {
            required_if: "Required if name is present not empty !",
        }
    },
    {
        element: power,
        rules: "required|min:100|max:300",
        messages: {
            required: ":attr is required !",
            min: "Min value 100 !",
            max: "Max value 300 !",
        }
    }
])

form.addEventListener('submit', evt => {

    evt.preventDefault();
    reset();

    let valid = validator.validate();

    if (valid && typeof valid == 'object') {

        valid.forEach(rule => {
            rule.element.style.border = "solid 3px #ef5350";
            let container: HTMLElement = document.querySelector(`[data-id="${rule.element.getAttribute('id')}"]`) as HTMLElement;
            container.classList.add('active');

            let display = document.createElement('span');
            display.innerHTML = validator.getMessage(rule) + '<br>';

            container.appendChild(display);
        });

    }

    if (typeof valid == 'boolean' && valid) {
        alert('Submit !');
    }

});

function reset() {
    const messages: NodeListOf<HTMLElement> = document.querySelectorAll('.message')
    messages.forEach((message: HTMLElement) => {
        message.classList.remove('active');
        message.innerText = '';
        age.removeAttribute('style');
        name.removeAttribute('style');
        power.removeAttribute('style');
    });
}
