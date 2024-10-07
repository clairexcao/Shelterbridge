import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-west-2" }); // Replace with your desired region

const items =

    [
        {
            "id": "a40fd4fb-4f4d-43d1-843d-e114fdf423fd",
            "category": "Food",
            "city": "Coos Bay, OR",
            "name": "SOUTH COAST GOSPEL MISSION (Food Service)",
            "address": "1999 N 7th Street, Coos Bay, OR 97420",
            "phone": "(541) 269-5017",
            "eligibility": "Unrestricted",
            "website": "southcoastgospelmission.org",
            "email": "gospelmission@frontier.com",
            "latitude": "43.38146",
            "longitude": "-124.22216",
            "description": "Christian faith-based homeless shelter providing meals to the public. Sack lunches are available Monday through Friday, with breakfast and dinner provided on weekends."
        },
        {
            "id": "ce15397c-5b4d-4ce0-bdf4-48b2358afaa3",
            "category": "Food",
            "city": "Coos Bay, OR",
            "name": "COOS FOOD CUPBOARD (Food Service)",
            "address": "490 W Anderson Ave, Coos Bay, OR 97420",
            "phone": "(541) 269-0700",
            "eligibility": "Low-income individuals and families",
            "website": "coosfoodcupboard.org",
            "email": "info@coosfoodcupboard.org",
            "latitude": "43.36368",
            "longitude": "-124.21602",
            "description": "Provides free groceries and meals for individuals and families experiencing food insecurity. Open to all who meet income requirements, offering a variety of canned goods, fresh produce, and pantry staples."
        },
        {
            "id": "5d18b981-6632-464d-8e2b-fb5ce588779d",
            "category": "Food",
            "city": "Coos Bay, OR",
            "name": "NEWMARK CENTER (Food Service & Shelter)",
            "address": "310 Newmark Ave, Coos Bay, OR 97420",
            "phone": "(541) 888-7350",
            "eligibility": "Unrestricted",
            "website": "newmarkcenter.org",
            "email": "support@newmarkcenter.org",
            "latitude": "43.38039",
            "longitude": "-124.22458",
            "description": "Offers meals and shelter services to individuals in crisis. Community members can receive a daily meal and access to hygiene facilities. Also provides referrals to additional support services."
        },
        {
<<<<<<< HEAD
            "id": "b934e3a8-5733-4f68-ba7f-1fd0e7e48189",
            "category": "Food",
            "city": "Coos Bay, OR",
            "name": "ST. MONICA'S CATHOLIC CHURCH FOOD PANTRY (Food Service)",
            "address": "357 S 6th Street, Coos Bay, OR 97420",
            "phone": "(541) 267-7421",
            "eligibility": "Unrestricted",
            "website": "stmonicacoosbay.org",
            "email": "info@stmonicacoosbay.org",
            "latitude": "43.36689",
            "longitude": "-124.21458",
            "description": "Provides non-perishable food items and groceries to individuals and families in need. Open to anyone in the community experiencing food insecurity."
=======
            "id": "560717d3-fd1c-405b-9e51-8fa23dd4d687",
            "category": "Shelter",
            "city": "Portland, OR",
            "name": "Multnomah Downtown Shelter",
            "address": "Not specified",
            "phone": "(503) 358-0519",
            "number of beds": "90 beds",
            "eligibility": "Individuals aged 18+.",
            "website": "www.dogoodmultnomah.org",
            "email": "Not specified",
            "hours": "Not specified",
            "description": "Provides shelter and case management for individuals aged 18+ to assist in transitioning to permanent housing or rehabilitation.",

>>>>>>> 8dee5ebb0558eceb76a9683a9f4c319c2190fcf5
        },
        {
            "id": "62833569-eb79-4ba6-84b9-0b9f2111352d",
            "category": "Food",
            "city": "Coos Bay, OR",
            "name": "COOS BAY SENIOR CENTER (Food Service)",
            "address": "886 S 4th Street, Coos Bay, OR 97420",
            "phone": "(541) 269-2626",
            "eligibility": "Seniors (age 60+)",
            "website": "coosbayseniorcenter.org",
            "email": "info@coosbayseniorcenter.org",
            "latitude": "43.36675",
            "longitude": "-124.21526",
            "description": "Provides meals and nutrition services to seniors in the Coos Bay area. Offers hot meals on-site and delivers to homebound seniors as part of the Meals on Wheels program."
        },
        {
            "id": "1c78fc06-3123-4747-bcb6-85d3a3069629",
            "category": "Food",
            "city": "Coos Bay, OR",
            "name": "OREGON COAST COMMUNITY ACTION (OCCA) (Food Service & Shelter)",
            "address": "1855 Thomas Ave, Coos Bay, OR 97420",
            "phone": "(541) 435-7080",
            "eligibility": "Unrestricted",
            "website": "orcca.us",
            "email": "info@orcca.us",
            "latitude": "43.37258",
            "longitude": "-124.21762",
            "description": "Provides emergency food distribution to those in need. Also offers utility assistance, housing stabilization services, and access to public benefits."
        },
        {
            "id": "6dc7bf45-331e-4d07-ba4e-6afa88ab8d1d",
            "category": "Food",
            "city": "Coos Bay, OR",
            "name": "THE SALVATION ARMY COOS BAY (Food Service)",
            "address": "1155 Flanagan Ave, Coos Bay, OR 97420",
            "phone": "(541) 888-5202",
            "eligibility": "Unrestricted",
            "website": "salvationarmyusa.org",
            "email": "coosbay.salvationarmy@usw.salvationarmy.org",
            "latitude": "43.37928",
            "longitude": "-124.21691",
            "description": "Provides groceries, non-perishable food items, and prepared meals for individuals and families in need. Also offers clothing and emergency utility assistance."
        },
        {
<<<<<<< HEAD
            "id": "30663784-0ad4-4d27-8760-afc8549cd030",
            "category": "Food",
            "city": "Coos Bay, OR",
            "name": "BAY AREA FIRST STEP (Food Service)",
            "address": "1745 Koos Bay Blvd, Coos Bay, OR 97420",
            "phone": "(541) 756-7880",
            "eligibility": "Unrestricted",
            "website": "bayareafirststep.org",
            "email": "info@bayareafirststep.org",
            "latitude": "43.37818",
            "longitude": "-124.22025",
            "description": "Provides meals as part of its transitional shelter program, offering breakfast, lunch, and dinner for residents and those in need. Must fill out an application for shelter services."
=======
            "id": "4dae2177-39d4-4070-95aa-f01234b7933c",
            "category": "Shelter",
            "city": "Portland, OR",
            "name": "Cascade AIDS Project",
            "address": "2740 SE Powell Blvd., Portland, OR 97202",
            "phone": "(971) 222-1880",
            "number of beds": "Not specified (focuses on providing permanent housing)",
            "eligibility": "Self-identified women, 25+ experiencing homelessness.",
            "website": "www.catholiccharitiesoregon.org",
            "email": "Not specified",
            "hours": "10 a.m. - 1 p.m., Monday - Friday",
            "description": "Assists self-identified women, 25+ experiencing homelessness with permanent housing, case management, and more.",
            "latitude": "45.4975201",
            "longitude": "-122.6379434",
            "catholic charities": "Housing Transitions Program"
        },
        {
            "id": "49987ea8-ed59-4e69-b1cb-b327d1285a19",
            "category": "Shelter",
            "city": "Portland, OR",
            "name": "Northwest Pilot Project",
            "address": "1430 SW Broadway St., Portland, OR 97201",
            "phone": "Main Line: (503) 227-5605",
            "number of beds": "Not specified (focuses on housing services for seniors)",
            "eligibility": "Seniors 55+ without minor children.",
            "website": "www.nwpilotproject.org",
            "email": "Not specified",
            "hours": "9 a.m.-4 p.m. Mon.-Wed.; 1-4 p.m. Fri. & Thurs.; Limited walk-in services on Tues., Wed. & Thurs. 1-4 p.m.",
            "description": "Secures permanent housing for seniors, 55 and older, who are homeless or at risk of becoming homeless with no minor children. New clients should call for eligibility and hours.",
            "latitude": "45.514115",
            "longitude": "-122.6820461"
        },
        {
            "id": "c7cb787e-5b92-4fd3-a378-dfbe01440b7c",
            "category": "Shelter",
            "city": "Portland, OR",
            "name": "Oxford Houses of Oregon",
            "address": "Various locations",
            "phone": "Main Line: (503) 941-0977",
            "number of beds": "Not specified (varies by house)",
            "eligibility": "Individuals recovering from addiction or alcoholism.",
            "website": "www.oxfordhouse.org",
            "email": "Not specified",
            "hours": "Not specified",
            "description": "Alcohol/drug-free living environment in shared housing. Must be recovering from addiction or alcoholism. Each house is democratically run by members and financially self-supporting. Must live clean and sober and be able to pay an equal share of expenses; inpatient treatment completion is not a requirement for housing.",

        },
        {
            "id": "bbc6e58c-2abf-4fe8-8cf4-1e7f7a6226c0",
            "category": "Shelter",
            "city": "Portland, OR",
            "name": "SEI Community Services",
            "address": "2205 NE Columbia Blvd., Portland, OR 97211",
            "phone": "Main Line: (503) 285-0493, Housing Hotline: (503) 972-3699",
            "number of beds": "Not specified",
            "eligibility": "General public, focused on African-American advocacy.",
            "website": "www.selfenhancement.org",
            "email": "Not specified",
            "hours": "8:30 a.m.-5:30 p.m. Mon.-Thurs., 8:30 a.m.-12:30 p.m. Fri. Closed 2nd Fri.",
            "description": "Offers eviction prevention, homeless housing services, case management services, and African-American advocacy.",
            "latitude": "45.5772979",
            "longitude": "-122.6429308"
        },
        {
            "id": "2b5b6a02-5bdb-4cbe-968e-6ef4aa27a246",
            "category": "Shelter",
            "city": "Portland, OR",
            "name": "Luke-Dorf",
            "address": "8935 SW Center St., Tigard, OR 97223",
            "phone": "Main Line: (503) 726-3690, Intake: (503) 726-3742",
            "number of beds": "Not specified",
            "eligibility": "Individuals needing mental health treatment.",
            "website": "www.newnarrativepdx.org",
            "email": "Not specified",
            "hours": "8 a.m.-5 p.m. Mon.-Fri.",
            "description": "Formerly known as \"Luke-Dorf Westside Clinic.\" Provides outpatient mental health treatment including counseling, case management, and medication management. Not a walk-in clinic.",
            "latitude": "45.4337905",
            "longitude": "-122.7684879"
        },
        {
            "id": "2b849d69-eba0-4025-a128-5d1c5998c037",
            "category": "Shelter",
            "city": "Portland, OR",
            "name": "Housing Rights and Resources Center",
            "address": "2051 Kaen Road, #135, Oregon City, OR 97045",
            "phone": "Main Line: (503) 650-5750",
            "number of beds": "Not specified",
            "eligibility": "General public.",
            "website": "www.clackamas.us/socialservices/housingassistance.html",
            "email": "Not specified",
            "hours": "8 a.m.-5 p.m. Mon.-Thurs.",
            "description": "Provides general housing information and referrals regarding landlord-tenant relations, fair housing, and other housing-related issues.",
            "latitude": "45.3329139",
            "longitude": "-122.5988923"
>>>>>>> 8dee5ebb0558eceb76a9683a9f4c319c2190fcf5
        }
    ]

