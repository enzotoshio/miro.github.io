class EmailsInput {
  constructor(container) {
    this.container = container
    this.input = undefined
    this.textArea = undefined

    this.createHtml()

    return {
      getAllEmails: this.getAllEmails.bind(this),
      replaceEmails: this.replaceEmails.bind(this),
      subscribeToChanges: this.subscribeToChanges.bind(this),
      insertEmail: this.insertEmailBlock.bind(this),
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

  createEmailBlock({ email, isValidEmail }) {
    const emailBlockText = document.createElement('div')
    emailBlockText.className = 'emails-input--email-block--text'
    emailBlockText.textContent = email

    const emailBlockDeleteButton = document.createElement('div')
    emailBlockDeleteButton.className =
      'emails-input--email-block--delete-button'
    emailBlockDeleteButton.onclick = this.deleteEmailBlock.bind(this)

    const emailBlock = document.createElement('div')
    const validationClass = isValidEmail ? 'valid' : 'invalid'
    emailBlock.className = `emails-input--email-block ${validationClass}`

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
    if (email === '') return

    const isValidEmail = email.match(/^\w+@\w+\.\w+(\.\w+)?$/)
    const emailBlock = this.createEmailBlock({ email, isValidEmail })

    this.textArea.insertBefore(emailBlock, this.input)

    this.input.value = ''

    this.emitChange({
      type: 'insert',
      values: ['email'],
      elements: [emailBlock],
    })
  }

  insertMultipleEmailBlocks(value) {
    const trimmedValue = value.replace(/ +/g, '')
    const emails = trimmedValue.split(',')

    emails.forEach((email) => this.insertEmailBlock(email))
  }

  oninput(event) {
    const {
      target: { value },
      key,
    } = event
    const isComma = key === ','
    const isEnter = key === 'Enter'

    if (isComma || isEnter) {
      event.preventDefault()
      event.stopPropagation()

      this.insertEmailBlock(value)
    }
  }

  onpaste(event) {
    event.preventDefault()
    event.stopPropagation()

    const clipboardData = event.clipboardData || window.clipboardData
    const value = clipboardData.getData('text')

    this.insertMultipleEmailBlocks(value)
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
      const emailBlockText = emailBlocksText[i]
      const emailBlock = emailBlockText.parentElement
      const email = emailBlockText.textContent
      const isValid = emailBlock.classList.contains('valid')

      emails.push({ element: emailBlock, address: email, isValid })
    }

    return emails
  }

  createHtml() {
    const input = document.createElement('input')
    input.className = 'emails-input--input'
    input.placeholder = 'add more people…'
    input.onpaste = this.onpaste.bind(this)
    input.onkeydown = this.oninput.bind(this)

    const textArea = document.createElement('div')
    textArea.className = 'emails-input--text-area'
    textArea.appendChild(input)

    this.container.appendChild(textArea)

    this.input = input
    this.textArea = textArea
  }
}

export default EmailsInput
