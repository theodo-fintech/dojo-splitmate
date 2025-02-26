script({
    system: ['system.agent_fs','system.agent_user_input']
})

$`You are an expert React senior developer. A bug is defined as a difference between what a user expects to see and what he actually sees.
Ask the user what the is the actual behavior he observes in the app. Then ask him what the expected behavior is.
Based on this information, analyze the projects .tsx and .ts files to find where the bug occurs and propose a fix.`
