export const categories = [
    {
        name: 'Food',
        icon: 'food',
        data: [
            {
                name: 'Blanchet House',
                description: 'Provides meal services and other support in Portland.',
                details: 'The food bank sources food from local farms and stores to distribute to low-income families and individuals.',
                address: '310 NW Glisan St, Portland, OR 97209',
                eligibility: 'Open to all who need assistance.',
                hours: 'Breakfast: 6:30 am - 7:30 am, Lunch: Noon - 1 pm, Dinner: 5 pm - 6 pm',
                email: 'info@blanchethouse.org',
                phoneNumber: '(503) 241-4340',
                directions: 'Located near the Burnside Bridge in downtown Portland.',
                website: 'https://blanchethouse.org',
            },
            {
                name: 'Food Bank XYZ',
                description: 'Distributes food to those in need across the city.',
                details: 'The food bank sources food from local farms and stores to distribute to low-income families and individuals.'
            },
            {
                name: 'Meals on Wheels',
                description: 'Delivers meals to seniors and disabled individuals in the community.',
                details: 'Volunteers deliver warm meals directly to the homes of elderly and disabled community members.'
            }
        ]
    },
    { name: 'Shelter', icon: 'home-group', data: [{ name: 'Local Shelter', description: 'Provides emergency housing and support services.' }] },
    { name: 'Legal Assistance', icon: 'gavel', data: [{ name: 'Free Legal Aid', description: 'Provides free legal services and advice.' }] },
    { name: 'Addiction Recovery', icon: 'emoticon-neutral-outline', data: [{ name: 'Recovery Center', description: 'Support for addiction recovery and rehabilitation.' }] },
    { name: 'Women and Children', icon: 'human-female-girl', data: [{ name: 'Women\'s Shelter', description: 'Safe housing and resources for women and children.' }] }
];

export const handler = async (event) => {
    let response;
    if (event.path == '/categories/v1') {
        response = {
            statusCode: 200,
            body: JSON.stringify(categories),
        };
    } else {
        response = {
            statusCode: 404,
            body: JSON.stringify('Not Found'),
        };
    }
    return response;
};
