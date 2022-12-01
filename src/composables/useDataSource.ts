import { Question } from '~~/src/types/question'

export const useDataSource = () =>
  useState<Question[]>('question', () => {
    return [
      {
        id: 1,
        title: '足し算',
        description: '1+1の結果をコンソールに出力してください',
        requiredAnswer: '2',
      },
      {
        id: 2,
        title: '引き算',
        description: '10-1の結果をコンソールに出力してください',
        requiredAnswer: '9',
      },
      {
        id: 3,
        title: '掛け算',
        description: '2x20の結果をコンソールに出力してください',
        requiredAnswer: '40',
      },
    ]
  })

export const useAddQuestion = (question: Question): void => {
  const questions = useDataSource()
  questions.value.push(question)
}

export const useFindQuestionById = (id: number) => {
  const questions = useDataSource()
  const result = questions.value.filter(
    (question: Question) => question.id === id
  )
  return result
    ? result[0]
    : {
        id: 0,
        title: '',
        description: '',
        requiredAnswer: '',
      }
}
