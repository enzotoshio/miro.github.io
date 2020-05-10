/**
 * @jest-environment jsdom
 */

import EmailsInput from './emails-input'

function createEventMock({ target }) {
  return { preventDefault() {}, stopPropagation() {}, target }
}

describe('EmailsInput', () => {
  describe('when instantiated', () => {
    it('inserts component HTML', () => {
      const container = document.createElement('div')

      new EmailsInput(container)

      const html = container.querySelector('.emails-input--text-area')
      expect(html).toStrictEqual(expect.anything())
    })

    it('returns the correct interface', () => {
      const container = document.createElement('div')

      const emailsInput = new EmailsInput(container)

      expect(emailsInput).toEqual(
        expect.objectContaining({
          getAllEmails: expect.any(Function),
          replaceAllEmails: expect.any(Function),
          subscribeToChanges: expect.any(Function),
        })
      )
    })
  })

  describe('#oninput', () => {
    describe('when the input contains a comma', () => {
      it('inserts a new email', () => {
        const container = document.createElement('div')
        new EmailsInput(container)
        const input = container.querySelector('.emails-input--input')

        input.oninput(
          createEventMock({ target: { value: 'mufasa@lion.com,' } })
        )

        const emailBlockValue = container.querySelector(
          '.emails-input--email-block'
        ).textContent
        expect(emailBlockValue).toContain('mufasa@lion.com')
      })
    })
  })

  describe('#delete', () => {
    it('deletes the clicked email', () => {
      const container = document.createElement('div')
      new EmailsInput(container)
      const input = container.querySelector('.emails-input--input')
      input.oninput(createEventMock({ target: { value: 'mufasa@lion.com,' } }))

      const emailBlock = container.querySelector('.emails-input--email-block')
      const button = emailBlock.querySelector('.emails-input--delete-button')
      button.onclick(createEventMock({ target: button }))

      const deletedEmailBlock = container.querySelector(
        '.emails-input--email-block'
      )
      expect(deletedEmailBlock).toBeNull()
    })
  })

  describe('#onpaste', () => {
    it('inserts a new email', () => {
      const container = document.createElement('div')
      new EmailsInput(container)

      container
        .querySelector('.emails-input--input')
        .onpaste(createEventMock({ target: { value: 'mufasa@lion.com' } }))

      const emailBlockValue = container.querySelector(
        '.emails-input--email-block'
      ).textContent
      expect(emailBlockValue).toContain('mufasa@lion.com')
    })
  })

  describe('#getAllEmails', () => {
    it('returns an array with all email', () => {
      const container = document.createElement('div')
      const emailsInput = new EmailsInput(container)
      const input = container.querySelector('.emails-input--input')
      input.oninput(createEventMock({ target: { value: 'mufasa@lion.com,' } }))

      const emails = emailsInput.getAllEmails()

      expect(emails).toContain('mufasa@lion.com')
    })
  })

  describe('#replaceAllEmails', () => {
    it('replaces all emails in all email blocks', () => {
      const container = document.createElement('div')
      const emailsInput = new EmailsInput(container)
      const input = container.querySelector('.emails-input--input')
      input.oninput(createEventMock({ target: { value: 'mufasa@lion.com,' } }))

      emailsInput.replaceAllEmails('simba@lion.com')

      const emailBlockValue = container.querySelector(
        '.emails-input--email-block'
      ).textContent
      expect(emailBlockValue).toContain('simba@lion.com')
    })
  })
})
