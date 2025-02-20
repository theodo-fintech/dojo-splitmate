script({
    system: 'system.agent_fs'
})

const actualBehavior = await host.input('Describe the actual behavior from the user point of view')
const expectedBehavior = await host.input('Describe the expected behavior from the user point of view')


$`You are an expert React senior developer. A bug is defined as a difference between what a user expects to see and what he actually sees.
Currently he sees ${actualBehavior} instead of ${expectedBehavior}.
Analyze the projects .tsx files to find where the bug occurs and propose a fix`