script({
    model: 'anthropic:claude-3-5-sonnet-20240620',
    files: 'src/**/*.{tsx,ts}',
})

const actualBehavior = host.input('Describe the actual behavior from the user point of view')
const expectedBehavior = host.input('Describe the expected behavior from the user point of view')

def("FILE", env.files, {lineNumbers: true})

$`A bug is when there is an ${actualBehavior} that differs from an ${expectedBehavior}. You are an expert React senior developer.
Analyze FILE and output the name of the file and line that explains the bug.
Propose a fix`