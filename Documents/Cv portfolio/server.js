const express = require('express');
const { CosmosClient} = require("@azure/cosmos");
const path = require('path');
const portfinder = require('portfinder')



const app = express();
const PORT = process.env.PORT || 3000;


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));




//initialize Azure Cosmos DB client
const endpoint = "https://gids-stone.documents.azure.com:443/";
const key = "AccountEndpoint=https://gids-stone.documents.azure.com:443/;AccountKey=ljRLaZYOQxdUprxGUST74jqYtxqPLjCKXZP8J3vwZRL24PeZmK1SGWKYk76ngbdLzb6z1yv02tm6ACDbNwnLug==;";
const cosmosClient = new CosmosClient({endpoint, key});



//Reference to Database and collections
const databaseID ='skills';
const skillsContainerId= 'skills';
const projectsContainerId= 'projects';
const database = cosmosClient.database(databaseID)
const skillsContainer= database.container(skillsContainerId);
const projectsContainer = database.container(projectsContainerId);



// Set the views directory and EJS as the template engine
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'Public')));

// Define routes
app.get('/', (req, res) => {
  res.render('layout');
});





// Fetch skills data from Azure Cosmos DB
app.get('/api/skills', async (req, res) => {
  try {
    // Query all documents from the 'skills' container
    const querySpec = {
      query: 'SELECT * FROM c',
    };

    const { resources: skills } = await skillsContainer.items.query(querySpec).fetchAll();

    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Unable to fetch skills.' });
  }
});

// Fetch projects data from Azure Cosmos DB
app.get('/api/projects', async (req, res) => {
  try {
    // Query all documents from the 'projects' container
    const querySpec = {
      query: 'SELECT * FROM c',
    };

    const { resources: projects } = await projectsContainer.items.query(querySpec).fetchAll();

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Unable to fetch projects.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
