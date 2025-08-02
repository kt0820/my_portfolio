const projects = [
  {
    title: "Calculator",
    description: "A simple calculator.",
    image: "images/weather-app.png",
    link: "projects/calculator/index.html"
  },
  {
    title: "Etch-a-Sketch",
    description: "A drawing application that allows you to create pixel art.",
    image: "images/todo-app.png",
    link: "projects/etch-a-sketch/index.html"
  }
];

const container = document.getElementById("projects-container");

projects.forEach(project => {
  const card = document.createElement("div");
  card.className = "project-card";

  card.innerHTML = `
    <img src="${project.image}" alt="${project.title}" />
    <div class="content">
      <h2>${project.title}</h2>
      <p>${project.description}</p>
      <a href="${project.link}" target="_blank">View Project</a>
    </div>
  `;

  container.appendChild(card);
});
