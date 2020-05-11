import './assets/emails-input.css'
import './assets/example.css'
import EmailsInput from './emails-input'

const inputContainerPlaceholder = document.querySelector(
  '#emails-input-container--placeholder'
)
const inputContainer = document.querySelector('#emails-input-container')
const addEmailButton = inputContainer.querySelector('.add-email-button')
const getEmailsCountButton = inputContainer.querySelector(
  '.get-emails-count-button'
)
const emailsInput = new EmailsInput(inputContainerPlaceholder)
const randomEmails = ['musafa@lion.com', 'simba@lion.com', 'nala@lion.com']

addEmailButton.onclick = () => {
  const randomIndex = Math.floor(Math.random() * randomEmails.length)
  const randomEmail = randomEmails[randomIndex]
  emailsInput.insertEmail(randomEmail)
}

getEmailsCountButton.onclick = () => {
  const emails = emailsInput.getAllEmails()
  const validEmails = emails.filter(({ isValid }) => isValid)

  alert(`Valid emails: ${validEmails.length}`)
}

console.log(emailsInput)
