import { exec, ExecException } from 'node:child_process'
export type RequestType = {
  answerText: string
  requiredAnswer: string
}
export type ResponseType = {
  correct: boolean
}

const execute = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let stdout = ''
    const child = exec(
      command,
      (error: ExecException | null, _stdout: string, stderr: string) => {
        if (error) {
          reject(new Error('an error occurred'))
        }
        if (_stdout) {
          stdout = _stdout
          // console.log(command, 'stdout')
        }
        if (stderr) {
          reject(new Error('stderr'))
        }
      }
    )
    child.on('close', () => {
      // console.log(command, 'close')
      resolve(stdout)
    })
  })
}
export default defineEventHandler(async (event) => {
  const body = await readBody<RequestType>(event)
  const target = `${body.answerText}`

  const result1 = await execute(
    `echo "${target}" >> tmp.js && node tmp.js && rm tmp.js`
  )

  if (result1.trim() === body.requiredAnswer) {
    return {
      correct: true,
    }
  }
  return {
    correct: false,
  }
  // exec(
  //   `echo "${target}" >> tmp.js && node tmp.js && rm tmp.js`,
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       exec('rm tmp.js')
  //       console.log('error')
  //       return {
  //         correct: false,
  //       }
  //     }
  //     if (stdout) {
  //       console.log({ stdout })
  //       console.log('stdout.trim', stdout.trim())
  //       console.log('requiredAnswer', body.requiredAnswer)
  //       if (stdout.trim() === body.requiredAnswer) {
  //         return {
  //           correct: true,
  //         }
  //       } else {
  //         return {
  //           correct: false,
  //         }
  //       }
  //     }
  //     if (stderr) {
  //       console.log({ stderr })
  //       return {
  //         correct: false,
  //       }
  //     }
  //   }
  // )
})
