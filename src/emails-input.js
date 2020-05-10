class EmailsInput {
  constructor(container, options) {
    console.log('>>>> EmailInput: ', container, options)
    const html = EmailsInput.createHtml()

    container.appendChild(html)

    return {
      // A method to get all entered emails. Both valid and invalid.
      // A method to replace all entered emails with new ones.
      // Ability to subscribe for emails list changes.
    }
  }

  static createHtml() {
    const input = document.createElement('input')
    input.className = 'emails-input--input'
    input.onchange = () => {}

    const textArea = document.createElement('div')
    textArea.className = 'emails-input--text-area'
    textArea.appendChild(input)

    return textArea
  }
}

// global.EmailsInput = EmailsInput
export default EmailsInput
