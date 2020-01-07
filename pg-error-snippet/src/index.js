const chalk = require('chalk')
const {defaultOpts} = require('./default-opts')
const {createCodeSnippet} = require('./create-code-snippet')

function handleError(err, query, opts = {}) {
  if (err.position === undefined) {
    console.error(err)
  } else {
    const message = formatErrorMessage(err.message, opts.label, opts.showColors, opts.errorColor)
    const snippet = createCodeSnippetFromError(err, query, opts)
    console.log(
      message + '\n' +
      snippet + '\n' +
      opts.showStack ? err.stack : ''
    )
  }
}

function formatErrorMessage(
  message,
  label = defaultOpts.label,
  errorPrefix = defaultOpts.errorPrefix,
  showColors = defaultOpts.showColors,
  errorColor = defaultOpts.errorColor
) {
  const newMessage = errorPrefix + label + message.replace(/\s+/g, ' ')
  return showColors ? chalk[errorColor].bold(newMessage) : newMessage
}

function createCodeSnippetFromError(err, query, opts = {}) {
  const index = getIndexFromErrorPosition(err.position, query)
  return createCodeSnippet(index, query, opts)
}

function getIndexFromErrorPosition(position, query) {
  return Math.max(0, Math.min(query.length - 1, position - 1))
}

module.exports = {
  handleError,
  formatErrorMessage,
  createCodeSnippetFromError,
  createCodeSnippet,
  getIndexFromErrorPosition,
}
