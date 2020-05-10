import './assets/emails-input.css'
import EmailsInput from './emails-input'

const inputContainerNode = document.querySelector('#emails-input')
const emailsInput = new EmailsInput(inputContainerNode, {})

console.log(emailsInput)
