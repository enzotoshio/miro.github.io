class EmailsInput {
  constructor(container) {
    this.container = container
    this.input = undefined

    this.createHtml()

    return {
      getAllEmails: this.getAllEmails.bind(this),
      replaceEmails: this.replaceEmails.bind(this),
      subscribeToChanges: this.subscribeToChanges.bind(this),
    }
  }

  subscribeToChanges(callback) {
    this.callback = callback
  }

  deleteEmailBlock(event) {
    event.preventDefault()
    event.stopPropagation()

    const { target } = event
    const emailBlock = target.parentElement
    const email = emailBlock.querySelector('.emails-input--email-block--text')
      .textContent

    emailBlock.remove()

    this.emitChange({ type: 'delete', values: [email], elements: [emailBlock] })
  }

  createEmailBlock(email) {
    const emailBlockText = document.createElement('div')
    emailBlockText.className = 'emails-input--email-block--text'
    emailBlockText.textContent = email

    const emailBlockDeleteButton = document.createElement('div')
    emailBlockDeleteButton.className =
      'emails-input--email-block--delete-button'
    emailBlockDeleteButton.textContent = 'x'
    emailBlockDeleteButton.onclick = this.deleteEmailBlock.bind(this)

    const emailBlock = document.createElement('div')
    emailBlock.className = 'emails-input--email-block'

    emailBlock.appendChild(emailBlockText)
    emailBlock.appendChild(emailBlockDeleteButton)

    return emailBlock
  }

  emitChange(change) {
    const hasValidCallback = typeof this.callback === 'function'
    const hasValidChange = change && change.type !== ''

    if (!hasValidCallback || !hasValidChange) return

    this.callback(change)
  }

  insertEmailBlock(email) {
    const emailBlock = this.createEmailBlock(email)

    this.container.appendChild(emailBlock)
    this.emitChange({
      type: 'insert',
      values: ['email'],
      elements: [emailBlock],
    })
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

      this.insertEmailBlock(email)
    }
  }

  onpaste(event) {
    const {
      target: { value },
    } = event

    this.insertEmailBlock(value)
  }

  replaceEmails(newEmails) {
    const emailBlocksTexts = this.container.querySelectorAll(
      '.emails-input--email-block--text'
    )
    const replacedEmails = []
    const replacedEmailBlocks = []

    for (let i = 0; i < emailBlocksTexts.length; i++) {
      const emailBlockText = emailBlocksTexts[i]
      const { textContent } = emailBlockText
      const newEmail = newEmails[textContent]

      if (!newEmail) break

      emailBlockText.textContent = newEmail

      replacedEmails.push(newEmail)
      replacedEmailBlocks.push(emailBlockText.parentElement)
    }

    this.emitChange({
      type: 'replace',
      values: [replacedEmails],
      elements: [replacedEmailBlocks],
    })
  }

  getAllEmails() {
    const emailBlocksText = this.container.querySelectorAll(
      '.emails-input--email-block--text'
    )
    const emails = []

    for (let i = 0; i < emailBlocksText.length; i++) {
      const email = emailBlocksText[i].textContent
      emails.push(email)
    }

    return emails
  }

  createHtml() {
    const input = document.createElement('input')
    input.className = 'emails-input--input'
    input.oninput = this.oninput.bind(this)
    input.onpaste = this.onpaste.bind(this)

    const textArea = document.createElement('div')
    textArea.className = 'emails-input--text-area'
    textArea.appendChild(input)

    this.container.appendChild(textArea)

    this.input = input
  }
}

export default EmailsInput