async function importItems() {
    // Iterate over the array and execute PutItem command for each item
    const promises = Promise.all(items.map(item => {
        const params = {
            TableName: "shelter-bridge-db", // Replace with your DynamoDB table name
            Item: {
                id: { S: item.id },
                name: { S: item.name ? item.name : '' },
                category: { S: item.category },
                eligibility: { S: item.eligibility ? item.eligibility : '' },
                address: { S: item.address ? item.address : '' },
                phone: { S: item.phone ? item.phone : '' },
                website: { S: item.website ? item.website : '' },
                latitude: { N: item.latitude ? (item.latitude) : '0' },
                longitude: { N: item.longitude ? (item.longitude) : '0' },
                description: { S: item.description ? item.description : '' },
                city: { S: item.city ? item.city : '' },
            },
        };

        if (item.capacity) {
            params.Item.capacity = { N: item.capacity.toString() };
        }
        if (item.hours) {
            params.Item.hours = { S: item.hours };
        }
        if (item.beds) {
            params.Item.beds = { S: item.beds };
        }

        console.log(params);
        const command = new PutItemCommand(params);
        return client.send(command);
    }))
        .then((responses) => {
            console.log(`${items.length} Items inserted successfully:`);
        })
        .catch((error) => {
            console.error("Error inserting items:", error);
        });
    return await promises;
}

export const handler = async (event) => {
    const result = await importItems();
    const response = {
        statusCode: 200,
        body: JSON.stringify('Done'),
    };
    return response;
};
