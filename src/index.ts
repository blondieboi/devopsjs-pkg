import { Step, StepGroup, Pipeline } from './classes'

const pipeline = new Pipeline('hello', 'mate', [
    new StepGroup('hello', 'again', [
        new Step('Log something', 'This step logs something', () =>
            console.log('hello')
        ),
        new Step('Log something', 'This step logs something else', () =>
            console.log('second step')
        ),
    ]),
])

pipeline.run()
