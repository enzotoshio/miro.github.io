/**
 * @jest-environment jsdom
 */

import EmailsInput from './emails-input'

function createEventMock(params) {
  return { preventDefault() {}, stopPropagation() {}, ...params }
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
          replaceEmails: expect.any(Function),
          subscribeToChanges: expect.any(Function),
        })
      )
    })
  })

  describe('#onkeydown', () => {
    describe('when it is a comma', () => {
      it('inserts a new email', () => {
        const container = document.createElement('div')
        new EmailsInput(container)
        const input = container.querySelector('.emails-input--input')

        input.onkeydown(
          createEventMock({ key: ',', target: { value: 'mufasa@lion.com' } })
        )

        const emailBlockValue = container.querySelector(
          '.emails-input--email-block--text'
        ).textContent
        expect(emailBlockValue).toContain('mufasa@lion.com')
      })
    })

    describe('when it is an enter', () => {
      it('inserts a new email', () => {
        const container = document.createElement('div')
        new EmailsInput(container)
        const input = container.querySelector('.emails-input--input')

        input.onkeydown(
          createEventMock({
            key: 'Enter',
            target: { value: 'mufasa@lion.com' },
          })
        )

        const emailBlockValue = container.querySelector(
          '.emails-input--email-block--text'
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
      input.onkeydown(
        createEventMock({ key: ',', target: { value: 'mufasa@lion.com' } })
      )

      const emailBlock = container.querySelector('.emails-input--email-block')
      const button = emailBlock.querySelector(
        '.emails-input--email-block--delete-button'
      )
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

      container.querySelector('.emails-input--input').onpaste(
        createEventMock({
          clipboardData: {
            getData() {
              return 'mufasa@lion.com, simba@lion.com'
            },
          },
        })
      )

      const [
        firstEmailBlockText,
        secondEmailBlockText,
      ] = container.querySelectorAll('.emails-input--email-block--text')
      const firstEmailBlockTextValue = firstEmailBlockText.textContent
      const secondEmailBlockTextValue = secondEmailBlockText.textContent
      expect(firstEmailBlockTextValue).toBe('mufasa@lion.com')
      expect(secondEmailBlockTextValue).toBe('simba@lion.com')
    })
  })

  describe('#getAllEmails', () => {
    it('returns an array with all email', () => {
      const container = document.createElement('div')
      const emailsInput = new EmailsInput(container)
      const input = container.querySelector('.emails-input--input')
      input.onkeydown(
        createEventMock({ key: ',', target: { value: 'mufasa@lion.com' } })
      )

      const emails = emailsInput.getAllEmails()

      const emailBlock = container.querySelector('.emails-input--email-block')
      expect(emails).toContainEqual({
        address: 'mufasa@lion.com',
        element: emailBlock,
        isValid: true,
      })
    })
  })

  describe('#replaceEmails', () => {
    it('replaces all email blocks with the new value', () => {
      const container = document.createElement('div')
      const emailsInput = new EmailsInput(container)
      const input = container.querySelector('.emails-input--input')
      input.onkeydown(
        createEventMock({ key: ',', target: { value: 'mufasa@lion.com' } })
      )

      emailsInput.replaceEmails({ 'mufasa@lion.com': 'simba@lion.com' })

      const emailBlockValue = container.querySelector(
        '.emails-input--email-block--text'
      ).textContent
      expect(emailBlockValue).toContain('simba@lion.com')
    })
  })
})
