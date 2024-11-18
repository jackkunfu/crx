#!/usr/bin/env node
import inquirer from 'inquirer'
import spawn from 'cross-spawn'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let promptList = [
  {
    type: 'list',
    message: '请选择准备运行的项目:',
    name: 'value',
    choices: [
      {
        name: 'nova-arxiv',
        value: 'nova-arxiv',
      },
    ],
  },
]

const run = {
  project: function () {
    // 只有一个项目 直接运行
    let choices = promptList[0].choices
    if (choices.length === 1) {
      console.log(path.resolve(__dirname, './packages', choices[0].value));
      spawn(`cd ${path.resolve(__dirname, './packages', choices[0].value)} && pnpm dev`, {
        shell: true,
        stdio: 'inherit',
      })
      return
    }

    inquirer.prompt(promptList).then((answers) => {
      // const branchName = exec('git rev-parse --abbrev-ref HEAD')
      //   .toString()
      //   .trim();
      console.log(`cd ${path.resolve('./packages', answers.value)} && pnpm dev`);
      
      spawn(`cd ${path.resolve('./packages', answers.value)} && pnpm dev`, {
        shell: true,
        stdio: 'inherit',
      })
      return
    })
  },
}

function initRun() {
  const runKey = process.argv[2] || 'project'
  run[runKey]()
}

initRun()
