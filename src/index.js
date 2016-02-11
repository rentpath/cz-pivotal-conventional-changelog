import wrap from 'word-wrap'

export function prompter (cz, commit) {
  console.log('\nLine 1 will be cropped at 50 characters. All other lines will be wrapped after 72 characters.\n')

  cz.prompt([
    {
      type: 'list',
      name: 'type',
      message: "Select the type of change that you're committing:",
      choices: [
        {
          name: 'feat:     A new feature',
          value: 'feat'
        }, {
          name: 'fix:      A bug fix',
          value: 'fix'
        }, {
          name: 'docs:     Documentation only changes',
          value: 'docs'
        }, {
          name: 'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
          value: 'style'
        }, {
          name: 'refactor: A code change that neither fixes a bug or adds a feature',
          value: 'refactor'
        }, {
          name: 'perf:     A code change that improves performance',
          value: 'perf'
        }, {
          name: 'test:     Adding missing tests',
          value: 'test'
        }, {
          name: 'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
          value: 'chore'
        }]
    }, {
      type: 'input',
      name: 'scope',
      message: 'Denote the scope of this change ($location, $browser, $compile, etc.):\n'
    }, {
      type: 'input',
      name: 'subject',
      message: 'Write a terse, imperative description of the change:\n'
    }, {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the change:\n'
    }, {
      type: 'input',
      name: 'pivotal',
      message: 'List any pivotal story IDs:\n'
    }, {
      type: 'input',
      name: 'footer',
      message: 'List any breaking changes:\n'
    }
  ], function (answers) {
    const maxSummaryWidth = 50
    const maxLineWidth = 72

    const wrapOptions = {
      trim: true,
      newline: '\n',
      indent: '',
      width: maxLineWidth
    }

    // parentheses are only needed when a scope is present
    let scope = answers.scope.trim()
    scope = scope ? '(' + answers.scope.trim() + ')' : ''

    // Hard limit this line
    const head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxSummaryWidth)

    // Wrap these lines at 72 characters
    const body = wrap(answers.body, wrapOptions)
    const pivotal = wrap('#' + answers.pivotal.trim().split(' ').join(' #'), wrapOptions)
    const footer = wrap(answers.footer, wrapOptions)

    commit(head + '\n\n' + body + '\n\n' + pivotal + '\n' + footer)
  })
}
