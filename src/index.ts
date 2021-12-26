import { Step, StepGroup, Pipeline } from './classes'

const pipeline = new Pipeline(
    'Highway to prod',
    'Builds and deploys a javascript application',
    [
        new StepGroup('Build', 'Builds the javascript application', [
            new Step('Install npm', 'This step installs npm', () =>
                console.log('hello')
            ),
            new Step('Run build', 'This step runs the npm build', () =>
                console.log('second step')
            ),
        ]),
    ]
)

pipeline.run()

pipeline.generateDefinition()
