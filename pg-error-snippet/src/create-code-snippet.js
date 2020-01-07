const chalk = require('chalk')
const {defaultOpts} = require('./default-opts')

function createCodeSnippet(index, query, opts = {}) {
  const {lines, y, x} = getErrorCoords(query, index, opts.eol)
  const snippet = extractLines(lines, y, opts.linesBefore, opts.linesAfter)
  return format(snippet, y, x, opts).join('\n')
}

function getErrorCoords(string, index, eol = defaultOpts.eol) {
  const lines = string.split(eol)
  const eolLength = eol.length
  const lineEndIndexes = lines.reduce((acc, line, idx) => {
    const prev = acc[idx - 1] || 0
    acc.push(prev + line.length + eolLength)
    return acc
  }, [])
  const y = (() => {
    const idx = lineEndIndexes.findIndex((len) => len > index)
    return idx >= 0 ? idx : lines.length - 1
  })()
  const x = (() => {
    const prevLineEnd = lineEndIndexes[y - 1] || 0
    return index - prevLineEnd
  })()
  return {lines, y, x}
}

function extractLines(
  lines,
  lineIdx,
  linesBefore = defaultOpts.linesBefore,
  linesAfter = defaultOpts.linesAfter
) {
  const startIdx = Math.max(0, lineIdx - linesBefore)
  const endIdx = Math.min(lines.length - 1, lineIdx + linesAfter)
  const snippetLines =  lines.slice(startIdx, endIdx + 1)
  return snippetLines.map((content, idx) => ({content, index: startIdx + idx}))
}

function format(snippet, lineIdx, linePosition, opts = {}) {
  const snippetWithError = showErrorInLines(snippet, lineIdx, linePosition, opts)
  return addLineNumbers(
    snippetWithError,
    opts.showColors,
    opts.showLineNumbers,
    opts.lineNumberColor
  )
}

function showErrorInLines(snippet, lineIdx, position, opts = {}) {
  const errorLine = snippet.find((o) => o.index === lineIdx)
  return [
    ...snippet.filter((o) => o.index < lineIdx),
    ...showErrorInLine(errorLine, position, opts.errorStyle, opts.showColors, opts.errorColor),
    ...snippet.filter((o) => o.index > lineIdx)
  ]
}

function showErrorInLine(
  snippetLine,
  position,
  errorStyle = defaultOpts.errorStyle,
  showColors = defaultOpts.showColors,
  errorColor = defaultOpts.errorColor,
) {
  switch (errorStyle) {
    case 'highlight': {
      if (!showColors) {
        throw new Error(`[pg-error]: showColors: false is incompatible with errorStyle 'highlight'`)
      }
      const {index, content} = snippetLine
      const bgColor = createChalkBgColor(errorColor)
      const newContent = content.slice(0, position)
        + chalk[bgColor](content[position])
        + content.slice(position + 1)
      return [
        {index, content: newContent}
      ]
    }
    case 'arrow': {
      const indent = ' '.repeat(position)
      const arrow = showColors ? chalk[errorColor].bold('^') : '^'
      return [
        snippetLine,
        {index: null, content: indent + arrow}
      ]
    }
    default: {
      throw new Error(`[pg-error]: errorStyle must be either 'arrow' or 'highlight'`)
    }
  }
}

function createChalkBgColor(color) {
  return 'bg' + color.slice(0, 1).toUpperCase() + color.slice(1)
}

function addLineNumbers(
  snippet,
  showColors = defaultOpts.showColors,
  showLineNumbers = defaultOpts.showLineNumbers,
  lineNumberColor = defaultOpts.lineNumberColor
) {
  if (!showLineNumbers) {
    return snippet.map((o) => o.content)
  }
  const maxLength = (() => {
    const withIndex = snippet.filter((o) => o.index !== null)
    const lastLine = withIndex[withIndex.length - 1]
    return String(lastLine.index + 1).length
  })()
  return snippet.map((line) => {
    const number = line.index === null ? '' : line.index + 1
    const indent = ' '.repeat(maxLength - String(number).length)
    const lineNumber = showColors ? chalk[lineNumberColor](number) : number
    return indent + lineNumber + ' ' + line.content
  })
}

module.exports = {
  createCodeSnippet,
  getErrorCoords,
  extractLines,
  format,
  showErrorInLines,
  showErrorInLine,
  createChalkBgColor,
  addLineNumbers
}
