Frontend test assessment

It uses:

- Vanilla JS
- Webpack as bundler (with hot reload for development)
- Babel for JS support to IE11
- Jest as unit testing framework
- Prettier and ESLint for code standardization, qualit assurance and formatting
- Husky and Lint-Staged for pre-commit tasks execution

## Available Scripts:

In the project directory, you can:

### Install the project dependencies:

```sh
npm i
```

### Run the project:

```sh
npm start
```

### Run the tests:

#### Dry run:

```sh
npm t
```

#### With watcher - Stays alive:

```sh
npm run test:watch
```

#### With debugger:

```sh
npm run test:debug
```

### Get the test coverage:

```sh
npm test -- --coverage
```

### Build to production:

```sh
npm run build:prod
```

### Build implementation example to Github Page:

```sh
npm run build:example
```

### Pre commit tasks (executes automatically with Husky and Lint-Staged):

```sh
npm run lint
npm run prettify
```

## Usage / Available API:

```js
// Placeholder container where the component will be rendered
const inputContainerPlaceholder = document.querySelector(
  '#emails-input-container--placeholder'
)

// Instantiation
const emailsInput = new EmailsInput(inputContainerPlaceholder)

/** getAllEmails
 * Returns: Array of Objects:
 *   [{
 *     address: String,
 *     element: HTML Element,
 *     isValid: Boolean
 *   }]
 * Params: none
 */
emailsInput.getAllEmails()

/** replaceEmails
 * Returns: Void
 * Params: Object:
 *   { 'existent email': 'new email' }
 */
emailsInput.replaceEmails({ 'mufasa@lion.com': 'simba@lion.com' })

/** subscribeToChanges
 * Returns: Void
 * Params: Callback Function:
 *   () => console.log('My callback')
 */
emailsinput.subscribeToChanges(() => console.log('My callback'))

/** insertEmailBlock
 * Returns: Void
 * Params: Email String:
 *   'mufasa@lion.com'
 */
insertEmail: this.insertEmailBlock('mufasa@lion.com')
```
