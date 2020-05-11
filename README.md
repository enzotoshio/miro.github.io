Frontend test assessment

It uses:

- Vanilla JS
- Webpack as bundler (with hot reload for development)
- Babel for JS support to IE11
- Jest as unit testing framework
- Prettier and ESLint for code standardization, qualit assurance and formatting
- Husky and Lint-Staged for pre-commit tasks execution

* A `/build` folder is present in the github project with the production version of the plugin/component, usually I would not commit it and choose instead to build and upload it to a CDN but since this is not the case here I chose to commit it so it's possible to see it or clone and start using it.

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

### Pre-commit tasks (executes automatically with Husky and Lint-Staged):

```sh
npm run lint
npm run prettify
```

## How to implament it:

Default production build provides a link plug and use type of plgin/component where you are not dependent of webpack to use it, as such it also gives you the plugin/component as a global `EmailsInput`.

```html
<head>
  <script src="./app.bundle.js"></script>
</head>

<script>
  var inputContainerPlaceholder = document.querySelector(
    '#emails-input-container--placeholder'
  )
  var emailsInput = new EmailsInput(inputContainerPlaceholder)
</script>
```

But it should be also possible to use it in a webpack environment where you can import it in a named variable and not have the global available.
Its built version is not commited so to use it just execute (and it should be available in the `/build` folder):

```sh
npm run build:prod:webpack
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
