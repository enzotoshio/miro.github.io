class EmailsInput {
  constructor(container) {
    this.container = container
    this.input = undefined

    this.createHtml()

    return {
      getAllEmails: this.getAllEmails.bind(this),
      // A method to replace all entered emails with new ones.
      // Ability to subscribe for emails list changes.
    }
  }

  static createEmailBlock(email) {
    const emailBlockText = document.createElement('div')
    emailBlockText.textContent = email

    const emailBlockDeleteButton = document.createElement('div')
    emailBlockDeleteButton.className =
      'emails-input--email-block--delete-button'
    emailBlockDeleteButton.onclick = () => {}

    const emailBlock = document.createElement('div')
    emailBlock.className = 'emails-input--email-block'

    emailBlock.appendChild(emailBlockText)
    emailBlock.appendChild(emailBlockDeleteButton)

    return emailBlock
  }

  insertEmailBlock({ email, container }) {
    const emailBlock = EmailsInput.createEmailBlock(email)
    container.appendChild(emailBlock)
  }

  oninput(event) {
    const {
      target: { value },
    } = event
    const [email, comma] = value.split(',')
    const hasComma = comma === ''

    if (hasComma) {
      event.preventDefault()
      event.stopPropagation()

      this.insertEmailBlock({ email, container: this.container })
    }
  }

  getAllEmails() {
    const emailBlocks = this.container.querySelectorAll(
      '.emails-input--email-block'
    )
    const emails = []

    for (let i = 0; i < emailBlocks.length; i++) {
      const email = emailBlocks[i].textContent
      emails.push(email)
    }

    return emails
  }

  createHtml() {
    const input = document.createElement('input')
    input.className = 'emails-input--input'
    input.oninput = this.oninput.bind(this)

    const textArea = document.createElement('div')
    textArea.className = 'emails-input--text-area'
    textArea.appendChild(input)

    this.container.appendChild(textArea)

    this.input = input
  }
}

export default EmailsInput
