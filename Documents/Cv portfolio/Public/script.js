
function toggleMenu(){
    const menu=document.querySelector(".menu-links");
    const icon=document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
   icon.classList.toggle("open");
}


document.getElementById('addSkillForm').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const skillType = document.getElementById('skillType').value;
    const skills = document.getElementById('skills').value.split(',').map((skill) => skill.trim());
  
    const skillData = { type: skillType, skills };
  
    // Make a POST request to the backend API endpoint
    fetch('/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(skillData),
    })
      .then((response) => response.json())
      .then((newSkill) => {
        // Handle the response from the backend (optional)
        console.log('New skill added:', newSkill);
  
        // Update the skills section on the frontend (optional)
        // You can re-fetch the skills data and update the UI dynamically here
      })
      .catch((error) => {
        console.error('Error adding new skill:', error);
      });
  });
  

app.listen(port, () => {
    console.log('server running on port');
} );